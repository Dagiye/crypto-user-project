import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';

const MarketData = () => {
  const { cryptocurrencies, loading } = useMarketData();
  const [favorites, setFavorites] = useState(new Set());
  const [activeTab, setActiveTab] = useState('all');

  const toggleFavorite = (cryptoId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(cryptoId)) {
      newFavorites.delete(cryptoId);
    } else {
      newFavorites.add(cryptoId);
    }
    setFavorites(newFavorites);
    
    // Save to localStorage
    localStorage.setItem('crypto_favorites', JSON.stringify([...newFavorites]));
  };

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('crypto_favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(1)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(1)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(1)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  const getGainers = () => {
    return [...cryptocurrencies]
      .filter(crypto => crypto.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 10);
  };

  const getLosers = () => {
    return [...cryptocurrencies]
      .filter(crypto => crypto.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 10);
  };

  const getDisplayData = () => {
    switch (activeTab) {
      case 'gainers':
        return getGainers();
      case 'losers':
        return getLosers();
      default:
        return cryptocurrencies;
    }
  };
  const formatVolume = (volume) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(1)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(1)}M`;
    }
    return `$${volume.toLocaleString()}`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-900" id="markets">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Live Market Data
            </h2>
            <p className="text-gray-300 text-lg">
              Real-time cryptocurrency prices and market statistics
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/6"></div>
                  </div>
                  <div className="w-20 h-4 bg-slate-700 rounded"></div>
                  <div className="w-16 h-4 bg-slate-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900" id="markets">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Live Market Data
          </h2>
          <p className="text-gray-300 text-lg">
            Real-time cryptocurrency prices and market statistics
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mt-8">
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${
                  activeTab === 'all' 
                    ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All Coins
              </button>
              <button
                onClick={() => setActiveTab('gainers')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${
                  activeTab === 'gainers' 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Top Gainers
              </button>
              <button
                onClick={() => setActiveTab('losers')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${
                  activeTab === 'losers' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Top Losers
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/70">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Rank</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Name</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Price</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">24h Change</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Volume</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Market Cap</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {getDisplayData().map((crypto) => (
                  <tr key={crypto.id} className="border-t border-slate-700 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleFavorite(crypto.id)}
                          className={`mr-2 transition-colors ${
                            favorites.has(crypto.id) ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                          }`}
                        >
                          <Star className="h-4 w-4" fill={favorites.has(crypto.id) ? 'currentColor' : 'none'} />
                        </button>
                        <span className="text-gray-300">{crypto.market_cap_rank}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <img src={crypto.image} alt={crypto.name} className="w-8 h-8 mr-3" />
                        <div>
                          <div className="text-white font-semibold">{crypto.name}</div>
                          <div className="text-gray-400 text-sm">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white font-semibold">
                      {formatPrice(crypto.current_price)}
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center ${
                        crypto.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {crypto.price_change_percentage_24h > 0 ? 
                          <TrendingUp className="h-4 w-4 mr-1" /> : 
                          <TrendingDown className="h-4 w-4 mr-1" />
                        }
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {formatVolume(crypto.total_volume)}
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      {formatMarketCap(crypto.market_cap)}
                    </td>
                    <td className="py-4 px-6">
                      <button className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketData;