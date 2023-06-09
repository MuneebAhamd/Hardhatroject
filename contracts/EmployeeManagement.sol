// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EmployeeManagement {
    struct Employee {
        string name;
        address walletAddress;
        bool status;
    }

    mapping(uint256 => Employee) private employees;
    uint256 private employeeCount;
    mapping(address => bool) private blacklist;

    event EmployeeAdded(
        uint256 indexed employeeId,
        string name,
        address walletAddress,
        bool status
    );
    event Blacklisted(address indexed walletAddress);

    constructor() {
        addEmployee("HardHat Token", address(0));
    }

    function addEmployee(string memory _name, address _walletAddress) public {
        require(!blacklist[_walletAddress], "Wallet address is blacklisted");

        uint256 employeeId = employeeCount;
        employees[employeeId] = Employee(_name, _walletAddress, true);
        employeeCount++;

        emit EmployeeAdded(employeeId, _name, _walletAddress, true);
    }

    function getEmployee(
        uint256 employeeId
    ) public view returns (Employee memory) {
        require(employeeId < employeeCount, "Employee does not exist");

        return employees[employeeId];
    }

    function getAllEmployees() public view returns (Employee[] memory) {
        Employee[] memory allEmployees = new Employee[](employeeCount);

        for (uint256 i = 0; i < employeeCount; i++) {
            allEmployees[i] = employees[i];
        }

        return allEmployees;
    }

    function addToBlacklist(address walletAddress) public {
        require(
            !blacklist[walletAddress],
            "Wallet address is already blacklisted"
        );

        blacklist[walletAddress] = true;
        updateEmployeeStatus(walletAddress, false);

        emit Blacklisted(walletAddress);
    }

    function isBlacklisted(address walletAddress) public view returns (bool) {
        return blacklist[walletAddress];
    }

    function removeFromBlacklist(address walletAddress) public {
        require(blacklist[walletAddress], "Wallet address is not blacklisted");

        blacklist[walletAddress] = false;
        updateEmployeeStatus(walletAddress, true);
    }

    function updateEmployeeStatus(
        address walletAddress,
        bool newStatus
    ) private {
        for (uint256 i = 0; i < employeeCount; i++) {
            if (employees[i].walletAddress == walletAddress) {
                employees[i].status = newStatus;
            }
        }
    }
}
