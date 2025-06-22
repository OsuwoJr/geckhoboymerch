'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '../store/cartStore';
import type { CartStore } from '../store/cartStore';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  backImage?: string;
  type: 'merch' | 'sticker';
  hasSize?: boolean;
  hasColor?: boolean;
}

const products: Product[] = [
  {
    id: 'classic-tee',
    name: 'GECKHOBOY Classic Tee',
    description: 'Premium quality cotton t-shirt with the iconic GECKHOBOY logo.',
    price: 1000,
    image: '/images/classic-tee-front.jpg',
    backImage: '/images/classic-tee-back.jpg',
    type: 'merch',
    hasSize: true,
    hasColor: true
  },
  {
    id: 'street-hoodie',
    name: 'Street Style Hoodie',
    description: 'Comfortable and stylish hoodie perfect for any occasion.',
    price: 3000,
    image: '/images/hoodie-front.jpg',
    backImage: '/images/hoodie-back.jpg',
    type: 'merch',
    hasSize: true,
    hasColor: true
  },
  {
    id: 'urban-cap',
    name: 'Urban Cap',
    description: 'Classic cap with embroidered GECKHOBOY branding.',
    price: 800,
    image: '/images/cap-front.jpg',
    backImage: '/images/cap-back.jpg',
    type: 'merch',
    hasSize: false,
    hasColor: true
  },
  
  {
    id: 'neon-signature',
    name: 'Neon Signature Sticker',
    description: 'Vibrant neon-style GECKHOBOY signature sticker.',
    price: 350,
    image: '/images/sticker-neon.jpg',
    type: 'sticker',
    hasSize: false,
    hasColor: false
  },
  {
    id: 'genesis-sticker',
    name: 'Genesis Sticker',
    description: 'The Origin ',
    price: 350,
    image: '/images/sticker-glow.jpg',
    type: 'sticker',
    hasSize: false,
    hasColor: false
  },
  {
    id: 'exodus-sticker',
    name: 'Exodus Sticker',
    description: 'The Journey ',
    price: 350,
    image: '/images/sticker-silhouette.jpg',
    type: 'sticker',
    hasSize: false,
    hasColor: false
  },
  {
    id: 'revelation-sticker',
    name: 'Revelation Sticker',
    description: 'The Future ',
    price: 350,
    image: '/images/sticker-holographic.jpg',
    type: 'sticker',
    hasSize: false,
    hasColor: false
  }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const basicColors = ['Black', 'White'];

const FeaturedMerch: React.FC = () => {
  const [flippedStates, setFlippedStates] = useState<Record<string, boolean>>(
    products.reduce((acc, product) => {
      acc[product.id] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [selectedOptions, setSelectedOptions] = useState<Record<string, { size?: string; color?: string; customColor?: string }>>(
    products.reduce((acc, product) => {
      acc[product.id] = {
        size: product.hasSize ? 'M' : undefined,
        color: product.hasColor ? 'Black' : undefined,
        customColor: ''
      };
      return acc;
    }, {} as Record<string, { size?: string; color?: string; customColor?: string }>)
  );

  const addItem = useCartStore((state: CartStore) => state.addItem);

  const toggleFlip = (productId: string, event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setFlippedStates(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const updateProductOption = (productId: string, option: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [option]: value
      }
    }));
  };

  const addToCart = (product: Product) => {
    const options = selectedOptions[product.id];
    const finalColor = options.color === 'Custom' && options.customColor 
      ? options.customColor 
      : options.color;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: options.size,
      color: finalColor
    });
  };

  const merchProducts = products.filter(product => product.type === 'merch');
  const stickerProducts = products.filter(product => product.type === 'sticker');

  return (
    <section className="py-16 px-4 bg-black text-white" id="featured-products">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl mb-12 text-[#a0b921] uppercase tracking-wider font-['Impact']">
          Featured Products
        </h2>
        
        {/* Merch Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {merchProducts.map((product) => (
            <div 
              key={product.id}
              className={`product-card bg-[rgba(17,17,17,0.8)] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 border border-[rgba(160,185,33,0.1)] ${
                flippedStates[product.id] ? 'flipped' : ''
              }`}
            >
              <div className="relative w-full perspective-1000">
                <div 
                  className={`relative w-full h-[300px] transform-style-3d transition-transform duration-800 cursor-pointer bg-[rgba(17,17,17,0.8)] ${
                    flippedStates[product.id] ? 'rotate-y-180' : ''
                  }`}
                  onClick={(e) => toggleFlip(product.id, e)}
                  onTouchEnd={(e) => toggleFlip(product.id, e)}
                >
                  <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-4">
                    {product.backImage && (
                      <Image
                        src={product.backImage}
                        alt={`${product.name} back`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        priority
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2 text-white">{product.name}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                {/* Size Selection */}
                {product.hasSize && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Size:</label>
                    <select
                      value={selectedOptions[product.id]?.size || ''}
                      onChange={(e) => updateProductOption(product.id, 'size', e.target.value)}
                      className="w-full p-2 bg-[rgba(17,17,17,0.9)] border border-[rgba(160,185,33,0.3)] rounded text-white focus:border-[#a0b921] focus:outline-none"
                    >
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Color Selection */}
                {product.hasColor && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Color:</label>
                    <select
                      value={selectedOptions[product.id]?.color || ''}
                      onChange={(e) => updateProductOption(product.id, 'color', e.target.value)}
                      className="w-full p-2 bg-[rgba(17,17,17,0.9)] border border-[rgba(160,185,33,0.3)] rounded text-white focus:border-[#a0b921] focus:outline-none mb-2"
                    >
                      {basicColors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                      <option value="Custom">Suggest Custom Color</option>
                    </select>
                    
                    {selectedOptions[product.id]?.color === 'Custom' && (
                      <input
                        type="text"
                        placeholder="Enter preferred color (subject to availability)"
                        value={selectedOptions[product.id]?.customColor || ''}
                        onChange={(e) => updateProductOption(product.id, 'customColor', e.target.value)}
                        className="w-full p-2 bg-[rgba(17,17,17,0.9)] border border-[rgba(160,185,33,0.3)] rounded text-white focus:border-[#a0b921] focus:outline-none text-sm"
                      />
                    )}
                  </div>
                )}

                <p className="text-2xl font-bold text-[#a0b921] mb-4">
                  KES {product.price.toLocaleString()}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 bg-[#a0b921] text-black rounded-lg font-semibold transition-colors duration-300 hover:bg-[#8aa31d]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stickers Section */}
        <div className="mt-16">
          <h3 className="text-center text-3xl mb-8 text-[#a0b921] uppercase tracking-wider font-['Impact']">
            Stickers Collection
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {stickerProducts.map((sticker) => (
              <div 
                key={sticker.id}
                className="bg-[rgba(17,17,17,0.8)] rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 border border-[rgba(160,185,33,0.1)]"
              >
                <div className="relative w-full h-[200px]">
                  <Image
                    src={sticker.image}
                    alt={sticker.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain p-4"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg mb-2 text-white">{sticker.name}</h3>
                  <p className="text-gray-400 mb-3 text-sm">
                    {sticker.description}
                  </p>
                  <p className="text-xl font-bold text-[#a0b921] mb-3">
                    KES {sticker.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => addToCart(sticker)}
                    className="w-full py-2 bg-[#a0b921] text-black rounded-lg font-semibold transition-colors duration-300 hover:bg-[#8aa31d]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMerch; 