import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Stethoscope,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  ClipboardList,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { CLINICAL_CASES, ClinicalCase } from '../../data/clinicalCasesData';
import { uroRepository } from '../../services/uroRepository';
import {
  QuestionClinicalImage,
  QuestionResult,
} from '../../components/questions/QuestionComponents';
import { ConfettiBurst } from '../../components/common/Motion';

interface CompletedCaseRecord {
  caseId: string;
  correctCount: number;
  totalSteps: number;
  completedAt: string;
}

const getCompletedCasesKey = (userId: string) => `urochallenge_completed_cases_${userId}`;

const loadCompletedCases = (userId: string): Record<string, CompletedCaseRecord> => {
  try {
    const raw = localStorage.getItem(getCompletedCasesKey(userId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const ClinicalCasesPage: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const [activeCase, setActiveCase] = useState<ClinicalCase | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [stepResults, setStepResults] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [completedMap, setCompletedMap] = useState<Record<string, CompletedCaseRecord>>(() =>
    user ? loadCompletedCases(user.id) : {}
  );

  if (!user) return null;

  const handleStartCase = (c: ClinicalCase) => {
    setActiveCase(c);
    setStepIndex(0);
    setSelectedOptionIdx(null);
    setStepResults({});
    setIsFinished(false);
  };

  const currentStep = activeCase ? activeCase.steps[stepIndex] : null;
  const currentStepResult = currentStep ? stepResults[currentStep.step_number] : undefined;
  const isStepLocked = Boolean(currentStepResult);

  const relatedTerms = useMemo(() => {
    if (!currentStep || !activeCase) return [];
    return uroRepository.findRelatedDictionaryTermsForQuestion(
      {
        question_text: `${activeCase.vignette} ${currentStep.question_text}`,
        explanation: currentStep.explanation,
        tags: [activeCase.category_name],
      },
      3
    );
  }, [activeCase, currentStep]);

  const handleConfirmStep = () => {
    if (!activeCase || !currentStep || selectedOptionIdx === null || isStepLocked) return;
    const isCorrect = selectedOptionIdx === currentStep.correct_index;
    setStepResults((prev) => ({
      ...prev,
      [currentStep.step_number]: { selected: selectedOptionIdx, correct: isCorrect },
    }));
  };

  const handleNextStep = () => {
    if (!activeCase) return;
    if (stepIndex + 1 < activeCase.steps.length) {
      setStepIndex((i) => i + 1);
      setSelectedOptionIdx(null);
    } else {
      const correctCount = Object.values(stepResults).filter((r) => r.correct).length;
      const record: CompletedCaseRecord = {
        caseId: activeCase.id,
        correctCount,
        totalSteps: activeCase.steps.length,
        completedAt: new Date().toISOString(),
      };
      const updated = { ...completedMap, [activeCase.id]: record };
      setCompletedMap(updated);
      try {
        localStorage.setItem(getCompletedCasesKey(user.id), JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      setIsFinished(true);
    }
  };

  // ==================== CASE PLAYER VIEW ====================
  if (activeCase && currentStep) {
    const totalCorrect = Object.values(stepResults).filter((r) => r.correct).length;
    const letters = ['A', 'B', 'C', 'D'];

    return (
      <div className="max-w-3xl mx-auto space-y-5">
        <ConfettiBurst active={isFinished && totalCorrect >= 2} />

        {/* Top Bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveCase(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white card-soft-shadow text-xs font-extrabold text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Todos los casos</span>
          </button>

          <span className="px-3.5 py-1.5 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-xs font-extrabold">
            {activeCase.category_name}
          </span>
        </div>

        {/* Patient Vignette Card */}
        <section className="card-hero-violet rounded-[32px] p-6 sm:p-7 text-white relative overflow-hidden">
          <div className="w-32 h-32 rounded-full bg-white/10 absolute -right-8 -top-8 pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3F574] text-[#202744] text-meta font-black uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5" />
                Caso Clínico Encadenado
              </span>
              <span className="text-xs font-bold text-white/85">{activeCase.patient_summary}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {activeCase.title}
            </h1>

            <p className="text-xs sm:text-sm text-white/95 leading-relaxed bg-black/15 rounded-2xl p-4 border border-white/10">
              {activeCase.vignette}
            </p>
          </div>
        </section>

        {activeCase.image_url && (
          <QuestionClinicalImage
            imageUrl={activeCase.image_url}
            caption={activeCase.image_caption}
          />
        )}

        {/* Stepper Progress */}
        <div className="grid grid-cols-3 gap-2">
          {activeCase.steps.map((s, idx) => {
            const done = stepResults[s.step_number];
            const isCurrent = !isFinished && idx === stepIndex;
            return (
              <div
                key={s.step_number}
                className={`p-3 rounded-2xl border text-xs font-extrabold flex items-center gap-2 transition ${
                  isCurrent
                    ? 'bg-[#5149B8] text-white border-[#5149B8] shadow-sm'
                    : done
                      ? done.correct
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-white border-slate-200/80 text-[#858BA1]'
                }`}
              >
                {done ? (
                  done.correct ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  )
                ) : (
                  <span className="w-5 h-5 rounded-full bg-current/15 flex items-center justify-center text-meta shrink-0">
                    {s.step_number}
                  </span>
                )}
                <span className="truncate">Paso {s.step_number}</span>
              </div>
            );
          })}
        </div>

        {/* Finished View or Active Step */}
        {isFinished ? (
          <section className="bg-white rounded-[32px] p-7 sm:p-8 card-soft-shadow border border-white text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-[#C3F574] text-[#202744] flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#202744]">
              Caso Clínico Completado: {totalCorrect} / {activeCase.steps.length} decisiones correctas
            </h2>
            <p className="text-sm text-[#858BA1] max-w-md mx-auto">
              Has recorrido todas las etapas clínicas desde la evaluación inicial hasta la conducta
              definitiva.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleStartCase(activeCase)}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#F5F7FC] hover:bg-slate-200 text-[#202744] text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir caso</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCase(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Explorar más casos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white space-y-5">
            <div className="p-4 rounded-2xl bg-[#83D0E5]/20 border border-[#83D0E5]/50 text-xs text-[#202744]">
              <span className="font-extrabold uppercase tracking-wider text-[#5149B8] block mb-1">
                {currentStep.stage_title}
              </span>
              <p className="leading-relaxed font-medium">{currentStep.clinical_update}</p>
            </div>

            <h2 className="text-lg font-extrabold text-[#202744] leading-snug">
              {currentStep.question_text}
            </h2>

            <div className="space-y-3">
              {currentStep.options.map((optText, idx) => {
                const isSelected = isStepLocked
                  ? currentStepResult?.selected === idx
                  : selectedOptionIdx === idx;
                const isCorrectOpt = idx === currentStep.correct_index;

                let cls =
                  'bg-white border-slate-200/80 text-[#202744] hover:border-[#5149B8]/50 hover:bg-[#F5F7FC]';
                let badgeCls = 'bg-[#F5F7FC] text-[#5149B8]';

                if (isSelected && !isStepLocked) {
                  cls = 'bg-[#5149B8]/8 border-[#5149B8] ring-2 ring-[#5149B8]/20';
                  badgeCls = 'bg-[#5149B8] text-white';
                } else if (isStepLocked && isCorrectOpt) {
                  cls = 'bg-emerald-50 border-emerald-500 text-emerald-950 uc-pop';
                  badgeCls = 'bg-emerald-600 text-white';
                } else if (isStepLocked && isSelected && !isCorrectOpt) {
                  cls = 'bg-rose-50 border-rose-400 text-rose-950 uc-shake';
                  badgeCls = 'bg-rose-600 text-white';
                } else if (isStepLocked) {
                  cls = 'bg-white/60 border-slate-200/60 text-[#858BA1] opacity-75';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isStepLocked}
                    onClick={() => setSelectedOptionIdx(idx)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${cls} ${
                      isStepLocked ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 ${badgeCls}`}
                    >
                      {letters[idx]}
                    </span>
                    <span className="flex-1 text-sm font-semibold leading-relaxed">{optText}</span>
                  </button>
                );
              })}
            </div>

            {!isStepLocked ? (
              <div className="pt-2">
                <button
                  type="button"
                  disabled={selectedOptionIdx === null}
                  onClick={handleConfirmStep}
                  className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] disabled:opacity-40 text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition cursor-pointer"
                >
                  Confirmar conducta clínica
                </button>
              </div>
            ) : (
              <>
                <QuestionResult
                  isCorrect={Boolean(currentStepResult?.correct)}
                  explanation={currentStep.explanation}
                  referenceText={activeCase.reference_text}
                  relatedTerms={relatedTerms}
                />
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {stepIndex + 1 < activeCase.steps.length
                      ? `Avanzar al Paso ${stepIndex + 2} de ${activeCase.steps.length}`
                      : 'Finalizar Caso Clínico'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </section>
        )}
      </div>
    );
  }

  // ==================== CASES CATALOG VIEW ====================
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/app')}
          className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block">
            Simulación Secuencial
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#202744]">
            Casos Clínicos Encadenados
          </h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="card-hero-violet rounded-[32px] p-6 sm:p-7 text-white relative overflow-hidden">
        <div className="w-36 h-36 rounded-full bg-white/10 absolute -right-10 -bottom-10 pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3F574] text-[#202744] text-meta font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Razonamiento Paso a Paso
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold">
            Toma decisiones clínicas desde el ingreso hasta el manejo definitivo
          </h2>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
            Cada caso clínico se divide en 3 etapas encadenadas: estudio inicial, interpretación de
            hallazgos y conducta terapéutica.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 uc-stagger">
        {CLINICAL_CASES.map((c) => {
          const completed = completedMap[c.id];
          return (
            <div
              key={c.id}
              onClick={() => handleStartCase(c)}
              className="bg-white rounded-[28px] p-5 sm:p-6 card-soft-shadow border border-white hover:border-[#5149B8]/35 transition flex flex-col justify-between gap-4 cursor-pointer group"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-meta font-extrabold">
                    {c.category_name}
                  </span>
                  {completed ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-meta font-extrabold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completado ({completed.correctCount}/{completed.totalSteps})
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-[#C3F574]/80 text-[#202744] text-meta font-extrabold">
                      {c.steps.length} etapas
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-[#202744] group-hover:text-[#5149B8] transition">
                  {c.title}
                </h3>
                <p className="text-meta font-bold text-[#858BA1]">{c.patient_summary}</p>
                <p className="text-xs text-[#858BA1] line-clamp-3 leading-relaxed">{c.vignette}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#202744]">
                  <ClipboardList className="w-4 h-4 text-[#5149B8]" />
                  Nivel{' '}
                  {c.difficulty === 'basic'
                    ? 'Básico'
                    : c.difficulty === 'intermediate'
                      ? 'Intermedio'
                      : 'Avanzado'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#5149B8] group-hover:translate-x-0.5 transition">
                  <span>{completed ? 'Repasar caso' : 'Iniciar caso'}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
