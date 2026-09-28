import React, { useState, useEffect, useRef } from 'react';
import { MarketItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allItems: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allItems,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'Indices', 'US stocks', 'Crypto', 'Futures & commodities', 'Forex', 'ETFs'];

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.exchange && item.exchange.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onSelectItem(filteredItems[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#f0f3fa] gap-3">
          <span className="material-symbols-outlined text-[#6a6d78] text-[22px]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search symbol, company name, crypto, ETF..."
            className="w-full text-base text-[#131722] placeholder-[#b2b5be] bg-transparent outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#6a6d78] hover:text-[#131722] p-1"
            >
              Clear
            </button>
          )}
          <span className="text-[11px] bg-[#f0f3fa] text-[#6a6d78] px-2 py-0.5 rounded border border-[#e0e3eb]">
            ESC
          </span>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#f0f3fa] overflow-x-auto scrollbar-none bg-[#f8f9fd]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#181c21] text-white'
                  : 'bg-white text-[#6a6d78] hover:text-[#131722] border border-[#e0e3eb]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto divide-y divide-[#f0f3fa] p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#6a6d78]">
              No instruments found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const isUp = item.changePercent >= 0;

              return (
                <div
                  key={`${item.symbol}-${index}`}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#f1f4fb]' : 'hover:bg-[#f8f9fd]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f0f3fa] flex items-center justify-center font-bold text-xs text-[#131722]">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#131722]">
                          {item.symbol}
                        </span>
                        <span className="text-[11px] text-[#6a6d78] bg-[#f0f3fa] px-1.5 py-0.2 rounded">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#6a6d78]">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-sm font-data-mono text-[#131722]">
                      ${item.price.toFixed(item.price < 2 ? 4 : 2)}
                    </div>
                    <div
                      className={`text-xs font-data-mono font-semibold ${
                        isUp ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isUp ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 px-4 bg-[#f8f9fd] border-t border-[#f0f3fa] flex items-center justify-between text-[11px] text-[#6a6d78]">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="bg-white px-1.5 py-0.5 rounded border border-[#e0e3eb]">↑</kbd>
            <kbd className="bg-white px-1.5 py-0.5 rounded border border-[#e0e3eb]">↓</kbd>
            <span>Select:</span>
            <kbd className="bg-white px-1.5 py-0.5 rounded border border-[#e0e3eb]">↵</kbd>
          </div>
          <span>TradingView Global Directory</span>
        </div>
      </div>
    </div>
  );
};
