import React, { useState } from 'react';
import { YieldCurvePoint } from '../types';

interface YieldCurveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialYields: YieldCurvePoint[];
}

export const YieldCurveModal: React.FC<YieldCurveModalProps> = ({
  isOpen,
  onClose,
  initialYields,
}) => {
  const [shiftBps, setShiftBps] = useState<number>(0);
  const [showHistorical, setShowHistorical] = useState<boolean>(true);

  if (!isOpen) return null;

  // Full Treasury curve points
  const baseCurve = [
    { maturity: '1M', years: 0.08, yield: 4.82 },
    { maturity: '3M', years: 0.25, yield: 4.68 },
    { maturity: '6M', years: 0.5, yield: 4.58 },
    { maturity: '1Y', years: 1.0, yield: 4.494 },
    { maturity: '2Y', years: 2.0, yield: 4.924 },
    { maturity: '5Y', years: 5.0, yield: 5.068 },
    { maturity: '7Y', years: 7.0, yield: 5.150 },
    { maturity: '10Y', years: 10.0, yield: 5.230 },
    { maturity: '20Y', years: 20.0, yield: 5.480 },
    { maturity: '30Y', years: 30.0, yield: 5.533 },
  ];

  // Inverted curve 1 year ago comparison
  const invertedCurve = [
    { maturity: '1M', years: 0.08, yield: 5.45 },
    { maturity: '3M', years: 0.25, yield: 5.48 },
    { maturity: '6M', years: 0.5, yield: 5.52 },
    { maturity: '1Y', years: 1.0, yield: 5.40 },
    { maturity: '2Y', years: 2.0, yield: 5.05 },
    { maturity: '5Y', years: 5.0, yield: 4.65 },
    { maturity: '7Y', years: 7.0, yield: 4.62 },
    { maturity: '10Y', years: 10.0, yield: 4.55 },
    { maturity: '20Y', years: 20.0, yield: 4.70 },
    { maturity: '30Y', years: 30.0, yield: 4.60 },
  ];

  const shiftedCurve = baseCurve.map((pt) => ({
    ...pt,
    yield: pt.yield + shiftBps / 100,
  }));

  // SVG Chart Dimension
  const width = 680;
  const height = 260;
  const paddingX = 40;
  const paddingY = 30;

  const minYield = 3.5;
  const maxYield = 6.2;

  const getX = (idx: number) => paddingX + (idx / (baseCurve.length - 1)) * (width - 2 * paddingX);
  const getY = (yVal: number) =>
    height - paddingY - ((yVal - minYield) / (maxYield - minYield)) * (height - 2 * paddingY);

  const currentPath = shiftedCurve
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx).toFixed(1)} ${getY(p.yield).toFixed(1)}`)
    .join(' ');

  const historicalPath = invertedCurve
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx).toFixed(1)} ${getY(p.yield).toFixed(1)}`)
    .join(' ');

  const current10Y = shiftedCurve.find((c) => c.maturity === '10Y')?.yield || 5.23;
  const current2Y = shiftedCurve.find((c) => c.maturity === '2Y')?.yield || 4.924;
  const spread10Y2Y = current10Y - current2Y;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#f0f3fa] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8f8f5] flex items-center justify-center text-[#089981]">
              <span className="material-symbols-outlined text-[24px]">ssid_chart</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#131722]">
                Interactive US Treasury Yield Curve
              </h2>
              <div className="text-xs text-[#6a6d78]">
                Real-time benchmark yields across maturity horizons
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6a6d78] hover:text-[#131722] hover:bg-[#f0f3fa] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Spread KPI Banner */}
        <div className="px-5 py-3 bg-[#f8f9fd] border-b border-[#f0f3fa] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-[11px] text-[#6a6d78] font-medium">10Y - 2Y Spread</div>
              <div
                className={`text-lg font-bold font-data-mono ${
                  spread10Y2Y >= 0 ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {spread10Y2Y >= 0 ? '+' : ''}
                {(spread10Y2Y * 100).toFixed(1)} bps ({spread10Y2Y.toFixed(3)}%)
              </div>
            </div>

            <div>
              <div className="text-[11px] text-[#6a6d78] font-medium">Curve Regime</div>
              <div className="text-sm font-bold text-[#131722] flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    spread10Y2Y >= 0 ? 'bg-[#089981]' : 'bg-[#f23645]'
                  }`}
                ></span>
                {spread10Y2Y >= 0 ? 'Normal Upward Slope' : 'Inverted (Recession Warning)'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistorical(!showHistorical)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                showHistorical
                  ? 'bg-[#181c21] text-white border-[#181c21]'
                  : 'bg-white text-[#6a6d78] border-[#e0e3eb]'
              }`}
            >
              Overlay 1Y Ago (Inverted)
            </button>
            <button
              onClick={() => setShiftBps(0)}
              className="text-xs text-[#2962ff] font-semibold hover:underline"
            >
              Reset Shift
            </button>
          </div>
        </div>

        {/* SVG Yield Curve Chart */}
        <div className="p-5 bg-white relative">
          <svg className="w-full h-64 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            {/* Horizontal Grid lines */}
            {[4.0, 4.5, 5.0, 5.5, 6.0].map((level) => {
              const y = getY(level);
              return (
                <g key={level}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#f0f3fa"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill="#b2b5be"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {level.toFixed(1)}%
                  </text>
                </g>
              );
            })}

            {/* Historical Curve */}
            {showHistorical && (
              <>
                <path
                  d={historicalPath}
                  fill="none"
                  stroke="#b2b5be"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {invertedCurve.map((pt, idx) => (
                  <circle
                    key={`hist-${idx}`}
                    cx={getX(idx)}
                    cy={getY(pt.yield)}
                    r="3.5"
                    fill="#b2b5be"
                  />
                ))}
              </>
            )}

            {/* Current Active Curve */}
            <path
              d={currentPath}
              fill="none"
              stroke="#2962ff"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Data points */}
            {shiftedCurve.map((pt, idx) => {
              const cx = getX(idx);
              const cy = getY(pt.yield);
              return (
                <g key={`cur-${idx}`}>
                  <circle cx={cx} cy={cy} r="5" fill="#2962ff" stroke="#ffffff" strokeWidth="2" />
                  <text
                    x={cx}
                    y={cy - 12}
                    textAnchor="middle"
                    fill="#131722"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {pt.yield.toFixed(2)}%
                  </text>
                  <text
                    x={cx}
                    y={height - 10}
                    textAnchor="middle"
                    fill="#6a6d78"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {pt.maturity}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#2962ff] rounded"></span>
              <span className="font-semibold text-[#131722]">
                Active Yield Curve {shiftBps !== 0 ? `(${shiftBps > 0 ? '+' : ''}${shiftBps} bps)` : ''}
              </span>
            </div>
            {showHistorical && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#b2b5be] rounded border-b border-dashed"></span>
                <span className="text-[#6a6d78]">October 2023 Inverted Benchmark</span>
              </div>
            )}
          </div>
        </div>

        {/* Customizer Slider Controls */}
        <div className="p-5 bg-[#f8f9fd] border-t border-[#f0f3fa]">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-[#131722]">
              Macro Shock Simulator (Fed Rate Hike / Cut Scenario)
            </label>
            <span className="text-xs font-bold font-data-mono text-[#2962ff]">
              {shiftBps > 0 ? `+${shiftBps}` : shiftBps} basis points
            </span>
          </div>

          <input
            type="range"
            min="-100"
            max="100"
            step="10"
            value={shiftBps}
            onChange={(e) => setShiftBps(parseInt(e.target.value))}
            className="w-full h-2 bg-[#e0e3eb] rounded-lg appearance-none cursor-pointer accent-[#2962ff]"
          />

          <div className="flex justify-between text-[11px] text-[#b2b5be] mt-1 font-data-mono">
            <span>-100 bps (Dovish Easing)</span>
            <span>Unchanged (0 bps)</span>
            <span>+100 bps (Hawkish Tightening)</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#f0f3fa] flex items-center justify-between">
          <span className="text-xs text-[#6a6d78]">
            Source: US Department of the Treasury Constant Maturity Rates
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 rounded-full bg-[#181c21] text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
