// require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY ="0acexPTl6G-qkpfACXfyKh5T3uya3E5k";
const ROPSTEN_PRIVATE_KEY="b575aca21b19e5f54bb82b7a9f3684412975de88c198dc4ac4ae70bf97b9f563";
module.exports = {
  solidity: "0.8.18",
  networks:{
    ropsten:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${ROPSTEN_PRIVATE_KEY}`],
    }
  }
};
 