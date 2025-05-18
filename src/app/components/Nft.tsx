'use client';

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDiamond, faCircle } from '@fortawesome/free-solid-svg-icons';

const nftTiers = [
  {
    name: 'GECKHO GENESIS PASS',
    subtitle: 'THE ORIGIN',
    description: 'Foundation of the Movement - Be part of the beginning of something revolutionary.',
    theme: 'Urban Jungle x Cyber Graffiti',
    style: 'Cel-shaded + glitchy neon highlights',
    color: 'neon-green',
    gradient: 'from-green-900/20 via-green-800/10 to-black',
    borderColor: 'border-green-500/20',
    hoverBorderColor: 'hover:border-green-500/40',
    buttonColor: 'bg-green-500 hover:bg-green-600',
    symbol: faStar,
    buttonText: 'Join the Genesis',
    price: '0.072 ETH',
    totalSupply: 100,
    remaining: 75,
    image: '/images/nft/genesis.jpg',
    features: [
      {
        category: 'Access & Utility',
        items: [
          'Early Access to Music & Art',
          'Exclusive Merch Drops',
          'Creative Voting Power',
          'Fan Event Access (Yearly)',
          'Quarterly 1-of-1 Art/Gear Raffle'
        ]
      },
      {
        category: 'Bonus Utility',
        items: [
          'Unlockable NFT Content',
          'Exclusive Demos',
          'Behind-the-scenes Footage',
          'Personal Voice/Video Messages'
        ]
      }
    ]
  },
  {
    name: 'EXODUS PASS',
    subtitle: 'THE JOURNEY',
    description: 'Building, Expanding, Evolving - Take the next step in the GECKHO universe.',
    theme: 'Evolving Entity x Digital Metamorphosis',
    style: 'Dynamic comic-book realism with surreal evolution effects',
    color: 'amber',
    gradient: 'from-amber-900/20 via-amber-800/10 to-black',
    borderColor: 'border-amber-500/20',
    hoverBorderColor: 'hover:border-amber-500/40',
    buttonColor: 'bg-amber-500 hover:bg-amber-600',
    symbol: faDiamond,
    buttonText: 'Begin the Exodus',
    price: '0.14 ETH',
    totalSupply: 250,
    remaining: 200,
    image: '/images/nft/exodus.jpg',
    features: [
      {
        category: 'Core Perks',
        items: [
          'Behind-the-Scenes Creation Access',
          'Private Discord + AMAs',
          'Vault Access to Unreleased Content',
          'Enhanced Voting Power (2x)',
          'Annual Artist Airdrop'
        ]
      },
      {
        category: 'Bonus Utility',
        items: [
          'Trait Evolution: "Ascended Exodus"',
          'Combine 2 Passes for Higher Tier',
          'Visual Mutation/Evolution',
          'Exclusive Badge'
        ]
      }
    ]
  },
  {
    name: 'REVELATION PASS',
    subtitle: 'THE ASCENSION',
    description: 'The Future - Ultimate Tier for Loyal Visionaries. Exclusive to Genesis + Exodus holders.',
    theme: 'Mythic Futurism x Cyber-God Ascension',
    style: 'Hyperreal digital painting with intricate gold/sci-fi line work',
    color: 'blue',
    gradient: 'from-blue-900/20 via-blue-800/10 to-black',
    borderColor: 'border-blue-500/20',
    hoverBorderColor: 'hover:border-blue-500/40',
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
    symbol: faCircle,
    buttonText: 'Ascend Now',
    price: '0.29 ETH',
    totalSupply: 75,
    remaining: 50,
    image: '/images/nft/revelation.jpg',
    features: [
      {
        category: 'Premium Collector Perks',
        items: [
          '1-of-1 Custom Collectible',
          'Co-Creation Credit',
          'Limited Merch Bundle',
          'Share of Royalties/Resale Revenue',
          'Lifetime Event Access'
        ]
      },
      {
        category: 'Collector Ecosystem',
        items: [
          '"True Believer" Title',
          'Special Profile Badge',
          'Guaranteed Free Mint',
          'Private Council Access',
          'Leaderboard Ranking'
        ]
      }
    ]
  }
];

const Nft = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-amber-400 to-yellow-400">
            GECKHO Trilogy Collection
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join the evolution of GECKHO through three distinct phases of artistic transformation.
            Each pass represents a unique stage in the journey.
          </p>
        </div>

        {/* NFT Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nftTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative bg-gradient-to-br ${tier.gradient} rounded-2xl p-6 border ${tier.borderColor} ${tier.hoverBorderColor} transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(var(--tier-color-rgb),0.2)]`}
              style={{
                '--tier-color-rgb': tier.color === 'neon-green' ? '0,255,0' : 
                                  tier.color === 'amber' ? '255,191,0' : 
                                  '0,123,255'
              } as React.CSSProperties}
            >
              {/* Artwork Image Container */}
              <div className="relative w-full mb-6 rounded-lg overflow-hidden aspect-[9/16]">
                <Image
                  src={tier.image}
                  alt={`${tier.name} artwork`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Coming Soon Badge */}
                <div className="absolute top-2 right-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${tier.buttonColor} text-white shadow-lg`}>
                    Coming Soon
                  </div>
                </div>
                {/* Theme and Style Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-sm text-white font-medium">{tier.theme}</p>
                  <p className="text-xs text-gray-300">{tier.style}</p>
                </div>
              </div>

              {/* Tier Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                  <p className="text-gray-400">{tier.subtitle}</p>
                </div>
                <FontAwesomeIcon 
                  icon={tier.symbol} 
                  className={`text-${tier.color}-500 text-2xl group-hover:scale-110 transition-transform duration-300`}
                />
              </div>

              {/* Tier Description */}
              <p className="text-gray-300 mb-6">{tier.description}</p>

              {/* Tier Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Price</span>
                  <span className="font-medium">{tier.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Supply</span>
                  <span className="font-medium">{tier.totalSupply}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Remaining</span>
                  <span className="font-medium">{tier.remaining}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-6 mb-6">
                {tier.features.map((featureGroup) => (
                  <div key={featureGroup.category}>
                    <h4 className={`text-${tier.color}-500 font-semibold mb-3 text-sm uppercase tracking-wider`}>
                      {featureGroup.category}
                    </h4>
                    <ul className="space-y-2">
                      {featureGroup.items.map((feature) => (
                        <li key={feature} className="flex items-center text-sm group/item">
                          <span className={`text-${tier.color}-500 mr-2 group-hover/item:scale-110 transition-transform duration-200`}>•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Mint Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg ${tier.buttonColor} text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-${tier.color}-500/20 hover:-translate-y-0.5`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Collection Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">About the Collection</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            The GECKHO Trilogy Collection represents a journey of artistic evolution and transformation.
            Each pass grants unique benefits and access to exclusive content, events, and community features.
            Join us in this revolutionary artistic movement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nft; 