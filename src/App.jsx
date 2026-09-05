import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AARLoader } from './components/AARLoader';
import { HomePage } from './components/home/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { WorkPage } from './pages/WorkPage';
import { JoinPage } from './pages/JoinPage';
import { ScrollToTop } from './components/common/ScrollToTop';

export function App() {
  const [loaderKey, setLoaderKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== '') {
      return true;
    }
    return false;
  });

  const handleLoaderComplete = useCallback(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const handleReplay = useCallback(() => {
    setIsLoaded(false);
    setLoaderKey(prev => prev + 1);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          background: !isLoaded ? '#070707' : 'var(--paper, #ede8e1)'
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              !isLoaded ? (
                <AARLoader
                  key={loaderKey}
                  fontFamily="Ahsing"
                  onComplete={handleLoaderComplete}
                />
              ) : (
                <HomePage onReplay={handleReplay} />
              )
            }
          />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<ProjectDetailPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="*" element={<HomePage onReplay={handleReplay} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
