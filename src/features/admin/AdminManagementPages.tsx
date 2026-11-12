import React, { useState } from 'react';
import {
  Edit3,
  FolderTree,
  Gift,
  TicketCheck,
  Settings,
  ClipboardList,
  Coins,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import {
  Category,
  Reward,
  RedemptionStatus,
  ScheduleIntervalUnit,
  QuestionSchedule,
} from '../../types/domain';
import { CategoryIcon } from '../../components/common/CategoryIcon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// ==================== ADMIN CATEGORIES CRUD ====================
export const AdminCategoriesPage: React.FC = () => {
  const { user, refreshData } = useApp();
  const [tick, setTick] = useState(0);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Activity');
  const [isActive, setIsActive] = useState(true);

  if (!user) return null;

  const categories = uroRepository.getCategories(true);
  const questions = uroRepository.getQuestions();

  const handleEdit = (c: Category) => {
    setEditingCat(c);
    setName(c.name);
    setDescription(c.description || '');
    setIcon(c.icon);
    setIsActive(c.is_active);
  };

  const handleResetForm = () => {
    setEditingCat(null);
    setName('');
    setDescription('');
    setIcon('Activity');
    setIsActive(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    uroRepository.saveCategory(user.id, {
      id: editingCat?.id,
      name: name.trim(),
      description: description.trim() || null,
      icon,
      is_active: isActive,
    });
    handleResetForm();
    setTick((t) => t + 1);
    refreshData();
  };

  return (
    <div className="space-y-6" data-tick={tick}>
      <div>
        <h1 className="text-2xl font-extrabold text-[#202744]">
          Categorías Urológicas ({categories.length})
        </h1>
        <p className="text-xs text-[#858BA1]">
          Administra los ejes temáticos utilizados en el banco de preguntas y tests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 card-soft-shadow border border-slate-100 space-y-4 h-fit"
        >
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              {editingCat ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">Nombre</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Neurourología y Urodinamia"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">Descripción</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Resumen de los tópicos incluidos..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Icono</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
              >
                <option value="Activity">Activity</option>
                <option value="ShieldAlert">ShieldAlert</option>
                <option value="Gem">Gem</option>
                <option value="Layers">Layers</option>
                <option value="Microscope">Microscope</option>
                <option value="Droplets">Droplets</option>
                <option value="UserCheck">UserCheck</option>
                <option value="Siren">Siren</option>
                <option value="HeartPulse">HeartPulse</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Estado</label>
              <select
                value={isActive ? 'active' : 'inactive'}
                onChange={(e) => setIsActive(e.target.value === 'active')}
                className="w-full px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
              >
                <option value="active">Activa</option>
                <option value="inactive">Inactiva</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold cursor-pointer"
            >
              {editingCat ? 'Guardar Cambios' : 'Crear Categoría'}
            </button>
            {editingCat && (
              <button
                type="button"
                onClick={handleResetForm}
                className="py-2.5 px-4 rounded-full bg-slate-100 text-xs font-bold text-[#202744] cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="lg:col-span-2 space-y-3">
          {categories.map((c) => {
            const count = questions.filter((q) => q.category_id === c.id).length;
            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-4 sm:p-5 card-soft-shadow border border-slate-100 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#5149B8]/10 text-[#5149B8] flex items-center justify-center shrink-0">
                    <CategoryIcon name={c.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-[#202744]">{c.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-meta font-bold ${
                          c.is_active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {c.is_active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    <p className="text-xs text-[#858BA1] mt-0.5">{c.description}</p>
                    <span className="text-meta font-bold text-[#5149B8] mt-1 inline-block">
                      {count} preguntas asociadas
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleEdit(c)}
                  className="px-3.5 py-2 rounded-xl bg-[#F5F7FC] hover:bg-[#5149B8] text-[#202744] hover:text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Editar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==================== ADMIN REWARDS CRUD ====================
export const AdminRewardsPage: React.FC = () => {
  const { user, refreshData } = useApp();
  const [tick, setTick] = useState(0);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  const [name, setName] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('Material Académico');
  const [description, setDescription] = useState('');
  const [pointsCost, setPointsCost] = useState(50);
  const [stockInput, setStockInput] = useState<string>(''); // empty = unlimited
  const [conditions, setConditions] = useState('Entrega mediante validación de código único.');
  const [isActive, setIsActive] = useState(true);

  if (!user) return null;

  const rewards = uroRepository.getRewards(true);

  const handleEdit = (r: Reward) => {
    setEditingReward(r);
    setName(r.name);
    setCategoryLabel(r.category_label);
    setDescription(r.description);
    setPointsCost(r.points_cost);
    setStockInput(r.stock === null ? '' : String(r.stock));
    setConditions(r.conditions);
    setIsActive(r.is_active);
  };

  const handleReset = () => {
    setEditingReward(null);
    setName('');
    setCategoryLabel('Material Académico');
    setDescription('');
    setPointsCost(50);
    setStockInput('');
    setConditions('Entrega mediante validación de código único.');
    setIsActive(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || pointsCost <= 0) return;

    const parsedStock = stockInput.trim() === '' ? null : Math.max(0, parseInt(stockInput, 10));

    uroRepository.saveReward(user.id, {
      id: editingReward?.id,
      name: name.trim(),
      category_label: categoryLabel.trim(),
      description: description.trim(),
      image_url: null,
      points_cost: Number(pointsCost),
      stock: Number.isNaN(parsedStock as number) ? null : parsedStock,
      is_active: isActive,
      conditions: conditions.trim(),
      valid_from: editingReward?.valid_from || new Date().toISOString(),
      valid_until: editingReward?.valid_until || null,
    });

    handleReset();
    setTick((t) => t + 1);
    refreshData();
  };

  return (
    <div className="space-y-6" data-tick={tick}>
      <div>
        <h1 className="text-2xl font-extrabold text-[#202744]">
          Catálogo de Recompensas y Stock ({rewards.length})
        </h1>
        <p className="text-xs text-[#858BA1]">
          Define los premios disponibles, su costo en puntos, disponibilidad y condiciones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 card-soft-shadow border border-slate-100 space-y-4 h-fit"
        >
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              {editingReward ? 'Editar Premio' : 'Crear Nuevo Premio'}
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">Nombre del Premio</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Atlas Quirúrgico Digital"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Costo (Puntos)</label>
              <input
                type="number"
                min={1}
                required
                value={pointsCost}
                onChange={(e) => setPointsCost(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-extrabold text-[#5149B8]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">
                Stock (vacío = ilimitado)
              </label>
              <input
                type="number"
                min={0}
                value={stockInput}
                onChange={(e) => setStockInput(e.target.value)}
                placeholder="Ilimitado"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Etiqueta</label>
              <input
                type="text"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Estado</label>
              <select
                value={isActive ? 'active' : 'inactive'}
                onChange={(e) => setIsActive(e.target.value === 'active')}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">Descripción</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">Condiciones</label>
            <input
              type="text"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold cursor-pointer"
            >
              {editingReward ? 'Actualizar Premio' : 'Crear Premio'}
            </button>
            {editingReward && (
              <button
                type="button"
                onClick={handleReset}
                className="py-2.5 px-4 rounded-full bg-slate-100 text-xs font-bold text-[#202744] cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="lg:col-span-2 space-y-3">
          {rewards.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-5 card-soft-shadow border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#5149B8] text-white text-xs font-extrabold">
                    {r.points_cost} pts
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#83D0E5]/30 text-[#202744] text-meta font-bold">
                    {r.category_label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-meta font-bold ${
                      r.is_active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {r.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                  <span className="text-xs font-bold text-[#858BA1]">
                    • Stock: {r.stock === null ? 'Ilimitado' : `${r.stock} disponibles`}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-[#202744]">{r.name}</h3>
                <p className="text-xs text-[#858BA1]">{r.description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleEdit(r)}
                className="px-3.5 py-2 rounded-xl bg-[#F5F7FC] hover:bg-[#5149B8] text-[#202744] hover:text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== ADMIN REDEMPTIONS MANAGEMENT ====================
export const AdminRedemptionsPage: React.FC = () => {
  const { user, refreshData } = useApp();
  const [tick, setTick] = useState(0);
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});

  if (!user) return null;

  const redemptions = uroRepository.getAllRedemptions();

  const handleStatusChange = (redemptionId: string, newStatus: RedemptionStatus, defaultNote: string) => {
    const note = notesMap[redemptionId] !== undefined ? notesMap[redemptionId] : defaultNote;
    uroRepository.updateRedemptionStatus(user.id, redemptionId, newStatus, note);
    setTick((t) => t + 1);
    refreshData();
  };

  return (
    <div className="space-y-6" data-tick={tick}>
      <div>
        <h1 className="text-2xl font-extrabold text-[#202744]">
          Gestión de Canjes ({redemptions.length})
        </h1>
        <p className="text-xs text-[#858BA1]">
          Aprueba, marca como entregado o rechaza solicitudes de canje. Al rechazar o cancelar un
          canje, el sistema genera automáticamente el movimiento compensatorio de reembolso de
          puntos.
        </p>
      </div>

      {redemptions.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center card-soft-shadow">
          <TicketCheck className="w-8 h-8 text-[#5149B8] mx-auto mb-2" />
          <p className="text-sm font-bold text-[#202744]">No hay solicitudes de canje registradas</p>
          <p className="text-xs text-[#858BA1]">
            Cuando un usuario canjee un premio en el catálogo aparecerá aquí con su código único.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {redemptions.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-5 card-soft-shadow border border-slate-100 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-[#5149B8] text-white text-xs font-black tracking-wider">
                    {r.redemption_code}
                  </span>
                  <span className="text-xs font-extrabold text-[#202744]">
                    {r.user_display_name} ({r.user_email})
                  </span>
                </div>
                <span className="text-xs font-extrabold text-rose-600">
                  -{r.points_spent} pts • Estado actual:{' '}
                  <strong className="uppercase text-[#5149B8]">{r.status}</strong>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-[#202744]">{r.reward_name}</h3>
                  <p className="text-meta text-[#858BA1]">
                    Solicitado el{' '}
                    {format(new Date(r.created_at), "d 'de' MMM yyyy, HH:mm", { locale: es })}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={notesMap[r.id] ?? (r.admin_note || '')}
                    onChange={(e) =>
                      setNotesMap((prev) => ({ ...prev, [r.id]: e.target.value }))
                    }
                    placeholder="Observación administrativa..."
                    className="px-3 py-1.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(r.id, 'approved', 'Canje aprobado por coordinación.')
                    }
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Aprobar
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(r.id, 'delivered', 'Premio entregado satisfactoriamente.')
                    }
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Entregado
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        r.id,
                        'rejected',
                        'Solicitud rechazada — puntos reembolsados.'
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Rechazar y Reembolsar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==================== ADMIN USERS & POINTS ADJUSTMENT ====================
export const AdminUsersPage: React.FC = () => {
  const { user, refreshData } = useApp();
  const [tick, setTick] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deltaAmount, setDeltaAmount] = useState<number>(10);
  const [reason, setReason] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!user) return null;

  const profiles = uroRepository.getAllProfiles();

  const handleAdjustPoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;
    setFeedbackMsg(null);
    try {
      uroRepository.adjustUserPoints(user.id, selectedUserId, Number(deltaAmount), reason);
      setReason('');
      setTick((t) => t + 1);
      refreshData();
      setFeedbackMsg('✓ Ajuste de puntos registrado en el libro mayor y en auditoría.');
    } catch (err) {
      setFeedbackMsg(err instanceof Error ? err.message : 'Error al ajustar puntos.');
    }
  };

  return (
    <div className="space-y-6" data-tick={tick}>
      <div>
        <h1 className="text-2xl font-extrabold text-[#202744]">
          Usuarios,Actividad y Saldos ({profiles.length})
        </h1>
        <p className="text-xs text-[#858BA1]">
          Consulta el desempeño de cada usuario y realiza ajustes administrativos auditados.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {profiles.map((p) => {
            const st = uroRepository.getUserStats(p.id);
            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-5 card-soft-shadow border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-extrabold text-[#202744]">{p.display_name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-meta font-extrabold uppercase">
                      {p.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#858BA1]">
                    {p.email} • {p.specialty_label}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs font-bold text-[#202744]">
                    <span className="text-[#5149B8]">Saldo: {st.currentBalance} pts</span>
                    <span>Respuestas: {st.questionsAnswered}</span>
                    <span>Tests: {st.quizzesCompleted}</span>
                    <span>Acierto: {st.accuracyPercentage}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUserId(p.id);
                      setFeedbackMsg(null);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#F5F7FC] hover:bg-[#5149B8] text-[#202744] hover:text-white text-xs font-bold transition cursor-pointer"
                  >
                    Ajustar Puntos
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleAdjustPoints}
          className="bg-white rounded-3xl p-6 card-soft-shadow border border-slate-100 space-y-4 h-fit"
        >
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Ajuste Administrativo de Puntos
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">Usuario destino</label>
            <select
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-bold text-[#202744]"
            >
              <option value="">Seleccionar usuario...</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.display_name} ({uroRepository.getUserBalance(p.id)} pts)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Cantidad de puntos (+ abono / - cargo)
            </label>
            <input
              type="number"
              required
              value={deltaAmount}
              onChange={(e) => setDeltaAmount(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-extrabold text-[#5149B8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Motivo obligatorio de auditoría
            </label>
            <input
              type="text"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ej. Bonificación por participación en seminario clínico"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
            />
          </div>

          {feedbackMsg && (
            <div className="p-3 rounded-xl bg-slate-100 text-xs font-bold text-[#202744]">
              {feedbackMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedUserId}
            className="w-full py-3 px-4 rounded-full bg-[#5149B8] hover:bg-[#41399e] disabled:opacity-40 text-white text-xs font-extrabold cursor-pointer"
          >
            Aplicar Ajuste Auditado
          </button>
        </form>
      </div>
    </div>
  );
};

// ==================== ADMIN SETTINGS (SCHEDULE & POINT RULES) ====================
export const AdminSettingsPage: React.FC = () => {
  const { user, refreshData } = useApp();
  const [tick, setTick] = useState(0);
  const [savedBanner, setSavedBanner] = useState<string | null>(null);

  const schedule = uroRepository.getSchedule();
  const rules = uroRepository.getPointRules();

  const [schedName, setSchedName] = useState(schedule.name);
  const [preset, setPreset] = useState<QuestionSchedule['preset']>(schedule.preset);
  const [intervalValue, setIntervalValue] = useState(schedule.interval_value);
  const [intervalUnit, setIntervalUnit] = useState<ScheduleIntervalUnit>(schedule.interval_unit);
  const [allowRetries, setAllowRetries] = useState(schedule.allow_retries);

  if (!user) return null;

  const handlePresetChange = (newPreset: QuestionSchedule['preset']) => {
    setPreset(newPreset);
    if (newPreset === 'daily') {
      setIntervalValue(1);
      setIntervalUnit('days');
    } else if (newPreset === 'every_2_days') {
      setIntervalValue(2);
      setIntervalUnit('days');
    } else if (newPreset === 'every_3_days') {
      setIntervalValue(3);
      setIntervalUnit('days');
    } else if (newPreset === 'weekly') {
      setIntervalValue(7);
      setIntervalUnit('days');
    }
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    uroRepository.updateSchedule(user.id, {
      name: schedName.trim() || 'Desafío Periódico',
      preset,
      interval_value: Math.max(1, Number(intervalValue)),
      interval_unit: intervalUnit,
      allow_retries: allowRetries,
      is_active: true,
    });
    setTick((t) => t + 1);
    refreshData();
    setSavedBanner('✓ Frecuencia de pregunta periódica actualizada.');
    setTimeout(() => setSavedBanner(null), 3500);
  };

  const handleRuleUpdate = (ruleId: string, points: number, isActive: boolean) => {
    uroRepository.updatePointRule(user.id, ruleId, Math.max(0, points), isActive);
    setTick((t) => t + 1);
    refreshData();
    setSavedBanner('✓ Regla de puntuación actualizada.');
    setTimeout(() => setSavedBanner(null), 3000);
  };

  return (
    <div className="space-y-6" data-tick={tick}>
      <div>
        <h1 className="text-2xl font-extrabold text-[#202744]">
          Configuración de Frecuencia y Reglas de Puntuación
        </h1>
        <p className="text-xs text-[#858BA1]">
          Personaliza cada cuánto se libera la pregunta periódica y cuántos puntos otorga cada
          actividad.
        </p>
      </div>

      {savedBanner && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{savedBanner}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Periodic Question Schedule Form */}
        <form
          onSubmit={handleSaveSchedule}
          className="bg-white rounded-3xl p-6 card-soft-shadow border border-slate-100 space-y-4 h-fit"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Programación de Pregunta Periódica
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Nombre del desafío periódico
            </label>
            <input
              type="text"
              value={schedName}
              onChange={(e) => setSchedName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-bold text-[#202744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202744] mb-1">
              Frecuencia predefinida
            </label>
            <select
              value={preset}
              onChange={(e) =>
                handlePresetChange(e.target.value as QuestionSchedule['preset'])
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-bold text-[#202744]"
            >
              <option value="daily">Cada día (24 horas)</option>
              <option value="every_2_days">Cada 2 días</option>
              <option value="every_3_days">Cada 3 días</option>
              <option value="weekly">Semanal (Cada 7 días)</option>
              <option value="custom">Intervalo personalizado en horas o días</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">
                Valor de intervalo
              </label>
              <input
                type="number"
                min={1}
                value={intervalValue}
                onChange={(e) => {
                  setPreset('custom');
                  setIntervalValue(Number(e.target.value));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-extrabold text-[#5149B8]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Unidad</label>
              <select
                value={intervalUnit}
                onChange={(e) => {
                  setPreset('custom');
                  setIntervalUnit(e.target.value as ScheduleIntervalUnit);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-bold text-[#202744]"
              >
                <option value="days">Días</option>
                <option value="hours">Horas</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F7FC]">
            <div>
              <span className="text-xs font-bold text-[#202744] block">
                Permitir reintentos en la misma pregunta
              </span>
              <span className="text-meta text-[#858BA1]">
                Por defecto desactivado para garantizar una única respuesta por período.
              </span>
            </div>
            <input
              type="checkbox"
              checked={allowRetries}
              onChange={(e) => setAllowRetries(e.target.checked)}
              className="w-4 h-4 accent-[#5149B8]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold cursor-pointer"
          >
            Guardar Frecuencia
          </button>
        </form>

        {/* Point Rules Editor */}
        <div className="bg-white rounded-3xl p-6 card-soft-shadow border border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#5149B8]" />
            <h2 className="text-base font-extrabold text-[#202744]">
              Motor Configurable de Reglas de Puntos
            </h2>
          </div>

          <div className="space-y-3">
            {rules.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-extrabold text-[#202744] block">
                    {r.description}
                  </span>
                  <span className="text-meta font-mono text-[#858BA1]">{r.action_key}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    min={0}
                    value={r.points}
                    onChange={(e) =>
                      handleRuleUpdate(r.id, Number(e.target.value), r.is_active)
                    }
                    className="w-16 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-[#5149B8] text-center"
                  />
                  <span className="text-xs font-bold text-[#858BA1]">pts</span>
                  <button
                    type="button"
                    onClick={() => handleRuleUpdate(r.id, r.points, !r.is_active)}
                    className={`px-2.5 py-1 rounded-lg text-meta font-extrabold uppercase cursor-pointer ${
                      r.is_active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {r.is_active ? 'Activa' : 'Inactiva'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== ADMIN AUDIT LOG PAGE ====================
export const AdminAuditPage: React.FC = () => {
  const logs = uroRepository.getAuditLogs();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-[#5149B8]" />
          <h1 className="text-2xl font-extrabold text-[#202744]">
            Registro de Auditoría ({logs.length})
          </h1>
        </div>
        <p className="text-xs text-[#858BA1]">
          Trazabilidad de modificaciones en preguntas, reglas de puntuación, canjes y ajustes de
          saldo.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 card-soft-shadow border border-slate-100 space-y-2.5">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
          >
            <div>
              <span className="px-2.5 py-0.5 rounded-md bg-[#5149B8] text-white font-black text-meta uppercase mr-2">
                {log.action}
              </span>
              <span className="font-bold text-[#202744]">{log.details}</span>
            </div>
            <div className="text-meta text-[#858BA1] shrink-0">
              {log.admin_name} •{' '}
              {format(new Date(log.created_at), "d 'de' MMM yyyy, HH:mm:ss", { locale: es })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
