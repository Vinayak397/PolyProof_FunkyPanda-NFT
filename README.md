# FunkyPanda NFT Project ERC271A

## NFT Collection (ERC721A with FxPortal Bridge)

### Overview

`FunkyPanda` is an ERC721A-based NFT smart contract that allows for the creation and management of a playful Panda-themed NFT collection. The contract limits the minting to a maximum of 5 NFTs, with enhanced gas optimization through the ERC721A standard. The repository also provides an outline for integrating the FxPortal bridge for transferring NFTs between Ethereum and Polygon networks.

### Features

- **ERC721A**: Implements a gas-efficient ERC721 standard for minting and transferring NFTs.
- **Minting Restriction**: Only the contract owner can mint, and the total supply is limited to 5.
- **Base URI Management**: Manages the metadata storage through IPFS.
- **FxPortal Bridge**: The contract supports cross-chain transfers using the FxPortal bridge for interoperability between Ethereum and Polygon.

---

### Contract Explanation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract FunkyPanda is ERC721A {
    
    address public owner;
    uint256 public constant NFT_Limit = 5;
    string public collection_des = "A Playful Panda NFT Collection";
    string private baseuri =
        "https://gray-efficient-porcupine-320.mypinata.cloud/ipfs/QmduUbpZiRQSHNFXBXsUAActKtjiKHCDNPhmW6xpNcchrj/";

    constructor() ERC721A("FunkyPanda", "FPND") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Onwer Can Mint");
        _;
    }

    function mint(uint256 quantity) external onlyOwner {
        require(totalSupply() + quantity <= NFT_Limit, "Not More than 5 NFT can be minted");
        _mint(msg.sender, quantity);
    }

    function _FetchBaseURi() internal view override returns (string memory) {
        return baseuri;
    }

    function GetDescription() external view returns (string memory) {
        return collection_des;
    }
}
```

The `FunkyPanda` contract is built using the ERC721A standard, which reduces the gas cost of minting and transferring NFTs, especially in batch minting scenarios.

- **Contract Details**:
    - **Name**: `FunkyPanda`
    - **Symbol**: `FPND`
    - **NFT Limit**: 5 NFTs (hardcoded in the contract).
    - **Owner**: Only the contract owner can mint new NFTs.
    - **Base URI**: Points to an IPFS storage location where the metadata is hosted.
    - **Mint Function**: Allows the owner to mint a specified quantity of NFTs while respecting the `NFT_Limit`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract FunkyPanda is ERC721A {
    
    address public owner;
    uint256 public constant NFT_Limit = 5;
    string public collection_des = "A Playful Panda NFT Collection";
    string private baseuri =
        "https://gray-efficient-porcupine-320.mypinata.cloud/ipfs/QmduUbpZiRQSHNFXBXsUAActKtjiKHCDNPhmW6xpNcchrj/";

    constructor() ERC721A("FunkyPanda", "FPND") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Onwer Can Mint");
        _;
    }

    function mint(uint256 quantity) external onlyOwner {
        require(totalSupply() + quantity <= NFT_Limit, "Not More than 5 NFT can be minted");
        _mint(msg.sender, quantity);
    }

    function _FetchBaseURi() internal view override returns (string memory) {
        return baseuri;
    }

    function GetDescription() external view returns (string memory) {
        return collection_des;
    }
}
```

### Deployment Script

The `deploy.js` script is used to deploy the `FunkyPanda` contract to the Ethereum blockchain using Hardhat.

#### `scripts/deploy.js`

```javascript
const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("FunkyPanda");
  console.log("Contract deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### FxPortal Bridge Integration

The `FunkyPanda` contract can be extended with the FxPortal bridge to enable cross-chain transfers between Ethereum and Polygon. The FxPortal bridge helps in transferring assets like ERC721 tokens from Ethereum to Polygon and back.

**Steps to integrate FxPortal**:
1. **Deploy the contract** on Ethereum.
2. **Register the token** with the FxPortal child contract on the Polygon network.
3. Use the **FxERC721** interface provided by FxPortal for initiating and handling the `deposit` and `withdraw` functions.

For a complete guide on FxPortal integration, refer to the [Polygon Documentation](https://docs.polygon.technology/docs/develop/ethereum-polygon/fx-portal/).

---

### Repository Structure

```
FunkyPanda/
│
├── contracts/
│   └── FunkyPanda.sol        # ERC721A-based NFT contract
│
├── scripts/
│   └── deploy.js             
│   └── mint.js
|   └── NFTTransfer.js 
|   └── getBalance.js            
│
├── README.md                
```

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/repo-name
   cd FunkyPanda
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Deploy the contract**:
   Modify `scripts/deploy.js` with your deployment details and run:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Bridge the NFT**:
   Use `scripts` to interact with the FxPortal bridge for cross-chain transfers.
