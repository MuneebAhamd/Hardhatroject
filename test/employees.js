 const { expect } = require("chai");
// const { ethers } = require("hardhat");

describe("EmployeeManagement", function () {
  let EmployeeManagement;
  let employeeCount;
  let employeeAddedEvent;
  let blacklistedEvent;

  beforeEach(async function () {
    const EmployeesContract = await ethers.getContractFactory("EmployeeManagement");
    EmployeeManagement = await EmployeesContract.deploy();
    await EmployeeManagement.deployed();
    employeeCount = 0;

    // Fetching the events
    employeeAddedEvent = EmployeeManagement.filters.EmployeeAdded();
    blacklistedEvent = EmployeeManagement.filters.Blacklisted();
  });

  it("should add an employee", async function () {
    const name = "HardHat Token";
    const walletAddress = "0x0000000000000000000000000000000000000000";
    await EmployeeManagement.addEmployee(name, walletAddress);

    const employee = await EmployeeManagement.getEmployee(employeeCount);
    expect(employee.name).to.equal(name);
    expect(employee.walletAddress).to.equal(walletAddress);
    expect(employee.status).to.equal(true);

    const allEmployees = await EmployeeManagement.getAllEmployees();
    expect(allEmployees.length).to.equal(2);
    expect(allEmployees[0].name).to.equal(name);
    expect(allEmployees[0].walletAddress).to.equal(walletAddress);
    expect(allEmployees[0].status).to.equal(true);

    const events = await EmployeeManagement.queryFilter(employeeAddedEvent);
    const eventArgs = events[0].args;
    expect(eventArgs.employeeId).to.equal(employeeCount);
    expect(eventArgs.name).to.equal(name);
    expect(eventArgs.walletAddress).to.equal(walletAddress);
    expect(eventArgs.status).to.equal(true);
  });
it("should blacklist a wallet address", async function () {
  const walletAddress = "0x0000000000000000000000000000000000000000";

  const isBlacklistedBefore = await EmployeeManagement.isBlacklisted(walletAddress);
  expect(isBlacklistedBefore).to.equal(false);

  await EmployeeManagement.addToBlacklist(walletAddress);

  const isBlacklistedAfter = await EmployeeManagement.isBlacklisted(walletAddress);
  expect(isBlacklistedAfter).to.equal(true);

  const employee = await EmployeeManagement.getEmployee(employeeCount);
  expect(employee.status).to.equal(false);

  const events = await EmployeeManagement.queryFilter(blacklistedEvent);
  const eventArgs = events[0].args;
  expect(eventArgs.walletAddress).to.equal(walletAddress);
});

it("should remove a wallet address from the blacklist", async function () {
  const walletAddress = "0x0000000000000000000000000000000000000000";

  await EmployeeManagement.addToBlacklist(walletAddress);

  const isBlacklistedBefore = await EmployeeManagement.isBlacklisted(walletAddress);
  expect(isBlacklistedBefore).to.equal(true);

  await EmployeeManagement.removeFromBlacklist(walletAddress);

  const isBlacklistedAfter = await EmployeeManagement.isBlacklisted(walletAddress);
  expect(isBlacklistedAfter).to.equal(false);

  const employee = await EmployeeManagement.getEmployee(employeeCount);
  expect(employee.status).to.equal(true);
})
})
