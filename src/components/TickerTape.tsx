import React from 'react';
import { MarketItem } from '../types';

interface TickerTapeProps {
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  flashingSymbols: Record<string, 'up' | 'down'>;
}

export const TickerTape: React.FC<TickerTapeProps> = ({
  items,
  onSelectItem,
  flashingSymbols,
}) => {
  return (
    <div className="w-full bg-white border-b border-[#f0f3fa] overflow-x-auto shadow-xs py-2 px-4 flex items-center gap-6 whitespace-nowrap scrollbar-none">
      {/* Live beacon status */}
      <div className="flex items-center gap-2 flex-shrink-0 pr-2 border-r border-[#f0f3fa]">
        <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#b2b5be]">
          Live Global Feeds
        </span>
      </div>

      {/* Ticker items */}
      <div className="flex items-center gap-6 text-[12px]">
        {items.map((item) => {
          const isUp = item.changePercent >= 0;
          const flash = flashingSymbols[item.symbol];

          return (
            <button
              key={item.symbol}
              onClick={() => onSelectItem(item)}
              type="button"
              className={`flex items-center gap-2 cursor-pointer px-2 py-0.5 rounded transition-all hover:bg-[#f8f9fd] focus:outline-none ${
                flash === 'up'
                  ? 'animate-flash-up'
                  : flash === 'down'
                  ? 'animate-flash-down'
                  : ''
              }`}
            >
              <span className="text-[#131722] font-semibold">{item.symbol}</span>
              <span className="text-[#131722] font-data-mono">
                {item.price > 1000
                  ? item.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : item.price < 2
                  ? item.price.toFixed(4)
                  : item.price.toFixed(2)}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold font-data-mono ${
                  isUp
                    ? 'text-[#089981] bg-[#e8f8f5]'
                    : 'text-[#f23645] bg-[#feecee]'
                }`}
              >
                {isUp ? '+' : ''}
                {item.changePercent.toFixed(2)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
