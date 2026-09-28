import React, { useState } from 'react';

interface EarningsCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EarningsCalendarModal: React.FC<EarningsCalendarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'earnings' | 'macro'>('earnings');

  if (!isOpen) return null;

  const earningsData = [
    {
      symbol: 'TAYD',
      name: 'Taylor Devices, Inc.',
      date: 'Today, Post-Market',
      estEPS: '$0.92',
      prevEPS: '$0.84',
      revEstimate: '$14.2M',
      marketCap: '$178M',
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      date: 'Tomorrow, Post-Market',
      estEPS: '$3.10',
      prevEPS: '$2.99',
      revEstimate: '$64.5B',
      marketCap: '$3.18T',
    },
    {
      symbol: 'META',
      name: 'Meta Platforms, Inc.',
      date: 'Tomorrow, Post-Market',
      estEPS: '$5.25',
      prevEPS: '$4.39',
      revEstimate: '$40.2B',
      marketCap: '$1.47T',
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      date: 'Thursday, Post-Market',
      estEPS: '$1.60',
      prevEPS: '$1.46',
      revEstimate: '$94.9B',
      marketCap: '$3.52T',
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      date: 'Thursday, Post-Market',
      estEPS: '$1.14',
      prevEPS: '$0.94',
      revEstimate: '$157.2B',
      marketCap: '$2.04T',
    },
  ];

  const macroData = [
    {
      event: 'US Non-Farm Payrolls',
      date: 'Friday, 08:30 AM EST',
      impact: 'High',
      forecast: '110K',
      previous: '254K',
      consensus: 'Cooling labor market baseline',
    },
    {
      event: 'US FOMC Interest Rate Decision',
      date: 'Thursday, 02:00 PM EST',
      impact: 'High',
      forecast: '4.75%',
      previous: '5.00%',
      consensus: '25 bps cut expected (94% probability)',
    },
    {
      event: 'ISM Manufacturing PMI',
      date: 'Friday, 10:00 AM EST',
      impact: 'Medium',
      forecast: '47.6',
      previous: '47.2',
      consensus: 'Contractionary territory slight rebound',
    },
    {
      event: 'Eurozone Harmonised CPI YoY',
      date: 'Thursday, 05:00 AM EST',
      impact: 'High',
      forecast: '1.9%',
      previous: '2.0%',
      consensus: 'Sub-target inflation print',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#e0e3eb] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#f0f3fa] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2962ff]/10 text-[#2962ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">event_note</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#131722]">
                Global Financial Calendar
              </h2>
              <div className="text-xs text-[#6a6d78]">
                Earnings announcements and scheduled macro events
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

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[#f0f3fa] bg-[#f8f9fd]">
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeTab === 'earnings'
                ? 'bg-[#181c21] text-white shadow-xs'
                : 'bg-white text-[#6a6d78] hover:text-[#131722] border border-[#e0e3eb]'
            }`}
          >
            Corporate Earnings Calendar
          </button>
          <button
            onClick={() => setActiveTab('macro')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeTab === 'macro'
                ? 'bg-[#181c21] text-white shadow-xs'
                : 'bg-white text-[#6a6d78] hover:text-[#131722] border border-[#e0e3eb]'
            }`}
          >
            High-Impact Macro Events
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto">
          {activeTab === 'earnings' ? (
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-semibold text-[#6a6d78] bg-[#f8f9fd]">
                    <th className="py-2.5 px-3 rounded-l-lg">Company</th>
                    <th className="py-2.5 px-3">Reporting Window</th>
                    <th className="py-2.5 px-3 text-right">Est. EPS</th>
                    <th className="py-2.5 px-3 text-right">Prev. EPS</th>
                    <th className="py-2.5 px-3 text-right">Rev. Est</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">Market Cap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f3fa] text-sm">
                  {earningsData.map((item) => (
                    <tr key={item.symbol} className="hover:bg-[#f8f9fd] transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-[#131722]">{item.symbol}</div>
                        <div className="text-xs text-[#6a6d78]">{item.name}</div>
                      </td>
                      <td className="py-3 px-3 text-xs text-[#6a6d78]">{item.date}</td>
                      <td className="py-3 px-3 text-right font-data-mono font-semibold text-[#131722]">
                        {item.estEPS}
                      </td>
                      <td className="py-3 px-3 text-right font-data-mono text-[#6a6d78]">
                        {item.prevEPS}
                      </td>
                      <td className="py-3 px-3 text-right font-data-mono text-[#131722]">
                        {item.revEstimate}
                      </td>
                      <td className="py-3 px-3 text-right font-data-mono text-[#6a6d78]">
                        {item.marketCap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-semibold text-[#6a6d78] bg-[#f8f9fd]">
                    <th className="py-2.5 px-3 rounded-l-lg">Event</th>
                    <th className="py-2.5 px-3">Scheduled Time</th>
                    <th className="py-2.5 px-3">Impact</th>
                    <th className="py-2.5 px-3 text-right">Forecast</th>
                    <th className="py-2.5 px-3 text-right">Previous</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Consensus Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f3fa] text-sm">
                  {macroData.map((item) => (
                    <tr key={item.event} className="hover:bg-[#f8f9fd] transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#131722]">{item.event}</td>
                      <td className="py-3 px-3 text-xs text-[#6a6d78] font-data-mono">
                        {item.date}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            item.impact === 'High'
                              ? 'bg-[#feecee] text-[#f23645]'
                              : 'bg-[#f1f4fb] text-[#2962ff]'
                          }`}
                        >
                          {item.impact}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-data-mono font-semibold text-[#131722]">
                        {item.forecast}
                      </td>
                      <td className="py-3 px-3 text-right font-data-mono text-[#6a6d78]">
                        {item.previous}
                      </td>
                      <td className="py-3 px-3 text-xs text-[#6a6d78]">{item.consensus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#f0f3fa] flex items-center justify-between">
          <span className="text-xs text-[#6a6d78]">
            Updated live with consensus estimates from Bloomberg &amp; FactSet
          </span>
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
