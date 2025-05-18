import React, { useState } from 'react';
import { CheckoutForm, FormData } from './CheckoutForm';
import { DepositModal } from 'swypt-checkout';
import { useCartStore } from '../store/cartStore';

const CheckoutClient = () => {
  const { items, clearCart, getTotal } = useCartStore();
  const total = getTotal();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    stage: '',
    notes: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(true);
  const [isSwyptOpen, setIsSwyptOpen] = useState(false);

  const handlePlaceOrderClick = () => {
    setIsSwyptOpen(true);
  };

  const handleModalClose = async () => {
    setIsSwyptOpen(false);
    try {
      const response = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          items,
          total,
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');

      clearCart();
      setErrorMessage('');
      setIsCheckingOut(false);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to place the order. Please try again.');
    }
  };

  return (
    <>
      {isCheckingOut && (
        <CheckoutForm
          formData={formData}
          setFormData={setFormData}
          setShowSuccess={() => {}}
          setErrorMessage={setErrorMessage}
          setIsCheckingOut={setIsCheckingOut}
          errorMessage={errorMessage}
          items={items}
          total={total}
          clearCart={clearCart}
          onPlaceOrderClick={handlePlaceOrderClick}
        />
      )}

      <DepositModal
        isOpen={isSwyptOpen}
        onClose={handleModalClose}
        headerBackgroundColor="linear-gradient(to right, #DD268A, #FF4040)"
        businessName="Your Business"
        merchantName="Your Merchant"
        merchantAddress="0x6d19a24D93379D1bA58d28884fFBBEf1bc145387"
        amount={total}
      />
    </>
  );
};

export default CheckoutClient;
