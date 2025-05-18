"use client";

import dynamic from "next/dynamic";
import React from 'react';
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

// Ensure we're using the project's React version
const DepositModal = dynamic(
  () => import("swypt-checkout").then((mod) => mod.DepositModal),
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

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <DepositModal {...props} />
    </React.Suspense>
  );
} 