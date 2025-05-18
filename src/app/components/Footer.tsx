'use client';

import React from 'react';
import Link from 'next/link';

const socialLinks = [
  { name: 'YouTube', icon: 'fab fa-youtube', href: 'https://youtube.com/@geckhoboy', color: '#FF0000' },
  { name: 'Spotify', icon: 'fab fa-spotify', href: 'https://open.spotify.com/artist/659wAEZkJXFdNQ1vHK9ZJa?si=kVwc73oXTfmTB-hz0UWgYA', color: '#1ED760' },
  { name: 'Apple Music', icon: 'fab fa-apple', href: 'https://music.apple.com/us/artist/geckhoboy/1810874244', color: '#FB2D3F' },
  { name: 'Boomplay', icon: 'fas fa-music', href: 'https://www.boomplay.com/search/default/geckhoboy', color: '#00A8E1' }
];

const followLinks = [
  { name: 'Instagram', icon: 'fab fa-instagram', href: 'https://instagram.com/geckhoboy', color: '#E1306C' },
  { name: 'TikTok', icon: 'fab fa-tiktok', href: 'https://tiktok.com/@geckhoboy', color: '#000000' }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>GECKHOBOY</h2>
            <p>Creating extraordinary experiences through music and art</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="#featured-products">Merch</Link></li>
              <li><Link href="/booking">Book Now</Link></li>
            </ul>
          </div>

          <div className="footer-social">
            <h3>Connect</h3>
            <div className="social-icons">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={link.name}
                  style={{ '--hover-color': link.color } as React.CSSProperties}
                >
                  <i className={`${link.icon} text-2xl`}></i>
                </a>
              ))}
            </div>

            <h3 className="follow-title">Follow Me</h3>
            <div className="social-icons">
              {followLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={link.name}
                  style={{ '--hover-color': link.color } as React.CSSProperties}
                >
                  <i className={`${link.icon} text-2xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} GECKHOBOY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 