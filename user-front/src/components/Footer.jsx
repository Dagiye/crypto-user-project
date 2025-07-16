import React from 'react';
import { TrendingUp, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Platform': [
      'Trading',
      'Portfolio',
      'Markets',
      'News',
      'API Documentation'
    ],
    'Support': [
      'Help Center',
      'Contact Us',
      'System Status',
      'Security',
      'Bug Reports'
    ],
    'Company': [
      'About Us',
      'Careers',
      'Press',
      'Partnerships',
      'Blog'
    ],
    'Legal': [
      'Terms of Service',
      'Privacy Policy',
      'Cookie Policy',
      'Compliance',
      'Licenses'
    ]
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CryptoVault</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The most trusted cryptocurrency trading platform. Trade with confidence using our advanced tools and secure infrastructure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 CryptoVault. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">
                🔒 256-bit SSL encryption
              </span>
              <span className="text-gray-400">
                🏦 FDIC insured
              </span>
              <span className="text-gray-400">
                ⚡ 99.9% uptime
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;