import React, { useState } from 'react';
import { ImpactoLogo } from '../brand/ImpactoLogo';
import { NewsArticle } from '../../types';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Send, 
  Sparkles, 
  Check, 
  Layers, 
  Download, 
  Share2,
  Sliders,
  Vote,
  Video,
  AlertCircle,
  Quote
} from 'lucide-react';

interface SocialTemplatesStudioProps {
  articles: NewsArticle[];
  onClose?: () => void;
}

type SocialTemplateType = 'informative' | 'breaking' | 'quote' | 'poll' | 'reel';
type AspectRatioType = '1:1' | '4:5' | '9:16' | '16:9';

export const SocialTemplatesStudio: React.FC<SocialTemplatesStudioProps> = ({ articles, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<SocialTemplateType>('informative');
  const [selectedAspect, setSelectedAspect] = useState<AspectRatioType>('1:1');
  
  // Customization fields
  const [headline, setHeadline] = useState(
    articles[0]?.title || 'Congreso define en sesión maratónica reforma del Estado'
  );
  const [category, setCategory] = useState('CONGRESO NACIONAL');
  const [deck, setDeck] = useState(
    articles[0]?.summary || 'Debate abierto sobre austeridad fiscal y gastos del Estado en Asunción.'
  );
  const [quoteText, setQuoteText] = useState(
    'La institucionalidad democrática no se negocia; se defiende con transparencia en cada acto de gobierno.'
  );
  const [quoteAuthor, setQuoteAuthor] = useState('Dra. Carmen Montiel');
  const [quoteRole, setQuoteRole] = useState('Constitucionalista');
  const [pollQuestion, setPollQuestion] = useState(
    '¿Considera prioritario sancionar la nueva ley de reforma del gasto público?'
  );
  const [pollOptions, setPollOptions] = useState([
    { text: 'Sí, es urgente transparentar el Estado', votes: 68 },
    { text: 'No, requiere mayor debate ciudadano', votes: 24 },
    { text: 'Indiferente / Sin opinión', votes: 8 },
  ]);
  const [selectedImage, setSelectedImage] = useState(
    articles[0]?.imageUrl || '/src/assets/images/paraguay_congress_session_1793294703438.jpg'
  );

  // Social Publishing Modal Simulation
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [targetPlatform, setTargetPlatform] = useState<'x' | 'facebook' | 'instagram'>('x');
  const [publishedStatus, setPublishedStatus] = useState<string | null>(null);

  // Aspect ratio classes
  const aspectClassMap: Record<AspectRatioType, string> = {
    '1:1': 'aspect-square max-w-md',
    '4:5': 'aspect-[4/5] max-w-sm',
    '9:16': 'aspect-[9/16] max-w-xs',
    '16:9': 'aspect-video max-w-lg',
  };

  const handleSelectArticle = (art: NewsArticle) => {
    setHeadline(art.title);
    setCategory(art.categoryLabel.toUpperCase());
    setDeck(art.summary);
    if (art.imageUrl) setSelectedImage(art.imageUrl);
  };

  const handlePublishToSocial = () => {
    setPublishedStatus('Publicando en ' + targetPlatform.toUpperCase() + '...');
    setTimeout(() => {
      setPublishedStatus('¡Contenido publicado exitosamente en @impactopoliticopy!');
      setTimeout(() => {
        setPublishedStatus(null);
        setShowPublishModal(false);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen text-[#171717] py-6 px-4 md:px-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <ImpactoLogo variant="compact" size="sm" />
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-[#171717]">
              Estudio de Redes Sociales
            </h1>
            <span className="text-xs text-neutral-500 font-mono">
              Generador Oficial de Piezas Digitales para Facebook, Instagram, X y Reels
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPublishModal(true)}
            className="px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publicar en Redes</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 hover:border-black text-xs font-bold uppercase transition-colors"
            >
              Volver
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Controls and Selectors (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Template selection */}
          <div className="bg-white p-5 border border-neutral-200 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
              1. Seleccionar Formato de Plantilla
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'informative', label: 'A. Informativa', icon: Layers },
                { id: 'breaking', label: 'B. Último Momento', icon: AlertCircle },
                { id: 'quote', label: 'C. Frase del Día', icon: Quote },
                { id: 'poll', label: 'D. Encuesta Ciudadana', icon: Vote },
                { id: 'reel', label: 'E. Video / Reel', icon: Video },
              ].map((tmpl) => {
                const Icon = tmpl.icon;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplate(tmpl.id as SocialTemplateType);
                      if (tmpl.id === 'reel') setSelectedAspect('9:16');
                    }}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-bold text-left transition-colors border ${
                      selectedTemplate === tmpl.id
                        ? 'border-[#D71920] bg-red-50 text-[#D71920]'
                        : 'border-neutral-200 hover:border-neutral-400 text-neutral-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tmpl.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Aspect Ratio */}
          <div className="bg-white p-5 border border-neutral-200 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
              2. Proporción y Red Social
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: '1:1', label: '1080×1080', sub: 'IG / FB Feed' },
                { id: '4:5', label: '1080×1350', sub: 'IG Vertical' },
                { id: '9:16', label: '1080×1920', sub: 'Reels / Stories' },
                { id: '16:9', label: '1200×675', sub: 'X / YouTube' },
              ].map((asp) => (
                <button
                  key={asp.id}
                  onClick={() => setSelectedAspect(asp.id as AspectRatioType)}
                  className={`p-2 text-center text-xs border transition-colors ${
                    selectedAspect === asp.id
                      ? 'border-black bg-neutral-900 text-white font-bold'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <div className="font-mono font-bold text-[11px]">{asp.id}</div>
                  <div className="text-[9px] opacity-80 mt-0.5">{asp.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. News Auto-Loader */}
          <div className="bg-white p-5 border border-neutral-200 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
              3. Cargar desde Nota del Portal
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {articles.slice(0, 5).map((art) => (
                <button
                  key={art.id}
                  onClick={() => handleSelectArticle(art)}
                  className="w-full text-left p-2 border border-neutral-100 hover:border-neutral-300 text-xs text-neutral-800 transition-colors flex items-center justify-between group"
                >
                  <div className="truncate pr-2">
                    <span className="font-bold text-[10px] text-[#D71920] uppercase block">
                      {art.categoryLabel}
                    </span>
                    <span className="group-hover:text-black line-clamp-1">{art.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 shrink-0">Usar</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Text Editor Fields */}
          <div className="bg-white p-5 border border-neutral-200 shadow-sm space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
              4. Contenido & Textos de la Pieza
            </label>

            {selectedTemplate !== 'quote' && selectedTemplate !== 'poll' && (
              <>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                    Categoría / Volanta
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                    Titular Principal
                  </label>
                  <textarea
                    rows={3}
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                    Bajada Informativa
                  </label>
                  <textarea
                    rows={2}
                    value={deck}
                    onChange={(e) => setDeck(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black text-neutral-700"
                  />
                </div>
              </>
            )}

            {selectedTemplate === 'quote' && (
              <>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                    Cita Textual Verificable
                  </label>
                  <textarea
                    rows={3}
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black italic font-serif"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                      Autor de la Frase
                    </label>
                    <input
                      type="text"
                      value={quoteAuthor}
                      onChange={(e) => setQuoteAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                      Cargo / Función
                    </label>
                    <input
                      type="text"
                      value={quoteRole}
                      onChange={(e) => setQuoteRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </>
            )}

            {selectedTemplate === 'poll' && (
              <>
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">
                    Pregunta de la Encuesta
                  </label>
                  <input
                    type="text"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase block">
                    Opciones y Porcentajes
                  </label>
                  {pollOptions.map((opt, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={opt.text}
                        onChange={(e) => {
                          const updated = [...pollOptions];
                          updated[i].text = e.target.value;
                          setPollOptions(updated);
                        }}
                        className="flex-1 px-3 py-1.5 text-xs border border-neutral-300"
                      />
                      <input
                        type="number"
                        value={opt.votes}
                        onChange={(e) => {
                          const updated = [...pollOptions];
                          updated[i].votes = Number(e.target.value);
                          setPollOptions(updated);
                        }}
                        className="w-16 px-2 py-1.5 text-xs font-mono border border-neutral-300 text-center"
                      />
                      <span className="text-xs text-neutral-400 font-mono">%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Live Graphic Canvas Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Vista Previa en Vivo (Render Vectorial)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">
                {selectedAspect} · {selectedTemplate.toUpperCase()}
              </span>
            </div>
          </div>

          {/* THE ARTBOARD CANVAS CONTAINER */}
          <div
            id="social-artboard"
            className={`w-full ${aspectClassMap[selectedAspect]} shadow-2xl relative overflow-hidden flex flex-col justify-between border-4 border-neutral-900 select-none transition-all duration-300`}
            style={{ backgroundColor: selectedTemplate === 'breaking' ? '#0D0D0D' : '#171717' }}
          >
            {/* Background Image with Cinematic Scrim */}
            <div className="absolute inset-0 z-0">
              <img
                src={selectedImage}
                alt={headline}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-40 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            </div>

            {/* Canvas Header */}
            <div className="relative z-10 p-6 flex items-start justify-between">
              {/* Category tag or Breaking badge */}
              {selectedTemplate === 'breaking' ? (
                <div className="flex items-center gap-2 bg-[#D71920] text-white px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>ÚLTIMO MOMENTO</span>
                </div>
              ) : selectedTemplate === 'quote' ? (
                <span className="text-xs font-bold uppercase tracking-widest text-[#D71920] bg-white/10 backdrop-blur-sm px-2.5 py-1">
                  FRASE DEL DÍA
                </span>
              ) : selectedTemplate === 'poll' ? (
                <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#D71920] px-2.5 py-1">
                  ENCUESTA CIUDADANA
                </span>
              ) : (
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#D71920] bg-white/95 px-2.5 py-1">
                  {category}
                </span>
              )}

              {/* Brand Logo in Social Card */}
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10">
                <ImpactoLogo variant="compact" colorMode="white" size="sm" />
              </div>
            </div>

            {/* Canvas Body Content */}
            <div className="relative z-10 p-6 space-y-4">
              {/* Informative, Breaking, or Reel */}
              {(selectedTemplate === 'informative' ||
                selectedTemplate === 'breaking' ||
                selectedTemplate === 'reel') && (
                <div className="space-y-3">
                  <h2
                    className={`font-black uppercase tracking-tight text-white font-sans ${
                      selectedAspect === '9:16'
                        ? 'text-2xl md:text-3xl leading-snug'
                        : selectedAspect === '16:9'
                        ? 'text-xl md:text-2xl leading-tight'
                        : 'text-2xl md:text-3xl leading-tight'
                    }`}
                  >
                    {headline}
                  </h2>
                  {deck && selectedAspect !== '16:9' && (
                    <p className="text-xs md:text-sm text-neutral-300 font-medium leading-relaxed line-clamp-3">
                      {deck}
                    </p>
                  )}
                </div>
              )}

              {/* Frase del Día */}
              {selectedTemplate === 'quote' && (
                <div className="my-auto space-y-4">
                  <span className="text-4xl font-serif text-[#D71920] block leading-none">“</span>
                  <blockquote className="text-base md:text-xl font-serif italic text-white leading-relaxed">
                    {quoteText}
                  </blockquote>
                  <div className="pt-3 border-t border-white/20">
                    <span className="text-sm font-extrabold uppercase tracking-wide text-white block">
                      {quoteAuthor}
                    </span>
                    <span className="text-xs text-[#D71920] font-semibold uppercase">
                      {quoteRole}
                    </span>
                  </div>
                </div>
              )}

              {/* Encuesta Participativa */}
              {selectedTemplate === 'poll' && (
                <div className="space-y-4">
                  <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                    {pollQuestion}
                  </h3>
                  <div className="space-y-2">
                    {pollOptions.map((opt, i) => (
                      <div
                        key={i}
                        className="bg-white/10 backdrop-blur-sm p-3 border border-white/20 text-white flex items-center justify-between"
                      >
                        <span className="text-xs font-semibold">{opt.text}</span>
                        <span className="text-xs font-mono font-bold text-[#D71920] bg-white px-2 py-0.5 ml-2 shrink-0">
                          {opt.votes}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Canvas Footer */}
            <div className="relative z-10 px-6 py-4 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">IMPACTO POLÍTICO</span>
                <span>·</span>
                <span>PARAGUAY</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-neutral-300">@impactopoliticopy</span>
                <span>·</span>
                <span>www.impactopolitico.com.py</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setShowPublishModal(true)}
              className="px-5 py-2.5 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-sm transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Publicar en X / Facebook / Instagram</span>
            </button>
            <button
              onClick={() => {
                alert('Tarjeta copiada al portapapeles en alta resolución (1080px)');
              }}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar PNG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Social Publishing Direct Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-neutral-900 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#D71920]" />
                <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900">
                  Publicar en Redes Oficiales
                </h3>
              </div>
              <button
                onClick={() => setShowPublishModal(false)}
                className="text-neutral-400 hover:text-black font-mono font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-neutral-500 block">
                Seleccionar Red Social Destino
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'x', label: 'X (Twitter)', icon: Twitter },
                  { id: 'facebook', label: 'Facebook', icon: Facebook },
                  { id: 'instagram', label: 'Instagram', icon: Instagram },
                ].map((plat) => {
                  const Icon = plat.icon;
                  return (
                    <button
                      key={plat.id}
                      onClick={() => setTargetPlatform(plat.id as 'x' | 'facebook' | 'instagram')}
                      className={`p-3 border text-xs font-bold flex flex-col items-center gap-1.5 transition-colors ${
                        targetPlatform === plat.id
                          ? 'border-black bg-neutral-900 text-white'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{plat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-neutral-500 block mb-1">
                Texto del Post (Copyperiodístico)
              </label>
              <textarea
                rows={4}
                defaultValue={`🔴 #ÚLTIMOMOMENTO | ${headline}\n\n${deck}\n\nLeé la investigación completa en el enlace:\n👉 www.impactopolitico.com.py\n\n#Paraguay #PoliticaPY #Actualidad`}
                className="w-full p-3 text-xs border border-neutral-300 font-sans focus:outline-none focus:border-black"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>Cuenta: @impactopoliticopy</span>
                <span>Caracteres: 248 / 280</span>
              </div>
            </div>

            {publishedStatus && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{publishedStatus}</span>
              </div>
            )}

            <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 border border-neutral-300 text-xs font-semibold uppercase hover:bg-neutral-50"
              >
                Cancelar
              </button>
              <button
                onClick={handlePublishToSocial}
                className="px-5 py-2 bg-[#D71920] hover:bg-red-700 text-white text-xs font-bold uppercase flex items-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirmar y Transmitir</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
