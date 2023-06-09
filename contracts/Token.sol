// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "hardhat/console.sol";

contract Token {
    string public name = "HardHat Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;

    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        console.log("Sender Balances", balances[msg.sender]);
        console.log(" Sender amount", amount, to);
        require(balances[msg.sender] >= amount, "Not Enough Tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}
