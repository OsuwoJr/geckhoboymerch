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

interface FieldErrors {
  [key: string]: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  setFormData,
  setIsCheckingOut,
  setShowSuccess,
  errorMessage,
  setErrorMessage,
  onPlaceOrderClick,
  items,
  total,
  clearCart
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^(\+254|254|0)?[17]\d{8}$/;
        const cleanPhone = value.replace(/[\s-]/g, '');
        if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid Kenyan phone number';
        return '';
      
      case 'address':
        if (!value.trim()) return 'Street address is required';
        if (value.trim().length < 5) return 'Please provide a complete address';
        return '';
      
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'City name must be at least 2 characters';
        return '';
      
      case 'stage':
        if (!value.trim()) return 'Stage/Landmark is required';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'stage'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) errors[field] = error;
    });
    
    setFieldErrors(errors);
    setTouched(requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Format items with size and color information
      const itemsList = items.map(item => {
        let itemDetails = item.name;
        
        // Add size and color information if available
        if (item.size) {
          itemDetails += ` - Size: ${item.size}`;
        }
        if (item.color) {
          itemDetails += ` - Color: ${item.color}`;
        }
        
        return `${itemDetails} x${item.quantity} @ KES ${item.price} = KES ${item.price * item.quantity}`;
      }).join('\n');

      // Create submission data
      const submissionData = {
        // Customer details
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        stage: formData.stage,
        notes: formData.notes || 'No additional notes',
        
        // Order details
        orderItems: itemsList,
        totalAmount: `KES ${total.toLocaleString()}`,
        orderDate: new Date().toLocaleString(),
        paymentStatus: 'Payment Pending',
        
        // Form type identifier
        formType: 'ORDER_CHECKOUT'
      };

      const response = await fetch('https://formspree.io/f/xbloyloq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setShowSuccess(true);
        clearCart();
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          stage: '',
          notes: ''
        });
      } else {
        setErrorMessage('There was an error submitting your order. Please try again.');
      }
    } catch (error) {
      setErrorMessage('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePlaceOrder();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="header-content text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-300">Complete your order details</p>
          </div>

          <div className="form-container bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="space-y-6 mb-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400 border-b border-gray-700 pb-2">Personal Information</h3>
                  
                  {/* Name Field */}
                  <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        touched.name && fieldErrors.name ? 'border-red-500' : 'border-gray-700'
                      }`}
                      required
                    />
                    {touched.name && fieldErrors.name && (
                      <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        touched.email && fieldErrors.email ? 'border-red-500' : 'border-gray-700'
                      }`}
                      required
                    />
                    {touched.email && fieldErrors.email && (
                      <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="form-group">
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="0712345678 or +254712345678"
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        touched.phone && fieldErrors.phone ? 'border-red-500' : 'border-gray-700'
                      }`}
                      required
                    />
                    {touched.phone && fieldErrors.phone && (
                      <p className="mt-1 text-sm text-red-400">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Delivery Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-400 border-b border-gray-700 pb-2">Delivery Information</h3>
                  
                  {/* Address Field */}
                  <div className="form-group">
                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your complete street address"
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        touched.address && fieldErrors.address ? 'border-red-500' : 'border-gray-700'
                      }`}
                      required
                    />
                    {touched.address && fieldErrors.address && (
                      <p className="mt-1 text-sm text-red-400">{fieldErrors.address}</p>
                    )}
                  </div>

                  {/* City Field */}
                  <div className="form-group">
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g., Nairobi, Mombasa, Kisumu"
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        touched.city && fieldErrors.city ? 'border-red-500' : 'border-gray-700'
                      }`}
                      required
                    />
                    {touched.city && fieldErrors.city && (
                      <p className="mt-1 text-sm text-red-400">{fieldErrors.city}</p>
                    )}
                  </div>

                  {/* Stage Field */}
                  <div className="form-group">
                    <label htmlFor="stage" className="block text-sm font-medium mb-2">
                      Stage / Landmark *
                    </label>
                    <input
                      type="text"
                      id="stage"
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Nearest stage or landmark"
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        touched.stage && fieldErrors.stage ? 'border-red-500' : 'border-gray-700'
                      }`}
                      required
                    />
                    {touched.stage && fieldErrors.stage && (
                      <p className="mt-1 text-sm text-red-400">{fieldErrors.stage}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes Field */}
              <div className="form-group mb-6">
                <label htmlFor="notes" className="block text-sm font-medium mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special delivery instructions... (optional)"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 mb-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-green-400">KES {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="error-message bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                  {errorMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="submit-container space-y-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-rose-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-500/50 transition-all flex items-center justify-center"
                >
                  <span className="mr-2">🔐</span>
                  Pay with swypt (KES {total.toLocaleString()})
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 transition-all disabled:bg-blue-500 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Order...
                    </>
                  ) : (
                    `Place Order (KES ${total.toLocaleString()})`
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-full bg-gray-700 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-500/50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DepositModalWrapper
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={total}
      />
    </div>
  );
};