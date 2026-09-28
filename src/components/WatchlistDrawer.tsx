import React from 'react';
import { MarketItem } from '../types';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: string[];
  allItems: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  allItems,
  onSelectItem,
  onRemoveFromWatchlist,
}) => {
  if (!isOpen) return null;

  const watchlistedItems = allItems.filter((i) => watchlistSymbols.includes(i.symbol));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#f0f3fa] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#2962ff] text-[22px]">
              bookmark
            </span>
            <h2 className="text-lg font-bold text-[#131722]">Pinned Watchlist</h2>
            <span className="text-xs bg-[#f1f4fb] px-2 py-0.5 rounded-full font-semibold text-[#2962ff]">
              {watchlistedItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3fa] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Watchlist Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {watchlistedItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <span className="material-symbols-outlined text-4xl text-[#b2b5be]">
                bookmark_border
              </span>
              <p className="text-sm font-semibold text-[#131722] mt-2">
                Your Watchlist is Empty
              </p>
              <p className="text-xs text-[#6a6d78] mt-1 max-w-xs mx-auto">
                Click on any symbol card or table row and select "Watchlist" to pin instruments
                here for quick tracking.
              </p>
            </div>
          ) : (
            watchlistedItems.map((item) => {
              const isUp = item.changePercent >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="p-3 rounded-xl border border-[#f0f3fa] hover:border-[#2962ff]/30 bg-white hover:bg-[#f8f9fd] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f1f4fb] flex items-center justify-center text-xs font-bold text-[#131722]">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#131722] group-hover:text-[#2962ff]">
                        {item.symbol}
                      </div>
                      <div className="text-[11px] text-[#6a6d78] truncate max-w-[140px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold font-data-mono text-[#131722]">
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

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWatchlist(item.symbol);
                      }}
                      className="p-1 text-[#b2b5be] hover:text-[#f23645] transition-colors"
                      title="Remove from watchlist"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f0f3fa] bg-[#f8f9fd] flex items-center justify-between">
          <span className="text-xs text-[#6a6d78]">Quick Watchlist Drawer</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#181c21] text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
