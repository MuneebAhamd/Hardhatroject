import React from 'react';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
return (
<div>
<div className="spinner-loading" />
<h2>Uploading to IPFS</h2>
</div>
);
};

export default Loader;