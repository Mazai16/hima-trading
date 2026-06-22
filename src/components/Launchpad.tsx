/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Coins, Flame, UserCheck, Timer, Ticket, CoinsIcon, TrendingUp, Sparkles } from 'lucide-react';
import { LaunchpadProject, UserWallet } from '../types';

interface LaunchpadProps {
  wallet: UserWallet;
  setWallet: React.Dispatch<React.SetStateAction<UserWallet>>;
}

// Highly realistic launchpad projects
const INITIAL_PROJECTS: LaunchpadProject[] = [
  {
    id: 'launch-p2b',
    name: 'P2B Chain Utility Token',
    ticker: 'P2B',
    description: 'P2B 交易所原生链通用生态通证。用于快速上架手续费抵扣、上市折扣投票、持币锁仓派息等多重高价值权益。全球覆盖50+主流Layer-1链，赋能百万用户。',
    logo: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=120&q=80',
    totalRaise: 1500000,
    price: 0.15, // Subscription cost in USDT
    tokenQty: 10000000,
    status: 'ACTIVE',
    progressPercent: 88.4,
    startTime: '2026-06-15 10:00:00',
    endTime: '2026-06-25 18:00:00',
    participants: 18450,
    raisedUSDT: 1326000,
    userCommitment: 0
  },
  {
    id: 'launch-solv',
    name: 'Solv Protocol',
    ticker: 'SOLV',
    description: '去中心化流动性重质押基础设施。支持一键式多链收益聚合及资产信托凭证，通过智能合约执行跨信任清算，让高频套利者和普通节点持币者轻松获得高收益。',
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=120&q=80',
    totalRaise: 800000,
    price: 0.25,
    tokenQty: 3200000,
    status: 'ACTIVE',
    progressPercent: 54.2,
    startTime: '2026-06-18 12:00:00',
    endTime: '2026-06-28 12:00:00',
    participants: 9410,
    raisedUSDT: 433600,
    userCommitment: 0
  },
  {
    id: 'launch-cyber',
    name: 'Cyberverse Game',
    ticker: 'CYBER',
    description: '革命性 Web3 开放世界太空格斗沙盒，采用 UE5 及高吞吐区块链状态机，集成了跨链 NFT 飞艇装备、行星资源开采DAO以及零延迟即时微端交易，重构下一代元宇宙游戏生态。',
    logo: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=120&q=80',
    totalRaise: 2000000,
    price: 0.05,
    tokenQty: 40000000,
    status: 'UPCOMING',
    progressPercent: 0,
    startTime: '2026-07-02 09:00:00',
    endTime: '2026-07-12 18:00:00',
    participants: 0,
    raisedUSDT: 0,
    userCommitment: 0
  }
];

export default function Launchpad({ wallet, setWallet }: LaunchpadProps) {
  const [projects, setProjects] = useState<LaunchpadProject[]>(INITIAL_PROJECTS);
  const [commitAmounts, setCommitAmounts] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<string | null>(null);

  // Commit USDT to participate in token sales
  const handleCommit = (projectId: string) => {
    const inputVal = commitAmounts[projectId];
    const amountToCommit = parseFloat(inputVal);

    if (isNaN(amountToCommit) || amountToCommit <= 0) {
      alert('请输入有效的申购认配 USDT 金额');
      return;
    }

    if (wallet.USDT < amountToCommit) {
      alert('USDT 余额不足！请到侧栏或快捷入账页面充值后再行操作。');
      return;
    }

    // Process subscription commitment (100% real wallet adjustments based on actual math)
    setWallet(prev => ({
      ...prev,
      USDT: prev.USDT - amountToCommit
    }));

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const currentComm = p.userCommitment || 0;
        const newComm = currentComm + amountToCommit;
        
        // Calculate dynamic progress jump
        const newRaised = p.raisedUSDT + amountToCommit;
        const newProgress = Math.min((newRaised / p.totalRaise) * 100, 100);

        return {
          ...p,
          userCommitment: newComm,
          raisedUSDT: newRaised,
          progressPercent: parseFloat(newProgress.toFixed(2)),
          participants: p.participants + (currentComm === 0 ? 1 : 0)
        };
      }
      return p;
    }));

    // Clear form
    setCommitAmounts(prev => ({ ...prev, [projectId]: '' }));
    
    // Show confirmation
    setNotification(`✓ 成功认购！您已成功锁定 ${amountToCommit} USDT 参与该项目的初期分发生态建设。`);
    setTimeout(() => setNotification(null), 5000);
  };

  // Safe claim preview
  const handleClaim = (project: LaunchpadProject) => {
    const comm = project.userCommitment || 0;
    if (comm <= 0) return;

    // Calculate token output: comm / price
    const tokenOutput = comm / project.price;

    setWallet(prev => ({
      ...prev,
      [project.ticker]: (prev[project.ticker] || 0) + tokenOutput
    }));

    // Reset user commitment
    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, userCommitment: 0 } : p));

    setNotification(`✓ 领取成功！已成功将 ${tokenOutput.toLocaleString()} ${project.ticker} 注入您的现货钱包资产中。`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-[#151a21]/90 to-slate-900 border border-[#1f293d] rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-3xl flex-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launchpad 去中心化新项目首次分发平台 (IEO)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-100 tracking-tight leading-tight">
              首发低成本认购，分享万倍增长极
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              希马交易所 Launchpad 是一块通过严苛审计与高速流动性池，帮助用户在代币上架交易前，以极低廉的期初价格认购代币额度的新型资产孵化器。
              无门槛限制，100% 对接用户钱包及实时账目交割。
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-gray-400">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>总申购支持人数: <strong className="text-gray-200">512,410</strong>人</span>
              </div>
              <div className="flex items-center space-x-1.5 text-gray-400">
                <Timer className="w-4 h-4 text-emerald-400" />
                <span>历史平均盈利率 (ATH ROI): <strong className="text-emerald-400">+2,415%</strong></span>
              </div>
            </div>
          </div>

          {/* Hima Exchange Beautiful Pegasus Brand Logo */}
          <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-2xl overflow-hidden border border-[#01c7ff]/30 shadow-2xl bg-[#0f141c] p-1 flex items-center justify-center">
            <img 
              src="/src/assets/images/logo_hima_exchange_1782048195421.jpg" 
              alt="Hima Exchange Official Brand" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center space-x-2 animate-pulse">
          <Flame className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main launchpad grid */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-gray-200 flex items-center space-x-2">
          <Flame className="w-5 h-5 text-red-400 animate-bounce" />
          <span>当前正在火热申购中的 IEO 项目</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const isUpcoming = project.status === 'UPCOMING';
            const userComm = project.userCommitment || 0;
            const expectedTokens = userComm / project.price;

            return (
              <div 
                key={project.id} 
                className="bg-[#151a21]/90 border border-[#1f293d] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-gray-700/60 transition-all duration-200"
              >
                {/* Upper part: brand banner */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={project.logo} 
                        alt={project.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-extrabold text-base text-gray-100 flex items-center">
                          <span>{project.name}</span>
                          <span className="ml-2 px-2 py-0.5 text-xs font-mono bg-emerald-500/15 text-emerald-400 rounded">
                            {project.ticker}
                          </span>
                        </h4>
                        <span className="text-xs text-gray-500">代币价格: ${project.price} USDT</span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded text-xs font-bold leading-none ${
                      isUpcoming 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse'
                    }`}>
                      {isUpcoming ? '即将起航' : '申购中'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed min-h-12">
                    {project.description}
                  </p>

                  {/* Fund stats */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-lg bg-gray-900 border border-gray-800/80 font-mono text-center text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 block">目标募集</span>
                      <span className="text-gray-200 font-bold">${project.totalRaise.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">已筹得资金</span>
                      <span className="text-emerald-400 font-bold">${project.raisedUSDT.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">支持人数</span>
                      <span className="text-gray-200 font-bold">{project.participants.toLocaleString()} 人</span>
                    </div>
                  </div>

                  {/* Funding slider progress bar */}
                  {!isUpcoming && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-gray-500">
                        <span>分配募集配额进度:</span>
                        <strong className="text-emerald-400">{project.progressPercent}%</strong>
                      </div>
                      <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${project.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
                    <Timer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>截止时间: <strong className="text-slate-300">{project.endTime}</strong></span>
                  </div>
                </div>

                {/* Lower part: interactive commitments panel */}
                <div className="bg-[#0f141c] border-t border-[#1f293d] p-4 font-mono">
                  {isUpcoming ? (
                    <div className="text-center py-2 text-xs text-gray-500">
                      申购时间至: <strong className="text-amber-400">{project.startTime}</strong> 正式开启。
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Subscription input form */}
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <input 
                            type="number" 
                            placeholder="锁定 USDT 额度" 
                            value={commitAmounts[project.id] || ''}
                            onChange={(e) => setCommitAmounts({ ...commitAmounts, [project.id]: e.target.value })}
                            className="w-full bg-[#151a21] border border-gray-800 focus:border-emerald-500 rounded-md py-1.5 pl-3 pr-12 text-xs text-gray-100 placeholder-gray-600 focus:outline-none"
                          />
                          <span className="absolute right-3 top-2 text-[10px] text-gray-500">USDT</span>
                        </div>
                        <button
                          onClick={() => handleCommit(project.id)}
                          className="px-4 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-bold transition-all"
                        >
                          投币认购
                        </button>
                      </div>

                      {/* Display dedicated details if the user committed */}
                      {userComm > 0 && (
                        <div className="p-3 rounded bg-emerald-500/5 border border-emerald-500/20 text-xs flex justify-between items-center">
                          <div>
                            <span className="text-gray-500 text-[10px] block">您已锁定申购</span>
                            <strong className="text-emerald-400 block">{userComm} USDT</strong>
                          </div>
                          <div>
                            <span className="text-gray-500 text-[10px] block">预计可分发获得</span>
                            <strong className="text-gray-200 block">{expectedTokens.toLocaleString()} {project.ticker}</strong>
                          </div>
                          <button
                            onClick={() => handleClaim(project)}
                            className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-900 text-[10px] font-bold rounded flex items-center space-x-1"
                          >
                            <Ticket className="w-3 h-3" />
                            <span>提前分摊领取</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
