import React, { useState } from 'react';
import { ArrowUpDown, Calculator, Clock } from 'lucide-react';
import { useTrading } from '../hooks/useTrading';
import { useAuth } from '../context/AuthContext';

const Trading = () => {
  const { createOrder, tradeHistory, loading } = useTrading();
  const { isAuthenticated } = useAuth();
  const [orderType, setOrderType] = useState('buy');
  const [orderForm, setOrderForm] = useState({
    symbol: 'BTC',
    amount: '',
    price: '',
    type: 'limit'
  });

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const result = await createOrder({
      ...orderForm,
      side: orderType
    });
    
    if (result.success) {
      setOrderForm({
        symbol: 'BTC',
        amount: '',
        price: '',
        type: 'limit'
      });
    }
  };

  const calculateTotal = () => {
    const amount = parseFloat(orderForm.amount) || 0;
    const price = parseFloat(orderForm.price) || 0;
    return amount * price;
  };

  const calculateFee = () => {
    return calculateTotal() * 0.001; // 0.1% fee
  };

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-slate-900" id="trade">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced Trading
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Please log in to access trading features
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
              Sign In to Trade
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900" id="trade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Advanced Trading
          </h2>
          <p className="text-gray-300 text-lg">
            Sign in to access professional trading tools and execute trades
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Panel */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-6">
                <ArrowUpDown className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Trade {orderForm.symbol}/USD</h3>
              </div>

              {/* Order Type Toggle */}
              <div className="flex bg-slate-800 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setOrderType('buy')}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                    orderType === 'buy' 
                      ? 'bg-emerald-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setOrderType('sell')}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                    orderType === 'sell' 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Order Form */}
              <form onSubmit={handleCreateOrder} className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Trading Pair
                  </label>
                  <select
                    value={orderForm.symbol}
                    onChange={(e) => setOrderForm({...orderForm, symbol: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="BTC">BTC/USD</option>
                    <option value="ETH">ETH/USD</option>
                    <option value="BNB">BNB/USD</option>
                    <option value="SOL">SOL/USD</option>
                    <option value="ADA">ADA/USD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Order Type
                  </label>
                  <select
                    value={orderForm.type}
                    onChange={(e) => setOrderForm({...orderForm, type: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="limit">Limit Order</option>
                    <option value="market">Market Order</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Amount ({orderForm.symbol})
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={orderForm.amount}
                    onChange={(e) => setOrderForm({...orderForm, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                {orderForm.type === 'limit' && (
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={orderForm.price}
                      onChange={(e) => setOrderForm({...orderForm, price: e.target.value})}
                      placeholder="Market Price"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                )}

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-semibold">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Fee (0.1%)</span>
                    <span className="text-white">
                      ${calculateFee().toFixed(2)}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    orderType === 'buy' 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white' 
                      : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : `Place ${orderType === 'buy' ? 'Buy' : 'Sell'} Order`}
                </button>
              </form>
            </div>
          </div>

          {/* Recent Trades and Stats */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Recent Trades</h3>
              </div>
              
              {tradeHistory && tradeHistory.length > 0 ? (
                <div className="space-y-4">
                  {tradeHistory.slice(0, 5).map((trade, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          trade.side === 'buy' ? 'bg-emerald-400' : 'bg-red-400'
                        }`}></div>
                        <div>
                          <div className="text-white text-sm font-medium">
                            {trade.amount} {trade.symbol}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {new Date(trade.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">${trade.price}</div>
                        <div className="text-gray-400 text-xs">
                          ${(trade.amount * trade.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center">No recent trades</p>
              )}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-6">
                <Calculator className="h-6 w-6 text-emerald-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Trading Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">24h Volume</span>
                  <span className="text-white font-semibold">$28.5B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">24h High</span>
                  <span className="text-white font-semibold">$43,850</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">24h Low</span>
                  <span className="text-white font-semibold">$42,100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span className="text-white font-semibold">$843.2B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trading;