const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/FunkyPanda.sol/FunkyPanda.json");

const AmoytokenAddress = "";
const tokenABI = tokenContractJSON.abi;
const walletAddress = "";

async function main() {
  try {
    const token = await hre.ethers.getContractAt(tokenABI, AmoytokenAddress);
    const balance = await token.balanceOf(walletAddress);
    console.log(`Polygon Chain Balance: ${balance}`);
  } catch (error) {
    console.log("Issues Generate",error);
    process.exitCode = 1;
  }
}

main();
