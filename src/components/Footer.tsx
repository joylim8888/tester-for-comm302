import React from 'react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenSearch }) => {
  return (
    <footer className="w-full bg-white text-[#6a6d78] border-t border-[#f0f3fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-10 border-b border-[#f0f3fa]">
          {/* Products */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-2">
              Products
            </h4>
            <button
              onClick={onOpenSearch}
              className="text-left text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5 cursor-pointer"
            >
              Screeners
            </button>
            <button
              onClick={() => onSelectCategory('US stocks')}
              className="text-left text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5 cursor-pointer"
            >
              Heatmaps
            </button>
            <button
              onClick={() => onSelectCategory('Economy')}
              className="text-left text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5 cursor-pointer"
            >
              Calendars
            </button>
            <button
              onClick={onOpenSearch}
              className="text-left text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5 cursor-pointer"
            >
              More products
            </button>
          </div>

          {/* Community */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-2">
              Community
            </h4>
            <a
              href="#community"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Overview
            </a>
            <a
              href="#ideas"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Ideas
            </a>
            <a
              href="#pine-script"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Pine Script
            </a>
            <a
              href="#streams"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Live Streams
            </a>
          </div>

          {/* Markets */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-2">
              Markets
            </h4>
            <button
              onClick={() => onSelectCategory('Indices')}
              className="text-left text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5 cursor-pointer"
            >
              Indices
            </button>
            <button
              onClick={() => onSelectCategory('US stocks')}
              className="text-left text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5 cursor-pointer"
            >
              Stocks
            </button>
            <button
              onClick={() => onSelectCategory('Crypto')}
              className="text-left text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5 cursor-pointer"
            >
              Crypto
            </button>
            <button
              onClick={() => onSelectCategory('Forex')}
              className="text-left text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5 cursor-pointer"
            >
              Forex
            </button>
          </div>

          {/* For Business */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-2">
              For Business
            </h4>
            <a
              href="#business-solutions"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Business solutions
            </a>
            <a
              href="#charting-libraries"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Charting libraries
            </a>
            <a
              href="#brokerage"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Brokerage integration
            </a>
            <a
              href="#partner-program"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Partner program
            </a>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] mb-2">
              Company
            </h4>
            <a
              href="#about"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              About company
            </a>
            <a
              href="#features"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Features
            </a>
            <a
              href="#careers"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Careers
            </a>
            <a
              href="#terms"
              className="text-sm text-[#6a6d78] hover:text-[#2962ff] transition-colors py-0.5"
            >
              Terms &amp; Privacy
            </a>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col gap-4">
          <div className="text-xs text-[#b2b5be] space-y-1">
            <p>
              Market data provided by ICE Data Services, FactSet, and other independent vendors
              worldwide. Real-time quote streaming subject to exchange reporting delays.
            </p>
            <p>
              Trading in financial instruments involves high risk of loss. Analysis and charts are
              published for informational purposes and should not be construed as investment
              advice.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-[#f0f3fa]">
            <div className="flex items-center gap-2 text-sm text-[#6a6d78]">
              <span>© 2024 TradingView</span>
              <span className="text-[#b2b5be]">•</span>
              <span>Made by humans</span>
            </div>

            <div className="flex items-center gap-5 text-[#6a6d78]">
              <span
                className="material-symbols-outlined text-[20px] hover:text-[#131722] cursor-pointer transition-colors"
                title="Global Server"
              >
                public
              </span>
              <span
                className="material-symbols-outlined text-[20px] hover:text-[#131722] cursor-pointer transition-colors"
                title="Share Terminal"
              >
                share
              </span>
              <span
                className="material-symbols-outlined text-[20px] hover:text-[#131722] cursor-pointer transition-colors"
                title="Trader Community"
              >
                forum
              </span>
              <span
                className="material-symbols-outlined text-[20px] hover:text-[#131722] cursor-pointer transition-colors"
                title="Real-Time RSS Feed"
              >
                rss_feed
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
