"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from 'react';
import { useSwyptIntegration } from '../hooks/useSwyptIntegration';

// Ensure React is available globally
if (typeof window !== 'undefined') {
  window.React = React;
}

// Create a wrapper component to ensure proper React context
const SwyptWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
};

// Configure API endpoint based on environment
const API_ENDPOINT = process.env.NODE_ENV === 'production' 
  ? '/api/swypt-proxy'  // Use our proxy in production
  : 'https://pool.swypt.io/api/merchant-onramp'; // Direct API call in development

console.log('Using API endpoint:', API_ENDPOINT);

// Ensure we're using the project's React version
const DepositModal = dynamic(
  () => import("swypt-checkout").then((mod) => {
    console.log('Swypt checkout module loaded:', mod);
    return mod.DepositModal;
  }).catch(error => {
    console.error('Error loading swypt-checkout:', error);
    throw error;
  }),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);

interface SwyptModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerBackgroundColor: string;
  businessName: string;
  merchantName: string;
  merchantAddress: string;
  amount: number;
}

export default function SwyptModal(props: SwyptModalProps) {
  useSwyptIntegration();

  useEffect(() => {
    // Log props when they change
    console.log('SwyptModal props:', props);
    
    // Add global error handler for payment-related errors
    const handlePaymentError = (event: ErrorEvent) => {
      console.error('Payment error:', event.error);
    };
    
    // Add XHR error monitoring with proper TypeScript types
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(
      method: string,
      url: string | URL,
      async: boolean = true,
      username?: string | null,
      password?: string | null
    ) {
      this.addEventListener('error', (event) => {
        console.error('XHR Error:', {
          method,
          url,
          event
        });
      });
      return originalXHROpen.call(this, method, url, async, username || null, password || null);
    };
    
    window.addEventListener('error', handlePaymentError);
    return () => {
      window.removeEventListener('error', handlePaymentError);
      XMLHttpRequest.prototype.open = originalXHROpen;
    };
  }, [props]);

  return (
    <SwyptWrapper>
      <React.Suspense fallback={<div>Loading...</div>}>
        <DepositModal {...props} />
      </React.Suspense>
    </SwyptWrapper>
  );
} 