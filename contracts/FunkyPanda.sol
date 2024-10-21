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
