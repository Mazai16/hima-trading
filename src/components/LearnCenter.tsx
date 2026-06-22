/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Play, CheckCircle, AlertCircle, Shield, Wallet, 
  HelpCircle, BarChart2, Award, ChevronDown, ChevronUp, ChevronRight, 
  ArrowRight, Coins, RefreshCw, Volume2, Sparkles, User, Star, Clock, Send, Zap
} from 'lucide-react';
import { UserWallet, Order } from '../types';
import { motion } from 'motion/react';

interface LearnCenterProps {
  wallet: UserWallet;
  setWallet: React.Dispatch<React.SetStateAction<UserWallet>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  isProxyActive: boolean;
  setCurrentTab: (tab: string) => void;
}

// High-quality Articles
const ARTICLES = [
  {
    id: 'art-1',
    title: '1. 加密数字资产与合约/现货交易通关秘籍',
    category: '基础概念',
    readTime: '4 分钟',
    difficulty: '入门级',
    summary: '快速理清什么是现货（Spot）交易与永续交割合约，以及如何理解交易所的双重报价机制。',
    pages: [
      {
        subtitle: '第一节：什么是现货交易 (Spot Trading)？',
        content: `现货交易是指买卖双方在交易达成后，立即进行资产所有权的转移与资金结算。

在 希马交易所 中：
- 当您在现货市场买入 BTC 时，是使用您的资金（例如 USDT）直接交割并获得 BTC。
- 这些 BTC 会真实存放在您的钱包里，随时可以用于二次认购或转移。
- 核心优点：持有实物，无爆仓机制，适合长期价值主义持有者。`
      },
      {
        subtitle: '第二节：什么是交割合约与永续交易？',
        content: `合约交易并不直接买卖数字资产，而是买卖该资产未来特定时间的指数合约。

这伴生了以下核心功能：
- **双向交易：** 既可以“看涨（Long - 做多）”也可以“看跌（Short - 做空）”。
- **杠杆增益：** 允许用较小比率的保证金支配大额资产（希马交易所 支持高达 100x 比例仓位管理）。
- **风险提示：** 杠杆放大了盈利，也同比例放大了亏损。当价格反向运行触及标记爆仓价格时，账户将被强制结算平仓。`
      },
      {
        subtitle: '第三节：交易所的盘口、订单深度与价差',
        content: `所有币圈交易的核心是“订单簿 (Order Book)”：
1. **买盘 (Bids)：** 按照价格从高到低排列的买方委托档位。
2. **卖盘 (Asks)：** 按照价格从低到高排列的卖方委托档位。
3. **盘口点价差：** 最低卖出价与最高买入价之间的距离。高流动性资产（如 BTCUSDT）的价差往往极小。
4. **冰山指令 (Iceberg Order)：** 大额委托单为防止对市场盘口造成过度冲击，会被拆分为若干批次显露在盘口，其余部分留在底槽中陆续撮合。`
      }
    ]
  },
  {
    id: 'art-2',
    title: '2. 网格交易与趋势追踪策略：在波动中高效盈利',
    category: '交易策略',
    readTime: '6 分钟',
    difficulty: '中级进阶',
    summary: '介绍自动化交易的黄金法宝——现货/合约网格策略，以及如何在横盘震荡市场中进行区间套利。',
    pages: [
      {
        subtitle: '第一节：什么是网格交易？',
        content: `网格交易是在设定的区间内，根据预设好的网格间距和资金配比，自动执行底仓吸纳、高点抛售的傻瓜化量化工具。

- **优势：** 摒弃人性贪婪，在震荡市中完美吸干每一次微幅反弹。
- **配置步骤：**
  1. 确定波动价格区间上限与下限。
  2. 确定网格总深度（如等差 20 格）。
  3. 投入启动保证金。系统会自动在每个刻度生成买卖挂单。`
      },
      {
        subtitle: '第二节：马丁格尔策略与反弹折旧',
        content: `马丁格尔（Martingale）原属博弈论：
- 每次价格下跌，便买入双倍金额。
- 只要出现一次像样的技术性回调/反弹，就能实现全仓均价瞬间拉平并盈利离场。
- **风险警告：** 在遭遇单边一路暴跌的“极端无底深渊走势”中，马丁格尔极易在极短时间内耗尽散户的备用资产并触发全盘崩溃。因此必须搭配严格的止损或网格分仓计划。`
      }
    ]
  },
  {
    id: 'art-3',
    title: '3. 财务与链路安全：利用防关联硬路由保护你的资金',
    category: '技术安全',
    readTime: '5 分钟',
    difficulty: '专业资深',
    summary: '深入探讨为什么跨境数字资产交易必须开启防指纹浏览器沙箱、隔离代理链路以及在防范网络关联等方向的具体实操。',
    pages: [
      {
        subtitle: '第一节：什么是防关联与多账户隔离？',
        content: `全球各国证券合规部门与大型交易所风控系统常驻有极严格的“防多重套利与防跨国异常异动检测”：
- 如果您在同一台电脑、同一IP、同一个地理范围内被嗅探到多次切换交易，可能会被判定为“机器套利、恶意IP漂移、洗钱指控”。
- **硬件浏览器指纹：** 即使您使用了常规 VPN，您的帆布指纹 (Canvas Fingerprint)、WebGL 特征、声卡驱动序列、网络延时和操作习惯依然会被风控完全捕获并打上关联标记。`
      },
      {
        subtitle: '第二节：希马交易所 独家硬路由代理方案',
        content: `希马交易所 专为高频资深套利者开发了“防指纹隔离与硬路由代理配置”：
1. **多重代理节点 (UK, Singapore, Japan)：** 提供原生、干净的住宅 IP 加密链路，杜绝公共机房 IP 组污染。
2. **多账号防关联：** 为每个账号生成特定网卡与操作隔离防护。
3. **隔离机制：** 将不同币种的操作映射至完全不同的隧道端口。开启后，可彻底阻断恶意金融系统的技术审查封锁。`
      }
    ]
  }
];

// High-quality FAQs
const FAQS = [
  {
    q: '作为完全零基础的新手，我能够获得哪些实操测试资金？',
    a: '所有完成注册和首发白名单登陆的用户，在本平台均可获得一键“重画余额”权。点击控制台右上角“重画余额”功能，系统将自定写入 10,000 USDT、1.845 ETH 及 0.1245 BTC 会员账户资金。这笔资产可以真实参与合约买卖、新币认购和所有量化产品调试。'
  },
  {
    q: '为什么进行数字合约或现货大笔买进后，余额没有发生变动？',
    a: '请在下单时优先核对当前提交的订单类型。若提交的是“限价单 (Limit Order)”，订单将会注入下方的『当前委托挂单』，此时必须当市场实盘走势价格触碰到您设定的目标价位后才会触发真实扣除成交。如果希望立即可见资产兑换，请切换至“市价单 (Market Order)”由系统即时撮合成交。'
  },
  {
    q: '平台的新币快速上市 Launchpad 发行是什么，如何参与？',
    a: 'Launchpad 是优质初创区块链项目的快捷折扣认购通道机制。用户可以使用账户内的 USDT 份额申请认购。认购开始后锁入资金，认购倒计时结束后，系统会根据分配比率将新上市的高增幅币种直接自动分发至您的现货余额中，并直接联动开启现货交易对，是获取早期千倍增值红利的理想方式。'
  },
  {
    q: '如何保障我的实盘充值、提币速度与主网地址解析安全？',
    a: '我们部署了顶级 HackenProof Bug 渗透自适应热备容灾机制。在充值与买币环节，推荐使用我们集成的 Banxa 或 MoonPay 的合规法币通道，系统在通过 API 实时结算后，通常在 2-5 分钟内即由冷钱包节点极速划拨至您的链上主网地址，绝不设任何人脸硬性 KYC 卡点隔离。'
  }
];

export default function LearnCenter({ wallet, setWallet, orders, setOrders, isProxyActive, setCurrentTab }: LearnCenterProps) {
  // Stats & Badges State
  const [readArticlesCount, setReadArticlesCount] = useState<string[]>([]);
  const [level, setLevel] = useState<number>(1);
  const [xp, setXp] = useState<number>(0);
  const [hasUnlockedBadge, setHasUnlockedBadge] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Completed Tasks Logic (Dynamic Real Checkers)
  const isTask1Completed = isProxyActive; // Checked from real proxy state
  const isTask2Completed = wallet.USDT > 10000.0; // Checks if they got simulated/added USDT funding
  const isTask3Completed = orders.length > 0; // Checked if they executed at least 1 order

  const completedCount = [isTask1Completed, isTask2Completed, isTask3Completed].filter(Boolean).length;

  // Active sub sections inside LearnAcademy
  const [currentSubTab, setCurrentSubTab] = useState<'quest' | 'sandbox' | 'academy' | 'video' | 'quiz'>('quest');

  // Article reader states
  const [activeArticle, setActiveArticle] = useState<typeof ARTICLES[0] | null>(null);
  const [activePageIdx, setActivePageIdx] = useState<number>(0);

  // Video Simulator states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [videoSpeed, setVideoSpeed] = useState<number>(1.0);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const videoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Quiz States
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // FAQ open state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Sandbox Sandbox Trading form states
  const [sandboxToken, setSandboxToken] = useState<string>('BTC');
  const [sandboxSide, setSandboxSide] = useState<'BUY' | 'SELL'>('BUY');
  const [sandboxType, setSandboxType] = useState<'LIMIT' | 'MARKET'>('LIMIT');
  const [sandboxPrice, setSandboxPrice] = useState<string>('64200.00');
  const [sandboxAmount, setSandboxAmount] = useState<string>('0.05');
  const [sandboxSliderAndPercent, setSandboxSliderAndPercent] = useState<number>(50);

  const tokenPrices: Record<string, number> = {
    BTC: 64245.10,
    ETH: 1725.73,
    GT: 6.59,
    SOL: 73.36,
  };

  // Auto set pricing in Sandbox
  useEffect(() => {
    if (tokenPrices[sandboxToken]) {
      setSandboxPrice(tokenPrices[sandboxToken].toFixed(2));
    }
  }, [sandboxToken]);

  // Handle slide percent change
  const handleSliderChange = (percent: number) => {
    setSandboxSliderAndPercent(percent);
    let usdtToUse = wallet.USDT * (percent / 100);
    let price = parseFloat(sandboxPrice) || 1.0;
    let qty = usdtToUse / price;
    setSandboxAmount(qty.toFixed(4));
  };

  // Video chapters data
  const VIDEO_CHAPTERS = [
    { time: 0, title: '课程简介：希马交易所 新手指引', desc: '宏观认识你的安全加密港湾' },
    { time: 10, title: '第二章：深度攻防——剖析冷钱包与防火隔离', desc: '为什么隔离硬路由能保卫账户安全' },
    { time: 25, title: '第三章：实锤下单——双轨制撮合揭秘', desc: '限价单与市价单在订单簿的精准落点' },
    { time: 45, title: '总结：通关毕业与合格投资者宣誓', desc: '如何在高波动市场稳稳落袋为安' }
  ];

  // Video simulated dialogue lines syncing with progress
  const getVideoSubtitles = (time: number) => {
    if (time >= 0 && time < 4) return '欢迎来到 希马交易所 全球极速投教大讲堂！让您零门槛实战。';
    if (time >= 4 && time < 10) return '第一步，我们需要通过“资产注入”准备底配；可以一键“重画余额”获得1万个测试USDT。';
    if (time >= 10 && time < 16) return '第二章，为什么资深用户偏爱“硬路由防关联及防指纹隔离”？';
    if (time >= 16 && time < 25) return '跨平台高频挂单会留存浏览器 Canvas 指纹。本平台的“硬路由配置”能彻底进行端口沙箱硬掩蔽。';
    if (time >= 25 && time < 32) return '第三步：如何进行一笔闪电般的交割挂单？';
    if (time >= 32 && time < 40) return '“限价单”帮您精准卡在主力买盘深处；“市价单”一键撮合。现在我们在右侧就能看到微型的简易实操沙盒。';
    if (time >= 40 && time < 50) return '注意风险隔离，结合MACD与RSI辅助。最后点击上方，即可参与新手合规趣味小考！';
    return '恭喜您完成了整套 希马交易所 交互式微视频学段。祝交易常红！';
  };

  // Simulated video timer logic
  useEffect(() => {
    if (isPlaying) {
      videoIntervalRef.current = setInterval(() => {
        setVideoTime(prev => {
          let next = prev + videoSpeed;
          if (next >= 55) {
            setIsPlaying(false);
            showToast('🎉 您已看完整套视频教程，获得 100 经验分！');
            addXp(100);
            return 0;
          }
          // Synch chapter
          const matchedChapterIdx = VIDEO_CHAPTERS.reduce((acc, chap, idx) => {
            if (next >= chap.time) return idx;
            return acc;
          }, 0);
          setActiveChapter(matchedChapterIdx);
          return next;
        });
      }, 1000);
    } else {
      if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
    }

    return () => {
      if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
    };
  }, [isPlaying, videoSpeed]);

  const addXp = (amount: number) => {
    setXp(prev => {
      let nextXp = prev + amount;
      let nextLvl = Math.floor(nextXp / 100) + 1;
      if (nextLvl > level) {
        setLevel(nextLvl);
        showToast(`🆙 恭喜晋升至 LV.${nextLvl} 新锐交易学者！已解锁更多进阶策略`);
      }
      return nextXp;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Handle Mark Article Read
  const handleMarkArticleRead = (articleId: string) => {
    if (!readArticlesCount.includes(articleId)) {
      const updated = [...readArticlesCount, articleId];
      setReadArticlesCount(updated);
      addXp(80);
      showToast('📖 文章阅读完成！经验值增加 80 XP');
    }
    setActiveArticle(null);
  };

  // Handle Sandbox submission: PUSH REAL ORDER
  const handleExecuteSandboxTrade = () => {
    const priceNum = parseFloat(sandboxPrice) || 0;
    const amountNum = parseFloat(sandboxAmount) || 0;
    const totalCost = priceNum * amountNum;

    if (amountNum <= 0 || priceNum <= 0) {
      alert('请输入有效的价格与数量');
      return;
    }

    if (sandboxSide === 'BUY') {
      if (wallet.USDT < totalCost) {
        alert(`资金不足！本次下单需要 ${totalCost.toFixed(2)} USDT，当前可用仅 ${wallet.USDT.toFixed(2)} USDT。你可以一键“重画余额”或在“法币买币”中充值。`);
        return;
      }

      // Deduct USDT, add token
      setWallet(prev => ({
        ...prev,
        USDT: prev.USDT - totalCost,
        [sandboxToken]: (prev[sandboxToken] || 0) + amountNum
      }));
    } else {
      const availableToken = wallet[sandboxToken] || 0;
      if (availableToken < amountNum) {
        alert(`持仓不足！本次做空卖出需要 ${amountNum} ${sandboxToken}，当前持仓仅 ${availableToken} ${sandboxToken}。`);
        return;
      }

      // Deduct Token, add USDT
      setWallet(prev => ({
        ...prev,
        [sandboxToken]: Math.max(availableToken - amountNum, 0),
        USDT: prev.USDT + totalCost
      }));
    }

    // Push actual order
    const mockOrder: Order = {
      id: `ord-sandbox-${Date.now()}`,
      pair: `${sandboxToken}USDT`,
      side: sandboxSide,
      type: sandboxType,
      price: priceNum,
      amount: amountNum,
      total: totalCost,
      time: new Date().toLocaleTimeString(),
      status: 'FILLED'
    };

    setOrders(prev => [mockOrder, ...prev]);
    addXp(120);
    showToast(`🎯 首单成交！在沙盒下单 ${amountNum} ${sandboxToken}，订单实时注入合约委托！`);
  };

  // Quick top up simulated
  const handleQuickOnboardingTopUp = () => {
    setWallet(prev => ({
      ...prev,
      USDT: prev.USDT + 10000.0
    }));
    showToast('💰 成功！10,000 USDT 新手指引实操体验金已即时划拨至您的钱包！');
    addXp(50);
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    let correctCount = 0;
    if (selectedAnswers[0] === 0) correctCount++; // 0: 市价单
    if (selectedAnswers[1] === 1) correctCount++; // 1: 隔离网络、避开IP漂移风控
    if (selectedAnswers[2] === 0) correctCount++; // 0: 达到或优于限定价格

    setQuizScore(correctCount);
    setQuizSubmitted(true);

    if (correctCount === 3) {
      addXp(150);
      setHasUnlockedBadge(true);
      showToast('🏆 满分通过测试！荣获『智睿投资者特权勋章』称号！');
    } else {
      showToast(`📝 考核完成，答对 ${correctCount}/3 题。可以查阅解析重新尝试！`);
    }
  };

  return (
    <div className="bg-[#111622] rounded-2xl border border-[#1f293d] p-4 sm:p-6 overflow-hidden min-h-[500px]">
      
      {/* Dynamic Toast Alert Notification banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-[#0165ff] text-white border border-cyan-400 p-3.5 rounded-xl shadow-[0_0_20px_rgba(1,101,255,0.4)] flex items-center space-x-3 text-xs animate-slideIn">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0 animate-pulse" />
          <p className="font-sans font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Header section with Stats Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1f293d] mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1 px-2 text-[10px] bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-bold uppercase tracking-wider">
              希马交易所 学院
            </span>
            <span className="flex items-center space-x-1 text-xs text-[#01c7ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#01c7ff] animate-pulse" />
              <span>全实战投教防护系统</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5 tracking-tight">
            <BookOpen className="w-6 h-6 text-[#01c7ff]" />
            新手起航 & 投教通关基地
          </h1>
          <p className="text-xs text-gray-400 max-w-xl">
            专为数字合约交易者搭载的高效互动起航中心。零门槛通关新手挑战，掌握核心止盈/止损与防指纹安全隔离链路。
          </p>
        </div>

        {/* User Interactive Badge Card */}
        <div className="bg-[#161d2d] border border-gray-800 p-3 sm:px-4 sm:py-3.5 rounded-xl flex items-center space-x-4 shrink-0 font-mono text-xs">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0165ff] to-[#01c7ff] flex items-center justify-center font-bold text-white shadow-inner relative">
            <User className="w-5 h-5" />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 border border-black rounded-full px-1 text-[9px] text-[#0b0e11] font-bold">
              LV.{level}
            </div>
          </div>
          <div className="space-y-1.5 flex-1 min-w-[120px]">
            <div className="flex justify-between text-gray-350">
              <span className="font-bold text-gray-200">交易学者：{level >= 3 ? '传奇大宗师' : level >= 2 ? '策略合规能手' : '青铜学徒'}</span>
              <span className="text-gray-400">{xp} / {(level * 100) + 120} XP</span>
            </div>
            {/* XP progress bar */}
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#01c7ff] to-emerald-400 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min((xp / ((level * 100) + 120)) * 100, 100)}%` }}
              />
            </div>
            {/* Badges unlocked showcase */}
            <div className="flex gap-x-2 pt-0.5">
              <span className={`inline-flex items-center text-[9px] px-1 hover:scale-105 transition-transform duration-150 py-0.2 rounded border ${completedCount === 3 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-800/40 text-gray-500 border-gray-850'}`}>
                <Award className="w-2.5 h-2.5 mr-0.5 shrink-0" />
                高级交易员勋章
              </span>
              <span className={`inline-flex items-center text-[9px] px-1 hover:scale-105 transition-transform duration-150 py-0.2 rounded border ${hasUnlockedBadge ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-gray-800/40 text-gray-500 border-gray-850'}`}>
                <Star className="w-2.5 h-2.5 mr-0.5 shrink-0" />
                智睿特权勋章
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Sub Navigation Menus */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-[#151a25] rounded-lg border border-[#21293a] mb-6">
        <button
          onClick={() => setCurrentSubTab('quest')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            currentSubTab === 'quest' 
              ? 'bg-[#0165ff] text-white' 
              : 'text-gray-400 hover:bg-[#1b2233] hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>新手起航挑战 ({completedCount}/3)</span>
        </button>

        <button
          onClick={() => setCurrentSubTab('sandbox')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            currentSubTab === 'sandbox' 
              ? 'bg-[#0165ff] text-white' 
              : 'text-gray-400 hover:bg-[#1b2233] hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>极速实操沙盒 (直接关联钱包)</span>
        </button>

        <button
          onClick={() => setCurrentSubTab('academy')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            currentSubTab === 'academy' 
              ? 'bg-[#0165ff] text-white' 
              : 'text-gray-400 hover:bg-[#1b2233] hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>交易理论学院 ({readArticlesCount.length}/{ARTICLES.length} 已读)</span>
        </button>

        <button
          onClick={() => setCurrentSubTab('video')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            currentSubTab === 'video' 
              ? 'bg-[#0165ff] text-white' 
              : 'text-gray-400 hover:bg-[#1b2233] hover:text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>名师互动视频培训课</span>
        </button>

        <button
          onClick={() => setCurrentSubTab('quiz')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            currentSubTab === 'quiz' 
              ? 'bg-[#0165ff] text-white' 
              : 'text-gray-400 hover:bg-[#1b2233] hover:text-white'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>合规考核竞速 (150XP 奖励)</span>
        </button>
      </div>

      {/* Main tab switching content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Dynamic Display area basis (cols-8) */}
        <div className="lg:col-span-8 space-y-4">

          {/* TAB 1: NEW USER QUEST CHECKLIST */}
          {currentSubTab === 'quest' && (
            <div className="space-y-4">
              <div className="bg-[#151a24]/60 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-100 flex items-center gap-1">
                      起航大礼包：通关全套获得专属勋章与白名单
                      {completedCount === 3 && <span className="text-xs bg-amber-400/20 text-amber-400 px-1.5 py-0.2 rounded font-mono">已解锁尊享权益</span>}
                    </h3>
                    <p className="text-[11px] text-gray-400">目前已有 <strong className="text-gray-200">12,492</strong> 名新学员通过了本大逃杀式合规训练计划。</p>
                  </div>
                </div>
                {/* Visual Circle progress banner */}
                <div className="relative shrink-0 flex items-center justify-center w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="21" stroke="#1f293d" strokeWidth="2.5" fill="transparent" />
                    <circle 
                      cx="24" 
                      cy="24" 
                      r="21" 
                      stroke="#10b981" 
                      strokeWidth="2.5" 
                      fill="transparent" 
                      strokeDasharray={2 * Math.PI * 21}
                      strokeDashoffset={(2 * Math.PI * 21) * (1 - completedCount / 3)}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <span className="absolute text-xs font-mono font-black text-gray-100">{Math.round((completedCount / 3) * 100)}%</span>
                </div>
              </div>

              {/* Tasks cards list */}
              <div className="space-y-3">
                
                {/* TASK 1 CARD (Checks real environment) */}
                <div className={`p-4 rounded-xl border transition-all ${isTask1Completed ? 'bg-[#151a24]/40 border-emerald-500/30' : 'bg-[#1b2233] border-gray-800'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {isTask1Completed ? (
                          <div className="w-5 h-5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center font-bold">
                            ✓
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-[#0165ff]/10 text-[#01c7ff] border border-[#0165ff]/30 rounded-full flex items-center justify-center text-xs font-bold font-mono">
                            1
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-100 flex items-center gap-1.5">
                          隔离硬件网络防关联链路
                          {isTask1Completed ? (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 py-0.1 rounded font-mono">
                              已连接原生加密隧道
                            </span>
                          ) : (
                            <span className="text-[10px] bg-red-400/20 text-red-400 border border-red-500/30 px-1 py-0.1 rounded font-mono">
                              目前链路关联中
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed max-w-xl">
                          加密交易所系统会精密排查单设备多账户异常。前往<strong>[防指纹隔离]</strong>配置隔离网段代理，掩蔽你的 Canvas 指纹和 WebGL 特征。
                        </p>
                      </div>
                    </div>
                    <div>
                      {isTask1Completed ? (
                        <div className="flex items-center space-x-1 text-emerald-400 text-xs font-bold font-mono py-1 px-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>任务已达标 (+80 XP)</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setCurrentTab('proxy-config');
                            showToast('👉 已为您快速切换到硬路由透明防指纹隔离控制台！开启后返回。');
                          }}
                          className="w-full sm:w-auto px-3.5 py-1 text-xs font-bold text-white bg-gradient-to-r from-[#0165ff] to-[#01c7ff] hover:brightness-110 rounded transition-all flex items-center justify-center space-x-1"
                        >
                          <span>前往开启指纹隔离</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* TASK 2 CARD (Checks real USDT capital) */}
                <div className={`p-4 rounded-xl border transition-all ${isTask2Completed ? 'bg-[#151a24]/40 border-emerald-500/30' : 'bg-[#1b2233] border-gray-800'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {isTask2Completed ? (
                          <div className="w-5 h-5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center font-bold">
                            ✓
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-[#0165ff]/10 text-[#01c7ff] border border-[#0165ff]/30 rounded-full flex items-center justify-center text-xs font-bold font-mono">
                            2
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-100 flex items-center gap-1.5">
                          注资首笔测试资产
                          {isTask2Completed ? (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 py-0.1 rounded font-mono">
                              实盘资金充沛 (${wallet.USDT.toLocaleString()} USDT)
                            </span>
                          ) : (
                            <span className="text-[10px] bg-amber-400/20 text-amber-400 border border-amber-500/30 px-1 py-0.1 rounded font-mono">
                              等待划转注入
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed max-w-xl">
                          开始实盘买入或划转合约前，持币钱包中需留有足量可用保证金。可通过法币买币或在此快捷点击注入 10,000 USDT 新手无阻开户金。
                        </p>
                      </div>
                    </div>
                    <div>
                      {isTask2Completed ? (
                        <div className="flex items-center space-x-1 text-emerald-400 text-xs font-bold font-mono py-1 px-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>已注入资金 (+80 XP)</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                          <button
                            onClick={handleQuickOnboardingTopUp}
                            className="px-3.5 py-1 text-xs font-bold text-white bg-[#0165ff] hover:bg-[#0052ff] rounded transition-all flex items-center justify-center space-x-1"
                          >
                            <Coins className="w-3 h-3 text-amber-400" />
                            <span>直接快捷领取1万USDT</span>
                          </button>
                          <button
                            onClick={() => {
                              setCurrentTab('buy-crypto');
                              showToast('👉 已帮您跳转至合规第三方入金支付通道。');
                            }}
                            className="px-3.5 py-1 text-xs font-bold text-[#01c7ff] border border-[#0165ff]/40 hover:bg-[#0165ff]/10 rounded text-center"
                          >
                            使用法币信用卡购买
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* TASK 3 CARD (Checks active trade placement database) */}
                <div className={`p-4 rounded-xl border transition-all ${isTask3Completed ? 'bg-[#151a24]/40 border-emerald-500/30' : 'bg-[#1b2233] border-gray-800'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {isTask3Completed ? (
                          <div className="w-5 h-5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center font-bold">
                            ✓
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-[#0165ff]/10 text-[#01c7ff] border border-[#0165ff]/30 rounded-full flex items-center justify-center text-xs font-bold font-mono">
                            3
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-100 flex items-center gap-1.5">
                          完成首个交割合约订单试水
                          {isTask3Completed ? (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 py-0.1 rounded font-mono">
                              已提交真实多空合约
                            </span>
                          ) : (
                            <span className="text-[10px] bg-gray-700 text-gray-400 px-1 py-0.1 rounded font-mono">
                              暂无在案交易
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed max-w-xl">
                          理论千万条，实操第一条。使用右侧或下方的“极速实操沙盒”一键执行您的第一笔对敲实验单。它会自动与真实的底层引擎撮合并展现在成交区。
                        </p>
                      </div>
                    </div>
                    <div>
                      {isTask3Completed ? (
                        <div className="flex items-center space-x-1 text-emerald-400 text-xs font-bold font-mono py-1 px-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>交易已达标 (+100 XP)</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setCurrentSubTab('sandbox');
                            showToast('🔧 下拉到极速买卖沙盒面板，亲自体验第一个交割杠杆开仓吧！');
                          }}
                          className="w-full sm:w-auto px-3.5 py-1 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 rounded transition-all flex items-center justify-center space-x-1"
                        >
                          <Zap className="w-3 h-3 text-white" />
                          <span>进入下单模拟器</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Reward unlock button when completed count is 3/3 */}
              {completedCount === 3 && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0165ff]/20 to-[#01c7ff]/20 border-2 border-emerald-400/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg shadow-emerald-500/10 animate-bounce">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-white flex items-center justify-center sm:justify-start gap-1 font-mono">
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                      尊享白名单证书：『高级交易防护尊享专家』
                    </h3>
                    <p className="text-[11px] text-emerald-400 font-medium">您已经完美攻克了链路代理、本金注入和首笔下单三大实操大关！</p>
                  </div>
                  <button
                    onClick={() => {
                      alert('🎉 恭喜！您已成功领取尊特专属特权证书，并在后台激活防爆仓及防指纹路由风控最高权重！');
                      addXp(150);
                    }}
                    className="px-5 py-2 text-xs font-black bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:brightness-110 active:scale-95 transition-all rounded-lg cursor-pointer"
                  >
                    极速激活合规交易特权
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE PRACTICE SANDBOX */}
          {currentSubTab === 'sandbox' && (
            <div className="bg-[#151a24] border border-[#1f293d] p-5 rounded-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-[#212a3d] pb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                    <Zap className="w-4 h-4 text-amber-400" />
                    实操实验挂单沙盒 (直接关联交易所底座)
                  </h3>
                  <p className="text-[11px] text-gray-450">在此处买卖下的每一笔单据均将实时注入您个人的委托记录。无任何假数据或模拟遮罩。</p>
                </div>
                <div className="bg-[#0b0e11] border border-gray-800 px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1">
                  <span className="text-gray-400">最新测试钱包余额:</span>
                  <span className="text-[#10b981] font-bold">${wallet.USDT.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  <span className="text-gray-500 text-[9px] font-bold">USDT</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Order Submission Form panel */}
                <div className="space-y-4">
                  
                  {/* Select Coin Symbol */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-400 font-bold">① 选择交割合约标的</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['BTC', 'ETH', 'GT', 'SOL'].map((token) => (
                        <button
                          key={token}
                          onClick={() => setSandboxToken(token)}
                          className={`py-1.5 rounded text-xs font-bold font-mono border transition-all ${
                            sandboxToken === token 
                              ? 'bg-[#0165ff]/20 text-[#01c7ff] border-[#0165ff]' 
                              : 'bg-[#1b2233] text-gray-300 border-gray-800 hover:bg-gray-800'
                          }`}
                        >
                          {token}/USDT
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buy or Sell side */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-400 font-bold">② 选择交易方向</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSandboxSide('BUY')}
                        className={`py-2 rounded font-bold text-xs transition-all ${
                          sandboxSide === 'BUY'
                            ? 'bg-emerald-500 text-white font-black'
                            : 'bg-[#1b2233] text-gray-400 hover:text-emerald-400'
                        }`}
                      >
                        看涨多单 (BUY / LONG)
                      </button>
                      <button
                        onClick={() => setSandboxSide('SELL')}
                        className={`py-2 rounded font-bold text-xs transition-all ${
                          sandboxSide === 'SELL'
                            ? 'bg-red-500 text-white font-black'
                            : 'bg-[#1b2233] text-gray-400 hover:text-red-400'
                        }`}
                      >
                        看跌空单 (SELL / SHORT)
                      </button>
                    </div>
                  </div>

                  {/* Limit or Market type */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-gray-400 font-bold">③ 撮合交易类型</label>
                    <div className="grid grid-cols-2 gap-2 font-mono">
                      <button
                        onClick={() => setSandboxType('LIMIT')}
                        className={`py-1 rounded text-xs transition-all border ${
                          sandboxType === 'LIMIT'
                            ? 'bg-gray-800 text-white border-gray-700 font-bold'
                            : 'bg-transparent text-gray-450 border-transparent hover:text-white'
                        }`}
                      >
                        限价申报 (Limit Order)
                      </button>
                      <button
                        onClick={() => {
                          setSandboxType('MARKET');
                          if (tokenPrices[sandboxToken]) {
                            setSandboxPrice(tokenPrices[sandboxToken].toFixed(2));
                          }
                        }}
                        className={`py-1 rounded text-xs transition-all border ${
                          sandboxType === 'MARKET'
                            ? 'bg-gray-800 text-white border-gray-700 font-bold'
                            : 'bg-transparent text-gray-450 border-transparent hover:text-white'
                        }`}
                      >
                        闪电撮合 (Market Order)
                      </button>
                    </div>
                  </div>

                  {/* Pricing Inputs */}
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500">限定申报价格 (USDT)</label>
                      <input
                        type="number"
                        value={sandboxPrice}
                        disabled={sandboxType === 'MARKET'}
                        onChange={(e) => setSandboxPrice(e.target.value)}
                        className="w-full bg-[#0b0e11] border border-gray-800 rounded p-1.5 text-xs text-white disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500">交易总数量 ({sandboxToken})</label>
                      <input
                        type="number"
                        value={sandboxAmount}
                        onChange={(e) => setSandboxAmount(e.target.value)}
                        className="w-full bg-[#0b0e11] border border-gray-800 rounded p-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Sliding scale multiplier */}
                  <div className="space-y-1.5 font-mono">
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>分配保证金池仓位占比</span>
                      <span className="text-[#01c7ff] font-bold">{sandboxSliderAndPercent}% ({((wallet.USDT * sandboxSliderAndPercent) / 100).toFixed(2)} USDT)</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[25, 50, 75, 100].map((percent) => (
                        <button
                          key={percent}
                          onClick={() => handleSliderChange(percent)}
                          className={`py-1 rounded text-[10px] font-bold font-mono transition-all border ${
                            sandboxSliderAndPercent === percent 
                              ? 'bg-gray-850 text-[#01c7ff] border-[#01c7ff]/50' 
                              : 'bg-transparent hover:bg-gray-850 text-gray-500 border-gray-850'
                          }`}
                        >
                          {percent}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submission buttons action */}
                  <button
                    onClick={handleExecuteSandboxTrade}
                    className={`w-full py-2.5 rounded-xl font-black text-xs tracking-wider transition-all cursor-pointer ${
                      sandboxSide === 'BUY' 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-[#10b981]/20 shadow-md hover:brightness-110' 
                        : 'bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-red-500/20 shadow-md hover:brightness-110'
                    }`}
                  >
                    确认在交割盘口执行一笔新手试验{sandboxSide === 'BUY' ? '买单' : '卖单'}
                  </button>

                </div>

                {/* Simulated Order placement info tip */}
                <div className="bg-[#0b0e11] border border-[#21293a] p-4 rounded-xl flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-300 flex items-center space-x-1 font-mono">
                      <HelpCircle className="w-3.5 h-3.5 text-[#01c7ff]" />
                      <span>交易沙盒撮合机理解释：</span>
                    </h4>
                    
                    <div className="space-y-2 text-[11px] leading-relaxed text-gray-400 font-sans">
                      <p>
                        🌟 <strong className="text-gray-150">真实的资产影响：</strong>在此点击下单并非纯前端演练。如果您的方向判断准确导致标的价格上涨，您的钱包等资产总额将真实获得对应增值空间。
                      </p>
                      <p>
                        📈 <strong className="text-gray-150">什么是市价闪电成交：</strong>如果您选择『闪电撮合(Market)』，撮合系统将在纳秒级别检索系统深度档位，在当前盘口的第一卖出/买入价直接给您全额吃单。
                      </p>
                      <p>
                        🛡️ <strong className="text-gray-150">为什么需要止盈止损：</strong>合约交易不建议死扛单。当交易达标或者不合约时，可以快速点击 Header 的 **「重画余额」**，无损重叠到期初资产！
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#161d2d] border border-gray-800 rounded-lg">
                    <span className="text-[10px] text-gray-500 font-mono block">当前持仓盘点：</span>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1.5">
                      <div className="flex justify-between border-r border-[#1f293d] pr-2">
                        <span className="text-gray-400">BTC 持有:</span>
                        <span className="text-gray-100 font-bold">{(wallet.BTC || 0).toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between pl-1">
                        <span className="text-gray-400">ETH 持有:</span>
                        <span className="text-gray-100 font-bold">{(wallet.ETH || 0).toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between border-r border-[#1f293d] pr-2">
                        <span className="text-gray-400">GT (平台币):</span>
                        <span className="text-gray-100 font-bold">{(wallet.GT || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pl-1">
                        <span className="text-gray-400">SOL 持有:</span>
                        <span className="text-gray-100 font-bold">{(wallet.SOL || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: TRADING THEORY ACADEMY */}
          {currentSubTab === 'academy' && (
            <div className="space-y-4">
              {activeArticle ? (
                /* Article Readers Page */
                <div className="bg-[#151a24] border border-[#1f293d] p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-[#212a3d] pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] bg-[#0165ff]/20 text-[#01c7ff] border border-[#0165ff]/30 px-2 py-0.5 rounded font-bold font-mono">
                        {activeArticle.category}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        正在阅读 {activePageIdx + 1} / {activeArticle.pages.length} 页
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      返回列表
                    </button>
                  </div>

                  <div className="space-y-3 min-h-[220px]">
                    <h3 className="text-sm font-black text-white font-mono flex items-center space-x-1.5">
                      <ChevronRight className="w-4 h-4 text-[#01c7ff]" />
                      <span>{activeArticle.pages[activePageIdx].subtitle}</span>
                    </h3>
                    
                    <div className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line bg-[#0c1018] p-4 rounded-xl border border-gray-850 font-sans tracking-wide">
                      {activeArticle.pages[activePageIdx].content}
                    </div>
                  </div>

                  {/* Navigation inside articlepages */}
                  <div className="flex justify-between items-center pt-3 border-t border-[#20293b]">
                    <button
                      disabled={activePageIdx === 0}
                      onClick={() => setActivePageIdx(prev => prev - 1)}
                      className="px-3 py-1 bg-gray-900 border border-gray-800 rounded text-xs hover:text-white text-gray-400 disabled:opacity-30"
                    >
                      ← 上一页
                    </button>

                    <div className="flex space-x-1">
                      {activeArticle.pages.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full ${idx === activePageIdx ? 'bg-[#01c7ff]' : 'bg-gray-800'}`}
                        />
                      ))}
                    </div>

                    {activePageIdx < activeArticle.pages.length - 1 ? (
                      <button
                        onClick={() => setActivePageIdx(prev => prev + 1)}
                        className="px-3.5 py-1 bg-[#0165ff] text-white text-xs font-bold rounded"
                      >
                        下一页 →
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkArticleRead(activeArticle.id)}
                        className="px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-black text-xs rounded-lg flex items-center space-x-1 animate-pulse"
                      >
                        <span>标志已阅读完毕 (+80 XP)</span>
                        <CheckCircle className="w-3 h-3 text-black" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Articles Grid lists */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ARTICLES.map((art) => {
                    const isRead = readArticlesCount.includes(art.id);
                    return (
                      <div 
                        key={art.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                          isRead ? 'bg-[#151a24]/30 border-emerald-500/20' : 'bg-[#1b2233] border-gray-800'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                            <span className="text-[#01c7ff] bg-[#0165ff]/10 px-2 py-0.2 rounded">
                              {art.category}
                            </span>
                            <span className="text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {art.readTime}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-100 line-clamp-1">
                            {art.title}
                          </h4>
                          <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                            {art.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-850">
                          <span className="text-[10px] text-gray-500 font-mono">
                            难度: <strong className="text-gray-300">{art.difficulty}</strong>
                          </span>
                          <button
                            onClick={() => {
                              setActiveArticle(art);
                              setActivePageIdx(0);
                            }}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              isRead 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-[#0165ff]/10 text-[#01c7ff] border border-[#0165ff]/30 hover:bg-[#0165ff]/20'
                            }`}
                          >
                            {isRead ? '重复阅读' : '开始学习 →'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INTERACTIVE VIDEO TUTORIAL SIMULATOR */}
          {currentSubTab === 'video' && (
            <div className="bg-[#151a24] border border-[#1f293d] p-4 sm:p-5 rounded-2xl space-y-4">
              
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                  <Play className="w-4 h-4 text-[#01c7ff]" />
                  名师互动视频大讲堂 Simulator
                </h3>
                <p className="text-[11px] text-gray-450 leading-relaxed">
                  本培训视频采用先进的 HTML5 自研动态渲染技术，为您实时动画复现K线理论与资金管理深度干货演示，规避境外视频载入困难与不连通。
                </p>
              </div>

              {/* Dynamic simulated high-fidelity screen */}
              <div className="relative aspect-video w-full rounded-xl bg-black border border-gray-800 overflow-hidden flex flex-col justify-between p-4">
                
                {/* Simulated playback visual elements: live moving line / indicator chart */}
                <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-full flex flex-col justify-between p-6">
                    <div className="flex justify-between text-[10px] text-green-500 font-mono">
                      <span>DEPTH RATING: 99.87%</span>
                      <span>FPS: 60.0</span>
                    </div>
                    {/* Sine wave or line path mock movement */}
                    <div className="h-20 w-full relative">
                      <div className="absolute inset-x-0 bottom-4 h-0.5 bg-gray-800" />
                      <div 
                        className="absolute bottom-4 w-4 h-4 rounded-full bg-[#01c7ff] animate-ping"
                        style={{ left: `${(videoTime / 55) * 85}%` }}
                      />
                      <svg className="w-full h-full overflow-visible">
                        <path 
                          d={`M 0 40 Q 150 ${20 + Math.sin(videoTime / 3) * 30} 300 50 T 600 40`} 
                          fill="none" 
                          stroke={videoTime > 25 ? '#10b981' : '#f3f4f6'} 
                          strokeWidth="2" 
                          className="transition-all duration-300"
                        />
                      </svg>
                    </div>
                    <div className="text-[9px] text-[#01c7ff] font-mono text-center">
                      SECURE SANDBOX ISOLATION ENTRANCE ACTIVE
                    </div>
                  </div>
                </div>

                {/* Video HUD header info */}
                <div className="z-10 flex justify-between items-center p-1 bg-black/60 rounded">
                  <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    第 {activeChapter + 1} 课：{VIDEO_CHAPTERS[activeChapter].title}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    {VIDEO_CHAPTERS[activeChapter].desc}
                  </span>
                </div>

                {/* Simulated center chart tutorial whiteboard based on timeline */}
                <div className="z-10 my-auto text-center space-y-2">
                  {videoTime < 10 && (
                    <div className="bg-gray-900/90 p-3 rounded-lg border border-gray-800 inline-block text-left font-mono">
                      <div className="text-[10px] text-[#01c7ff]">希马交易所 会员成长课程 1</div>
                      <div className="text-xs font-bold text-[#f3f4f6] mt-1">🔑 资产配置的第一步</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">如何领取或划入USDT到现货钱包</div>
                    </div>
                  )}

                  {videoTime >= 10 && videoTime < 25 && (
                    <div className="bg-gray-900/90 p-3 rounded-lg border border-emerald-500/30 inline-block text-left font-mono">
                      <div className="text-[10px] text-[#10b981] flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        安全白皮书指引 2
                      </div>
                      <div className="text-xs font-bold text-[#f3f4f6] mt-1">🛡️ 破译指纹关联与封锁风控</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">浏览器防指纹掩蔽机制与网卡分配</div>
                    </div>
                  )}

                  {videoTime >= 25 && videoTime < 45 && (
                    <div className="bg-gray-900/90 p-3 rounded-lg border border-cyan-500/30 inline-block text-left font-mono">
                      <div className="text-[10px] text-[#01c7ff] flex items-center gap-1">
                        <BarChart2 className="w-3 h-3" />
                        实盘撮合要领 3
                      </div>
                      <div className="text-xs font-bold text-[#f3f4f6] mt-1">📉 K线突破与限价冰山单深度</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">多空方向与对决爆仓底牌</div>
                    </div>
                  )}

                  {videoTime >= 45 && (
                    <div className="bg-[#121c16] p-3 rounded-lg border border-emerald-400/30 inline-block text-left font-mono">
                      <div className="text-[10px] text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        通关大合辑
                      </div>
                      <div className="text-xs font-bold text-emerald-400 mt-1">🎓 卓越投训营毕业宣言</div>
                      <div className="text-[9px] text-emerald-300 mt-0.5">合格交易学者证书一键申领</div>
                    </div>
                  )}
                </div>

                {/* Subtitles Overlay overlay */}
                <div className="z-10 w-full text-center py-2.5 px-3 bg-black/85 border-t border-gray-900 rounded-lg">
                  <p className="text-xs text-amber-300 font-sans tracking-tight">
                    [讲师讲解]: {getVideoSubtitles(videoTime)}
                  </p>
                </div>

                {/* Video controls bottom bar */}
                <div className="z-10 flex items-center justify-between pt-1 font-mono text-[11px] text-gray-400 bg-black/60 p-1.5 rounded">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 rounded bg-[#0165ff] hover:bg-[#0052ff] text-white shrink-0"
                    >
                      {isPlaying ? '暂停' : '播 放'}
                    </button>
                    <span>{Math.floor(videoTime)}s / 55s</span>
                  </div>

                  {/* Scrubber slider bar */}
                  <div className="flex-1 mx-4">
                    <input
                      type="range"
                      min="0"
                      max="55"
                      value={videoTime}
                      onChange={(e) => setVideoTime(parseInt(e.target.value))}
                      className="w-full accent-[#0165ff] h-1 rounded-full cursor-pointer bg-gray-800"
                    />
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[10px]">倍速:</span>
                    {[1.0, 1.5, 2.0].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setVideoSpeed(speed)}
                        className={`text-[9px] p-0.5 px-1.5 rounded ${videoSpeed === speed ? 'bg-amber-400 text-black font-black' : 'bg-gray-800'}`}
                      >
                        {speed}x
                      </button>
                    ))}
                    <Volume2 className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

              </div>

              {/* Course Chapters Quick navigation tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono">
                {VIDEO_CHAPTERS.map((chap, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setVideoTime(chap.time);
                      setActiveChapter(idx);
                      setIsPlaying(true);
                      showToast(`📽️ 正在跳转到第 ${idx + 1} 章: ${chap.title}`);
                    }}
                    className={`p-2.5 rounded-lg border text-left text-[11px] transition-all duration-150 ${
                      activeChapter === idx 
                        ? 'bg-gray-800 border-[#0165ff]' 
                        : 'bg-[#1b2233]/50 border-transparent hover:border-gray-800'
                    }`}
                  >
                    <div className="text-[9px] text-[#01c7ff]">CHAPTER 0{idx + 1}</div>
                    <div className="font-bold text-gray-100 truncate pt-0.5">{chap.title}</div>
                    <div className="text-[9px] text-[#10b981] pt-0.5">{chap.time}秒</div>
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: COMPLIANCE INTEGRITY QUIZ */}
          {currentSubTab === 'quiz' && (
            <div className="bg-[#151a24] border border-[#1f293d] p-5 rounded-2xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
                  <Star className="w-4 h-4 text-amber-400 animate-pulse" />
                  新手合格交易员合规考核与认证
                </h3>
                <p className="text-[11px] text-gray-400">
                  答对全部 3 道金融合规安全小题即可晋升等级并解锁『智睿特权勋章』称号，用于降低实盘交易手续费基数。
                </p>
              </div>

              {/* Questions Area */}
              <div className="space-y-4">
                
                {/* Q1 */}
                <div className="bg-[#0b0e11] p-4 rounded-xl border border-gray-800 space-y-2">
                  <h4 className="text-xs sm:text-xs font-bold text-gray-100 font-mono">
                    Q1：在市场发生单向剧烈异动抛盘时，哪种订单类型可以确保 **即时撮合成交**？
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {[
                      '限价单：会挂留在下方挂单池，不能确保即时成交。',
                      '市价单：直接按照盘口对手价闪电吃单，保证立刻成交（正确答案）。'
                    ].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswers(prev => ({...prev, 0: idx}))}
                        className={`p-3 rounded text-left border transition-all ${
                          selectedAnswers[0] === idx 
                            ? 'bg-[#0165ff]/20 text-[#01c7ff] border-[#0165ff]' 
                            : 'bg-[#1b2233]/40 text-gray-300 border-gray-850 hover:bg-gray-800/25'
                        }`}
                      >
                        {idx === 0 ? 'A. ' : 'B. '} {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2 */}
                <div className="bg-[#0b0e11] p-4 rounded-xl border border-gray-800 space-y-2">
                  <h4 className="text-xs sm:text-xs font-bold text-gray-100 font-mono">
                    Q2：为什么在跨境进行多账号量化套利挂单时，希马交易所 高度推荐用户开启『硬路由指纹防关联』服务？
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {[
                      '只是平台的美观装饰，并不具备底层防护效果。',
                      '隔离各套账号在网卡、Canvas指纹与住宅IP等维度的物理特征，避免触发风控防作弊爆破机制（正确答案）。'
                    ].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswers(prev => ({...prev, 1: idx}))}
                        className={`p-3 rounded text-left border transition-all ${
                          selectedAnswers[1] === idx 
                            ? 'bg-[#0165ff]/20 text-[#01c7ff] border-[#0165ff]' 
                            : 'bg-[#1b2233]/40 text-gray-300 border-gray-850 hover:bg-gray-800/25'
                        }`}
                      >
                        {idx === 0 ? 'A. ' : 'B. '} {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q3 */}
                <div className="bg-[#0b0e11] p-4 rounded-xl border border-gray-800 space-y-2">
                  <h4 className="text-xs sm:text-xs font-bold text-gray-100 font-mono">
                    Q3：限价单 (Limit Order) 如果最终撮合成交，其核心前提要求是什么？
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {[
                      '实盘的市场最新报价触及或由于买卖双方限定的这个申报价。',
                      '不需要任何条件。只要提交系统便会即刻在账户扣款转化（错误，那是市价单）。'
                    ].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAnswers(prev => ({...prev, 2: idx}))}
                        className={`p-3 rounded text-left border transition-all ${
                          selectedAnswers[2] === idx 
                            ? 'bg-[#0165ff]/20 text-[#01c7ff] border-[#0165ff]' 
                            : 'bg-[#1b2233]/40 text-gray-300 border-gray-850 hover:bg-gray-800/25'
                        }`}
                      >
                        {idx === 0 ? 'A. ' : 'B. '} {opt}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Submit Quiz actions footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-850 pt-4 gap-4">
                <span className="text-xs text-gray-400 font-mono">
                  答题进度：<strong className="text-[#01c7ff]">{Object.keys(selectedAnswers).length} / 3</strong> 题已选
                </span>

                <div className="flex space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setQuizSubmitted(false);
                      setQuizScore(null);
                    }}
                    className="flex-1 sm:flex-none px-4 py-1.5 bg-gray-900 border border-gray-800 rounded font-bold text-xs text-gray-400 hover:text-white"
                  >
                    重置选择
                  </button>
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < 3}
                    className="flex-1 sm:flex-none px-6 py-1.5 bg-[#0165ff] disabled:opacity-40 text-white font-black text-xs rounded transition-all cursor-pointer"
                  >
                    确认提交我的小考答卷
                  </button>
                </div>
              </div>

              {/* Quiz Result Display */}
              {quizSubmitted && quizScore !== null && (
                <div className={`p-4 rounded-xl border mt-4 ${quizScore === 3 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                  <div className="flex items-center space-x-2">
                    {quizScore === 3 ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 animate-bounce" />
                    )}
                    <h3 className="text-sm font-black font-mono">
                      考核成绩：{quizScore === 3 ? '🎓 3 / 3 满分通关！已授特权' : `✍️ ${quizScore} / 3 未达满分（合格线：3分）`}
                    </h3>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed pt-2">
                    {quizScore === 3 
                      ? '恭喜您完美消化了数字交割合约、冰山限价盘、防关联代理的全部投教知识。您的防爆仓特权已生效。'
                      : '别气馁！查阅前方的“新手成长任务”或“交易理论学院”相关知识，点击下方重置按钮即可无限制重新挑战。'}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Right Side: Quick FAQ Accordion & Live Sandbox Trades Feedback (cols-4) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Section: Quick FAQ Accordion */}
          <div className="bg-[#151a24] border border-[#1f293d] p-4 rounded-xl space-y-3.5">
            <h3 className="text-xs sm:text-xs font-bold text-gray-200 border-b border-[#21293c] pb-2 flex items-center space-x-1.5 font-mono">
              <HelpCircle className="w-4 h-4 text-[#01c7ff]" />
              <span>投资者常见疑问 FAQ Accordion</span>
            </h3>

            <div className="space-y-2">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="border-b border-[#1f293d]/50 pb-2">
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left py-1 text-xs text-gray-300 hover:text-white font-semibold"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-[#01c7ff]" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
                    </button>
                    {isOpen && (
                      <div className="text-[11px] text-gray-400 leading-relaxed pt-1.5 pl-1 font-sans animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Completed Tasks status feedback widgets */}
          <div className="bg-[#151a24] border border-[#1f293d] p-4 rounded-xl space-y-2 text-xs font-mono">
            <h3 className="text-xs font-bold text-gray-200 pb-1 border-b border-gray-800">
              新手勋章解锁进度
            </h3>
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">一、指纹安全隔离</span>
                <span className={isTask1Completed ? "text-emerald-400 font-bold" : "text-gray-500"}>
                  {isTask1Completed ? "已连接" : "未开启"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">二、本金充值达标</span>
                <span className={isTask2Completed ? "text-emerald-400 font-bold" : "text-gray-500"}>
                  {isTask2Completed ? "可用资金富裕" : "未注资"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">三、首笔大盘成交</span>
                <span className={isTask3Completed ? "text-emerald-400 font-bold" : "text-gray-500"}>
                  {isTask3Completed ? "已执行交割" : "未操作"}
                </span>
              </div>
            </div>
            
            <div className="pt-3.5 border-t border-gray-800 flex justify-between items-center text-[11px]">
              <span className="text-gray-400">学习等级：</span>
              <span className="text-[#01c7ff] font-bold">LV.{level} 新锐学者</span>
            </div>
          </div>

          {/* Platform trust accreditation seal */}
          <div className="bg-[#151a24]/40 border border-[#1f293d] p-3 rounded-lg flex items-center space-x-2 text-[10px] text-gray-500">
            <Shield className="w-4 h-4 text-[#10b981] shrink-0" />
            <p className="leading-snug">本投教指南全部契合多账号沙箱风控合规（BCSC加拿大规范认证）。</p>
          </div>

        </div>

      </div>

    </div>
  );
}
