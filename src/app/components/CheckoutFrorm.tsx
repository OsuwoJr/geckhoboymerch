import React from 'react';
import { useCartStore } from '../store/cartStore';
import {CartItem} from '../store/cartStore'

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  stage: string;
  notes: string;
  transactionId: string;
  
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
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  setFormData,
  setShowSuccess,
  setErrorMessage,
  setIsCheckingOut,
  errorMessage
}) => {
  const { items, clearCart, getTotal } = useCartStore();
  const total = getTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.transactionId) {
      setErrorMessage('Please enter a transaction ID.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xbloyloq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          orderItems: items.map(item => `${item.name} (${item.quantity}x) - KES ${item.price}`).join('\n'),
          orderTotal: `KES ${total.toLocaleString()}`
        })
      });

      if (!response.ok) throw new Error('Failed to send order');

      setShowSuccess(true);
      clearCart();
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to place the order. Please try again.');
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>Checkout</h3>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Street Address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="city"
        placeholder="City / Town"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="stage"
        placeholder="Stage / Landmark"
        value={formData.stage}
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Additional notes (optional)"
        value={formData.notes}
        onChange={handleChange}
      />

      <input
        type="text"
        name="transactionId"
        placeholder="M-Pesa Transaction ID"
        value={formData.transactionId}
        onChange={handleChange}
        required
      />

      <button className="checkout-btn" type="submit">Place Order</button>
      <button className="checkout-btn" type="button" onClick={() => setIsCheckingOut(false)}>
        Cancel
      </button>
    </form>
  );
};

export default CheckoutForm;

