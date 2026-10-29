import React from 'react';
import { 
  Home, 
  DollarSign, 
  Bookmark, 
  Vote, 
  Zap, 
  Menu,
  SlidersHorizontal
} from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onGoHome: () => void;
  onOpenCurrencies: () => void;
  onOpenSaved: () => void;
  onOpenPoll: () => void;
  onOpenBreaking: () => void;
  onOpenAdmin: () => void;
  savedCount: number;
  hasBreakingNews?: boolean;
  isLoggedIn?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onGoHome,
  onOpenCurrencies,
  onOpenSaved,
  onOpenPoll,
  onOpenBreaking,
  onOpenAdmin,
  savedCount,
  hasBreakingNews = false,
  isLoggedIn = false,
}) => {
  return (
    <nav 
      aria-label="Navegación Móvil Principal"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-1 py-1.5 flex items-center justify-around safe-bottom"
    >
      {/* 1. Portada */}
      <button
        onClick={onGoHome}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors relative ${
          currentView === 'portal' ? 'text-[#D71920]' : 'text-neutral-500 hover:text-black'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-tight mt-0.5">Portada</span>
        {currentView === 'portal' && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] absolute -top-0.5" />
        )}
      </button>

      {/* 2. Cotizaciones (New dedicated mobile place for exchange rates) */}
      <button
        onClick={onOpenCurrencies}
        className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-neutral-600 hover:text-black transition-colors relative"
      >
        <div className="relative">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <span className="absolute -top-1 -right-2 text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded-xs">
            Gs.
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-tight mt-0.5">Cotización</span>
      </button>

      {/* 3. Alertas / Último momento */}
      <button
        onClick={onOpenBreaking}
        className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-neutral-600 hover:text-black transition-colors relative"
      >
        <div className="relative">
          <Zap className="w-5 h-5 text-amber-500" />
          {hasBreakingNews && (
            <span className="w-2 h-2 rounded-full bg-[#D71920] absolute -top-0.5 -right-0.5 animate-ping" />
          )}
        </div>
        <span className="text-[10px] font-bold tracking-tight mt-0.5">Alertas</span>
      </button>

      {/* 4. Encuesta */}
      <button
        onClick={onOpenPoll}
        className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-neutral-600 hover:text-black transition-colors"
      >
        <Vote className="w-5 h-5 text-blue-600" />
        <span className="text-[10px] font-bold tracking-tight mt-0.5">Encuesta</span>
      </button>

      {/* 5. Guardados / Bookmarks */}
      <button
        onClick={onOpenSaved}
        className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-neutral-600 hover:text-black transition-colors relative"
      >
        <div className="relative">
          <Bookmark className="w-5 h-5" />
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#D71920] text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {savedCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold tracking-tight mt-0.5">Guardados</span>
      </button>

      {/* 6. Admin Panel / CMS */}
      <button
        onClick={onOpenAdmin}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors relative ${
          currentView === 'admin' ? 'text-[#D71920]' : 'text-neutral-500 hover:text-black'
        }`}
      >
        <div className="relative">
          <SlidersHorizontal className="w-5 h-5" />
          {isLoggedIn && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5" />
          )}
        </div>
        <span className="text-[10px] font-bold tracking-tight mt-0.5">
          {isLoggedIn ? 'CMS' : 'Admin'}
        </span>
      </button>
    </nav>
  );
};
