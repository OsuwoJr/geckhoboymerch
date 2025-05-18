import React, { useState } from 'react';
import type { CartItem } from '../store/cartStore';
import DepositModalWrapper from "@/components/DepositModalWrapper";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  stage: string;
  notes: string;
}

export interface CheckoutFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setShowSuccess: (show: boolean) => void;
  setErrorMessage: (msg: string) => void;
  setIsCheckingOut: (checkingOut: boolean) => void;
  errorMessage: string;
  items: CartItem[];
  total: number;
  clearCart: () => void;
  onPlaceOrderClick: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  setFormData,
  setIsCheckingOut,
  errorMessage,
  onPlaceOrderClick,
  total
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Street Address"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City / Town"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          placeholder="Stage / Landmark"
          required
        />
      </div>

      <div className="form-group">
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes (optional)"
        />
      </div>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      <button
        className="checkout-btn"
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Pay with Crypto (KES{total})
      </button>
      <button
        className="checkout-btn"
        type="button"
        onClick={() => setIsCheckingOut(false)}
      >
        Cancel
      </button>

      <DepositModalWrapper
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={total}
      />
    </form>
  );
};
