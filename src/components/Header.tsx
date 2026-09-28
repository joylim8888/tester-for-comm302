import React, { useState } from 'react';

interface HeaderProps {
  onOpenSearch: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  isLive: boolean;
  onToggleLive: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  watchlistCount,
  onOpenWatchlist,
  isLive,
  onToggleLive,
  onSelectCategory,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = ['EN', 'DE', 'ES', 'FR', 'JA', 'ZH'];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#f0f3fa]">
      <div className="h-14 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand & Search */}
        <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
          <a
            href="#"
            className="flex items-center gap-2 text-[#131722] hover:opacity-85 transition-opacity focus:outline-none"
            title="TradingView - Markets"
          >
            <svg
              className="w-8 h-8 flex-shrink-0 fill-current text-[#131722]"
              viewBox="0 0 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 0H22V28H14V0Z"></path>
              <path d="M0 8H8V28H0V8Z"></path>
              <path d="M28 14H36V28H28V14Z"></path>
            </svg>
            <span className="hidden sm:inline font-bold tracking-tight text-lg text-[#131722]">
              Markets
            </span>
          </a>

          {/* Quick Global Search Bar */}
          <div className="hidden md:flex items-center relative w-64 lg:w-72">
            <button
              onClick={onOpenSearch}
              type="button"
              className="w-full flex items-center bg-[#f0f3fa] hover:bg-[#dfe2e9] text-[#6a6d78] hover:text-[#131722] transition-colors rounded-full py-1 px-3.5 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#2962ff]/30"
            >
              <span className="material-symbols-outlined text-[#6a6d78] text-[18px] mr-2">
                search
              </span>
              <span className="text-sm font-normal flex-1">Search symbols, indices...</span>
              <span className="bg-[#ffffff] rounded px-1.5 py-0.5 text-[11px] font-medium text-[#6a6d78] shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#e0e3eb]">
                Ctrl+K
              </span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 flex-shrink-0">
          <a
            href="#products"
            className="text-sm font-normal text-[#6a6d78] hover:text-[#131722] transition-colors py-1"
          >
            Products
          </a>
          <a
            href="#community"
            className="text-sm font-normal text-[#6a6d78] hover:text-[#131722] transition-colors py-1"
          >
            Community
          </a>
          <a
            href="#markets"
            aria-current="page"
            className="transition-colors py-1 text-[#2962ff] font-semibold relative after:content-[''] after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2962ff]"
          >
            Markets
          </a>
          <a
            href="#brokers"
            className="text-sm font-normal text-[#6a6d78] hover:text-[#131722] transition-colors py-1"
          >
            Brokers
          </a>
          <a
            href="#more"
            className="text-sm font-normal text-[#6a6d78] hover:text-[#131722] transition-colors py-1"
          >
            More
          </a>
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-full hover:bg-[#f0f3fa] text-[#6a6d78] hover:text-[#131722] transition-colors"
            title="Search symbols"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Live Feed Toggle */}
          <button
            onClick={onToggleLive}
            type="button"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              isLive
                ? 'bg-[#e8f8f5] text-[#089981] border border-[#089981]/20 hover:bg-[#d0f1eb]'
                : 'bg-[#feecee] text-[#f23645] border border-[#f23645]/20 hover:bg-[#fcd0d5]'
            }`}
            title={isLive ? 'Live price stream active (click to pause)' : 'Price stream paused (click to resume)'}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-[#089981] animate-pulse' : 'bg-[#f23645]'
              }`}
            ></span>
            <span className="hidden sm:inline">{isLive ? 'LIVE' : 'PAUSED'}</span>
          </button>

          {/* Watchlist button with badge */}
          <button
            onClick={onOpenWatchlist}
            type="button"
            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f0f3fa] text-[#6a6d78] hover:text-[#2962ff] transition-colors"
            title="View Watchlist"
          >
            <span className="material-symbols-outlined text-[20px]">bookmark</span>
            {watchlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#2962ff] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-[#f0f3fa] transition-colors text-[#6a6d78] hover:text-[#131722] focus:outline-none"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">language</span>
              <span className="text-xs font-semibold uppercase tracking-wider">{selectedLang}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border border-[#e0e3eb] rounded-xl shadow-lg py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setSelectedLang(l);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#f0f3fa] transition-colors ${
                      selectedLang === l ? 'text-[#2962ff] font-bold' : 'text-[#131722]'
                    }`}
                  >
                    {l} — {l === 'EN' ? 'English' : l === 'DE' ? 'Deutsch' : l === 'ES' ? 'Español' : l === 'FR' ? 'Français' : l === 'JA' ? '日本語' : '中文'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Get Started */}
          <button
            onClick={() => onSelectCategory('Indices')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#2962ff] hover:bg-[#0049db] text-white text-xs font-semibold shadow-[0_2px_12px_rgba(41,98,255,0.25)] hover:shadow-[0_4px_16px_rgba(41,98,255,0.35)] transition-all cursor-pointer"
          >
            Get started
          </button>

          {/* User profile avatar icon */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-8 h-8 rounded-full bg-[#0049db] hover:bg-[#2962ff] flex items-center justify-center cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-colors focus:outline-none"
              title="Profile menu"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-[#e0e3eb] rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-[#f0f3fa]">
                  <div className="text-xs font-semibold text-[#131722]">Guest Trader</div>
                  <div className="text-[11px] text-[#6a6d78] truncate">Pro Terminal Access</div>
                </div>
                <button
                  onClick={() => {
                    onOpenWatchlist();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#131722] hover:bg-[#f0f3fa] flex items-center justify-between"
                >
                  <span>My Watchlist</span>
                  <span className="text-[#2962ff] font-bold">{watchlistCount}</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSearch();
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#131722] hover:bg-[#f0f3fa] flex items-center justify-between"
                >
                  <span>Symbol Screener</span>
                  <span className="text-[10px] bg-[#f0f3fa] px-1 rounded">⌘K</span>
                </button>
                <div className="border-t border-[#f0f3fa] my-1"></div>
                <button
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full text-left px-4 py-1.5 text-xs text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3fa]"
                >
                  Layout: Default Standard
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center w-8 h-8 rounded text-[#6a6d78] hover:text-[#131722]"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#f0f3fa] bg-white px-4 py-3 space-y-2">
          <a
            href="#markets"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#2962ff] py-1"
          >
            Markets
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#6a6d78] py-1"
          >
            Products & Screeners
          </a>
          <a
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#6a6d78] py-1"
          >
            Community Ideas & Streams
          </a>
          <a
            href="#brokers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-[#6a6d78] py-1"
          >
            Brokers Integration
          </a>
        </div>
      )}
    </header>
  );
};
