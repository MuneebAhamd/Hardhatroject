// import "./HomeScreenComponent.css";
// import SecureDocsLogo from "../../assets/SecureDocsLogo.png";
// import Graphicelementfilemanagement from "../../assets/Graphicelementfilemanagement.png";
// import one from "../../assets/1.png";
// import two from "../../assets/2.png";
// import three from "../../assets/3.png";
// import FooterComponent from "../Footer/FooterComponent";
// import { useState, useEffect } from "react";
// import { ethers, Signer } from "ethers";
// import Wallet from "../../assets/Wallet.png";

// const HomeScreen = () => {
//   const [current, setCurrent] = useState<string>("mail");
//   const [visible, setVisible] = useState<boolean>(false);

//   const [walletAddress, setWalletAddress] = useState<string>("");
//   const [provider, setProvider] =
//     useState<ethers.providers.Web3Provider | null>(null);

//   async function requestAccount() {
//     console.log("Requesting account...");

//     if (window.ethereum) {
//       console.log("detected");

//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setWalletAddress(accounts[0]);

//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         setProvider(provider);
//       } catch (error) {
//         console.log("Error connecting...", error);
//       }
//     } else {
//       alert("Meta Mask not detected");
//     }
//   }

//   async function transferEther() {
//     if (provider) {
//       const signer: Signer = provider.getSigner();
//       const tx = await signer.sendTransaction({
//         to: "0x2784BdD74FC4E0FA6eDDfE2d6e77B60B1936c7DC",
//         value: ethers.utils.parseEther("1"),
//       });
//       console.log("Transaction sent:", tx.hash);
//     }
//   }

//   useEffect(() => {
//     async function checkAccounts() {
//       if (window.ethereum) {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const accounts = await provider.listAccounts();
//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//           setProvider(provider);
//         }
//       }
//     }
//     checkAccounts();
//   }, []);
//   useEffect(() => {
//     window.localStorage.setItem("wallet", walletAddress);
//   }, [walletAddress]);

//   const showDrawer = () => {
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//   };

//   const handleClick = (e: any) => {
//     console.log("click ", e);
//     setCurrent(e.key);
//   };

//   return (
//     <div>
//       <div className="Body">
//         <img src={SecureDocsLogo} className="SecureDocsLogo" alt="logo" />
//         <div className="paraOne">
//           <p>
//             Keep your files secure and temper-proof with Securedocs.Our private
//             blockchain-based file management and verification system ensures
//             that your sensitive data is protected and verified,giving you peace
//             of mind and complete control over your information.Say goodbye to
//             unreliable file storage solutions and hello to the future of secure
//             data management.
//           </p>
//         </div>
//         <div className="web-Design">
//           <button className="btnBody">Connect to Metamask</button>
//         </div>

//         <div className="mob-Design">
//           <button className="btnMobile" onClick={requestAccount}>
//             <h4>Connect</h4>
//             <img src={Wallet} className="btnimg" alt="logo" />
//           </button>
//         </div>

//         <div>
//           <p className="paraTwo">
//             Our system uses advanced consensus mechanisms to achieve fast and
//             efficient file verification and validation,making it a reliable and
//             effective solution for your file management needs.
//           </p>
//         </div>
//         <div className="bodyHeading">
//           <h2 className="greenHeading">
//             A <span className="greyHeading">SMARTEST </span>WAY TO AUTHENTICATE{" "}
//             <span className="greyHeading">& STORE</span>
//           </h2>
//         </div>

//         <div>
//           <img
//             src={Graphicelementfilemanagement}
//             className="Graphicelementfilemanagement"
//             alt="logo"
//           />
//         </div>

//         <div>
//           <p className="paraThree">
//             Our system uses advanced consensus mechanisms to achieve fast and
//             efficient file verification and validation, making it a reliable and
//             effective solution for your file management needs.
//           </p>
//         </div>

//         <div>
//           <div>
//             <img src={one} className="oneImg" alt="logo" />
//             <div className="simpleone">
//               <h1 className="simpletxt">Simple</h1>
//               <p className="simpletxtpara">
//                 Effortlessly control access and track file activity with our
//                 user-friendly system.
//               </p>
//             </div>
//           </div>

//           <div className="twoImg">
//             <img src={two} className="oneImg" alt="logo" />
//             <div className="simpleone">
//               <h1 className="simpletxtTwo">Clear</h1>
//               <p className="simpletxtparaTwo">
//                 Securely manage and verify your files with blockchain
//                 technology.
//               </p>
//             </div>
//           </div>

//           <div className="threeImg">
//             <img src={three} className="oneImg" alt="logo" />
//             <div className="simpleone">
//               <h1 className="simpletxtThree">Effective</h1>
//               <p className="simpletxtparaThree">
//                 Protect your files and ensure their authenticity with our
//                 private blockchain-based file management and verification
//                 system.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="MobDesigVerticalSlider">
//           <div className="card">
//             <img src={one} className="CardOneImage" alt="logo" />
//             <div className="CardOneDiv">
//               <h1 className="CardOneHeading">Simple</h1>
//               <p className="CardOnePara">
//                 Effortlessly control access and track file activity with our
//                 user-friendly system.
//               </p>
//             </div>
//           </div>

//           <div className="card">
//             <img src={two} className="CardOneImage" alt="logo" />
//             <div className="CardOneDiv">
//               <h1 className="CardOneHeading">Clear</h1>
//               <p className="CardOnePara">
//                 Securely manage and verify your files with blockchain
//                 technology.
//               </p>
//             </div>
//           </div>

//           <div className="card">
//             <img src={three} className="CardOneImage" alt="logo" />
//             <div className="CardOneDiv">
//               <h1 className="CardOneHeading">Effective</h1>
//               <p className="CardOnePara">
//                 Protect your files and ensure their authenticity with our
//                 private blockchain-based file management and verification
//                 system.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="paraFourDiv">
//           <p className="paraFour">
//             We are committed to staying up-to-date with the latest developments
//             in blockchain technology, ensuring that our platform remains at the
//             forefront of innovation and security in the file management space.
//             <br />
//             <br />
//             Our platform is designed with the user in mind, offering an
//             intuitive and user-friendly interface that makes it easy to store,
//             manage, and verify your files with ease.
//           </p>
//         </div>
//       </div>
//       <FooterComponent />
//     </div>
//   );
// };

// export default HomeScreen;
import "./HomeScreenComponent.css";
import SecureDocsLogo from "../../assets/SecureDocsLogo.png";
import Graphicelementfilemanagement from "../../assets/Graphicelementfilemanagement.png";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import FooterComponent from "../Footer/FooterComponent";
import { useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import Wallet from "../../assets/Wallet.png";

const HomeScreen = () => {
  const [current, setCurrent] = useState<string>("mail");
  const [visible, setVisible] = useState<boolean>(false);

  const [walletAddress, setWalletAddress] = useState<string>("");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  async function requestAccount() {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      } catch (error) {
        console.log("Error connecting...", error);
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  async function transferEther() {
    if (provider) {
      const signer: Signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: "0x2784BdD74FC4E0FA6eDDfE2d6e77B60B1936c7DC",
        value: ethers.utils.parseEther("1"),
      });
      console.log("Transaction sent:", tx.hash);
    }
  }

  useEffect(() => {
    async function checkAccounts() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setProvider(provider);
        }
      }
    }
    checkAccounts();
  }, []);
  useEffect(() => {
    window.localStorage.setItem("wallet", walletAddress);
  }, [walletAddress]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <div className="Body">
        <img src={SecureDocsLogo} className="SecureDocsLogo" alt="logo" />
        <div className="paraOne">
          <p>
            Keep your files secure and temper-proof with Securedocs.Our private
            blockchain-based file management and verification system ensures
            that your sensitive data is protected and verified,giving you peace
            of mind and complete control over your information.Say goodbye to
            unreliable file storage solutions and hello to the future of secure
            data management.
          </p>
        </div>
        <div className="web-Design">
          <button className="btnBody">Connect to Metamask</button>
        </div>

        <div className="mob-Design">
          <button className="btnMobile" onClick={requestAccount}>
            <h4>Connect</h4>
            <img src={Wallet} className="btnimg" alt="logo" />
          </button>
        </div>

        <div>
          <p className="paraTwo">
            Our system uses advanced consensus mechanisms to achieve fast and
            efficient file verification and validation,making it a reliable and
            effective solution for your file management needs.
          </p>
        </div>
        <div className="bodyHeading">
          <h2 className="greenHeading">
            A <span className="greyHeading">SMARTEST </span>WAY TO AUTHENTICATE{" "}
            <span className="greyHeading">& STORE</span>
          </h2>
        </div>

        <div>
          <img
            src={Graphicelementfilemanagement}
            className="Graphicelementfilemanagement"
            alt="logo"
          />
        </div>

        <div>
          <p className="paraThree">
            Our system uses advanced consensus mechanisms to achieve fast and
            efficient file verification and validation, making it a reliable and
            effective solution for your file management needs.
          </p>
        </div>

        <div>
          <div>
            <img src={one} className="oneImg" alt="logo" />
            <div className="simpleone">
              <h1 className="simpletxt">Simple</h1>
              <p className="simpletxtpara">
                Effortlessly control access and track file activity with our
                user-friendly system.
              </p>
            </div>
          </div>

          <div className="twoImg">
            <img src={two} className="oneImg" alt="logo" />
            <div className="simpleone">
              <h1 className="simpletxtTwo">Clear</h1>
              <p className="simpletxtparaTwo">
                Securely manage and verify your files with blockchain
                technology.
              </p>
            </div>
          </div>

          <div className="threeImg">
            <img src={three} className="oneImg" alt="logo" />
            <div className="simpleone">
              <h1 className="simpletxtThree">Effective</h1>
              <p className="simpletxtparaThree">
                Protect your files and ensure their authenticity with our
                private blockchain-based file management and verification
                system.
              </p>
            </div>
          </div>
        </div>

        <div className="MobDesigVerticalSlider">
          <div className="card">
            <img src={one} className="CardOneImage" alt="logo" />
            <div className="CardOneDiv">
              <h1 className="CardOneHeading">Simple</h1>
              <p className="CardOnePara">
                Effortlessly control access and track file activity with our
                user-friendly system.
              </p>
            </div>
          </div>

          <div className="card">
            <img src={two} className="CardOneImage" alt="logo" />
            <div className="CardOneDiv">
              <h1 className="CardOneHeading">Clear</h1>
              <p className="CardOnePara">
                Securely manage and verify your files with blockchain
                technology.
              </p>
            </div>
          </div>

          <div className="card">
            <img src={three} className="CardOneImage" alt="logo" />
            <div className="CardOneDiv">
              <h1 className="CardOneHeading">Effective</h1>
              <p className="CardOnePara">
                Protect your files and ensure their authenticity with our
                private blockchain-based file management and verification
                system.
              </p>
            </div>
          </div>
        </div>

        <div className="paraFourDiv">
          <p className="paraFour">
            We are committed to staying up-to-date with the latest developments
            in blockchain technology, ensuring that our platform remains at the
            forefront of innovation and security in the file management space.
            <br />
            <br />
            Our platform is designed with the user in mind, offering an
            intuitive and user-friendly interface that makes it easy to store,
            manage, and verify your files with ease.
          </p>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default HomeScreen;
