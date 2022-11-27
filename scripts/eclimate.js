const hre = require("hardhat");

// Returns the Ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx ++;
  }
}

// Logs the memos stored on-chain from fund donors.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}

async function main() {
  // Get the example accounts we'll be working with.
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // We get the contract to deploy.
  const Eclimate = await hre.ethers.getContractFactory("Eclimate");
  const eclimate = await Eclimate.deploy();

  // Deploy the contract.
  await eclimate.deployed();
  console.log("Eclimate deployed to:", eclimate.address);

  // Check balances at the start.
  const addresses = [owner.address, tipper.address, eclimate.address];
  console.log("== start ==");
  await printBalances(addresses);

  // distributing some funds to farmers.
  const tip = {value: hre.ethers.utils.parseEther("1")};
  await eclimate.connect(tipper).donateFund("Carolina", "You're the best!", tip);
  await eclimate.connect(tipper2).donateFund("Vitto", "Amazing!", tip);
  await eclimate.connect(tipper3).donateFund("Kay", "I love my Proof of Knowledge", tip);

  // Check balances after fund distribution.
  console.log("== bought coffee ==");
  await printBalances(addresses);

  // Withdraw.
  await eclimate.connect(owner).withdrawTips();

  // Check balances after withdrawal.
  console.log("== withdrawTips ==");
  await printBalances(addresses);

  // Check out the memos.
  console.log("== memos ==");
  const memos = await eclimate.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
