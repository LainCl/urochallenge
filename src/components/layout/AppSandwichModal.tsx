import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  X,
  User,
  TrendingUp,
  Trophy,
  Calendar,
  Gift,
  Coins,
  Flame,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Menu,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import { PointsSummaryCard, StreakCard } from '../dashboard/DashboardWidgets';
import { MyProgressRpgCard } from '../dashboard/RpgProgressWidgets';
import { AchievementBadgeIcon } from '../rewards/AchievementBadgeIcon';
import { PanelSkeleton } from '../common/Skeleton';
import { AnimatedNumber } from '../common/Motion';

// Lazy-loaded tab contents (code-splitting)
const loadProfileModule = () => import('../../features/profile/ProfileAndActivityPages');
const ProfilePage = lazy(() => loadProfileModule().then((m) => ({ default: m.ProfilePage })));
const ActivityPage = lazy(() => loadProfileModule().then((m) => ({ default: m.ActivityPage })));
const TrajectoryPage = lazy(() =>
  import('../../features/profile/TrajectoryPage').then((m) => ({ default: m.TrajectoryPage }))
);
const RewardsCatalogPage = lazy(() =>
  import('../../features/rewards/RewardsPages').then((m) => ({ default: m.RewardsCatalogPage }))
);

export type SandwichModalTab = 'progreso' | 'perfil' | 'trayectoria' | 'actividad' | 'premios';

const SANDWICH_EVENT_NAME = 'uro:open-sandwich-modal';

export const openSandwichModal = (tab: SandwichModalTab = 'progreso') => {
  window.dispatchEvent(new CustomEvent(SANDWICH_EVENT_NAME, { detail: { tab } }));
};

export const SANDWICH_SECTIONS: {
  id: SandwichModalTab;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'progreso',
    label: 'Progreso General',
    shortLabel: 'Progreso',
    description: 'Puntos, racha, métricas y metas',
    icon: TrendingUp,
  },
  {
    id: 'perfil',
    label: 'Mi Perfil',
    shortLabel: 'Mi Perfil',
    description: 'Datos, especialidad y ajustes',
    icon: User,
  },
  {
    id: 'trayectoria',
    label: 'Mi Trayectoria RPG',
    shortLabel: 'Trayectoria RPG',
    description: 'Nivel académico, XP e insignias',
    icon: Trophy,
  },
  {
    id: 'actividad',
    label: 'Agenda y Actividad',
    shortLabel: 'Agenda y Actividad',
    description: 'Calendario, tests e historial',
    icon: Calendar,
  },
  {
    id: 'premios',
    label: 'Catálogo de Premios',
    shortLabel: 'Premios',
    description: 'Álbum coleccionable y canjes',
    icon: Gift,
  },
];

export const AppSandwichModal: React.FC = () => {
  const { user, stats, progression } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SandwichModalTab>('progreso');

  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ tab?: SandwichModalTab }>;
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
      }
      setIsOpen(true);
    };

    window.addEventListener(SANDWICH_EVENT_NAME, handleOpenEvent);
    return () => window.removeEventListener(SANDWICH_EVENT_NAME, handleOpenEvent);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || !user || !stats) return null;

  const rewards = uroRepository.getRewards();
  const sortedRewards = [...rewards].sort((a, b) => a.points_cost - b.points_cost);
  const nextReward =
    sortedRewards.find((r) => r.points_cost > stats.currentBalance) ||
    sortedRewards[sortedRewards.length - 1];

  const rewardProgressPct = nextReward
    ? Math.min(100, Math.round((stats.currentBalance / nextReward.points_cost) * 100))
    : 100;

  const initials = user.display_name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#13182B]/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Menú Sándwich de Usuario y Progreso"
      onClick={() => setIsOpen(false)}
    >
      {/* Modal / Drawer Container */}
      <div
        className="relative w-full max-w-5xl bg-[#F5F7FC] h-full md:h-[94vh] md:my-auto md:mr-4 md:rounded-[36px] shadow-2xl border border-white/80 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <header className="bg-gradient-to-r from-[#202744] via-[#2A325A] to-[#5149B8] text-white px-5 py-4 sm:px-7 sm:py-5 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center font-extrabold text-sm text-[#C3F574] shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C3F574] text-[#202744] text-meta font-black uppercase tracking-wider">
                    <Menu className="w-3 h-3" />
                    Expediente Urológico
                  </span>
                  {progression && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-meta font-bold">
                      Nivel {progression.currentLevel.roman_numeral} • {progression.currentLevel.name}
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-extrabold truncate mt-0.5">
                  {user.display_name}
                </h2>
              </div>
            </div>

            {/* Quick Status Pills + Close Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('premios')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/12 hover:bg-white/20 text-xs font-extrabold text-white transition cursor-pointer"
                title="Ver saldo y catálogo de premios"
              >
                <Coins className="w-3.5 h-3.5 text-[#C3F574]" />
                <span>{stats.currentBalance} pts</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('actividad')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/12 hover:bg-white/20 text-xs font-extrabold text-white transition cursor-pointer"
                title="Ver racha y actividad"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{stats.currentStreak} días</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 5-Section Sandwich Deployment Menu Grid */}
          <nav
            aria-label="Secciones del menú sándwich"
            className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
          >
            {SANDWICH_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeTab === sec.id;
              const dynamicSublabel =
                sec.id === 'perfil'
                  ? user.specialty_label || 'Ajustes'
                  : sec.id === 'progreso'
                    ? `${stats.currentBalance} pts • ${stats.accuracyPercentage}% acierto`
                    : sec.id === 'trayectoria'
                      ? progression
                        ? `Nivel ${progression.currentLevel.roman_numeral} • ${progression.totalXp} XP`
                        : 'Niveles y XP'
                      : sec.id === 'actividad'
                        ? `Racha ${stats.currentStreak} días`
                        : 'Álbum y canjes';

              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#C3F574] text-[#202744] shadow-md scale-[1.01]'
                      : 'bg-white/12 text-white hover:bg-white/20'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#202744] text-[#C3F574]' : 'bg-white/15 text-[#C3F574]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-extrabold truncate">{sec.shortLabel}</span>
                    <span
                      className={`block text-meta font-semibold truncate ${
                        isSelected ? 'text-[#202744]/80' : 'text-white/75'
                      }`}
                    >
                      {dynamicSublabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </header>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7">
          {activeTab === 'progreso' && (
            <div className="space-y-6">
              {/* Section Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-3xl p-5 card-soft-shadow border border-white">
                <div>
                  <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8]">
                    Resumen Ejecutivo
                  </span>
                  <h3 className="text-xl font-extrabold text-[#202744]">
                    Mi Progreso y Rendimiento Académico
                  </h3>
                  <p className="text-xs text-[#858BA1]">
                    Consulta tu saldo de puntos, racha de estudio, avance de nivel RPG y próximo premio objetivo.
                  </p>
                </div>
                {progression && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('trayectoria')}
                    className="px-4 py-2.5 rounded-2xl bg-[#F5F7FC] hover:bg-[#5149B8]/10 border border-[#5149B8]/20 flex items-center gap-2.5 transition cursor-pointer shrink-0"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#13182B] flex items-center justify-center shrink-0">
                      <AchievementBadgeIcon
                        shape={progression.currentLevel.badge_shape}
                        color={progression.currentLevel.badge_color}
                        unlocked={true}
                        size="sm"
                      />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-extrabold text-[#5149B8]">
                        Nivel {progression.currentLevel.roman_numeral} • {progression.currentLevel.name}
                      </span>
                      <span className="block text-meta text-[#858BA1]">
                        {progression.totalXp} XP • Ver Trayectoria RPG →
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* Points & Streak Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PointsSummaryCard
                  balance={stats.currentBalance}
                  totalEarned={stats.totalEarned}
                  accuracy={stats.accuracyPercentage}
                />
                <StreakCard currentStreak={stats.currentStreak} bestStreak={stats.bestStreak} />
              </div>

              {/* 6 Detailed KPI Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 uc-stagger">
                {[
                  {
                    label: 'Saldo Actual',
                    numValue: stats.currentBalance,
                    suffix: ' pts',
                    icon: Coins,
                    color: 'text-[#5149B8] bg-[#5149B8]/10',
                  },
                  {
                    label: 'Puntos Ganados',
                    numValue: stats.totalEarned,
                    suffix: ' pts',
                    icon: Sparkles,
                    color: 'text-emerald-700 bg-emerald-100',
                  },
                  {
                    label: 'Respondidas',
                    numValue: stats.questionsAnswered,
                    suffix: '',
                    icon: CheckCircle2,
                    color: 'text-sky-700 bg-sky-100',
                  },
                  {
                    label: '% de Aciertos',
                    numValue: stats.accuracyPercentage,
                    suffix: '%',
                    icon: Trophy,
                    color: 'text-amber-700 bg-amber-100',
                  },
                  {
                    label: 'Racha Actual',
                    numValue: stats.currentStreak,
                    suffix: ' días',
                    icon: Flame,
                    color: 'text-orange-700 bg-orange-100',
                  },
                  {
                    label: 'Mejor Racha',
                    numValue: stats.bestStreak,
                    suffix: ' días',
                    icon: Flame,
                    color: 'text-rose-700 bg-rose-100',
                  },
                ].map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.label}
                      className="bg-white rounded-3xl p-4 card-soft-shadow border border-white"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${kpi.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="block text-lg font-black text-[#202744] tabular-nums">
                        <AnimatedNumber value={kpi.numValue} suffix={kpi.suffix} />
                      </span>
                      <span className="text-meta font-semibold text-[#858BA1]">{kpi.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Next Reward Target Banner */}
              {nextReward && (
                <section className="bg-white rounded-[28px] p-5 card-soft-shadow border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-[#83D0E5]/25 text-[#5149B8] flex items-center justify-center shrink-0">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8]">
                          Próximo Premio Objetivo
                        </span>
                        <span className="text-xs font-bold text-[#858BA1]">
                          ({stats.currentBalance} / {nextReward.points_cost} pts)
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-[#202744] truncate mb-2">
                        {nextReward.name}
                      </h4>
                      <div className="w-full h-2.5 bg-[#F5F7FC] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#5149B8] to-[#83D0E5] transition-all duration-300"
                          style={{ width: `${rewardProgressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('premios')}
                    className="px-4 py-2.5 rounded-full bg-[#5149B8] hover:bg-[#3f3896] text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>Ir al Catálogo de Premios</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </section>
              )}

              {/* RPG Progression Card */}
              {progression && <MyProgressRpgCard progression={progression} />}

              {/* Quick Navigation Cards to the other 4 sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SANDWICH_SECTIONS.filter((s) => s.id !== 'progreso').map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveTab(sec.id)}
                      className="bg-white hover:bg-[#5149B8]/[0.04] rounded-3xl p-4 card-soft-shadow border border-white hover:border-[#5149B8]/25 text-left transition flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-[#5149B8]/10 text-[#5149B8] group-hover:bg-[#5149B8] group-hover:text-white flex items-center justify-center transition shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold text-[#202744] truncate">
                            {sec.label}
                          </p>
                          <p className="text-meta text-[#858BA1] truncate">{sec.description}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#858BA1] group-hover:text-[#5149B8] shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Suspense fallback={<PanelSkeleton />}>
            <div key={activeTab} className="uc-page-enter">
              {activeTab === 'perfil' && <ProfilePage />}
              {activeTab === 'trayectoria' && <TrajectoryPage />}
              {activeTab === 'actividad' && <ActivityPage />}
              {activeTab === 'premios' && <RewardsCatalogPage />}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
