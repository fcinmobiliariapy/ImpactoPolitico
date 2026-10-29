import React from 'react';
import { ImpactoLogo } from '../brand/ImpactoLogo';
import { PortalConfig } from '../../types';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  BookOpen, 
  SlidersHorizontal 
} from 'lucide-react';

interface PortalFooterProps {
  config: PortalConfig;
  onSelectCategory: (cat: string) => void;
  onOpenBrandManual: () => void;
  onOpenAdmin: () => void;
}

export const PortalFooter: React.FC<PortalFooterProps> = ({
  config,
  onSelectCategory,
  onOpenBrandManual,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#171717] text-white border-t-4 border-[#D71920] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-neutral-800">
          {/* Col 1 & 2: Brand Lockup & Purpose (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <ImpactoLogo variant="horizontal" colorMode="white" size="lg" showSlogan={true} />
            
            <p className="text-xs text-neutral-300 leading-relaxed font-sans max-w-sm pt-2">
              Medio de comunicación digital independiente dedicado a informar, analizar e investigar los hechos políticos, legislativos y socioeconómicos que impactan en la vida nacional del Paraguay.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-1 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
                <span>{config.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
                <span>{config.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
                <span>{config.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Secciones Principales */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200 border-b border-neutral-800 pb-2">
              Secciones
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-sans">
              <li>
                <button
                  onClick={() => onSelectCategory('politica')}
                  className="hover:text-white transition-colors"
                >
                  Política Nacional
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('congreso')}
                  className="hover:text-white transition-colors"
                >
                  Congreso & Leyes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('economia')}
                  className="hover:text-white transition-colors"
                >
                  Economía & Finanzas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('investigacion')}
                  className="hover:text-white transition-colors"
                >
                  Unidad de Investigación
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('opinion')}
                  className="hover:text-white transition-colors"
                >
                  Tribuna & Opinión
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('deportes')}
                  className="hover:text-white transition-colors"
                >
                  Deportes Albirroja
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparencia & Institucional */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200 border-b border-neutral-800 pb-2">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-sans">
              <li>
                <button
                  onClick={onOpenBrandManual}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3 h-3 text-[#D71920]" />
                  <span>Manual de Identidad Oficial</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#D71920]" />
                  <span>Panel CMS & Pauta</span>
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Política de Correcciones Editoriales</span>
              </li>
              <li>
                <span className="text-neutral-500">Código de Ética y Fuentes</span>
              </li>
              <li>
                <span className="text-neutral-500">Términos y Privacidad de Datos</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Redes Oficiales & Google Analytics Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200 border-b border-neutral-800 pb-2">
              Comunidad Digital
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={config.socialLinks.x}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#D71920] transition-colors"
                title="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={config.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#D71920] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={config.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#D71920] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={config.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#D71920] transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-3 border-t border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Medición en Tiempo Real:
              </span>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>GA4: {config.googleAnalyticsId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Compliance */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>
            © 2026 IMPACTO POLÍTICO. Todos los derechos reservados. Asunción, República del Paraguay.
          </div>
          <div>
            «La actualidad que mueve al Paraguay»
          </div>
        </div>
      </div>
    </footer>
  );
};
