'use client';

import React, { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  message: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xbloyloq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          date: '',
          message: ''
        });
      } else {
        setErrorMessage('There was an error submitting the form. Please try again.');
      }
    } catch {
      setErrorMessage('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-20">
        <section className="booking-section">
          <div className="artistic-bg"></div>
          <div className="container">
            <div className="header-content">
              <h1>Book GECKHOBOY</h1>
              <p className="subtitle">Let&apos;s create something extraordinary together</p>
            </div>

            {showSuccess ? (
              <div className="success-message">
                <h2>Thank You!</h2>
                <p>Your booking request has been submitted successfully. We&apos;ll get back to you shortly.</p>
                <button 
                  className="new-booking-btn" 
                  onClick={() => setShowSuccess(false)}
                >
                  Make Another Booking
                </button>
              </div>
            ) : (
              <div className="form-container">
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="eventType">Event Type</label>
                      <select 
                        id="eventType" 
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select event type</option>
                        <option value="concert">Concert</option>
                        <option value="festival">Festival</option>
                        <option value="private">Private Event</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="date">Preferred Date</label>
                      <input 
                        type="date" 
                        id="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required 
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="message">Additional Details</label>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4} 
                        placeholder="Tell us more about your event..."
                      ></textarea>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="error-message">
                      {errorMessage}
                    </div>
                  )}

                  <div className="submit-container">
                    <Button 
                      text="Submit Booking Request" 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      disabled={isSubmitting} 
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 