// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // We get the contract to deploy.
  const Eclimate = await hre.ethers.getContractFactory("Eclimate");
  const eclimate = await Eclimate.deploy();

  await eclimate.deployed();

  console.log("Transfer funds deployed to:", eclimate.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
