import React from 'react';

export type LogoVariant = 'horizontal' | 'vertical' | 'compact' | 'isotype-only' | 'badge';
export type LogoColorMode = 'color' | 'white' | 'dark' | 'monochrome';

interface ImpactoLogoProps {
  variant?: LogoVariant;
  colorMode?: LogoColorMode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
}

export const ImpactoLogo: React.FC<ImpactoLogoProps> = ({
  variant = 'horizontal',
  colorMode = 'color',
  className = '',
  size = 'md',
  showSlogan = false,
}) => {
  // Color configuration
  const redColor = colorMode === 'monochrome' ? '#000000' : '#D71920';
  const primaryTextColor =
    colorMode === 'white'
      ? '#FFFFFF'
      : colorMode === 'dark'
      ? '#F3F4F6'
      : '#171717';
  const secondaryTextColor =
    colorMode === 'white'
      ? '#E5E7EB'
      : colorMode === 'dark'
      ? '#9CA3AF'
      : '#4B5563';

  // Sizing maps
  const iconSizes = {
    sm: 26,
    md: 38,
    lg: 52,
    xl: 70,
  };

  const currentIconSize = iconSizes[size];

  // SVG Isotype: Micrófono Periodístico de Alta Fidelidad emitiendo Ondas de Transmisión e Impacto
  const renderIsotype = (dimension: number = currentIconSize) => (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300"
      aria-label="Isotipo Micrófono de Señales - IMPACTO POLÍTICO"
    >
      {/* Outer Broadcasting Signal Waves (Right Side) */}
      <path
        d="M 68 20 A 24 24 0 0 1 82 46"
        stroke={redColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 76 10 A 38 38 0 0 1 95 48"
        stroke={redColor}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Outer Broadcasting Signal Waves (Left Side) */}
      <path
        d="M 32 20 A 24 24 0 0 0 18 46"
        stroke={redColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 24 10 A 38 38 0 0 0 5 48"
        stroke={redColor}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Top Concentric Pulse Apex */}
      <path
        d="M 40 8 A 20 20 0 0 1 60 8"
        stroke={redColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Microphone Capsule Body */}
      <rect
        x="38"
        y="18"
        width="24"
        height="36"
        rx="12"
        fill={colorMode === 'white' ? '#FFFFFF' : '#171717'}
      />

      {/* Microphone Sound Grill Slits */}
      <line x1="43" y1="26" x2="57" y2="26" stroke={colorMode === 'white' ? '#171717' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="32" x2="57" y2="32" stroke={colorMode === 'white' ? '#171717' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="38" x2="57" y2="38" stroke={colorMode === 'white' ? '#171717' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="44" x2="55" y2="44" stroke={colorMode === 'white' ? '#171717' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" />

      {/* Live Broadcast Indicator LED on the microphone */}
      <circle cx="50" cy="50" r="2.5" fill={redColor} />

      {/* Microphone Cradle / Shock-mount Arc */}
      <path
        d="M 28 36 C 28 54 36 62 50 62 C 64 62 72 54 72 36"
        stroke={redColor}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Microphone Stand Stem */}
      <line
        x1="50"
        y1="62"
        x2="50"
        y2="78"
        stroke={primaryTextColor}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Solid Broadcaster Pedestal Base */}
      <path
        d="M 26 82 L 74 82"
        stroke={primaryTextColor}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Dynamic bottom accent dot */}
      <circle cx="50" cy="82" r="3" fill={redColor} />
    </svg>
  );

  if (variant === 'isotype-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderIsotype()}</div>;
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        {renderIsotype(size === 'sm' ? 24 : 32)}
        <div className="flex flex-col leading-none">
          <span
            style={{ color: primaryTextColor }}
            className="font-black tracking-tight text-base uppercase font-sans"
          >
            IMPACTO
          </span>
          <span
            style={{ color: redColor }}
            className="text-[9px] font-extrabold tracking-[0.28em] uppercase font-sans -mt-0.5"
          >
            POLÍTICO
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        {renderIsotype(size === 'xl' ? 76 : 58)}
        <div className="mt-3 flex flex-col items-center">
          <span
            style={{ color: primaryTextColor }}
            className="font-black text-2xl lg:text-3xl tracking-tight uppercase font-sans leading-none"
          >
            IMPACTO
          </span>
          <span
            style={{ color: redColor }}
            className="text-xs lg:text-sm font-extrabold tracking-[0.35em] uppercase font-sans mt-1"
          >
            POLÍTICO
          </span>
          {showSlogan && (
            <span
              style={{ color: secondaryTextColor }}
              className="text-[11px] font-medium tracking-wide mt-2 italic"
            >
              «La actualidad que mueve al Paraguay»
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-3 px-4 py-2 bg-[#171717] rounded-none border-b-2 border-[#D71920] shadow-sm select-none ${className}`}
      >
        {renderIsotype(32)}
        <div className="flex flex-col leading-none text-left">
          <span className="font-extrabold tracking-tight text-lg uppercase text-white font-sans">
            IMPACTO
          </span>
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#D71920] font-sans">
            POLÍTICO
          </span>
        </div>
      </div>
    );
  }

  // Master Horizontal variant (Default for header & institutional)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {renderIsotype()}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            style={{ color: primaryTextColor }}
            className="font-black text-xl lg:text-2xl tracking-tighter uppercase font-sans leading-none"
          >
            IMPACTO
          </span>
          <span
            style={{ color: redColor }}
            className="text-xs lg:text-sm font-extrabold tracking-[0.25em] uppercase font-sans leading-none"
          >
            POLÍTICO
          </span>
        </div>
        {showSlogan && (
          <span
            style={{ color: secondaryTextColor }}
            className="text-[10px] font-medium tracking-wider uppercase mt-1 opacity-90 hidden sm:inline-block"
          >
            La actualidad que mueve al Paraguay
          </span>
        )}
      </div>
    </div>
  );
};
