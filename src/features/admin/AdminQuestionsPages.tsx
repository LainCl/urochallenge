import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Users,
  FileQuestion,
  BookOpenCheck,
  Coins,
  TicketCheck,
  Plus,
  Copy,
  CheckCircle2,
  Edit3,
  ArrowLeft,
  AlertTriangle,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import {
  QuestionDifficulty,
  QuestionStatus,
  QuestionOption,
} from '../../types/domain';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const summary = uroRepository.getAdminDashboardSummary();
  const recentAudit = uroRepository.getAuditLogs().slice(0, 6);
  const schedule = uroRepository.getSchedule();

  const cards = [
    {
      label: 'Usuarios Activos',
      value: summary.activeUsersCount,
      sub: 'Perfiles registrados',
      icon: Users,
      to: '/admin/users',
    },
    {
      label: 'Banco de Preguntas',
      value: `${summary.publishedQuestionsCount} / ${summary.totalQuestionsCount}`,
      sub: 'Publicadas / Totales',
      icon: FileQuestion,
      to: '/admin/questions',
    },
    {
      label: 'Respuestas Registradas',
      value: summary.totalAnswersCount,
      sub: `${summary.completedQuizzesCount} tests completados`,
      icon: BookOpenCheck,
      to: '/admin/questions',
    },
    {
      label: 'Puntos Emitidos',
      value: `${summary.totalPointsIssued} pts`,
      sub: 'Acreditados en ledger',
      icon: Coins,
      to: '/admin/settings',
    },
    {
      label: 'Canjes Pendientes',
      value: summary.pendingRedemptionsCount,
      sub: 'Por aprobar o entregar',
      icon: TicketCheck,
      to: '/admin/redemptions',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#5149B8]">
            Comité Académico & Gestión
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202744]">
            Dashboard Administrativo
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/admin/questions/new')}
            className="px-4 py-2.5 rounded-2xl bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Pregunta</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              onClick={() => navigate(c.to)}
              className="bg-white rounded-3xl p-5 card-soft-shadow border border-slate-100 hover:border-[#5149B8]/40 cursor-pointer transition"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#5149B8]/10 text-[#5149B8] flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-[#202744] block">{c.value}</span>
              <span className="text-xs font-extrabold text-[#202744] block mt-0.5">{c.label}</span>
              <span className="text-[11px] text-[#858BA1]">{c.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Editorial Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-start gap-3.5 text-xs text-amber-950">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-extrabold block mb-1">
            Control Editorial del Banco de Demostración
          </strong>
          <p className="leading-relaxed">
            Las preguntas semilla están identificadas como contenido de demostración pendiente de
            validación clínica definitiva antes de su uso institucional. Desde el módulo{' '}
            <strong>Banco de Preguntas</strong> el editor responsable puede revisar, editar,
            publicar o archivar cada ítem. Frecuencia actual de pregunta periódica:{' '}
            <strong>
              cada {schedule.interval_value}{' '}
              {schedule.interval_unit === 'days' ? 'día(s)' : 'hora(s)'}
            </strong>
            .
          </p>
        </div>
      </div>

      {/* Recent Audit Log */}
      <div className="bg-white rounded-3xl p-6 card-soft-shadow border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-[#202744]">
            Actividad Administrativa Reciente
          </h2>
          <button
            type="button"
            onClick={() => navigate('/admin/audit')}
            className="text-xs font-bold text-[#5149B8] hover:underline cursor-pointer"
          >
            Ver registro completo
          </button>
        </div>

        <div className="space-y-2.5">
          {recentAudit.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-2xl bg-[#F5F7FC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="px-2 py-0.5 rounded-md bg-[#5149B8]/10 text-[#5149B8] font-black mr-2">
                  {log.action}
                </span>
                <span className="font-bold text-[#202744]">{log.details}</span>
              </div>
              <span className="text-[11px] text-[#858BA1] shrink-0">
                {log.admin_name} •{' '}
                {format(new Date(log.created_at), "d 'de' MMM, HH:mm", { locale: es })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdminQuestionsListPage: React.FC = () => {
  const { user, refreshData } = useApp();
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [tick, setTick] = useState(0);

  if (!user) return null;

  const questions = uroRepository.getQuestions();
  const categories = uroRepository.getCategories(true);
  const categoriesMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (categoryFilter && q.category_id !== categoryFilter) return false;
      if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
      if (statusFilter && q.status !== statusFilter) return false;
      if (
        searchText.trim() &&
        !q.question_text.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [questions, categoryFilter, difficultyFilter, statusFilter, searchText, tick]);

  const handleDuplicate = (questionId: string) => {
    uroRepository.duplicateQuestion(user.id, questionId);
    setTick((t) => t + 1);
    refreshData();
  };

  const handleQuickStatusChange = (questionId: string, status: QuestionStatus) => {
    uroRepository.updateQuestionStatus(user.id, questionId, status);
    setTick((t) => t + 1);
    refreshData();
  };

  return (
    <div className="space-y-6" data-tick={tick}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#202744]">
            Banco de Preguntas ({filtered.length})
          </h1>
          <p className="text-xs text-[#858BA1]">
            Crea, edita, duplica, publica o archiva preguntas educativas de urología.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/questions/new')}
          className="px-5 py-2.5 rounded-2xl bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold flex items-center gap-2 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Pregunta</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-3xl p-4 card-soft-shadow border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar por enunciado..."
          className="px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
        >
          <option value="">Todos los niveles</option>
          <option value="basic">Básico</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
        >
          <option value="">Todos los estados</option>
          <option value="published">Publicada</option>
          <option value="review">Pendiente de revisión</option>
          <option value="draft">Borrador</option>
          <option value="archived">Archivada</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.map((q) => {
          const correctOpt = q.options.find((o) => o.is_correct);
          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl p-5 card-soft-shadow border border-slate-100 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-xs font-extrabold">
                    {categoriesMap[q.category_id] || 'Sin categoría'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[#202744] text-[11px] font-bold uppercase">
                    {q.difficulty === 'basic'
                      ? 'Básico'
                      : q.difficulty === 'intermediate'
                      ? 'Intermedio'
                      : 'Avanzado'}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase ${
                      q.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : q.status === 'review'
                        ? 'bg-amber-100 text-amber-800'
                        : q.status === 'draft'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {q.status === 'published'
                      ? 'Publicada'
                      : q.status === 'review'
                      ? 'En Revisión'
                      : q.status === 'draft'
                      ? 'Borrador'
                      : 'Archivada'}
                  </span>
                  {q.is_demo_content && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold">
                      Demo Semilla (Revisión Editorial)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/questions/${q.id}`)}
                    className="px-3 py-1.5 rounded-xl bg-[#F5F7FC] hover:bg-[#5149B8] text-[#202744] hover:text-white text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(q.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#F5F7FC] hover:bg-slate-200 text-[#202744] text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Duplicar
                  </button>
                  {q.status !== 'published' ? (
                    <button
                      type="button"
                      onClick={() => handleQuickStatusChange(q.id, 'published')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Publicar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleQuickStatusChange(q.id, 'archived')}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-bold transition cursor-pointer"
                    >
                      Archivar
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-[#202744]">
                {q.question_text}
              </h3>

              <div className="text-xs text-[#858BA1] bg-[#F5F7FC] p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  <strong className="text-emerald-700">Respuesta correcta:</strong>{' '}
                  {correctOpt?.option_text}
                </span>
                <span className="text-[11px]">{q.options.length} alternativas</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const AdminQuestionFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, refreshData } = useApp();
  const navigate = useNavigate();

  const existing = id ? uroRepository.getQuestionById(id) : null;
  const categories = uroRepository.getCategories(true);

  const [questionText, setQuestionText] = useState(existing?.question_text || '');
  const [categoryId, setCategoryId] = useState(
    existing?.category_id || categories[0]?.id || ''
  );
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>(
    existing?.difficulty || 'basic'
  );
  const [status, setStatus] = useState<QuestionStatus>(existing?.status || 'published');
  const [explanation, setExplanation] = useState(existing?.explanation || '');
  const [referenceText, setReferenceText] = useState(
    existing?.reference_text ||
      'Contenido educativo revisado por el comité docente de UroChallenge.'
  );
  const [tagsInput, setTagsInput] = useState(existing?.tags.join(', ') || 'urología, básico');
  const [options, setOptions] = useState<QuestionOption[]>(
    existing?.options || [
      { id: 'opt-1', question_id: '', option_text: '', is_correct: true, sort_order: 1 },
      { id: 'opt-2', question_id: '', option_text: '', is_correct: false, sort_order: 2 },
      { id: 'opt-3', question_id: '', option_text: '', is_correct: false, sort_order: 3 },
      { id: 'opt-4', question_id: '', option_text: '', is_correct: false, sort_order: 4 },
    ]
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!user) return null;

  const handleOptionTextChange = (idx: number, text: string) => {
    setOptions((prev) =>
      prev.map((o, i) => (i === idx ? { ...o, option_text: text } : o))
    );
  };

  const handleSetCorrectIndex = (idx: number) => {
    setOptions((prev) =>
      prev.map((o, i) => ({ ...o, is_correct: i === idx }))
    );
  };

  const handleAddOption = () => {
    if (options.length >= 6) return;
    setOptions((prev) => [
      ...prev,
      {
        id: `opt-${Date.now()}`,
        question_id: existing?.id || '',
        option_text: '',
        is_correct: false,
        sort_order: prev.length + 1,
      },
    ]);
  };

  const handleRemoveOption = (idx: number) => {
    if (options.length <= 2) return;
    const next = options.filter((_, i) => i !== idx);
    if (!next.some((o) => o.is_correct)) {
      next[0].is_correct = true;
    }
    setOptions(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!questionText.trim() || !explanation.trim()) {
      setErrorMsg('El enunciado de la pregunta y la explicación académica son obligatorios.');
      return;
    }

    if (options.some((o) => !o.option_text.trim())) {
      setErrorMsg('Todas las alternativas deben tener texto.');
      return;
    }

    try {
      uroRepository.saveQuestion(user.id, {
        id: existing?.id,
        category_id: categoryId,
        question_text: questionText.trim(),
        difficulty,
        explanation: explanation.trim(),
        reference_text: referenceText.trim() || null,
        tags: tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        status,
        is_demo_content: false,
        created_by: existing?.created_by || user.id,
        reviewed_by: status === 'published' ? user.id : existing?.reviewed_by || null,
        options,
      });
      refreshData();
      navigate('/admin/questions');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al guardar pregunta.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/admin/questions')}
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#5149B8] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al banco de preguntas
        </button>
        <h1 className="text-lg font-extrabold text-[#202744]">
          {existing ? 'Editar Pregunta' : 'Nueva Pregunta Urológica'}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-8 card-soft-shadow border border-slate-100 space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1.5">Categoría</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-bold text-[#202744]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1.5">Dificultad</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as QuestionDifficulty)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-bold text-[#202744]"
            >
              <option value="basic">Básico</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1.5">
              Estado Editorial
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as QuestionStatus)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-bold text-[#202744]"
            >
              <option value="published">Publicada</option>
              <option value="review">Pendiente de revisión</option>
              <option value="draft">Borrador</option>
              <option value="archived">Archivada</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#202744] mb-1.5">
            Enunciado de la pregunta
          </label>
          <textarea
            rows={3}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Escribe el caso clínico breve o pregunta conceptual..."
            className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
          />
        </div>

        {/* Options Builder (2 to 6 options, single correct choice) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-[#5149B8]">
              Alternativas de respuesta ({options.length} de 6 máx.) — Marca la correcta
            </label>
            {options.length < 6 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="text-xs font-extrabold text-[#5149B8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Añadir alternativa
              </button>
            )}
          </div>

          {options.map((opt, idx) => (
            <div key={opt.id || idx} className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleSetCorrectIndex(idx)}
                className={`px-3 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shrink-0 transition cursor-pointer ${
                  opt.is_correct
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{opt.is_correct ? 'Correcta' : 'Marcar'}</span>
              </button>

              <input
                type="text"
                value={opt.option_text}
                onChange={(e) => handleOptionTextChange(idx, e.target.value)}
                placeholder={`Texto de la alternativa ${idx + 1}...`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
              />

              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(idx)}
                  className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                  title="Eliminar alternativa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#202744] mb-1.5">
            Explicación académica detallada
          </label>
          <textarea
            rows={3}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Fundamenta por qué la alternativa seleccionada es la correcta..."
            className="w-full px-4 py-3 rounded-2xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1.5">
              Fuente / Nota Editorial (opcional)
            </label>
            <input
              type="text"
              value={referenceText}
              onChange={(e) => setReferenceText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1.5">
              Etiquetas (separadas por coma)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/admin/questions')}
            className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#202744] text-xs font-bold cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold shadow-md cursor-pointer"
          >
            Guardar Pregunta
          </button>
        </div>
      </form>
    </div>
  );
};
