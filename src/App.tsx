/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { TickerTape } from './components/TickerTape';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { StocksSection } from './components/StocksSection';
import { CryptoSection } from './components/CryptoSection';
import { MacroSection } from './components/MacroSection';
import { EconomySection } from './components/EconomySection';
import { EtfSection } from './components/EtfSection';
import { Footer } from './components/Footer';
import { SymbolDetailModal } from './components/SymbolDetailModal';
import { SearchModal } from './components/SearchModal';
import { YieldCurveModal } from './components/YieldCurveModal';
import { EarningsCalendarModal } from './components/EarningsCalendarModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';

import {
  INITIAL_TICKER_ITEMS,
  US_INDICES,
  WORLD_INDICES,
  MEGA_CAPS,
  HIGHEST_VOLUME_STOCKS,
  COMMUNITY_TRENDS,
  CRYPTO_SPOTLIGHT,
  CRYPTO_MARKET_CAP_RANKING,
  DEFI_PROTOCOLS,
  COMMODITIES_LIST,
  FOREX_LIST,
  TREASURY_YIELDS,
  ECONOMIC_INDICATORS,
  UPCOMING_EVENTS,
  ETF_LIST,
} from './data/marketData';
import { MarketItem, AssetCategory } from './types';

export default function App() {
  // Live market state
  const [tickerItems, setTickerItems] = useState<MarketItem[]>(INITIAL_TICKER_ITEMS);
  const [usIndices, setUsIndices] = useState<MarketItem[]>(US_INDICES);
  const [worldIndices, setWorldIndices] = useState<MarketItem[]>(WORLD_INDICES);
  const [megaCaps, setMegaCaps] = useState<MarketItem[]>(MEGA_CAPS);
  const [volumeStocks, setVolumeStocks] = useState<MarketItem[]>(HIGHEST_VOLUME_STOCKS);
  const [commodities, setCommodities] = useState<MarketItem[]>(COMMODITIES_LIST);
  const [forex, setForex] = useState<MarketItem[]>(FOREX_LIST);
  const [cryptoSpotlight, setCryptoSpotlight] = useState<MarketItem[]>(CRYPTO_SPOTLIGHT);
  const [etfs, setEtfs] = useState<MarketItem[]>(ETF_LIST);

  // Active category & region selection
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('Indices');
  const [selectedRegion, setSelectedRegion] = useState<string>('everywhere');

  // Modals state
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [yieldCurveModalOpen, setYieldCurveModalOpen] = useState(false);
  const [earningsModalOpen, setEarningsModalOpen] = useState(false);
  const [watchlistDrawerOpen, setWatchlistDrawerOpen] = useState(false);

  // Watchlist state
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([
    'S&P 500',
    'NVDA',
    'BTC',
    'Gold',
  ]);

  // Real-time flash indicators
  const [flashingSymbols, setFlashingSymbols] = useState<Record<string, 'up' | 'down'>>({});
  const [isLive, setIsLive] = useState(true);

  // Aggregated all items for search lookup
  const allItems = useMemo(() => {
    const map = new Map<string, MarketItem>();
    [
      ...tickerItems,
      ...usIndices,
      ...worldIndices,
      ...megaCaps,
      ...volumeStocks,
      ...COMMUNITY_TRENDS,
      ...cryptoSpotlight,
      ...commodities,
      ...forex,
      ...etfs,
    ].forEach((item) => {
      map.set(item.symbol, item);
    });
    return Array.from(map.values());
  }, [
    tickerItems,
    usIndices,
    worldIndices,
    megaCaps,
    volumeStocks,
    cryptoSpotlight,
    commodities,
    forex,
    etfs,
  ]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time quote tick simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Pick a random set of symbols to update
      const targets = [
        { state: usIndices, setter: setUsIndices },
        { state: megaCaps, setter: setMegaCaps },
        { state: volumeStocks, setter: setVolumeStocks },
        { state: cryptoSpotlight, setter: setCryptoSpotlight },
        { state: commodities, setter: setCommodities },
      ];

      const chosenGroup = targets[Math.floor(Math.random() * targets.length)];
      if (chosenGroup.state.length === 0) return;

      const randomIndex = Math.floor(Math.random() * chosenGroup.state.length);
      const targetItem = chosenGroup.state[randomIndex];

      const tickDeltaPct = (Math.random() - 0.49) * 0.25; // small tick +/- 0.12%
      const newPrice = Number((targetItem.price * (1 + tickDeltaPct / 100)).toFixed(2));
      const newPct = Number((targetItem.changePercent + tickDeltaPct).toFixed(2));
      const direction: 'up' | 'down' = tickDeltaPct >= 0 ? 'up' : 'down';

      // Update state
      chosenGroup.setter((prev) =>
        prev.map((item, idx) =>
          idx === randomIndex
            ? {
                ...item,
                price: newPrice,
                changePercent: newPct,
                change: Number((item.change + (newPrice - targetItem.price)).toFixed(2)),
              }
            : item
        )
      );

      // Trigger flash highlight
      setFlashingSymbols((prev) => ({
        ...prev,
        [targetItem.symbol]: direction,
      }));

      // Clear flash after 1.2s
      setTimeout(() => {
        setFlashingSymbols((prev) => {
          const next = { ...prev };
          delete next[targetItem.symbol];
          return next;
        });
      }, 1200);
    }, 3800);

    return () => clearInterval(interval);
  }, [isLive, usIndices, megaCaps, volumeStocks, cryptoSpotlight, commodities]);

  // Watchlist toggle handler
  const handleToggleWatchlist = useCallback((symbol: string) => {
    setWatchlistSymbols((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  }, []);

  // Category filter scroll navigation
  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat as AssetCategory);
    const sectionMap: Record<string, string> = {
      Indices: 'section-indices',
      'US stocks': 'section-stocks',
      'World stocks': 'section-indices',
      Crypto: 'section-crypto',
      'Futures & commodities': 'section-macro',
      Forex: 'section-macro',
      'Government bonds': 'section-macro',
      'Corporate bonds': 'section-macro',
      ETFs: 'section-etfs',
      Economy: 'section-economy',
    };

    const targetId = sectionMap[cat];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#181c21] flex flex-col font-sans selection:bg-[#2962ff] selection:text-white">
      {/* 1. Global Navigation Top Bar */}
      <Header
        onOpenSearch={() => setSearchModalOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        watchlistCount={watchlistSymbols.length}
        onOpenWatchlist={() => setWatchlistDrawerOpen(true)}
        isLive={isLive}
        onToggleLive={() => setIsLive(!isLive)}
      />

      {/* Main Terminal Viewport with Header Offset */}
      <main className="w-full pt-14 flex-1">
        <div className="flex flex-col w-full">
          {/* 2. Live Global Feeds Ticker Tape Ribbon */}
          <TickerTape
            items={tickerItems}
            onSelectItem={setSelectedItem}
            flashingSymbols={flashingSymbols}
          />

          {/* Core Content Container (Max-W 7XL: 1280px) */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
            {/* 3. Hero Header Area */}
            <HeroSection
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
            />

            {/* 4. Section 1: Indices */}
            <IndicesSection
              usIndices={usIndices}
              worldIndices={worldIndices}
              onSelectItem={setSelectedItem}
              flashingSymbols={flashingSymbols}
            />

            {/* 5. Section 2: US Stocks & Market Movers */}
            <StocksSection
              megaCaps={megaCaps}
              volumeStocks={volumeStocks}
              communityTrends={COMMUNITY_TRENDS}
              onSelectItem={setSelectedItem}
              onOpenEarnings={() => setEarningsModalOpen(true)}
            />

            {/* 6. Section 3: Crypto Market Overview */}
            <CryptoSection
              cryptoSpotlight={cryptoSpotlight}
              marketCapRanking={CRYPTO_MARKET_CAP_RANKING}
              defiProtocols={DEFI_PROTOCOLS}
              onSelectItem={setSelectedItem}
            />

            {/* 7. Section 4: Macro & Commodities Bento */}
            <MacroSection
              commodities={commodities}
              forex={forex}
              yields={TREASURY_YIELDS}
              onSelectItem={setSelectedItem}
              onOpenYieldCurve={() => setYieldCurveModalOpen(true)}
            />

            {/* 8. Section 5: Economy & Global Trends */}
            <EconomySection
              indicators={ECONOMIC_INDICATORS}
              upcomingEvents={UPCOMING_EVENTS}
              onOpenCalendar={() => setEarningsModalOpen(true)}
            />

            {/* 9. Section 6: ETFs & Top Funds */}
            <EtfSection etfs={etfs} onSelectItem={setSelectedItem} />
          </div>
        </div>
      </main>

      {/* 10. Comprehensive Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      {/* Symbol Detail Chart Modal */}
      <SymbolDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isWatchlisted={selectedItem ? watchlistSymbols.includes(selectedItem.symbol) : false}
        onToggleWatchlist={handleToggleWatchlist}
      />

      {/* Symbol Screener & Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        allItems={allItems}
        onSelectItem={setSelectedItem}
      />

      {/* Interactive Yield Curve Visualizer Modal */}
      <YieldCurveModal
        isOpen={yieldCurveModalOpen}
        onClose={() => setYieldCurveModalOpen(false)}
        initialYields={TREASURY_YIELDS}
      />

      {/* Corporate Earnings & Macro Calendar Modal */}
      <EarningsCalendarModal
        isOpen={earningsModalOpen}
        onClose={() => setEarningsModalOpen(false)}
      />

      {/* Watchlist Pinned Items Drawer */}
      <WatchlistDrawer
        isOpen={watchlistDrawerOpen}
        onClose={() => setWatchlistDrawerOpen(false)}
        watchlistSymbols={watchlistSymbols}
        allItems={allItems}
        onSelectItem={setSelectedItem}
        onRemoveFromWatchlist={(sym) =>
          setWatchlistSymbols((prev) => prev.filter((s) => s !== sym))
        }
      />
    </div>
  );
}
