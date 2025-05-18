import React, { useState } from 'react';
import DepositModalWrapper from './DepositModalWrapper';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAmount?: number;
}

export default function DonateModal({ isOpen, onClose, defaultAmount = 100 }: DonateModalProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    }
  };

  const handleDonate = () => {
    setShowDepositModal(true);
  };

  const handleDepositClose = () => {
    setShowDepositModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[99998] flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative z-[99998] bg-gray-900 p-6 rounded-xl max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-white mb-4">Support GECKHOBOY</h2>
          <p className="text-gray-400 mb-6">
            Your support helps us continue creating amazing music and content. Choose your donation amount below.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                Donation Amount (KES)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#a0b921] focus:border-transparent"
                min="1"
                placeholder="Enter amount"
              />
            </div>
            
            <button
              onClick={handleDonate}
              className="w-full py-3 px-6 rounded-lg bg-[#a0b921] text-white font-medium transition-all duration-200 hover:bg-[#8ca01b] hover:shadow-lg hover:shadow-[#a0b921]/20 hover:-translate-y-0.5"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

      <DepositModalWrapper
        isOpen={showDepositModal}
        onClose={handleDepositClose}
        amount={amount}
      />
    </>
  );
} 