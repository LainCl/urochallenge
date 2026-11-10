import React from 'react';
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
} from 'lucide-react';
import { Profile, Category, DailyAssignment, Question, QuestionSchedule } from '../../types/domain';
import { CategoryIcon } from '../common/CategoryIcon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const HeaderGreeting: React.FC<{ user: Profile }> = ({ user }) => {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? '¡Buenos días!' : hour < 19 ? '¡Buenas tardes!' : '¡Buenas noches!';

  const initials = user.display_name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <header className="flex items-center justify-between mb-5">
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

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate('/app/study')}
          title="Recordatorios de Estudio y Pomodoro"
          className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {user.reminders_enabled && (
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2.5 right-2.5" />
          )}
        </button>
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
