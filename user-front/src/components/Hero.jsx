import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';
import { useAuth } from '../context/AuthContext';
import Auth from './Auth';

const Hero = () => {
  const { marketStats, loading } = useMarketData();
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [stats, setStats] = useState([
    { label: 'Total Market Cap', value: '$2.1T', change: '+2.4%', isPositive: true },
    { label: '24h Volume', value: '$89.2B', change: '-1.2%', isPositive: false },
    { label: 'BTC Dominance', value: '42.3%', change: '+0.8%', isPositive: true },
    { label: 'Active Coins', value: '23,547', change: '+156', isPositive: true },
  ]);

  useEffect(() => {
    if (marketStats) {
      setStats([
        { 
          label: 'Total Market Cap', 
          value: `$${(marketStats.total_market_cap / 1e12).toFixed(1)}T`, 
          change: `${marketStats.market_cap_change_24h > 0 ? '+' : ''}${marketStats.market_cap_change_24h.toFixed(1)}%`, 
          isPositive: marketStats.market_cap_change_24h > 0 
        },
        { 
          label: '24h Volume', 
          value: `$${(marketStats.total_volume / 1e9).toFixed(1)}B`, 
          change: `${marketStats.volume_change_24h > 0 ? '+' : ''}${marketStats.volume_change_24h.toFixed(1)}%`, 
          isPositive: marketStats.volume_change_24h > 0 
        },
        { 
          label: 'BTC Dominance', 
          value: `${marketStats.btc_dominance.toFixed(1)}%`, 
          change: `${marketStats.btc_dominance_change > 0 ? '+' : ''}${marketStats.btc_dominance_change.toFixed(1)}%`, 
          isPositive: marketStats.btc_dominance_change > 0 
        },
        { 
          label: 'Active Coins', 
          value: marketStats.active_cryptocurrencies.toLocaleString(), 
          change: `+${marketStats.new_coins_24h}`, 
          isPositive: true 
        },
      ]);
    }
  }, [marketStats]);

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Trade Crypto with
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"> Confidence</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Access real-time market data, advanced trading tools, and secure portfolio management all in one platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => isAuthenticated ? document.getElementById('trade').scrollIntoView({ behavior: 'smooth' }) : setShowAuth(true)}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all transform hover:scale-105"
            >
              {isAuthenticated ? 'Go to Trading' : 'Start Trading'}
            </button>
            <button className="border border-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <div className={`flex items-center text-sm ${stat.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span className="ml-1">{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {loading ? (
                  <div className="animate-pulse bg-slate-700 h-8 w-20 rounded"></div>
                ) : (
                  stat.value
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Auth Modal */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </section>
  );
};

export default Hero;