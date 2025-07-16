import { useState, useEffect } from 'react';
import { marketAPI } from '../services/api';
import { useApi } from '../context/ApiContext';

export const useMarketData = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [marketStats, setMarketStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleApiCall } = useApi();

  const fetchMarketData = async () => {
    try {
      // Use direct API calls since we're using CoinGecko API
      const cryptoResponse = await marketAPI.getCryptocurrencies({ limit: 50 });
      const statsResponse = await marketAPI.getMarketStats();
      
      setCryptocurrencies(cryptoResponse.data);
      
      // Transform CoinGecko global stats to our format
      const globalData = statsResponse.data.data;
      setMarketStats({
        total_market_cap: globalData.total_market_cap.usd,
        market_cap_change_24h: globalData.market_cap_change_percentage_24h_usd,
        total_volume: globalData.total_volume.usd,
        volume_change_24h: 0, // CoinGecko doesn't provide this directly
        btc_dominance: globalData.market_cap_percentage.btc,
        btc_dominance_change: 0, // Would need historical data
        active_cryptocurrencies: globalData.active_cryptocurrencies,
        new_coins_24h: 0 // CoinGecko doesn't provide this directly
      });
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      // Set fallback data
      setCryptocurrencies([]);
      setMarketStats({
        total_market_cap: 2100000000000,
        market_cap_change_24h: 2.4,
        total_volume: 89200000000,
        volume_change_24h: -1.2,
        btc_dominance: 42.3,
        btc_dominance_change: 0.8,
        active_cryptocurrencies: 23547,
        new_coins_24h: 156
      });
    } finally {
      setLoading(false);
    }
  };

  const searchCrypto = async (query) => {
    try {
      const response = await marketAPI.searchCrypto(query);
      // Transform CoinGecko search results to our format
      return response.data.coins.slice(0, 10).map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.large,
        current_price: 0 // Would need separate API call for price
      }));
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  };

  const getCryptocurrency = async (id) => {
    try {
      const response = await marketAPI.getCryptocurrency(id);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch cryptocurrency:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Set up real-time updates
    const interval = setInterval(fetchMarketData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return {
    cryptocurrencies,
    marketStats,
    loading,
    searchCrypto,
    getCryptocurrency,
    refetch: fetchMarketData
  };
};