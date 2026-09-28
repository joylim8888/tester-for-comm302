import React from 'react';
import { MarketItem } from '../types';

interface IndicesSectionProps {
  usIndices: MarketItem[];
  worldIndices: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  flashingSymbols: Record<string, 'up' | 'down'>;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  usIndices,
  worldIndices,
  onSelectItem,
  flashingSymbols,
}) => {
  return (
    <section id="section-indices" className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectItem(usIndices[0])}
          type="button"
          className="group flex items-center gap-1.5 text-2xl font-bold text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer"
        >
          <span>Indices</span>
          <span className="material-symbols-outlined text-[24px] text-[#6a6d78] group-hover:text-[#2962ff] group-hover:translate-x-0.5 transition-all">
            chevron_right
          </span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#b2b5be]">
            US Markets open until 4:00 PM EST
          </span>
        </div>
      </div>

      {/* 6 Key Index Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {usIndices.map((item) => {
          const isUp = item.changePercent >= 0;
          const flash = flashingSymbols[item.symbol];

          return (
            <div
              key={item.symbol}
              onClick={() => onSelectItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectItem(item)}
              className={`bg-white p-3 rounded-xl border border-[#f0f3fa] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between hover:border-[#2962ff]/30 ${
                flash === 'up'
                  ? 'animate-flash-up'
                  : flash === 'down'
                  ? 'animate-flash-down'
                  : ''
              }`}
            >
              {/* Badge & Ticker */}
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: item.badgeColor || '#0049db' }}
                  className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 shadow-xs"
                >
                  {item.badgeNumber || item.symbol.slice(0, 2)}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#131722] truncate">
                    {item.symbol}
                  </h3>
                  <span className="text-[11px] text-[#6a6d78]">{item.exchange}</span>
                </div>
              </div>

              {/* Price & Change */}
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-lg font-semibold font-data-mono text-[#131722]">
                  {item.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold font-data-mono ${
                    isUp
                      ? 'text-[#089981] bg-[#e8f8f5]'
                      : 'text-[#f23645] bg-[#feecee]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>

              {/* Sparkline curve */}
              <div className="mt-2 h-7 w-full">
                <svg
                  className={`w-full h-full stroke-current fill-none ${
                    isUp ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                  preserveAspectRatio="none"
                  viewBox="0 0 100 24"
                >
                  {isUp ? (
                    <path
                      d="M0,18 L15,19 L30,12 L45,15 L60,8 L75,10 L90,3 L100,5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  ) : (
                    <path
                      d="M0,6 L20,8 L40,4 L60,14 L80,11 L100,20"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  )}
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* World Indices Snapshot Table */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa] mt-1">
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-lg font-semibold text-[#131722]">World indices</h3>
          <button
            onClick={() => onSelectItem(worldIndices[0])}
            type="button"
            className="text-sm font-semibold text-[#2962ff] hover:underline cursor-pointer"
          >
            See all major indices
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-[#6a6d78] bg-[#f8f9fd]">
                <th className="py-2.5 px-3 rounded-l-lg">Symbol</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3 text-right">Last Price</th>
                <th className="py-2.5 px-3 text-right">Chg %</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">1D Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3fa] text-sm">
              {worldIndices.map((item) => {
                const isUp = item.changePercent >= 0;
                return (
                  <tr
                    key={item.symbol}
                    onClick={() => onSelectItem(item)}
                    className="hover:bg-[#f8f9fd] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3 font-semibold text-[#131722] group-hover:text-[#2962ff]">
                      {item.symbol}
                    </td>
                    <td className="py-3 px-3 text-[#6a6d78]">{item.name}</td>
                    <td className="py-3 px-3 text-right font-data-mono text-[#131722]">
                      {item.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={`py-3 px-3 text-right font-data-mono font-semibold ${
                        isUp ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isUp ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </td>
                    <td className="py-3 px-3 text-right w-28">
                      <svg
                        className={`w-20 h-5 inline-block stroke-current fill-none ${
                          isUp ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                        viewBox="0 0 80 20"
                      >
                        {isUp ? (
                          <path d="M0,16 L25,12 L50,14 L80,5" strokeWidth="1.5"></path>
                        ) : (
                          <path d="M0,4 L20,6 L40,12 L60,9 L80,18" strokeWidth="1.5"></path>
                        )}
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
