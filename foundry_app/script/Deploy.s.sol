// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "../src/NFT.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        GeckhoNFT nft = new GeckhoNFT();
        
        vm.stopBroadcast();
        
        console.log("NFT contract deployed to:", address(nft));
    }
} 