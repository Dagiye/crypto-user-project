import { useState, useEffect } from 'react';
import { tradingAPI } from '../services/api';
import { useApi } from '../context/ApiContext';
import { useAuth } from '../context/AuthContext';

export const useTrading = () => {
  const [orders, setOrders] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [orderBook, setOrderBook] = useState(null);
  const [tradingPairs, setTradingPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleApiCall } = useApi();
  const { isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await handleApiCall(tradingAPI.getOrders);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const fetchTradeHistory = async (params = {}) => {
    if (!isAuthenticated) return;
    
    try {
      const response = await handleApiCall(tradingAPI.getTradeHistory, params);
      setTradeHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch trade history:', error);
    }
  };

  const fetchOrderBook = async (symbol) => {
    try {
      const response = await handleApiCall(tradingAPI.getOrderBook, symbol);
      setOrderBook(response.data);
    } catch (error) {
      console.error('Failed to fetch order book:', error);
    }
  };

  const fetchTradingPairs = async () => {
    try {
      const response = await handleApiCall(tradingAPI.getTradingPairs);
      setTradingPairs(response.data);
    } catch (error) {
      console.error('Failed to fetch trading pairs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await handleApiCall(tradingAPI.createOrder, orderData);
      await fetchOrders(); // Refresh orders
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await handleApiCall(tradingAPI.cancelOrder, orderId);
      await fetchOrders(); // Refresh orders
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchTradingPairs();
    if (isAuthenticated) {
      fetchOrders();
      fetchTradeHistory();
    }
  }, [isAuthenticated]);

  return {
    orders,
    tradeHistory,
    orderBook,
    tradingPairs,
    loading,
    createOrder,
    cancelOrder,
    fetchOrderBook,
    fetchTradeHistory,
    refetch: fetchOrders
  };
};