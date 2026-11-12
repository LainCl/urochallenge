import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Clock,
  RefreshCw,
  BookOpenCheck,
  Coins,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import {
  AnswerOption,
  QuestionResult,
  QuestionClinicalImage,
} from '../../components/questions/QuestionComponents';
import { EmptyState } from '../../components/common/FeedbackStates';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const DailyQuestionPage: React.FC = () => {
  const { user, isDemoMode, refreshData } = useApp();
  const navigate = useNavigate();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    isCorrect: boolean;
    pointsAwarded: number;
    streakBonusAwarded: number;
    correctOptionId: string;
    explanation: string;
    referenceText: string | null;
  } | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  if (!user) return null;

  const dailyState = uroRepository.getDailyQuestionState(user.id);
  const { assignment, question, category, schedule, nextAvailableAt, potentialPoints } = dailyState;

  useEffect(() => {
    if (assignment?.status === 'answered' && question) {
      const correctOpt = question.options.find((o) => o.is_correct) || question.options[0];
      setSelectedOptionId(assignment.selected_option_id || null);
      setSubmissionResult({
        isCorrect: Boolean(assignment.is_correct),
        pointsAwarded: assignment.points_awarded ?? 0,
        streakBonusAwarded: 0,
        correctOptionId: correctOpt.id,
        explanation: question.explanation,
        referenceText: question.reference_text,
      });
    } else {
      setSelectedOptionId(null);
      setSubmissionResult(null);
    }
  }, [assignment?.id, assignment?.status, question?.id, reloadTick]);

  const handleConfirmAnswer = () => {
    if (!assignment || !selectedOptionId) return;
    const res = uroRepository.submitDailyQuestionAnswer(
      user.id,
      assignment.id,
      selectedOptionId
    );
    setSubmissionResult({
      isCorrect: res.isCorrect,
      pointsAwarded: res.pointsAwarded,
      streakBonusAwarded: res.streakBonusAwarded,
      correctOptionId: res.correctOptionId,
      explanation: res.explanation,
      referenceText: res.referenceText,
    });
    refreshData();
  };

  const handleSimulateNextPeriod = () => {
    uroRepository.unlockNextDailyQuestionForDemo(user.id);
    setReloadTick((t) => t + 1);
    refreshData();
  };

  if (!question || !assignment) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate('/app')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5149B8] mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </button>
        <EmptyState
          title="No hay desafíos disponibles en este momento"
          description={`El próximo desafío estará disponible según la programación (${format(
            new Date(nextAvailableAt),
            "d 'de' MMMM, HH:mm",
            { locale: es }
          )}).`}
          actionLabel="Ir al Test de 10 preguntas"
          onAction={() => navigate('/app/quiz')}
        />
      </div>
    );
  }

  const isLocked = Boolean(submissionResult) && !schedule.allow_retries;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/app')}
          className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block">
            {schedule.name}
          </span>
          <h1 className="text-base font-extrabold text-[#202744]">Pregunta Periódica</h1>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-white card-soft-shadow text-xs font-extrabold text-[#5149B8] flex items-center gap-1">
          <Coins className="w-3.5 h-3.5" />
          <span>+{potentialPoints.participation + potentialPoints.correctBonus} pts máx.</span>
        </div>
      </div>

      {/* Points rule transparent banner */}
      <div className="bg-[#83D0E5]/25 border border-[#83D0E5] rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#202744]">
        <div className="flex items-center gap-2 font-semibold">
          <Sparkles className="w-4 h-4 text-[#5149B8] shrink-0" />
          <span>
            Ganarás <strong>+{potentialPoints.participation} pts</strong> por participar y{' '}
            <strong>+{potentialPoints.correctBonus} pts adicionales</strong> si respondes correctamente.
          </span>
        </div>
        <span className="text-meta font-bold text-[#5149B8] bg-white px-2.5 py-0.5 rounded-full">
          Frecuencia: cada {schedule.interval_value}{' '}
          {schedule.interval_unit === 'days' ? 'día(s)' : 'hora(s)'}
        </span>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-xs font-extrabold">
            {category?.name || 'Urología'}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[#858BA1] text-meta font-bold uppercase">
            Nivel {question.difficulty === 'basic' ? 'Básico' : question.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-extrabold text-[#202744] leading-snug mb-5">
          {question.question_text}
        </h2>

        <QuestionClinicalImage
          imageUrl={question.image_url}
          caption={question.image_caption}
        />

        <div className="space-y-3">
          {question.options
            .slice()
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((opt, idx) => (
              <AnswerOption
                key={opt.id}
                option={opt}
                index={idx}
                selected={selectedOptionId === opt.id}
                locked={isLocked}
                correctOptionId={submissionResult?.correctOptionId}
                onSelect={(id) => setSelectedOptionId(id)}
              />
            ))}
        </div>

        {!submissionResult && (
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={!selectedOptionId}
              onClick={handleConfirmAnswer}
              className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] disabled:opacity-40 text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition cursor-pointer"
            >
              Confirmar respuesta
            </button>
          </div>
        )}

        {submissionResult && (
          <>
            <QuestionResult
              isCorrect={submissionResult.isCorrect}
              pointsAwarded={submissionResult.pointsAwarded}
              streakBonusAwarded={submissionResult.streakBonusAwarded}
              explanation={submissionResult.explanation}
              referenceText={submissionResult.referenceText}
              relatedTerms={uroRepository.findRelatedDictionaryTermsForQuestion(question)}
            />

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#858BA1]">
                <Clock className="w-4 h-4 text-[#5149B8]" />
                <span>
                  Próxima pregunta programada:{' '}
                  <strong className="text-[#202744]">
                    {format(new Date(nextAvailableAt), "d 'de' MMM, HH:mm", { locale: es })}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {isDemoMode && (
                  <button
                    type="button"
                    onClick={handleSimulateNextPeriod}
                    title="Opción exclusiva de Modo Demo para cargar otra pregunta periódica inmediatamente"
                    className="flex-1 sm:flex-initial py-2.5 px-4 rounded-full bg-[#F5F7FC] hover:bg-slate-200 text-[#5149B8] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Simular siguiente período (Demo)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/app/dictionary?q=${encodeURIComponent(question.tags[0] || '')}`
                    )
                  }
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-full bg-[#83D0E5]/25 hover:bg-[#83D0E5]/40 text-[#202744] font-extrabold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Consultar en Diccionario</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/app/quiz')}
                  className="flex-1 sm:flex-initial py-2.5 px-5 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <BookOpenCheck className="w-3.5 h-3.5" />
                  <span>Ir a Test de 10 preguntas</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
