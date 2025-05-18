"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the modal with no SSR and loading state
const SwyptModal = dynamic(() => import("./SwyptModal"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative z-[99999] bg-white p-4 rounded-lg">
        Loading payment modal...
      </div>
    </div>
  ),
});

interface DepositModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const MERCHANT_ADDRESS = "0xFaCf346acD5011ef0bA484B12D97C3a044cca2Ed";

export default function DepositModalWrapper({
  isOpen,
  onClose,
  amount
}: DepositModalWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure React internals are available
    if (typeof window !== 'undefined' && !(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };
    }
    
    setIsMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center isolation">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-[99999]">
        <SwyptModal
          isOpen={isOpen}
          onClose={onClose}
          headerBackgroundColor="linear-gradient(to right,rgb(14, 15, 11),rgb(136, 204, 46))"
          businessName="GECKHOBOY"
          merchantName="GECKHOBOYMERCH"
          merchantAddress={MERCHANT_ADDRESS}
          amount={amount}
        />
      </div>
    </div>
  );
} 