import React from 'react';
import { EconomicIndicator, EconomicEvent } from '../types';

interface EconomySectionProps {
  indicators: EconomicIndicator[];
  upcomingEvents: EconomicEvent[];
  onOpenCalendar: () => void;
}

export const EconomySection: React.FC<EconomySectionProps> = ({
  indicators,
  upcomingEvents,
  onOpenCalendar,
}) => {
  return (
    <section id="section-economy" className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onOpenCalendar}
          type="button"
          className="group flex items-center gap-1.5 text-2xl font-bold text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer"
        >
          <span>Economy &amp; Global Trends</span>
          <span className="material-symbols-outlined text-[24px] text-[#6a6d78] group-hover:text-[#2962ff] group-hover:translate-x-0.5 transition-all">
            chevron_right
          </span>
        </button>
        <button
          onClick={onOpenCalendar}
          type="button"
          className="text-sm font-semibold text-[#2962ff] hover:underline cursor-pointer"
        >
          See full calendar
        </button>
      </div>

      {/* 6 Metric Indicators Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {indicators.map((ind) => (
          <div
            key={ind.name}
            className="bg-white p-3 rounded-xl border border-[#f0f3fa] shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="text-[11px] text-[#6a6d78] font-medium truncate">{ind.name}</div>
            <div className="text-lg font-semibold font-data-mono text-[#131722] mt-1">
              {ind.value}
            </div>
            <div
              className={`text-[11px] font-data-mono font-medium truncate mt-0.5 ${
                ind.trend === 'up'
                  ? 'text-[#089981]'
                  : ind.trend === 'down'
                  ? 'text-[#089981]'
                  : 'text-[#b2b5be]'
              }`}
            >
              {ind.note}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming High-Impact Economic Events Card */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2962ff] text-[20px]">
              calendar_month
            </span>
            <h3 className="text-lg font-semibold text-[#131722]">
              Upcoming High-Impact Economic Events
            </h3>
          </div>
          <span className="text-xs text-[#6a6d78]">Time Zone: GMT-4 (New York)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {upcomingEvents.map((event) => (
            <div
              key={event.title}
              onClick={onOpenCalendar}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpenCalendar()}
              className="bg-[#f8f9fd] hover:bg-[#f1f4fb] p-3 rounded-xl flex items-start justify-between border border-[#f0f3fa] transition-colors cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      event.impact === 'high' ? 'bg-[#f23645]' : 'bg-[#0083d6]'
                    }`}
                  ></span>
                  <span className="font-semibold text-sm text-[#131722]">
                    {event.title}
                  </span>
                </div>
                <div className="text-xs text-[#6a6d78] mt-1">
                  Forecast: {event.forecast} • Previous: {event.previous}
                </div>
              </div>
              <span className="text-xs bg-white px-2 py-1 rounded-lg text-[#131722] font-data-mono font-semibold shadow-2xs border border-[#e0e3eb]/60 whitespace-nowrap ml-2">
                {event.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
