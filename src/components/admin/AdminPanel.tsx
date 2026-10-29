import React, { useState } from 'react';
import { 
  NewsArticle, 
  Advertisement, 
  AppUser, 
  PortalConfig, 
  CurrencyRate, 
  CityWeather,
  NewsCategory,
  WeeklyPoll,
  SocialAccount,
  SocialPost
} from '../../types';
import { ImpactoLogo } from '../brand/ImpactoLogo';
import { 
  FileText, 
  Megaphone, 
  Users, 
  Settings, 
  BarChart3, 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  ExternalLink,
  Save,
  Globe,
  RefreshCw,
  TrendingUp,
  CloudSun,
  Share2,
  Facebook,
  Instagram,
  Twitter,
  Vote,
  Send,
  Calendar,
  Clock,
  Eye,
  Heart,
  Repeat2,
  MessageSquare,
  Link,
  CheckCircle2,
  AlertTriangle,
  Radio,
  LogOut,
  KeyRound,
  Shield
} from 'lucide-react';

interface AdminPanelProps {
  articles: NewsArticle[];
  ads: Advertisement[];
  users: AppUser[];
  config: PortalConfig;
  currencies: CurrencyRate[];
  weather: CityWeather[];
  poll: WeeklyPoll;
  socialAccounts: SocialAccount[];
  socialPosts: SocialPost[];
  onUpdateArticles: (articles: NewsArticle[]) => void;
  onUpdateAds: (ads: Advertisement[]) => void;
  onUpdateUsers: (users: AppUser[]) => void;
  onUpdateConfig: (config: PortalConfig) => void;
  onUpdateCurrencies: (currencies: CurrencyRate[]) => void;
  onUpdateWeather: (weather: CityWeather[]) => void;
  onUpdatePoll: (poll: WeeklyPoll) => void;
  onUpdateSocialAccounts: (accounts: SocialAccount[]) => void;
  onUpdateSocialPosts: (posts: SocialPost[]) => void;
  onClose?: () => void;
  currentUser?: AppUser;
  onLogout?: () => void;
}

type AdminTab = 'articles' | 'social' | 'poll' | 'ads' | 'users' | 'config' | 'ai_market';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  articles,
  ads,
  users,
  config,
  currencies,
  weather,
  poll,
  socialAccounts,
  socialPosts,
  onUpdateArticles,
  onUpdateAds,
  onUpdateUsers,
  onUpdateConfig,
  onUpdateCurrencies,
  onUpdateWeather,
  onUpdatePoll,
  onUpdateSocialAccounts,
  onUpdateSocialPosts,
  onClose,
  currentUser,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('articles');
  
  // Article Editor State
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Ad Editor State
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isCreatingAd, setIsCreatingAd] = useState(false);

  // User Editor State
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // Portal Config Form State
  const [configForm, setConfigForm] = useState<PortalConfig>({ ...config });

  // Weekly Poll Editor State
  const [pollForm, setPollForm] = useState<WeeklyPoll>({ ...poll });

  // Social Publishing State
  const [selectedArticleForPost, setSelectedArticleForPost] = useState<string>('');
  const [postContent, setPostContent] = useState<string>(
    '🔴 #ÚLTIMOMOMENTO | ' + (articles[0]?.title || '') + '\n\nLeé la cobertura completa en vivo:\n👉 www.impactopolitico.com.py\n\n#Paraguay #PoliticaPY'
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<('facebook' | 'instagram' | 'twitter')[]>([
    'twitter',
    'facebook',
    'instagram',
  ]);
  const [postScheduleTime, setPostScheduleTime] = useState<string>('immediate');
  const [publishingInProgress, setPublishingInProgress] = useState<boolean>(false);

  // AI Sync Loading State
  const [isAiSyncing, setIsAiSyncing] = useState(false);
  const [aiAnalysisLog, setAiAnalysisLog] = useState<string | null>(null);

  const showTemporaryFeedback = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // --- Article Handlers ---
  const handleSaveArticle = (articleToSave: NewsArticle) => {
    let updated: NewsArticle[];
    if (articleToSave.isLeadStory) {
      updated = articles.map(a => a.id === articleToSave.id ? articleToSave : { ...a, isLeadStory: false });
    } else {
      updated = articles.map(a => a.id === articleToSave.id ? articleToSave : a);
    }
    if (!articles.some(a => a.id === articleToSave.id)) {
      updated = [articleToSave, ...updated];
    }
    onUpdateArticles(updated);
    setEditingArticle(null);
    setIsCreatingArticle(false);
    showTemporaryFeedback('Nota periodística guardada y publicada exitosamente.');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('¿Está seguro de eliminar esta publicación del portal?')) {
      onUpdateArticles(articles.filter(a => a.id !== id));
      showTemporaryFeedback('Nota eliminada del portal.');
    }
  };

  const handleStartCreateArticle = () => {
    const newArt: NewsArticle = {
      id: `art-${Date.now()}`,
      title: '',
      kicker: 'POLÍTICA NACIONAL · ASUNCIÓN',
      summary: '',
      content: '',
      category: 'politica',
      categoryLabel: 'Política',
      imageUrl: '/src/assets/images/paraguay_congress_session_1793294703438.jpg',
      imageCaption: '',
      author: {
        name: users[0]?.name || 'Redacción Central',
        role: 'Periodista de Guardia',
      },
      publishedAt: new Date().toISOString(),
      readingTimeMinutes: 4,
      isLeadStory: false,
      isBreaking: false,
      isFeatured: true,
      viewsCount: 1,
      sharesCount: 0,
      tags: ['Paraguay', 'Política'],
      sources: 'Fuentes oficiales y documentos públicos.',
    };
    setEditingArticle(newArt);
    setIsCreatingArticle(true);
  };

  // --- Social Media Management Handlers ---
  const handleToggleSocialAccount = (accountId: 'facebook' | 'instagram' | 'twitter') => {
    const updated = socialAccounts.map(acc => {
      if (acc.id === accountId) {
        return {
          ...acc,
          connected: !acc.connected,
          lastSync: !acc.connected ? 'Justo ahora' : acc.lastSync,
        };
      }
      return acc;
    });
    onUpdateSocialAccounts(updated);
    showTemporaryFeedback('Estado de conexión de red social actualizado.');
  };

  const handleTogglePlatformSelection = (plat: 'facebook' | 'instagram' | 'twitter') => {
    if (selectedPlatforms.includes(plat)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== plat));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, plat]);
    }
  };

  const handleArticleSelectForPost = (artId: string) => {
    setSelectedArticleForPost(artId);
    const art = articles.find(a => a.id === artId);
    if (art) {
      setPostContent(
        `🔴 ${art.isBreaking ? '#ÚLTIMOMOMENTO' : '#ACTUALIDAD'} | ${art.title}\n\n${art.summary.slice(0, 110)}...\n\nLeé la nota completa en:\n👉 www.impactopolitico.com.py\n\n#Paraguay #PoliticaPY #ImpactoPolitico`
      );
    }
  };

  const handlePublishSocialPost = () => {
    if (!postContent.trim()) return;
    setPublishingInProgress(true);

    setTimeout(() => {
      const art = articles.find(a => a.id === selectedArticleForPost);
      const newPost: SocialPost = {
        id: `post-${Date.now()}`,
        articleId: selectedArticleForPost || undefined,
        articleTitle: art ? art.title : 'Publicación institucional',
        platforms: selectedPlatforms,
        content: postContent,
        imageUrl: art?.imageUrl || '/src/assets/images/paraguay_congress_session_1793294703438.jpg',
        status: postScheduleTime === 'immediate' ? 'published' : 'scheduled',
        publishedAt: postScheduleTime === 'immediate' ? 'Justo ahora' : undefined,
        scheduledFor: postScheduleTime !== 'immediate' ? 'Hoy, 20:00' : undefined,
        metrics: {
          impressions: 120,
          likes: 18,
          shares: 5,
          comments: 2,
        },
      };

      onUpdateSocialPosts([newPost, ...socialPosts]);
      setPublishingInProgress(false);
      showTemporaryFeedback(
        postScheduleTime === 'immediate'
          ? '¡Publicado con éxito en Facebook, Instagram y Twitter/X!'
          : '¡Publicación programada en cola de redes sociales!'
      );
    }, 1000);
  };

  // --- Advertising Handlers ---
  const handleSaveAd = (adToSave: Advertisement) => {
    const updated = ads.some(a => a.id === adToSave.id)
      ? ads.map(a => a.id === adToSave.id ? adToSave : a)
      : [...ads, adToSave];
    onUpdateAds(updated);
    setEditingAd(null);
    setIsCreatingAd(false);
    showTemporaryFeedback('Pauta publicitaria guardada exitosamente.');
  };

  const handleToggleAdStatus = (id: string) => {
    onUpdateAds(ads.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  // --- User Handlers ---
  const handleSaveUser = (userToSave: AppUser) => {
    const updated = users.some(u => u.id === userToSave.id)
      ? users.map(u => u.id === userToSave.id ? userToSave : u)
      : [...users, userToSave];
    onUpdateUsers(updated);
    setEditingUser(null);
    setIsCreatingUser(false);
    showTemporaryFeedback('Usuario y rol editorial guardados.');
  };

  // --- AI Real-time Market & Weather Synchronizer ---
  const handleRunAiSync = () => {
    setIsAiSyncing(true);
    setAiAnalysisLog('Conectando con motor de análisis de divisas y clima para Paraguay...');

    setTimeout(() => {
      const updatedCurrencies: CurrencyRate[] = currencies.map(c => {
        const delta = (Math.random() - 0.48) * 15;
        const newSell = Math.round(c.sellPYG + delta);
        const newBuy = Math.round(c.buyPYG + delta * 0.9);
        return {
          ...c,
          sellPYG: newSell,
          buyPYG: newBuy,
          change24h: Number(((Math.random() - 0.45) * 1.5).toFixed(2)),
        };
      });

      const updatedWeather: CityWeather[] = weather.map(w => ({
        ...w,
        tempC: w.tempC + (Math.random() > 0.5 ? 1 : -1),
        humidity: Math.min(85, Math.max(30, w.humidity + Math.round((Math.random() - 0.5) * 6))),
      }));

      onUpdateCurrencies(updatedCurrencies);
      onUpdateWeather(updatedWeather);
      setIsAiSyncing(false);
      setAiAnalysisLog(
        'Sincronización completada: Cotizaciones actualizadas según cotización mayorista BCP/mercado de cambios y estaciones meteorológicas de DINAC.'
      );
      showTemporaryFeedback('Monedas y tiempo meteorológico actualizados con éxito.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] text-[#171717] flex flex-col font-sans">
      {/* Top Admin Navbar */}
      <header className="bg-[#171717] text-white px-6 py-4 border-b-2 border-[#D71920] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ImpactoLogo variant="compact" colorMode="white" size="sm" />
            <div className="h-6 w-[1px] bg-neutral-700 hidden sm:block" />
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#D71920]">
                PANEL DE ADMINISTRACIÓN Y CMS
              </span>
              <h1 className="text-sm font-bold text-neutral-200">
                Gestión Integral de Redacción, Redes y Contenidos
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccessMsg && (
              <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 px-3 py-1 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <Check className="w-3.5 h-3.5" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {/* Authenticated User Status */}
            <div className="flex items-center gap-2.5 text-xs text-neutral-300 bg-neutral-900 px-3 py-1.5 border border-neutral-800">
              <div className="w-6 h-6 rounded-full bg-[#D71920] text-white flex items-center justify-center font-bold text-[10px] font-mono">
                {currentUser?.avatar || 'AD'}
              </div>
              <div className="leading-tight">
                <span className="font-bold text-white block">
                  {currentUser?.name || 'Administrador'}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {currentUser?.roleTitle || 'Editor General'}
                </span>
              </div>
            </div>

            {/* Logout button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-bold uppercase transition-colors flex items-center gap-1.5"
                title="Cerrar sesión de administración"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase transition-colors"
              >
                Ver Portal Web
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Admin Nav Sub-bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-20 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-1">
          {[
            { id: 'articles', label: 'Gestión de Noticias', icon: FileText, count: articles.length },
            { id: 'social', label: 'Redes Sociales (FB/IG/X)', icon: Share2, count: socialAccounts.filter(s => s.connected).length },
            { id: 'poll', label: 'Encuesta de la Semana', icon: Vote },
            { id: 'ads', label: 'Espacios de Publicidad', icon: Megaphone, count: ads.length },
            { id: 'users', label: 'Usuarios y Roles', icon: Users, count: users.length },
            { id: 'config', label: 'Configuración & Analytics', icon: Settings },
            { id: 'ai_market', label: 'Divisas & Clima IA', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setEditingArticle(null);
                  setEditingAd(null);
                  setEditingUser(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#D71920] text-[#D71920] bg-red-50/50'
                    : 'border-transparent text-neutral-600 hover:text-black hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[10px] font-mono bg-neutral-200 text-neutral-800 px-1.5 py-0.2 rounded-sm ml-1">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        {/* ======================================================== */}
        {/* TAB 1: GESTIÓN DE NOTICIAS                               */}
        {/* ======================================================== */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            {!editingArticle ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                      Artículos y Coberturas Publicadas ({articles.length})
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Cree, edite, destaque en portada o active alertas de Último Momento.
                    </p>
                  </div>
                  <button
                    onClick={handleStartCreateArticle}
                    className="px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Redactar Nueva Nota</span>
                  </button>
                </div>

                {/* Table of Articles */}
                <div className="bg-white border border-neutral-200 overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wider border-b border-neutral-200">
                      <tr>
                        <th className="p-3 w-16">Portada</th>
                        <th className="p-3">Título de la Noticia</th>
                        <th className="p-3">Categoría</th>
                        <th className="p-3">Autor</th>
                        <th className="p-3">Lecturas</th>
                        <th className="p-3">Estado</th>
                        <th className="p-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {articles.map((art) => (
                        <tr key={art.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-3">
                            {art.isLeadStory ? (
                              <span className="px-2 py-0.5 bg-[#D71920] text-white font-black text-[9px] uppercase tracking-widest block text-center">
                                Portada
                              </span>
                            ) : art.isBreaking ? (
                              <span className="px-2 py-0.5 bg-black text-red-500 font-black text-[9px] uppercase tracking-widest block text-center">
                                Alerta
                              </span>
                            ) : (
                              <span className="text-neutral-400 font-mono text-[10px]">—</span>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-neutral-900 line-clamp-2">{art.title}</div>
                            <span className="text-[10px] text-neutral-500 font-mono">{art.kicker}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-neutral-700 uppercase text-[10px]">
                              {art.categoryLabel}
                            </span>
                          </td>
                          <td className="p-3 text-neutral-600 font-medium">{art.author.name}</td>
                          <td className="p-3 font-mono text-neutral-600 tabular-nums">
                            {art.viewsCount.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              Publicada
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingArticle(art);
                                setIsCreatingArticle(false);
                              }}
                              className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              className="px-2 py-1 hover:bg-red-50 text-red-600 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                              title="Eliminar publicación"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              /* ARTICLE EDITOR FORM */
              <div className="bg-white border border-neutral-300 p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#D71920]" />
                    <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                      {isCreatingArticle ? 'Redactar Nueva Publicación' : 'Editar Nota Periodística'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditingArticle(null)}
                    className="text-xs uppercase font-bold text-neutral-500 hover:text-black"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column: Text & Content (2 cols) */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        Epígrafe / Volanta
                      </label>
                      <input
                        type="text"
                        value={editingArticle.kicker}
                        onChange={(e) => setEditingArticle({ ...editingArticle, kicker: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black font-semibold uppercase"
                        placeholder="E.g., PODER LEGISLATIVO · ASUNCIÓN"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        Titular Principal de la Noticia *
                      </label>
                      <textarea
                        rows={2}
                        value={editingArticle.title}
                        onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-black font-bold uppercase"
                        placeholder="Titular contundente y riguroso..."
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        Bajada Informativa / Copete
                      </label>
                      <textarea
                        rows={3}
                        value={editingArticle.summary}
                        onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black text-neutral-800"
                        placeholder="Resumen con los datos esenciales de la noticia..."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        Cuerpo Completo del Artículo (Texto Periodístico) *
                      </label>
                      <textarea
                        rows={10}
                        value={editingArticle.content}
                        onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                        className="w-full p-3 text-xs font-serif leading-relaxed border border-neutral-300 focus:outline-none focus:border-black"
                        placeholder="Desarrollo de la información, declaraciones, antecedentes..."
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column: Metadata & Settings (1 col) */}
                  <div className="space-y-4 bg-neutral-50 p-4 border border-neutral-200">
                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        Categoría Oficial
                      </label>
                      <select
                        value={editingArticle.category}
                        onChange={(e) => {
                          const cat = e.target.value as NewsCategory;
                          const labels: Record<NewsCategory, string> = {
                            'ultimo-momento': 'Último Momento',
                            'politica': 'Política',
                            'congreso': 'Congreso',
                            'gobierno': 'Gobierno',
                            'municipales': 'Municipales',
                            'economia': 'Economía',
                            'investigacion': 'Investigación',
                            'entrevistas': 'Entrevistas',
                            'opinion': 'Opinión',
                            'elecciones': 'Elecciones',
                            'internacionales': 'Internacionales',
                            'sociedad': 'Sociedad',
                            'deportes': 'Deportes',
                            'videos': 'Videos',
                          };
                          setEditingArticle({
                            ...editingArticle,
                            category: cat,
                            categoryLabel: labels[cat] || cat,
                          });
                        }}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white font-semibold"
                      >
                        <option value="politica">Política Nacional</option>
                        <option value="congreso">Congreso Nacional</option>
                        <option value="gobierno">Gobierno</option>
                        <option value="economia">Economía & Finanzas</option>
                        <option value="investigacion">Investigación Periodística</option>
                        <option value="ultimo-momento">Último Momento</option>
                        <option value="entrevistas">Entrevistas</option>
                        <option value="opinion">Opinión & Análisis</option>
                        <option value="elecciones">Elecciones</option>
                        <option value="municipales">Municipales</option>
                        <option value="internacionales">Internacionales</option>
                        <option value="sociedad">Sociedad</option>
                        <option value="deportes">Deportes</option>
                        <option value="videos">Videos y Reportajes</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        URL de la Fotografía Principal
                      </label>
                      <input
                        type="text"
                        value={editingArticle.imageUrl}
                        onChange={(e) => setEditingArticle({ ...editingArticle, imageUrl: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 font-mono"
                      />
                      {/* Quick preset selector for high-fidelity assets */}
                      <div className="mt-2 space-y-1">
                        <span className="text-[10px] text-neutral-500 font-bold block uppercase">
                          Fotos de Archivo 4K Disponibles:
                        </span>
                        <div className="grid grid-cols-2 gap-1 text-[10px]">
                          <button
                            type="button"
                            onClick={() =>
                              setEditingArticle({
                                ...editingArticle,
                                imageUrl: '/src/assets/images/paraguay_congress_session_1793294703438.jpg',
                              })
                            }
                            className="p-1 bg-white border border-neutral-300 hover:border-black text-left truncate"
                          >
                            🏛 Congreso
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingArticle({
                                ...editingArticle,
                                imageUrl: '/src/assets/images/paraguay_central_bank_1793294703247.jpg',
                              })
                            }
                            className="p-1 bg-white border border-neutral-300 hover:border-black text-left truncate"
                          >
                            🏦 Banco Central
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingArticle({
                                ...editingArticle,
                                imageUrl: '/src/assets/images/investigative_dossier_1793294703986.jpg',
                              })
                            }
                            className="p-1 bg-white border border-neutral-300 hover:border-black text-left truncate"
                          >
                            📑 Investigación
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingArticle({
                                ...editingArticle,
                                imageUrl: '/src/assets/images/paraguay_infrastructure_1793294704467.jpg',
                              })
                            }
                            className="p-1 bg-white border border-neutral-300 hover:border-black text-left truncate"
                          >
                            🌉 Bioceánico
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        Epígrafe / Pie de Foto
                      </label>
                      <input
                        type="text"
                        value={editingArticle.imageCaption || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, imageCaption: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300"
                        placeholder="Descripción y crédito del fotógrafo..."
                      />
                    </div>

                    <div className="pt-2 border-t border-neutral-200 space-y-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingArticle.isLeadStory || false}
                          onChange={(e) =>
                            setEditingArticle({ ...editingArticle, isLeadStory: e.target.checked })
                          }
                          className="w-4 h-4 accent-[#D71920]"
                        />
                        <span className="text-xs font-bold text-neutral-800">
                          Establecer como Noticia Principal de Portada
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingArticle.isBreaking || false}
                          onChange={(e) =>
                            setEditingArticle({ ...editingArticle, isBreaking: e.target.checked })
                          }
                          className="w-4 h-4 accent-[#D71920]"
                        />
                        <span className="text-xs font-bold text-neutral-800">
                          Activar Alerta de Último Momento
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        Autor / Firma Periodística
                      </label>
                      <input
                        type="text"
                        value={editingArticle.author.name}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            author: { ...editingArticle.author, name: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                        Fuentes Consultadas
                      </label>
                      <input
                        type="text"
                        value={editingArticle.sources || ''}
                        onChange={(e) => setEditingArticle({ ...editingArticle, sources: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-neutral-300"
                        placeholder="Informes oficiales, registros públicos..."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3">
                  <button
                    onClick={() => setEditingArticle(null)}
                    className="px-4 py-2 border border-neutral-300 text-xs font-bold uppercase hover:bg-neutral-50"
                  >
                    Descartar Cambios
                  </button>
                  <button
                    onClick={() => handleSaveArticle(editingArticle)}
                    className="px-6 py-2 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar y Publicar en Web</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: GESTIÓN DE REDES SOCIALES (FB, IG, TWITTER/X)      */}
        {/* ======================================================== */}
        {activeTab === 'social' && (
          <div className="space-y-8">
            <div className="pb-4 border-b border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#D71920]" />
                <span>Gestión & Conexión de Redes Sociales (Facebook, Instagram, X)</span>
              </h2>
              <p className="text-xs text-neutral-500">
                Conecte las cuentas oficiales de IMPACTO POLÍTICO y transmita noticias, alertas y dossiers de forma sincronizada.
              </p>
            </div>

            {/* 1. Official Connected Accounts Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialAccounts.map((account) => {
                const iconMap = {
                  facebook: Facebook,
                  instagram: Instagram,
                  twitter: Twitter,
                };
                const Icon = iconMap[account.id];
                const colorMap = {
                  facebook: 'hover:border-blue-600',
                  instagram: 'hover:border-pink-600',
                  twitter: 'hover:border-neutral-900',
                };
                return (
                  <div
                    key={account.id}
                    className={`bg-white p-5 border-2 transition-all ${
                      account.connected ? 'border-neutral-900 shadow-sm' : 'border-dashed border-neutral-300'
                    } ${colorMap[account.id]}`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-neutral-100 rounded-none text-neutral-900">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xs font-black uppercase text-neutral-900">{account.name}</h3>
                          <span className="text-[10px] text-neutral-500 font-mono">{account.handle}</span>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 border ${
                          account.connected
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-neutral-100 text-neutral-500 border-neutral-300'
                        }`}
                      >
                        {account.connected ? 'Conectado' : 'Desconectado'}
                      </span>
                    </div>

                    <div className="py-3 space-y-1 text-xs">
                      <div className="flex justify-between font-mono">
                        <span className="text-neutral-500">Audiencia:</span>
                        <strong className="text-neutral-900">{account.followers} seguidores</strong>
                      </div>
                      <div className="flex justify-between font-mono">
                        <span className="text-neutral-500">Última sinc:</span>
                        <span className="text-neutral-700">{account.lastSync}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <a
                        href={account.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-neutral-600 hover:text-black flex items-center gap-1"
                      >
                        <span>Ver Perfil</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => handleToggleSocialAccount(account.id)}
                        className={`px-3 py-1 text-[10px] font-bold uppercase transition-colors ${
                          account.connected
                            ? 'bg-neutral-100 hover:bg-red-50 text-neutral-700 hover:text-red-700'
                            : 'bg-[#D71920] hover:bg-red-700 text-white'
                        }`}
                      >
                        {account.connected ? 'Desconectar' : 'Vincular API'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Direct Social Post Composer */}
            <div className="bg-white border-2 border-neutral-900 p-6 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#D71920]" />
                  <h3 className="text-sm font-black uppercase tracking-tight text-neutral-900">
                    Compositor y Transmisor Multired (Facebook, Instagram, Twitter/X)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  Transmisión Directa desde Redacción
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left: Input Form (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  {/* Select article to pre-fill */}
                  <div>
                    <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                      Cargar Nota Periodística del Portal
                    </label>
                    <select
                      value={selectedArticleForPost}
                      onChange={(e) => handleArticleSelectForPost(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white font-semibold"
                    >
                      <option value="">-- Redactar publicación libre / institucional --</option>
                      {articles.map((art) => (
                        <option key={art.id} value={art.id}>
                          [{art.categoryLabel}] {art.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Platform checkboxes */}
                  <div>
                    <label className="text-xs font-bold uppercase text-neutral-600 block mb-1.5">
                      Publicar simultáneamente en:
                    </label>
                    <div className="flex gap-2">
                      {[
                        { id: 'twitter', label: 'Twitter / X', icon: Twitter },
                        { id: 'facebook', label: 'Facebook', icon: Facebook },
                        { id: 'instagram', label: 'Instagram', icon: Instagram },
                      ].map((plat) => {
                        const Icon = plat.icon;
                        const isSelected = selectedPlatforms.includes(plat.id as any);
                        return (
                          <button
                            key={plat.id}
                            type="button"
                            onClick={() => handleTogglePlatformSelection(plat.id as any)}
                            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase border transition-colors ${
                              isSelected
                                ? 'bg-neutral-900 text-white border-black'
                                : 'bg-neutral-50 text-neutral-500 border-neutral-300 hover:border-black'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{plat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Post copy text area */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold uppercase text-neutral-600">
                        Texto de la Publicación (Copy periodístico)
                      </label>
                      <span className={`text-[10px] font-mono ${postContent.length > 280 ? 'text-red-600 font-bold' : 'text-neutral-500'}`}>
                        {postContent.length} / 280 (Límite X)
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="w-full p-3 text-xs border border-neutral-300 focus:outline-none focus:border-black font-sans leading-relaxed"
                      placeholder="Redacte el texto para redes sociales..."
                    />
                  </div>

                  {/* Scheduling options */}
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="schedule"
                        value="immediate"
                        checked={postScheduleTime === 'immediate'}
                        onChange={() => setPostScheduleTime('immediate')}
                        className="accent-[#D71920]"
                      />
                      <span>Publicar ahora en vivo</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="schedule"
                        value="scheduled"
                        checked={postScheduleTime === 'scheduled'}
                        onChange={() => setPostScheduleTime('scheduled')}
                        className="accent-[#D71920]"
                      />
                      <span>Programar para más tarde (20:00 HS)</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handlePublishSocialPost}
                    disabled={publishingInProgress}
                    className="w-full py-2.5 bg-[#D71920] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
                  >
                    <Send className={`w-4 h-4 ${publishingInProgress ? 'animate-spin' : ''}`} />
                    <span>
                      {publishingInProgress
                        ? 'Transmitiendo a APIs de redes...'
                        : postScheduleTime === 'immediate'
                        ? 'Publicar en Todas las Redes Seleccionadas'
                        : 'Programar Publicación'}
                    </span>
                  </button>
                </div>

                {/* Right: Live Social Card Mockup (5 cols) */}
                <div className="md:col-span-5 bg-neutral-100 p-4 border border-neutral-200 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                      Vista Previa de la Publicación (Feed)
                    </span>

                    <div className="bg-white p-3 border border-neutral-300 shadow-xs space-y-2.5">
                      <div className="flex items-center gap-2">
                        <ImpactoLogo variant="compact" size="sm" />
                        <div>
                          <strong className="text-xs font-bold text-neutral-900 block leading-tight">
                            Impacto Político PY
                          </strong>
                          <span className="text-[10px] text-neutral-500 font-mono">@impactopoliticopy · Ahora</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-800 whitespace-pre-line leading-relaxed font-sans">
                        {postContent}
                      </p>

                      {/* Attached image preview */}
                      <div className="aspect-video w-full overflow-hidden bg-neutral-900 border border-neutral-200">
                        <img
                          src={
                            articles.find(a => a.id === selectedArticleForPost)?.imageUrl ||
                            '/src/assets/images/paraguay_congress_session_1793294703438.jpg'
                          }
                          alt="Previsualización de imagen"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 text-[10px] text-neutral-500 font-mono flex items-center justify-between border-t border-neutral-200 mt-3">
                    <span>Cuentas activas: {selectedPlatforms.join(', ').toUpperCase()}</span>
                    <span>API v2 Conectada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Social Posts History & Metrics */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Historial de Publicaciones y Métricas de Rendimiento
              </h3>

              <div className="bg-white border border-neutral-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wider border-b border-neutral-200">
                    <tr>
                      <th className="p-3">Estado</th>
                      <th className="p-3">Publicación / Nota</th>
                      <th className="p-3">Redes</th>
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Alcance / Impresiones</th>
                      <th className="p-3">Interacciones</th>
                      <th className="p-3 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {socialPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-neutral-50">
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                              post.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {post.status === 'published' ? 'Publicado' : 'Programado'}
                          </span>
                        </td>
                        <td className="p-3">
                          <strong className="block text-neutral-900 line-clamp-1">{post.articleTitle}</strong>
                          <span className="text-[11px] text-neutral-500 line-clamp-1">{post.content}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1.5">
                            {post.platforms.map((p) => {
                              const icons = { facebook: Facebook, instagram: Instagram, twitter: Twitter };
                              const I = icons[p];
                              return <I key={p} className="w-3.5 h-3.5 text-neutral-700" />;
                            })}
                          </div>
                        </td>
                        <td className="p-3 font-mono text-neutral-600">{post.publishedAt || post.scheduledFor}</td>
                        <td className="p-3 font-mono tabular-nums text-neutral-800 font-bold">
                          {post.metrics ? post.metrics.impressions.toLocaleString() : '—'}
                        </td>
                        <td className="p-3 font-mono tabular-nums text-neutral-600">
                          {post.metrics ? (
                            <span className="flex items-center gap-2">
                              <span>❤️ {post.metrics.likes}</span>
                              <span>🔄 {post.metrics.shares}</span>
                            </span>
                          ) : '—'}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              alert('Ver reporte detallado de analíticas sociales.');
                            }}
                            className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-[11px]"
                          >
                            Detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ENCUESTA DE LA SEMANA CMS                         */}
        {/* ======================================================== */}
        {activeTab === 'poll' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight flex items-center gap-2">
                <Vote className="w-5 h-5 text-[#D71920]" />
                <span>Gestor de Encuesta de la Semana</span>
              </h2>
              <p className="text-xs text-neutral-500">
                Configure la pregunta ciudadana de portada, agregue o edite opciones y supervise los sufragios computados.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 p-6 shadow-sm space-y-6 max-w-3xl">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                  Pregunta de la Encuesta Ciudadana *
                </label>
                <textarea
                  rows={2}
                  value={pollForm.question}
                  onChange={(e) => setPollForm({ ...pollForm, question: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 font-bold text-neutral-900 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                  Descripción o Contexto Político
                </label>
                <input
                  type="text"
                  value={pollForm.description || ''}
                  onChange={(e) => setPollForm({ ...pollForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 text-neutral-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-600 block mb-1">
                  Fecha de Cierre
                </label>
                <input
                  type="text"
                  value={pollForm.closingDate}
                  onChange={(e) => setPollForm({ ...pollForm, closingDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 font-mono"
                />
              </div>

              {/* Options list */}
              <div className="space-y-3 pt-2 border-t border-neutral-200">
                <label className="text-xs font-bold uppercase text-neutral-600 block">
                  Opciones de Respuesta y Conteo de Votos
                </label>
                {pollForm.options.map((opt, i) => (
                  <div key={opt.id} className="flex gap-2 items-center">
                    <span className="text-xs font-mono font-bold text-neutral-400 w-6">0{i + 1}.</span>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => {
                        const updated = [...pollForm.options];
                        updated[i].text = e.target.value;
                        setPollForm({ ...pollForm, options: updated });
                      }}
                      className="flex-1 px-3 py-2 text-xs border border-neutral-300"
                    />
                    <div className="flex items-center gap-1 font-mono text-xs">
                      <input
                        type="number"
                        value={opt.votes}
                        onChange={(e) => {
                          const updated = [...pollForm.options];
                          updated[i].votes = Number(e.target.value);
                          const total = updated.reduce((acc, curr) => acc + curr.votes, 0);
                          setPollForm({ ...pollForm, options: updated, totalVotes: total });
                        }}
                        className="w-20 px-2 py-2 border border-neutral-300 text-right font-bold"
                      />
                      <span className="text-neutral-500">votos</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-between items-center">
                <span className="text-xs font-mono text-neutral-500">
                  Total de votos acumulados: <strong>{pollForm.totalVotes.toLocaleString()}</strong>
                </span>
                <button
                  onClick={() => {
                    onUpdatePoll(pollForm);
                    showTemporaryFeedback('Encuesta de la semana actualizada con éxito.');
                  }}
                  className="px-6 py-2.5 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Parámetros de la Encuesta</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: PANEL ADMINISTRADOR DE PUBLICIDAD                 */}
        {/* ======================================================== */}
        {activeTab === 'ads' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                  Panel Administrador de Publicidad & Pauta Institucional
                </h2>
                <p className="text-xs text-neutral-500">
                  Controle banners en la cabecera, portada intermedia, columna lateral y dentro de las notas periodísticas.
                </p>
              </div>
              <button
                onClick={() => {
                  const newAd: Advertisement = {
                    id: `ad-${Date.now()}`,
                    title: 'Campaña Institucional Nueva',
                    advertiser: 'Nuevo Anunciante S.A.',
                    location: 'frontpage_middle',
                    imageUrl: '',
                    targetUrl: 'https://www.ejemplo.com.py',
                    active: true,
                    impressions: 0,
                    clicks: 0,
                    startDate: '2026-10-29',
                    endDate: '2026-12-31',
                  };
                  setEditingAd(newAd);
                  setIsCreatingAd(true);
                }}
                className="px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Pauta Publicitaria</span>
              </button>
            </div>

            {/* Ad inventory table */}
            <div className="bg-white border border-neutral-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wider border-b border-neutral-200">
                  <tr>
                    <th className="p-3">Ubicación en Portal</th>
                    <th className="p-3">Campaña / Titular</th>
                    <th className="p-3">Anunciante</th>
                    <th className="p-3">Impresiones</th>
                    <th className="p-3">Clics</th>
                    <th className="p-3">CTR</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {ads.map((ad) => {
                    const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0.00';
                    const locationLabels = {
                      header_top: 'Portada Superior (Header)',
                      frontpage_middle: 'Portada Central (Intermedio)',
                      sidebar: 'Columna Lateral (Sidebar)',
                      in_article: 'Dentro de la Nota (Lectura)',
                    };
                    return (
                      <tr key={ad.id} className="hover:bg-neutral-50">
                        <td className="p-3 font-semibold text-neutral-800">
                          {locationLabels[ad.location]}
                        </td>
                        <td className="p-3 font-bold text-neutral-900">{ad.title}</td>
                        <td className="p-3 text-neutral-600">{ad.advertiser}</td>
                        <td className="p-3 font-mono tabular-nums text-neutral-700">
                          {ad.impressions.toLocaleString()}
                        </td>
                        <td className="p-3 font-mono tabular-nums text-neutral-700">
                          {ad.clicks.toLocaleString()}
                        </td>
                        <td className="p-3 font-mono tabular-nums text-emerald-700 font-bold">
                          {ctr}%
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleToggleAdStatus(ad.id)}
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                              ad.active
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-neutral-200 text-neutral-600'
                            }`}
                          >
                            {ad.active ? 'Activo' : 'Pausado'}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setEditingAd(ad)}
                            className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-[11px]"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Edit Ad Modal / Drawer */}
            {editingAd && (
              <div className="bg-white border-2 border-neutral-900 p-6 shadow-xl space-y-4 max-w-2xl">
                <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                  <h3 className="font-bold uppercase text-neutral-900 text-sm">
                    Configurar Pauta Publicitaria
                  </h3>
                  <button onClick={() => setEditingAd(null)} className="text-xs text-neutral-500 font-bold">
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold uppercase block mb-1">Nombre de Campaña</label>
                    <input
                      type="text"
                      value={editingAd.title}
                      onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold uppercase block mb-1">Empresa Anunciante</label>
                    <input
                      type="text"
                      value={editingAd.advertiser}
                      onChange={(e) => setEditingAd({ ...editingAd, advertiser: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold uppercase block mb-1">Ubicación</label>
                    <select
                      value={editingAd.location}
                      onChange={(e) =>
                        setEditingAd({
                          ...editingAd,
                          location: e.target.value as Advertisement['location'],
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 bg-white"
                    >
                      <option value="header_top">Portada Superior (Header Banner)</option>
                      <option value="frontpage_middle">Portada Central (Intermedio)</option>
                      <option value="sidebar">Columna Lateral (Sidebar Banner)</option>
                      <option value="in_article">Dentro de la Nota (In-Article Banner)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold uppercase block mb-1">Enlace de Destino (URL)</label>
                    <input
                      type="url"
                      value={editingAd.targetUrl}
                      onChange={(e) => setEditingAd({ ...editingAd, targetUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 font-mono"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                  <button
                    onClick={() => setEditingAd(null)}
                    className="px-4 py-2 border border-neutral-300 text-xs font-bold uppercase"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSaveAd(editingAd)}
                    className="px-5 py-2 bg-[#D71920] text-white text-xs font-bold uppercase"
                  >
                    Guardar Pauta
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: USUARIOS Y ROLES                                  */}
        {/* ======================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                  Equipo Editorial, Usuarios & Roles
                </h2>
                <p className="text-xs text-neutral-500">
                  Controle permisos de Director Editorial, Cronistas, Periodistas de Investigación y Administradores de Pauta.
                </p>
              </div>
              <button
                onClick={() => {
                  const newUser: AppUser = {
                    id: `usr-${Date.now()}`,
                    name: 'Nuevo Redactor',
                    email: 'redaccion@impactopolitico.com.py',
                    role: 'periodista',
                    roleTitle: 'Periodista de Guardia',
                    avatar: 'NR',
                    active: true,
                    lastLogin: 'Nunca',
                  };
                  setEditingUser(newUser);
                  setIsCreatingUser(true);
                }}
                className="px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Nuevo Usuario</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-neutral-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wider border-b border-neutral-200">
                  <tr>
                    <th className="p-3">Usuario</th>
                    <th className="p-3">Correo Institucional</th>
                    <th className="p-3">Rol Asignado</th>
                    <th className="p-3">Cargo Editorial</th>
                    <th className="p-3">Último Acceso</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {users.map((usr) => (
                    <tr key={usr.id} className="hover:bg-neutral-50">
                      <td className="p-3 flex items-center gap-2 font-bold text-neutral-900">
                        <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono text-[10px]">
                          {usr.avatar}
                        </div>
                        <span>{usr.name}</span>
                      </td>
                      <td className="p-3 font-mono text-neutral-600">{usr.email}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 font-bold uppercase text-[10px]">
                          {usr.role}
                        </span>
                      </td>
                      <td className="p-3 text-neutral-700">{usr.roleTitle}</td>
                      <td className="p-3 text-neutral-500 font-mono text-[11px]">{usr.lastLogin}</td>
                      <td className="p-3">
                        <span className="text-emerald-700 font-bold text-[10px] inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Habilitado
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setEditingUser(usr)}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-[11px]"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit User Modal */}
            {editingUser && (
              <div className="bg-white border-2 border-neutral-900 p-6 shadow-xl space-y-4 max-w-2xl animate-fadeIn">
                <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#D71920]" />
                    <h3 className="font-bold uppercase text-neutral-900 text-sm">
                      {isCreatingUser ? 'Registrar Nuevo Usuario Editorial' : 'Editar Usuario & Credenciales'}
                    </h3>
                  </div>
                  <button onClick={() => setEditingUser(null)} className="text-xs text-neutral-500 font-bold hover:text-black">
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold uppercase block mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase block mb-1">Correo Institucional</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase block mb-1">Rol de Acceso CMS</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => {
                        const newRole = e.target.value as AppUser['role'];
                        const roleTitles = {
                          director: 'Director Editorial General',
                          editor: 'Editor Jefe de Sección',
                          periodista: 'Periodista de Redacción',
                          publicidad: 'Administrador de Publicidad',
                        };
                        setEditingUser({ 
                          ...editingUser, 
                          role: newRole,
                          roleTitle: roleTitles[newRole] || editingUser.roleTitle
                        });
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 bg-white"
                    >
                      <option value="director">Director Editorial (Acceso Total)</option>
                      <option value="editor">Editor de Sección (Publicación & Redes)</option>
                      <option value="periodista">Periodista / Redactor (Edición de Notas)</option>
                      <option value="publicidad">Publicidad (Gestión de Pautas & Banners)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase block mb-1">Cargo Editorial Visible</label>
                    <input
                      type="text"
                      value={editingUser.roleTitle}
                      onChange={(e) => setEditingUser({ ...editingUser, roleTitle: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase block mb-1 flex items-center justify-between">
                      <span>Contraseña de Acceso</span>
                      <span className="text-[10px] text-neutral-400 font-mono">Sensible</span>
                    </label>
                    <input
                      type="text"
                      value={editingUser.password || ''}
                      placeholder="admin2026"
                      onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer font-bold uppercase text-[11px] text-neutral-800">
                      <input
                        type="checkbox"
                        checked={editingUser.active}
                        onChange={(e) => setEditingUser({ ...editingUser, active: e.target.checked })}
                        className="rounded-xs text-[#D71920]"
                      />
                      <span>Cuenta Habilitada / Activa</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
                  <button
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 border border-neutral-300 text-xs font-bold uppercase hover:bg-neutral-100"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSaveUser(editingUser)}
                    className="px-5 py-2 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold uppercase shadow-sm"
                  >
                    Guardar Usuario
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: CONFIGURACIÓN & GOOGLE ANALYTICS                   */}
        {/* ======================================================== */}
        {activeTab === 'config' && (
          <div className="space-y-8">
            <div className="pb-4 border-b border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                Configuración General del Portal & Google Analytics
              </h2>
              <p className="text-xs text-neutral-500">
                Sincronice el ID de medición para métricas en tiempo real y parámetros institucionales del medio.
              </p>
            </div>

            {/* Real-time Google Analytics Traffic Monitor */}
            <div className="bg-[#171717] text-white p-6 border-2 border-neutral-800 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                      GOOGLE ANALYTICS 4 · TIEMPO REAL
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Medición de Tráfico Ciudadano en Vivo
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs font-mono">
                    <span className="text-neutral-400">ID:</span>
                    <span className="text-amber-400 font-bold">{configForm.googleAnalyticsId}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    ACTIVO
                  </span>
                </div>
              </div>

              {/* Real-time Live Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-neutral-900/80 p-4 border border-neutral-800">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                    Lectores en Vivo Ahora
                  </span>
                  <div className="text-3xl font-black text-white font-mono tabular-nums flex items-baseline gap-2">
                    <span>1.482</span>
                    <span className="text-xs text-emerald-400 font-sans font-bold">+18%</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-1 block">Concurrencia simultánea</span>
                </div>

                <div className="bg-neutral-900/80 p-4 border border-neutral-800">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                    Páginas Vistas Hoy
                  </span>
                  <div className="text-3xl font-black text-white font-mono tabular-nums">
                    94.320
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-1 block">Desde 00:00 Asunción</span>
                </div>

                <div className="bg-neutral-900/80 p-4 border border-neutral-800">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                    Tiempo Medio en Nota
                  </span>
                  <div className="text-3xl font-black text-white font-mono tabular-nums">
                    3m 48s
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-1 block">Lectura profunda</span>
                </div>

                <div className="bg-neutral-900/80 p-4 border border-neutral-800">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                    Tráfico Móvil
                  </span>
                  <div className="text-3xl font-black text-white font-mono tabular-nums">
                    84.2%
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-1 block">Smartphones Paraguay</span>
                </div>
              </div>
            </div>

            {/* Portal Configuration Settings Form */}
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-bold uppercase text-neutral-900 text-sm border-b border-neutral-200 pb-2">
                Datos Institucionales y Redes Sociales
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold uppercase block mb-1">Nombre del Portal</label>
                  <input
                    type="text"
                    value={configForm.portalName}
                    onChange={(e) => setConfigForm({ ...configForm, portalName: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase block mb-1">Eslogan Principal</label>
                  <input
                    type="text"
                    value={configForm.slogan}
                    onChange={(e) => setConfigForm({ ...configForm, slogan: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 italic"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase block mb-1">
                    Google Analytics Tracking ID (GA4)
                  </label>
                  <input
                    type="text"
                    value={configForm.googleAnalyticsId}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, googleAnalyticsId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 font-mono font-bold"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase block mb-1">Correo de Redacción</label>
                  <input
                    type="email"
                    value={configForm.contactEmail}
                    onChange={(e) => setConfigForm({ ...configForm, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-end">
                <button
                  onClick={() => {
                    onUpdateConfig(configForm);
                    showTemporaryFeedback('Configuración del portal guardada.');
                  }}
                  className="px-6 py-2.5 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Parámetros Generales</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: DIVISAS EN GUARANÍES & CLIMA CON IA               */}
        {/* ======================================================== */}
        {activeTab === 'ai_market' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
                  Cotizaciones de Monedas en Guaraníes & Clima Nacional con IA
                </h2>
                <p className="text-xs text-neutral-500">
                  Actualización inteligente de los tipos de cambio en tiempo real (Dólar, Euro, Real, Peso Argentino, Peso Uruguayo) con banderas oficiales.
                </p>
              </div>
              <button
                onClick={handleRunAiSync}
                disabled={isAiSyncing}
                className="px-5 py-2.5 bg-[#171717] hover:bg-black text-white font-bold text-xs uppercase flex items-center gap-2 shadow-md transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isAiSyncing ? 'animate-spin text-[#D71920]' : ''}`} />
                <span>{isAiSyncing ? 'Sincronizando con IA...' : 'Actualizar con IA en Tiempo Real'}</span>
              </button>
            </div>

            {aiAnalysisLog && (
              <div className="p-4 bg-red-50 border border-red-200 text-xs text-neutral-800 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#D71920] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#D71920] block mb-1">Informe del Motor de IA:</strong>
                  <p>{aiAnalysisLog}</p>
                </div>
              </div>
            )}

            {/* Currencies Editor Grid */}
            <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-bold uppercase text-neutral-900 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#D71920]" />
                <span>Pizarra Cambiaria Oficial en Guaraníes (PYG) con Banderas</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {currencies.map((curr, idx) => (
                  <div key={curr.code} className="p-4 bg-neutral-50 border border-neutral-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl">{curr.flag}</span>
                      <span className="font-mono font-bold text-xs text-neutral-900">{curr.code}</span>
                    </div>
                    <span className="text-xs font-semibold text-neutral-700 block truncate">
                      {curr.name}
                    </span>

                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 text-[10px]">Compra:</span>
                        <input
                          type="number"
                          value={curr.buyPYG}
                          onChange={(e) => {
                            const updated = [...currencies];
                            updated[idx].buyPYG = Number(e.target.value);
                            onUpdateCurrencies(updated);
                          }}
                          className="w-20 px-1.5 py-0.5 text-right border border-neutral-300 font-bold bg-white"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500 text-[10px]">Venta:</span>
                        <input
                          type="number"
                          value={curr.sellPYG}
                          onChange={(e) => {
                            const updated = [...currencies];
                            updated[idx].sellPYG = Number(e.target.value);
                            onUpdateCurrencies(updated);
                          }}
                          className="w-20 px-1.5 py-0.5 text-right border border-neutral-300 font-bold bg-white text-[#D71920]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
