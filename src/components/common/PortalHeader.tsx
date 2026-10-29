import React, { useState } from 'react';
import { ImpactoLogo } from '../brand/ImpactoLogo';
import { Advertisement, NewsArticle } from '../../types';
import { 
  Search, 
  Menu, 
  X, 
  ExternalLink, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Share2,
  SlidersHorizontal,
  BookOpen,
  Bookmark,
  DollarSign,
  Zap,
  TrendingUp
} from 'lucide-react';

interface PortalHeaderProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  breakingNewsArticle?: NewsArticle;
  onSelectArticle: (article: NewsArticle) => void;
  headerAd?: Advertisement;
  onAdClick?: (ad: Advertisement) => void;
  onOpenBrandManual: () => void;
  onOpenSocialStudio: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCurrenciesModal?: () => void;
  onOpenSavedDrawer?: () => void;
  savedArticlesCount?: number;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  activeCategory,
  onSelectCategory,
  breakingNewsArticle,
  onSelectArticle,
  headerAd,
  onAdClick,
  onOpenBrandManual,
  onOpenSocialStudio,
  onOpenAdmin,
  searchQuery,
  onSearchChange,
  onOpenCurrenciesModal,
  onOpenSavedDrawer,
  savedArticlesCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { id: 'todos', label: 'Portada' },
    { id: 'politica', label: 'Política' },
    { id: 'congreso', label: 'Congreso' },
    { id: 'gobierno', label: 'Gobierno' },
    { id: 'economia', label: 'Economía' },
    { id: 'investigacion', label: 'Investigación' },
    { id: 'municipales', label: 'Municipales' },
    { id: 'opinion', label: 'Editorial' },
    { id: 'elecciones', label: 'Elecciones' },
    { id: 'internacionales', label: 'Internacionales' },
    { id: 'deportes', label: 'Deportes' },
  ];

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs">
      {/* Top Brand & Institutional Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 md:py-3.5 flex items-center justify-between gap-3 md:gap-6">
        {/* Zone 1: Master Brand Logo */}
        <div 
          onClick={() => onSelectCategory('todos')}
          className="cursor-pointer shrink-0 py-0.5"
        >
          <ImpactoLogo variant="horizontal" size="md" showSlogan={true} />
        </div>

        {/* Center: Top Header Ad Banner (Leaderboard format) */}
        {headerAd && headerAd.active && (
          <div className="hidden lg:flex flex-1 justify-center max-w-xl">
            <a
              href={headerAd.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAdClick && onAdClick(headerAd)}
              className="w-full bg-neutral-50 hover:bg-neutral-100 p-2 border border-neutral-200 flex items-center justify-between text-xs transition-colors group"
            >
              <div className="pr-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">
                  PUBLICIDAD INSTITUCIONAL
                </span>
                <span className="font-bold text-neutral-900 group-hover:text-[#D71920] line-clamp-1">
                  {headerAd.title}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {headerAd.advertiser}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black shrink-0" />
            </a>
          </div>
        )}

        {/* Zone 3: Quick Navigation Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Cotizaciones button (Desktop & Tablet) */}
          {onOpenCurrenciesModal && (
            <button
              onClick={onOpenCurrenciesModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 transition-colors"
              title="Abrir cotizaciones de monedas"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cotización Gs.</span>
            </button>
          )}

          {/* Social links icons */}
          <div className="hidden md:flex items-center gap-1 text-neutral-500 mr-1">
            <a
              href="https://x.com/impactopoliticopy"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:text-black hover:bg-neutral-100 transition-colors"
              title="X / Twitter"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://facebook.com/impactopoliticopy"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com/impactopoliticopy"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Saved Articles Bookmark Trigger */}
          {onOpenSavedDrawer && (
            <button
              onClick={onOpenSavedDrawer}
              className="p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors relative"
              title="Ver noticias guardadas"
            >
              <Bookmark className="w-4 h-4" />
              {savedArticlesCount > 0 && (
                <span className="absolute 1 top-1 right-1 bg-[#D71920] text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {savedArticlesCount}
                </span>
              )}
            </button>
          )}

          {/* Brand Manual (desktop) */}
          <button
            onClick={onOpenBrandManual}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-neutral-300 hover:border-black text-neutral-800 transition-colors whitespace-nowrap"
            title="Manual oficial de marca"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D71920]" />
            <span>Marca</span>
          </button>

          {/* Social Studio (desktop) */}
          <button
            onClick={onOpenSocialStudio}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-neutral-300 hover:border-black text-neutral-800 transition-colors whitespace-nowrap"
            title="Generador de plantillas para redes sociales"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-700" />
            <span>Redes Studio</span>
          </button>

          {/* Admin panel */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase bg-[#D71920] hover:bg-red-700 text-white transition-colors shadow-xs whitespace-nowrap"
            title="Panel de redacción y administración CMS"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* Search trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors"
            title="Buscar noticias"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-neutral-800 hover:bg-neutral-100"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Search Bar */}
      {searchOpen && (
        <div className="bg-neutral-50 border-t border-neutral-200 px-4 md:px-6 py-2.5 animate-fadeIn">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por palabras clave, político, ley o tema en Asunción y departamentos..."
              className="w-full bg-white px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-[#D71920] font-sans"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-neutral-500 font-bold uppercase shrink-0 px-2"
              >
                Limpiar
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Editorial Navigation Bar */}
      <nav className="border-t border-neutral-200 bg-white hidden lg:block overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                activeCategory === cat.id
                  ? 'border-[#D71920] text-[#D71920]'
                  : 'border-transparent text-neutral-700 hover:text-black hover:border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Swipeable Category Pills Strip (Immediate 1-tap switching on phones!) */}
      <div className="lg:hidden border-t border-neutral-100 bg-neutral-50/90 px-3 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1 text-[11px] font-bold uppercase tracking-tight whitespace-nowrap shrink-0 transition-all rounded-full ${
              activeCategory === cat.id
                ? 'bg-[#D71920] text-white shadow-xs'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile Drawer Menu (For secondary actions) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-4 space-y-4 animate-slideDown shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 text-left text-xs font-bold uppercase rounded-xs transition-colors ${
                  activeCategory === cat.id ? 'bg-red-50 text-[#D71920]' : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
            {onOpenCurrenciesModal && (
              <button
                onClick={() => {
                  onOpenCurrenciesModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left p-2.5 text-xs font-semibold flex items-center justify-between text-neutral-800 bg-neutral-50 border border-neutral-200"
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Pizarra y Conversor de Divisas</span>
                </div>
                <span className="text-[10px] font-bold text-neutral-500 font-mono">Gs.</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenBrandManual();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 text-xs font-semibold flex items-center gap-2 text-neutral-800 hover:bg-neutral-50"
            >
              <BookOpen className="w-4 h-4 text-[#D71920]" />
              <span>Manual de Identidad Oficial</span>
            </button>

            <button
              onClick={() => {
                onOpenSocialStudio();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 text-xs font-semibold flex items-center gap-2 text-neutral-800 hover:bg-neutral-50"
            >
              <Share2 className="w-4 h-4 text-neutral-700" />
              <span>Estudio de Redes Sociales</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 text-xs font-bold uppercase flex items-center gap-2 bg-[#D71920] text-white"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Panel CMS de Redacción</span>
            </button>
          </div>
        </div>
      )}

      {/* Breaking News Ribbon (Último Momento) */}
      {breakingNewsArticle && (
        <div className="bg-[#171717] text-white border-t border-neutral-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-1.5 md:py-2 flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 bg-[#D71920] px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>ÚLTIMO MOMENTO</span>
            </div>

            <button
              onClick={() => onSelectArticle(breakingNewsArticle)}
              className="text-[11px] sm:text-xs font-medium text-neutral-200 hover:text-white truncate text-left transition-colors flex-1"
            >
              <span className="font-bold text-white mr-1.5">[{breakingNewsArticle.kicker}]</span>
              <span>{breakingNewsArticle.title}</span>
            </button>

            <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline shrink-0">
              {new Date(breakingNewsArticle.publishedAt).toLocaleTimeString('es-PY', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              HS
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
