export type AssetCategory = 
  | 'Indices'
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures & commodities'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';

export interface MarketItem {
  symbol: string;
  name: string;
  exchange?: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline?: number[];
  category: string;
  volume?: string;
  marketCap?: string;
  badgeNumber?: string;
  badgeColor?: string;
  high52?: number;
  low52?: number;
  dayHigh?: number;
  dayLow?: number;
  peRatio?: number;
  rating?: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
}

export interface EconomicIndicator {
  name: string;
  value: string;
  note: string;
  trend: 'up' | 'down' | 'neutral';
  country: string;
}

export interface EconomicEvent {
  title: string;
  forecast: string;
  previous: string;
  time: string;
  impact: 'high' | 'medium' | 'low';
  country: string;
}

export interface DefiProtocol {
  name: string;
  ticker: string;
  category: string;
  change7d: number;
  tvl: string;
}

export interface YieldCurvePoint {
  maturity: string;
  code: string;
  yield: number;
  change: number;
  years: number;
}
