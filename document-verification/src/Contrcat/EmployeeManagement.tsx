import React, { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { Form, Input, Button } from "antd";
import ABI from "./abi.json";
import "./EmployeeManagement.css";
import DashBoard from "../components/DashBoard/DashBoard";

interface Employee {
  name: string;
  walletAddress: string;
  status: boolean;
}
interface DashBoardProps {
  employees: Employee[];
  getAllEmployees: () => void;
}
const EmployeeManagement = () => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [blacklist, setBlacklist] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        try {
          await provider.send("eth_requestAccounts", []);
        } catch (err) {
          console.error("Failed to connect to Ethereum provider:", err);
        }
      } else {
        console.error("Please install MetaMask to use this application.");
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (provider) {
      // const contractAddress = "0x52cbd2c4a90bd27669d98759728ed8d0af3a1375";
      const contractAddress = "0x7d4493ada4cf7aa4dfb05e15858481c49435a79d";
      const contractABI = ABI;

      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        provider.getSigner()
      ) as Contract;
      setContract(contractInstance);
    }
  }, [provider]);

  const addEmployee = async (_name: string, _walletAddress: string) => {
    try {
      if (contract) {
        // console.log("========name==========", _name, _walletAddress);

        const tx = await contract.addEmployee(_name, _walletAddress);
        await tx.wait();
        console.log("Employee added successfully.");

        const updatedEmployees = [
          ...employees,
          { name: _name, walletAddress: _walletAddress, status: true },
        ];
        setEmployees(updatedEmployees);
      }
    } catch (err) {
      console.error("Failed to add employee:", err);
    }
  };

  const getAllEmployees = async () => {
    try {
      if (contract) {
        const allEmployees = await contract.getAllEmployees();
        // console.log("All Employees:", allEmployees);
        setEmployees(allEmployees);
        // console.log(
        //   "=========================allEmployees===================",
        //   allEmployees
        // );
      }
    } catch (err) {
      console.error("Failed to get all employees:", err);
    }
  };

  useEffect(() => {
    getAllEmployees(); // Call the function to retrieve all employees on component mount
  }, [contract]);

  const addToBlacklist = async (walletAddress: string) => {
    try {
      if (contract) {
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
        const tx = await contract.removeFromBlacklist(walletAddress);
        await tx.wait();
        console.log("Wallet address removed from blacklist successfully.");
      }
    } catch (err) {
      console.error("Failed to remove from blacklist:", err);
    }
  };

  return (
    <div className="Container">
      <h1>Add Employees</h1>
      {/* Add employee form */}
      <Form
        className="Container"
        onFinish={(values) => {
          const { name, walletAddress } = values;
          addEmployee(name, walletAddress);
        }}
      >
        <Form.Item label="Name" name="name" className="Container">
          <Input type="text" className="input" />
        </Form.Item>
        <Form.Item
          label="Wallet Address"
          name="walletAddress"
          className="Container"
        >
          <Input type="text" className="input" />
        </Form.Item>
        <Form.Item className="Container">
          <Button type="primary" htmlType="submit">
            Add Employee
          </Button>
        </Form.Item>
      </Form>

      {/* Employee list */}
      {/* <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            <strong>Name:</strong> {employee.name}, <strong>Address:</strong>{" "}
            {employee.walletAddress}, <strong>Status:</strong>{" "}
            {employee.status ? "Whitelisted" : "Blacklisted"}
          </li>
        ))}
      </ul> */}

      {/* Blacklist form */}
      {/* <Form
        onFinish={(values) => {
          const { walletAddress } = values;
          removeFromBlacklist(walletAddress);
        }}
      >
        <Form.Item label="Wallet Address" name="walletAddress">
          <Input type="text" className="input" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Remove from Blacklist
          </Button>
        </Form.Item>
      </Form>

      <Form
        onFinish={(values) => {
          const { walletAddress } = values;
          addToBlacklist(walletAddress);
        }}
      >
        <Form.Item label="Wallet Address" name="walletAddress">
          <Input type="text" className="input" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add to Blacklist
          </Button>
        </Form.Item>
      </Form> */}

      {/* <DashBoard employees={employees} getAllEmployees={getAllEmployees} /> */}
    </div>
  );
};

export default EmployeeManagement;
