import React, { useState } from 'react';
import { MarketItem } from '../types';

interface StocksSectionProps {
  megaCaps: MarketItem[];
  volumeStocks: MarketItem[];
  communityTrends: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  onOpenEarnings: () => void;
}

type StockFilter = 'Highest volume' | 'Most volatile' | 'Gainers' | 'Losers';

export const StocksSection: React.FC<StocksSectionProps> = ({
  megaCaps,
  volumeStocks,
  communityTrends,
  onSelectItem,
  onOpenEarnings,
}) => {
  const [activeFilter, setActiveFilter] = useState<StockFilter>('Highest volume');

  // Dynamically sort or filter stocks based on filter selection
  const displayedStocks = [...volumeStocks].sort((a, b) => {
    if (activeFilter === 'Gainers') {
      return b.changePercent - a.changePercent;
    }
    if (activeFilter === 'Losers') {
      return a.changePercent - b.changePercent;
    }
    if (activeFilter === 'Most volatile') {
      return Math.abs(b.changePercent) - Math.abs(a.changePercent);
    }
    // Highest volume by default
    return (parseFloat(b.volume || '0') || 0) - (parseFloat(a.volume || '0') || 0);
  });

  return (
    <section id="section-stocks" className="flex flex-col gap-4">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => onSelectItem(megaCaps[0])}
          type="button"
          className="group flex items-center gap-1.5 text-2xl font-bold text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer"
        >
          <span>US stocks</span>
          <span className="material-symbols-outlined text-[24px] text-[#6a6d78] group-hover:text-[#2962ff] group-hover:translate-x-0.5 transition-all">
            chevron_right
          </span>
        </button>

        <div className="flex items-center gap-1 bg-white p-1 rounded-full shadow-xs border border-[#f0f3fa] text-xs">
          {(['Highest volume', 'Most volatile', 'Gainers', 'Losers'] as StockFilter[]).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
                className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#2962ff] text-white shadow-xs'
                    : 'text-[#6a6d78] hover:text-[#131722] hover:bg-[#f8f9fd]'
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* Mega-Caps Quick Spotlight Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {megaCaps.map((stock) => {
          const isUp = stock.changePercent >= 0;
          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectItem(stock)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectItem(stock)}
              className="bg-white p-3 rounded-xl border border-[#f0f3fa] shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-[#2962ff]/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#131722]">
                  {stock.symbol}
                </span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded font-semibold font-data-mono ${
                    isUp
                      ? 'text-[#089981] bg-[#e8f8f5]'
                      : 'text-[#f23645] bg-[#feecee]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {stock.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="text-[11px] text-[#6a6d78] truncate mt-0.5">{stock.name}</div>
              <div className="text-lg font-semibold font-data-mono text-[#131722] mt-2">
                ${stock.price.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Stocks Table & Community Trends Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Stock Data Table (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa]">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-lg font-semibold text-[#131722]">
              {activeFilter === 'Highest volume'
                ? 'Highest volume stocks'
                : activeFilter === 'Gainers'
                ? 'Top Market Gainers'
                : activeFilter === 'Losers'
                ? 'Top Market Losers'
                : 'Most Volatile Stocks'}
            </h3>
            <button
              onClick={() => onSelectItem(displayedStocks[0])}
              type="button"
              className="text-sm font-semibold text-[#2962ff] hover:underline cursor-pointer"
            >
              See all most actively traded
            </button>
          </div>

          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-[#6a6d78] bg-[#f8f9fd]">
                  <th className="py-2.5 px-3 rounded-l-lg">Symbol & Name</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                  <th className="py-2.5 px-3 text-right">Change $</th>
                  <th className="py-2.5 px-3 text-right">Change %</th>
                  <th className="py-2.5 px-3 text-right">Volume</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3fa] text-sm">
                {displayedStocks.map((stock) => {
                  const isUp = stock.changePercent >= 0;
                  return (
                    <tr
                      key={stock.symbol}
                      onClick={() => onSelectItem(stock)}
                      className="hover:bg-[#f8f9fd] transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#f1f4fb] flex items-center justify-center text-[10px] text-[#131722] font-bold shadow-xs">
                            {stock.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#131722] group-hover:text-[#2962ff]">
                              {stock.name}
                            </div>
                            <div className="text-[11px] text-[#b2b5be]">
                              {stock.exchange || `NASDAQ:${stock.symbol}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-data-mono text-[#131722]">
                        ${stock.price.toFixed(2)}
                      </td>
                      <td
                        className={`py-3 px-3 text-right font-data-mono font-medium ${
                          isUp ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}${Math.abs(stock.change).toFixed(2)}
                      </td>
                      <td
                        className={`py-3 px-3 text-right font-data-mono font-semibold ${
                          isUp ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </td>
                      <td className="py-3 px-3 text-right font-data-mono text-[#6a6d78]">
                        {stock.volume || '25.4M'}
                      </td>
                      <td className="py-3 px-3 text-right font-data-mono text-[#131722]">
                        {stock.marketCap || '150B'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Community Trends Sidebar Card (1 Col) */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-lg font-semibold text-[#131722]">Community trends</h3>
              <span className="material-symbols-outlined text-[#b2b5be] text-[18px]">
                trending_up
              </span>
            </div>

            <div className="space-y-3">
              {communityTrends.map((trend) => {
                const isUp = trend.changePercent >= 0;
                return (
                  <div
                    key={trend.symbol}
                    onClick={() => onSelectItem(trend)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelectItem(trend)}
                    className="flex items-center justify-between py-1.5 hover:bg-[#f8f9fd] rounded-lg px-2 transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#131722] group-hover:text-[#2962ff]">
                        {trend.symbol}
                      </div>
                      <div className="text-[11px] text-[#6a6d78]">{trend.name}</div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold font-data-mono ${
                        isUp
                          ? 'text-[#089981] bg-[#e8f8f5]'
                          : 'text-[#f23645] bg-[#feecee]'
                      }`}
                    >
                      {isUp ? '+' : ''}
                      {trend.changePercent.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earnings Teaser Box */}
          <div className="mt-4 pt-3 bg-[#f8f9fd] rounded-xl p-3.5 border border-[#f0f3fa]">
            <div className="text-[11px] font-semibold text-[#6a6d78] uppercase tracking-wider">
              Earnings Today
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-semibold text-sm text-[#131722]">
                TAYD Taylor Devices
              </span>
              <span className="text-xs text-[#b2b5be]">Est: 0.92 USD</span>
            </div>
            <button
              onClick={onOpenEarnings}
              type="button"
              className="mt-2 inline-block text-xs font-semibold text-[#2962ff] hover:underline cursor-pointer"
            >
              Explore full earnings calendar →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
