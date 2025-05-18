const fs = require('fs');
const path = require('path');

const tiers = {
  genesis: {
    name: 'GECKHO GENESIS PASS',
    description: 'Foundation of the Movement - Be part of the beginning of something revolutionary.',
    image: 'ipfs://YOUR_IPFS_IMAGE_CID/genesis/',
    attributes: [
      { trait_type: 'Tier', value: 'Genesis' },
      { trait_type: 'Theme', value: 'Urban Jungle x Cyber Graffiti' },
      { trait_type: 'Style', value: 'Cel-shaded + glitchy neon highlights' },
      { trait_type: 'Total Supply', value: 100 },
      { trait_type: 'Access Level', value: 'Foundation' }
    ],
    features: [
      'Early Access to Music & Art',
      'Exclusive Merch Drops',
      'Creative Voting Power',
      'Fan Event Access (Yearly)',
      'Quarterly 1-of-1 Art/Gear Raffle'
    ]
  },
  exodus: {
    name: 'GECKHO EXODUS PASS',
    description: 'Building, Expanding, Evolving - Take the next step in the GECKHO universe.',
    image: 'ipfs://YOUR_IPFS_IMAGE_CID/exodus/',
    attributes: [
      { trait_type: 'Tier', value: 'Exodus' },
      { trait_type: 'Theme', value: 'Evolving Entity x Digital Metamorphosis' },
      { trait_type: 'Style', value: 'Dynamic comic-book realism with surreal evolution effects' },
      { trait_type: 'Total Supply', value: 250 },
      { trait_type: 'Access Level', value: 'Advanced' }
    ],
    features: [
      'Behind-the-Scenes Creation Access',
      'Private Discord + AMAs',
      'Vault Access to Unreleased Content',
      'Enhanced Voting Power (2x)',
      'Annual Artist Airdrop'
    ]
  },
  revelation: {
    name: 'GECKHO REVELATION PASS',
    description: 'The Future - Ultimate Tier for Loyal Visionaries. Exclusive to Genesis + Exodus holders.',
    image: 'ipfs://YOUR_IPFS_IMAGE_CID/revelation/',
    attributes: [
      { trait_type: 'Tier', value: 'Revelation' },
      { trait_type: 'Theme', value: 'Mythic Futurism x Cyber-God Ascension' },
      { trait_type: 'Style', value: 'Hyperreal digital painting with intricate gold/sci-fi line work' },
      { trait_type: 'Total Supply', value: 75 },
      { trait_type: 'Access Level', value: 'Ultimate' }
    ],
    features: [
      '1-of-1 Custom Collectible',
      'Co-Creation Credit',
      'Limited Merch Bundle',
      'Share of Royalties/Resale Revenue',
      'Lifetime Event Access'
    ]
  }
};

// Create metadata for each tier and token
Object.entries(tiers).forEach(([tier, data]) => {
  const tierDir = path.join(__dirname, '..', 'metadata', tier);
  fs.mkdirSync(tierDir, { recursive: true });

  const maxSupply = data.attributes.find(attr => attr.trait_type === 'Total Supply').value;
  
  // Generate metadata for each token in the tier
  for (let i = 1; i <= maxSupply; i++) {
    const metadata = {
      name: `${data.name} #${i}`,
      description: data.description,
      image: `${data.image}${i}.png`,
      attributes: [
        ...data.attributes,
        { trait_type: 'Token Number', value: i }
      ],
      features: data.features
    };

    fs.writeFileSync(
      path.join(tierDir, `${i}.json`),
      JSON.stringify(metadata, null, 2)
    );
  }
});

console.log('Metadata generation complete!'); 