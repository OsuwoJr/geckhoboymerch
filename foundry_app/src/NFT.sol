// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

contract GeckhoNFT is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Tier definitions
    enum Tier { GENESIS, EXODUS, REVELATION }

    struct TierInfo {
        uint256 price;          // Price in ETH (wei)
        uint256 maxSupply;      // Maximum supply for this tier
        uint256 minted;         // Number of tokens minted in this tier
        bool active;            // Whether minting is active for this tier
        string baseURI;         // Base URI for this tier's metadata
    }

    // Mapping from tier to its information
    mapping(Tier => TierInfo) public tiers;
    
    // Mapping from token ID to its tier
    mapping(uint256 => Tier) public tokenTiers;

    // Events
    event TierMinted(address indexed minter, Tier tier, uint256 tokenId);
    event TierConfigured(Tier tier, uint256 price, uint256 maxSupply, bool active);
    event BaseURIUpdated(Tier tier, string baseURI);

    constructor() ERC721("Geckho NFT", "GCKH") Ownable(msg.sender) {
        // Initialize tiers with default values
        tiers[Tier.GENESIS] = TierInfo({
            price: 0.072 ether,
            maxSupply: 100,
            minted: 0,
            active: false,
            baseURI: ""
        });

        tiers[Tier.EXODUS] = TierInfo({
            price: 0.14 ether,
            maxSupply: 250,
            minted: 0,
            active: false,
            baseURI: ""
        });

        tiers[Tier.REVELATION] = TierInfo({
            price: 0.29 ether,
            maxSupply: 75,
            minted: 0,
            active: false,
            baseURI: ""
        });
    }

    // Mint function for specific tier
    function mint(Tier _tier) public payable nonReentrant returns (uint256) {
        TierInfo storage tierInfo = tiers[_tier];
        
        require(tierInfo.active, "Minting is not active for this tier");
        require(msg.value >= tierInfo.price, "Insufficient payment");
        require(tierInfo.minted < tierInfo.maxSupply, "Tier is sold out");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(msg.sender, newTokenId);
        tierInfo.minted++;
        tokenTiers[newTokenId] = _tier;

        // Refund excess payment if any
        if (msg.value > tierInfo.price) {
            payable(msg.sender).transfer(msg.value - tierInfo.price);
        }

        emit TierMinted(msg.sender, _tier, newTokenId);
        return newTokenId;
    }

    // Configure tier settings (owner only)
    function configureTier(
        Tier _tier,
        uint256 _price,
        uint256 _maxSupply,
        bool _active
    ) public onlyOwner {
        require(_maxSupply > tiers[_tier].minted, "Max supply cannot be less than minted");
        
        tiers[_tier].price = _price;
        tiers[_tier].maxSupply = _maxSupply;
        tiers[_tier].active = _active;

        emit TierConfigured(_tier, _price, _maxSupply, _active);
    }

    // Set base URI for a specific tier (owner only)
    function setTierBaseURI(Tier _tier, string memory _baseURI) public onlyOwner {
        tiers[_tier].baseURI = _baseURI;
        emit BaseURIUpdated(_tier, _baseURI);
    }

    // Get token URI based on tier
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        Tier tier = tokenTiers[tokenId];
        string memory baseURI = tiers[tier].baseURI;
        
        return string(abi.encodePacked(baseURI, _toString(tokenId)));
    }

    // Helper function to convert uint256 to string
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Get tier information
    function getTierInfo(Tier _tier) public view returns (
        uint256 price,
        uint256 maxSupply,
        uint256 minted,
        bool active,
        string memory baseURI
    ) {
        TierInfo memory info = tiers[_tier];
        return (info.price, info.maxSupply, info.minted, info.active, info.baseURI);
    }

    // Get tier of a token
    function getTokenTier(uint256 tokenId) public view returns (Tier) {
        require(_exists(tokenId), "Token does not exist");
        return tokenTiers[tokenId];
    }

    // Withdraw contract balance (owner only)
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    // Emergency pause tier minting (owner only)
    function pauseTier(Tier _tier) public onlyOwner {
        tiers[_tier].active = false;
        emit TierConfigured(_tier, tiers[_tier].price, tiers[_tier].maxSupply, false);
    }

    // Resume tier minting (owner only)
    function resumeTier(Tier _tier) public onlyOwner {
        tiers[_tier].active = true;
        emit TierConfigured(_tier, tiers[_tier].price, tiers[_tier].maxSupply, true);
    }
} 