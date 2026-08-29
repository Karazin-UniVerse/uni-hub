import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Lock, Mail, AlertCircle, Loader2, Sparkles, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [emailOrLogin, setEmailOrLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrLogin || !password) {
      setError('Будь ласка, введіть логін/email та пароль');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await login(emailOrLogin, password);
      onClose();
    } catch (err: any) {
      setError(
        err.message ||
          'Помилка авторизації. Перевірте правильність логіна або пароля Moodle.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmailOrLogin('r.barsukov');
    setPassword('UniverseAdmin2026!');
    setError(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-[var(--kz-radius-xl)] bg-[var(--kz-surface)] border border-[var(--kz-border)] shadow-2xl z-10"
        >
          {/* Header decoration */}
          <div className="p-6 bg-linear-to-br from-[var(--kz-brand-primary)]/10 to-transparent border-b border-[var(--kz-border)] relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--kz-text-muted)] hover:text-[var(--kz-text-primary)] hover:bg-[var(--kz-surface-hover)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--kz-brand-primary)] text-white shadow-md">
                <LogIn className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--kz-text-primary)] tracking-tight">
                  Вхід до UniHub
                </h3>
                <p className="text-xs text-[var(--kz-text-secondary)]">
                  Каразінський університет · Авторизація через Moodle
                </p>
              </div>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-bold text-[var(--kz-text-secondary)] uppercase tracking-wider mb-1.5">
                Логін або Корпоративна пошта
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--kz-text-muted)]" />
                <input
                  type="text"
                  placeholder="r.barsukov або student@student.karazin.ua"
                  value={emailOrLogin}
                  onChange={(e) => setEmailOrLogin(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[var(--kz-bg)] border border-[var(--kz-border)] text-sm text-[var(--kz-text-primary)] placeholder:text-[var(--kz-text-muted)] focus:outline-hidden focus:border-[var(--kz-brand-primary)] focus:ring-1 focus:ring-[var(--kz-brand-primary)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--kz-text-secondary)] uppercase tracking-wider mb-1.5">
                Пароль Moodle
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--kz-text-muted)]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[var(--kz-bg)] border border-[var(--kz-border)] text-sm text-[var(--kz-text-primary)] placeholder:text-[var(--kz-text-muted)] focus:outline-hidden focus:border-[var(--kz-brand-primary)] focus:ring-1 focus:ring-[var(--kz-brand-primary)] transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-[var(--kz-brand-primary)] hover:bg-[var(--kz-brand-secondary)] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Синхронізація з Moodle...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Увійти в кабінет</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2 px-3 rounded-lg bg-[var(--kz-surface-hover)] hover:bg-[var(--kz-border)] text-[var(--kz-text-secondary)] hover:text-[var(--kz-text-primary)] font-medium text-xs border border-[var(--kz-border)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Заповнити тестовими обліковими даними</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};