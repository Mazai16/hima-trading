/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BarChart2, Coins, Award, RefreshCw, Sparkles
} from 'lucide-react';

import Header from './components/Header';
import SpotTrading from './components/SpotTrading';
import Launchpad from './components/Launchpad';
import ListingService from './components/ListingService';
import BuyCrypto from './components/BuyCrypto';
import LearnCenter from './components/LearnCenter';

import { UserWallet, Order } from './types';

const DEFAULT_WALLET: UserWallet = {
  USDT: 10000.00,
  BTC: 0.1245,
  ETH: 1.845,
  SOL: 15.0,
  BNB: 2.25,
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => {
    return localStorage.getItem('p2b_active_tab') || 'spot';
  });

  const [wallet, setWallet] = useState<UserWallet>(() => {
    const cached = localStorage.getItem('p2b_user_wallet_v2');
    return cached ? JSON.parse(cached) : DEFAULT_WALLET;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const cached = localStorage.getItem('p2b_user_orders_v2');
    return cached ? JSON.parse(cached) : [];
  });

  const [isProxyActive, setIsProxyActive] = useState<boolean>(() => {
    return localStorage.getItem('p2b_proxy_active') === 'true';
  });

  const [activeProxyId, setActiveProxyId] = useState<string>(() => {
    return localStorage.getItem('p2b_active_proxy_id') || 'proxy-uk';
  });

  const [deliveryWalletBalance, setDeliveryWalletBalance] = useState<number>(() => {
    const cached = localStorage.getItem('p2b_delivery_wallet_balance');
    return cached ? parseFloat(cached) : 66751.4915232;
  });

  // State caches
  useEffect(() => {
    localStorage.setItem('p2b_active_tab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('p2b_user_wallet_v2', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('p2b_delivery_wallet_balance', String(deliveryWalletBalance));
  }, [deliveryWalletBalance]);

  useEffect(() => {
    localStorage.setItem('p2b_user_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('p2b_proxy_active', String(isProxyActive));
  }, [isProxyActive]);

  useEffect(() => {
    localStorage.setItem('p2b_active_proxy_id', activeProxyId);
  }, [activeProxyId]);

  const resetWallet = () => {
    if (window.confirm('是否重画虚拟模拟钱包下的所有资产余额？此操作将会重置钱包至期初：\n\n10,000 USDT \n1.845 ETH \n0.1245 BTC')) {
      setWallet(DEFAULT_WALLET);
    }
  };

  const renderActiveContent = () => {
    switch (currentTab) {
      case 'spot':
        return (
          <SpotTrading 
            wallet={wallet} 
            setWallet={setWallet} 
            orders={orders} 
            setOrders={setOrders} 
            isProxyActive={isProxyActive}
            deliveryWalletBalance={deliveryWalletBalance}
            setDeliveryWalletBalance={setDeliveryWalletBalance}
          />
        );
      case 'launchpad':
        return <Launchpad wallet={wallet} setWallet={setWallet} />;
      case 'listing':
        return <ListingService />;
      case 'buy-crypto':
        return <BuyCrypto wallet={wallet} setWallet={setWallet} />;
      case 'learn':
        return (
          <LearnCenter
            wallet={wallet}
            setWallet={setWallet}
            orders={orders}
            setOrders={setOrders}
            isProxyActive={isProxyActive}
            setCurrentTab={setCurrentTab}
          />
        );
      default:
        return (
          <SpotTrading 
            wallet={wallet} 
            setWallet={setWallet} 
            orders={orders} 
            setOrders={setOrders} 
            isProxyActive={isProxyActive}
            deliveryWalletBalance={deliveryWalletBalance}
            setDeliveryWalletBalance={setDeliveryWalletBalance}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0e11] text-[#f3f4f6]">
      
      {/* Universal responsive header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        wallet={wallet} 
        resetWallet={resetWallet}
        isProxyActive={isProxyActive}
        deliveryWalletBalance={deliveryWalletBalance}
      />

      {/* Main Container body spacer */}
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-8">
        
        {/* Dynamically switching tab workspace */}
        <div className="transition-all duration-200">
          {renderActiveContent()}
        </div>

      </main>

      {/* Footer info panel */}
      <footer className="bg-[#0f141c] border-t border-[#1f293d] py-6 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-[1600px] mx-auto px-4 space-y-3">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-450 text-[11px]">
            <span className="hover:text-[#01c7ff] cursor-pointer transition-colors" onClick={() => setCurrentTab('spot')}>交割合约</span>
            <span className="hover:text-[#01c7ff] cursor-pointer transition-colors" onClick={() => setCurrentTab('launchpad')}>Launchpad 新币认购</span>
            <span className="hover:text-[#01c7ff] cursor-pointer transition-colors" onClick={() => setCurrentTab('listing')}>快捷上市通道</span>
            <span className="hover:text-[#01c7ff] cursor-pointer transition-colors" onClick={() => setCurrentTab('buy-crypto')}>法币买币</span>
            <span className="hover:text-[#01c7ff] cursor-pointer font-bold text-[#01c7ff]" onClick={() => setCurrentTab('learn')}>🎓 新手投教学院</span>
          </div>

          <p className="max-w-3xl mx-auto text-[10px] text-gray-550 leading-relaxed font-sans">
            免责声明 &amp; 风险提示: 数字资产属于高风险去中心化资产，可能伴随大幅的市场波动和流动性风险。请用户务必在充分了解产品特征及规则后，根据自身风险承受能力理性进行资产交易和理财认购。
          </p>

          <p className="text-[10px] text-gray-600 font-sans">
            © 2026 希马交易所 全球数字资产及代币衍生品交易服务系统. 版权所有.
          </p>
        </div>
      </footer>

    </div>
  );
}
