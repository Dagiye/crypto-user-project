import { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';
import { useApi } from '../context/ApiContext';
import { useAuth } from '../context/AuthContext';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleApiCall } = useApi();
  const { isAuthenticated } = useAuth();

  const fetchPortfolio = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      const [portfolioResponse, statsResponse] = await Promise.all([
        handleApiCall(portfolioAPI.getPortfolio),
        handleApiCall(portfolioAPI.getPortfolioStats)
      ]);
      
      setPortfolio(portfolioResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (params = {}) => {
    try {
      const response = await handleApiCall(portfolioAPI.getTransactions, params);
      setTransactions(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await handleApiCall(portfolioAPI.addTransaction, transactionData);
      await fetchPortfolio(); // Refresh portfolio after adding transaction
      await fetchTransactions(); // Refresh transactions
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await handleApiCall(portfolioAPI.deleteTransaction, transactionId);
      await fetchPortfolio();
      await fetchTransactions();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPortfolio();
      fetchTransactions();
    }
  }, [isAuthenticated]);

  return {
    portfolio,
    transactions,
    stats,
    loading,
    addTransaction,
    deleteTransaction,
    fetchTransactions,
    refetch: fetchPortfolio
  };
};