// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { encode } from "base-64";
// import { create } from "ipfs-http-client";

// const REACT_APP_INFURA_PROJECT_ID = "2QW6IKi5Z4wVrVVsEgx9xdcSFbo";
// const REACT_APP_INFURA_PROJECT_SECRET = "be87e1226697c7d7df0b2480b177c3a4";
// const secrets =
//   REACT_APP_INFURA_PROJECT_ID + ":" + REACT_APP_INFURA_PROJECT_SECRET;
// const encodedSecrets = encode(secrets);
// const ipfs = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     Authorization: "Basic " + encodedSecrets,
//   },
// });

// function Home() {
//   const [buf, setBuf] = useState(null);
//   const [hash, setHash] = useState("");
//   const [showLinks, setShowLinks] = useState(false);
//   //@ts-ignore
//   const captureFile = (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     const file = event.target.files[0];
//     let reader = new FileReader();
//     reader.readAsArrayBuffer(file);
//     reader.onloadend = () => convertToBuffer(reader);
//   };
//   //@ts-ignore
//   const convertToBuffer = async (reader) => {
//     const buffer = await new Uint8Array(reader.result);
//     //@ts-ignore
//     setBuf(buffer);
//   };
//   //@ts-ignore
//   const onSubmit = async (event) => {
//     event.preventDefault();
//     let ipfsId;
//     const buffer = buf;
//     try {
//       //@ts-ignore
//       const response = await ipfs.add(buffer);
//       ipfsId = response.cid.toString();
//       console.log("Generated IPFS Hash:", ipfsId);
//       setHash(ipfsId);
//     } catch (err) {
//       console.error(err);
//       alert("An error occurred. Please check the console");
//     }
//     setShowLinks(!!ipfsId);
//   };

//   return (
//     <div>
//       <h1>Upload files to IPFS</h1>
//       <h5>Choose a file to upload to IPFS</h5>
//       <Form onSubmit={onSubmit}>
//         <input type="file" onChange={captureFile} required />
//         <Button type="submit">Upload</Button>
//       </Form>
//       {showLinks ? (
//         <div>
//           <a href={"https://ipfs.io/ipfs/" + hash}>
//             Clickable Link to view file on IPFS
//           </a>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default Home;
import { useEffect } from "react";
import IPFS from "ipfs-http-client";

const ipfs = IPFS.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const hash = "<IPFS_IMAGE_HASH>";

async function retrieveImageFromIPFS() {
  try {
    const file = await ipfs.cat(hash);
    // Process the file data as needed
    console.log("Image retrieved from IPFS:", file);
  } catch (error) {
    console.error("Error retrieving image from IPFS:", error);
  }
}

export default function Home() {
  useEffect(() => {
    retrieveImageFromIPFS();
  }, []);

  return <h1>Hi</h1>; // Placeholder for the Home component
}
