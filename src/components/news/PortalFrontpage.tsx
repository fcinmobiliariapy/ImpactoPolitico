import React from 'react';
import { NewsArticle, Advertisement, WeeklyPoll, CurrencyRate } from '../../types';
import { ImpactoLogo } from '../brand/ImpactoLogo';
import { WeeklyPollCard } from './WeeklyPollCard';
import { CurrencyMarketSection } from '../finance/CurrencyMarketSection';
import { 
  Clock, 
  Share2, 
  TrendingUp, 
  ExternalLink, 
  Quote, 
  Video, 
  Flame, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight,
  Vote,
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface PortalFrontpageProps {
  articles: NewsArticle[];
  ads: Advertisement[];
  poll: WeeklyPoll;
  currencies: CurrencyRate[];
  onRefreshAi: () => void;
  isAiRefreshing?: boolean;
  onVotePoll: (pollId: string, optionId: string) => void;
  onSelectArticle: (article: NewsArticle) => void;
  onAdClick?: (ad: Advertisement) => void;
  activeLanguage: 'es' | 'en' | 'pt';
  savedArticleIds?: string[];
  onToggleBookmark?: (articleId: string) => void;
  onOpenCurrenciesModal?: () => void;
}

export const PortalFrontpage: React.FC<PortalFrontpageProps> = ({
  articles,
  ads,
  poll,
  currencies,
  onRefreshAi,
  isAiRefreshing = false,
  onVotePoll,
  onSelectArticle,
  onAdClick,
  activeLanguage,
  savedArticleIds = [],
  onToggleBookmark,
  onOpenCurrenciesModal,
}) => {
  // Find lead story (or fallback to first)
  const leadArticle = articles.find((a) => a.isLeadStory) || articles[0];
  const secondaryArticles = articles.filter((a) => a.id !== leadArticle?.id);

  // Categorized slices
  const breakingList = articles.filter((a) => a.isBreaking);
  const investigativeArticles = articles.filter((a) => a.category === 'investigacion');
  const politicsArticles = articles.filter((a) => a.category === 'politica' || a.category === 'congreso');
  const economyArticles = articles.filter((a) => a.category === 'economia');
  const interviewsArticles = articles.filter((a) => a.category === 'entrevistas');
  const sportsArticles = articles.filter((a) => a.category === 'deportes');
  
  // Most read articles (sorted by viewsCount)
  const mostReadArticles = [...articles].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5);

  // Ads
  const middleAd = ads.find((a) => a.location === 'frontpage_middle' && a.active);
  const sidebarAd = ads.find((a) => a.location === 'sidebar' && a.active);

  // WhatsApp share helper
  const handleWhatsAppShare = (e: React.MouseEvent, art: NewsArticle) => {
    e.stopPropagation();
    const text = `*${art.title}*\n${art.summary}\nLeé la nota en Impacto Político: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Translations
  const t = {
    es: {
      leadKicker: 'NOTICIA PRINCIPAL DEL DÍA',
      mostRead: 'Lo Más Leído',
      investigations: 'Unidad de Investigación',
      politics: 'Política Nacional & Congreso',
      economy: 'Economía & Negocios',
      interviews: 'Entrevistas Exclusivas',
      sports: 'Deportes',
      quoteTitle: 'Frase Destacada del Día',
      readMore: 'Leer nota completa',
      viewDossier: 'Ver expediente completo',
    },
    en: {
      leadKicker: 'LEAD STORY OF THE DAY',
      mostRead: 'Most Read Stories',
      investigations: 'Investigative Unit',
      politics: 'National Politics & Congress',
      economy: 'Economy & Markets',
      interviews: 'Exclusive Interviews',
      sports: 'Sports & Society',
      quoteTitle: 'Quote of the Day',
      readMore: 'Read full story',
      viewDossier: 'View full dossier',
    },
    pt: {
      leadKicker: 'NOTÍCIA PRINCIPAL DO DIA',
      mostRead: 'Mais Lidas',
      investigations: 'Unidade de Investigação',
      politics: 'Política Nacional e Congresso',
      economy: 'Economia e Negócios',
      interviews: 'Entrevistas Exclusivas',
      sports: 'Esportes',
      quoteTitle: 'Frase em Destaque do Dia',
      readMore: 'Ler notícia completa',
      viewDossier: 'Ver dossiê completo',
    },
  }[activeLanguage];

  return (
    <div className="space-y-6 md:space-y-10 pb-16">
      {/* ======================================================== */}
      {/* SECTION 1: LEAD HERO STORY (Noticia Destacada de Gran Tamaño) */}
      {/* Mobile-optimized visual hierarchy & touch actions */}
      {/* ======================================================== */}
      {leadArticle && (
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left: Lead text & hierarchy (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D71920]">
                      <span className="bg-red-50 text-[#D71920] px-2 py-0.5 border border-red-200">
                        {leadArticle.kicker || t.leadKicker}
                      </span>
                      <span aria-hidden="true" className="text-neutral-300">·</span>
                      <span className="text-neutral-500 font-normal font-mono text-[11px]">
                        {leadArticle.readingTimeMinutes} min de lectura
                      </span>
                    </div>

                    {/* Bookmark action */}
                    {onToggleBookmark && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(leadArticle.id);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-[#D71920] transition-colors"
                        title={savedArticleIds.includes(leadArticle.id) ? 'Quitar de guardados' : 'Guardar para leer después'}
                      >
                        {savedArticleIds.includes(leadArticle.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-[#D71920]" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  <h1
                    onClick={() => onSelectArticle(leadArticle)}
                    className="text-2xl sm:text-3xl lg:text-[40px] font-black uppercase tracking-tight text-[#171717] leading-[1.12] font-sans hover:text-[#D71920] transition-colors cursor-pointer text-balance"
                  >
                    {leadArticle.title}
                  </h1>

                  <p className="text-sm md:text-base text-neutral-700 font-normal leading-relaxed font-sans line-clamp-4">
                    {leadArticle.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] uppercase font-mono">
                      {leadArticle.author.name.slice(0, 2)}
                    </div>
                    <span className="font-bold text-neutral-900">Por {leadArticle.author.name}</span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="text-neutral-500 font-mono text-[11px]">
                      {new Date(leadArticle.publishedAt).toLocaleTimeString('es-PY', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      HS
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleWhatsAppShare(e, leadArticle)}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors rounded-sm"
                      title="Compartir por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectArticle(leadArticle)}
                      className="inline-flex items-center gap-1 font-bold text-[#D71920] hover:text-black uppercase text-xs transition-colors"
                    >
                      <span>{t.readMore}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Featured High-Res Visual (7 cols on lg) */}
              <div
                onClick={() => onSelectArticle(leadArticle)}
                className="lg:col-span-7 cursor-pointer group relative overflow-hidden bg-neutral-100 border border-neutral-300 min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]"
              >
                <img
                  src={leadArticle.imageUrl}
                  alt={leadArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {leadArticle.imageCaption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-xs font-serif italic">
                    {leadArticle.imageCaption}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: NEW PROMINENT LOCATION FOR CURRENCIES          */}
      {/* "la cotización de monedas en otra posición"               */}
      {/* Full interactive Currency Board & Guaraníes Converter     */}
      {/* ======================================================== */}
      <CurrencyMarketSection
        currencies={currencies}
        onRefreshAi={onRefreshAi}
        isAiRefreshing={isAiRefreshing}
        onOpenFullModal={onOpenCurrenciesModal}
      />

      {/* ======================================================== */}
      {/* SECTION 3: CORE NEWSPAPER GRID (POLITICS, INVESTIGATION & SIDEBAR) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area: 8 Columns */}
          <div className="lg:col-span-8 space-y-10">
            {/* National Politics & Congress Strip */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-[#171717]">
                <h2 className="text-base font-extrabold uppercase tracking-tight text-[#171717] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#D71920]" />
                  <span>{t.politics}</span>
                </h2>
                <span className="text-xs text-neutral-500 font-mono uppercase">
                  Actualización Continua
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {politicsArticles.slice(0, 4).map((art) => (
                  <article
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="cursor-pointer group flex flex-col justify-between space-y-3 bg-white p-4 border border-neutral-200 hover:border-black transition-all hover:shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 relative">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Bookmark quick button */}
                        {onToggleBookmark && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(art.id);
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-xs text-neutral-700 hover:text-[#D71920] shadow-sm transition-colors"
                            title="Guardar"
                          >
                            {savedArticleIds.includes(art.id) ? (
                              <BookmarkCheck className="w-3.5 h-3.5 text-[#D71920]" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                        <span className="text-[#D71920] font-bold uppercase">{art.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{art.readingTimeMinutes} min</span>
                      </div>

                      <h3 className="text-sm md:text-base font-bold text-[#171717] group-hover:text-[#D71920] transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 font-sans">
                        {art.summary}
                      </p>
                    </div>

                    <div className="text-[11px] text-neutral-500 font-mono pt-2 border-t border-neutral-100 flex justify-between items-center">
                      <span className="truncate max-w-[120px]">{art.author.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleWhatsAppShare(e, art)}
                          className="text-emerald-600 hover:text-emerald-700 p-1"
                          title="Compartir por WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <span>
                          {new Date(art.publishedAt).toLocaleDateString('es-PY', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Middle Frontpage Ad Banner */}
            {middleAd && middleAd.active && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 text-center space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 block">
                  ESPACIO PUBLICITARIO
                </span>
                <a
                  href={middleAd.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onAdClick && onAdClick(middleAd)}
                  className="block p-4 bg-white border border-neutral-200 hover:border-black transition-colors"
                >
                  <h4 className="text-sm font-black text-[#171717] uppercase tracking-tight">
                    {middleAd.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    Anunciado por: <strong>{middleAd.advertiser}</strong>
                  </p>
                </a>
              </div>
            )}

            {/* Special Investigation Dossier Block (High editorial broadsheet style) */}
            <div className="bg-[#171717] text-white p-5 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#D71920]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D71920]">
                    {t.investigations}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase font-mono">
                  Dossier Especial
                </span>
              </div>

              {investigativeArticles.slice(0, 1).map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => onSelectArticle(inv)}
                  className="cursor-pointer group grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  <div className="md:col-span-6 space-y-3">
                    <span className="text-[10px] uppercase font-mono text-neutral-400">
                      {inv.kicker}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#D71920] transition-colors leading-snug">
                      {inv.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans line-clamp-3">
                      {inv.summary}
                    </p>
                    <div className="pt-2 flex items-center gap-4 text-xs text-neutral-400 font-mono">
                      <span>Por {inv.author.name}</span>
                      <span>·</span>
                      <span className="text-[#D71920] font-bold">{t.viewDossier} →</span>
                    </div>
                  </div>

                  <div className="md:col-span-6 aspect-[4/3] overflow-hidden bg-neutral-800 border border-neutral-700">
                    <img
                      src={inv.imageUrl}
                      alt={inv.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Economy & Markets Section */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-[#171717]">
                <h2 className="text-base font-extrabold uppercase tracking-tight text-[#171717] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#D71920]" />
                  <span>{t.economy}</span>
                </h2>
                <span className="text-xs text-neutral-500 font-mono uppercase">
                  Mercados & Negocios
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {economyArticles.slice(0, 2).map((art) => (
                  <article
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="cursor-pointer group space-y-2 p-4 bg-white border border-neutral-200 hover:border-black transition-colors"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {onToggleBookmark && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(art.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-xs text-neutral-700 hover:text-[#D71920] shadow-sm transition-colors"
                        >
                          {savedArticleIds.includes(art.id) ? (
                            <BookmarkCheck className="w-3.5 h-3.5 text-[#D71920]" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-[#D71920] block font-mono">
                      {art.kicker}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-[#D71920] transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {art.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area: 4 Columns */}
          <aside className="lg:col-span-4 space-y-8">
            {/* 1. Lo Más Leído (Most Read) - Strict Editorial Ranking */}
            <div className="bg-white p-5 border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#D71920] pb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#D71920]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                    {t.mostRead}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">TOP 5</span>
              </div>

              <div className="divide-y divide-neutral-100">
                {mostReadArticles.map((art, index) => (
                  <article
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="py-3 cursor-pointer group flex items-start gap-3 transition-colors"
                  >
                    <span className="text-2xl font-black text-neutral-300 group-hover:text-[#D71920] font-sans transition-colors shrink-0 leading-none">
                      0{index + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block font-mono">
                        {art.categoryLabel}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 group-hover:text-[#D71920] transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span className="tabular-nums">
                          {art.viewsCount.toLocaleString()} lecturas
                        </span>
                        {savedArticleIds.includes(art.id) && (
                          <span className="text-[#D71920] font-bold">Guardado</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* 2. Encuesta de la Semana (Citizen Participation) */}
            <div id="weekly-poll-section">
              <WeeklyPollCard poll={poll} onVote={onVotePoll} />
            </div>

            {/* 3. Sidebar Ad Banner */}
            {sidebarAd && sidebarAd.active && (
              <div className="bg-neutral-50 p-4 border border-neutral-200 text-center space-y-3">
                <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 block">
                  ANUNCIO PATROCINADO
                </span>
                <div className="p-4 bg-white border border-neutral-300">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">
                    {sidebarAd.title}
                  </h4>
                  <span className="text-[11px] text-neutral-500 block mt-1">
                    {sidebarAd.advertiser}
                  </span>
                  <a
                    href={sidebarAd.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onAdClick && onAdClick(sidebarAd)}
                    className="mt-3 inline-block px-4 py-1.5 bg-[#171717] hover:bg-black text-white text-[11px] font-bold uppercase transition-colors"
                  >
                    Más Información
                  </a>
                </div>
              </div>
            )}

            {/* 4. Frase del Día (Quote of the day) */}
            <div className="bg-neutral-50 p-5 border border-neutral-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D71920]">
                <Quote className="w-3.5 h-3.5" />
                <span>{t.quoteTitle}</span>
              </div>
              <blockquote className="text-sm font-serif italic text-neutral-800 leading-relaxed border-l-2 border-[#D71920] pl-3">
                “La institucionalidad democrática no se negocia; se defiende con transparencia en cada acto de gobierno.”
              </blockquote>
              <div className="pt-2 text-xs">
                <strong className="text-neutral-900 block uppercase font-sans">
                  Dra. Carmen Montiel
                </strong>
                <span className="text-neutral-500 text-[11px]">Constitucionalista y Exmagistrada</span>
              </div>
            </div>

            {/* 5. Cobertura Deportiva y Sociedad */}
            <div className="bg-white p-5 border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  {t.sports}
                </h3>
                <span className="text-[10px] font-mono text-neutral-400">APF / SELECCIÓN</span>
              </div>
              {sportsArticles.slice(0, 2).map((sp) => (
                <article
                  key={sp.id}
                  onClick={() => onSelectArticle(sp)}
                  className="cursor-pointer group space-y-1.5 pb-3 border-b border-neutral-100 last:border-0"
                >
                  <span className="text-[10px] font-bold text-[#D71920] uppercase font-mono">
                    {sp.kicker}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-[#D71920] transition-colors leading-snug">
                    {sp.title}
                  </h4>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {sp.readingTimeMinutes} min de lectura
                  </span>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
