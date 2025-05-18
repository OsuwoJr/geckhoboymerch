'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {CheckoutForm} from './CheckoutForm';
import { useCartStore } from '../store/cartStore';
import '../styles/cart.css';

import type { FormData } from './CheckoutForm';

export default function Cart() {
  const cartRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    stage: '',
    notes: ''
  });

  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const total = getTotal();

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
    setIsCheckingOut(false);
    setShowSuccess(false);
    setErrorMessage('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCheckingOut(false);
        setShowSuccess(false);
        setErrorMessage('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <button className="cart-toggle" onClick={toggleCart}>
        <i className="fas fa-shopping-cart"></i>
        {items.length > 0 && <span className="cart-count">{items.length}</span>}
      </button>

      {isOpen && (
        <div className="cart-container">
          <div className="cart-header">
            <h3>Shopping Cart</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : showSuccess ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h4>Order Placed Successfully!</h4>
              <p>Thank you for your order. We&apos;ll contact you shortly with the next steps.</p>
              <button className="continue-shopping" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : isCheckingOut ? (
            <CheckoutForm
                  formData={formData}
                  setFormData={setFormData}
                  setShowSuccess={setShowSuccess}
                  setErrorMessage={setErrorMessage}
                  setIsCheckingOut={setIsCheckingOut}
                  errorMessage={errorMessage}
                  items={items}
                  total={total}
                  clearCart={clearCart} onPlaceOrderClick={function (): void {
                    throw new Error('Function not implemented.');
                  } }            />
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="cart-item-image"
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="price">KES {item.price.toLocaleString()}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>×</button>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="total">
                  <span>Total:</span>
                  <span className="total-amount">KES {total.toLocaleString()}</span>
                </div>
                <button
                  className="checkout-btn"
                  onClick={() => setIsCheckingOut(true)}
                >
                  Proceed to Checkout ({items.length} items)
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
