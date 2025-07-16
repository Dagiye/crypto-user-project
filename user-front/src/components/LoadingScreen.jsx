import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    'Initializing CryptoVault...',
    'Loading market data...',
    'Connecting to exchanges...',
    'Securing your connection...',
    'Ready to trade!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo with pulse animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-500 to-emerald-500 p-6 rounded-full">
            <TrendingUp className="h-16 w-16 text-white animate-bounce" />
          </div>
        </div>

        {/* Brand name with typing effect */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            CryptoVault
          </span>
        </h1>

        {/* Loading progress */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-blue-300 text-sm mt-2">{progress}%</div>
        </div>

        {/* Loading steps */}
        <div className="text-gray-300 text-lg min-h-[28px]">
          {loadingSteps[currentStep]}
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;