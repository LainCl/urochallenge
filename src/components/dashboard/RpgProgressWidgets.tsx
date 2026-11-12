import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Award, ShieldCheck } from 'lucide-react';
import { UserProgressionSummary } from '../../types/domain';
import { AchievementBadgeIcon } from '../rewards/AchievementBadgeIcon';
import { ConfettiBurst } from '../common/Motion';
import { uroRepository } from '../../services/uroRepository';

export const MyProgressRpgCard: React.FC<{
  progression: UserProgressionSummary;
}> = ({ progression }) => {
  const navigate = useNavigate();
  const {
    totalXp,
    currentLevel,
    nextLevel,
    xpRequiredForNextLevel,
    xpMissingForNextLevel,
    levelProgressPercentage,
  } = progression;

  return (
    <div className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white hover:border-[#5149B8]/30 transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <AchievementBadgeIcon
              shape={currentLevel.badge_shape}
              color={currentLevel.badge_color}
              unlocked={true}
              size="md"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-3 py-0.5 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-meta font-extrabold uppercase tracking-wider">
                Mi Progreso RPG
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#83D0E5]/30 text-[#202744] text-meta font-extrabold">
                {levelProgressPercentage}% de avance
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#202744] tracking-tight">
              NIVEL {currentLevel.roman_numeral} — {currentLevel.name.toUpperCase()}
            </h3>
            <p className="text-xs text-[#858BA1] mt-0.5">{currentLevel.description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/app/trajectory')}
          className="px-4 py-2.5 rounded-full bg-[#F5F7FC] hover:bg-[#5149B8] text-[#5149B8] hover:text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-center"
        >
          <span>Mi trayectoria</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* XP Bar & Details */}
      <div className="bg-[#F5F7FC] rounded-2xl p-4 border border-slate-100">
        <div className="flex items-center justify-between text-xs font-extrabold mb-2">
          <span className="text-[#202744] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#5149B8]" />
            <span>
              Experiencia: {totalXp.toLocaleString('es-CL')}
              {xpRequiredForNextLevel
                ? ` / ${xpRequiredForNextLevel.toLocaleString('es-CL')} XP`
                : ' XP (Nivel Máximo)'}
            </span>
          </span>
          <span className="text-[#5149B8]">{levelProgressPercentage}%</span>
        </div>

        <div className="w-full h-3 bg-white rounded-full overflow-hidden p-0.5 shadow-inner mb-2.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#5149B8] via-[#7778ED] to-[#83D0E5] transition-all duration-500"
            style={{ width: `${levelProgressPercentage}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          {nextLevel ? (
            <span className="font-bold text-[#202744]">
              Te faltan{' '}
              <strong className="text-[#5149B8]">
                {xpMissingForNextLevel.toLocaleString('es-CL')} XP
              </strong>{' '}
              para alcanzar{' '}
              <strong className="text-[#5149B8]">
                Nivel {nextLevel.roman_numeral} — {nextLevel.name}
              </strong>
              .
            </span>
          ) : (
            <span className="font-bold text-emerald-700">
              ¡Has alcanzado el nivel máximo de maestría en UroChallenge!
            </span>
          )}
          <span className="text-meta text-[#858BA1]">
            La XP es permanente y no disminuye al canjear premios
          </span>
        </div>
      </div>
    </div>
  );
};

export const LevelUpNotificationModal: React.FC<{
  progression: UserProgressionSummary | null;
  onAcknowledge: (historyIds: string[]) => void;
}> = ({ progression, onAcknowledge }) => {
  if (!progression || progression.unnotifiedLevelUps.length === 0) {
    return null;
  }

  const allLevels = uroRepository.getLevels(true);
  const reachedEntries = progression.unnotifiedLevelUps;
  const highestReached = reachedEntries[reachedEntries.length - 1];
  const levelDef =
    allLevels.find((l) => l.id === highestReached.level_id) || progression.currentLevel;

  return (
    <div className="fixed inset-0 z-50 bg-[#202744]/70 backdrop-blur-md flex items-center justify-center p-4">
      <ConfettiBurst active={true} pieces={110} />
      <div className="bg-white rounded-[36px] max-w-md w-full p-7 sm:p-8 card-soft-shadow border border-white text-center relative animate-in fade-in zoom-in-95 duration-200">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C3F574] text-[#202744] text-xs font-extrabold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4 text-[#5149B8]" />
          <span>¡Felicitaciones!</span>
        </div>

        <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#5149B8] mb-2">
          HAS ALCANZADO UN NUEVO NIVEL
        </h2>

        <div className="flex justify-center my-4">
          <AchievementBadgeIcon
            shape={levelDef.badge_shape}
            color={levelDef.badge_color}
            unlocked={true}
            size="lg"
          />
        </div>

        <h3 className="text-2xl font-black text-[#202744] mb-2">
          NIVEL {highestReached.roman_numeral} — {highestReached.level_name.toUpperCase()}
        </h3>

        <p className="text-xs sm:text-sm text-[#858BA1] leading-relaxed mb-4">
          Has acumulado suficiente experiencia ({progression.totalXp} XP) para avanzar en
          UroChallenge. Tu insignia de nivel ya se encuentra desbloqueada.
        </p>

        {reachedEntries.length > 1 && (
          <div className="bg-[#F5F7FC] rounded-2xl p-3 mb-4 text-left border border-slate-200/70">
            <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block mb-1.5">
              Niveles desbloqueados en esta actividad ({reachedEntries.length}):
            </span>
            <div className="space-y-1">
              {reachedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="text-xs font-bold text-[#202744] flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    Nivel {entry.roman_numeral} — {entry.level_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {levelDef.benefits && levelDef.benefits.length > 0 && (
          <div className="bg-[#5149B8]/6 rounded-2xl p-3.5 mb-6 text-left border border-[#5149B8]/15">
            <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block mb-1">
              Distinciones del nivel:
            </span>
            <ul className="text-xs text-[#202744] space-y-1 font-medium">
              {levelDef.benefits.map((b, idx) => (
                <li key={idx}>• {b}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={() => onAcknowledge(reachedEntries.map((r) => r.id))}
          className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/30 transition cursor-pointer"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
