import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, BookOpen, Info, Sparkles, ZoomIn, X, ImageIcon, ArrowUpRight } from 'lucide-react';
import { QuestionOption } from '../../types/domain';

export const QuestionClinicalImage: React.FC<{
  imageUrl?: string | null;
  caption?: string | null;
  compact?: boolean;
}> = ({ imageUrl, caption, compact = false }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isLightboxOpen]);

  if (!imageUrl) return null;

  return (
    <>
      <div className="mb-5 rounded-2xl overflow-hidden border border-slate-200/80 bg-[#13182B] relative group">
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#13182B] text-white/90 border-b border-white/10">
          <span className="inline-flex items-center gap-1.5 text-meta font-extrabold uppercase tracking-wider text-[#C3F574]">
            <ImageIcon className="w-3.5 h-3.5" />
            Imagen / Esquema Clínico
          </span>
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/12 hover:bg-white/25 text-white text-meta font-bold transition cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#83D0E5]" />
            <span>Ampliar imagen</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="w-full flex items-center justify-center bg-slate-950/60 p-3 cursor-zoom-in"
          title="Haz clic para ampliar la imagen clínica"
        >
          <img
            src={imageUrl}
            alt={caption || 'Imagen clínica de la pregunta'}
            loading="lazy"
            className={`w-auto object-contain rounded-xl transition-transform duration-200 group-hover:scale-[1.01] ${
              compact ? 'max-h-48' : 'max-h-72 sm:max-h-80'
            }`}
          />
        </button>

        {caption && (
          <div className="px-4 py-2.5 bg-[#1B223B] text-white/85 text-meta leading-relaxed border-t border-white/10">
            {caption}
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imagen clínica"
        >
          <div
            className="max-w-4xl w-full bg-[#13182B] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 text-white">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C3F574] flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Visor Clínico de Alta Resolución
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Cerrar visor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 sm:p-6 flex items-center justify-center bg-black/60 max-h-[75vh] overflow-auto">
              <img
                src={imageUrl}
                alt={caption || 'Imagen clínica ampliada'}
                className="max-w-full max-h-[68vh] object-contain rounded-xl"
              />
            </div>
            {caption && (
              <div className="px-5 py-3.5 bg-[#1B223B] text-white/90 text-xs leading-relaxed border-t border-white/10">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

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
    containerClass =
      'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 uc-pop';
    badgeClass = 'bg-emerald-600 text-white';
  } else if (isThisWrongSelected) {
    containerClass =
      'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/20 uc-shake';
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
  relatedTerms?: Array<{ id: string; slug: string; term: string }>;
}> = ({
  isCorrect,
  pointsAwarded,
  streakBonusAwarded = 0,
  explanation,
  referenceText,
  relatedTerms = [],
}) => (
  <div
    className={`rounded-3xl p-5 sm:p-6 border-2 mt-6 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${
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
      {relatedTerms.length > 0 && (
        <div className="pt-2.5 border-t border-slate-100">
          <span className="block text-meta font-extrabold uppercase tracking-wider text-[#5149B8] mb-1.5">
            Fichas del Diccionario Urológico relacionadas:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {relatedTerms.map((rt) => (
              <Link
                key={rt.id}
                to={`/app/dictionary/${rt.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5149B8]/10 hover:bg-[#5149B8] text-[#5149B8] hover:text-white text-meta font-extrabold transition"
              >
                <BookOpen className="w-3 h-3" />
                <span>{rt.term}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      )}
      {referenceText && (
        <p className="text-meta text-[#858BA1] pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#5149B8] shrink-0" />
          <span>{referenceText}</span>
        </p>
      )}
    </div>
  </div>
);
