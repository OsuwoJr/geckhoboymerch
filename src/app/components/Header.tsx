'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faSpotify, faApple } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Cart from './Cart';

const platforms = [
  { 
    name: 'YouTube',
    href: 'https://youtube.com/@geckhoboy',
    icon: faYoutube,
    color: '#FF0000',
    hoverColor: '#cc0000'
  },
  { 
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/659wAEZkJXFdNQ1vHK9ZJa?si=kVwc73oXTfmTB-hz0UWgYA',
    icon: faSpotify,
    color: '#1DB954',
    hoverColor: '#1ed760'
  },
  { 
    name: 'Apple Music',
    href: 'https://music.apple.com/us/artist/geckhoboy/1810874244',
    icon: faApple,
    color: '#FB2D3F',
    hoverColor: '#ff1a1a',
    className: 'whitespace-nowrap'
  },
  { 
    name: 'Boomplay',
    href: 'https://www.boomplay.com/search/default/geckhoboy',
    icon: faMusic,
    color: '#00C2FF',
    hoverColor: '#00a8e0'
  }
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-[1000] border-b border-[#333333]">
      <div className="max-w-[1200px] mx-auto px-4 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:px-8 md:py-4 md:gap-8">
        <Link 
          href="/" 
          className="text-2xl font-bold text-white z-[1001] p-2 hover:text-[#a0b921] transition-colors duration-200"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (isMenuOpen) {
              setIsMenuOpen(false);
            }
          }}
        >
          GECKHOBOY
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center justify-center">
          <Link 
            href="/nft" 
            className="text-white hover:text-[#a0b921] transition-colors duration-200"
          >
            NFTs
          </Link>
          <Link 
            href="/subscription" 
            className="text-white hover:text-[#a0b921] transition-colors duration-200"
          >
            Subscribe
          </Link>
          {platforms.map((platform) => (
            <a 
              key={platform.name}
              href={platform.href}
              className={`text-decoration-none text-[var(--platform-color)] p-2 transition-colors duration-200 flex items-center gap-2 hover:text-[var(--platform-hover-color)] ${platform.className || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                '--platform-color': platform.color,
                '--platform-hover-color': platform.hoverColor
              } as React.CSSProperties}
            >
              <FontAwesomeIcon icon={platform.icon} className="flex-shrink-0" />
              <span className="hidden md:inline">{platform.name}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6 justify-end z-[1001]">
          <Cart />
          <button 
            className="bg-transparent border-none text-2xl cursor-pointer p-2 text-white flex items-center justify-center w-10 h-10 rounded transition-colors duration-200 hover:bg-white/10 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black p-20 pt-20 flex flex-col gap-4 z-[1000] animate-slideIn">
          <Link 
            href="/nft" 
            className="text-white hover:text-[#a0b921] transition-colors duration-200 p-4 text-lg rounded-lg bg-white/5 hover:bg-white/10"
            onClick={toggleMenu}
          >
            NFTs
          </Link>
          <Link 
            href="/subscription" 
            className="text-white hover:text-[#a0b921] transition-colors duration-200 p-4 text-lg rounded-lg bg-white/5 hover:bg-white/10"
            onClick={toggleMenu}
          >
            Subscribe
          </Link>
          {platforms.map((platform) => (
            <a 
              key={platform.name}
              href={platform.href}
              className={`text-decoration-none text-[var(--platform-color)] p-4 transition-all duration-200 flex items-center gap-4 text-lg rounded-lg bg-white/5 hover:text-[var(--platform-hover-color)] hover:bg-white/10 ${platform.className || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              style={{
                '--platform-color': platform.color,
                '--platform-hover-color': platform.hoverColor
              } as React.CSSProperties}
            >
              <FontAwesomeIcon icon={platform.icon} className="text-2xl w-6 text-center flex-shrink-0" />
              <span>{platform.name}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header; 