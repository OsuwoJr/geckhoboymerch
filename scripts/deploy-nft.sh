#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Starting NFT deployment process...${NC}"

# 1. Generate metadata
echo -e "${BLUE}Generating metadata...${NC}"
node scripts/generate-metadata.js

# 2. Upload metadata to IPFS (requires ipfs-cli)
echo -e "${BLUE}Uploading metadata to IPFS...${NC}"
METADATA_CID=$(ipfs add -r metadata --quiet | tail -n1)
echo -e "${GREEN}Metadata uploaded to IPFS with CID: ${METADATA_CID}${NC}"

# 3. Update deployment script with IPFS CID
echo -e "${BLUE}Updating deployment script with IPFS CID...${NC}"
sed -i "s/YOUR_IPFS_CID/${METADATA_CID}/g" foundry_app/script/Deploy.s.sol

# 4. Deploy contract
echo -e "${BLUE}Deploying NFT contract...${NC}"
cd foundry_app
forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast --verify -vvvv

# 5. Save deployment info
echo -e "${BLUE}Saving deployment information...${NC}"
DEPLOY_OUTPUT=$(forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast --verify -vvvv 2>&1)
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep "NFT contract deployed to:" | awk '{print $NF}')
OWNER_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep "Owner address:" | awk '{print $NF}')

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "Contract Address: ${CONTRACT_ADDRESS}"
echo -e "Owner Address: ${OWNER_ADDRESS}"
echo -e "IPFS Metadata: ipfs://${METADATA_CID}"

# 6. Update frontend contract address
echo -e "${BLUE}Updating frontend contract address...${NC}"
sed -i "s/YOUR_DEPLOYED_CONTRACT_ADDRESS/${CONTRACT_ADDRESS}/g" src/app/components/Nft.tsx

echo -e "${GREEN}Setup complete! Your NFT collection is ready for minting.${NC}"
echo -e "Next steps:"
echo -e "1. Verify the contract on Lisk Sepolia Explorer"
echo -e "2. Test minting each tier"
echo -e "3. Share the dApp URL with your community" 