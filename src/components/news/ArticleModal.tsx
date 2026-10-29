import React, { useState, useEffect } from 'react';
import { NewsArticle, Advertisement } from '../../types';
import { ImpactoLogo } from '../brand/ImpactoLogo';
import { 
  X, 
  Share2, 
  Twitter, 
  Facebook, 
  Instagram, 
  Link2, 
  Clock, 
  Calendar, 
  User, 
  ShieldCheck, 
  ExternalLink,
  Check,
  Send,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  Type,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';

interface ArticleModalProps {
  article: NewsArticle | null;
  relatedArticles: NewsArticle[];
  inArticleAd?: Advertisement;
  onClose: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenSocialStudioForArticle?: (article: NewsArticle) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (articleId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  relatedArticles,
  inArticleAd,
  onClose,
  onSelectArticle,
  onOpenSocialStudioForArticle,
  isBookmarked = false,
  onToggleBookmark,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track reading scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored or canceled by user
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    const text = `*${article.title}*\n${article.summary}\n\nLeé la nota en Impacto Político: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Synthetic TTS simulation
  const toggleAudioReader = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = `${article.title}. ${article.summary}. ${article.content.slice(0, 300)}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-ES';
        utterance.rate = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('es-PY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const fontClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
    xlarge: 'text-xl leading-relaxed',
  }[fontSize];

  return (
    <div 
      onScroll={handleScroll}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm overflow-y-auto flex justify-center p-0 md:p-6 animate-fadeIn"
    >
      <div className="bg-white text-[#171717] w-full max-w-4xl min-h-screen md:min-h-0 md:rounded-none shadow-2xl relative flex flex-col my-auto border-x border-neutral-300">
        {/* Reading progress indicator bar */}
        <div 
          className="fixed md:absolute top-0 left-0 h-1 bg-[#D71920] transition-all z-40" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Sticky top action bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 md:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors rounded-sm flex items-center gap-1 text-xs font-bold uppercase"
              title="Volver"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Volver</span>
            </button>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <ImpactoLogo variant="compact" size="sm" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#D71920] truncate max-w-[120px] sm:max-w-none">
              {article.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Audio Voice Reader Simulator */}
            <button
              onClick={toggleAudioReader}
              className={`p-2 transition-colors rounded-sm flex items-center gap-1 text-xs font-semibold ${
                isPlayingAudio ? 'bg-red-50 text-[#D71920]' : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
              title="Escuchar nota con audio sintético"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline">{isPlayingAudio ? 'Detener voz' : 'Escuchar'}</span>
            </button>

            {/* Font size toggle */}
            <div className="flex items-center bg-neutral-100 border border-neutral-200 p-0.5 text-xs font-bold">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 ${fontSize === 'normal' ? 'bg-white shadow-xs text-black' : 'text-neutral-500'}`}
                title="Texto normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 text-sm ${fontSize === 'large' ? 'bg-white shadow-xs text-black' : 'text-neutral-500'}`}
                title="Texto mediano"
              >
                A+
              </button>
            </div>

            {/* WhatsApp direct share */}
            <button
              onClick={handleWhatsAppShare}
              className="p-2 text-emerald-600 hover:bg-emerald-50 transition-colors"
              title="Compartir por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Bookmark button */}
            {onToggleBookmark && (
              <button
                onClick={() => onToggleBookmark(article.id)}
                className="p-2 text-neutral-600 hover:text-[#D71920] hover:bg-neutral-100 transition-colors"
                title="Guardar artículo"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-[#D71920]" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Native share / copy link */}
            <button
              onClick={handleNativeShare}
              className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Compartir enlace"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Cerrar artículo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Content Container */}
        <div className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8 max-w-3xl mx-auto w-full">
          {/* Header Metadata & Kicker */}
          <div className="space-y-3 border-b border-neutral-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D71920]">
              <span className="bg-red-50 text-[#D71920] px-2 py-0.5 border border-red-200">
                {article.kicker || article.categoryLabel}
              </span>
              {article.isBreaking && (
                <>
                  <span>·</span>
                  <span className="bg-[#D71920] text-white px-2 py-0.5 text-[9px] font-black animate-pulse">
                    ÚLTIMO MOMENTO
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#171717] leading-tight font-sans text-balance">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-700 font-normal leading-relaxed font-sans">
              {article.summary}
            </p>

            {/* Author and Date Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600 border-t border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs uppercase font-mono">
                  {article.author.name.slice(0, 2)}
                </div>
                <div>
                  <strong className="text-neutral-900 block font-sans font-bold">
                    Por {article.author.name}
                  </strong>
                  <span className="text-[11px] text-neutral-500">{article.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formattedDate}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readingTimeMinutes} min</span>
                </span>
              </div>
            </div>
          </div>

          {/* Primary Article Image */}
          <div className="space-y-2">
            <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 border border-neutral-300">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs text-neutral-500 font-serif italic text-right">
                Foto: {article.imageCaption}
              </p>
            )}
          </div>

          {/* Main Article Body Text */}
          <div className={`space-y-4 text-neutral-800 font-sans font-normal selection:bg-[#D71920] selection:text-white ${fontClass}`}>
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Sponsored in-article advertisement */}
          {inArticleAd && inArticleAd.active && (
            <div className="my-8 p-4 bg-neutral-50 border border-neutral-200">
              <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 block mb-2">
                CONTENIDO PATROCINADO
              </span>
              <a
                href={inArticleAd.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-white border border-neutral-300 hover:border-black transition-colors"
              >
                <h4 className="text-xs font-black uppercase text-neutral-900">
                  {inArticleAd.title}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Anunciado por: {inArticleAd.advertiser}
                </p>
              </a>
            </div>
          )}

          {/* Article Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-neutral-500 uppercase font-mono mr-1">
                Etiquetas:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Share Bar at Bottom of Article */}
          <div className="p-4 bg-neutral-50 border border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase text-neutral-800 font-sans">
              ¿Te resultó informativa esta nota? Compartila:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleWhatsAppShare}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Copiar Enlace</span>
              </button>
            </div>
          </div>

          {/* Related Articles Strip */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-neutral-200 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#171717] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#D71920]" />
                <span>Noticias Relacionadas</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectArticle(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 bg-white border border-neutral-200 hover:border-black cursor-pointer group space-y-2 transition-colors"
                  >
                    <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[9px] font-bold uppercase text-[#D71920] block font-mono">
                      {rel.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-900 group-hover:text-[#D71920] line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
