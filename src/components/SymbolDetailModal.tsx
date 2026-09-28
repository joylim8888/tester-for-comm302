import React, { useState } from 'react';
import { MarketItem } from '../types';

interface SymbolDetailModalProps {
  item: MarketItem | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

type Timeframe = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y';
type ChartType = 'line' | 'candles';

export const SymbolDetailModal: React.FC<SymbolDetailModalProps> = ({
  item,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!item) return null;

  const isUp = item.changePercent >= 0;

  // Generate synthetic points based on timeframe for interactive charting
  const pointCount = timeframe === '1D' ? 24 : timeframe === '5D' ? 35 : 50;
  const basePrice = item.price;
  const volatility = item.category === 'Crypto' ? 0.03 : 0.012;

  const chartPoints: Array<{ time: string; price: number; open: number; high: number; low: number; close: number }> = [];
  let currentVal = basePrice * (1 - item.changePercent / 100);

  for (let i = 0; i < pointCount; i++) {
    const delta = (Math.sin(i * 0.4) * 0.5 + (Math.random() - 0.48)) * (basePrice * volatility);
    const open = currentVal;
    const close = i === pointCount - 1 ? item.price : currentVal + delta;
    const high = Math.max(open, close) + Math.random() * (basePrice * volatility * 0.5);
    const low = Math.min(open, close) - Math.random() * (basePrice * volatility * 0.5);
    currentVal = close;

    const timeLabel =
      timeframe === '1D'
        ? `${9 + Math.floor(i / 3.5)}:${(i % 4) * 15 || '00'}`
        : `Day ${i + 1}`;

    chartPoints.push({ time: timeLabel, price: close, open, high, low, close });
  }

  // Min and max for chart SVG coordinate mapping
  const prices = chartPoints.map((p) => p.price);
  const minPrice = Math.min(...prices, item.dayLow || item.price * 0.98);
  const maxPrice = Math.max(...prices, item.dayHigh || item.price * 1.02);
  const priceRange = maxPrice - minPrice || 1;

  const width = 640;
  const height = 240;

  const getX = (index: number) => (index / (chartPoints.length - 1)) * (width - 40) + 20;
  const getY = (val: number) => height - 30 - ((val - minPrice) / priceRange) * (height - 60);

  // SVG path for line chart
  const pathData = chartPoints
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx).toFixed(1)} ${getY(p.price).toFixed(1)}`)
    .join(' ');

  const areaData = `${pathData} L ${getX(chartPoints.length - 1)} ${height - 10} L ${getX(0)} ${height - 10} Z`;

  const hoveredPoint = hoverIndex !== null ? chartPoints[hoverIndex] : null;

  const ratingColor =
    item.rating === 'Strong Buy'
      ? 'bg-[#089981] text-white'
      : item.rating === 'Buy'
      ? 'bg-[#e8f8f5] text-[#089981]'
      : item.rating === 'Neutral'
      ? 'bg-[#f1f4fb] text-[#131722]'
      : 'bg-[#feecee] text-[#f23645]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#f0f3fa] flex items-start justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f1f4fb] border border-[#e0e3eb] flex items-center justify-center text-sm font-bold text-[#131722]">
              {item.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#131722]">{item.symbol}</h2>
                <span className="text-xs text-[#6a6d78] px-2 py-0.5 rounded bg-[#f1f4fb]">
                  {item.exchange || item.category}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${ratingColor}`}>
                  {item.rating || 'Technical: Buy'}
                </span>
              </div>
              <div className="text-xs text-[#6a6d78] mt-0.5">{item.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(item.symbol)}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                isWatchlisted
                  ? 'bg-[#2962ff] text-white border-[#2962ff]'
                  : 'bg-white text-[#6a6d78] border-[#e0e3eb] hover:bg-[#f8f9fd]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isWatchlisted ? 'bookmark_added' : 'bookmark_add'}
              </span>
              <span>{isWatchlisted ? 'Watchlisted' : 'Watchlist'}</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3fa] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Price & Controls Strip */}
        <div className="px-5 pt-4 pb-2 flex flex-wrap items-baseline justify-between gap-3 bg-[#f8f9fd] border-b border-[#f0f3fa]">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold font-data-mono text-[#131722]">
              ${(hoveredPoint ? hoveredPoint.price : item.price).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: item.price < 2 ? 4 : 2,
              })}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-sm font-semibold font-data-mono px-2 py-0.5 rounded-full ${
                  isUp ? 'text-[#089981] bg-[#e8f8f5]' : 'text-[#f23645] bg-[#feecee]'
                }`}
              >
                {isUp ? '+' : ''}
                {item.changePercent.toFixed(2)}% ({isUp ? '+' : ''}$
                {Math.abs(item.change).toFixed(2)})
              </span>
              <span className="text-xs text-[#b2b5be]">Today</span>
            </div>
          </div>

          {/* Timeframe & Chart Style Toggles */}
          <div className="flex items-center gap-2">
            <div className="flex bg-white rounded-lg p-0.5 border border-[#e0e3eb] text-xs">
              {(['1D', '5D', '1M', '6M', '1Y', '5Y'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    timeframe === tf
                      ? 'bg-[#2962ff] text-white shadow-2xs font-semibold'
                      : 'text-[#6a6d78] hover:text-[#131722]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="flex bg-white rounded-lg p-0.5 border border-[#e0e3eb] text-xs">
              <button
                onClick={() => setChartType('line')}
                className={`p-1 rounded ${
                  chartType === 'line' ? 'bg-[#2962ff] text-white' : 'text-[#6a6d78]'
                }`}
                title="Line chart"
              >
                <span className="material-symbols-outlined text-[16px] block">show_chart</span>
              </button>
              <button
                onClick={() => setChartType('candles')}
                className={`p-1 rounded ${
                  chartType === 'candles' ? 'bg-[#2962ff] text-white' : 'text-[#6a6d78]'
                }`}
                title="Candlestick chart"
              >
                <span className="material-symbols-outlined text-[16px] block">candlestick_chart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Chart Canvas View */}
        <div
          className="relative px-5 py-4 bg-white"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <svg
            className="w-full h-56 overflow-visible cursor-crosshair"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const relX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, (relX - 20) / (rect.width - 40)));
              const idx = Math.round(ratio * (chartPoints.length - 1));
              setHoverIndex(idx);
            }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isUp ? '#089981' : '#f23645'}
                  stopOpacity="0.28"
                />
                <stop
                  offset="100%"
                  stopColor={isUp ? '#089981' : '#f23645'}
                  stopOpacity="0.0"
                />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid lines */}
            {[0.25, 0.5, 0.75].map((pct, idx) => {
              const yPos = height - 30 - pct * (height - 60);
              return (
                <line
                  key={idx}
                  x1="10"
                  y1={yPos}
                  x2={width - 10}
                  y2={yPos}
                  stroke="#f0f3fa"
                  strokeDasharray="3 3"
                />
              );
            })}

            {chartType === 'line' ? (
              <>
                <path d={areaData} fill="url(#chartGradient)" />
                <path
                  d={pathData}
                  fill="none"
                  stroke={isUp ? '#089981' : '#f23645'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              // Candlestick rendering
              chartPoints.map((p, idx) => {
                const candleUp = p.close >= p.open;
                const x = getX(idx);
                const yHigh = getY(p.high);
                const yLow = getY(p.low);
                const yOpen = getY(p.open);
                const yClose = getY(p.close);
                const top = Math.min(yOpen, yClose);
                const heightBody = Math.max(2, Math.abs(yClose - yOpen));
                const color = candleUp ? '#089981' : '#f23645';

                return (
                  <g key={idx}>
                    <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1" />
                    <rect
                      x={x - 3}
                      y={top}
                      width={6}
                      height={heightBody}
                      fill={color}
                      rx="1"
                    />
                  </g>
                );
              })
            )}

            {/* Active hover crosshair and marker */}
            {hoverIndex !== null && (
              <>
                <line
                  x1={getX(hoverIndex)}
                  y1={10}
                  x2={getX(hoverIndex)}
                  y2={height - 20}
                  stroke="#2962ff"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <circle
                  cx={getX(hoverIndex)}
                  cy={getY(chartPoints[hoverIndex].price)}
                  r="5"
                  fill="#2962ff"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>

          {/* Time and Price Tooltip on Hover */}
          {hoveredPoint && hoverIndex !== null && (
            <div
              style={{
                left: `${(getX(hoverIndex) / width) * 100}%`,
                top: `${(getY(hoveredPoint.price) / height) * 100 - 35}%`,
              }}
              className="absolute -translate-x-1/2 pointer-events-none bg-[#131722] text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 font-data-mono"
            >
              ${hoveredPoint.price.toFixed(2)} • {hoveredPoint.time}
            </div>
          )}
        </div>

        {/* Technical Key Statistics & Order Simulation Grid */}
        <div className="p-5 bg-[#f8f9fd] border-t border-[#f0f3fa] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-[#6a6d78] mb-1">Day's Range</div>
            <div className="font-semibold text-[#131722] font-data-mono">
              ${(item.dayLow || item.price * 0.98).toFixed(2)} - ${(item.dayHigh || item.price * 1.02).toFixed(2)}
            </div>
            <div className="w-full bg-[#e0e3eb] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#2962ff] h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          <div>
            <div className="text-[#6a6d78] mb-1">52-Week Range</div>
            <div className="font-semibold text-[#131722] font-data-mono">
              ${(item.low52 || item.price * 0.7).toFixed(2)} - ${(item.high52 || item.price * 1.15).toFixed(2)}
            </div>
            <div className="w-full bg-[#e0e3eb] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#089981] h-full rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>

          <div>
            <div className="text-[#6a6d78] mb-1">Volume (24h)</div>
            <div className="font-semibold text-[#131722] font-data-mono text-sm">
              {item.volume || '38.4M'}
            </div>
            <div className="text-[#b2b5be] text-[11px] mt-0.5">Avg: 34.2M</div>
          </div>

          <div>
            <div className="text-[#6a6d78] mb-1">Market Capitalization</div>
            <div className="font-semibold text-[#131722] font-data-mono text-sm">
              {item.marketCap || '$2.45T'}
            </div>
            <div className="text-[#b2b5be] text-[11px] mt-0.5">P/E: {item.peRatio || '34.2'}</div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-white border-t border-[#f0f3fa] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#089981]"></span>
            <span className="text-xs text-[#6a6d78]">
              Market is open • Real-time quotes from primary exchange
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Order execution preview for ${item.symbol}: Placed paper limit order.`);
              }}
              type="button"
              className="px-4 py-2 rounded-full bg-[#089981] hover:bg-[#006b59] text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Buy {item.symbol}
            </button>
            <button
              onClick={() => {
                alert(`Sell order dialog for ${item.symbol}.`);
              }}
              type="button"
              className="px-4 py-2 rounded-full bg-[#f23645] hover:bg-[#ba1a1a] text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Sell {item.symbol}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
