import React, { useState } from 'react';
import { CreditCard, Wallet, DollarSign, Copy, CheckCircle, AlertCircle, ArrowDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Deposit = () => {
  const { isAuthenticated } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const depositMethods = [
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Wallet className="h-6 w-6" />,
      description: 'Deposit crypto directly to your wallet',
      fees: 'Network fees apply'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Wire transfer from your bank account',
      fees: '$5 fee'
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Instant deposit with your card',
      fees: '3.5% fee'
    }
  ];

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', network: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum', address: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e3e3', network: 'Ethereum' },
    { symbol: 'USDT', name: 'Tether', address: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e3e3', network: 'Ethereum (ERC-20)' },
    { symbol: 'BNB', name: 'BNB', address: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2', network: 'BSC' }
  ];

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-slate-800" id="deposit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Deposit Funds
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Please sign in to access deposit features
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-800" id="deposit">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Deposit Funds
          </h2>
          <p className="text-gray-300 text-lg">
            Add funds to your account to start trading
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deposit Methods */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-6">Choose Method</h3>
            <div className="space-y-4">
              {depositMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg mr-3 ${
                      selectedMethod === method.id ? 'bg-blue-500' : 'bg-slate-700'
                    }`}>
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{method.name}</div>
                      <div className="text-gray-400 text-sm">{method.fees}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{method.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Deposit Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              {selectedMethod === 'crypto' && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Cryptocurrency Deposit</h3>
                  
                  {/* Crypto Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-3">
                      Select Cryptocurrency
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {cryptoOptions.map((crypto) => (
                        <button
                          key={crypto.symbol}
                          onClick={() => setSelectedCrypto(crypto.symbol)}
                          className={`p-3 rounded-lg border transition-all ${
                            selectedCrypto === crypto.symbol
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="text-white font-semibold">{crypto.symbol}</div>
                          <div className="text-gray-400 text-sm">{crypto.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deposit Address */}
                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-3">
                      Deposit Address ({cryptoOptions.find(c => c.symbol === selectedCrypto)?.network})
                    </label>
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center justify-between">
                        <code className="text-white text-sm break-all mr-4">
                          {cryptoOptions.find(c => c.symbol === selectedCrypto)?.address}
                        </code>
                        <button
                          onClick={() => handleCopyAddress(cryptoOptions.find(c => c.symbol === selectedCrypto)?.address)}
                          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                          {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                      <div>
                        <h4 className="text-yellow-400 font-semibold mb-2">Important Notes:</h4>
                        <ul className="text-yellow-200 text-sm space-y-1">
                          <li>• Only send {selectedCrypto} to this address</li>
                          <li>• Minimum deposit: 0.001 {selectedCrypto}</li>
                          <li>• Deposits require 3 network confirmations</li>
                          <li>• Do not send from smart contracts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'bank' && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Bank Transfer</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Amount (USD)
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <h4 className="text-white font-semibold mb-3">Bank Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bank Name:</span>
                          <span className="text-white">CryptoVault Bank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account Number:</span>
                          <span className="text-white">1234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Routing Number:</span>
                          <span className="text-white">021000021</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Reference:</span>
                          <span className="text-white">Your User ID</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
                      Initiate Bank Transfer
                    </button>
                  </div>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Card Deposit</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Amount (USD)
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Amount:</span>
                        <span className="text-white">${amount || '0.00'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Fee (3.5%):</span>
                        <span className="text-white">${((parseFloat(amount) || 0) * 0.035).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-blue-500/20 mt-2 pt-2 flex items-center justify-between font-semibold">
                        <span className="text-white">Total:</span>
                        <span className="text-white">${((parseFloat(amount) || 0) * 1.035).toFixed(2)}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
                      Process Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deposit;