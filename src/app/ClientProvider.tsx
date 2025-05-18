'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  const [CryptoProvider, setCryptoProvider] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('swypt-checkout').then((module) => {
        setCryptoProvider(() => module.CryptoProvider);
      });
    }
  }, []);

  if (!CryptoProvider) {
    return <>{children}</>;
  }

  return <CryptoProvider>{children}</CryptoProvider>;
} 