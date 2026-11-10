import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Coins,
  Flame,
  Trophy,
  BookOpenCheck,
  Target,
  Bell,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  RotateCcw,
  Sparkles,
  TicketCheck,
  ShieldAlert,
  LogOut,
  UserPlus,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import { ActivityCalendar } from '../../components/dashboard/ActivityCalendar';
import { MyProgressRpgCard } from '../../components/dashboard/RpgProgressWidgets';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const ActivityPage: React.FC = () => {
  const { user, stats } = useApp();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  if (!user || !stats) return null;

  const dailyState = uroRepository.getDailyQuestionState(user.id);
  const ledger = uroRepository.getUserLedger(user.id);
  const quizHistory = uroRepository.getUserQuizHistory(user.id);
  const pomodoroSessions = uroRepository.getUserPomodoroSessions(user.id);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#5149B8]">
          Agenda & Seguimiento
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202744]">
          Calendario e Historial de Actividad
        </h1>
      </div>

      {/* Calendar Selector */}
      <ActivityCalendar
        activeDates={stats.activeDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* Scheduled Daily Question & Study Pomodoro Shortcut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-xs font-extrabold">
                Estado de Programación
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                  dailyState.assignment?.status === 'answered'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-[#C3F574] text-[#202744]'
                }`}
              >
                {dailyState.assignment?.status === 'answered' ? 'Respondida' : 'Disponible'}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-[#202744] mb-1">
              {dailyState.schedule.name}
            </h3>
            <p className="text-xs text-[#858BA1] mb-4">
              Frecuencia configurada: cada {dailyState.schedule.interval_value}{' '}
              {dailyState.schedule.interval_unit === 'days' ? 'día(s)' : 'hora(s)'}. Próximo corte:{' '}
              {format(new Date(dailyState.nextAvailableAt), "d 'de' MMM, HH:mm", { locale: es })}.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/app/daily-question')}
            className="w-full py-3 px-4 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>Ir a la pregunta periódica</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcut to the dedicated Study & Pomodoro Menu Tab */}
        <div className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#5149B8]" />
                <h3 className="text-base font-extrabold text-[#202744]">
                  Estudio Pomodoro y Recordatorios
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#C3F574] text-[#202744] text-xs font-extrabold">
                +2 pts / ciclo
              </span>
            </div>

            <p className="text-xs text-[#858BA1] mb-4 leading-relaxed">
              Has completado <strong>{pomodoroSessions.length} ciclo(s) Pomodoro</strong>. Configura
              tus recordatorios diarios de estudio ({user.reminder_time || '08:30'}) o inicia un
              nuevo bloque de enfoque de 25 minutos en su pestaña dedicada.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/app/study')}
            className="w-full py-3 px-4 rounded-full bg-[#F5F7FC] hover:bg-[#5149B8] text-[#5149B8] hover:text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <span>Abrir pestaña Estudio & Pomodoro</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completed Quizzes History */}
      <section className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Evaluaciones de 10 Preguntas Completadas ({quizHistory.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/app/quiz')}
            className="text-xs font-bold text-[#5149B8] hover:underline cursor-pointer"
          >
            Realizar nuevo test
          </button>
        </div>

        <div className="space-y-2.5">
          {quizHistory.map((q) => {
            const pct = Math.round((q.correct_answers / q.total_questions) * 100);
            return (
              <div
                key={q.id}
                onClick={() => navigate(`/app/quiz/${q.id}/result`)}
                className="p-4 rounded-2xl bg-[#F5F7FC] hover:bg-slate-100 border border-slate-100 flex items-center justify-between cursor-pointer transition"
              >
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#202744] block">
                    Test de {q.total_questions} preguntas — {q.correct_answers}/{q.total_questions}{' '}
                    aciertos ({pct}%)
                  </span>
                  <span className="text-[11px] text-[#858BA1]">
                    Completado el{' '}
                    {format(new Date(q.completed_at || q.started_at), "d 'de' MMM yyyy, HH:mm", {
                      locale: es,
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-xs font-extrabold">
                    +{q.points_awarded} pts
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#858BA1]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chronological Points Ledger */}
      <section className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Libro de Movimientos de Puntos ({ledger.length})
            </h2>
          </div>
          <span className="text-xs font-extrabold text-[#5149B8]">
            Saldo actual: {stats.currentBalance} pts
          </span>
        </div>

        <div className="space-y-2.5">
          {ledger.map((entry) => (
            <div
              key={entry.id}
              className="p-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    entry.amount >= 0
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {entry.amount >= 0 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-[#202744] truncate">
                    {entry.reason}
                  </p>
                  <p className="text-[11px] text-[#858BA1]">
                    {format(new Date(entry.created_at), "d 'de' MMM yyyy, HH:mm", { locale: es })} •
                    Tipo: <span className="uppercase font-semibold">{entry.entry_type}</span>
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-black shrink-0 ${
                  entry.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {entry.amount >= 0 ? `+${entry.amount}` : entry.amount} pts
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ProfilePage: React.FC = () => {
  const { user, stats, progression, isDemoMode, updateCurrentUserProfile, resetDemoData, logout } = useApp();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.display_name || '');
  const [specialty, setSpecialty] = useState(user?.specialty_label || '');
  const [timezone, setTimezone] = useState(user?.timezone || 'America/Santiago');
  const [savedNotice, setSavedNotice] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!user || !stats) return null;

  const myRedemptions = uroRepository.getUserRedemptions(user.id);
  const ledger = uroRepository.getUserLedger(user.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    updateCurrentUserProfile({
      display_name: displayName.trim(),
      specialty_label: specialty.trim(),
      timezone,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Profile Hero Header */}
      <div className="bg-white rounded-[36px] p-6 sm:p-8 card-soft-shadow border border-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl card-hero-violet text-white font-extrabold text-xl flex items-center justify-center shadow-md shrink-0">
            {user.display_name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div>
            <span className="px-3 py-0.5 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-[11px] font-extrabold uppercase">
              {user.role === 'admin' ? 'Administrador / Editor' : 'Perfil Académico'}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#202744] mt-1">
              {user.display_name}
            </h1>
            <p className="text-xs text-[#858BA1]">
              {user.email} • {user.specialty_label}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/app/trajectory')}
            className="px-4 py-2.5 rounded-full bg-[#202744] hover:bg-[#13182B] text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-[#C3F574]" />
            <span>Mi Trayectoria ({progression?.currentLevel.name || 'Nivel I'})</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/rewards')}
            className="px-4 py-2.5 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C3F574]" />
            <span>Canjear Puntos ({stats.currentBalance} pts)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/ register'.replace(' ', ''));
            }}
            className="px-4 py-2.5 rounded-full bg-[#F5F7FC] hover:bg-slate-200 text-[#202744] text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#5149B8]" />
            <span>Nueva Cuenta</span>
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-4 py-2.5 rounded-full bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* RPG Progression Card in Profile with direct access to "Mi trayectoria" */}
      {progression && <MyProgressRpgCard progression={progression} />}

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-3xl p-4 card-soft-shadow border border-white">
          <Coins className="w-5 h-5 text-[#5149B8] mb-2" />
          <span className="text-xl font-black text-[#202744] block">{stats.currentBalance}</span>
          <span className="text-[11px] font-semibold text-[#858BA1]">Saldo Actual</span>
        </div>
        <div className="bg-white rounded-3xl p-4 card-soft-shadow border border-white">
          <Sparkles className="w-5 h-5 text-emerald-600 mb-2" />
          <span className="text-xl font-black text-[#202744] block">{stats.totalEarned}</span>
          <span className="text-[11px] font-semibold text-[#858BA1]">Puntos Ganados</span>
        </div>
        <div className="bg-white rounded-3xl p-4 card-soft-shadow border border-white">
          <BookOpenCheck className="w-5 h-5 text-[#5149B8] mb-2" />
          <span className="text-xl font-black text-[#202744] block">
            {stats.questionsAnswered}
          </span>
          <span className="text-[11px] font-semibold text-[#858BA1]">Preg. Respondidas</span>
        </div>
        <div className="bg-white rounded-3xl p-4 card-soft-shadow border border-white">
          <Target className="w-5 h-5 text-blue-600 mb-2" />
          <span className="text-xl font-black text-[#202744] block">
            {stats.accuracyPercentage}%
          </span>
          <span className="text-[11px] font-semibold text-[#858BA1]">% de Aciertos</span>
        </div>
        <div className="bg-white rounded-3xl p-4 card-soft-shadow border border-white">
          <Flame className="w-5 h-5 text-amber-500 mb-2" />
          <span className="text-xl font-black text-[#202744] block">
            {stats.currentStreak} días
          </span>
          <span className="text-[11px] font-semibold text-[#858BA1]">Racha Actual</span>
        </div>
        <div className="bg-white rounded-3xl p-4 card-soft-shadow border border-white">
          <Trophy className="w-5 h-5 text-purple-600 mb-2" />
          <span className="text-xl font-black text-[#202744] block">
            {stats.bestStreak} días
          </span>
          <span className="text-[11px] font-semibold text-[#858BA1]">Mejor Racha</span>
        </div>
      </div>

      {/* Edit Personal Info & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white space-y-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <User className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">Información Personal</h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Nombre visible
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Nivel / Especialidad
            </label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Zona horaria para corte de preguntas periódicas
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
            >
              <option value="America/Santiago">America/Santiago (GMT-3)</option>
              <option value="America/Buenos_Aires">America/Buenos_Aires (GMT-3)</option>
              <option value="America/Bogota">America/Bogota (GMT-5)</option>
              <option value="America/Mexico_City">America/Mexico_City (GMT-6)</option>
              <option value="Europe/Madrid">Europe/Madrid (CET)</option>
            </select>
          </div>

          {savedNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold">
              ✓ Perfil actualizado correctamente.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-5 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold transition cursor-pointer"
          >
            Guardar cambios de perfil
          </button>
        </form>

        {/* Redeemed Rewards & Demo Reset */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TicketCheck className="w-5 h-5 text-[#5149B8]" />
                <h2 className="text-base font-extrabold text-[#202744]">
                  Premios Canjeados ({myRedemptions.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app/rewards')}
                className="text-xs font-bold text-[#5149B8] hover:underline cursor-pointer"
              >
                Catálogo
              </button>
            </div>

            {myRedemptions.length === 0 ? (
              <p className="text-xs text-[#858BA1]">
                Todavía no tienes premios canjeados en tu perfil.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {myRedemptions.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-black text-[#5149B8] block">
                        {r.redemption_code}
                      </span>
                      <span className="text-xs font-bold text-[#202744]">{r.reward_name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#858BA1] uppercase">{r.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isDemoMode && (
            <div className="bg-amber-50/90 rounded-[28px] p-5 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Utilidad de Modo Demo</span>
              </div>
              <p className="text-xs text-amber-800 mb-3 leading-relaxed">
                Si deseas reiniciar los datos locales de demostración a su estado semilla original,
                puedes hacerlo aquí.
              </p>
              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer base de datos Demo</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetDemoData();
                      setConfirmReset(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold cursor-pointer"
                  >
                    Confirmar reinicio
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-2 rounded-xl bg-white text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Activity Ledger Summary */}
      <div className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-[#202744]">
            Historial Reciente de Movimientos ({ledger.length})
          </h2>
          <button
            type="button"
            onClick={() => navigate('/app/activity')}
            className="text-xs font-bold text-[#5149B8] hover:underline cursor-pointer"
          >
            Ver calendario completo
          </button>
        </div>

        <div className="space-y-2">
          {ledger.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-[#F5F7FC] flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-[#202744] block">{item.reason}</span>
                <span className="text-[11px] text-[#858BA1]">
                  {format(new Date(item.created_at), "d 'de' MMM yyyy, HH:mm", { locale: es })}
                </span>
              </div>
              <span
                className={`font-extrabold ${
                  item.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {item.amount >= 0 ? `+${item.amount}` : item.amount} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
