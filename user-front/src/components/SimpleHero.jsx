import React, { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Auth from './Auth';
import DemoModal from './DemoModal';

const SimpleHero = () => {
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Trading Waves Background */}
      <div className="absolute inset-0">
        {/* Wave 1 */}
        <svg className="absolute bottom-0 left-0 w-full h-64 text-blue-500/10" viewBox="0 0 1200 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0;50 0;0 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* Wave 2 */}
        <svg className="absolute bottom-0 left-0 w-full h-48 text-emerald-500/10" viewBox="0 0 1200 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0;-30 0;0 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* Floating Trading Elements */}
        <div className="absolute inset-0">
          {/* Candlestick patterns */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <div className="flex flex-col items-center animate-pulse">
                <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-400 to-red-400"></div>
                <div className={`w-3 h-6 ${i % 2 === 0 ? 'bg-emerald-400' : 'bg-red-400'} rounded-sm`}></div>
                <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-400 to-red-400"></div>
              </div>
            </div>
          ))}

          {/* Floating numbers */}
          {['+2.4%', '$43,250', '+5.7%', '$1.2T', '-1.3%', '+8.9%'].map((text, i) => (
            <div
              key={i}
              className={`absolute text-sm font-mono ${
                text.startsWith('+') ? 'text-emerald-400' : text.startsWith('-') ? 'text-red-400' : 'text-blue-400'
              } opacity-30 animate-bounce`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + Math.cos(i) * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '3s'
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {[...Array(96)].map((_, i) => (
              <div key={i} className="border border-blue-400"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Trade Crypto
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              Like a Pro
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience the future of cryptocurrency trading with advanced tools, 
            real-time data, and institutional-grade security.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button 
            onClick={() => isAuthenticated ? document.getElementById('trade')?.scrollIntoView({ behavior: 'smooth' }) : setShowAuth(true)}
            className="group bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-emerald-600 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center"
          >
            {isAuthenticated ? 'Start Trading' : 'Get Started'}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setShowDemo(true)}
            className="group border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center backdrop-blur-sm"
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-300">Execute trades in milliseconds with our advanced matching engine</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">Bank-Grade Security</h3>
            <p className="text-gray-300">Your funds are protected by military-grade encryption</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-300">Professional trading tools and real-time market insights</p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      
      {/* Demo Modal */}
      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
    </section>
  );
};

export default SimpleHero;