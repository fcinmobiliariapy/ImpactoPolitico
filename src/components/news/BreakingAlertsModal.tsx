import React from 'react';
import { NewsArticle } from '../../types';
import { X, Zap, Clock, ChevronRight } from 'lucide-react';

interface BreakingAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const BreakingAlertsModal: React.FC<BreakingAlertsModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  if (!isOpen) return null;

  const breakingArticles = articles.filter((a) => a.isBreaking || a.isLeadStory || a.viewsCount > 1500);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-fadeIn">
      <div 
        className="bg-white text-[#171717] w-full max-w-lg max-h-[85vh] flex flex-col rounded-t-2xl sm:rounded-lg shadow-2xl border border-neutral-300 overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-[#171717] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D71920] animate-pulse" />
            <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span>Alertas & Último Momento</span>
              <span className="text-[10px] bg-[#D71920] px-1.5 py-0.5 font-mono">
                {breakingArticles.length} ACTIVAS
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto divide-y divide-neutral-200 space-y-3">
          {breakingArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => {
                onSelectArticle(art);
                onClose();
              }}
              className="pt-3 first:pt-0 cursor-pointer group flex items-start gap-3 hover:bg-neutral-50 p-2 transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#D71920] mt-1.5 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <span className="font-bold text-[#D71920] uppercase">{art.kicker || art.categoryLabel}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(art.publishedAt).toLocaleTimeString('es-PY', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      HS
                    </span>
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#D71920] transition-colors leading-snug">
                  {art.title}
                </h4>
                <p className="text-[11px] text-neutral-600 line-clamp-2">
                  {art.summary}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-black shrink-0 mt-3" />
            </div>
          ))}
        </div>

        <div className="p-3 bg-neutral-100 border-t border-neutral-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase transition-colors"
          >
            Cerrar Alertas
          </button>
        </div>
      </div>
    </div>
  );
};
