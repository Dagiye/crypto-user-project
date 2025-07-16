import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { newsAPI } from '../services/api';
import { useApi } from '../context/ApiContext';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { handleApiCall } = useApi();

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFT' },
    { id: 'regulation', name: 'Regulation' }
  ];

  const fetchNews = async (category = 'all') => {
    try {
      let response;
      if (category === 'all') {
        response = await handleApiCall(newsAPI.getNews, { limit: 12 });
      } else {
        response = await handleApiCall(newsAPI.getNewsByCategory, category, { limit: 12 });
      }
      setNews(response.data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      // Fallback to mock data if API fails
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  // Mock news data as fallback
  const mockNews = [
    {
      id: 1,
      title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
      excerpt: "Major corporations continue to add Bitcoin to their treasury reserves, driving unprecedented institutional demand and market momentum.",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: "CryptoDaily",
      category: "Bitcoin",
      imageUrl: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400",
      url: "#"
    },
    {
      id: 2,
      title: "Ethereum 2.0 Staking Rewards Surge to New Highs",
      excerpt: "Ethereum staking yields have increased significantly following the latest network upgrade, attracting more validators to the ecosystem.",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: "BlockchainNews",
      category: "Ethereum",
      imageUrl: "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=400",
      url: "#"
    },
    {
      id: 3,
      title: "DeFi Protocol Launches Revolutionary Yield Farming Strategy",
      excerpt: "A new DeFi protocol introduces innovative yield farming mechanisms that promise higher returns with reduced impermanent loss risks.",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: "DeFiTimes",
      category: "DeFi",
      imageUrl: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400",
      url: "#"
    },
    {
      id: 4,
      title: "Regulatory Clarity Boosts Crypto Market Confidence",
      excerpt: "New regulatory guidelines provide clearer framework for cryptocurrency operations, leading to increased market participation.",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: "CryptoRegulator",
      category: "Regulation",
      imageUrl: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400",
      url: "#"
    },
    {
      id: 5,
      title: "NFT Market Experiences Renaissance with Utility-Focused Projects",
      excerpt: "The NFT space is seeing renewed interest as projects focus on real-world utility and integration with traditional industries.",
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      source: "NFTInsider",
      category: "NFT",
      imageUrl: "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=400",
      url: "#"
    },
    {
      id: 6,
      title: "Major Exchange Announces Zero-Fee Trading for Retail Investors",
      excerpt: "Leading cryptocurrency exchange eliminates trading fees for retail users, potentially reshaping the competitive landscape.",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      source: "ExchangeUpdate",
      category: "Exchange",
      imageUrl: "https://images.pexels.com/photos/7567445/pexels-photo-7567445.jpeg?auto=compress&cs=tinysrgb&w=400",
      url: "#"
    }
  ];

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Bitcoin': 'from-orange-500 to-yellow-500',
      'Ethereum': 'from-blue-500 to-purple-500',
      'DeFi': 'from-green-500 to-emerald-500',
      'NFT': 'from-pink-500 to-purple-500',
      'Regulation': 'from-red-500 to-orange-500',
      'Exchange': 'from-blue-500 to-cyan-500'
    };
    return colors[category] || 'from-blue-500 to-emerald-500';
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-800" id="news">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Latest Crypto News
            </h2>
            <p className="text-gray-300 text-lg">
              Loading the latest news...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden animate-pulse">
                <div className="bg-slate-700 h-48"></div>
                <div className="p-6 space-y-4">
                  <div className="bg-slate-700 h-4 w-3/4 rounded"></div>
                  <div className="bg-slate-700 h-4 w-1/2 rounded"></div>
                  <div className="space-y-2">
                    <div className="bg-slate-700 h-3 rounded"></div>
                    <div className="bg-slate-700 h-3 rounded"></div>
                    <div className="bg-slate-700 h-3 w-2/3 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-800" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest Crypto News
          </h2>
          <p className="text-gray-300 text-lg">
            Stay updated with the latest developments in the crypto world
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-all group">
              <div className="relative overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`bg-gradient-to-r ${getCategoryColor(item.category)} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{formatTimeAgo(item.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{item.source}</span>
                </div>
                
                <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center transition-colors"
                  >
                    Read More
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-emerald-600 transition-all">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;