const hre = require("hardhat");

async function main() {
  const EventFactory = await hre.ethers.getContractFactory("EventFactory");
  const eventFactory = await EventFactory.deploy();
  await eventFactory.deployed();
  console.log("Event Factory deployed to:", eventFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
