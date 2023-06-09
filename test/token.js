// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Token Contract",function(){
//     let Token;
//     let hardhatToken;
//     let owner;
//     let add1;
//     let add2;
//     let adds;



//     beforeEach(async function(){
//         Token = await ethers.getContractFactory("Token");
//         [owner,add1,add2,...adds]= await ethers.getSigners();
//         hardhatToken = await Token.deploy(); 
//     })

//     describe("Deployment",function(){
//         it("Should set the right owner",async function(){
//             expect(await hardhatToken.owner()).to.equal(owner.address);
//         })
//         it("Should assign the total supply of token to the owner",async function(){
//             const ownerBalance = await hardhatToken.balanceOf(owner.address);
//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//         })
//     })
//     describe("Transcation",function(){
//         it("Should transfer tokens between accounts",async function(){

//             await hardhatToken.transfer(add1.address,5);
//             const add1Balance =await hardhatToken.balanceOf(add1.address);
//             expect(add1Balance).to.equal(5);

//             await hardhatToken.connect(add1).transfer(add2.address,5)
//             const add2Balance = await hardhatToken.balanceOf(add2.address)
//             expect(add2Balance).to.equal(5);
//         })
//         it("Should fail  if sender does not haver  tokens",async function(){
//             const initialOwnerBalance = await hardhatToken.balanceOf(owner.address)
//             await expect (hardhatToken.connect(add1).transfer(owner.address,1)).to.be.revertedWith("Not Enough Tokens");
//             expect (await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance)
//         })
//         it("Should Update Balances after transfer",async function(){
//             const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
//             await hardhatToken.transfer(add1.address,5);
//             await hardhatToken.transfer(add2.address,10);
//             const finalOwnwerBalance = await hardhatToken.balanceOf(owner.address);
//             expect (finalOwnwerBalance).to.equal(initialOwnerBalance-15);
//             const add1Balance = await hardhatToken.balanceOf(add1.address);
//             expect (add1Balance).to.equal(5);
//             const add2Balance = await hardhatToken.balanceOf(add2.address);
//             expect (add2Balance).to.equal(10);
        
//     });
//     })
// })
