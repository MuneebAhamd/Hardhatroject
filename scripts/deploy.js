async function main() {
  const { ethers } = require("hardhat");
  const [deployer] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  console.log("Token Deploy address", token.address);

  // const EmployeeManagement = await ethers.getContractFactory("EmployeeManagement");
  // const employee = await EmployeeManagement.deploy();
  // console.log("EmployeeManagement Deploy address", employee.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
 