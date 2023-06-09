// import "./App.css";
// import FAQs from "./components/FAQs/Faq";
// import DashBoard from "./components/DashBoard/DashBoard";
// import { Route, Routes } from "react-router-dom";
// import HeaderComponent from "./components/Header/HeaderComponent";
// import UserProfile from "./components/Files/Files";
// import "./globalTypes/global.d.ts";
// import Protected from "./components/Protected";
// import "react-toastify/dist/ReactToastify.css";
// import Profile from "./components/Profile/Profile";
// import HomeScreen from "./components/HomeScreen/HomeScreen";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button, Drawer, Menu, Typography } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import { ethers, Signer } from "ethers";
// import { contractAddress } from "../src/utils/common";

// const { SubMenu } = Menu;
// const { Text } = Typography;

// interface Employee {
//   walletAddress: string;
//   status: boolean;
// }
// const Home = () => {
//   const [visible, setVisible] = useState<boolean>(false);
//   const [walletAddress, setWalletAddress] = useState<string>("");
//   const [provider, setProvider] =
//     useState<ethers.providers.Web3Provider | null>(null);
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [isAllowed, setIsAllowed] = useState<boolean>(false);

//   useEffect(() => {
//     const checkAccounts = async () => {
//       if (window.ethereum) {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const network = await provider.getNetwork();
//         const accounts = await provider.listAccounts();

//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//           setProvider(provider);
//         } else if (network.chainId === 80001) {
//           try {
//             const accounts = await window.ethereum.request({
//               method: "eth_requestAccounts",
//               params: [{ eth_chainId: "0x13881" }],
//             });
//             setWalletAddress(accounts[0]);
//             const provider = new ethers.providers.Web3Provider(
//               window.ethereum,
//               "mumbai"
//             );
//             setProvider(provider);
//           } catch (error) {
//             console.log("Error connecting:", error);
//           }
//         }
//       }
//     };

//     checkAccounts();
//   }, []);

//   useEffect(() => {
//     window.localStorage.setItem("wallet", walletAddress);
//   }, [walletAddress]);

//   useEffect(() => {
//     const getAllEmployees = async () => {
//       try {
//         if (contractAddress) {
//           const contract = contractAddress();
//           //@ts-ignore
//           const allEmployees = await contract.getAllEmployees();
//           setEmployees(allEmployees);
//         }
//       } catch (err) {
//         console.error("Failed to get all employees:", err);
//       }
//     };

//     getAllEmployees();
//   }, []);

//   useEffect(() => {
//     let isAllowed = false;
//     let showAlert = true;

//     employees?.forEach((item) => {
//       if (item.walletAddress === walletAddress) {
//         if (item.status === true) {
//           isAllowed = true;
//         } else {
//           isAllowed = false;

//           if (showAlert) {
//             alert("Account is deactivated");
//             showAlert = false;
//           }
//         }
//       }
//     });

//     setIsAllowed(isAllowed);
//   }, [employees, walletAddress]);

//   const requestAccount = async () => {
//     console.log("Requesting account...");

//     if (window.ethereum) {
//       console.log("Detected");

//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });

//         const walletAddress = accounts[0];

//         const employee = employees.find(
//           (emp) => emp.walletAddress === walletAddress
//         );
//         console.log(employee);

//         if (employee && !employee.status) {
//           await window.ethereum.request({
//             method: "wallet_requestPermissions",
//             params: [{ eth_accounts: {} }],
//           });

//           console.log("Metamask account disconnected.");
//           return;
//         }

//         setWalletAddress(walletAddress);
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         setProvider(provider);
//       } catch (error) {
//         console.log("Error connecting:", error);
//       }
//     } else {
//       alert("MetaMask not detected");
//     }
//   };

//   const transferEther = async () => {
//     if (provider) {
//       const signer: Signer = provider.getSigner();
//       const tx = await signer.sendTransaction({
//         to: "0x2784BdD74FC4E0FA6eDDfE2d6e77B60B1936c7DC",
//         value: ethers.utils.parseEther("1"),
//       });
//       console.log("Transaction sent:", tx.hash);
//     }
//   };

//   const showDrawer = () => {
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//   };

//   const handleClick = (e: any) => {
//     console.log("click", e);
//     //@ts-ignore
//     setCurrent(e.key);
//   };

//   return (
//     <div className="App">
//       <HeaderComponent />
//       {isAllowed ||
//       walletAddress === "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
//         <Routes>
//           <Route path="/" element={<HomeScreen />} />
//           <Route path="Profile" element={<Profile />} />
//           <Route path="faq" element={<Protected Component={FAQs} />} />
//           <Route
//             path="dashBoard"
//             element={<Protected Component={DashBoard} />}
//           />
//           <Route path="files" element={<Protected Component={UserProfile} />} />
//           <Route
//             path="files/:type"
//             element={<Protected Component={UserProfile} />}
//           />
//           <Route path="#" element={<Protected Component={UserProfile} />} />
//         </Routes>
//       ) : (
//         <Route path="/" element={<HomeScreen />} />
//       )}
//     </div>
//   );
// };

// export default Home;
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HeaderComponent from "./components/Header/HeaderComponent";
// import HomeScreen from "./components/HomeScreen/HomeScreen";
// import FAQs from "./components/FAQs/Faq";
// import DashBoard from "./components/DashBoard/DashBoard";
// import UserProfile from "./components/Files/Files";
// import Protected from "./components/Protected";
// import Profile from "./components/Profile/Profile";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   return (
//     <div className="App">
//       <Router>
//         <HeaderComponent />
//         <Routes>
//           <Route path="/" element={<HomeScreen />} />
//           {/* <Route path="/" element={<Protected Component={HomeScreen} />} /> */}
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/faq" element={<Protected Component={FAQs} />} />
//           <Route
//             path="/dashboard"
//             element={<Protected Component={DashBoard} />}
//           />
//           <Route
//             path="/files"
//             element={<Protected Component={UserProfile} />}
//           />
//           <Route
//             path="/files/:type"
//             element={<Protected Component={UserProfile} />}
//           />
//           <Route path="/*" element={<Protected Component={UserProfile} />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ethers, Signer } from "ethers";
import { Button, Drawer, Menu, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import HeaderComponent from "./components/Header/HeaderComponent";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Profile from "./components/Profile/Profile";
import FAQs from "./components/FAQs/Faq";
import DashBoard from "./components/DashBoard/DashBoard";
import UserProfile from "./components/Files/Files";
import Protected from "./components/Protected";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { contractAddress } from "../src/utils/common";

const { SubMenu } = Menu;
const { Text } = Typography;

interface Employee {
  walletAddress: string;
  status: boolean;
}

const Home = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  useEffect(() => {
    const checkAccounts = async () => {
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
    };

    checkAccounts();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("wallet", walletAddress);
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

  useEffect(() => {
    let isAllowed = false;
    let showAlert = true;

    employees?.forEach((item) => {
      if (item.walletAddress === walletAddress) {
        if (item.status === true) {
          isAllowed = true;
        } else {
          isAllowed = false;

          if (showAlert) {
            alert("Account is deactivated");
            showAlert = false;
          }
        }
      }
    });

    setIsAllowed(isAllowed);
  }, [employees, walletAddress]);

  const requestAccount = async () => {
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
        console.log(employee);

        if (employee && !employee.status) {
          await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
          });

          console.log("Metamask account disconnected.");
          return;
        }

        setWalletAddress(walletAddress);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      } catch (error) {
        console.log("Error connecting:", error);
      }
    } else {
      alert("MetaMask not detected");
    }
  };

  const transferEther = async () => {
    if (provider) {
      const signer: Signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: "0x2784BdD74FC4E0FA6eDDfE2d6e77B60B1936c7DC",
        value: ethers.utils.parseEther("1"),
      });
      console.log("Transaction sent:", tx.hash);
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = (e: any) => {
    console.log("click", e);
    //@ts-ignore
    setCurrent(e.key);
  };

  return (
    <div className="App">
      <HeaderComponent />
      {isAllowed ||
      walletAddress === "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
        <Routes>
          <HeaderComponent />
          <Route path="/" element={<HomeScreen />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="faq" element={<Protected Component={FAQs} />} />
          <Route
            path="dashBoard"
            element={<Protected Component={DashBoard} />}
          />
          <Route path="files" element={<Protected Component={UserProfile} />} />
          <Route
            path="files/:type"
            element={<Protected Component={UserProfile} />}
          />
          <Route path="#" element={<Protected Component={UserProfile} />} />
        </Routes>
      ) : (
        <Route path="/" element={<HomeScreen />} />
      )}
    </div>
  );
};

export default Home;
