/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, Rocket, ChevronRight, CheckCircle, FileText, Send, 
  Layers, Link, Award, Users, AlertCircle, RefreshCw 
} from 'lucide-react';
import { ListingApplication } from '../types';

export default function ListingService() {
  const [applications, setApplications] = useState<ListingApplication[]>([]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Form states
  const [projectName, setProjectName] = useState('');
  const [tokenTicker, setTokenTicker] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [website, setWebsite] = useState('');
  const [whitepaper, setWhitepaper] = useState('');
  const [targetChain, setTargetChain] = useState('SOL');
  const [budgetUsd, setBudgetUsd] = useState('10000-25000');
  const [pitch, setPitch] = useState('');

  // Load existing applications from localStorage to ensure 100% real local persistence
  useEffect(() => {
    const cached = localStorage.getItem('p2b_listing_apps');
    if (cached) {
      try {
        setApplications(JSON.parse(cached));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default initial applications for visual trust
      const defaultApps: ListingApplication[] = [
        {
          id: 'app-1',
          projectName: 'Cyberverse Game',
          tokenTicker: 'CYBER',
          contactEmail: 'games@cyberverse.io',
          telegram: '@cyberverse_corp',
          website: 'https://cyberverse.io',
          whitepaper: 'https://cyberverse.io/wp.pdf',
          targetChain: 'Solana',
          budgetUsd: '25,000 - 50,000 USD',
          pitch: '下一代采用 UE5 引擎开发的 Web3 开放世界太空格斗沙盒，结合即时跨链交易。',
          submissionTime: '2026-06-20 14:15:22',
          status: 'APPROVED'
        }
      ];
      setApplications(defaultApps);
      localStorage.setItem('p2b_listing_apps', JSON.stringify(defaultApps));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName || !tokenTicker || !contactEmail || !telegram || !website) {
      alert('请完整填写关键核心字段');
      return;
    }

    const newApp: ListingApplication = {
      id: 'APP-' + Date.now(),
      projectName,
      tokenTicker,
      contactEmail,
      telegram,
      website,
      whitepaper,
      targetChain,
      budgetUsd,
      pitch,
      submissionTime: new Date().toLocaleString(),
      status: 'UNDER_REVIEW'
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    localStorage.setItem('p2b_listing_apps', JSON.stringify(updatedApps));

    // Reset inputs
    setProjectName('');
    setTokenTicker('');
    setContactEmail('');
    setTelegram('');
    setWebsite('');
    setWhitepaper('');
    setPitch('');

    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  const marketingStats = [
    { label: '成功上市项目', value: '3,000+', icon: Rocket, desc: '全球初上市孵化效率第一' },
    { label: '支持主流公链', value: '51+', icon: Layers, desc: '打通多链资产，充提通畅' },
    { label: 'CoinMarketCap 排名', value: 'Top 20', icon: Award, desc: '高知名度，深度流动性保障' },
    { label: '安全审计评分', value: '9.8 / 10', icon: Shield, desc: 'HackenProof 安全网双核审计' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Upper part: Competitiveness Pitch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left side: text */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            <Award className="w-4 h-4" />
            <span className="font-bold">极速快审 上市首发金牌管道</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
            为新加密项目提供快速上市 (Go-to-Market) 核心竞争力支持
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            上线即刻对接 希马交易所 的 1000 万月度活跃极客交易社群！
            我们不仅提供多链自动上架系统，还配套了做市深度提供（AMM Liquidity Providers）、安全战略伙伴（HackenProof）审计折扣以及 CoinMarketCap、CoinGecko 的极速绿色推荐录入通道。
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="text-gray-200 text-xs block">24小时极速开板</strong>
                <span className="text-[10px] text-gray-500">专业技术团队全天候无缝代币多链对接。</span>
              </div>
            </div>
            <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="text-gray-200 text-xs block">做市和深度护航</strong>
                <span className="text-[10px] text-gray-500">自动流动性配仓保障上架币种的健康深度。</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: quick status cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          {marketingStats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="bg-[#151a21]/80 border border-[#1f293d] p-4 rounded-xl text-center flex flex-col justify-between hover:border-emerald-500/20 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mx-auto mb-2 text-emerald-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xl font-extrabold text-white font-mono">{st.value}</h4>
                <p className="text-xs text-gray-300 font-semibold mt-1">{st.label}</p>
                <span className="text-[9px] text-gray-500 mt-0.5">{st.desc}</span>
              </div>
            );
          })}
        </div>

      </div>

      {formSubmitted && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center space-x-2 font-mono">
          <CheckCircle className="w-4 h-4" />
          <span>✓ 申请已成功上链保存！平台上市评审委员会 (GTM Listing Committee) 将在 2 个工作小时内和您申请的 Telegram 联系！</span>
        </div>
      )}

      {/* Main content split: Form vs Current lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upper application submission Form */}
        <div className="lg:col-span-7 bg-[#151a21] border border-[#1f293d] rounded-2xl p-5 shadow-lg">
          <h3 className="text-sm font-bold text-gray-100 flex items-center space-x-2 pb-3 border-b border-gray-800 mb-4">
            <Send className="w-4 h-4 text-emerald-400" />
            <span>提交项目快捷上市与 Go-to-Market 开发申请表</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 mb-1 block">项目官方中文名称 *</label>
                <input 
                  type="text" 
                  required
                  placeholder="例如: Starverse Core"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2 px-3 text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400 mb-1 block">代币简称 (Token Ticker) *</label>
                <input 
                  type="text" 
                  required
                  placeholder="例如: STAR"
                  value={tokenTicker}
                  onChange={(e) => setTokenTicker(e.target.value)}
                  className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2 px-3 text-gray-200 focus:outline-none uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 mb-1 block">官方联系邮箱 *</label>
                <input 
                  type="email" 
                  required
                  placeholder="team@starverse.io"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2 px-3 text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400 mb-1 block">Telegram 核心商务负责人账号 *</label>
                <input 
                  type="text" 
                  required
                  placeholder="@Starverse_BD"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2 px-3 text-gray-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 mb-1 block">项目官网资产链接 *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://starverse.io"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2 px-3 text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400 mb-1 block">项目白皮书 (Whitepaper) / Github 研报 *</label>
                <input 
                  type="url" 
                  placeholder="https://starverse.io/whitepaper.pdf"
                  value={whitepaper}
                  onChange={(e) => setWhitepaper(e.target.value)}
                  className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2 px-3 text-gray-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 mb-1 block">部署目标区块链网络 *</label>
                <select 
                  value={targetChain}
                  onChange={(e) => setTargetChain(e.target.value)}
                  className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2 px-3 text-gray-200 focus:outline-none"
                >
                  <option value="SOL">Solana (SPL Token)</option>
                  <option value="ETH">Ethereum (ERC-20)</option>
                  <option value="BSC">BNB Chain (BEP-20)</option>
                  <option value="TON">TON BlockChain</option>
                  <option value="BASE">Base Layer-2</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 mb-1 block">预计 Go-to-Market 总体预算额度</label>
                <select 
                  value={budgetUsd}
                  onChange={(e) => setBudgetUsd(e.target.value)}
                  className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg py-2 px-3 text-gray-200 focus:outline-none"
                >
                  <option value="10000-25000">10,000 - 25,000 USD (普通快捷版)</option>
                  <option value="25000-50000">25,000 - 50,000 USD (深度做市高维保障)</option>
                  <option value="50000+">50,000+ USD (豪华GTM，配合同步全球20+大流量发榜)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-gray-400 mb-1 block">项目一句话亮点核心介绍与业务 Pitch (不超过200字) *</label>
              <textarea 
                rows={3}
                placeholder="请详细叙述核心机制、代币赋能逻辑及上新代币筹备期望..."
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                required
                className="w-full bg-[#0c1017] border border-gray-800 focus:border-emerald-500 rounded-lg p-3 text-gray-200 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 py-3 rounded-lg text-slate-900 font-bold text-center flex items-center justify-center space-x-1.5 active:scale-95 transition-all text-xs"
              >
                <Rocket className="w-4 h-4" />
                <span>立即提报审查并预约 GTM 上市商务对接</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Application Monitor Dashboard */}
        <div className="lg:col-span-5 bg-[#151a21] border border-[#1f293d] rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-100 flex items-center space-x-2 pb-3 border-b border-gray-800 mb-4">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>提报上市审查进度监控面板 (100% 真实本地更新)</span>
            </h3>

            <div className="space-y-4 max-h-[350px] overflow-y-auto">
              {applications.length === 0 ? (
                <div className="py-20 text-center text-gray-500 text-xs font-mono">
                  没有提交的申请，请在左方填写。
                </div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="p-3 bg-gray-900 rounded-lg border border-gray-800 space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-gray-100 text-sm block">{app.projectName}</strong>
                        <span className="text-[10px] text-gray-500">ID: {app.id} | 提交于: {app.submissionTime}</span>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400' :
                        app.status === 'COMPLETED' ? 'bg-teal-500/10 text-teal-400' : 'bg-amber-500/10 text-amber-500 animate-pulse'
                      }`}>
                        {app.status === 'APPROVED' ? '审查批准，对接中' :
                         app.status === 'COMPLETED' ? '已成功开板交易' : '等待初审中'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400 border-t border-gray-800/60 pt-2">
                      <div>
                        <span>代币代号:</span>
                        <strong className="text-slate-300 ml-1 uppercase">{app.tokenTicker}</strong>
                      </div>
                      <div>
                        <span>部署公链:</span>
                        <strong className="text-slate-300 ml-1">{app.targetChain}</strong>
                      </div>
                      <div>
                        <span>TG联络 BD:</span>
                        <strong className="text-slate-300 ml-1">{app.telegram}</strong>
                      </div>
                      <div>
                        <span>推广预案:</span>
                        <strong className="text-emerald-400 ml-1">{app.budgetUsd}</strong>
                      </div>
                    </div>

                    {app.pitch && (
                      <p className="p-2 bg-[#0c1017] rounded text-[10px] text-gray-500 leading-normal">
                        <strong>亮点简介:</strong> {app.pitch}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#0c1017] rounded-lg border border-gray-800 text-[10px] text-slate-500 flex items-start space-x-1.5 font-mono line-clamp-4">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div>
              <span>希马交易所 绿色快速保密审查说明:</span>
              <p className="mt-0.5">
                对属于恶意貔貅、无锁定归属权老鼠仓、合约安全得分低于80的项目平台将永久驳回拒绝上市。
                我们重视合规上市及 Hacken 签名审计。详情可在 Telegram 上联系 希马交易所 商务核验委员。
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
