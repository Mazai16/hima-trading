/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TradingPair {
  symbol: string;
  baseToken: string;
  quoteToken: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  changePercent24h: number;
}

export interface OrderBookItem {
  price: number;
  amount: number;
  total: number;
  percentage: number;
}

export interface HistoricalCandle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradeItem {
  id: string;
  price: number;
  amount: number;
  time: string;
  side: 'BUY' | 'SELL';
}

export interface UserWallet {
  USDT: number;
  ETH: number;
  BTC: number;
  SOL: number;
  BNB: number;
  [key: string]: number; // Allow dynamic tokens from Launchpad
}

export type OrderType = 'LIMIT' | 'MARKET';
export type OrderSide = 'BUY' | 'SELL';
export type OrderStatus = 'PENDING' | 'FILLED' | 'CANCELLED';

export interface Order {
  id: string;
  pair: string;
  side: OrderSide;
  type: OrderType;
  price: number;
  amount: number;
  total: number;
  time: string;
  status: OrderStatus;
}

export interface LaunchpadProject {
  id: string;
  name: string;
  ticker: string;
  description: string;
  logo: string;
  totalRaise: number;
  price: number; // in USDT
  tokenQty: number;
  status: 'UPCOMING' | 'ACTIVE' | 'FINISHED';
  progressPercent: number;
  startTime: string;
  endTime: string;
  participants: number;
  raisedUSDT: number;
  userCommitment?: number; // How much USDT user locked in this subscription
}

export interface ListingApplication {
  id: string;
  projectName: string;
  tokenTicker: string;
  contactEmail: string;
  telegram: string;
  website: string;
  whitepaper: string;
  targetChain: string;
  budgetUsd: string;
  pitch: string;
  submissionTime: string;
  status: 'UNDER_REVIEW' | 'APPROVED' | 'COMPLETED';
}

export interface ProxyConfig {
  id: string;
  nodeName: string;
  ipAddress: string;
  port: number;
  country: string;
  encryptionType: string;
  status: 'CONNECTED' | 'DISCONNECTED';
  isRouteIsolationEnabled: boolean;
}

export interface LockHoldingItem {
  id: string;
  poolName: string;
  token: string;
  apr: number; // e.g. 15 for 15%
  lockDays: number;
  minHold: number;
  maxHold: number;
  totalLocked: number;
  userLocked: number;
  status: 'ONGOING' | 'COMPLETED';
}
