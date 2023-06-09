import React, { useEffect, useState, ChangeEvent } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../../utils/common";
import axios from "axios";
import { encode } from "base-64";
import { create } from "ipfs-http-client";
import "./files.css";
import docicon from "../../assets/doc-icon.png";
import DocFile from "../../assets/DocFile.png";

var hash: string;

type FileInputProps = {
  onFileSelect: (file: File) => void;
};

interface Employee {
  walletAddress: string;
  status: boolean;
}

const REACT_APP_INFURA_PROJECT_ID = "2QW6IKi5Z4wVrVVsEgx9xdcSFbo";
const REACT_APP_INFURA_PROJECT_SECRET = "be87e1226697c7d7df0b2480b177c3a4";
const secrets = `${REACT_APP_INFURA_PROJECT_ID}:${REACT_APP_INFURA_PROJECT_SECRET}`;
const encodedSecrets = encode(secrets);
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    Authorization: "Basic " + encodedSecrets,
  },
});

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileSelect} />
    </div>
  );
};

const UploadFile: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [uploadingFile, setUploadingFile] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [buf, setBuf] = useState<Uint8Array | null>(null);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const checkAccounts = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const network = await provider.getNetwork();
          const accounts = await provider.listAccounts();

          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setProvider(provider);
          } else if (network.chainId === 80001) {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
              params: [{ eth_chainId: "0x13881" }],
            });
            setWalletAddress(accounts[0]);
            const provider = new ethers.providers.Web3Provider(
              window.ethereum,
              "mumbai"
            );
            setProvider(provider);
          }
        } catch (error) {
          console.log("Error connecting:", error);
        }
      }
    };

    checkAccounts();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("wallet_address", walletAddress);
  }, [walletAddress]);
  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        if (contractAddress) {
          const contract = contractAddress();
          //@ts-ignore
          const allEmployees = await contract.getAllEmployees();
          setEmployees(allEmployees);
        }
      } catch (err) {
        console.error("Failed to get all employees:", err);
      }
    };

    getAllEmployees();
  }, []);
  const convertToBuffer = async (reader: FileReader): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const buffer = new Uint8Array(reader.result as ArrayBuffer);
        resolve(buffer);
      };
      reader.onerror = reject;
    });
  };

  const UPLOADIPFS = async (file: File) => {
    console.log("upload to ipfs");
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    const buffer = await convertToBuffer(reader);
    console.log("==========we re here=======");
    try {
      const response = await ipfs.add(buffer);
      const ipfsId = response.cid.toString();
      console.log("Generated IPFS Hash:", ipfsId);
      hash = ipfsId;
      // setHash(ipfsId);
      console.log("hash added", ipfsId);

      setShowLinks(true);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please check the console");
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await UPLOADIPFS(file);
      console.log("========HASH=======", hash);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("hash", hash);
      formData.append("username", name);
      formData.append("wallet_address", walletAddress);
      const response = await axios.post(
        "http://192.168.3.151:8000/api/files/",
        formData,
        {
          //@ts-ignore
          onUploadProgress: (progressEvent: ProgressEvent) => {
            if (progressEvent.total !== undefined) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress);
            }
          },
        }
      );

      if (response.status === 200) {
        console.log("File uploaded successfully!");
        setUploadingFile("");
        setUploadProgress(0);

        setShowLinks(true);
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const captureFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files![0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const handleClick = () => {
    setUploadProgress(0);
    setUploadingFile("File Name");
    const simulateUploadProgress = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(simulateUploadProgress);
          return prevProgress;
        }
        return prevProgress + 0.1;
      });
    }, 200);
  };

  useEffect(() => {
    const filteredEmployee = employees.find(
      (employee) => employee.walletAddress === walletAddress
    );

    if (filteredEmployee) {
      //@ts-ignore
      setName(filteredEmployee.name);
    } else if (walletAddress === "0xd35B39AE7755c6daF75a5547cc204C2E203558f0") {
      setName("Muneeb");
    }
  }, [employees, walletAddress]);

  return (
    <div>
      <div className="dropZoneCs">
        <img src={docicon} className="Docimg" alt="logo" />
        <div className="uploadimg">
          <FileInput onFileSelect={handleFileUpload} />
        </div>
        <p className="DropFIlesHead">
          Drop your file(s) here or{" "}
          <span className="DropFIlesHeadLink">browse</span>
        </p>

        <p className="maxFileSize">Max. File Size: 25MB</p>
      </div>
      <div className="pBarComplete">
        <div className="historyProgress">
          <img src={DocFile} className="pImg" alt="logo" />
          <div className="pBarCompleteStylePercentage">
            <h4 className="fileUploaded">{uploadingFile}</h4>
            {uploadingFile} {Math.round(uploadProgress * 1)}% Complete
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "80%",
              height: "3px",
              backgroundColor: "lightgray",
              marginBottom: "10px",
              borderRadius: "10px",
              marginLeft: "25px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                height: "100%",
                backgroundColor: "green",
                borderRadius: "10px",
                marginLeft: "0px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
