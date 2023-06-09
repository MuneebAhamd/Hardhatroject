import { ethers, Contract } from "ethers";
import ABI from "../Contrcat/abi.json";
import DashBoard from "../components/DashBoard/DashBoard";

export const contractAddress = () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = "0x7d4493ada4cf7aa4dfb05e15858481c49435a79d";
    const contractABI = ABI;

    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      provider.getSigner()
    ) as Contract;
    // console.log("=====contractInstance============", contractInstance);
    // console.log("=========contract======", contractInstance.getAllEmployees);
    return contractInstance;
  } else {
    return "0x000000000000000000000000000000000000";
  }
};
