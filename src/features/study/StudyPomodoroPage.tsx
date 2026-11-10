import React, { useState, useEffect } from 'react';
import {
  Bell,
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Coins,
  Sparkles,
  Coffee,
  BookOpen,
  Clock,
  FastForward,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type PomodoroPhase = 'focus' | 'short_break' | 'long_break';

const PHASE_DURATIONS: Record<PomodoroPhase, { label: string; minutes: number }> = {
  focus: { label: 'Enfoque Pomodoro (Estudio)', minutes: 25 },
  short_break: { label: 'Descanso Corto', minutes: 5 },
  long_break: { label: 'Descanso Largo', minutes: 15 },
};

export const StudyPomodoroPage: React.FC = () => {
  const { user, stats, isDemoMode, updateCurrentUserProfile, refreshData } = useApp();

  const [phase, setPhase] = useState<PomodoroPhase>('focus');
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [cycleKey, setCycleKey] = useState<string>(() => `cycle-${Date.now()}`);
  const [lastCompletedBanner, setLastCompletedBanner] = useState<{
    points: number;
    streakBonus: number;
    topic: string;
  } | null>(null);
  const [browserPermissionMsg, setBrowserPermissionMsg] = useState<string | null>(null);

  if (!user || !stats) return null;

  const categories = uroRepository.getCategories();
  const pomodoroHistory = uroRepository.getUserPomodoroSessions(user.id);
  const rules = uroRepository.getPointRules();
  const pointsPerCycle =
    rules.find((r) => r.action_key === 'pomodoro_cycle' && r.is_active)?.points ?? 2;

  const totalDurationSeconds = PHASE_DURATIONS[phase].minutes * 60;
  const progressPct = Math.min(
    100,
    Math.round(((totalDurationSeconds - secondsLeft) / Math.max(1, totalDurationSeconds)) * 100)
  );

  const formatMMSS = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handlePhaseSwitch = (nextPhase: PomodoroPhase) => {
    setIsRunning(false);
    setPhase(nextPhase);
    setSecondsLeft(PHASE_DURATIONS[nextPhase].minutes * 60);
    setCycleKey(`cycle-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  };

  const triggerCycleCompletion = () => {
    setIsRunning(false);
    if (phase === 'focus') {
      const res = uroRepository.completePomodoroCycle(
        user.id,
        selectedCategoryId || null,
        PHASE_DURATIONS.focus.minutes,
        cycleKey
      );
      setLastCompletedBanner({
        points: res.pointsAwarded,
        streakBonus: res.streakBonusAwarded,
        topic: res.sessionLog.topic_label,
      });
      refreshData();
      // Prepare next cycle key and switch automatically to short break
      setCycleKey(`cycle-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
      setPhase('short_break');
      setSecondsLeft(PHASE_DURATIONS.short_break.minutes * 60);
    } else {
      // Break finished -> switch back to 25-min focus
      setPhase('focus');
      setSecondsLeft(PHASE_DURATIONS.focus.minutes * 60);
      setCycleKey(`cycle-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setTimeout(() => triggerCycleCompletion(), 50);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, phase, selectedCategoryId, cycleKey]);

  const handleResetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(PHASE_DURATIONS[phase].minutes * 60);
    setCycleKey(`cycle-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  };

  const handleToggleReminders = async () => {
    const nextState = !user.reminders_enabled;
    updateCurrentUserProfile({ reminders_enabled: nextState });

    if (nextState && 'Notification' in window) {
      if (Notification.permission === 'default') {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          setBrowserPermissionMsg(
            'Permiso de notificaciones del navegador concedido mientras la aplicación esté abierta.'
          );
        } else {
          setBrowserPermissionMsg(
            'Usando recordatorios internos en la aplicación (permiso del navegador no concedido).'
          );
        }
      } else if (Notification.permission === 'granted') {
        setBrowserPermissionMsg('Notificaciones del navegador activas.');
      } else {
        setBrowserPermissionMsg(
          'Usando recordatorios dentro de la aplicación (notificaciones bloqueadas en el navegador).'
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#5149B8]">
            Método de Estudio & Hábitos
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202744]">
            Estudio Pomodoro y Recordatorios
          </h1>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white card-soft-shadow border border-white flex items-center gap-2 self-start sm:self-auto">
          <Coins className="w-4 h-4 text-[#5149B8]" />
          <span className="text-xs font-extrabold text-[#202744]">
            Recompensa: <strong className="text-[#5149B8]">+{pointsPerCycle} pts</strong> por ciclo
            Pomodoro completado
          </span>
        </div>
      </div>

      {/* Reward Banner on Completion */}
      {lastCompletedBanner && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-950 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold">
                ¡Ciclo Pomodoro completado con éxito! (+{lastCompletedBanner.points} puntos acreditados)
              </h3>
              <p className="text-xs text-emerald-800">
                Tema estudiado: <strong>{lastCompletedBanner.topic}</strong>. Se ha registrado el
                abono en tu libro mayor de puntos.
                {lastCompletedBanner.streakBonus > 0
                  ? ` ¡Además ganaste +${lastCompletedBanner.streakBonus} pts de bono de racha!`
                  : ''}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLastCompletedBanner(null)}
            className="px-3.5 py-1.5 rounded-xl bg-white text-emerald-800 text-xs font-bold self-end sm:self-center cursor-pointer"
          >
            Entendido
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Pomodoro Timer Card (7 cols) */}
        <div className="lg:col-span-7 card-hero-violet rounded-[36px] p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="w-48 h-48 rounded-full bg-white/10 absolute -right-14 -top-14 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Timer className="w-5 h-5 text-[#C3F574]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
                    Técnica de Estudio Clínico
                  </span>
                  <h2 className="text-lg font-extrabold">Temporizador Pomodoro</h2>
                </div>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-[#C3F574] text-[#202744] text-xs font-extrabold shadow-sm">
                +{pointsPerCycle} pts / ciclo de 25 min
              </span>
            </div>

            {/* Phase Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-black/15 p-1.5 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => handlePhaseSwitch('focus')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  phase === 'focus'
                    ? 'bg-white text-[#5149B8] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Pomodoro (25m)
              </button>
              <button
                type="button"
                onClick={() => handlePhaseSwitch('short_break')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  phase === 'short_break'
                    ? 'bg-white text-[#5149B8] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Pausa Corta (5m)
              </button>
              <button
                type="button"
                onClick={() => handlePhaseSwitch('long_break')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  phase === 'long_break'
                    ? 'bg-white text-[#5149B8] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Pausa Larga (15m)
              </button>
            </div>

            {/* Clock Display */}
            <div className="text-center my-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-xs font-bold text-white/90 mb-2">
                {phase === 'focus' ? (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-[#C3F574]" />
                    <span>Sesión de Estudio Activa</span>
                  </>
                ) : (
                  <>
                    <Coffee className="w-3.5 h-3.5 text-[#83D0E5]" />
                    <span>Tiempo de Recuperación</span>
                  </>
                )}
              </div>

              <div className="text-6xl sm:text-7xl font-black tracking-tight my-2 font-mono">
                {formatMMSS(secondsLeft)}
              </div>

              {/* Progress Bar */}
              <div className="max-w-xs mx-auto w-full h-2 bg-white/20 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-[#C3F574] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Study Category Selector */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/80 mb-1.5">
                Módulo urológico que estás estudiando en este ciclo:
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold text-white focus:outline-none"
              >
                <option value="" className="text-[#202744]">
                  Estudio Urológico General (Todas las áreas)
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="text-[#202744]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsRunning((r) => !r)}
                className="flex-1 py-3.5 px-6 rounded-full bg-white text-[#5149B8] hover:bg-slate-100 font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pausar Ciclo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Iniciar {phase === 'focus' ? 'Pomodoro' : 'Descanso'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetTimer}
                title="Reiniciar temporizador"
                className="py-3.5 px-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              {isDemoMode && phase === 'focus' && (
                <button
                  type="button"
                  onClick={triggerCycleCompletion}
                  title="Simular finalización inmediata del ciclo de 25 min para probar el otorgamiento de +2 puntos"
                  className="py-3.5 px-4 rounded-full bg-[#C3F574] hover:bg-[#b5eb60] text-[#202744] font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <FastForward className="w-4 h-4" />
                  <span>Completar ciclo ahora (+{pointsPerCycle} pts Demo)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Study Reminders Card (Matches uploaded image) + Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Exact Study Reminders Card from user's screenshot */}
          <div className="bg-white rounded-[32px] p-6 sm:p-7 card-soft-shadow border border-white">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <Bell className="w-5 h-5 text-[#5149B8]" />
                <h2 className="text-base sm:text-lg font-extrabold text-[#202744]">
                  Recordatorios de Estudio
                </h2>
              </div>
              <button
                type="button"
                onClick={handleToggleReminders}
                className={`px-3.5 py-1 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  user.reminders_enabled
                    ? 'bg-[#C3F574] text-[#202744]'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {user.reminders_enabled ? 'Activados' : 'Desactivados'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#858BA1] mb-5 leading-relaxed">
              Configura tu hora preferida de estudio. En la versión web sin servidor Push dedicado,
              los avisos operan dentro de la aplicación o mediante notificaciones del navegador con
              la sesión abierta.
            </p>

            <div className="flex items-center gap-3.5">
              <label className="text-xs sm:text-sm font-extrabold text-[#202744]">
                Hora preferida:
              </label>
              <input
                type="time"
                value={user.reminder_time || '09:00'}
                onChange={(e) =>
                  updateCurrentUserProfile({ reminder_time: e.target.value })
                }
                className="px-4 py-2 rounded-2xl bg-[#F5F7FC] border border-slate-200/80 text-xs sm:text-sm font-extrabold text-[#202744] focus:outline-none focus:border-[#5149B8]"
              />
            </div>

            {browserPermissionMsg && (
              <p className="mt-4 text-xs text-[#5149B8] bg-[#5149B8]/8 p-3 rounded-2xl font-semibold">
                {browserPermissionMsg}
              </p>
            )}
          </div>

          {/* Pomodoro Method Guide Card */}
          <div className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white space-y-3">
            <h3 className="text-sm font-extrabold text-[#202744] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5149B8]" />
              <span>¿Cómo funciona el método Pomodoro en UroChallenge?</span>
            </h3>
            <ul className="text-xs text-[#858BA1] space-y-2 leading-relaxed">
              <li>
                1. Selecciona el <strong>módulo de urología</strong> que vas a repasar y activa el
                temporizador de <strong>25 minutos</strong> de enfoque sin distracciones.
              </li>
              <li>
                2. Al finalizar cada ciclo de estudio, recibes automáticamente{' '}
                <strong className="text-[#5149B8]">+{pointsPerCycle} puntos</strong> auditables en
                tu cuenta y sumas actividad para tu racha diaria.
              </li>
              <li>
                3. Toma un descanso corto de <strong>5 minutos</strong> antes de comenzar el
                siguiente bloque, o un descanso largo de <strong>15 minutos</strong> cada 4 ciclos.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Completed Pomodoro Cycles History */}
      <section className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Historial de Ciclos Pomodoro Completados ({pomodoroHistory.length})
            </h2>
          </div>
          <span className="text-xs font-extrabold text-[#5149B8]">
            Total acumulado por estudio:{' '}
            {pomodoroHistory.reduce((acc, s) => acc + s.points_awarded, 0)} pts
          </span>
        </div>

        {pomodoroHistory.length === 0 ? (
          <p className="text-xs text-[#858BA1] py-4">
            Aún no has registrado ciclos Pomodoro. Inicia el temporizador arriba para acreditar tus
            primeros +{pointsPerCycle} puntos de estudio.
          </p>
        ) : (
          <div className="space-y-2.5">
            {pomodoroHistory.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-extrabold text-[#202744] truncate">
                      Ciclo Pomodoro ({item.duration_minutes} min) — {item.topic_label}
                    </p>
                    <p className="text-[11px] text-[#858BA1]">
                      Completado el{' '}
                      {format(new Date(item.completed_at), "d 'de' MMM yyyy, HH:mm", {
                        locale: es,
                      })}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black shrink-0">
                  +{item.points_awarded} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
