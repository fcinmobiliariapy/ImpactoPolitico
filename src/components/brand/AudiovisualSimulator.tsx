import React, { useState, useEffect, useRef } from 'react';
import { ImpactoLogo } from './ImpactoLogo';
import { Play, RotateCcw, Volume2, VolumeX, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

interface AudiovisualSimulatorProps {
  onClose?: () => void;
}

export const AudiovisualSimulator: React.FC<AudiovisualSimulatorProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'intro' | 'outro'>('intro');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [soundMuted, setSoundMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize original broadcast news sonic signature using Web Audio API
  const playOriginalBroadcastSound = (type: 'intro' | 'outro') => {
    if (soundMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      if (type === 'intro') {
        // Deep authoritative bass impact
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(130, now);
        subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.8);
        subGain.gain.setValueAtTime(0.4, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 1.2);

        // Three crisp digital broadcast radar pings
        const pings = [587.33, 783.99, 1046.5]; // D5, G5, C6 journalistic chord
        pings.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + 0.15 * idx);
          gain.gain.setValueAtTime(0.15, now + 0.15 * idx);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 * idx + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + 0.15 * idx);
          osc.stop(now + 0.15 * idx + 0.5);
        });

        // Resonant closing sting at 2.4s
        setTimeout(() => {
          if (!ctx || ctx.state === 'closed') return;
          const sting = ctx.createOscillator();
          const stingGain = ctx.createGain();
          sting.type = 'sawtooth';
          sting.frequency.setValueAtTime(220, ctx.currentTime);
          sting.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.6);
          stingGain.gain.setValueAtTime(0.2, ctx.currentTime);
          stingGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
          sting.connect(stingGain);
          stingGain.connect(ctx.destination);
          sting.start();
          sting.stop(ctx.currentTime + 0.8);
        }, 2200);
      } else {
        // Outro sound: Warm resolution triad and quiet sign-off tone
        const outroNotes = [440, 554.37, 659.25]; // A4, C#5, E5
        outroNotes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + 0.2 * idx);
          gain.gain.setValueAtTime(0.2, now + 0.2 * idx);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 * idx + 0.9);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + 0.2 * idx);
          osc.stop(now + 0.2 * idx + 1.0);
        });
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const startPlayback = (selectedMode: 'intro' | 'outro' = mode) => {
    setIsPlaying(true);
    setProgress(0);
    playOriginalBroadcastSound(selectedMode);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      const durationMs = mode === 'intro' ? 4000 : 4500;
      const stepMs = 50;
      const stepPercent = (stepMs / durationMs) * 100;

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + stepPercent;
        });
      }, stepMs);
    }
    return () => clearInterval(interval);
  }, [isPlaying, mode]);

  return (
    <div className="bg-[#171717] text-white p-6 md:p-8 rounded-none border border-neutral-800 shadow-2xl max-w-4xl mx-auto">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D71920] font-bold">
            <span>Identidad Audiovisual</span>
            <span>·</span>
            <span>Motion Graphics 4K</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Simulador de Apertura & Cierre de Video
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-neutral-900 border border-neutral-700 p-1">
            <button
              onClick={() => {
                setMode('intro');
                setIsPlaying(false);
                setProgress(0);
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                mode === 'intro' ? 'bg-[#D71920] text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Apertura (4 seg)
            </button>
            <button
              onClick={() => {
                setMode('outro');
                setIsPlaying(false);
                setProgress(0);
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                mode === 'outro' ? 'bg-[#D71920] text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cierre (4.5 seg)
            </button>
          </div>

          <button
            onClick={() => setSoundMuted(!soundMuted)}
            className="p-2 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800"
            title={soundMuted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white text-xs uppercase font-bold px-2 py-1"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>

      {/* Screen Display Frame (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full bg-black mt-6 border border-neutral-800 overflow-hidden select-none flex items-center justify-center">
        {/* Animated Background Grids and Signal Waveforms */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#D71920_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-red-600/30" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-600/30" />
        </div>

        {/* Dynamic scanning red beacon bar */}
        {isPlaying && (
          <div
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#D71920]/20 to-transparent blur-sm pointer-events-none transition-all duration-300"
            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
          />
        )}

        {/* Content for INTRO (Apertura 3 a 5 seg) */}
        {mode === 'intro' && (
          <div className="relative z-10 flex flex-col items-center text-center p-6">
            {/* Phase 1: Radar ping (0 - 30%) */}
            {progress > 0 && progress < 35 && (
              <div className="animate-ping absolute w-32 h-32 rounded-full border border-[#D71920] opacity-40" />
            )}

            {/* Phase 2: Central Logo expansion */}
            <div
              className={`transition-all duration-700 transform ${
                isPlaying ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
              }`}
            >
              <ImpactoLogo
                variant="vertical"
                colorMode="white"
                size="xl"
                showSlogan={progress > 60}
              />
            </div>

            {/* Dynamic broadcast lower strip */}
            <div
              className={`mt-6 overflow-hidden transition-all duration-500 ${
                progress > 45 ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3 bg-[#D71920] text-white px-6 py-2 text-xs font-extrabold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>TRANSMISIÓN INFORMATIVA NACIONAL</span>
                <span>·</span>
                <span>PARAGUAY</span>
              </div>
            </div>
          </div>
        )}

        {/* Content for OUTRO (Cierre de video) */}
        {mode === 'outro' && (
          <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-xl">
            <ImpactoLogo variant="vertical" colorMode="white" size="lg" />

            <p
              className={`mt-4 text-base font-semibold text-neutral-200 transition-opacity duration-700 italic ${
                progress > 20 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              «La actualidad que mueve al Paraguay»
            </p>

            <div
              className={`mt-6 pt-6 border-t border-neutral-800 w-full flex items-center justify-center gap-6 transition-all duration-700 ${
                progress > 45 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Twitter className="w-4 h-4 text-neutral-200" />
                <span>@impactopoliticopy</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Instagram className="w-4 h-4 text-neutral-200" />
                <span>@impactopoliticopy</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>Impacto Político PY</span>
              </div>
            </div>

            <p
              className={`text-[10px] text-neutral-500 uppercase tracking-widest mt-4 transition-opacity duration-700 ${
                progress > 70 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              www.impactopolitico.com.py · Asunción, Paraguay
            </p>
          </div>
        )}

        {/* Play Overlay if not playing */}
        {!isPlaying && (
          <button
            onClick={() => startPlayback()}
            className="absolute inset-0 bg-black/40 hover:bg-black/20 flex flex-col items-center justify-center gap-2 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-[#D71920] group-hover:scale-110 flex items-center justify-center shadow-lg transition-transform">
              <Play className="w-7 h-7 text-white fill-current ml-1" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-200">
              Reproducir Animación & Sonido
            </span>
          </button>
        )}
      </div>

      {/* Timeline scrubbing bar */}
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={() => startPlayback()}
          className="px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase flex items-center gap-2 shrink-0"
        >
          {isPlaying ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlaying ? 'Reproduciendo...' : 'Reproducir'}</span>
        </button>

        <div className="flex-1 bg-neutral-800 h-2 rounded-full overflow-hidden relative">
          <div
            className="bg-[#D71920] h-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-mono text-neutral-400 tabular-nums shrink-0">
          {((progress / 100) * (mode === 'intro' ? 4.0 : 4.5)).toFixed(1)}s / {mode === 'intro' ? '4.0s' : '4.5s'}
        </span>
      </div>

      {/* Specifications breakdown */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-neutral-800 text-xs text-neutral-400">
        <div>
          <span className="font-bold text-white block mb-1">Duración y Fotogramas:</span>
          Apertura 4 seg, Cierre 4.5 seg a 60 fps. Render en 4K UHD (3840×2160) y 1080×1920 vertical para reels.
        </div>
        <div>
          <span className="font-bold text-white block mb-1">Audio Signature:</span>
          Triada original sintética (Re-Sol-Do / La Mayor) con pulso sub-grave de 45Hz que garantiza seriedad institucional.
        </div>
        <div>
          <span className="font-bold text-white block mb-1">Paleta en Pantalla:</span>
          Rojo Impacto (#D71920) dinámico sobre Negro (#171717) y Blanco puro (#FFFFFF), sin gradientes estridentes.
        </div>
      </div>
    </div>
  );
};
