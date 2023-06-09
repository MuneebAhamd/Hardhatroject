import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Protected = (props: any) => {
  const { Component } = props;
  const walletAddress = window.localStorage.getItem("wallet");
  console.log("=======my wallet=========", walletAddress);

  const checkMetaMaskConnection = () => {
    if (!walletAddress) {
      toast.error("Re Connect MetaMask!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  if (!walletAddress) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
