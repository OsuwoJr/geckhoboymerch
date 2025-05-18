'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '../store/cartStore';
import type { CartStore } from '../store/cartStore';

interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  backImage: string;
  description: string;
}

interface MusicRelease {
  id: number;
  title: string;
  releaseType: string;
  releaseDate: string;
  items: MerchItem[];
}

const musicReleases: MusicRelease[] = [
  {
    id: 1,
    title: "Miles Apart",
    releaseType: "Single",
    releaseDate: "2025",
    items: [
      {
        id: "ma-1",
        name: "Miles Apart Classic Tee",
        price: 1200,
        image: "/images/ma-tee-1.jpg",
        backImage: "/images/ma-tee-1-back.jpg",
        description: "Premium cotton t-shirt featuring Miles Apart artwork"
      },
      {
        id: "ma-2",
        name: "Miles Apart Graphic Tee",
        price: 1500,
        image: "/images/ma-tee-2.jpg",
        backImage: "/images/ma-tee-2-back.jpg",
        description: "Limited edition graphic t-shirt with exclusive design"
      },
      {
        id: "ma-3",
        name: "Miles Apart Deluxe Tee",
        price: 1000,
        image: "/images/ma-tee-3.jpg",
        backImage: "/images/ma-tee-3-back.jpg",
        description: "Premium deluxe edition with special packaging"
      },
      {
        id: "ma-art",
        name: "Miles Apart Framed Art",
        price: 1500,
        image: "/images/ma-art.jpg",
        backImage: "/images/ma-art-back.jpg",
        description: "High-quality framed album artwork"
      }
    ]
  },
  {
    id: 2,
    title: "I Wish I Knew",
    releaseType: "Single",
    releaseDate: "2025",
    items: [
      {
        id: "iwik-1",
        name: "I Wish I Knew Classic Tee",
        price: 1200,
        image: "/images/iwik-tee-1.jpg",
        backImage: "/images/iwik-tee-1-back.jpg",
        description: "Premium cotton t-shirt featuring I Wish I Knew artwork"
      },
      {
        id: "iwik-2",
        name: "I Wish I Knew Graphic Tee",
        price: 1500,
        image: "/images/iwik-tee-2.jpg",
        backImage: "/images/iwik-tee-2-back.jpg",
        description: "Limited edition graphic t-shirt with exclusive design"
      },
      {
        id: "iwik-3",
        name: "I Wish I Knew Deluxe Tee",
        price: 1000,
        image: "/images/iwik-tee-3.jpg",
        backImage: "/images/iwik-tee-3-back.jpg",
        description: "Premium deluxe edition with special packaging"
      },
      {
        id: "iwik-art",
        name: "I Wish I Knew Framed Art",
        price: 1500,
        image: "/images/iwik-art.jpg",
        backImage: "/images/iwik-art-back.jpg",
        description: "High-quality framed album artwork"
      }
    ]
  }
];

const MusicReleaseMerch: React.FC = () => {
  const [flippedStates, setFlippedStates] = useState<Record<string, boolean>>({});
  const addItem = useCartStore((state: CartStore) => state.addItem);

  const toggleFlip = (itemId: string, event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setFlippedStates(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const addToCart = (item: MerchItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  return (
    <section className="py-16 px-4 bg-black text-white" id="music-release-merch">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl mb-12 text-[#a0b921] uppercase tracking-wider font-['Impact']">
          Music Release Merchandise
        </h2>
        {musicReleases.map((release) => (
          <div key={release.id} className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl text-white mb-2">{release.title}</h3>
              <p className="text-[#a0b921] text-lg uppercase tracking-wider">
                {release.releaseType} • {release.releaseDate}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
              {release.items.map((item) => (
                <div 
                  key={item.id}
                  className={`product-card bg-[rgba(17,17,17,0.8)] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 border border-[rgba(160,185,33,0.1)] ${
                    flippedStates[item.id] ? 'flipped' : ''
                  }`}
                >
                  <div className="relative w-full perspective-1000">
                    <div 
                      className={`relative w-full h-[300px] transform-style-3d transition-transform duration-800 cursor-pointer bg-[rgba(17,17,17,0.8)] ${
                        flippedStates[item.id] ? 'rotate-y-180' : ''
                      }`}
                      onClick={(e) => toggleFlip(item.id, e)}
                      onTouchEnd={(e) => toggleFlip(item.id, e)}
                    >
                      <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-contain"
                          priority
                        />
                      </div>
                      <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-4">
                        <Image
                          src={item.backImage}
                          alt={`${item.name} back`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl mb-2 text-white">{item.name}</h4>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <p className="text-2xl font-bold text-[#a0b921] mb-4">
                      KES {item.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-3 bg-[#a0b921] text-black rounded-lg font-semibold transition-colors duration-300 hover:bg-[#8aa31d]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MusicReleaseMerch; 