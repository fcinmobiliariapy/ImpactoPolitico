import React, { useState, useEffect } from 'react';
import { CurrencyRate, CityWeather } from '../../types';
import { 
  Sun, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Globe, 
  Clock, 
  DollarSign,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface FinancialWeatherBarProps {
  currencies: CurrencyRate[];
  weather: CityWeather[];
  activeLanguage: 'es' | 'en' | 'pt';
  onLanguageChange: (lang: 'es' | 'en' | 'pt') => void;
  onRefreshAi: () => void;
  isAiRefreshing?: boolean;
  onOpenCurrenciesModal?: () => void;
}

export const FinancialWeatherBar: React.FC<FinancialWeatherBarProps> = ({
  currencies,
  weather,
  activeLanguage,
  onLanguageChange,
  onRefreshAi,
  isAiRefreshing = false,
  onOpenCurrenciesModal,
}) => {
  const [currentCityIdx, setCurrentCityIdx] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Live Asunción time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      };
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      const dStr = now.toLocaleDateString('es-PY', dateOptions);
      const tStr = now.toLocaleTimeString('es-PY', timeOptions);
      setCurrentTimeStr(`${dStr.toUpperCase()} · ${tStr} ASU`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Weather city rotator
  useEffect(() => {
    const cityInterval = setInterval(() => {
      setCurrentCityIdx((prev) => (prev + 1) % weather.length);
    }, 5000);
    return () => clearInterval(cityInterval);
  }, [weather.length]);

  const activeWeather = weather[currentCityIdx] || weather[0];

  // Quick primary currencies: USD and BRL
  const usd = currencies.find((c) => c.code === 'USD');
  const brl = currencies.find((c) => c.code === 'BRL');

  return (
    <div className="bg-[#121212] text-white border-b border-neutral-800 text-[11px] font-sans selection:bg-[#D71920]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-1.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {/* Left: Date, Live Time & Weather */}
        <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
          <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-0.5 border border-neutral-800">
            <Clock className="w-3 h-3 text-[#D71920]" />
            <span className="tabular-nums font-semibold tracking-tight text-neutral-300">
              {currentTimeStr || 'ASUNCIÓN · 2026'}
            </span>
          </div>

          {activeWeather && (
            <button 
              onClick={() => setCurrentCityIdx((prev) => (prev + 1) % weather.length)}
              className="flex items-center gap-1 px-2 py-0.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
              title="Rotar ciudad"
            >
              <Sun className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="font-sans font-bold text-neutral-200">{activeWeather.city}:</span>
              <span className="font-mono tabular-nums font-bold text-amber-300">{activeWeather.tempC}°</span>
            </button>
          )}
        </div>

        {/* Center: Sleek Currency Snapshot with Quick Link to Full Rates */}
        <div className="hidden md:flex items-center gap-2 font-mono shrink-0">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
            Mercado Gs:
          </span>

          {usd && (
            <div 
              onClick={onOpenCurrenciesModal}
              className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
              title="USD en Asunción · Clic para ver panel completo"
            >
              <span className="text-xs">🇺🇸</span>
              <span className="font-bold text-neutral-200">USD:</span>
              <span className="font-black text-white tabular-nums">₲ {usd.sellPYG.toLocaleString()}</span>
              <span className={`text-[10px] font-bold ${usd.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {usd.change24h > 0 ? `+${usd.change24h}` : usd.change24h}%
              </span>
            </div>
          )}

          {brl && (
            <div 
              onClick={onOpenCurrenciesModal}
              className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
              title="Real Brasileño en Asunción · Clic para ver panel completo"
            >
              <span className="text-xs">🇧🇷</span>
              <span className="font-bold text-neutral-200">BRL:</span>
              <span className="font-black text-white tabular-nums">₲ {brl.sellPYG.toLocaleString()}</span>
            </div>
          )}

          {onOpenCurrenciesModal && (
            <button
              onClick={onOpenCurrenciesModal}
              className="flex items-center gap-1 text-[10px] text-[#D71920] hover:text-white font-bold uppercase transition-colors px-1"
            >
              <span>Ver Todas (5)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Right: AI Refresh & Language Switcher */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          {/* Quick Cotizaciones pill for mobile */}
          {onOpenCurrenciesModal && (
            <button
              onClick={onOpenCurrenciesModal}
              className="md:hidden flex items-center gap-1 px-2 py-0.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-bold font-mono text-[10px]"
            >
              <DollarSign className="w-3 h-3" />
              <span>USD: {usd ? usd.sellPYG.toLocaleString() : '7.960'}</span>
            </button>
          )}

          <button
            onClick={onRefreshAi}
            disabled={isAiRefreshing}
            className="flex items-center gap-1 px-2 py-0.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[10px] font-bold text-[#D71920] uppercase transition-colors disabled:opacity-50"
            title="Actualizar datos con IA"
          >
            <Sparkles className={`w-3 h-3 ${isAiRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isAiRefreshing ? '...' : 'IA'}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-neutral-900 border border-neutral-700 p-0.5 text-[9px] font-bold uppercase">
            <Globe className="w-2.5 h-2.5 text-neutral-400 mx-1" />
            {(['es', 'en', 'pt'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-1.5 py-0.2 transition-colors ${
                  activeLanguage === lang
                    ? 'bg-[#D71920] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
