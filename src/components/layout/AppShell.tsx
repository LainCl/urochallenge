import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  Gift,
  User,
  ShieldCheck,
  Sparkles,
  Flame,
  Coins,
  LogOut,
  UserPlus,
  RefreshCw,
  BookOpenCheck,
  BookOpen,
  Stethoscope,
  Timer,
  Trophy,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { BottomNavigation } from './BottomNavigation';
import { LevelUpNotificationModal } from '../dashboard/RpgProgressWidgets';
import { AchievementBadgeIcon } from '../rewards/AchievementBadgeIcon';

export const AppShell: React.FC = () => {
  const { user, stats, progression, acknowledgeLevelUps, isDemoMode, loginAsDemo, logout } = useApp();
  const navigate = useNavigate();

  const handleSwitchDemoRole = () => {
    if (!user) return;
    const target = user.role === 'admin' ? 'user' : 'admin';
    loginAsDemo(target);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/app', label: 'Inicio / Descubrir', icon: Home, end: true },
    { to: '/app/dictionary', label: 'Diccionario Urológico', icon: BookOpen, end: false },
    { to: '/app/trajectory', label: 'Mi Trayectoria RPG', icon: Trophy, end: false },
    { to: '/app/daily-question', label: 'Pregunta Periódica', icon: Sparkles, end: false },
    { to: '/app/quiz', label: 'Test 10 Preguntas', icon: BookOpenCheck, end: false },
    { to: '/app/study', label: 'Estudio & Pomodoro', icon: Timer, end: false },
    { to: '/app/activity', label: 'Agenda y Actividad', icon: Calendar, end: false },
    { to: '/app/rewards', label: 'Catálogo de Premios', icon: Gift, end: false },
    { to: '/app/profile', label: 'Mi Perfil y Progreso', icon: User, end: false },
  ];

  return (
    <div className="min-h-screen bg-mesh-violet flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-72 lg:w-80 flex-col bg-white/90 backdrop-blur-xl border-r border-[#5149B8]/10 p-6 sticky top-0 h-screen justify-between">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-11 h-11 rounded-2xl card-hero-violet flex items-center justify-center text-white shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#202744]">
                Uro<span className="text-[#5149B8]">Challenge</span>
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#858BA1]">
                Educación Urológica
              </span>
            </div>
          </div>

          {/* Quick User Stats Pill */}
          {user && stats && (
            <div className="bg-[#F5F7FC] rounded-3xl p-4 mb-6 border border-[#5149B8]/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#5149B8] text-white font-bold flex items-center justify-center text-sm">
                  {user.display_name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#202744] truncate">{user.display_name}</p>
                  <p className="text-xs text-[#858BA1] truncate">
                    {user.role === 'admin' ? 'Administrador / Editor' : user.specialty_label}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-2xl px-3 py-2 flex items-center gap-2 border border-slate-100">
                  <Coins className="w-4 h-4 text-[#5149B8]" />
                  <div>
                    <span className="block text-xs font-extrabold text-[#202744]">
                      {stats.currentBalance} pts
                    </span>
                    <span className="block text-[10px] text-[#858BA1]">Saldo Canje</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl px-3 py-2 flex items-center gap-2 border border-slate-100">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="block text-xs font-extrabold text-[#202744]">
                      {stats.currentStreak} días
                    </span>
                    <span className="block text-[10px] text-[#858BA1]">Racha</span>
                  </div>
                </div>
              </div>
              {progression && (
                <button
                  type="button"
                  onClick={() => navigate('/app/trajectory')}
                  className="mt-2 w-full bg-white hover:bg-[#5149B8]/5 rounded-2xl px-3 py-2 flex items-center justify-between border border-[#5149B8]/15 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#13182B] flex items-center justify-center shrink-0">
                      <AchievementBadgeIcon
                        shape={progression.currentLevel.badge_shape}
                        color={progression.currentLevel.badge_color}
                        unlocked={true}
                        size="sm"
                      />
                    </div>
                    <div className="text-left min-w-0">
                      <span className="block text-[11px] font-extrabold text-[#5149B8] truncate">
                        Nivel {progression.currentLevel.roman_numeral} • {progression.currentLevel.name}
                      </span>
                      <span className="block text-[10px] text-[#858BA1]">
                        {progression.totalXp} XP acumulados
                      </span>
                    </div>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="space-y-1.5" aria-label="Navegación principal">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#5149B8] text-white shadow-md shadow-[#5149B8]/25'
                        : 'text-[#202744]/80 hover:bg-[#5149B8]/8 hover:text-[#5149B8]'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {(user?.role === 'admin' || user?.role === 'editor') && (
              <div className="pt-3 mt-3 border-t border-slate-200/80">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[#202744] text-white shadow-md'
                        : 'bg-[#83D0E5]/20 text-[#202744] hover:bg-[#83D0E5]/35'
                    }`
                  }
                >
                  <ShieldCheck className="w-5 h-5 text-[#5149B8]" />
                  <span>Panel Administrativo</span>
                </NavLink>
              </div>
            )}
          </nav>
        </div>

        {/* Bottom Demo Switcher & Logout */}
        <div className="space-y-2 pt-4 border-t border-slate-200/80">
          {isDemoMode && (
            <div className="bg-[#B8E5E8]/40 border border-[#83D0E5] rounded-2xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#202744]">
                  Modo Demo Local
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C3F574] text-[#202744]">
                  Activo
                </span>
              </div>
              <button
                type="button"
                onClick={handleSwitchDemoRole}
                className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-[#5149B8] text-xs font-bold border border-[#5149B8]/20 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Cambiar a {user?.role === 'admin' ? 'Usuario Demo' : 'Admin Demo'}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/register');
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold text-[#5149B8] bg-[#5149B8]/8 hover:bg-[#5149B8]/15 transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Crear nueva cuenta</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-600 bg-rose-50/70 hover:bg-rose-100 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión / Cambiar cuenta</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 md:pb-10">
        {/* Top Demo & Session Banner */}
        {isDemoMode && (
          <div className="bg-[#202744] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <span className="px-2 py-0.5 rounded-full bg-[#C3F574] text-[#202744] font-extrabold text-[10px] uppercase shrink-0">
                Sesión Activa
              </span>
              <span className="text-white/85 truncate">
                <strong>{user?.display_name}</strong> ({user?.role === 'admin' ? 'Admin' : 'Usuario'})
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleSwitchDemoRole}
                className="px-2.5 py-1 rounded-lg bg-[#7778ED] hover:bg-[#5149B8] text-white font-semibold text-[11px] transition cursor-pointer"
              >
                {user?.role === 'admin' ? 'Ver como Usuario' : 'Ver como Admin'}
              </button>
              {user?.role === 'admin' && (
                <NavLink
                  to="/admin"
                  className="px-2.5 py-1 rounded-lg bg-[#83D0E5] text-[#202744] font-bold text-[11px] hover:opacity-90 transition"
                >
                  Panel Admin
                </NavLink>
              )}
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/register');
                }}
                className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] transition cursor-pointer"
              >
                + Crear Cuenta
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-2.5 py-1 rounded-lg bg-rose-500/90 hover:bg-rose-600 text-white font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-5 md:pt-8">
          <Outlet />
        </main>
      </div>

      <BottomNavigation />
      <LevelUpNotificationModal
        progression={progression}
        onAcknowledge={acknowledgeLevelUps}
      />
    </div>
  );
};
