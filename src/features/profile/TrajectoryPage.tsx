import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Lock,
  Clock,
  Award,
  Coins,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import { AchievementBadgeIcon } from '../../components/rewards/AchievementBadgeIcon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const TrajectoryPage: React.FC = () => {
  const { user, stats, progression } = useApp();
  const navigate = useNavigate();

  if (!user || !stats || !progression) return null;

  const levels = uroRepository.getLevels(false);
  const xpLedger = uroRepository.getUserExperienceLedger(user.id);
  const autoAchievements = uroRepository.getUserAutoAchievements(user.id);
  const xpRules = uroRepository.getExperienceRules().filter((r) => r.is_active);

  const historyByLevelId = new Map(
    progression.levelHistory.map((h) => [h.level_id, h])
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/app/profile')}
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#5149B8] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Mi Perfil</span>
        </button>
        <span className="px-3.5 py-1 rounded-full bg-white card-soft-shadow text-xs font-extrabold text-[#5149B8]">
          Total acumulado: {progression.totalXp.toLocaleString('es-CL')} XP
        </span>
      </div>

      {/* Hero Summary Card */}
      <div className="card-hero-violet rounded-[36px] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="w-44 h-44 rounded-full bg-white/10 absolute -right-12 -top-12 pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <AchievementBadgeIcon
                shape={progression.currentLevel.badge_shape}
                color={progression.currentLevel.badge_color}
                unlocked={true}
                size="lg"
              />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full bg-[#C3F574] text-[#202744] text-xs font-extrabold uppercase tracking-wider">
                Mi Trayectoria Académica RPG
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-2 mb-1">
                NIVEL {progression.currentLevel.roman_numeral} —{' '}
                {progression.currentLevel.name.toUpperCase()}
              </h1>
              <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
                {progression.currentLevel.description}
              </p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-4 sm:px-6 text-left sm:text-right shrink-0 border border-white/15">
            <span className="text-xs text-white/80 block">Experiencia Permanente</span>
            <span className="text-3xl font-black text-[#C3F574] block">
              {progression.totalXp.toLocaleString('es-CL')} XP
            </span>
            <span className="text-meta text-white/75 flex items-center sm:justify-end gap-1 mt-1">
              <Coins className="w-3.5 h-3.5 text-[#83D0E5]" /> Saldo canjeable independiente:{' '}
              {stats.currentBalance} pts
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-black/15 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span>
              Experiencia: {progression.totalXp.toLocaleString('es-CL')}
              {progression.xpRequiredForNextLevel
                ? ` / ${progression.xpRequiredForNextLevel.toLocaleString('es-CL')} XP`
                : ' XP (Nivel Máximo)'}
            </span>
            <span className="text-[#C3F574]">{progression.levelProgressPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C3F574] to-[#83D0E5] transition-all duration-500"
              style={{ width: `${progression.levelProgressPercentage}%` }}
            />
          </div>
          {progression.nextLevel && (
            <p className="text-xs text-white/90 mt-2 font-semibold">
              Te faltan <strong>{progression.xpMissingForNextLevel} XP</strong> para alcanzar{' '}
              <strong>
                Nivel {progression.nextLevel.roman_numeral} — {progression.nextLevel.name}
              </strong>
              .
            </p>
          )}
        </div>
      </div>

      {/* Levels Timeline Section */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#5149B8]">
            Escalafón Urológico
          </span>
          <h2 className="text-xl font-extrabold text-[#202744]">
            Niveles de Progresión ({levels.length})
          </h2>
        </div>

        <div className="space-y-4">
          {levels.map((lvl) => {
            const isCurrent = lvl.id === progression.currentLevel.id;
            const isCompleted =
              progression.totalXp >= lvl.min_xp &&
              lvl.level_number < progression.currentLevel.level_number;
            const isUnlocked = isCurrent || isCompleted;
            const histEntry = historyByLevelId.get(lvl.id);
            const missingXp = Math.max(0, lvl.min_xp - progression.totalXp);

            return (
              <div
                key={lvl.id}
                className={`rounded-[32px] p-5 sm:p-6 transition-all border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                  isCurrent
                    ? 'bg-white border-[#5149B8] shadow-xl shadow-[#5149B8]/10 scale-[1.01]'
                    : isCompleted
                    ? 'bg-white/90 border-emerald-200 card-soft-shadow'
                    : 'bg-[#F5F7FC] border-slate-200/80 opacity-85'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="shrink-0">
                    <AchievementBadgeIcon
                      shape={lvl.badge_shape}
                      color={lvl.badge_color}
                      unlocked={isUnlocked}
                      size="md"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                          isCurrent
                            ? 'bg-[#5149B8] text-white'
                            : isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isCurrent
                          ? 'Nivel Actual'
                          : isCompleted
                          ? 'Completado'
                          : 'Bloqueado'}
                      </span>
                      <span className="text-xs font-extrabold text-[#5149B8]">
                        Rango: {lvl.min_xp.toLocaleString('es-CL')}
                        {lvl.max_xp !== null
                          ? `–${lvl.max_xp.toLocaleString('es-CL')} XP`
                          : '+ XP'}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#202744]">
                      Nivel {lvl.roman_numeral} — {lvl.name}
                    </h3>
                    <p className="text-xs text-[#858BA1] mt-0.5 leading-relaxed max-w-xl">
                      {lvl.description}
                    </p>

                    {lvl.benefits && lvl.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {lvl.benefits.map((b, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-lg bg-[#F5F7FC] border border-slate-200/80 text-meta font-semibold text-[#202744]"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60">
                  {isUnlocked ? (
                    <div className="inline-flex sm:flex flex-col sm:items-end">
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" /> Desbloqueado
                      </span>
                      {histEntry && (
                        <span className="text-meta text-[#858BA1] mt-0.5">
                          Alcanzado el{' '}
                          {format(new Date(histEntry.reached_at), "d 'de' MMM yyyy", {
                            locale: es,
                          })}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="inline-flex sm:flex flex-col sm:items-end">
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#858BA1]">
                        <Lock className="w-3.5 h-3.5" /> Faltan {missingXp.toLocaleString('es-CL')} XP
                      </span>
                      <span className="text-meta text-[#858BA1] mt-0.5">
                        Requisito: {lvl.min_xp.toLocaleString('es-CL')} XP
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Automatic Achievements & Distinctions Grid */}
      <section className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Logros y Distinciones Desbloqueables (
              {autoAchievements.filter((a) => a.unlocked).length}/{autoAchievements.length})
            </h2>
          </div>
          <span className="text-xs text-[#858BA1]">
            Independientes del nivel • Se desbloquean automáticamente al cumplir su condición
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {autoAchievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                ach.unlocked
                  ? 'bg-[#202744] text-white border-[#5149B8]/40'
                  : 'bg-[#F5F7FC] text-[#202744] border-slate-200/70'
              }`}
            >
              <div className="shrink-0">
                <AchievementBadgeIcon
                  shape={ach.badge_shape}
                  color={ach.badge_color}
                  unlocked={ach.unlocked}
                  size="sm"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span
                    className={`text-meta font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      ach.unlocked
                        ? 'bg-[#C3F574] text-[#202744]'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {ach.unlocked ? 'Desbloqueado' : `${ach.progress} / ${ach.target}`}
                  </span>
                  {ach.unlocked_at && (
                    <span className="text-meta text-white/60">
                      {format(new Date(ach.unlocked_at), 'dd/MM/yyyy')}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold leading-snug">{ach.name}</h4>
                <p
                  className={`text-meta mt-0.5 leading-relaxed ${
                    ach.unlocked ? 'text-white/75' : 'text-[#858BA1]'
                  }`}
                >
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Columns: Level-Up History & How to Earn XP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Historial de Subidas de Nivel
            </h2>
          </div>

          <div className="space-y-2.5">
            {progression.levelHistory.map((h) => (
              <div
                key={h.id}
                className="p-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-extrabold text-[#5149B8] block">
                    Nivel {h.roman_numeral} — {h.level_name}
                  </span>
                  <span className="text-meta text-[#858BA1]">Hito de trayectoria</span>
                </div>
                <span className="font-bold text-[#202744]">
                  {format(new Date(h.reached_at), "d 'de' MMM yyyy, HH:mm", { locale: es })}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
               Tabla de Obtención de Experiencia (XP)
            </h2>
          </div>

          <div className="space-y-2">
            {xpRules.map((rule) => (
              <div
                key={rule.id}
                className="p-3 rounded-2xl bg-[#F5F7FC] flex items-center justify-between text-xs"
              >
                <span className="font-bold text-[#202744]">{rule.description}</span>
                <span className="px-2.5 py-1 rounded-full bg-[#5149B8]/10 text-[#5149B8] font-extrabold shrink-0">
                  +{rule.xp_amount} XP
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* XP Ledger History */}
      <section className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Libro de Movimientos de Experiencia ({xpLedger.length})
            </h2>
          </div>
          <span className="text-xs font-extrabold text-[#5149B8]">
            Acumulado: {progression.totalXp.toLocaleString('es-CL')} XP
          </span>
        </div>

        <div className="space-y-2.5">
          {xpLedger.map((entry) => (
            <div
              key={entry.id}
              className="p-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <p className="font-bold text-[#202744]">{entry.description}</p>
                <p className="text-meta text-[#858BA1]">
                  {format(new Date(entry.created_at), "d 'de' MMM yyyy, HH:mm", { locale: es })}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#5149B8] text-white font-black shrink-0">
                +{entry.amount} XP
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
