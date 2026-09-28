import React from 'react';
import { MarketItem, YieldCurvePoint } from '../types';

interface MacroSectionProps {
  commodities: MarketItem[];
  forex: MarketItem[];
  yields: YieldCurvePoint[];
  onSelectItem: (item: MarketItem) => void;
  onOpenYieldCurve: () => void;
}

export const MacroSection: React.FC<MacroSectionProps> = ({
  commodities,
  forex,
  yields,
  onSelectItem,
  onOpenYieldCurve,
}) => {
  return (
    <section id="section-macro" className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#131722]">Macro &amp; Commodities</h2>
        <span className="text-xs font-medium text-[#b2b5be]">24-hour interbank updates</span>
      </div>

      {/* 3-Column Desktop Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: Futures & Commodities */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <button
                onClick={() => onSelectItem(commodities[0])}
                type="button"
                className="group flex items-center gap-1 text-lg font-semibold text-[#131722] hover:text-[#2962ff] cursor-pointer"
              >
                <span>Commodities</span>
                <span className="material-symbols-outlined text-[20px] text-[#6a6d78] group-hover:text-[#2962ff]">
                  chevron_right
                </span>
              </button>
              <span className="text-xs text-[#b2b5be]">COMEX / NYMEX</span>
            </div>

            <div className="divide-y divide-[#f0f3fa]">
              {commodities.map((item) => {
                const isUp = item.changePercent >= 0;
                return (
                  <div
                    key={item.symbol}
                    onClick={() => onSelectItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelectItem(item)}
                    className="py-2.5 flex items-center justify-between hover:bg-[#f8f9fd] px-1.5 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#131722] group-hover:text-[#2962ff]">
                        {item.symbol}
                      </div>
                      <div className="text-[11px] text-[#6a6d78]">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-data-mono text-[#131722] font-semibold text-sm">
                        ${item.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-xs font-data-mono font-medium ${
                          isUp ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => onSelectItem(commodities[0])}
            type="button"
            className="mt-4 text-xs font-semibold text-[#2962ff] hover:underline text-left cursor-pointer"
          >
            See all energy &amp; metal futures →
          </button>
        </div>

        {/* Column 2: Forex & Currencies */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <button
                onClick={() => onSelectItem(forex[0])}
                type="button"
                className="group flex items-center gap-1 text-lg font-semibold text-[#131722] hover:text-[#2962ff] cursor-pointer"
              >
                <span>Forex &amp; Currencies</span>
                <span className="material-symbols-outlined text-[20px] text-[#6a6d78] group-hover:text-[#2962ff]">
                  chevron_right
                </span>
              </button>
              <span className="text-xs text-[#b2b5be]">FX_IDC</span>
            </div>

            <div className="divide-y divide-[#f0f3fa]">
              {forex.map((item) => {
                const isUp = item.changePercent >= 0;
                return (
                  <div
                    key={item.symbol}
                    onClick={() => onSelectItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelectItem(item)}
                    className="py-2.5 flex items-center justify-between hover:bg-[#f8f9fd] px-1.5 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#131722] group-hover:text-[#2962ff]">
                        {item.symbol}
                      </div>
                      <div className="text-[11px] text-[#6a6d78]">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-data-mono text-[#131722] font-semibold text-sm">
                        {item.price > 50 ? item.price.toFixed(2) : item.price.toFixed(4)}
                      </div>
                      <div
                        className={`text-xs font-data-mono font-medium ${
                          isUp ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => onSelectItem(forex[0])}
            type="button"
            className="mt-4 text-xs font-semibold text-[#2962ff] hover:underline text-left cursor-pointer"
          >
            See all currency pairs →
          </button>
        </div>

        {/* Column 3: Government Bonds & US Treasury Yields */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <button
                onClick={onOpenYieldCurve}
                type="button"
                className="group flex items-center gap-1 text-lg font-semibold text-[#131722] hover:text-[#2962ff] cursor-pointer"
              >
                <span>US Treasury Yields</span>
                <span className="material-symbols-outlined text-[20px] text-[#6a6d78] group-hover:text-[#2962ff]">
                  chevron_right
                </span>
              </button>
              <span className="text-xs text-[#b2b5be]">Yield Curve</span>
            </div>

            <div className="divide-y divide-[#f0f3fa]">
              {yields.map((yieldItem) => {
                const isUp = yieldItem.change >= 0;
                return (
                  <div
                    key={yieldItem.maturity}
                    onClick={onOpenYieldCurve}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onOpenYieldCurve()}
                    className="py-2.5 flex items-center justify-between hover:bg-[#f8f9fd] px-1.5 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#131722] group-hover:text-[#2962ff]">
                        {yieldItem.maturity}
                      </div>
                      <div className="text-[11px] text-[#6a6d78]">{yieldItem.code}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-data-mono text-[#131722] font-semibold text-sm">
                        {yieldItem.yield.toFixed(3)}%
                      </div>
                      <div
                        className={`text-xs font-data-mono font-medium ${
                          isUp ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {yieldItem.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={onOpenYieldCurve}
            type="button"
            className="mt-4 text-xs font-semibold text-[#2962ff] hover:underline text-left cursor-pointer flex items-center gap-1"
          >
            <span>Interactive yield curve customizer</span>
            <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
