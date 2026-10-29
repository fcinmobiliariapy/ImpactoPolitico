import React, { useState } from 'react';
import { CurrencyRate, CityWeather } from '../../types';
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  Calculator, 
  RefreshCw, 
  Copy, 
  Check, 
  Building2, 
  ShieldCheck, 
  ArrowUpDown, 
  Sun, 
  Clock 
} from 'lucide-react';

interface CurrencyDrawerModalProps {
  currencies: CurrencyRate[];
  weather?: CityWeather[];
  isOpen: boolean;
  onClose: () => void;
  onRefreshAi: () => void;
  isAiRefreshing?: boolean;
}

export const CurrencyDrawerModal: React.FC<CurrencyDrawerModalProps> = ({
  currencies,
  weather,
  isOpen,
  onClose,
  onRefreshAi,
  isAiRefreshing = false,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [calcCode, setCalcCode] = useState<string>('USD');
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [calcDirection, setCalcDirection] = useState<'foreignToPyg' | 'pygToForeign'>('foreignToPyg');
  const [calcOp, setCalcOp] = useState<'sell' | 'buy'>('sell');

  if (!isOpen) return null;

  const activeCurr = currencies.find((c) => c.code === calcCode) || currencies[0];
  const activeRate = calcOp === 'sell' ? activeCurr.sellPYG : activeCurr.buyPYG;

  const resultConversion =
    calcDirection === 'foreignToPyg'
      ? Math.round(calcAmount * activeRate)
      : Number((calcAmount / activeRate).toFixed(2));

  const handleCopyRate = (curr: CurrencyRate) => {
    const text = `${curr.flag} ${curr.code}/PYG: Compra ₲ ${curr.buyPYG.toLocaleString()} | Venta ₲ ${curr.sellPYG.toLocaleString()} (${curr.change24h > 0 ? '+' : ''}${curr.change24h}%) - Impacto Político Paraguay`;
    navigator.clipboard?.writeText(text);
    setCopiedCode(curr.code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end md:justify-center items-end md:items-center p-0 md:p-4 animate-fadeIn">
      <div 
        className="bg-neutral-900 text-white w-full max-w-xl max-h-[92vh] md:max-h-[85vh] flex flex-col border border-neutral-700 shadow-2xl overflow-hidden rounded-t-2xl md:rounded-lg animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 md:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 bg-[#D71920]" />
            <div>
              <h3 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                <span>Pizarra de Cotizaciones</span>
                <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.2 border border-red-800">
                  EN VIVO
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">
                Guaraníes paraguayos (₲) · Asunción & BCP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onRefreshAi}
              disabled={isAiRefreshing}
              className="p-2 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-800 rounded-sm"
              title="Actualizar tasas"
            >
              <RefreshCw className={`w-4 h-4 ${isAiRefreshing ? 'animate-spin text-[#D71920]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors border border-neutral-800 rounded-sm"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6">
          {/* Table of Rates */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2">
              <span>Moneda Extranjera</span>
              <div className="flex gap-8">
                <span>Compra</span>
                <span className="text-[#D71920]">Venta</span>
                <span className="w-8 text-right">Copiar</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {currencies.map((curr) => {
                const isPos = curr.change24h >= 0;
                return (
                  <div
                    key={curr.code}
                    className="p-3 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/70 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl leading-none">{curr.flag}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-sm font-bold text-white font-mono">{curr.code}</strong>
                          <span
                            className={`text-[9px] font-mono font-bold flex items-center ${
                              isPos ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {isPos ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                            {curr.change24h > 0 ? `+${curr.change24h}` : curr.change24h}%
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-400 block">{curr.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
                      <div className="text-right">
                        <span className="text-neutral-300 font-semibold">
                          ₲ {curr.buyPYG.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-white font-black text-sm bg-neutral-900/80 px-2 py-0.5 border border-neutral-700">
                          ₲ {curr.sellPYG.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyRate(curr)}
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                        title="Copiar cotización"
                      >
                        {copiedCode === curr.code ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Calculator inside Drawer */}
          <div className="bg-neutral-950 p-4 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#D71920]" />
                <span>Calculadora Rápida</span>
              </span>
              <div className="flex gap-1">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCalcCode(c.code)}
                    className={`px-2 py-1 text-[11px] font-bold font-mono transition-colors ${
                      calcCode === c.code
                        ? 'bg-[#D71920] text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-5 space-y-1">
                <label className="text-[10px] text-neutral-400 font-mono block uppercase">
                  {calcDirection === 'foreignToPyg' ? `Monto en ${activeCurr.code}` : 'Monto en Gs.'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={calcAmount || ''}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-[#D71920]"
                />
              </div>

              <div className="sm:col-span-2 flex justify-center">
                <button
                  onClick={() =>
                    setCalcDirection((p) => (p === 'foreignToPyg' ? 'pygToForeign' : 'foreignToPyg'))
                  }
                  className="p-2 bg-neutral-800 hover:bg-[#D71920] text-white border border-neutral-700 rounded-full transition-colors"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="sm:col-span-5 space-y-1">
                <label className="text-[10px] text-neutral-400 font-mono block uppercase">
                  {calcDirection === 'foreignToPyg' ? 'Total en Guaraníes (₲)' : `Total en ${activeCurr.code}`}
                </label>
                <div className="bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm font-black font-mono text-[#D71920]">
                  {calcDirection === 'foreignToPyg'
                    ? `₲ ${resultConversion.toLocaleString()}`
                    : `${activeCurr.symbol} ${resultConversion.toLocaleString()}`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#D71920]" />
            <span>Mercado cambiario de Asunción</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
