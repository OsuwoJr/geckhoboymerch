'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faFire, faCrown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import SubscriptionForm from './SubscriptionForm';

const subscriptionTiers = [
  {
    name: 'ECHO ROOTS',
    subtitle: 'THE FOUNDATION',
    description: 'The roots of the fanbase — loyal, early supporters who help GECKHOBOY grow.',
    theme: 'Organic Minimalism',
    style: 'Minimalist + street-style sketch with grainy texture',
    color: 'green',
    gradient: 'from-green-900/20 via-green-800/10 to-black',
    borderColor: 'border-green-500/20',
    hoverBorderColor: 'hover:border-green-500/40',
    buttonColor: 'bg-green-500 hover:bg-green-600',
    symbol: faSeedling,
    buttonText: 'Join Echo Roots',
    price: 'KES 500',
    period: 'month',
    image: '/images/subscription/echo-roots.jpg',
    members: 128,
    features: [
      {
        category: 'Community Perks',
        items: [
          'Monthly shoutout in fan appreciation post',
          'Early streaming access to new music',
          'Access to private fan group chat'
        ]
      },
      {
        category: 'What You Get',
        items: [
          'Early community access',
          'Fan recognition',
          'Basic community engagement'
        ]
      }
    ]
  },
  {
    name: 'FIRE SIGNALS',
    subtitle: 'THE AMPLIFIER',
    description: 'The heat starts to rise. These are fans sending visible support, amplifying GECKHOBOY\'s message.',
    theme: 'Bold & Energetic',
    style: 'Graphic novel vibes with bold colors, comic-style linework',
    color: 'red',
    gradient: 'from-red-900/20 via-red-800/10 to-black',
    borderColor: 'border-red-500/20',
    hoverBorderColor: 'hover:border-red-500/40',
    buttonColor: 'bg-red-500 hover:bg-red-600',
    symbol: faFire,
    buttonText: 'Join Fire Signals',
    price: 'KES 1,000',
    period: 'month',
    image: '/images/subscription/fire-signals.jpg',
    members: 64,
    features: [
      {
        category: 'Enhanced Access',
        items: [
          'Behind-the-scenes vlogs & freestyles',
          'Monthly livestream access',
          'Free digital downloads of singles'
        ]
      },
      {
        category: 'All Tier 1 Perks Plus',
        items: [
          'Studio clips access',
          'Lyric notebook previews',
          'Tour logs & updates'
        ]
      }
    ]
  },
  {
    name: 'REALM KEEPERS',
    subtitle: 'THE INNER CIRCLE',
    description: 'The inner circle, guardians of the movement, trusted voices in GECKHOBOY\'s creative kingdom.',
    theme: 'Mythic & Regal',
    style: 'Futuristic fantasy-meets-street — clean gold lines, dark mode backdrop',
    color: 'purple',
    gradient: 'from-purple-900/20 via-purple-800/10 to-black',
    borderColor: 'border-purple-500/20',
    hoverBorderColor: 'hover:border-purple-500/40',
    buttonColor: 'bg-purple-500 hover:bg-purple-600',
    symbol: faCrown,
    buttonText: 'Join Realm Keepers',
    price: 'KES 2,000',
    period: 'month',
    image: '/images/subscription/realm-keepers.jpg',
    members: 32,
    features: [
      {
        category: 'Premium Access',
        items: [
          'Unreleased vault playlist access',
          'Name in credits of next release',
          'First dibs on limited merch drops',
          'Monthly personalized shoutout'
        ]
      },
      {
        category: 'All Tier 2 Perks Plus',
        items: [
          'Rotating demos & alt versions',
          'Subscribers-only content',
          'Priority merch access',
          'Personalized audio/video messages'
        ]
      }
    ]
  }
];

const Subscription = () => {
  const [selectedTier, setSelectedTier] = React.useState<{name: string; price: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSubscribe = (tier: { name: string; price: string }) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-amber-400 to-blue-400">
            GECKHO Support Tiers
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join our community through monthly support tiers. Get exclusive access to content,
            behind-the-scenes insights, and connect with other fans.
          </p>
        </div>

        {/* Subscription Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptionTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative bg-gradient-to-br ${tier.gradient} rounded-2xl p-6 border ${tier.borderColor} ${tier.hoverBorderColor} transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(var(--tier-color-rgb),0.2)]`}
              style={{
                '--tier-color-rgb': tier.color === 'green' ? '0,255,0' : 
                                  tier.color === 'red' ? '255,0,0' : 
                                  '147,51,234'
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
                {/* Member Count Badge */}
                <div className="absolute top-2 right-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${tier.buttonColor} text-white shadow-lg`}>
                    {tier.members} Members
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

              {/* Price Display */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-gray-400 ml-2">/{tier.period}</span>
                </div>
              </div>

              {/* Tier Description */}
              <p className="text-gray-300 mb-6">{tier.description}</p>

              {/* Features List */}
              <div className="space-y-6 mb-6">
                {tier.features.map((featureGroup, groupIdx) => (
                  <div key={groupIdx}>
                    <h4 className={`text-${tier.color}-500 font-semibold mb-3 text-sm uppercase tracking-wider`}>
                      {featureGroup.category}
                    </h4>
                    <ul className="space-y-2">
                      {featureGroup.items.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm group/item">
                          <span className={`text-${tier.color}-500 mr-2 group-hover/item:scale-110 transition-transform duration-200`}>•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Subscribe Button */}
              <button
                onClick={() => handleSubscribe({ name: tier.name, price: tier.price })}
                className={`w-full py-3 px-6 rounded-lg ${tier.buttonColor} text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-${tier.color}-500/20 hover:-translate-y-0.5`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscription vs NFT</h2>
          <div className="max-w-3xl mx-auto text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-green-400">Subscriptions</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Recurring monthly payment</li>
                  <li>• No ownership rights</li>
                  <li>• Light BTS & unreleased content</li>
                  <li>• Support-only engagement</li>
                  <li>• Secondary merch priority</li>
                  <li>• Generalized shoutouts</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">NFTs</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• One-time mint or purchase</li>
                  <li>• Blockchain-based ownership</li>
                  <li>• Exclusive unlockable content</li>
                  <li>• Creative voting rights</li>
                  <li>• Primary merch priority</li>
                  <li>• 1-of-1 personalized content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Form Modal */}
      <SubscriptionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTier={selectedTier}
      />
    </div>
  );
};

export default Subscription; 