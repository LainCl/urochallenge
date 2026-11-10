import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Settings,
  Coins,
  Flame,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  BookOpenCheck,
  Trophy,
  Gift,
  CheckCheck,
  X,
} from 'lucide-react';
import { Profile, Category, DailyAssignment, Question, QuestionSchedule } from '../../types/domain';
import { uroRepository } from '../../services/uroRepository';
import { CategoryIcon } from '../common/CategoryIcon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AppNotificationItem {
  id: string;
  title: string;
  message: string;
  timeLabel: string;
  type: 'daily' | 'level' | 'achievement' | 'reward' | 'study';
  actionLabel: string;
  actionPath: string;
}

export const HeaderGreeting: React.FC<{ user: Profile }> = ({ user }) => {
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const storageKey = `urochallenge_read_notifs_${user.id}`;
  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setReadIds(saved ? JSON.parse(saved) : []);
    } catch {
      setReadIds([]);
    }
  }, [storageKey]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotifOpen]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? '¡Buenos días!' : hour < 19 ? '¡Buenas tardes!' : '¡Buenas noches!';

  const initials = user.display_name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  // Build real application notifications for the user
  const notifications: AppNotificationItem[] = [];
  const dailyState = uroRepository.getDailyQuestionState(user.id);
  const progression = uroRepository.getUserProgression(user.id);
  const achievements = uroRepository.getUserAutoAchievements(user.id).filter((a) => a.unlocked);
  const redemptions = uroRepository.getUserRedemptions(user.id);

  if (dailyState.assignment?.status === 'available' && dailyState.question) {
    notifications.push({
      id: `notif-daily-${dailyState.assignment.period_key}`,
      title: '¡Pregunta periódica disponible!',
      message: `Tienes un desafío clínico pendiente en "${dailyState.category?.name || 'Urología'}". Gana +${dailyState.potentialPoints.participation + dailyState.potentialPoints.correctBonus} pts y +20 XP.`,
      timeLabel: 'Disponible ahora',
      type: 'daily',
      actionLabel: 'Responder pregunta',
      actionPath: '/app/daily-question',
    });
  }

  if (progression.nextLevel) {
    notifications.push({
      id: `notif-lvl-prog-${progression.currentLevel.level_number}-${progression.totalXp}`,
      title: `Nivel ${progression.currentLevel.roman_numeral} — ${progression.currentLevel.name}`,
      message: `Acumulas ${progression.totalXp} XP (${progression.levelProgressPercentage}%). Te faltan ${progression.xpMissingForNextLevel} XP para alcanzar el rango ${progression.nextLevel.name}.`,
      timeLabel: 'Progreso RPG',
      type: 'level',
      actionLabel: 'Ver mi trayectoria',
      actionPath: '/app/trajectory',
    });
  }

  for (const ach of achievements.slice(0, 2)) {
    notifications.push({
      id: `notif-ach-${ach.id}`,
      title: `Logro desbloqueado: ${ach.name}`,
      message: ach.description,
      timeLabel: ach.unlocked_at
        ? format(new Date(ach.unlocked_at), "d 'de' MMM", { locale: es })
        : 'Desbloqueado',
      type: 'achievement',
      actionLabel: 'Ver insignias',
      actionPath: '/app/trajectory',
    });
  }

  for (const red of redemptions.slice(0, 2)) {
    const statusLabel =
      red.status === 'approved'
        ? 'Aprobado'
        : red.status === 'delivered'
          ? 'Entregado'
          : red.status === 'rejected'
            ? 'Reembolsado'
            : 'Pendiente de validación';
    notifications.push({
      id: `notif-red-${red.id}-${red.status}`,
      title: `Canje ${red.redemption_code}: ${statusLabel}`,
      message: `Premio "${red.reward_name}" (${red.points_spent} pts).`,
      timeLabel: format(new Date(red.created_at), "d 'de' MMM, HH:mm", { locale: es }),
      type: 'reward',
      actionLabel: 'Ver mis premios',
      actionPath: '/app/rewards',
    });
  }

  if (user.reminders_enabled) {
    notifications.push({
      id: `notif-study-reminder-${user.reminder_time || '08:30'}`,
      title: `Recordatorio de estudio (${user.reminder_time || '08:30'} hrs)`,
      message:
        'Completa un ciclo de estudio Pomodoro de 25 min para obtener +2 puntos y +40 XP de experiencia.',
      timeLabel: ' Hábito diario',
      type: 'study',
      actionLabel: 'Ir a Pomodoro',
      actionPath: '/app/study',
    });
  }

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  const markAsRead = (id: string) => {
    if (readIds.includes(id)) return;
    const updated = [...readIds, id];
    setReadIds(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const markAllAsRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadIds(allIds);
    try {
      localStorage.setItem(storageKey, JSON.stringify(allIds));
    } catch {
      // ignore storage errors
    }
  };

  return (
    <header className="flex items-center justify-between mb-5 relative z-30">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5149B8] to-[#83D0E5] p-0.5 shadow-md">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-extrabold text-[#5149B8] text-sm">
            {initials}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#858BA1]">{greeting}</p>
          <h2 className="text-base sm:text-lg font-extrabold text-[#202744] leading-tight">
            {user.display_name}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsNotifOpen((prev) => !prev)}
          title="Centro de Notificaciones"
          aria-expanded={isNotifOpen}
          className={`w-10 h-10 rounded-full card-soft-shadow flex items-center justify-center transition relative cursor-pointer ${
            isNotifOpen
              ? 'bg-[#5149B8] text-white'
              : 'bg-white text-[#202744] hover:text-[#5149B8]'
          }`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center absolute -top-0.5 -right-0.5 border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Floating In-App Notification Center Popover */}
        {isNotifOpen && (
          <div className="absolute right-0 top-12 w-[330px] sm:w-[390px] bg-white rounded-[28px] shadow-2xl border border-slate-200/90 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-5 py-4 bg-gradient-to-r from-[#202744] to-[#5149B8] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#C3F574]" />
                <div>
                  <h3 className="text-sm font-extrabold leading-tight">Notificaciones</h3>
                  <p className="text-[11px] text-white/75">
                    {unreadCount > 0
                      ? `Tienes ${unreadCount} aviso(s) sin leer`
                      : 'Estás al día con tus avisos'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    title="Marcar todas como leídas"
                    className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5 text-[#C3F574]" />
                    <span>Leer todas</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsNotifOpen(false)}
                  className="p-1 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#858BA1]">
                  No tienes notificaciones en este momento.
                </div>
              ) : (
                notifications.map((item) => {
                  const isUnread = !readIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => markAsRead(item.id)}
                      className={`p-4 transition flex items-start gap-3 ${
                        isUnread ? 'bg-[#5149B8]/[0.04]' : 'bg-white'
                      } hover:bg-[#F5F7FC]`}
                    >
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                          item.type === 'daily'
                            ? 'bg-[#5149B8]/15 text-[#5149B8]'
                            : item.type === 'level'
                              ? 'bg-amber-100 text-amber-700'
                              : item.type === 'achievement'
                                ? 'bg-emerald-100 text-emerald-700'
                                : item.type === 'reward'
                                  ? 'bg-sky-100 text-sky-700'
                                  : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {item.type === 'daily' && <Sparkles className="w-4 h-4" />}
                        {item.type === 'level' && <Trophy className="w-4 h-4" />}
                        {item.type === 'achievement' && <CheckCircle2 className="w-4 h-4" />}
                        {item.type === 'reward' && <Gift className="w-4 h-4" />}
                        {item.type === 'study' && <Clock className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-xs font-extrabold text-[#202744] truncate">
                            {item.title}
                          </span>
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#858BA1] leading-relaxed mb-2">
                          {item.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-slate-400">
                            {item.timeLabel}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(item.id);
                              setIsNotifOpen(false);
                              navigate(item.actionPath);
                            }}
                            className="text-[11px] font-extrabold text-[#5149B8] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>{item.actionLabel}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate('/app/profile')}
          title="Configuración de perfil"
          className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export const PointsSummaryCard: React.FC<{
  balance: number;
  totalEarned: number;
  accuracy: number;
}> = ({ balance, totalEarned, accuracy }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/app/rewards')}
      className="bg-white rounded-3xl p-4 sm:p-5 card-soft-shadow border border-white flex items-center justify-between cursor-pointer hover:border-[#5149B8]/30 transition group"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-[#5149B8]/10 text-[#5149B8] flex items-center justify-center shrink-0 group-hover:bg-[#5149B8] group-hover:text-white transition">
          <Coins className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold text-[#858BA1] block">Puntos disponibles</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-[#202744]">{balance}</span>
            <span className="text-xs font-bold text-[#5149B8]">pts</span>
          </div>
          <span className="text-[11px] text-[#858BA1]">
            Acumulado histórico: {totalEarned} pts • Acierto {accuracy}%
          </span>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-[#F5F7FC] flex items-center justify-center text-[#5149B8] group-hover:translate-x-0.5 transition">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
};

export const StreakCard: React.FC<{
  currentStreak: number;
  bestStreak: number;
}> = ({ currentStreak, bestStreak }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/app/activity')}
      className="bg-gradient-to-br from-[#83D0E5]/35 via-[#B8E5E8]/35 to-white rounded-3xl p-4 sm:p-5 card-soft-shadow border border-[#83D0E5]/50 flex items-center justify-between cursor-pointer hover:border-[#5149B8]/30 transition group"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-[#C3F574] text-[#202744] flex items-center justify-center shrink-0 shadow-sm">
          <Flame className="w-6 h-6 fill-[#202744]" />
        </div>
        <div>
          <span className="text-xs font-semibold text-[#202744]/75 block">Racha de estudio</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-[#202744]">{currentStreak}</span>
            <span className="text-xs font-bold text-[#202744]">días seguidos</span>
          </div>
          <span className="text-[11px] text-[#202744]/70 flex items-center gap-1">
            <Trophy className="w-3 h-3 text-[#5149B8]" /> Mejor racha: {bestStreak} días
          </span>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#202744] group-hover:translate-x-0.5 transition">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
};

export const DailyQuestionCard: React.FC<{
  assignment: DailyAssignment | null;
  question: Question | null;
  category: Category | null;
  schedule: QuestionSchedule;
  nextAvailableAt: string;
  potentialPoints: { participation: number; correctBonus: number };
}> = ({ assignment, question, category, schedule, nextAvailableAt, potentialPoints }) => {
  const navigate = useNavigate();
  const isAnswered = assignment?.status === 'answered';
  const maxPoints = potentialPoints.participation + potentialPoints.correctBonus;

  let formattedNextDate = '';
  try {
    formattedNextDate = format(new Date(nextAvailableAt), "d 'de' MMM, HH:mm", { locale: es });
  } catch {
    formattedNextDate = 'Próximo período';
  }

  return (
    <div className="card-hero-violet rounded-[32px] p-6 text-white relative overflow-hidden">
      {/* Subtle decorative circles inspired by the reference middle mobile screen */}
      <div className="w-40 h-40 rounded-full bg-white/10 absolute -right-10 -top-12 pointer-events-none" />
      <div className="w-28 h-28 rounded-full bg-[#83D0E5]/20 absolute right-12 -bottom-10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C3F574]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
                {schedule.name}
              </span>
              <h3 className="text-lg font-extrabold leading-tight">
                {isAnswered ? 'Desafío periódico completado' : 'Pregunta disponible hoy'}
              </h3>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold ${
              isAnswered
                ? 'bg-white/20 text-white'
                : 'bg-[#C3F574] text-[#202744] shadow-sm'
            }`}
          >
            {isAnswered ? `+${assignment?.points_awarded ?? 0} pts ganados` : `Hasta +${maxPoints} pts`}
          </span>
        </div>

        {question ? (
          <p className="text-sm text-white/95 font-medium line-clamp-2 mb-4 leading-relaxed bg-black/10 rounded-2xl p-3.5 border border-white/10">
            “{question.question_text}”
          </p>
        ) : (
          <p className="text-sm text-white/85 mb-4">
            No hay preguntas publicadas disponibles en este momento.
          </p>
        )}

        {/* Date & Category metadata row like the appointment card in the visual reference */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-xs bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-[#83D0E5] shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] text-white/70">Categoría</span>
              <span className="font-bold truncate block">
                {category?.name || 'Urología General'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAnswered ? (
              <CheckCircle2 className="w-4 h-4 text-[#C3F574] shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-[#83D0E5] shrink-0" />
            )}
            <div className="truncate">
              <span className="block text-[10px] text-white/70">
                {isAnswered ? 'Próximo desafío' : 'Frecuencia'}
              </span>
              <span className="font-bold truncate block">
                {isAnswered
                  ? formattedNextDate
                  : `Cada ${schedule.interval_value} ${schedule.interval_unit === 'days' ? 'día(s)' : 'hora(s)'}`}
              </span>
            </div>
          </div>
        </div>

        {/* Dual Action Pill Buttons matching the reference image ("Re-schedule" / "View profile") */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/app/daily-question')}
            className="flex-1 py-3 px-5 rounded-full bg-white text-[#5149B8] hover:bg-slate-50 font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isAnswered ? 'Ver explicación y resultado' : 'Responder ahora'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/quiz')}
            className="flex-1 py-3 px-5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Realizar test de 10 preguntas</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const CategoryCard: React.FC<{
  category: Category;
  questionsCount: number;
  featured?: boolean;
  onSelect: (categoryId: string) => void;
}> = ({ category, questionsCount, featured = false, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(category.id)}
    className={`text-left rounded-[28px] p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between group cursor-pointer ${
      featured
        ? 'card-hero-violet text-white'
        : 'bg-white hover:bg-[#F5F7FC] text-[#202744] card-soft-shadow border border-slate-100 hover:border-[#5149B8]/30'
    }`}
  >
    <div>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
            featured
              ? 'bg-white/20 text-white'
              : 'bg-[#5149B8]/10 text-[#5149B8] group-hover:bg-[#5149B8] group-hover:text-white transition'
          }`}
        >
          <CategoryIcon name={category.icon} className="w-5 h-5" />
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
            featured ? 'bg-[#C3F574] text-[#202744]' : 'bg-[#C3F574]/80 text-[#202744]'
          }`}
        >
          Disponible
        </span>
      </div>

      <h4
        className={`text-sm font-extrabold leading-snug mb-1 ${
          featured ? 'text-white' : 'text-[#202744]'
        }`}
      >
        {category.name}
      </h4>
      <p
        className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
          featured ? 'text-white/80' : 'text-[#858BA1]'
        }`}
      >
        {category.description}
      </p>
    </div>

    <div className="flex items-center justify-between pt-2 border-t border-current/10">
      <div className="flex items-center gap-1.5">
        <span className="text-amber-400 text-xs">★</span>
        <span
          className={`text-xs font-bold ${
            featured ? 'text-white/95' : 'text-[#202744]'
          }`}
        >
          {questionsCount} preguntas
        </span>
      </div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition group-hover:translate-x-0.5 ${
          featured
            ? 'bg-white text-[#5149B8]'
            : 'bg-[#F5F7FC] text-[#5149B8] group-hover:bg-[#5149B8] group-hover:text-white'
        }`}
      >
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  </button>
);
