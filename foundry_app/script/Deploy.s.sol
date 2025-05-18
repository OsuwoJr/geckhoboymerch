// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "../src/NFT.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy contract
        GeckhoNFT nft = new GeckhoNFT();
        
        // Configure tiers with metadata URIs
        string memory baseURI = "ipfs://YOUR_IPFS_CID/";
        
        // Configure Genesis tier
        nft.configureTier(
            GeckhoNFT.Tier.GENESIS,
            0.072 ether,
            100,
            true
        );
        nft.setTierBaseURI(GeckhoNFT.Tier.GENESIS, string(abi.encodePacked(baseURI, "genesis/")));

        // Configure Exodus tier
        nft.configureTier(
            GeckhoNFT.Tier.EXODUS,
            0.14 ether,
            250,
            true
        );
        nft.setTierBaseURI(GeckhoNFT.Tier.EXODUS, string(abi.encodePacked(baseURI, "exodus/")));

        // Configure Revelation tier
        nft.configureTier(
            GeckhoNFT.Tier.REVELATION,
            0.29 ether,
            75,
            true
        );
        nft.setTierBaseURI(GeckhoNFT.Tier.REVELATION, string(abi.encodePacked(baseURI, "revelation/")));
        
        vm.stopBroadcast();
        
        console.log("NFT contract deployed to:", address(nft));
        console.log("Owner address:", nft.owner());
    }
} 