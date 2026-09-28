import React, { useState } from 'react';
import { AssetCategory } from '../types';

interface HeroSectionProps {
  activeCategory: string;
  onSelectCategory: (category: AssetCategory) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

const CATEGORIES: AssetCategory[] = [
  'Indices',
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures & commodities',
  'Forex',
  'Government bonds',
  'Corporate bonds',
  'ETFs',
  'Economy',
];

const REGIONS = [
  { id: 'everywhere', title: 'Markets, everywhere' },
  { id: 'us', title: 'Markets, United States' },
  { id: 'europe', title: 'Markets, Europe' },
  { id: 'asia', title: 'Markets, Asia-Pacific' },
  { id: 'emerging', title: 'Markets, Emerging & BRICS' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentRegion = REGIONS.find((r) => r.id === selectedRegion) || REGIONS[0];

  return (
    <div className="flex flex-col items-center justify-center text-center pt-4 pb-2">
      {/* Hero Header Title Area with Dropdown */}
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="group inline-flex items-center gap-3 cursor-pointer py-1 px-3 rounded-full hover:bg-[#dfe2e9] transition-colors focus:outline-none"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-[#131722] tracking-tight leading-tight">
            {currentRegion.title}
          </h1>
          <span className="material-symbols-outlined text-[#131722] text-[32px] sm:text-[40px] group-hover:translate-y-0.5 transition-transform">
            expand_more
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#e0e3eb] py-2 z-40 text-left">
            <div className="px-4 py-1.5 text-[11px] font-semibold text-[#b2b5be] uppercase tracking-wider">
              Select Market View
            </div>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onSelectRegion(r.id);
                  setDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-[#f8f9fd] transition-colors ${
                  r.id === selectedRegion ? 'text-[#2962ff] font-bold bg-[#f1f4fb]' : 'text-[#131722]'
                }`}
              >
                <span>{r.title}</span>
                {r.id === selectedRegion && (
                  <span className="material-symbols-outlined text-[18px] text-[#2962ff]">check</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-base text-[#6a6d78] max-w-2xl mt-2 px-4">
        Real-time quotes, multi-asset technical charts, heatmaps and macro intelligence across
        global trading desks.
      </p>

      {/* Category Filter Pills */}
      <div className="w-full flex items-center justify-start sm:justify-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none px-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              type="button"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-xs cursor-pointer ${
                isActive
                  ? 'bg-[#181c21] text-white shadow-sm'
                  : 'bg-white hover:bg-[#ebeef5] text-[#6a6d78] hover:text-[#131722]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
