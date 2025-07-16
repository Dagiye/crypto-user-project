import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const DemoModal = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Welcome to CryptoVault",
      description: "Your all-in-one cryptocurrency trading platform",
      image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Real-Time Market Data",
      description: "Track live prices, market caps, and trading volumes for thousands of cryptocurrencies",
      image: "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Advanced Trading Tools",
      description: "Execute trades with professional-grade tools including limit orders, market orders, and advanced charting",
      image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Portfolio Management",
      description: "Track your investments, view performance metrics, and manage your crypto portfolio",
      image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Secure Deposits & Withdrawals",
      description: "Multiple deposit methods with bank-grade security and instant withdrawals",
      image: "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0); // Loop back to start
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(demoSteps.length - 1); // Loop to end
    }
  };

  // Auto-advance slides when playing
  React.useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        nextStep();
      }, 4000); // Change slide every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Platform Demo</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Demo Content */}
        <div className="relative">
          {/* Main Demo Area */}
          <div className="aspect-video bg-slate-800 relative overflow-hidden">
            <img 
              src={demoSteps[currentStep].image} 
              alt={demoSteps[currentStep].title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{demoSteps[currentStep].title}</h3>
                <p className="text-gray-200">{demoSteps[currentStep].description}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevStep}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextStep}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Controls */}
          <div className="bg-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="flex space-x-2">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">
                {currentStep + 1} / {demoSteps.length}
              </span>
              <button className="text-gray-400 hover:text-white transition-colors p-2">
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-800 p-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Experience the power of professional crypto trading
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all"
            >
              Start Trading Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;