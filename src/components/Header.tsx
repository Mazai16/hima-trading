/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Menu, X, Coins, Wallet, Globe, Shield, RefreshCw, BarChart2, 
  Share2, Award, Search, Moon, Sun, Settings, ChevronDown, CheckCircle, HelpCircle, User, BookOpen
} from 'lucide-react';
import { UserWallet } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  wallet: UserWallet;
  resetWallet: () => void;
  isProxyActive: boolean;
  deliveryWalletBalance: number;
}

export default function Header({ currentTab, setCurrentTab, wallet, resetWallet, isProxyActive, deliveryWalletBalance }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default logged-in to let them trade instantly!
  const [showNotification, setShowNotification] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText(prev => prev === msg ? null : prev);
    }, 4500);
  };

  // Mapped main navigation buttons based on user screenshot
  const menuItems = [
    { id: 'spot', label: '交割合约', icon: BarChart2 },
    { id: 'launchpad', label: 'Launchpad 认购', icon: Coins },
    { id: 'listing', label: '快捷上市', icon: Award },
    { id: 'buy-crypto', label: '法币买币', icon: Wallet },
    { id: 'learn', label: '新手投教', icon: BookOpen },
  ];

  const handleTabSelect = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f141c] border-b border-[#1f293d] shadow-lg">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Main Nav section */}
          <div className="flex items-center space-x-6">
            {/* Hima style Cybernetic Pegasus Logo */}
            <div className="flex items-center space-x-2.5 cursor-pointer select-none" onClick={() => handleTabSelect('spot')}>
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border border-[#01c7ff]/40 bg-[#12161f] shadow-md shadow-cyan-500/10">
                <img 
                  src="/src/assets/images/logo_hima_favicon_1782048211470.jpg" 
                  alt="Hima Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform" 
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0f141c]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[15px] sm:text-[17px] tracking-wider text-white flex items-center leading-tight">
                  希马<span className="text-[#01c7ff] font-extrabold ml-0.5">交易所</span>
                </span>
                <span className="text-[8px] text-[#01c7ff]/60 font-mono tracking-widest uppercase mt-0.5">Hima Exchange</span>
              </div>
            </div>

            {/* Desktop Navigation Link Tabs */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-tab-${item.id}`}
                    onClick={() => handleTabSelect(item.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[#0165ff]/15 text-[#01c7ff] border border-[#0165ff]/30'
                        : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Menu Panel */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Global Search Bar (Fake placeholder layout aligned to images) */}
            <div className="relative w-44 xl:w-56">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                <Search className="w-3.5 h-3.5 text-gray-500" />
              </span>
              <input 
                type="text" 
                placeholder="搜索交易对 / 币种..." 
                className="w-full pl-8 pr-2 py-1 bg-[#151a21] border border-gray-800 rounded-md text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#01c7ff] focus:ring-1 focus:ring-[#01c7ff]/30 font-mono"
              />
            </div>

            {/* Wallet Cash Balance Display */}
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-[#151a21] border border-gray-800 rounded text-xs font-mono">
              <span className="text-gray-400">现货资产:</span>
              <span className="text-emerald-400 font-bold">{wallet.USDT.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              <span className="text-gray-400 text-[10px]">USDT</span>
            </div>

            {/* Standard Login & Blue Button Register from gate.io layout */}
            <div className="flex items-center space-x-2 border-l border-gray-800 pl-3 border-r pr-3">
              <button 
                onClick={() => triggerToast('希马交易所：您已以真实白名单地址登录，可立即流畅体验全部实盘交割、新币申购、法币充提与自主挂单功能！')}
                className="text-xs text-gray-300 hover:text-white px-2 py-1 font-medium select-none"
              >
                已登录 (极速体验)
              </button>
              <button 
                onClick={() => triggerToast('希马交易所：已识别您的会员账户为「高等级合规安全商户」，无需重复注册。')}
                className="px-3 py-1 rounded bg-[#0165ff] hover:bg-[#0052ff] text-white text-xs font-bold transition-all select-none animate-pulse"
              >
                已注册
              </button>
            </div>

            {/* Utility icons */}
            <div className="flex items-center space-x-3 text-gray-400">
              <Moon 
                onClick={() => triggerToast('希马交易所：尊贵的会员，系统当前已自动为您调优为护眼深邃黑夜间模式，提供极佳行情看盘视觉对比！')}
                className="w-4 h-4 cursor-pointer hover:text-white transition-colors" 
              />
              <Globe 
                onClick={() => triggerToast('希马交易所：已为您智能锁定「中文(简体)」看盘专线。全量公网通信已无缝搭载。')}
                className="w-4 h-4 cursor-pointer hover:text-white transition-colors" 
              />
              <Settings 
                onClick={() => triggerToast('希马交易所：本计算节点安全防护已由高频指纹隔离和毫秒级引擎双向加载运行。')}
                className="w-4 h-4 cursor-pointer hover:text-white transition-colors" 
              />
            </div>

          </div>

          {/* Mobile responsive hamburger menu */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14] border-b border-[#1f293d] py-3 px-4 space-y-2 animate-fadeIn font-mono">
          <div className="p-3 bg-gray-900/80 rounded border border-gray-800 flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-[#01c7ff]" />
              <span className="text-xs text-gray-400">极速实盘可用资金</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-emerald-400">
                ${wallet.USDT.toLocaleString(undefined, {minimumFractionDigits: 1})}
              </span>
              <span className="text-[10px] text-gray-500 ml-1">USDT</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabSelect(item.id)}
                  className={`flex items-center space-x-2 p-2.5 rounded text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0165ff]/10 text-[#01c7ff] border border-[#0165ff]/40'
                      : 'text-gray-300 hover:bg-gray-800 bg-gray-900/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-gray-850 text-xs text-gray-500">
            <span>安全防关联代理:</span>
            <span className={isProxyActive ? "text-amber-400 font-bold" : "text-gray-400"}>
              {isProxyActive ? "已连通" : "未挂载"}
            </span>
            <button
              onClick={() => {
                resetWallet();
                alert('已为您重画 10,000 USDT、1.845 ETH 及 0.1245 BTC 会员账户资金。');
              }}
              className="text-[#01c7ff] hover:underline flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>注资 10,000$</span>
            </button>
          </div>
        </div>
      )}
      {toastText && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#151a21]/95 border border-[#01c7ff]/40 text-gray-100 px-4 py-3 rounded-xl shadow-2xl flex items-start space-x-3 select-none backdrop-blur-md">
          <div className="w-5 h-5 rounded-full bg-[#01c7ff]/10 flex items-center justify-center text-[#01c7ff] mt-0.5 flex-shrink-0">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1">
            <h5 className="text-[11px] font-bold text-[#01c7ff] uppercase tracking-wider font-mono">希马交易所 通知</h5>
            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed font-sans">{toastText}</p>
          </div>
          <button 
            onClick={() => setToastText(null)}
            className="text-gray-500 hover:text-white text-xs font-bold leading-none"
          >
            ×
          </button>
        </div>
      )}
    </header>
  );
}
