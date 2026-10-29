import React, { useState, useEffect } from 'react';
import { 
  NewsArticle, 
  Advertisement, 
  AppUser, 
  PortalConfig, 
  CurrencyRate, 
  CityWeather,
  WeeklyPoll,
  SocialAccount,
  SocialPost,
  AdminSession
} from './types';
import { 
  INITIAL_CONFIG, 
  INITIAL_CURRENCIES, 
  INITIAL_WEATHER, 
  INITIAL_ARTICLES, 
  INITIAL_ADS, 
  INITIAL_USERS,
  INITIAL_WEEKLY_POLL,
  INITIAL_SOCIAL_ACCOUNTS,
  INITIAL_SOCIAL_POSTS
} from './data/initialData';

// Components
import { FinancialWeatherBar } from './components/common/FinancialWeatherBar';
import { PortalHeader } from './components/common/PortalHeader';
import { PortalFrontpage } from './components/news/PortalFrontpage';
import { ArticleModal } from './components/news/ArticleModal';
import { PortalFooter } from './components/common/PortalFooter';
import { BrandManual } from './components/brand/BrandManual';
import { SocialTemplatesStudio } from './components/social/SocialTemplatesStudio';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { CurrencyDrawerModal } from './components/finance/CurrencyDrawerModal';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { SavedArticlesDrawer } from './components/news/SavedArticlesDrawer';
import { BreakingAlertsModal } from './components/news/BreakingAlertsModal';

import { 
  ArrowUp, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  MessageCircle, 
  Share2 
} from 'lucide-react';

type ActiveView = 'portal' | 'brand_manual' | 'social_studio' | 'admin';

export default function App() {
  // Persistence via localStorage with robust seed fallbacks
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('impacto_articles');
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  const [ads, setAds] = useState<Advertisement[]>(() => {
    try {
      const saved = localStorage.getItem('impacto_ads');
      return saved ? JSON.parse(saved) : INITIAL_ADS;
    } catch {
      return INITIAL_ADS;
    }
  });

  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem('impacto_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [config, setConfig] = useState<PortalConfig>(() => {
    try {
      const saved = localStorage.getItem('impacto_config');
      return saved ? JSON.parse(saved) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  });

  const [currencies, setCurrencies] = useState<CurrencyRate[]>(() => {
    try {
      const saved = localStorage.getItem('impacto_currencies');
      return saved ? JSON.parse(saved) : INITIAL_CURRENCIES;
    } catch {
      return INITIAL_CURRENCIES;
    }
  });

  const [weather, setWeather] = useState<CityWeather[]>(() => {
    try {
      const saved = localStorage.getItem('impacto_weather');
      return saved ? JSON.parse(saved) : INITIAL_WEATHER;
    } catch {
      return INITIAL_WEATHER;
    }
  });

  const [poll, setPoll] = useState<WeeklyPoll>(() => {
    try {
      const saved = localStorage.getItem('impacto_weekly_poll');
      return saved ? JSON.parse(saved) : INITIAL_WEEKLY_POLL;
    } catch {
      return INITIAL_WEEKLY_POLL;
    }
  });

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(() => {
    try {
      const saved = localStorage.getItem('impacto_social_accounts');
      return saved ? JSON.parse(saved) : INITIAL_SOCIAL_ACCOUNTS;
    } catch {
      return INITIAL_SOCIAL_ACCOUNTS;
    }
  });

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    try {
      const saved = localStorage.getItem('impacto_social_posts');
      return saved ? JSON.parse(saved) : INITIAL_SOCIAL_POSTS;
    } catch {
      return INITIAL_SOCIAL_POSTS;
    }
  });

  // Saved Bookmarks in localStorage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('impacto_saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Admin Session State
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => {
    try {
      const savedLocal = localStorage.getItem('impacto_admin_session');
      if (savedLocal) return JSON.parse(savedLocal);
      const savedSession = sessionStorage.getItem('impacto_admin_session');
      if (savedSession) return JSON.parse(savedSession);
      return null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('impacto_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('impacto_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('impacto_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('impacto_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('impacto_currencies', JSON.stringify(currencies));
  }, [currencies]);

  useEffect(() => {
    localStorage.setItem('impacto_weather', JSON.stringify(weather));
  }, [weather]);

  useEffect(() => {
    localStorage.setItem('impacto_weekly_poll', JSON.stringify(poll));
  }, [poll]);

  useEffect(() => {
    localStorage.setItem('impacto_social_accounts', JSON.stringify(socialAccounts));
  }, [socialAccounts]);

  useEffect(() => {
    localStorage.setItem('impacto_social_posts', JSON.stringify(socialPosts));
  }, [socialPosts]);

  useEffect(() => {
    localStorage.setItem('impacto_saved_articles', JSON.stringify(savedArticleIds));
  }, [savedArticleIds]);

  // UI Navigation & View states
  const [currentView, setCurrentView] = useState<ActiveView>('portal');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLanguage, setActiveLanguage] = useState<'es' | 'en' | 'pt'>('es');
  const [isAiRefreshing, setIsAiRefreshing] = useState(false);

  // Modern Drawer/Modal UI states
  const [currenciesModalOpen, setCurrenciesModalOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [breakingAlertsOpen, setBreakingAlertsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track window scroll for Back to Top button
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToPoll = () => {
    setActiveCategory('todos');
    const el = document.getElementById('weekly-poll-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Bookmark toggle handler
  const handleToggleBookmark = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleClearSaved = () => {
    setSavedArticleIds([]);
  };

  // Admin Access Handlers
  const handleOpenAdmin = () => {
    if (adminSession) {
      setCurrentView('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = (session: AdminSession) => {
    setAdminSession(session);
    if (session.rememberMe) {
      localStorage.setItem('impacto_admin_session', JSON.stringify(session));
    } else {
      sessionStorage.setItem('impacto_admin_session', JSON.stringify(session));
    }
    setIsLoginModalOpen(false);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setAdminSession(null);
    localStorage.removeItem('impacto_admin_session');
    sessionStorage.removeItem('impacto_admin_session');
    setCurrentView('portal');
  };

  // Simulated Google Analytics PageView Event
  useEffect(() => {
    if (config.analyticsActive && config.googleAnalyticsId) {
      console.log(`[Google Analytics ${config.googleAnalyticsId}] PageView logged for view: ${currentView}`);
    }
  }, [currentView, activeCategory, selectedArticle, config.googleAnalyticsId, config.analyticsActive]);

  // Handle ad impression and clicks
  const handleAdClick = (clickedAd: Advertisement) => {
    setAds((prev) =>
      prev.map((a) => (a.id === clickedAd.id ? { ...a, clicks: a.clicks + 1 } : a))
    );
  };

  // AI refresh handler for currency and weather
  const handleRefreshAi = () => {
    setIsAiRefreshing(true);
    setTimeout(() => {
      setCurrencies((prev) =>
        prev.map((c) => {
          const delta = (Math.random() - 0.48) * 12;
          return {
            ...c,
            buyPYG: Math.round(c.buyPYG + delta * 0.9),
            sellPYG: Math.round(c.sellPYG + delta),
            change24h: Number(((Math.random() - 0.45) * 1.5).toFixed(2)),
          };
        })
      );
      setWeather((prev) =>
        prev.map((w) => ({
          ...w,
          tempC: w.tempC + (Math.random() > 0.6 ? 1 : 0),
        }))
      );
      setIsAiRefreshing(false);
    }, 1000);
  };

  // Handle citizen voting in Weekly Poll
  const handleVotePoll = (pollId: string, optionId: string) => {
    setPoll((prev) => {
      const updatedOptions = prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      return {
        ...prev,
        options: updatedOptions,
        totalVotes: prev.totalVotes + 1,
        userVotedOptionId: optionId,
      };
    });
  };

  // Filtered articles based on Category and Search Query
  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      activeCategory === 'todos' ||
      art.category === activeCategory ||
      (activeCategory === 'politica' && (art.category === 'politica' || art.category === 'congreso'));
    const matchesSearch =
      !searchQuery.trim() ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const savedArticlesList = articles.filter((a) => savedArticleIds.includes(a.id));

  // Top header ad
  const headerAd = ads.find((a) => a.location === 'header_top' && a.active);
  // Breaking news article
  const breakingNewsArticle = articles.find((a) => a.isBreaking);
  // In-article sponsored ad
  const inArticleAd = ads.find((a) => a.location === 'in_article' && a.active);

  // If user opens Brand Manual
  if (currentView === 'brand_manual') {
    return (
      <BrandManual
        onBackToPortal={() => setCurrentView('portal')}
        onOpenSocialStudio={() => setCurrentView('social_studio')}
      />
    );
  }

  // If user opens Social Media Studio
  if (currentView === 'social_studio') {
    return (
      <SocialTemplatesStudio
        articles={articles}
        onClose={() => setCurrentView('portal')}
      />
    );
  }

  // If user opens Admin Panel (Protected Route with Session Guard)
  if (currentView === 'admin') {
    if (!adminSession) {
      return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
          <AdminLoginModal
            isOpen={true}
            onClose={() => setCurrentView('portal')}
            onLoginSuccess={handleLoginSuccess}
            users={users}
          />
        </div>
      );
    }

    return (
      <AdminPanel
        articles={articles}
        ads={ads}
        users={users}
        config={config}
        currencies={currencies}
        weather={weather}
        poll={poll}
        socialAccounts={socialAccounts}
        socialPosts={socialPosts}
        onUpdateArticles={setArticles}
        onUpdateAds={setAds}
        onUpdateUsers={setUsers}
        onUpdateConfig={setConfig}
        onUpdateCurrencies={setCurrencies}
        onUpdateWeather={setWeather}
        onUpdatePoll={setPoll}
        onUpdateSocialAccounts={setSocialAccounts}
        onUpdateSocialPosts={setSocialPosts}
        onClose={() => setCurrentView('portal')}
        currentUser={adminSession.user}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col font-sans selection:bg-[#D71920] selection:text-white pb-16 lg:pb-0">
      {/* 1. Real-time Currency & Weather Snapshot Bar */}
      <FinancialWeatherBar
        currencies={currencies}
        weather={weather}
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
        onRefreshAi={handleRefreshAi}
        isAiRefreshing={isAiRefreshing}
        onOpenCurrenciesModal={() => setCurrenciesModalOpen(true)}
      />

      {/* 2. Master Portal Header with Mobile Category Pills */}
      <PortalHeader
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        breakingNewsArticle={breakingNewsArticle}
        onSelectArticle={(art) => setSelectedArticle(art)}
        headerAd={headerAd}
        onAdClick={handleAdClick}
        onOpenBrandManual={() => setCurrentView('brand_manual')}
        onOpenSocialStudio={() => setCurrentView('social_studio')}
        onOpenAdmin={handleOpenAdmin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCurrenciesModal={() => setCurrenciesModalOpen(true)}
        onOpenSavedDrawer={() => setSavedDrawerOpen(true)}
        savedArticlesCount={savedArticleIds.length}
        isLoggedIn={!!adminSession}
        adminUserName={adminSession?.user.name}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1">
        {/* If user is filtering by search or a specific category */}
        {activeCategory !== 'todos' || searchQuery ? (
          <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#171717]">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#D71920]">
                  {searchQuery ? 'Búsqueda Editorial' : 'Sección Especializada'}
                </span>
                <h1 className="text-xl sm:text-2xl font-black uppercase text-[#171717] mt-1">
                  {searchQuery
                    ? `Resultados para: "${searchQuery}"`
                    : activeCategory.toUpperCase()}
                </h1>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'noticia encontrada' : 'noticias encontradas'}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveCategory('todos');
                  setSearchQuery('');
                }}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold uppercase text-neutral-800 transition-colors border border-neutral-300"
              >
                ← Volver a Portada Completa
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center text-neutral-500 text-sm space-y-2">
                <p className="font-bold">No se encontraron publicaciones con los criterios seleccionados.</p>
                <p className="text-xs text-neutral-400">Probá buscando con otros términos o regresá a la portada.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="cursor-pointer group flex flex-col justify-between p-4 bg-white border border-neutral-200 hover:border-black transition-all hover:shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 relative">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleBookmark(art.id);
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
                      </div>
                      <span className="text-[10px] font-bold uppercase text-[#D71920] block font-mono">
                        {art.categoryLabel}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-neutral-900 group-hover:text-[#D71920] transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-neutral-600 line-clamp-2 font-sans">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex justify-between items-center text-[10px] text-neutral-500 font-mono mt-3">
                      <span>{art.author.name}</span>
                      <span>{art.readingTimeMinutes} min de lectura</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          /* Master Newspaper Frontpage */
          <PortalFrontpage
            articles={filteredArticles}
            ads={ads}
            poll={poll}
            currencies={currencies}
            onRefreshAi={handleRefreshAi}
            isAiRefreshing={isAiRefreshing}
            onVotePoll={handleVotePoll}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onAdClick={handleAdClick}
            activeLanguage={activeLanguage}
            savedArticleIds={savedArticleIds}
            onToggleBookmark={handleToggleBookmark}
            onOpenCurrenciesModal={() => setCurrenciesModalOpen(true)}
          />
        )}
      </main>

      {/* 4. Complete Editorial Article Reader View / Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          relatedArticles={articles.filter((a) => a.id !== selectedArticle.id)}
          inArticleAd={inArticleAd}
          onClose={() => setSelectedArticle(null)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          onOpenSocialStudioForArticle={() => {
            setSelectedArticle(null);
            setCurrentView('social_studio');
          }}
          isBookmarked={savedArticleIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* 5. Currency Drawer Modal (Pizarra y Conversor en Tiempo Real) */}
      <CurrencyDrawerModal
        currencies={currencies}
        weather={weather}
        isOpen={currenciesModalOpen}
        onClose={() => setCurrenciesModalOpen(false)}
        onRefreshAi={handleRefreshAi}
        isAiRefreshing={isAiRefreshing}
      />

      {/* 6. Saved Articles Drawer (Guardados para leer más tarde) */}
      <SavedArticlesDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearSaved}
      />

      {/* 7. Breaking Alerts Modal */}
      <BreakingAlertsModal
        isOpen={breakingAlertsOpen}
        onClose={() => setBreakingAlertsOpen(false)}
        articles={articles}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      {/* 8. Floating Back To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-30 p-2.5 bg-neutral-900 hover:bg-[#D71920] text-white shadow-lg border border-neutral-700 transition-all rounded-full"
          title="Volver arriba"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* 9. Mobile Bottom Navigation Bar (Barra fija para celular) */}
      <MobileBottomNav
        currentView={currentView}
        onGoHome={() => {
          setActiveCategory('todos');
          setSearchQuery('');
          setCurrentView('portal');
          scrollToTop();
        }}
        onOpenCurrencies={() => setCurrenciesModalOpen(true)}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        onOpenPoll={scrollToPoll}
        onOpenBreaking={() => setBreakingAlertsOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        savedCount={savedArticleIds.length}
        hasBreakingNews={!!breakingNewsArticle}
        isLoggedIn={!!adminSession}
      />

      {/* 10. Institutional Footer */}
      <PortalFooter
        config={config}
        onSelectCategory={setActiveCategory}
        onOpenBrandManual={() => setCurrentView('brand_manual')}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 11. Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        users={users}
      />
    </div>
  );
}
