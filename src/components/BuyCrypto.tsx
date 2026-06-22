/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Shield, Landmark, RefreshCw, CheckCircle, ArrowRight, 
  HelpCircle, AlertCircle, Sparkles, Coins
} from 'lucide-react';
import { UserWallet } from '../types';

interface BuyCryptoProps {
  wallet: UserWallet;
  setWallet: React.Dispatch<React.SetStateAction<UserWallet>>;
}

const FIAT_CURRENCIES = [
  { code: 'CNY', label: '人民币 (CNY)', rateToUsd: 0.138 },
  { code: 'USD', label: '美元 (USD)', rateToUsd: 1.0 },
  { code: 'EUR', label: '欧元 (EUR)', rateToUsd: 1.085 },
  { code: 'GBP', label: '英镑 (GBP)', rateToUsd: 1.268 },
  { code: 'JPY', label: '日元 (JPY)', rateToUsd: 0.0064 }
];

const TARGET_CRYPTOS = [
  { code: 'USDT', label: 'Tether (USDT)', initialPrice: 1.0 },
  { code: 'BTC', label: 'Bitcoin (BTC)', initialPrice: 92450.0 },
  { code: 'ETH', label: 'Ethereum (ETH)', initialPrice: 3450.2 },
  { code: 'SOL', label: 'Solana (SOL)', initialPrice: 215.4 },
  { code: 'BNB', label: 'BNB (BNB)', initialPrice: 588.6 }
];

const GATEWAYS = [
  { name: 'Banxa', feePercent: 1.5, deliveryTime: '2-5 分钟', rating: 4.8, bestFor: '高额无阻/信用卡' },
  { name: 'MoonPay', feePercent: 2.22, deliveryTime: '5-10 分钟', rating: 4.6, bestFor: 'Apple Pay / Google Pay' },
  { name: 'Simplex', feePercent: 3.5, deliveryTime: '10-15 分钟', rating: 4.4, bestFor: '国际 Visa 电汇' }
];

export default function BuyCrypto({ wallet, setWallet }: BuyCryptoProps) {
  const [fiatAmount, setFiatAmount] = useState<string>('5000');
  const [fiatCurrency, setFiatCurrency] = useState<string>('CNY');
  const [targetCrypto, setTargetCrypto] = useState<string>('USDT');
  const [selectedGateway, setSelectedGateway] = useState<string>('Banxa');
  
  // Real-time rates tracker
  const [cryptoPrice, setCryptoPrice] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // Auto-fetch price from Binance to ensure actual real conversions
  useEffect(() => {
    const fetchTargetPrice = async () => {
      if (targetCrypto === 'USDT') {
        setCryptoPrice(1.0);
        return;
      }
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${targetCrypto}USDT`);
        if (res.ok) {
          const data = await res.json();
          setCryptoPrice(parseFloat(data.price));
        }
      } catch (e) {
        // Fallback pricing
        const found = TARGET_CRYPTOS.find(c => c.code === targetCrypto);
        if (found) setCryptoPrice(found.initialPrice);
      }
    };
    fetchTargetPrice();
  }, [targetCrypto]);

  // Conversion math
  const getSelectedFiat = () => FIAT_CURRENCIES.find(f => f.code === fiatCurrency) || FIAT_CURRENCIES[0];
  const getSelectedGatewayObj = () => GATEWAYS.find(g => g.name === selectedGateway) || GATEWAYS[0];

  const fiatAmountNum = parseFloat(fiatAmount) || 0;
  const fiatInUSD = fiatAmountNum * getSelectedFiat().rateToUsd;
  const gatewayObj = getSelectedGatewayObj();
  const feeUSD = fiatInUSD * (gatewayObj.feePercent / 100);
  const netUSD = Math.max(fiatInUSD - feeUSD, 0);
  const receivedCryptoAmount = cryptoPrice > 0 ? netUSD / cryptoPrice : 0;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fiatAmountNum <= 0) {
      alert('请输入合规的买币额度');
      return;
    }

    setIsLoading(true);

    // Dynamic processing
    setTimeout(() => {
      setIsLoading(false);
      
      // Update real wallet balance immediately upon purchase!
      setWallet(prev => ({
        ...prev,
        [targetCrypto]: (prev[targetCrypto] || 0) + receivedCryptoAmount
      }));

      // Trigger notification
      setOrderNotification(`✓ 入金成功！通过 ${selectedGateway} 网关成功收兑 ${receivedCryptoAmount.toLocaleString(undefined, {maximumFractionDigits: 5})} ${targetCrypto}，已妥善派发至您的个人现货持仓中。`);
      setFiatAmount('');
      setTimeout(() => setOrderNotification(null), 8000);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Upper info banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-[#151a21] to-slate-900 border border-[#1f293d] rounded-2xl p-6 shadow-md">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>法币快速入金 (CNY / USD / EUR 极速无隙通道)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-150 tracking-tight">
            全球一站式合规法币买币
          </h2>
          <p className="mt-1.5 text-xs text-gray-400">
            支持全球 50 多类主流借记卡、信用卡（Visa/MasterCard）、Apple Pay 或各国电汇极速支付。
            无隙对接全球多重合规清算牌照，入账金流经 Hacken 极客隔离洗产防护，资金安全无忧。
          </p>
        </div>
      </div>

      {orderNotification && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center space-x-2 font-mono animate-pulse">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{orderNotification}</span>
        </div>
      )}

      {/* Main interaction split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left input and calculator column */}
        <div className="lg:col-span-7 bg-[#151a21] border border-[#1f293d] p-5 rounded-2xl shadow-lg">
          <h3 className="text-sm font-bold text-gray-100 flex items-center space-x-2 pb-3 border-b border-gray-800 mb-4">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>法币兑汇估算器</span>
          </h3>

          <form onSubmit={handleCheckoutSubmit} className="space-y-4 font-mono text-xs">
            {/* Fiat entry field */}
            <div className="space-y-1.5">
              <label className="text-gray-400 block">我希望支付 (输入法币金额)</label>
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  value={fiatAmount}
                  onChange={(e) => setFiatAmount(e.target.value)}
                  placeholder="请输入支付额度"
                  required
                  min="50"
                  className="flex-1 bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2.5 px-3 text-sm text-gray-200 focus:outline-none"
                />
                <select 
                  value={fiatCurrency}
                  onChange={(e) => setFiatCurrency(e.target.value)}
                  className="bg-[#0c1017] border border-gray-800 rounded-lg px-3 text-gray-300 text-xs focus:outline-none"
                >
                  {FIAT_CURRENCIES.map(curr => (
                    <option key={curr.code} value={curr.code}>{curr.code}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target crypto */}
            <div className="space-y-1.5">
              <label className="text-gray-400 block">我计划接收 (目标数字资产)</label>
              <div className="flex space-x-2">
                <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg flex items-center px-3 font-semibold text-emerald-400 text-sm">
                  ≈ {receivedCryptoAmount.toLocaleString(undefined, {minimumFractionDigits: 4, maximumFractionDigits: 5})}
                </div>
                <select 
                  value={targetCrypto}
                  onChange={(e) => setTargetCrypto(e.target.value)}
                  className="bg-[#0c1017] border border-gray-800 rounded-lg px-3 text-gray-300 text-xs focus:outline-none"
                >
                  {TARGET_CRYPTOS.map(tc => (
                    <option key={tc.code} value={tc.code}>{tc.code}</option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-gray-500">
                最新结算参考价: <strong className="text-gray-300">1 {targetCrypto} ≈ ${(cryptoPrice).toLocaleString()} USD</strong>
              </p>
            </div>

            {/* Gateway selecting options */}
            <div className="space-y-2">
              <label className="text-gray-400 block">优选第三方清算网关 (智能推荐)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {GATEWAYS.map((gt) => (
                  <label 
                    key={gt.name} 
                    onClick={() => setSelectedGateway(gt.name)}
                    className={`p-3 rounded-lg border text-left cursor-pointer flex flex-col justify-between transition-all ${
                      selectedGateway === gt.name 
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-gray-100' 
                        : 'bg-[#0c1017] border-gray-800 hover:border-gray-700 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <b className="text-sm">{gt.name}</b>
                      <span className="text-[9px] bg-slate-800 px-1.5 rounded text-gray-300 uppercase tracking-tighter">{gt.bestFor}</span>
                    </div>

                    <div className="mt-4 text-[10px] space-y-0.5">
                      <p>通道手续费: <b className="text-emerald-400 font-semibold">{gt.feePercent}%</b></p>
                      <p>到账耗时: <b className="text-gray-300">{gt.deliveryTime}</b></p>
                      <p>系统保障度: <b className="text-[#10b981]">★ {gt.rating}</b></p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Total checkout list breakdown */}
            <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg text-[11px] space-y-1.5">
              <div className="flex justify-between items-center text-slate-500">
                <span>法币折合 USD:</span>
                <span className="text-slate-300">${fiatInUSD.toLocaleString(undefined, {maximumFractionDigits: 2})} USD</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>网关综合卡费/规费 (%):</span>
                <span className="text-red-400">-{feeUSD.toLocaleString(undefined, {maximumFractionDigits: 2})} USD ({gatewayObj.feePercent}%)</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>到账净值折合 (USDT):</span>
                <span className="text-emerald-400 font-bold">${netUSD.toLocaleString(undefined, {maximumFractionDigits: 2})} USDT</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 border-t border-gray-800/80 pt-1.5">
                <span className="font-bold">最终预计收到:</span>
                <strong className="text-lg text-emerald-400 font-extrabold font-mono">
                  {receivedCryptoAmount.toLocaleString(undefined, {minimumFractionDigits: 4, maximumFractionDigits: 5})} {targetCrypto}
                </strong>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all text-xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin font-bold" />
                  <span>正在建立与 {selectedGateway} 的网关 SSL 加密支付握手...</span>
                </>
              ) : (
                <>
                  <Landmark className="w-4 h-4" />
                  <span>立即支付法币交割 {targetCrypto} 资产入库</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right side: quick caution and helper tips */}
        <div className="lg:col-span-5 bg-[#151a21]/60 border border-[#1f293d] p-5 rounded-2xl flex flex-col justify-between">
          <div className="space-y-5">
            <h4 className="text-sm font-bold text-gray-200 border-b border-gray-800 pb-2">法币支付风险与监管声明</h4>
            
            <div className="space-y-4 text-xs leading-relaxed text-gray-400">
              <div className="flex items-start space-x-2.5">
                <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p>
                  <strong>双端隔离保护:</strong> 
                  希马交易所 与国际优质法币支付提供商签署双重保证金，如果因为银行阻碍或扣除问题未能到账，100% 赔付保证金先行代付，零交易损失。
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p>
                  <strong>KYC/AML 要求:</strong> 
                  由于不同法币网关遵从反洗钱合规审查，部分清算组织需要您在初次提款或大额代购时，提交单向人脸 ID 证实非盗刷。
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl space-y-1.5 font-mono text-[10px] text-gray-500 mt-6">
            <p className="font-extrabold text-gray-300 uppercase flex items-center space-x-1 mb-1">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>当前汇率报价源:</span>
            </p>
            <p>· USD/CNY 中间价: 7.250</p>
            <p>· ETHUSDT (即时币安): ${cryptoPrice.toLocaleString()}</p>
            <p>· 托管清算渠道: 欧法联行（EUBank）、Banxa Global Ltd.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
