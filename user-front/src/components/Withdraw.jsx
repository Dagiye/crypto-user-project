import React, { useState } from 'react';
import { Wallet, CreditCard, DollarSign, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Withdraw = () => {
  const { isAuthenticated } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [withdrawalPin, setWithdrawalPin] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);
  const [errors, setErrors] = useState({});

  const withdrawMethods = [
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Wallet className="h-6 w-6" />,
      description: 'Withdraw crypto to external wallet',
      fees: 'Network fees apply'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Wire transfer to your bank account',
      fees: '$10 fee'
    }
  ];

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', minWithdraw: 0.001, fee: 0.0005, balance: 0.5432 },
    { symbol: 'ETH', name: 'Ethereum', minWithdraw: 0.01, fee: 0.005, balance: 2.1234 },
    { symbol: 'USDT', name: 'Tether', minWithdraw: 10, fee: 1, balance: 1500.50 },
    { symbol: 'BNB', name: 'BNB', minWithdraw: 0.1, fee: 0.01, balance: 5.67 }
  ];

  const validateWithdrawal = () => {
    const newErrors = {};
    const selectedCryptoData = cryptoOptions.find(c => c.symbol === selectedCrypto);

    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(amount) < selectedCryptoData.minWithdraw) {
      newErrors.amount = `Minimum withdrawal is ${selectedCryptoData.minWithdraw} ${selectedCrypto}`;
    } else if (parseFloat(amount) > selectedCryptoData.balance) {
      newErrors.amount = 'Insufficient balance';
    }

    if (selectedMethod === 'crypto' && !address) {
      newErrors.address = 'Withdrawal address is required';
    }

    if (!withdrawalPin) {
      newErrors.withdrawalPin = 'Withdrawal PIN is required';
    } else if (withdrawalPin.length !== 6) {
      newErrors.withdrawalPin = 'PIN must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (validateWithdrawal()) {
      // Process withdrawal
      alert('Withdrawal request submitted successfully!');
      setAmount('');
      setAddress('');
      setWithdrawalPin('');
      setShowPinInput(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-slate-900" id="withdraw">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Withdraw Funds
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Please sign in to access withdrawal features
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
    <section className="py-20 bg-slate-900" id="withdraw">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Withdraw Funds
          </h2>
          <p className="text-gray-300 text-lg">
            Securely withdraw your funds to external accounts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Withdrawal Methods */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-6">Choose Method</h3>
            <div className="space-y-4">
              {withdrawMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
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

            {/* Available Balances */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Available Balances</h3>
              <div className="space-y-3">
                {cryptoOptions.map((crypto) => (
                  <div key={crypto.symbol} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">{crypto.symbol}</div>
                        <div className="text-gray-400 text-sm">{crypto.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{crypto.balance}</div>
                        <div className="text-gray-400 text-sm">Available</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <form onSubmit={handleWithdraw}>
                {selectedMethod === 'crypto' && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Cryptocurrency Withdrawal</h3>
                    
                    {/* Crypto Selection */}
                    <div className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-3">
                        Select Cryptocurrency
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {cryptoOptions.map((crypto) => (
                          <button
                            type="button"
                            key={crypto.symbol}
                            onClick={() => setSelectedCrypto(crypto.symbol)}
                            className={`p-3 rounded-lg border transition-all ${
                              selectedCrypto === crypto.symbol
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-slate-700 bg-slate-700 hover:border-slate-600'
                            }`}
                          >
                            <div className="text-white font-semibold">{crypto.symbol}</div>
                            <div className="text-gray-400 text-sm">Balance: {crypto.balance}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Withdrawal Address */}
                    <div className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Withdrawal Address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter destination address"
                        className={`w-full bg-slate-700 border ${
                          errors.address ? 'border-red-500' : 'border-slate-600'
                        } rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none`}
                      />
                      {errors.address && (
                        <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Amount ({selectedCrypto})
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className={`w-full bg-slate-700 border ${
                            errors.amount ? 'border-red-500' : 'border-slate-600'
                          } rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const selectedCryptoData = cryptoOptions.find(c => c.symbol === selectedCrypto);
                            setAmount((selectedCryptoData.balance - selectedCryptoData.fee).toString());
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 text-sm font-semibold"
                        >
                          Max
                        </button>
                      </div>
                      {errors.amount && (
                        <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
                      )}
                      <div className="text-gray-400 text-sm mt-1">
                        Min: {cryptoOptions.find(c => c.symbol === selectedCrypto)?.minWithdraw} {selectedCrypto}
                      </div>
                    </div>

                    {/* Fee Summary */}
                    {amount && (
                      <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                        <h4 className="text-white font-semibold mb-3">Transaction Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Amount:</span>
                            <span className="text-white">{amount} {selectedCrypto}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Network Fee:</span>
                            <span className="text-white">
                              {cryptoOptions.find(c => c.symbol === selectedCrypto)?.fee} {selectedCrypto}
                            </span>
                          </div>
                          <div className="border-t border-slate-600 pt-2 flex justify-between font-semibold">
                            <span className="text-white">You'll Receive:</span>
                            <span className="text-white">
                              {(parseFloat(amount) - cryptoOptions.find(c => c.symbol === selectedCrypto)?.fee).toFixed(8)} {selectedCrypto}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedMethod === 'bank' && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Bank Withdrawal</h3>
                    
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
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-3">Bank Account</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Account:</span>
                            <span className="text-white">****1234</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Bank:</span>
                            <span className="text-white">Chase Bank</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Warning */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-semibold mb-2">Security Notice:</h4>
                      <ul className="text-red-200 text-sm space-y-1">
                        <li>• Double-check the withdrawal address</li>
                        <li>• Withdrawals are irreversible</li>
                        <li>• Processing time: 10-30 minutes</li>
                        <li>• Your withdrawal PIN is required</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Withdrawal PIN */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <Shield className="inline h-4 w-4 mr-2" />
                    Withdrawal PIN
                  </label>
                  <input
                    type="password"
                    value={withdrawalPin}
                    onChange={(e) => setWithdrawalPin(e.target.value)}
                    placeholder="Enter your 6-digit PIN"
                    maxLength="6"
                    className={`w-full bg-slate-700 border ${
                      errors.withdrawalPin ? 'border-red-500' : 'border-slate-600'
                    } rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none`}
                  />
                  {errors.withdrawalPin && (
                    <p className="text-red-400 text-sm mt-1">{errors.withdrawalPin}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Confirm Withdrawal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Withdraw;