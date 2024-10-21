const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/FunkyPanda.sol/FunkyPanda.json");

const ContractAddress = "";
const tokenABI = tokenContractJSON.abi;
const FxERC721RootTunnel = "0x9E688939Cb5d484e401933D850207D6750852053";
const walletAddress = "";

async function main() {
  try {
    const tokenContract = await hre.ethers.getContractAt(
      tokenABI,
      ContractAddress
    );
    const fxContract = await hre.ethers.getContractAt(
      fxRootContractABI,
      FxERC721RootTunnel
    );

    const approveTx = await tokenContract.setApprovalForAll(
      FxERC721RootTunnel,
      true
    );
    await approveTx.wait();
    console.log("Approval confirmed successfully.");    

    for (let i = 0; i < 5; i++) {
      const depositTx = await fxContract.deposit(
        ContractAddress,
        walletAddress,
        i,
        "0x6556"
      );
      await depositTx.wait();
      console.log(`Token with ID ${i} deposited Successfully.`);
    }

    const balance = await tokenContract.balanceOf(walletAddress);
    console.log(`Token Balance - ${balance}`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
