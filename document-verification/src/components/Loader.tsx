import React from "react";

const Loader: React.FC = () => {
  return (
    <div>
      <div className="spinner-loading"></div>
      <h2>Uploading to IPFS</h2>
    </div>
  );
};

export default Loader;
