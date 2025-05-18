'use client';

import dynamic from 'next/dynamic';

const CheckoutClient = dynamic(() => import('./checkoutClient'), {
  ssr: false, // Ensure it's client-only
  loading: () => <p>Loading checkout...</p>,
});

export default function CheckoutWrapper() {
  return <CheckoutClient />;
}
