import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  validateToken: (token) => api.get('/auth/validate', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  logout: () => api.post('/auth/logout'),
};

// Market Data API
export const marketAPI = {
  getCryptocurrencies: (params = {}) => {
    const { limit = 50, ...otherParams } = params;
    return axios.get(`${API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: false,
        ...otherParams
      }
    });
  },
  getCryptocurrency: (id) => axios.get(`${API_BASE_URL}/coins/${id}`),
  getMarketStats: () => axios.get(`${API_BASE_URL}/global`),
  getPriceHistory: (symbol, timeframe) => axios.get(`${API_BASE_URL}/coins/${symbol}/market_chart`, {
    params: { vs_currency: 'usd', days: timeframe }
  }),
  searchCrypto: (query) => axios.get(`${API_BASE_URL}/search`, { params: { query } }),
};

// Portfolio API
export const portfolioAPI = {
  getPortfolio: () => api.get('/portfolio'),
  addTransaction: (transactionData) => api.post('/portfolio/transactions', transactionData),
  getTransactions: (params = {}) => api.get('/portfolio/transactions', { params }),
  updateHolding: (holdingId, data) => api.put(`/portfolio/holdings/${holdingId}`, data),
  deleteTransaction: (transactionId) => api.delete(`/portfolio/transactions/${transactionId}`),
  getPortfolioStats: () => api.get('/portfolio/stats'),
};

// Trading API
export const tradingAPI = {
  createOrder: (orderData) => api.post('/trading/orders', orderData),
  getOrders: (params = {}) => api.get('/trading/orders', { params }),
  cancelOrder: (orderId) => api.delete(`/trading/orders/${orderId}`),
  getOrderBook: (symbol) => api.get(`/trading/orderbook/${symbol}`),
  getTradeHistory: (params = {}) => api.get('/trading/history', { params }),
  getTradingPairs: () => api.get('/trading/pairs'),
};

// News API
export const newsAPI = {
  getNews: (params = {}) => api.get('/news', { params }),
  getNewsById: (id) => api.get(`/news/${id}`),
  getNewsByCategory: (category, params = {}) => api.get(`/news/category/${category}`, { params }),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  changePassword: (passwordData) => api.put('/user/password', passwordData),
  getNotifications: () => api.get('/user/notifications'),
  markNotificationRead: (notificationId) => api.put(`/user/notifications/${notificationId}/read`),
  updateSettings: (settings) => api.put('/user/settings', settings),
};

export default api;