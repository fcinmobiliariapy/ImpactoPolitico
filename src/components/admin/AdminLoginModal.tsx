import React, { useState } from 'react';
import { AppUser, AdminSession } from '../../types';
import { ImpactoLogo } from '../brand/ImpactoLogo';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft, 
  CheckCircle2, 
  KeyRound,
  UserCheck,
  Sparkles
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: AdminSession) => void;
  users: AppUser[];
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  users,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg('Por favor ingrese su correo electrónico y contraseña.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Find matching user
      // 1. Check matching email
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === cleanEmail || u.name.toLowerCase().includes(cleanEmail)
      );

      // Validate password:
      // Accepts user's password, or default passwords based on role, or universal master password 'admin2026'
      let isValidPassword = false;

      if (cleanPass === 'admin2026' || cleanPass === 'impacto2026') {
        isValidPassword = true;
      } else if (matchedUser && matchedUser.password && matchedUser.password === cleanPass) {
        isValidPassword = true;
      } else if (matchedUser && !matchedUser.password && cleanPass === 'admin2026') {
        isValidPassword = true;
      }

      if (matchedUser && isValidPassword) {
        if (!matchedUser.active) {
          setErrorMsg('Esta cuenta de usuario se encuentra temporalmente inactiva. Contacte a la Dirección.');
          setIsSubmitting(false);
          return;
        }

        const session: AdminSession = {
          user: matchedUser,
          token: `imp_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          loginTime: new Date().toISOString(),
          rememberMe,
        };

        onLoginSuccess(session);
        setIsSubmitting(false);
      } else {
        // Fallback: If user entered 'admin' or 'director' with master password
        if ((cleanEmail === 'admin' || cleanEmail === 'director@impactopolitico.com.py') && (cleanPass === 'admin2026' || cleanPass === 'admin')) {
          const fallbackUser = users[0] || {
            id: 'usr-001',
            name: 'Director Editorial General',
            email: 'rodrigo.fleitas@impactopolitico.com.py',
            role: 'director',
            roleTitle: 'Director Editorial General',
            avatar: 'RF',
            active: true,
            lastLogin: 'Ahora',
          };

          const session: AdminSession = {
            user: fallbackUser,
            token: `imp_tok_${Date.now()}_fallback`,
            loginTime: new Date().toISOString(),
            rememberMe,
          };

          onLoginSuccess(session);
          setIsSubmitting(false);
          return;
        }

        setErrorMsg('Credenciales inválidas. Compruebe el correo y la contraseña ingresados.');
        setIsSubmitting(false);
      }
    }, 600);
  };

  const handleQuickFill = (user: AppUser, pass: string) => {
    setEmail(user.email);
    setPassword(pass);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white text-[#171717] w-full max-w-md shadow-2xl border border-neutral-300 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top security header ribbon */}
        <div className="bg-[#171717] text-white p-4 border-b-2 border-[#D71920] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D71920]" />
            <span className="text-[11px] font-black uppercase tracking-widest text-neutral-200">
              CMS EDITORIAL · ACCESO RESTRINGIDO
            </span>
          </div>
          <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 border border-red-800 font-mono">
            ASUNCIÓN
          </span>
        </div>

        {/* Brand Banner */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <ImpactoLogo variant="horizontal" size="md" showSlogan={false} />
            </div>
            <h2 className="text-lg font-black uppercase tracking-tight text-neutral-900 font-sans">
              Autenticación de Redacción
            </h2>
            <p className="text-xs text-neutral-500 font-sans">
              Ingrese con su cuenta autorizada para gestionar notas, pautas publicitarias, encuestas y redes sociales.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3 text-xs flex items-start gap-2.5 animate-slideDown">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">Error de autenticación</span>
                <span className="text-[11px]">{errorMsg}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                Correo Institucional o Usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ej. rodrigo.fleitas@impactopolitico.com.py"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black font-sans bg-white"
                  autoFocus
                  required
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
                  Contraseña
                </label>
                <span className="text-[10px] text-neutral-400 font-mono">Sensible a mayúsculas</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2 text-xs border border-neutral-300 focus:outline-none focus:border-black font-sans bg-white"
                  required
                />
                <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-700"
                  title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-xs text-[#D71920] focus:ring-[#D71920]"
                />
                <span>Mantener sesión iniciada</span>
              </label>

              <span className="text-[10px] text-neutral-400 font-mono">SSL 256-bit</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Verificando credenciales...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ingresar al Panel de Control</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Access Demo Credentials for Editors and Reviewers */}
          <div className="pt-4 border-t border-neutral-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[#D71920]" />
                <span>Credenciales de Redacción (Clic para autocompletar):</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              <button
                type="button"
                onClick={() => handleQuickFill(users[0], 'admin2026')}
                className="p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-left transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-900 group-hover:text-[#D71920]">
                    Director Editorial
                  </span>
                  <span className="text-[9px] font-mono bg-neutral-200 px-1 text-neutral-700">admin2026</span>
                </div>
                <span className="text-[10px] text-neutral-500 truncate block">
                  rodrigo.fleitas@...
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill(users[1] || users[0], 'editor2026')}
                className="p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-left transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-900 group-hover:text-[#D71920]">
                    Editor de Política
                  </span>
                  <span className="text-[9px] font-mono bg-neutral-200 px-1 text-neutral-700">editor2026</span>
                </div>
                <span className="text-[10px] text-neutral-500 truncate block">
                  carlos.benitez@...
                </span>
              </button>
            </div>
          </div>

          {/* Cancel button */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-black uppercase transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Portal Público</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
