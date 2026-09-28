import React from 'react';
import { MarketItem } from '../types';

interface EtfSectionProps {
  etfs: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
}

export const EtfSection: React.FC<EtfSectionProps> = ({ etfs, onSelectItem }) => {
  return (
    <section id="section-etfs" className="flex flex-col gap-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectItem(etfs[0])}
          type="button"
          className="group flex items-center gap-1.5 text-2xl font-bold text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer"
        >
          <span>ETFs</span>
          <span className="material-symbols-outlined text-[24px] text-[#6a6d78] group-hover:text-[#2962ff] group-hover:translate-x-0.5 transition-all">
            chevron_right
          </span>
        </button>
        <button
          onClick={() => onSelectItem(etfs[0])}
          type="button"
          className="text-sm font-semibold text-[#2962ff] hover:underline cursor-pointer"
        >
          See all most traded funds
        </button>
      </div>

      {/* ETF Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {etfs.map((etf) => {
          const isUp = etf.changePercent >= 0;
          return (
            <div
              key={etf.symbol}
              onClick={() => onSelectItem(etf)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectItem(etf)}
              className="bg-white p-3 rounded-xl border border-[#f0f3fa] shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-[#2962ff]/30"
            >
              <div className="font-semibold text-sm text-[#131722]">{etf.symbol}</div>
              <div className="text-[11px] text-[#6a6d78] truncate mt-0.5">{etf.name}</div>
              <div className="font-data-mono text-[#131722] font-semibold text-lg mt-1">
                ${etf.price.toFixed(2)}
              </div>
              <div
                className={`text-xs font-data-mono font-semibold mt-0.5 ${
                  isUp ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {isUp ? '+' : ''}
                {etf.changePercent.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
