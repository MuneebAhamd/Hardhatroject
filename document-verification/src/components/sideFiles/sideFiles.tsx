import React, { useState } from "react";
import { encode } from "base-64";
import { create } from "ipfs-http-client";
import { useDropzone } from "react-dropzone";
import docicon from "../../assets/doc-icon.png";
import DocFile from "../../assets/DocFile.png";
import "./sideFiles.css";

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

const UploadForm = () => {
  const [buf, setBuf] = useState(null);
  const [hash, setHash] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  const [uploadingFile, setUploadingFile] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  //@ts-ignore
  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    // const filteredFiles = Array.from(files).filter((file) =>
    //   file.name.endsWith(".txt")
    // );

    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };
  //@ts-ignore
  const convertToBuffer = async (reader) => {
    const buffer = new Uint8Array(reader.result);
    //@ts-ignore
    setBuf(buffer);
  };
  //@ts-ignore
  const onSubmit = async (event) => {
    event.preventDefault();
    let ipfsId;
    const buffer = buf;
    try {
      //@ts-ignore
      const response = await ipfs.add(buffer);
      ipfsId = response.cid.toString();
      console.log("Generated IPFS Hash:", ipfsId);
      setHash(ipfsId);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please check the console");
    }
    setShowLinks(!!ipfsId);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {},
  });

  const handleClick = () => {
    setUploadProgress(0);
    setUploadingFile("File Name");
    const simulateUploadProgress = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(simulateUploadProgress);
          return prevProgress;
        }
        return prevProgress + 0.1;
      });
    }, 200);
  };

  return (
    <div>
      <div className="dropZoneCs">
        <img src={docicon} className="Docimg" alt="logo" />
        <p className="DropFIlesHead">
          Drop your file(s) here or{" "}
          <span className="DropFIlesHeadLink">browse</span>
        </p>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={captureFile} required />
          <button type="submit" onClick={handleClick}>
            Upload
          </button>
        </form>
        {showLinks ? (
          <div>
            <a href={"https://ipfs.io/ipfs/" + hash}>Hash</a>
          </div>
        ) : null}
        <p className="maxFileSize">Max. File Size: 25MB</p>
      </div>
      <div className="pBarComplete">
        <div className="histroyProgress">
          <img src={DocFile} className="pImg" alt="logo" />
          <div className="pBarCompleteStylePercentage">
            <h4 className="fileUploaded">{uploadingFile}</h4>
            {uploadingFile}
            {Math.round(uploadProgress * 100)}% Complete
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "85%",
              height: "3px",
              backgroundColor: "lightgray",
              marginBottom: 10,
              borderRadius: "10px",
              marginLeft: "25px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: `${uploadProgress * 100}%`,
                height: "4px",
                backgroundColor: "green",
                borderRadius: "10px",
                marginLeft: "0px",
              }}
            />
          </div>
        </div>
        {showLinks ? (
          <div>
            <a href={"https://ipfs.io/ipfs/" + hash}>
              Clickable Link to view the files
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const FileUploader = () => {
  return <UploadForm />;
};

export default FileUploader;
