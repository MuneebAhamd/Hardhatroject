import React, { useEffect, useState } from "react";
import { Col } from "antd";
import { ethers, Signer } from "ethers";
import { HiHome } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { SlWrench } from "react-icons/sl";
import { RiSettings4Fill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { contractAddress } from "../../utils/common";

import "./AsideBarComponent.css";

interface Employee {
  walletAddress: string;
  status: boolean;
}

const AsideBarComponent = () => {
  const contract = contractAddress();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [provider, setProvider] = useState<any>(null);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent the default behavior of the link
  };

  const getAllEmployees = async () => {
    try {
      if (contract) {
        //@ts-ignore
        const allEmployees = await contract.getAllEmployees();
        setEmployees(allEmployees);
      }
    } catch (err) {
      console.error("Failed to get all employees:", err);
    }
  };

  const addToBlacklist = async (walletAddress: string) => {
    try {
      if (contract) {
        //@ts-ignore
        const tx = await contract.addToBlacklist(walletAddress);
        await tx.wait();
        console.log("===========address ===========", walletAddress);

        console.log("Wallet address added to blacklist successfully.");
      }
    } catch (err) {
      console.error("Failed to add to blacklist:", err);
    }
  };

  const removeFromBlacklist = async (walletAddress: string) => {
    try {
      if (contract) {
        //@ts-ignore
        const tx = await contract.removeFromBlacklist(walletAddress);
        await tx.wait();
        console.log("Wallet address removed from blacklist successfully.");
      }
    } catch (err) {
      console.error("Failed to remove from blacklist:", err);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, [contract]);

  useEffect(() => {
    async function checkAccounts() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setProvider(provider);
        } else if (network.chainId === 80001) {
          try {
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
          } catch (error) {
            console.log("Error connecting:", error);
          }
        }
      }
    }
    checkAccounts();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("wallet", walletAddress);
  }, [walletAddress]);

  async function requestAccount() {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("Detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const walletAddress = accounts[0];

        const employee = employees.find(
          (emp) => emp.walletAddress === walletAddress
        );
        if (employee && !employee.status) {
          await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
          });
          console.log("Metamask account disconnected.");
          return;
        }

        setWalletAddress(walletAddress);
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      } catch (error) {
        console.log("Error connecting:", error);
      }
    } else {
      alert("MetaMask not detected");
    }
  }

  const handleStatusChange = async (checked: boolean, index: number) => {
    try {
      const employee = employees[index];
      const { walletAddress, status } = employee;
      //@ts-ignore
      if (status && contract?.id === "addToBlacklist") {
        await removeFromBlacklist(walletAddress);
        //@ts-ignore
      } else if (!status && contract?.id === "removeFromBlacklist") {
        await addToBlacklist(walletAddress);
      }

      // Update the status of the employee
      const updatedEmployees = [...employees];
      updatedEmployees[index].status = !status;
      setEmployees(updatedEmployees);
    } catch (err) {
      console.error("Failed to update employee status:", err);
    }
  };

  const regenerateOnClick = async (id: string, status: boolean) => {
    if (status) {
      await addToBlacklist(id);
    } else {
      await removeFromBlacklist(id);
    }
  };

  return (
    <Col span={4} pull={0}>
      <div className="sideBarText">
        <h3>
          <HiHome />
        </h3>
        <Link className="sideBarLink" to="/">
          Home
        </Link>
      </div>
      <div className="sideBarText">
        <h3>
          <MdSpaceDashboard />
        </h3>
        {walletAddress === "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
          <Link className="sideBarLink" to="/dashboard">
            Dashboard
          </Link>
        ) : (
          <Link
            className="sideBarLink"
            to="#"
            onClick={() => alert("Only the admin is allowed")}
          >
            Dashboard
          </Link>
        )}
      </div>
      <div className="sideBarText">
        <h3>
          <FaUserAlt />
        </h3>
        {walletAddress === "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
          <Link className="sideBarLink" to="/profile">
            User Profile
          </Link>
        ) : (
          <Link
            className="sideBarLink"
            to="#"
            onClick={() => alert("Only the admin is allowed")}
          >
            User Profile
          </Link>
        )}
      </div>
      <div className="sideBarText">
        <h3>
          <SlWrench />
        </h3>
        <Link className="sideBarLink" to="/setting">
          Setting
        </Link>
        <a href="#" onClick={handleClick}></a>
      </div>
      <div className="sideBarText">
        <h3>
          <RiSettings4Fill />
        </h3>
        <Link className="sideBarLink" to="/faq">
          FAQs
        </Link>
        <a href="#" onClick={handleClick}></a>
      </div>
    </Col>
  );
};

export default AsideBarComponent;
