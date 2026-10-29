import React, { useState } from 'react';
import { CurrencyRate } from '../../types';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown, 
  Calculator, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Building2,
  DollarSign,
  ChevronRight
} from 'lucide-react';

interface CurrencyMarketSectionProps {
  currencies: CurrencyRate[];
  onRefreshAi: () => void;
  isAiRefreshing?: boolean;
  onOpenFullModal?: () => void;
}

export const CurrencyMarketSection: React.FC<CurrencyMarketSectionProps> = ({
  currencies,
  onRefreshAi,
  isAiRefreshing = false,
  onOpenFullModal,
}) => {
  const [activeTab, setActiveTab] = useState<'rates' | 'calculator'>('rates');
  
  // Converter state
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('USD');
  const [amount, setAmount] = useState<number>(100);
  const [operation, setOperation] = useState<'buy' | 'sell'>('sell'); // 'sell' = Casa de cambio sells to client (user buys foreign)
  const [direction, setDirection] = useState<'foreignToPyg' | 'pygToForeign'>('foreignToPyg');

  const selectedCurrency = currencies.find((c) => c.code === selectedCurrencyCode) || currencies[0];
  const rateToUse = operation === 'sell' ? selectedCurrency.sellPYG : selectedCurrency.buyPYG;

  const calculateConversion = () => {
    if (!amount || amount <= 0) return 0;
    if (direction === 'foreignToPyg') {
      return Math.round(amount * rateToUse);
    } else {
      return Number((amount / rateToUse).toFixed(2));
    }
  };

  const convertedValue = calculateConversion();

  return (
    <section className="bg-gradient-to-br from-neutral-900 via-[#18181b] to-neutral-900 text-white border-y border-neutral-800 shadow-md my-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header of Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D71920] rounded-xs" />
              <span className="text-xs font-black uppercase tracking-widest text-[#D71920]">
                MESA DE DINERO & MERCADOS
              </span>
              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 font-mono border border-neutral-700">
                ASUNCIÓN / BCP
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white font-sans">
              Cotizaciones Oficiales en Guaraníes (₲)
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Promedio de casas de cambio autorizadas de Asunción y Ciudad del Este en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Tab switch */}
            <div className="bg-neutral-800 p-1 rounded-sm flex items-center border border-neutral-700 text-xs font-bold">
              <button
                onClick={() => setActiveTab('rates')}
                className={`px-3 py-1.5 rounded-xs transition-colors ${
                  activeTab === 'rates'
                    ? 'bg-[#D71920] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Pizarra Completa
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-3 py-1.5 rounded-xs flex items-center gap-1.5 transition-colors ${
                  activeTab === 'calculator'
                    ? 'bg-[#D71920] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Conversor</span>
              </button>
            </div>

            <button
              onClick={onRefreshAi}
              disabled={isAiRefreshing}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 hover:text-white transition-colors disabled:opacity-50"
              title="Actualizar cotizaciones en vivo con IA"
            >
              <RefreshCw className={`w-4 h-4 ${isAiRefreshing ? 'animate-spin text-[#D71920]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        {activeTab === 'rates' ? (
          <div className="pt-6">
            {/* Mobile swipeable & desktop grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {currencies.map((curr) => {
                const isPositive = curr.change24h >= 0;
                return (
                  <div
                    key={curr.code}
                    onClick={() => {
                      setSelectedCurrencyCode(curr.code);
                      setActiveTab('calculator');
                    }}
                    className="group bg-neutral-800/80 hover:bg-neutral-800 p-3.5 md:p-4 border border-neutral-700/80 hover:border-neutral-500 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Top flag and code */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xl leading-none select-none">{curr.flag}</span>
                          <div>
                            <span className="text-sm font-black text-white block leading-tight">
                              {curr.code}
                            </span>
                            <span className="text-[10px] text-neutral-400 truncate max-w-[90px] block">
                              {curr.name}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-xs font-mono font-bold flex items-center gap-0.5 ${
                            isPositive
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950/80 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-2.5 h-2.5" />
                          ) : (
                            <TrendingDown className="w-2.5 h-2.5" />
                          )}
                          {curr.change24h > 0 ? `+${curr.change24h}` : curr.change24h}%
                        </span>
                      </div>

                      {/* Buy / Sell values */}
                      <div className="space-y-1.5 pt-2 border-t border-neutral-700/60 font-mono">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-neutral-400 text-[10px] uppercase">Compra</span>
                          <span className="font-bold text-neutral-200">
                            ₲ {curr.buyPYG.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-[#D71920] font-bold text-[10px] uppercase">Venta</span>
                          <span className="font-extrabold text-white text-sm tabular-nums">
                            ₲ {curr.sellPYG.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-700/40 flex items-center justify-between text-[10px] text-neutral-400 group-hover:text-neutral-200">
                      <span>Calcular cambio</span>
                      <ChevronRight className="w-3 h-3 text-[#D71920]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom info banner */}
            <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tipo de cambio referencial minorista de Asunción. Sin comisiones bancarias adicionales.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-neutral-500">Spread promedio: 0.6%</span>
                {onOpenFullModal && (
                  <button
                    onClick={onOpenFullModal}
                    className="text-[#D71920] hover:text-white font-bold underline transition-colors"
                  >
                    Abrir panel interactivo
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Calculator Tab */
          <div className="pt-6">
            <div className="bg-neutral-800/90 p-5 md:p-6 border border-neutral-700 max-w-3xl mx-auto space-y-6">
              {/* Currency selectors */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-300 block">
                  Seleccionar Moneda:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setSelectedCurrencyCode(c.code)}
                      className={`p-2 border text-left flex items-center gap-2 transition-all ${
                        selectedCurrencyCode === c.code
                          ? 'border-[#D71920] bg-neutral-900 shadow-sm'
                          : 'border-neutral-700 bg-neutral-800/60 hover:bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      <span className="text-lg leading-none">{c.flag}</span>
                      <div>
                        <strong className="text-xs block text-white font-mono">{c.code}</strong>
                        <span className="text-[9px] text-neutral-400 truncate block">₲ {c.sellPYG.toLocaleString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversion Controls */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Input Amount */}
                <div className="md:col-span-5 space-y-1">
                  <label className="text-xs font-bold uppercase text-neutral-400 block font-mono">
                    {direction === 'foreignToPyg' ? `Monto en ${selectedCurrency.code}:` : 'Monto en Guaraníes (₲):'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-neutral-900 text-white px-3 py-2.5 text-base font-bold font-mono border border-neutral-700 focus:outline-none focus:border-[#D71920]"
                      placeholder="Ingresar monto..."
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-mono text-neutral-400">
                      {direction === 'foreignToPyg' ? selectedCurrency.symbol : 'Gs.'}
                    </span>
                  </div>
                </div>

                {/* Flip Direction Button */}
                <div className="md:col-span-2 flex justify-center pt-2 md:pt-4">
                  <button
                    onClick={() =>
                      setDirection((prev) =>
                        prev === 'foreignToPyg' ? 'pygToForeign' : 'foreignToPyg'
                      )
                    }
                    className="p-2.5 bg-neutral-900 hover:bg-[#D71920] text-white border border-neutral-700 hover:border-[#D71920] transition-colors rounded-full shadow-sm"
                    title="Invertir sentido de conversión"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Result */}
                <div className="md:col-span-5 space-y-1">
                  <label className="text-xs font-bold uppercase text-neutral-400 block font-mono">
                    {direction === 'foreignToPyg' ? 'Resultado en Guaraníes (₲):' : `Equivalente en ${selectedCurrency.code}:`}
                  </label>
                  <div className="bg-neutral-900/90 border border-neutral-700 px-3 py-2 text-base md:text-lg font-black font-mono text-white flex items-center justify-between">
                    <span className="text-[#D71920] truncate">
                      {direction === 'foreignToPyg'
                        ? `₲ ${convertedValue.toLocaleString()}`
                        : `${selectedCurrency.symbol} ${convertedValue.toLocaleString()}`}
                    </span>
                    <span className="text-[10px] uppercase font-sans text-neutral-400 shrink-0 ml-2">
                      Tasa: {rateToUse.toLocaleString()} Gs.
                    </span>
                  </div>
                </div>
              </div>

              {/* Operation type (Buy or Sell) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-neutral-700/80">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 font-bold uppercase text-[10px]">Operación:</span>
                  <button
                    onClick={() => setOperation('sell')}
                    className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                      operation === 'sell'
                        ? 'bg-[#D71920] text-white'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Quiero Comprar Divisas (Venta Casa)
                  </button>
                  <button
                    onClick={() => setOperation('buy')}
                    className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                      operation === 'buy'
                        ? 'bg-neutral-700 text-white'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Quiero Vender Divisas (Compra Casa)
                  </button>
                </div>

                <div className="text-[11px] text-neutral-400 font-mono">
                  1 {selectedCurrency.code} = ₲ {rateToUse.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
