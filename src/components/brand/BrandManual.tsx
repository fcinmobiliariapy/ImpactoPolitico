import React, { useState } from 'react';
import { ImpactoLogo } from './ImpactoLogo';
import { AudiovisualSimulator } from './AudiovisualSimulator';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Download, 
  Printer, 
  Eye, 
  Layers, 
  Type, 
  Palette, 
  FileText, 
  Share2, 
  Tv, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BrandManualProps {
  onBackToPortal?: () => void;
  onOpenSocialStudio?: () => void;
}

export const BrandManual: React.FC<BrandManualProps> = ({ onBackToPortal, onOpenSocialStudio }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [showAudiovisual, setShowAudiovisual] = useState(false);

  const colors = [
    {
      name: 'Rojo Impacto',
      hex: '#D71920',
      rgb: '215, 25, 32',
      cmyk: '0%, 98%, 95%, 5%',
      pantone: 'Pantone 186 C',
      role: 'Color primario de acento, urgencia periodística, titulares clave y llamadas a la acción.',
      bgClass: 'bg-[#D71920]',
      textColor: 'text-white',
    },
    {
      name: 'Negro Profundo',
      hex: '#171717',
      rgb: '23, 23, 23',
      cmyk: '70%, 65%, 60%, 85%',
      pantone: 'Pantone Black 6 C',
      role: 'Color estructural, seriedad institucional, tipografía de lectura y contraste formal.',
      bgClass: 'bg-[#171717]',
      textColor: 'text-white',
    },
    {
      name: 'Blanco Puro',
      hex: '#FFFFFF',
      rgb: '255, 255, 255',
      cmyk: '0%, 0%, 0%, 0%',
      pantone: 'Opaque White',
      role: 'Lienzo de fondo principal, aireación editorial, nitidez de lectura y transparencia.',
      bgClass: 'bg-white border border-neutral-300',
      textColor: 'text-[#171717]',
    },
    {
      name: 'Gris Editorial',
      hex: '#6B7280',
      rgb: '107, 114, 128',
      cmyk: '50%, 40%, 40%, 15%',
      pantone: 'Pantone Cool Gray 8 C',
      role: 'Metadatos, fechas, firmas de autor, epígrafes, divisores y elementos complementarios.',
      bgClass: 'bg-[#6B7280]',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#171717]">
      {/* Top sticky brand bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ImpactoLogo variant="compact" size="sm" />
            <span className="hidden sm:inline-block text-xs uppercase font-bold tracking-widest text-neutral-400">
              Manual Oficial de Identidad Corporativa 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenSocialStudio && (
              <button
                onClick={onOpenSocialStudio}
                className="px-3 py-1.5 text-xs font-semibold border border-neutral-300 hover:border-black text-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Generador Redes</span>
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            {onBackToPortal && (
              <button
                onClick={onBackToPortal}
                className="px-4 py-1.5 text-xs font-bold uppercase bg-[#D71920] hover:bg-red-700 text-white transition-colors"
              >
                Volver al Portal Web
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Cover of Brand Book */}
      <header className="bg-[#171717] text-white py-16 px-6 border-b-4 border-[#D71920]">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-[#D71920]/40 text-[#D71920] text-xs font-bold tracking-widest uppercase">
            <span>República del Paraguay</span>
            <span>·</span>
            <span>Periodismo Independiente</span>
          </div>

          <ImpactoLogo variant="vertical" colorMode="white" size="xl" showSlogan={true} />

          <h1 className="mt-8 text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-sans max-w-3xl">
            Guía y Sistema de Identidad Visual Corporativa
          </h1>

          <p className="mt-4 text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Normativa de diseño, arquitectura tipográfica, directrices de redacción y directivas de comunicación para el medio periodístico de referencia en Paraguay.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-neutral-400 border-t border-neutral-800 pt-6">
            <div>
              <span className="text-neutral-200 font-bold block">MEDIO:</span> IMPACTO POLÍTICO
            </div>
            <div>
              <span className="text-neutral-200 font-bold block">ESLOGAN:</span> «La actualidad que mueve al Paraguay»
            </div>
            <div>
              <span className="text-neutral-200 font-bold block">VERSIÓN:</span> 2.4 - Octubre 2026
            </div>
            <div>
              <span className="text-neutral-200 font-bold block">COBERTURA:</span> Asunción e Interior del País
            </div>
          </div>
        </div>
      </header>

      {/* Navigation tabs for manual */}
      <div className="bg-white border-b border-neutral-200 sticky top-14 z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 py-2">
          {[
            { id: 'intro', label: '1. Propósito & Valores', icon: ShieldCheck },
            { id: 'logo', label: '2. Logotipo & Isotipos', icon: Layers },
            { id: 'color', label: '3. Paleta Cromática', icon: Palette },
            { id: 'type', label: '4. Tipografía', icon: Type },
            { id: 'applications', label: '5. Aplicaciones & Papelería', icon: FileText },
            { id: 'social', label: '6. Redes Sociales', icon: Share2 },
            { id: 'audiovisual', label: '7. Audiovisual & Motion', icon: Tv },
            { id: 'editorial', label: '8. Tono Periodístico', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeSection === tab.id
                    ? 'border-[#D71920] text-[#D71920] bg-red-50/50'
                    : 'border-transparent text-neutral-600 hover:text-black hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Section 1: Propósito, Misión, Visión y Valores */}
        {(activeSection === 'intro' || activeSection === 'all') && (
          <section className="space-y-6">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-[#D71920] font-bold">Capítulo 01</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-1">
                Identidad y Personalidad de Marca
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-neutral-50 p-6 md:p-8 border border-neutral-200">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#171717] uppercase tracking-wide">
                  Propósito Fundamental
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  Posicionar a <strong>IMPACTO POLÍTICO</strong> como el portal digital más confiable, riguroso y dinámico del Paraguay. Buscamos informar, analizar y explicar con celeridad y profundidad los hechos políticos, legislativos, económicos y sociales que inciden directamente en el presente y porvenir de la ciudadanía paraguaya.
                </p>
                <div className="p-4 bg-white border-l-4 border-[#D71920] shadow-sm">
                  <span className="text-xs text-neutral-500 font-semibold block uppercase tracking-wider">Eslogan Institucional:</span>
                  <span className="text-base font-bold text-[#171717] italic">«La actualidad que mueve al Paraguay»</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#171717] uppercase tracking-wide">
                  Misión y Visión
                </h3>
                <div className="space-y-3 text-sm text-neutral-700">
                  <p>
                    <strong>Misión:</strong> Ejercer un periodismo independiente, verificable y despojado de sesgos propagandísticos que fiscalice los actos de gobierno, dé voz a la ciudadanía y contribuya al fortalecimiento de las instituciones democráticas del Paraguay.
                  </p>
                  <p>
                    <strong>Visión:</strong> Ser el medio de comunicación referente en el ecosistema digital del Mercosur, reconocido por sus investigaciones de impacto, su solvencia técnica y su compromiso con la verdad.
                  </p>
                </div>
              </div>
            </div>

            {/* 8 Core Values */}
            <div className="pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-600 mb-4">
                Los 8 Pilares de Personalidad Periodística
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: 'Credibilidad & Confianza', desc: 'Verificación rigurosa de fuentes antes de publicar.' },
                  { title: 'Independencia Plena', desc: 'Sin ataduras partidarias ni subordinación a grupos de poder.' },
                  { title: 'Autoridad Informativa', desc: 'Análisis fundamentado con datos y base documental.' },
                  { title: 'Rapidez & Oportunidad', desc: 'Cobertura en tiempo real sin sacrificar precisión.' },
                  { title: 'Investigación Profunda', desc: 'Periodismo de datos y seguimiento presupuestario.' },
                  { title: 'Compromiso Ciudadano', desc: 'Defensa del interés público y de los bienes comunes.' },
                  { title: 'Transparencia Total', desc: 'Política clara de fuentes y rectificación de errores.' },
                  { title: 'Innovación Digital', desc: 'Formatos interactivos, móviles y distribución multicanal.' },
                ].map((val, idx) => (
                  <div key={idx} className="p-4 bg-white border border-neutral-200">
                    <span className="text-xs font-mono text-[#D71920] font-bold block mb-1">0{idx + 1}</span>
                    <h4 className="text-xs font-bold text-neutral-900 mb-1">{val.title}</h4>
                    <p className="text-[11px] text-neutral-500 leading-normal">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 2: Logotipo, Isotipos y Construcción */}
        {(activeSection === 'logo' || activeSection === 'all') && (
          <section className="space-y-8">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-[#D71920] font-bold">Capítulo 02</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-1">
                Logotipo, Tres Propuestas de Isotipo & Proporciones
              </h2>
            </div>

            {/* Main horizontal logo presentation */}
            <div className="p-8 bg-white border border-neutral-200 flex flex-col items-center justify-center gap-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Logotipo Principal Máster (Versión Horizontal)
              </span>
              <div className="py-6">
                <ImpactoLogo variant="horizontal" size="xl" showSlogan={true} />
              </div>
              <p className="text-xs text-neutral-500 max-w-lg">
                El vocablo <strong>IMPACTO</strong> ejerce como elemento de dominio visual en peso ultra-bold, mientras <strong>POLÍTICO</strong> se dispone en tracking extendido con el acento en Rojo Impacto (#D71920).
              </p>
            </div>

            {/* Three Isotype Proposals (Punto 14 del requerimiento) */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wide mb-4">
                Tres Propuestas de Isotipo Independiente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Propuesta 1 */}
                <div className="p-6 bg-white border-2 border-neutral-200 hover:border-[#D71920] transition-colors flex flex-col items-center text-center">
                  <div className="w-20 h-20 flex items-center justify-center my-2">
                    <ImpactoLogo variant="isotype-only" size="xl" />
                  </div>
                  <span className="inline-block mt-3 px-2 py-0.5 bg-red-100 text-[#D71920] text-[10px] font-bold uppercase">
                    Propuesta 1 (Oficial Seleccionada)
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 mt-2">Micrófono Periodístico & Ondas de Señal</h4>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    Cápsula de micrófono de prensa profesional emitiendo ondas expansivas de transmisión de información en Rojo Impacto (#D71920). Representa la voz periodística, la inmediatez y la difusión democrática en Paraguay.
                  </p>
                </div>

                {/* Propuesta 2 */}
                <div className="p-6 bg-white border border-neutral-200 flex flex-col items-center text-center">
                  <div className="w-20 h-20 flex items-center justify-center my-2">
                    <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
                      <rect x="20" y="20" width="60" height="60" rx="8" stroke="#171717" strokeWidth="8" />
                      <circle cx="50" cy="50" r="16" fill="#D71920" />
                      <line x1="10" y1="50" x2="90" y2="50" stroke="#D71920" strokeWidth="4" />
                    </svg>
                  </div>
                  <span className="inline-block mt-3 px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-bold uppercase">
                    Propuesta 2 (Alternativa Geométrica)
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 mt-2">Prisma de Convergencia</h4>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    Estructura cuadrada de rigor institucional atravesada por el pulso rojo de la noticia que rompe la inercia informativa.
                  </p>
                </div>

                {/* Propuesta 3 */}
                <div className="p-6 bg-white border border-neutral-200 flex flex-col items-center text-center">
                  <div className="w-20 h-20 flex items-center justify-center my-2">
                    <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="38" stroke="#171717" strokeWidth="6" strokeDasharray="6 6" />
                      <path d="M50 15 L78 75 L22 75 Z" fill="#D71920" />
                      <circle cx="50" cy="55" r="7" fill="#FFFFFF" />
                    </svg>
                  </div>
                  <span className="inline-block mt-3 px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-bold uppercase">
                    Propuesta 3 (Baliza de Transmisión)
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 mt-2">Baliza de Transmisión Satelital</h4>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    Inspirada en las antenas de radiodifusión digital y la órbita de telecomunicaciones soberanas del Paraguay.
                  </p>
                </div>
              </div>
            </div>

            {/* Versiones Color, Blanco y Negro (Punto 15 del requerimiento) */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wide mb-4">
                Variantes Cromáticas: Color, Negativo y Monocromo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-neutral-200 flex flex-col items-center justify-center text-center min-h-[160px]">
                  <ImpactoLogo variant="compact" colorMode="color" size="md" />
                  <span className="text-xs font-mono text-neutral-500 mt-4">Versión Color Positivo (Fondo Blanco)</span>
                </div>
                <div className="p-6 bg-[#171717] border border-neutral-800 flex flex-col items-center justify-center text-center min-h-[160px]">
                  <ImpactoLogo variant="compact" colorMode="white" size="md" />
                  <span className="text-xs font-mono text-neutral-400 mt-4">Versión Color Negativo (Fondo Oscuro)</span>
                </div>
                <div className="p-6 bg-white border border-neutral-200 flex flex-col items-center justify-center text-center min-h-[160px]">
                  <ImpactoLogo variant="compact" colorMode="monochrome" size="md" />
                  <span className="text-xs font-mono text-neutral-500 mt-4">Versión 100% Monocromo (Tinta Negra)</span>
                </div>
              </div>
            </div>

            {/* Proportions and Clear Space Grid */}
            <div className="p-6 bg-neutral-50 border border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4">
                Área de Protección y Tamaño Mínimo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative p-8 border-2 border-dashed border-red-300 bg-white flex items-center justify-center">
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-red-500">X = Altura "I"</div>
                  <div className="p-4 border border-neutral-200">
                    <ImpactoLogo variant="horizontal" size="md" />
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-red-500">Área de reserva 1.5X</div>
                </div>

                <div className="space-y-4 text-xs text-neutral-700">
                  <p>
                    <strong>Área de Reserva (Clear Space):</strong> Ningún elemento gráfico, titular, fotografía o borde institucional puede invadir la zona perimetral equivalente a <strong>1.5 veces</strong> la altura de la letra 'I' de IMPACTO.
                  </p>
                  <p>
                    <strong>Tamaño Mínimo Digital:</strong> 28 píxeles de altura en pantallas estándar (para mantener la legibilidad de 'POLÍTICO').
                  </p>
                  <p>
                    <strong>Tamaño Mínimo Impreso:</strong> 18 milímetros de ancho en offset o rotativa periodística.
                  </p>
                </div>
              </div>
            </div>

            {/* Usos Correctos e Incorrectos */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wide mb-4">
                Normas de Uso: Correctos vs. Incorrectos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Uso Correcto</span>
                  </div>
                  <div className="h-20 bg-white flex items-center justify-center p-2 border border-emerald-100">
                    <ImpactoLogo variant="compact" size="sm" />
                  </div>
                  <p className="text-[11px] text-emerald-900 mt-2">
                    Uso de logotipo en proporciones exactas sobre fondo de alto contraste.
                  </p>
                </div>

                <div className="p-4 bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 text-red-700 text-xs font-bold mb-2">
                    <XCircle className="w-4 h-4" />
                    <span>No Deformar</span>
                  </div>
                  <div className="h-20 bg-white flex items-center justify-center p-2 border border-red-100 overflow-hidden">
                    <div className="scale-x-150 scale-y-75 opacity-70">
                      <ImpactoLogo variant="compact" size="sm" />
                    </div>
                  </div>
                  <p className="text-[11px] text-red-900 mt-2">
                    Queda terminantemente prohibido estirar o comprimir las proporciones del imagotipo.
                  </p>
                </div>

                <div className="p-4 bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 text-red-700 text-xs font-bold mb-2">
                    <XCircle className="w-4 h-4" />
                    <span>No Cambiar Colores</span>
                  </div>
                  <div className="h-20 bg-yellow-100 flex items-center justify-center p-2 border border-red-100">
                    <span className="text-xs font-black text-purple-700 tracking-tighter">IMPACTO POLÍTICO</span>
                  </div>
                  <p className="text-[11px] text-red-900 mt-2">
                    No sustituir el rojo institucional por otros colores no autorizados en el manual.
                  </p>
                </div>

                <div className="p-4 bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 text-red-700 text-xs font-bold mb-2">
                    <XCircle className="w-4 h-4" />
                    <span>No Sombras o Biseles</span>
                  </div>
                  <div className="h-20 bg-neutral-200 flex items-center justify-center p-2 border border-red-100">
                    <div className="drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]">
                      <ImpactoLogo variant="compact" size="sm" />
                    </div>
                  </div>
                  <p className="text-[11px] text-red-900 mt-2">
                    No aplicar sombras excesivas, trazos exteriores ni degradados artificiales.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Paleta Cromática */}
        {(activeSection === 'color' || activeSection === 'all') && (
          <section className="space-y-6">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-[#D71920] font-bold">Capítulo 03</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-1">
                Paleta Cromática Corporativa & Códigos Técnicos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {colors.map((c, i) => (
                <div key={i} className="bg-white border border-neutral-200 overflow-hidden flex flex-col">
                  <div className={`h-32 w-full ${c.bgClass} flex items-end p-4`}>
                    <span className={`text-xs font-bold uppercase tracking-wider ${c.textColor}`}>
                      {c.name}
                    </span>
                  </div>
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between border-b border-neutral-100 pb-1">
                        <span className="text-neutral-500 font-medium">HEX</span>
                        <span className="font-mono font-bold text-neutral-900">{c.hex}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-1">
                        <span className="text-neutral-500 font-medium">RGB</span>
                        <span className="font-mono text-neutral-800">{c.rgb}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-1">
                        <span className="text-neutral-500 font-medium">CMYK</span>
                        <span className="font-mono text-neutral-800">{c.cmyk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500 font-medium">Pantone</span>
                        <span className="font-mono text-neutral-800">{c.pantone}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-600 border-t border-neutral-100 pt-3">
                      {c.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Application rule notice */}
            <div className="p-4 bg-neutral-900 text-neutral-200 text-xs border-l-4 border-[#D71920]">
              <span className="font-bold text-white block mb-1">Criterio Editorial de Contención Cromática:</span>
              El Rojo Impacto (#D71920) se rige bajo la regla <strong>60-30-10</strong>: 60% lienzo blanco/neutro, 30% negro y estructura tipográfica, y 10% exclusivo para el color rojo. Queda prohibido inundar el portal de fondos rojos indiscriminados para evitar fatiga visual del lector.
            </div>
          </section>
        )}

        {/* Section 4: Sistema Tipográfico */}
        {(activeSection === 'type' || activeSection === 'all') && (
          <section className="space-y-6">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-[#D71920] font-bold">Capítulo 04</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-1">
                Sistema Tipográfico & Jerarquías Editoriales
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary sans serif font */}
              <div className="p-6 bg-white border border-neutral-200 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D71920] font-bold">
                  Tipografía Titular & Brand
                </span>
                <h3 className="text-2xl font-black text-neutral-900 font-sans">
                  Montserrat / Plus Jakarta Sans
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Familia sans serif geométrica, rotunda y contemporánea. Aporta solidez periodística, alta legibilidad a escala reducida en dispositivos móviles y gran fuerza en titulares de portada.
                </p>
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <div className="text-xl font-extrabold text-neutral-900">
                    Aa Bb Cc Dd Ee Ff Gg 1234567890
                  </div>
                  <div className="text-xs text-neutral-500 font-mono">
                    Pesos aprobados: Black 900 (Marca), ExtraBold 800 (Titulares), SemiBold 600 (Subtítulos).
                  </div>
                </div>
              </div>

              {/* Secondary editorial serif for long-form body */}
              <div className="p-6 bg-white border border-neutral-200 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D71920] font-bold">
                  Tipografía de Lectura & Cuerpo
                </span>
                <h3 className="text-2xl font-serif font-bold text-neutral-900">
                  Source Serif 4 / Georgia Pro
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Serif editorial de alto rendimiento de lectura. Empleada en los reportajes de fondo, investigaciones exclusivas y columnas de opinión para brindar una cadencia descansada y de alto valor periodístico.
                </p>
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <div className="text-xl font-serif text-neutral-900">
                    Aa Bb Cc Dd Ee Ff Gg 1234567890
                  </div>
                  <div className="text-xs text-neutral-500 font-mono">
                    Pesos aprobados: Regular 400 (Cuerpo), Italic 400 (Citas textuales), SemiBold 600 (Ladillos).
                  </div>
                </div>
              </div>
            </div>

            {/* Type scale demo */}
            <div className="p-6 bg-neutral-50 border border-neutral-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Escala Jerárquica Aplicada
              </h4>
              <div className="space-y-4 bg-white p-6 border border-neutral-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D71920]">
                    EPÍGRAFE / VOLANTA · CONGRESO NACIONAL
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[#171717] tracking-tight leading-tight mt-1 font-sans">
                    Debate decisivo sobre la reforma presupuestaria en el Senado
                  </h1>
                  <p className="text-base text-neutral-700 font-medium mt-2 leading-relaxed">
                    Bajada o copete informativo: La cámara alta sesiona en régimen extraordinario con la presencia de todos los bloques partidarios.
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-100 text-sm text-neutral-800 font-serif leading-relaxed">
                  El pleno legislativo inició la deliberación técnica con el informe detallado de la Comisión de Hacienda y Presupuesto, estableciendo un límite estricto a los gastos corrientes para el ejercicio fiscal 2027...
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Papelería, Tarjetas y Micrófono */}
        {(activeSection === 'applications' || activeSection === 'all') && (
          <section className="space-y-8">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-[#D71920] font-bold">Capítulo 05</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-1">
                Aplicaciones en Tarjetas, Credencial de Prensa & Material Institucional
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Credencial de Prensa Oficial */}
              <div className="bg-white border border-neutral-300 p-6 flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                  Credencial de Prensa Acreditada (Asunción / Congreso)
                </span>
                
                <div className="w-64 bg-[#171717] text-white rounded-t-lg shadow-xl overflow-hidden border-2 border-neutral-800">
                  <div className="h-3 bg-[#D71920] w-full" />
                  <div className="p-4 text-center space-y-3">
                    <ImpactoLogo variant="compact" colorMode="white" size="sm" />
                    <div className="w-24 h-28 mx-auto bg-neutral-800 border-2 border-[#D71920] overflow-hidden flex items-center justify-center">
                      <span className="text-xs text-neutral-400 font-mono">FOTO PRENSA</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase">CARLOS BENÍTEZ G.</h4>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                        Cronista Parlamentario
                      </span>
                    </div>
                    <div className="p-2 bg-red-950/60 border border-red-800 text-[10px] text-red-200 font-bold uppercase tracking-widest">
                      ACREDITACIÓN NACIONAL
                    </div>
                    <div className="text-[9px] text-neutral-500 font-mono">
                      ID: PY-IMP-8842 · VÁLIDO 2026/2027
                    </div>
                  </div>
                </div>
              </div>

              {/* Micrófono Institucional con Cubo */}
              <div className="bg-white border border-neutral-300 p-6 flex flex-col items-center justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                  Cubo de Micrófono para Cobertura en Vivo
                </span>

                <div className="flex flex-col items-center">
                  {/* Mic Windscreen */}
                  <div className="w-16 h-20 bg-neutral-900 rounded-full border border-neutral-700 shadow-md mb-1" />
                  
                  {/* Mic Cube */}
                  <div className="w-28 h-24 bg-[#171717] border-2 border-[#D71920] shadow-xl flex items-center justify-center p-2 relative">
                    <div className="text-center">
                      <ImpactoLogo variant="compact" colorMode="white" size="sm" />
                    </div>
                  </div>

                  {/* Mic Body Handle */}
                  <div className="w-8 h-32 bg-neutral-800 border border-neutral-700 rounded-b-md shadow-inner flex flex-col justify-end p-2 items-center">
                    <div className="w-4 h-1 bg-[#D71920] mb-2" />
                    <span className="text-[8px] font-mono text-neutral-400 uppercase">PRESS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Membrete Oficial y Tarjeta de Visita */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tarjeta de visita */}
              <div className="p-6 bg-white border border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-4">
                  Tarjeta de Visita Corporativa (85 × 55 mm)
                </span>
                <div className="aspect-[85/55] max-w-sm bg-neutral-950 text-white p-6 flex flex-col justify-between border border-neutral-800 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D71920] opacity-15 rounded-full blur-xl pointer-events-none" />
                  <ImpactoLogo variant="compact" colorMode="white" size="sm" />
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white uppercase tracking-tight">Lic. Rodrigo Fleitas Vera</div>
                    <div className="text-[10px] text-[#D71920] font-semibold uppercase tracking-wider">Director Editorial</div>
                    <div className="text-[9px] text-neutral-400 font-mono pt-2">
                      Palma 750 c/ O'Leary · Asunción, Paraguay<br />
                      +595 21 445 900 · redaccion@impactopolitico.com.py
                    </div>
                  </div>
                </div>
              </div>

              {/* Carpeta institucional / Membrete */}
              <div className="p-6 bg-white border border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-4">
                  Hoja Membretada Oficial A4
                </span>
                <div className="aspect-[1/1.3] max-w-sm bg-white p-5 border border-neutral-300 shadow-sm flex flex-col justify-between text-[10px] text-neutral-600">
                  <div className="flex justify-between items-start border-b-2 border-[#171717] pb-3">
                    <ImpactoLogo variant="compact" size="sm" />
                    <div className="text-right text-[8px] font-mono text-neutral-400">
                      EDITORIAL IMPACTO S.A.<br />RUC 80042910-4
                    </div>
                  </div>
                  <div className="space-y-2 py-4">
                    <div className="h-2 bg-neutral-200 rounded w-1/3" />
                    <div className="h-1.5 bg-neutral-100 rounded w-full" />
                    <div className="h-1.5 bg-neutral-100 rounded w-full" />
                    <div className="h-1.5 bg-neutral-100 rounded w-4/5" />
                  </div>
                  <div className="border-t border-neutral-200 pt-2 flex justify-between items-center text-[8px] text-neutral-400 font-mono">
                    <span>«La actualidad que mueve al Paraguay»</span>
                    <span>Asunción, Paraguay</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Redes Sociales */}
        {(activeSection === 'social' || activeSection === 'all') && (
          <section className="space-y-6">
            <div className="border-b border-neutral-200 pb-3 flex justify-between items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D71920] font-bold">Capítulo 06</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-1">
                  Identidad Visual en Redes Sociales & Portada de Facebook
                </h2>
              </div>
              {onOpenSocialStudio && (
                <button
                  onClick={onOpenSocialStudio}
                  className="px-4 py-2 bg-[#171717] text-white hover:bg-neutral-800 text-xs font-bold uppercase flex items-center gap-2"
                >
                  <span>Abrir Estudio de Publicación</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Portada de Facebook y Foto de Perfil (Puntos 19 y 20) */}
            <div className="bg-white border border-neutral-200 p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block">
                Header de Facebook / Twitter (1200 × 630 px) con Avatar Oficial
              </span>

              <div className="relative aspect-[3/1] bg-[#171717] border border-neutral-800 overflow-hidden flex items-center justify-between px-8 md:px-12">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-[#171717] to-red-950/40 pointer-events-none" />
                <div className="relative z-10 space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D71920]">
                    PORTAL DIGITAL DE NOTICIAS DE PARAGUAY
                  </div>
                  <ImpactoLogo variant="horizontal" colorMode="white" size="lg" />
                  <div className="text-xs md:text-sm text-neutral-300 font-medium italic">
                    «La actualidad que mueve al Paraguay»
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    Noticias · Política · Congreso · Economía · Investigación
                  </div>
                </div>

                {/* Simulated profile photo overlay */}
                <div className="relative z-10 hidden sm:flex w-24 h-24 rounded-full bg-black border-4 border-white shadow-2xl items-center justify-center">
                  <ImpactoLogo variant="isotype-only" size="md" />
                </div>
              </div>
            </div>

            {/* 3 Ejemplos de Publicaciones y Último Momento (Puntos 21 y 22) */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-700 mb-4">
                Ejemplos de Plantillas para Instagram, TikTok y X
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Informativa Estándar */}
                <div className="bg-white border border-neutral-200 p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase text-neutral-500">1. Publicación Informativa</span>
                  <div className="aspect-square bg-neutral-900 text-white p-5 flex flex-col justify-between border border-neutral-800">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D71920]">
                        ECONOMÍA NACIONAL
                      </span>
                      <ImpactoLogo variant="compact" colorMode="white" size="sm" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold uppercase leading-snug">
                        BCP ratifica metas de inflación y proyecta crecimiento del 4.2%
                      </h4>
                      <p className="text-[11px] text-neutral-300 mt-2 line-clamp-2">
                        El informe macroeconómico destaca la solidez del Guaraní y la inversión industrial.
                      </p>
                    </div>
                    <div className="text-[9px] text-neutral-500 font-mono border-t border-neutral-800 pt-2 flex justify-between">
                      <span>www.impactopolitico.com.py</span>
                      <span>ASUNCIÓN</span>
                    </div>
                  </div>
                </div>

                {/* 2. Último Momento Urgente */}
                <div className="bg-white border border-neutral-200 p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase text-[#D71920]">2. Plantilla Último Momento</span>
                  <div className="aspect-square bg-[#0D0D0D] text-white p-5 flex flex-col justify-between border-2 border-[#D71920] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D71920] opacity-20 blur-2xl" />
                    <div className="flex justify-between items-center z-10">
                      <div className="flex items-center gap-2 bg-[#D71920] text-white px-2 py-1 text-[9px] font-black uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>ÚLTIMO MOMENTO</span>
                      </div>
                      <ImpactoLogo variant="isotype-only" size="sm" />
                    </div>
                    <div className="z-10">
                      <h4 className="text-lg font-black uppercase leading-tight text-white">
                        CANCILLERÍA RECLAMA ANTE EL MERCOSUR TRABAS EN LA HIDROVÍA
                      </h4>
                      <span className="text-xs text-neutral-300 mt-2 block font-medium">
                        Exigen cese de retenciones a barcazas de bandera paraguaya.
                      </span>
                    </div>
                    <div className="text-[9px] text-neutral-400 font-mono z-10 flex justify-between">
                      <span>URGENTE · REDACCIÓN CENTRAL</span>
                      <span>@impactopoliticopy</span>
                    </div>
                  </div>
                </div>

                {/* 3. Frase del Día */}
                <div className="bg-white border border-neutral-200 p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase text-neutral-500">3. Frase del Día</span>
                  <div className="aspect-square bg-neutral-100 text-[#171717] p-5 flex flex-col justify-between border border-neutral-300">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D71920]">
                        FRASE DEL DÍA
                      </span>
                      <ImpactoLogo variant="compact" size="sm" />
                    </div>
                    <div className="my-auto">
                      <span className="text-3xl font-serif text-[#D71920] leading-none block">“</span>
                      <blockquote className="text-sm font-serif italic text-neutral-900 leading-snug">
                        La institucionalidad democrática no se negocia; se defiende con transparencia en cada acto de gobierno.
                      </blockquote>
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <strong className="text-xs uppercase block font-sans">Dra. Carmen Montiel</strong>
                        <span className="text-[10px] text-neutral-500 font-sans">Constitucionalista</span>
                      </div>
                    </div>
                    <div className="text-[9px] text-neutral-400 font-mono flex justify-between">
                      <span>DECLARACIÓN VERIFICADA</span>
                      <span>IMPACTO POLÍTICO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 7: Audiovisual */}
        {(activeSection === 'audiovisual' || activeSection === 'all') && (
          <section className="space-y-6">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-[#D71920] font-bold">Capítulo 07</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-1">
                Identidad Audiovisual, Video Motion & Sonido
              </h2>
            </div>

            <AudiovisualSimulator />
          </section>
        )}

        {/* Section 8: Tono y Estilo Periodístico */}
        {(activeSection === 'editorial' || activeSection === 'all') && (
          <section className="space-y-6">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-[#D71920] font-bold">Capítulo 08</span>
              <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-1">
                Tono, Ética y Protocolo de Redacción Periodística
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-700 leading-relaxed">
              <div className="space-y-4 bg-white p-6 border border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wide">
                  Principios Rectores de Redacción
                </h3>
                <ul className="space-y-2 list-disc list-inside text-xs">
                  <li><strong>Claridad y Concisión:</strong> Redacción directa, sin tecnicismos innecesarios que distancien la información del lector ciudadano común.</li>
                  <li><strong>Derecho a Réplica:</strong> Toda persona o institución aludida en una denuncia o investigación debe contar con un espacio oportuno para expresar su versión de los hechos.</li>
                  <li><strong>Separación Estricta:</strong> Diferenciación absoluta entre noticias fácticas, notas de análisis, columnas de opinión y pauta publicitaria patrocinada.</li>
                  <li><strong>Criterio Fotográfico:</strong> Las imágenes deben conservar su naturalidad documental, prohibiéndose alteraciones engañosas o ediciones que distorsionen los hechos.</li>
                </ul>
              </div>

              <div className="space-y-4 bg-white p-6 border border-neutral-200">
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wide">
                  Política de Correcciones
                </h3>
                <p className="text-xs text-neutral-600">
                  En caso de advertir un error u omisión involuntaria en una nota publicada, se procederá a su corrección inmediata dejando constancia pública al pie del artículo con indicación de fecha y hora exacta de la fe de erratas. La transparencia con el lector es innegociable.
                </p>
                <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs">
                  <span className="font-bold text-neutral-900 block mb-1">Mesa Editorial de Guardia:</span>
                  Palma 750 c/ O'Leary, Asunción · Redacción Central<br />
                  Línea directa para denuncias ciudadanas y verificación: +595 21 445 900
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
