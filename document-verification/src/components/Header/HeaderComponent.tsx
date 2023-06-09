import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer, Menu, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { ethers, Signer } from "ethers";
import Logo from "../../assets/Logo.png";
import Wallet from "../../assets/Wallet.png";
import { contractAddress } from "../../utils/common";
import "./HeaderComponent.css";

const { SubMenu } = Menu;
const { Text } = Typography;

interface Employee {
  walletAddress: string;
  status: boolean;
}

const HeaderComponent: React.FC = () => {
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
    <>
      {isAllowed ||
      walletAddress === "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
        <div className="headerset">
          <header className="Header">
            <>
              <div className="mobileMenuButton">
                <Button
                  className="menubtn"
                  type="primary"
                  icon={<MenuOutlined />}
                  onClick={showDrawer}
                />
              </div>
              <Drawer
                className="drawerAll"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgb(215, 237, 233)",
                }}
                placement="right"
                onClose={onClose}
                visible={visible}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "100px",
                  }}
                >
                  <Button
                    style={{ padding: "30px", fontSize: "20px" }}
                    type="text"
                    href="/"
                  >
                    Home
                  </Button>
                  <Button
                    style={{ padding: "30px", fontSize: "20px" }}
                    type="text"
                    href="/dashboard"
                  >
                    Dashboard
                  </Button>
                  <Button
                    style={{ padding: "30px", fontSize: "20px" }}
                    type="text"
                    href="/files"
                    // disabled={!filteredEmployees.length}
                  >
                    Files
                  </Button>
                  <Button
                    style={{ padding: "30px", fontSize: "20px" }}
                    type="text"
                    href="/setting"
                  >
                    Setting
                  </Button>
                  <Button
                    style={{ padding: "30px", fontSize: "20px" }}
                    type="text"
                    href="/faq"
                  >
                    FAQs
                  </Button>
                </div>
              </Drawer>
            </>
            <div className="leftHead">
              <img src={Logo} className="headerLogo" alt="logo" />
              <h6 className="lefth1">SECURE DOCS</h6>
            </div>
            <div className="MiddleHeader" onClick={handleClick}>
              <Link className="Home" to="/">
                Home
              </Link>
              {walletAddress ===
              "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
                <Link className="Home" to="/dashboard">
                  Dashboard
                </Link>
              ) : (
                <Link
                  className="Home"
                  to="/"
                  onClick={() => alert("Only the admin is allowed")}
                >
                  Dashboard
                </Link>
              )}

              <div>
                {isAllowed ||
                walletAddress ===
                  "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
                  <Link className="Files" to="/files">
                    Files
                  </Link>
                ) : (
                  <Link className="Home" to="/">
                    Home
                  </Link>
                )}
                {isAllowed ||
                walletAddress ===
                  "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
                  <Link className="Setting" to="/setting">
                    Setting
                  </Link>
                ) : (
                  <Link className="Home" to="/">
                    Home
                  </Link>
                )}
                {isAllowed ||
                walletAddress ===
                  "0xd35B39AE7755c6daF75a5547cc204C2E203558f0" ? (
                  <Link className="FAQs" to="/faq">
                    FAQs
                  </Link>
                ) : (
                  <Link className="Home" to="/">
                    Home
                  </Link>
                )}
              </div>
              {provider && (
                <div className="btnHeader1">
                  <h3>
                    Wallet Address:{" "}
                    {walletAddress.slice(0, 5) +
                      "..." +
                      walletAddress.slice(-5)}
                  </h3>
                  <button className="btnimg" onClick={transferEther}>
                    Transfer Ether
                  </button>
                </div>
              )}
              {!provider && (
                <button className="btnHeader" onClick={requestAccount}>
                  <h4>Connect</h4>
                  <img src={Wallet} className="btnimg" alt="logo" />
                </button>
              )}
            </div>
          </header>
        </div>
      ) : null}
    </>
  );
};

export default HeaderComponent;
