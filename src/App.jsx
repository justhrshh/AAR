import React, { useState, useCallback } from 'react';
import { AARLoader } from './components/AARLoader';
import { HomePage } from './components/home/HomePage';

export function App() {
  const [loaderKey, setLoaderKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const handleReplay = useCallback(() => {
    setIsLoaded(false);
    setLoaderKey(prev => prev + 1);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: !isLoaded ? '#070707' : 'var(--paper, #ede8e1)'
      }}
    >
      {!isLoaded ? (
        <AARLoader
          key={loaderKey}
          fontFamily="Ahsing"
          onComplete={handleLoaderComplete}
        />
      ) : (
        <HomePage onReplay={handleReplay} />
      )}
    </div>
  );
}

export default App;
