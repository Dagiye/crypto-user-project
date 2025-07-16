import React, { useState } from 'react';
import { PieChart, TrendingUp, Wallet, DollarSign, Plus } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { useAuth } from '../context/AuthContext';

const Portfolio = () => {
  const { portfolio, stats, loading, addTransaction } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactionForm, setTransactionForm] = useState({
    type: 'buy',
    symbol: '',
    amount: '',
    price: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const result = await addTransaction(transactionForm);
    if (result.success) {
      setShowAddTransaction(false);
      setTransactionForm({
        type: 'buy',
        symbol: '',
        amount: '',
        price: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-slate-800" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Portfolio
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Please log in to view your portfolio
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-20 bg-slate-800" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Portfolio
            </h2>
            <p className="text-gray-300 text-lg">
              Loading your portfolio...
            </p>
          </div>
          <div className="animate-pulse space-y-6">
            <div className="bg-slate-700 h-32 rounded-xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-700 h-64 rounded-xl"></div>
              <div className="bg-slate-700 h-64 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-800" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Portfolio
          </h2>
          <p className="text-gray-300 text-lg">
            Sign in to access your personalized portfolio dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Summary */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Wallet className="h-8 w-8 text-blue-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Total Balance</h3>
                    <p className="text-gray-400">All your crypto assets</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {stats ? formatCurrency(stats.totalValue) : '$0.00'}
                  </div>
                  <div className={`flex items-center ${
                    stats?.totalChange >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stats ? `${formatCurrency(stats.totalChange)} (${stats.totalChangePercent.toFixed(2)}%)` : '+$0.00 (0.00%)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Holdings */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Your Holdings</h3>
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="flex items-center bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </button>
              </div>
              
              {portfolio && portfolio.holdings && portfolio.holdings.length > 0 ? (
                <div className="divide-y divide-slate-700">
                  {portfolio.holdings.map((holding) => (
                    <div key={holding.symbol} className="p-6 hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={holding.image} alt={holding.name} className="w-12 h-12 mr-4" />
                          <div>
                            <div className="text-white font-semibold">{holding.name}</div>
                            <div className="text-gray-400 text-sm">{holding.amount} {holding.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{formatCurrency(holding.value)}</div>
                          <div className={`text-sm ${holding.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {formatCurrency(holding.change)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-400 mb-4">No holdings yet</p>
                  <button
                    onClick={() => setShowAddTransaction(true)}
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all"
                  >
                    Add Your First Transaction
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Chart and Actions */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-6">
                <PieChart className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Allocation</h3>
              </div>
              
              {portfolio && portfolio.holdings && portfolio.holdings.length > 0 ? (
                <div className="space-y-4">
                  {portfolio.holdings.map((holding, index) => (
                    <div key={holding.symbol} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                        ></div>
                        <span className="text-gray-300">{holding.symbol.toUpperCase()}</span>
                      </div>
                      <span className="text-white font-semibold">{holding.percentage.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center">No data to display</p>
              )}
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center mb-6">
                <DollarSign className="h-6 w-6 text-emerald-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
                  Buy Crypto
                </button>
                <button className="w-full border border-slate-600 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all">
                  Sell Crypto
                </button>
                <button className="w-full border border-slate-600 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all">
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Transaction Modal */}
        {showAddTransaction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold text-white mb-4">Add Transaction</h3>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
                  <select
                    value={transactionForm.type}
                    onChange={(e) => setTransactionForm({...transactionForm, type: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Symbol</label>
                  <input
                    type="text"
                    value={transactionForm.symbol}
                    onChange={(e) => setTransactionForm({...transactionForm, symbol: e.target.value})}
                    placeholder="BTC, ETH, etc."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Amount</label>
                  <input
                    type="number"
                    step="any"
                    value={transactionForm.amount}
                    onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Price (USD)</label>
                  <input
                    type="number"
                    step="any"
                    value={transactionForm.price}
                    onChange={(e) => setTransactionForm({...transactionForm, price: e.target.value})}
                    placeholder="0.00"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={transactionForm.date}
                    onChange={(e) => setTransactionForm({...transactionForm, date: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddTransaction(false)}
                    className="flex-1 border border-slate-600 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all"
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;