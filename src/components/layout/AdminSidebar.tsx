import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileQuestion,
  FolderTree,
  Gift,
  Users,
  TicketCheck,
  Settings,
  ClipboardList,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../app/providers';

export const AdminSidebar: React.FC = () => {
  const { user, isDemoMode, loginAsDemo } = useApp();
  const navigate = useNavigate();

  if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
    return (
      <div className="min-h-screen bg-mesh-violet flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center card-soft-shadow border border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-[#202744] mb-2">Acceso Restringido</h2>
          <p className="text-sm text-[#858BA1] mb-6 leading-relaxed">
            Esta sección es exclusiva para administradores y editores del comité académico de UroChallenge.
          </p>
          <div className="flex flex-col gap-3">
            {isDemoMode && (
              <button
                type="button"
                onClick={() => loginAsDemo('admin')}
                className="w-full py-3 px-4 rounded-2xl bg-[#5149B8] hover:bg-[#423a9d] text-white text-sm font-bold transition cursor-pointer"
              >
                Activar Cuenta Administrador Demo
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate('/app')}
              className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#202744] text-sm font-semibold transition cursor-pointer"
            >
              Volver al Inicio de Usuario
            </button>
          </div>
        </div>
      </div>
    );
  }

  const adminLinks = [
    { to: '/admin', label: 'Resumen General', icon: LayoutDashboard, end: true },
    { to: '/admin/gamification', label: 'Gamificación (Niveles y XP)', icon: Sparkles, end: false },
    { to: '/admin/questions', label: 'Banco de Preguntas', icon: FileQuestion, end: false },
    { to: '/admin/categories', label: 'Categorías', icon: FolderTree, end: false },
    { to: '/admin/rewards', label: 'Premios y Stock', icon: Gift, end: false },
    { to: '/admin/redemptions', label: 'Gestión de Canjes', icon: TicketCheck, end: false },
    { to: '/admin/users', label: 'Usuarios y Saldos', icon: Users, end: false },
    { to: '/admin/settings', label: 'Reglas y Frecuencia', icon: Settings, end: false },
    { to: '/admin/audit', label: 'Auditoría', icon: ClipboardList, end: false },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FC] flex flex-col lg:flex-row">
      {/* Sidebar / Topbar */}
      <aside className="lg:w-72 bg-[#202744] text-white p-5 lg:p-6 flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#7778ED] flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-tight">UroChallenge</h1>
                <span className="text-[11px] text-[#83D0E5] font-semibold uppercase tracking-wider">
                  Panel Administrativo
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/app')}
              className="lg:hidden px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              App
            </button>
          </div>

          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0">
            {adminLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                      isActive
                        ? 'bg-[#7778ED] text-white shadow-md'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:block pt-6 border-t border-white/15">
          <div className="mb-4">
            <p className="text-xs font-bold text-white truncate">{user.display_name}</p>
            <p className="text-[11px] text-white/60 truncate">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/app')}
            className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la Vista de Usuario
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};
