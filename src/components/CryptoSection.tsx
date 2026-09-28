import React from 'react';
import { MarketItem, DefiProtocol } from '../types';

interface CryptoSectionProps {
  cryptoSpotlight: MarketItem[];
  marketCapRanking: Array<{
    rank: number;
    name: string;
    symbol: string;
    price: string;
    changePercent: number;
    marketCap: string;
  }>;
  defiProtocols: DefiProtocol[];
  onSelectItem: (item: MarketItem) => void;
}

export const CryptoSection: React.FC<CryptoSectionProps> = ({
  cryptoSpotlight,
  marketCapRanking,
  defiProtocols,
  onSelectItem,
}) => {
  return (
    <section id="section-crypto" className="flex flex-col gap-4">
      {/* Header and stats */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectItem(cryptoSpotlight[0])}
          type="button"
          className="group flex items-center gap-1.5 text-2xl font-bold text-[#131722] hover:text-[#2962ff] transition-colors cursor-pointer"
        >
          <span>Crypto</span>
          <span className="material-symbols-outlined text-[24px] text-[#6a6d78] group-hover:text-[#2962ff] group-hover:translate-x-0.5 transition-all">
            chevron_right
          </span>
        </button>
        <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#6a6d78]">
          <span>
            24h Vol:{' '}
            <strong className="text-[#131722] font-data-mono font-semibold">$84.2B</strong>
          </span>
          <span>
            BTC Dominance:{' '}
            <strong className="text-[#131722] font-data-mono font-semibold">58.4%</strong>
          </span>
        </div>
      </div>

      {/* Top Crypto Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cryptoSpotlight.map((coin) => {
          const isUp = coin.changePercent > 0;
          const isZero = coin.changePercent === 0;

          return (
            <div
              key={coin.symbol}
              onClick={() => onSelectItem(coin)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectItem(coin)}
              className="bg-white p-3 rounded-xl border border-[#f0f3fa] shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-[#2962ff]/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#131722]">{coin.symbol}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded font-semibold font-data-mono ${
                    isZero
                      ? 'text-[#6a6d78] bg-[#f8f9fd]'
                      : isUp
                      ? 'text-[#089981] bg-[#e8f8f5]'
                      : 'text-[#f23645] bg-[#feecee]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {coin.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="text-[11px] text-[#6a6d78] truncate mt-0.5">{coin.name}</div>
              <div className="text-lg font-semibold font-data-mono text-[#131722] mt-2">
                ${coin.price > 100
                  ? coin.price.toLocaleString('en-US', {
                      minimumFractionDigits: coin.price > 1000 ? 0 : 2,
                      maximumFractionDigits: 2,
                    })
                  : coin.price.toFixed(4)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Crypto Tabbed / Dual Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Market Cap Ranking Table */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa]">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-lg font-semibold text-[#131722]">
              Crypto market cap ranking
            </h3>
            <button
              onClick={() => onSelectItem(cryptoSpotlight[0])}
              type="button"
              className="text-sm font-semibold text-[#2962ff] hover:underline cursor-pointer"
            >
              See all coins
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-[#6a6d78] bg-[#f8f9fd]">
                  <th className="py-2 px-3 rounded-l-lg"># Coin</th>
                  <th className="py-2 px-3 text-right">Price</th>
                  <th className="py-2 px-3 text-right">24h Chg</th>
                  <th className="py-2 px-3 text-right rounded-r-lg">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3fa] text-sm">
                {marketCapRanking.map((coin) => {
                  const isUp = coin.changePercent > 0;
                  const isZero = coin.changePercent === 0;

                  return (
                    <tr
                      key={coin.symbol}
                      onClick={() => {
                        const matched = cryptoSpotlight.find((c) => c.symbol === coin.symbol);
                        if (matched) onSelectItem(matched);
                      }}
                      className="hover:bg-[#f8f9fd] transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5 px-3 font-semibold text-[#131722] group-hover:text-[#2962ff]">
                        {coin.rank}. {coin.name}{' '}
                        <span className="text-[11px] font-normal text-[#b2b5be]">
                          {coin.symbol}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-data-mono text-[#131722]">
                        {coin.price}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-data-mono font-semibold ${
                          isZero
                            ? 'text-[#b2b5be]'
                            : isUp
                            ? 'text-[#089981]'
                            : 'text-[#f23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {coin.changePercent.toFixed(2)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-data-mono text-[#6a6d78]">
                        {coin.marketCap}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* TVL Ranking (DeFi) */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#f0f3fa]">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-lg font-semibold text-[#131722]">TVL Ranking (DeFi)</h3>
            <button
              onClick={() => {
                const aave = cryptoSpotlight.find((c) => c.symbol === 'ETH');
                if (aave) onSelectItem(aave);
              }}
              type="button"
              className="text-sm font-semibold text-[#2962ff] hover:underline cursor-pointer"
            >
              See highest TVL
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-[#6a6d78] bg-[#f8f9fd]">
                  <th className="py-2 px-3 rounded-l-lg">Protocol</th>
                  <th className="py-2 px-3 text-right">Category</th>
                  <th className="py-2 px-3 text-right">Change 7d</th>
                  <th className="py-2 px-3 text-right rounded-r-lg">Total Value Locked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3fa] text-sm">
                {defiProtocols.map((protocol) => {
                  const isUp = protocol.change7d >= 0;
                  return (
                    <tr
                      key={protocol.name}
                      onClick={() => {
                        onSelectItem({
                          symbol: protocol.ticker,
                          name: protocol.name,
                          price: parseFloat(protocol.tvl) * 10,
                          change: isUp ? 2.5 : -1.2,
                          changePercent: protocol.change7d,
                          sparkline: [20, 22, 24, 25],
                          category: 'Crypto',
                          marketCap: `${protocol.tvl} TVL`,
                          rating: isUp ? 'Buy' : 'Neutral',
                        });
                      }}
                      className="hover:bg-[#f8f9fd] transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5 px-3 font-semibold text-[#131722] group-hover:text-[#2962ff]">
                        {protocol.name}{' '}
                        <span className="text-[11px] font-normal text-[#b2b5be]">
                          {protocol.ticker}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#6a6d78] text-xs">
                        {protocol.category}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-data-mono font-semibold ${
                          isUp ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isUp ? '+' : ''}
                        {protocol.change7d.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-data-mono text-[#131722]">
                        {protocol.tvl}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
