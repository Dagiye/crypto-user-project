import React, { useState } from 'react';
import { TrendingUp, Bell, User, Search, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketData } from '../hooks/useMarketData';
import Auth from './Auth';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { searchCrypto } = useMarketData();
  const [showAuth, setShowAuth] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await searchCrypto(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CryptoVault</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a href="#markets" className="text-gray-300 hover:text-white transition-colors">Markets</a>
            <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
            <a href="#trade" className="text-gray-300 hover:text-white transition-colors">Trade</a>
            {isAuthenticated && (
              <>
                <a href="#deposit" className="text-gray-300 hover:text-white transition-colors">Deposit</a>
                <a href="#withdraw" className="text-gray-300 hover:text-white transition-colors">Withdraw</a>
              </>
            )}
            <a href="#news" className="text-gray-300 hover:text-white transition-colors">News</a>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search crypto..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.length > 2 && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none w-64"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                  {searchResults.map((crypto) => (
                    <div
                      key={crypto.id}
                      className="flex items-center p-3 hover:bg-slate-700 cursor-pointer"
                      onClick={() => {
                        setSearchQuery(crypto.name);
                        setShowSearchResults(false);
                      }}
                    >
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-3" />
                      <div>
                        <div className="text-white font-medium">{crypto.name}</div>
                        <div className="text-gray-400 text-sm">{crypto.symbol.toUpperCase()}</div>
                      </div>
                      <div className="ml-auto text-white">${crypto.current_price}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button className="text-gray-300 hover:text-white transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="text-gray-300 text-sm">
                  Welcome, {user?.name || user?.email}
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuth(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
            
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 absolute top-full left-0 right-0 z-40">
            <div className="px-4 py-2 space-y-1">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setShowMobileMenu(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                Dashboard
              </a>
              <a 
                href="#markets" 
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                Markets
              </a>
              <a 
                href="#portfolio" 
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                Portfolio
              </a>
              <a 
                href="#trade" 
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                Trade
              </a>
              {isAuthenticated && (
                <>
                  <a 
                    href="#deposit" 
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                  >
                    Deposit
                  </a>
                  <a 
                    href="#withdraw" 
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                  >
                    Withdraw
                  </a>
                </>
              )}
              <a 
                href="#news" 
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                News
              </a>
              
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search crypto..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </header>
  );
};

export default Header;