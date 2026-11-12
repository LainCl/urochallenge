import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpenCheck,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Home,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import {
  QuizProgress,
  AnswerOption,
  QuestionResult,
  QuestionClinicalImage,
} from '../../components/questions/QuestionComponents';
import { ErrorState } from '../../components/common/FeedbackStates';
import { AnimatedNumber, ConfettiBurst } from '../../components/common/Motion';

export const QuizIntroPage: React.FC = () => {
  const { user, settings } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategory);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!user) return null;

  const categories = uroRepository.getCategories();
  const rules = uroRepository.getPointRules();
  const completionPts = rules.find((r) => r.action_key === 'quiz_completion' && r.is_active)?.points ?? 10;
  const perCorrectPts = rules.find((r) => r.action_key === 'quiz_correct_answer' && r.is_active)?.points ?? 2;

  const eligibleQuestions = uroRepository.getEligiblePublishedQuestions(
    selectedCategoryId || null
  );
  const totalPublishedAll = uroRepository.getEligiblePublishedQuestions(null).length;
  const quizSize = settings.quiz_default_size || 10;

  const handleStartQuiz = () => {
    setErrorMsg(null);
    try {
      // If selected category has fewer than 10 questions, warn user clearly as required by spec
      const session = uroRepository.startQuizSession(
        user.id,
        selectedCategoryId || null
      );
      navigate(`/app/quiz/${session.id}`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'No fue posible iniciar el test.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/app')}
          className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-base font-extrabold text-[#202744]">Evaluación de {quizSize} Preguntas</h1>
        <div className="w-10" />
      </div>

      {/* Hero Banner */}
      <div className="card-hero-violet rounded-[32px] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="w-36 h-36 rounded-full bg-white/10 absolute -right-10 -bottom-10" />
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
          <BookOpenCheck className="w-6 h-6 text-[#C3F574]" />
        </div>
        <h2 className="text-2xl font-extrabold mb-2">
          Test Integral de Conocimientos Urológicos
        </h2>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-5">
          El sistema seleccionará {quizSize} preguntas aleatorias publicadas evitando repeticiones
          recientes. Responde una pregunta a la vez: una vez confirmada tu elección, verás la
          explicación académica y no podrás modificarla.
        </p>

        {/* Transparent Point Rules Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-white/15 backdrop-blur-md rounded-2xl p-4">
          <div>
            <span className="text-meta uppercase tracking-wider text-white/75 block">
              Por completar
            </span>
            <span className="text-base font-extrabold text-[#C3F574]">+{completionPts} pts base</span>
          </div>
          <div>
            <span className="text-meta uppercase tracking-wider text-white/75 block">
              Por cada acierto
            </span>
            <span className="text-base font-extrabold text-white">+{perCorrectPts} pts adicionales</span>
          </div>
          <div>
            <span className="text-meta uppercase tracking-wider text-white/75 block">
              Puntaje máximo
            </span>
            <span className="text-base font-extrabold text-[#83D0E5]">
              +{completionPts + quizSize * perCorrectPts} pts totales
            </span>
          </div>
        </div>
      </div>

      {/* Configuration Card */}
      <div className="bg-white rounded-[32px] p-6 sm:p-7 card-soft-shadow border border-white space-y-5">
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#858BA1] mb-2">
            Alcance temático de la evaluación
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => {
              setSelectedCategoryId(e.target.value);
              setErrorMsg(null);
            }}
            className="w-full px-4 py-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm font-bold text-[#202744] focus:outline-none focus:border-[#5149B8]"
          >
            <option value="">
              Todas las categorías urológicas ({totalPublishedAll} preguntas elegibles)
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {eligibleQuestions.length < quizSize && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold mb-1">
                Banco insuficiente en esta categoría específica ({eligibleQuestions.length} de {quizSize} requeridas)
              </p>
              <p className="mb-2">
                De acuerdo con las reglas académicas del MVP, no se inicia un test incompleto. Puedes
                seleccionar <strong>"Todas las categorías urológicas"</strong> ({totalPublishedAll} preguntas
                publicadas disponibles) para iniciar tu evaluación de {quizSize} preguntas ahora.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryId('');
                  setErrorMsg(null);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs cursor-pointer"
              >
                Usar todas las categorías ({totalPublishedAll} preguntas)
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
            {errorMsg}
          </div>
        )}

        <button
          type="button"
          disabled={eligibleQuestions.length < quizSize}
          onClick={handleStartQuiz}
          className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] disabled:opacity-40 text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Comenzar Test de {quizSize} Preguntas</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const QuizSessionPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user, refreshData } = useApp();
  const navigate = useNavigate();

  const [currentPos, setCurrentPos] = useState(1);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  if (!user || !sessionId) return null;

  const sessionData = uroRepository.getQuizSession(sessionId);
  if (!sessionData) {
    return (
      <ErrorState
        title="Sesión de evaluación no encontrada"
        message="No pudimos localizar el test solicitado."
        onRetry={() => navigate('/app/quiz')}
      />
    );
  }

  const { session, questionsMap, categoriesMap } = sessionData;
  const currentItem =
    session.questions.find((q) => q.position === currentPos) || session.questions[0];
  const question = questionsMap[currentItem.question_id];
  const category = question ? categoriesMap[question.category_id] : null;

  const isAnswered = currentItem.selected_option_id !== null;
  const activeSelection = isAnswered ? currentItem.selected_option_id : selectedOptionId;
  const correctOption = question?.options.find((o) => o.is_correct);

  const handleConfirm = () => {
    if (!selectedOptionId || isAnswered) return;
    uroRepository.answerQuizQuestion(
      user.id,
      session.id,
      currentItem.position,
      selectedOptionId
    );
    setTick((t) => t + 1);
    refreshData();
  };

  const handleNext = () => {
    if (currentPos < session.total_questions) {
      setSelectedOptionId(null);
      setCurrentPos(currentPos + 1);
    } else {
      navigate(`/app/quiz/${session.id}/result`);
    }
  };

  if (!question) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-5" data-tick={tick}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/app')}
          className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#5149B8]">
          Test de {session.total_questions} Preguntas
        </span>
        <span className="px-3 py-1 rounded-full bg-white text-xs font-extrabold text-[#202744] card-soft-shadow">
          {currentItem.position} / {session.total_questions}
        </span>
      </div>

      <QuizProgress current={currentItem.position} total={session.total_questions} />

      <div className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-xs font-extrabold">
            {category?.name || 'Urología'}
          </span>
          <span className="text-meta font-bold text-[#858BA1]">
            Pregunta {currentItem.position} de {session.total_questions}
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
                selected={activeSelection === opt.id}
                locked={isAnswered}
                correctOptionId={isAnswered ? correctOption?.id : null}
                onSelect={(id) => setSelectedOptionId(id)}
              />
            ))}
        </div>

        {!isAnswered ? (
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={!selectedOptionId}
              onClick={handleConfirm}
              className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] disabled:opacity-40 text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition cursor-pointer"
            >
              Confirmar respuesta
            </button>
          </div>
        ) : (
          <>
            <QuestionResult
              isCorrect={Boolean(currentItem.is_correct)}
              explanation={question.explanation}
              referenceText={question.reference_text}
              relatedTerms={uroRepository.findRelatedDictionaryTermsForQuestion(question)}
            />
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {currentPos < session.total_questions
                    ? `Siguiente pregunta (${currentPos + 1} de ${session.total_questions})`
                    : 'Ver resultados finales del test'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const QuizResultPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(true);

  if (!sessionId) return null;

  const sessionData = uroRepository.getQuizSession(sessionId);
  if (!sessionData) {
    return (
      <ErrorState
        title="Resultados no disponibles"
        message="No se encontró la sesión de evaluación."
        onRetry={() => navigate('/app/quiz')}
      />
    );
  }

  const { session, questionsMap, categoriesMap } = sessionData;
  const accuracyPct = Math.round(
    (session.correct_answers / Math.max(1, session.total_questions)) * 100
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <ConfettiBurst active={accuracyPct >= 70} />
      {/* Summary Hero Card */}
      <div className="card-hero-violet rounded-[36px] p-7 sm:p-9 text-white text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4">
          <Award className="w-9 h-9 text-[#C3F574]" />
        </div>

        <span className="px-3.5 py-1 rounded-full bg-[#C3F574] text-[#202744] text-xs font-extrabold uppercase tracking-wider">
          Evaluación Completada
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold mt-3 mb-2">
          Obtuviste {session.correct_answers} de {session.total_questions} aciertos
        </h1>
        <p className="text-xs sm:text-sm text-white/85 max-w-md mx-auto mb-6">
          Tus puntos han sido acreditados en tu libro de movimientos y tu racha diaria fue actualizada.
        </p>

        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-7">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3.5">
            <span className="text-2xl font-black block">
              {session.correct_answers}/{session.total_questions}
            </span>
            <span className="text-meta text-white/80 font-semibold">Puntaje</span>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3.5">
            <span className="text-2xl font-black text-[#C3F574] block tabular-nums">
              <AnimatedNumber value={accuracyPct} suffix="%" />
            </span>
            <span className="text-meta text-white/80 font-semibold">Precisión</span>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3.5">
            <span className="text-2xl font-black text-[#83D0E5] block tabular-nums">
              <AnimatedNumber value={session.points_awarded} prefix="+" />
            </span>
            <span className="text-meta text-white/80 font-semibold">Puntos ganados</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/app')}
            className="w-full sm:w-auto py-3 px-6 rounded-full bg-white text-[#5149B8] hover:bg-slate-100 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>
          <button
            type="button"
            onClick={() => setShowReview((prev) => !prev)}
            className="w-full sm:w-auto py-3 px-6 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{showReview ? 'Ocultar revisión' : 'Revisar respuestas'}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/dictionary')}
            className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#83D0E5] hover:bg-[#6ec2db] text-[#202744] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>Diccionario Urológico</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/quiz')}
            className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#202744]/40 hover:bg-[#202744]/60 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nuevo test</span>
          </button>
        </div>
      </div>

      {/* Detailed Question-by-Question Review */}
      {showReview && (
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#202744]">
            Revisión detallada de respuestas ({session.total_questions})
          </h2>

          {session.questions.map((qItem) => {
            const q = questionsMap[qItem.question_id];
            if (!q) return null;
            const cat = categoriesMap[q.category_id];
            const selectedOpt = q.options.find((o) => o.id === qItem.selected_option_id);
            const correctOpt = q.options.find((o) => o.is_correct);

            return (
              <div
                key={qItem.id}
                className="bg-white rounded-[28px] p-5 sm:p-6 card-soft-shadow border border-white space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#5149B8]">
                    Pregunta #{qItem.position} • {cat?.name || 'Urología'}
                  </span>
                  {qItem.is_correct ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correcta
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-extrabold">
                      <XCircle className="w-3.5 h-3.5" /> Incorrecta
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-[#202744]">
                  {q.question_text}
                </h3>

                <QuestionClinicalImage
                  imageUrl={q.image_url}
                  caption={q.image_caption}
                  compact={true}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div
                    className={`p-3 rounded-2xl border ${
                      qItem.is_correct
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <span className="font-bold block opacity-75 mb-0.5">Tu respuesta:</span>
                    <span className="font-extrabold">
                      {selectedOpt?.option_text || 'Sin responder'}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="font-bold block opacity-75 mb-0.5">Respuesta correcta:</span>
                    <span className="font-extrabold">{correctOpt?.option_text}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F5F7FC] text-xs text-[#202744] leading-relaxed space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-[#5149B8] block mb-0.5">Explicación:</strong>
                      {q.explanation}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/app/dictionary?q=${encodeURIComponent(q.tags[0] || '')}`)
                      }
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#5149B8] text-[#5149B8] hover:text-white text-meta font-extrabold border border-[#5149B8]/20 transition shrink-0 cursor-pointer self-start sm:self-center"
                    >
                      Buscar en Diccionario
                    </button>
                  </div>

                  {(() => {
                    const matched = uroRepository.findRelatedDictionaryTermsForQuestion(q, 3);
                    if (matched.length === 0) return null;
                    return (
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/70">
                        <span className="text-meta font-bold text-[#858BA1] mr-1">
                          Fichas relacionadas:
                        </span>
                        {matched.map((rt) => (
                          <button
                            key={rt.id}
                            type="button"
                            onClick={() => navigate(`/app/dictionary/${rt.slug}`)}
                            className="px-2.5 py-1 rounded-full bg-white hover:bg-[#5149B8] text-[#5149B8] hover:text-white text-meta font-extrabold border border-[#5149B8]/20 transition cursor-pointer"
                          >
                            {rt.term} →
                          </button>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
