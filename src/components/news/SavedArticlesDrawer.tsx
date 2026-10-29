import React from 'react';
import { NewsArticle } from '../../types';
import { 
  X, 
  Bookmark, 
  Trash2, 
  Clock, 
  ExternalLink, 
  BookOpen, 
  ChevronRight 
} from 'lucide-react';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="bg-white text-[#171717] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-neutral-300 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#D71920]" />
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-tight text-neutral-900">
                Artículos Guardados
              </h3>
              <span className="text-xs text-neutral-500 font-mono">
                {savedArticles.length} {savedArticles.length === 1 ? 'publicación' : 'publicaciones'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedArticles.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-[11px] font-bold text-neutral-500 hover:text-rose-600 transition-colors uppercase"
                title="Eliminar todos los guardados"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="py-20 text-center space-y-3 px-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-neutral-800 uppercase">
                Aún no tienes artículos guardados
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Toca el ícono de marcalibros en cualquier noticia para guardarla y leerla más tarde en tu celular o computadora.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 transition-colors flex gap-3 group relative"
              >
                {/* Thumb */}
                <div 
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="w-20 h-20 bg-neutral-200 shrink-0 overflow-hidden cursor-pointer"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div 
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="cursor-pointer space-y-1"
                  >
                    <span className="text-[10px] font-bold uppercase text-[#D71920] block font-mono">
                      {article.categoryLabel}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-900 group-hover:text-[#D71920] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readingTimeMinutes} min</span>
                    </span>

                    <button
                      onClick={() => onRemoveBookmark(article.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                      title="Quitar de guardados"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center">
          <p className="text-[11px] text-neutral-500 font-sans">
            Lectura guardada localmente en este dispositivo.
          </p>
        </div>
      </div>
    </div>
  );
};
