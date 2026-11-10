import React from 'react';
import { CheckCircle2, XCircle, BookOpen, Info, Sparkles } from 'lucide-react';
import { QuestionOption } from '../../types/domain';

export const QuizProgress: React.FC<{
  current: number;
  total: number;
  label?: string;
}> = ({ current, total, label }) => {
  const pct = Math.min(100, Math.round((current / Math.max(1, total)) * 100));
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-bold mb-2">
        <span className="text-[#5149B8] uppercase tracking-wider">
          {label || `Pregunta ${current} de ${total}`}
        </span>
        <span className="text-[#858BA1]">{pct}% completado</span>
      </div>
      <div className="w-full h-2.5 bg-white rounded-full overflow-hidden p-0.5 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#5149B8] to-[#83D0E5] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export const AnswerOption: React.FC<{
  option: QuestionOption;
  index: number;
  selected: boolean;
  locked: boolean;
  correctOptionId?: string | null;
  onSelect: (optionId: string) => void;
}> = ({ option, index, selected, locked, correctOptionId, onSelect }) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const letter = letters[index] || String(index + 1);

  const isRevealed = Boolean(locked && correctOptionId);
  const isThisCorrect = isRevealed && option.id === correctOptionId;
  const isThisWrongSelected = isRevealed && selected && option.id !== correctOptionId;

  let containerClass =
    'bg-white border-slate-200/80 text-[#202744] hover:border-[#5149B8]/50 hover:bg-[#F5F7FC]';
  let badgeClass = 'bg-[#F5F7FC] text-[#5149B8] border border-[#5149B8]/15';

  if (selected && !isRevealed) {
    containerClass =
      'bg-[#5149B8]/8 border-[#5149B8] text-[#202744] ring-2 ring-[#5149B8]/20';
    badgeClass = 'bg-[#5149B8] text-white';
  } else if (isThisCorrect) {
    containerClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
    badgeClass = 'bg-emerald-600 text-white';
  } else if (isThisWrongSelected) {
    containerClass = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/20';
    badgeClass = 'bg-rose-600 text-white';
  } else if (isRevealed) {
    containerClass = 'bg-white/60 border-slate-200/60 text-[#858BA1] opacity-75';
  }

  return (
    <button
      type="button"
      disabled={locked}
      onClick={() => onSelect(option.id)}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 flex items-start gap-3.5 ${containerClass} ${
        locked ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <span
        className={`w-8 h-8 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 transition ${badgeClass}`}
      >
        {letter}
      </span>
      <span className="flex-1 text-sm font-semibold leading-relaxed">{option.option_text}</span>
      {isThisCorrect && (
        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          Correcta
        </span>
      )}
      {isThisWrongSelected && (
        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full shrink-0">
          <XCircle className="w-4 h-4" />
          Tu elección
        </span>
      )}
    </button>
  );
};

export const QuestionResult: React.FC<{
  isCorrect: boolean;
  pointsAwarded?: number;
  streakBonusAwarded?: number;
  explanation: string;
  referenceText?: string | null;
}> = ({ isCorrect, pointsAwarded, streakBonusAwarded = 0, explanation, referenceText }) => (
  <div
    className={`rounded-3xl p-5 sm:p-6 border-2 mt-6 transition-all ${
      isCorrect
        ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
        : 'bg-amber-50/90 border-amber-300 text-amber-950'
    }`}
  >
    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
      <div className="flex items-center gap-2.5">
        {isCorrect ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
        ) : (
          <XCircle className="w-6 h-6 text-amber-600 shrink-0" />
        )}
        <h4 className="text-base font-extrabold">
          {isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta — Revisemos el concepto'}
        </h4>
      </div>

      {typeof pointsAwarded === 'number' && pointsAwarded > 0 && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5149B8] text-white text-xs font-extrabold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C3F574]" />+{pointsAwarded} pts acreditados
        </span>
      )}
    </div>

    {streakBonusAwarded > 0 && (
      <div className="mb-3 px-3.5 py-2 rounded-2xl bg-[#C3F574]/60 text-[#202744] text-xs font-bold flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#5149B8]" />
        ¡Bonificación adicional de +{streakBonusAwarded} pts por tu racha de días consecutivos!
      </div>
    )}

    <div className="bg-white/90 rounded-2xl p-4 border border-black/5 space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#5149B8]">
        <BookOpen className="w-4 h-4" />
        <span>Explicación Académica</span>
      </div>
      <p className="text-sm text-[#202744] leading-relaxed">{explanation}</p>
      {referenceText && (
        <p className="text-[11px] text-[#858BA1] pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#5149B8] shrink-0" />
          <span>{referenceText}</span>
        </p>
      )}
    </div>
  </div>
);
