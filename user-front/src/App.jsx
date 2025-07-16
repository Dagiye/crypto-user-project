import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarketData from './components/MarketData';
import Portfolio from './components/Portfolio';
import Trading from './components/Trading';
import News from './components/News';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import SimpleHero from './components/SimpleHero';
import { useState } from 'react';
import { ApiProvider } from './context/ApiContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }
  return (
    <AuthProvider>
      <ApiProvider>
        <div className="min-h-screen bg-slate-900">
          <Header />
          <SimpleHero />
          <MarketData />
          <Portfolio />
          <Trading />
          <Deposit />
          <Withdraw />
          <News />
          <Footer />
        </div>
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;