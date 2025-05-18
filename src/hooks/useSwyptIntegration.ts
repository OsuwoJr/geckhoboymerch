import { useEffect, useRef } from 'react';

export function useSwyptIntegration() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || isInitialized.current) return;

    // Force Swypt to use our React instance
    const reactModule = require('react');
    
    // Store original React properties
    const originalReact = { ...reactModule };
    
    // Create a proxy to intercept React usage
    const reactProxy = new Proxy(reactModule, {
      get: (target, prop) => {
        if (prop === '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED') {
          return originalReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        }
        return target[prop];
      }
    });

    // Replace global React instance
    window.React = reactProxy;
    
    // Replace module.exports and exports
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = reactProxy;
    }
    if (typeof exports !== 'undefined') {
      exports.default = reactProxy;
    }

    isInitialized.current = true;
  }, []);
} 