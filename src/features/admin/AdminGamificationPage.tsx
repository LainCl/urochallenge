import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  Sliders,
  Users,
  Plus,
  Edit3,
  Check,
  X,
  History,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import { uroRepository } from '../../services/uroRepository';
import { useApp } from '../../app/providers';
import {
  LevelDefinition,
  ExperienceRule,
  AchievementDefinition,
  Profile,
  BadgeShape,
  BadgeColorTheme,
  AchievementConditionType,
} from '../../types/domain';
import { AchievementBadgeIcon } from '../../components/rewards/AchievementBadgeIcon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const AdminGamificationPage: React.FC = () => {
  const { user: currentAdmin, refreshData } = useApp();
  const [activeTab, setActiveTab] = useState<'levels' | 'rules' | 'achievements' | 'users_xp'>('levels');
  const [tick, setTick] = useState(0);

  // Level editing modal state
  const [editingLevel, setEditingLevel] = useState<Partial<LevelDefinition> | null>(null);

  // Achievement editing modal state
  const [editingAchievement, setEditingAchievement] = useState<Partial<AchievementDefinition> | null>(null);

  // User XP adjustment & ledger inspection state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [xpDelta, setXpDelta] = useState<number>(25);
  const [xpReason, setXpReason] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!currentAdmin) return null;

  const levels = uroRepository.getLevels(true);
  const rules = uroRepository.getExperienceRules();
  const achievements = uroRepository.getAchievementsDefinitions(true);
  const users = uroRepository.getAllProfiles();

  const selectedUser: Profile | null = selectedUserId
    ? users.find((u) => u.id === selectedUserId) || null
    : users[0] || null;

  const selectedUserLedger = selectedUser
    ? uroRepository.getUserExperienceLedger(selectedUser.id)
    : [];

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setErrorMsg(null);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleSaveLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLevel || !editingLevel.name || !editingLevel.roman_numeral) return;

    try {
      uroRepository.saveLevelDefinition(currentAdmin.id, {
        id: editingLevel.id,
        level_number: Number(editingLevel.level_number || levels.length + 1),
        roman_numeral: editingLevel.roman_numeral.trim(),
        name: editingLevel.name.trim(),
        description: editingLevel.description || '',
        min_xp: Number(editingLevel.min_xp ?? 0),
        max_xp:
          editingLevel.max_xp === null ||
          editingLevel.max_xp === undefined ||
          String(editingLevel.max_xp) === ''
            ? null
            : Number(editingLevel.max_xp),
        icon: editingLevel.icon || 'Award',
        badge_shape: (editingLevel.badge_shape as BadgeShape) || 'flame_2',
        badge_color: (editingLevel.badge_color as BadgeColorTheme) || 'gold',
        color: editingLevel.color || '#5149B8',
        benefits: editingLevel.benefits?.length
          ? editingLevel.benefits
          : ['Insignia de nivel desbloqueable'],
        is_active: editingLevel.is_active ?? true,
      });
      setEditingLevel(null);
      setTick((t) => t + 1);
      refreshData();
      showToast('Nivel RPG guardado y progresiones recalculadas correctamente.');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al guardar el nivel.');
    }
  };

  const handleUpdateRule = (ruleId: string, xpAmount: number, isActive: boolean) => {
    try {
      uroRepository.updateExperienceRule(currentAdmin.id, ruleId, xpAmount, isActive);
      setTick((t) => t + 1);
      refreshData();
      showToast('Regla de experiencia (XP) actualizada.');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al actualizar regla.');
    }
  };

  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement || !editingAchievement.name) return;

    try {
      uroRepository.saveAchievementDefinition(currentAdmin.id, {
        id: editingAchievement.id,
        name: editingAchievement.name.trim(),
        description: editingAchievement.description || '',
        icon: editingAchievement.icon || 'Trophy',
        badge_shape: (editingAchievement.badge_shape as BadgeShape) || 'trophy',
        badge_color: (editingAchievement.badge_color as BadgeColorTheme) || 'gold',
        condition_type:
          (editingAchievement.condition_type as AchievementConditionType) || 'questions_answered',
        condition_value: Number(editingAchievement.condition_value || 1),
        is_active: editingAchievement.is_active ?? true,
      });
      setEditingAchievement(null);
      setTick((t) => t + 1);
      refreshData();
      showToast('Logro automático guardado correctamente.');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al guardar logro.');
    }
  };

  const handleAdjustUserXp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !xpReason.trim()) return;
    try {
      uroRepository.adjustUserExperience(
        currentAdmin.id,
        selectedUser.id,
        Number(xpDelta),
        xpReason
      );
      setXpReason('');
      setTick((t) => t + 1);
      refreshData();
      showToast(`Experiencia acreditada (+${xpDelta} XP) con auditoría registrada.`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al ajustar experiencia.');
    }
  };

  return (
    <div className="space-y-6" data-tick={tick}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Motor RPG Independiente de Puntos
          </div>
          <h1 className="text-2xl font-extrabold text-[#202744]">
            Gamificación: Niveles, Experiencia (XP) y Logros
          </h1>
          <p className="text-xs text-[#858BA1] mt-1">
            Configura los niveles RPG, reglas de obtención de experiencia, insignias automáticas y auditoría de XP.
          </p>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#F5F7FC] p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('levels')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'levels'
                ? 'bg-white text-[#5149B8] shadow-sm'
                : 'text-[#858BA1] hover:text-[#202744]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Niveles ({levels.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-white text-[#5149B8] shadow-sm'
                : 'text-[#858BA1] hover:text-[#202744]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Reglas de XP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-white text-[#5149B8] shadow-sm'
                : 'text-[#858BA1] hover:text-[#202744]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Logros ({achievements.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users_xp')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'users_xp'
                ? 'bg-white text-[#5149B8] shadow-sm'
                : 'text-[#858BA1] hover:text-[#202744]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            XP de Usuarios
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between">
          <span>✓ {feedbackMsg}</span>
          <button
            type="button"
            onClick={() => setFeedbackMsg(null)}
            className="text-emerald-600 hover:text-emerald-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between">
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-rose-600 hover:text-rose-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: LEVELS */}
      {activeTab === 'levels' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#202744]">Configuración de Niveles RPG</h2>
            <button
              type="button"
              onClick={() =>
                setEditingLevel({
                  level_number: levels.length + 1,
                  roman_numeral: 'VI',
                  name: '',
                  min_xp: 3500,
                  max_xp: null,
                  description: '',
                  color: '#5149B8',
                  badge_shape: 'laurel',
                  badge_color: 'gold',
                  benefits: ['Reconocimiento especial en plataforma'],
                  is_active: true,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Nuevo Nivel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levels.map((lvl) => (
              <div
                key={lvl.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#13182B] flex items-center justify-center shrink-0">
                    <AchievementBadgeIcon
                      shape={lvl.badge_shape}
                      color={lvl.badge_color}
                      unlocked={true}
                      size="sm"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-meta font-extrabold uppercase">
                        Nivel {lvl.roman_numeral} (#{lvl.level_number})
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingLevel(lvl)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#5149B8] hover:bg-violet-50 transition-colors cursor-pointer"
                        title="Editar nivel"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-base font-extrabold text-[#202744] mt-1">{lvl.name}</h3>
                    <p className="text-xs font-bold text-[#5149B8] mt-0.5">
                      {lvl.max_xp !== null
                        ? `${lvl.min_xp.toLocaleString()} – ${lvl.max_xp.toLocaleString()} XP`
                        : `${lvl.min_xp.toLocaleString()}+ XP`}
                    </p>
                    <p className="text-xs text-[#858BA1] mt-2 line-clamp-2">{lvl.description}</p>
                  </div>
                </div>

                {lvl.benefits && lvl.benefits.length > 0 && (
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-meta font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Beneficios del nivel
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {lvl.benefits.map((b, i) => (
                        <span
                          key={i}
                          className="text-meta bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EXPERIENCE RULES */}
      {activeTab === 'rules' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#202744]">
              Reglas de Obtención de Experiencia (XP)
            </h2>
            <p className="text-xs text-[#858BA1] mt-0.5">
              Ajusta cuántos puntos de experiencia (XP) otorga cada actividad académica o activa/desactiva bonificaciones.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {rules.map((rule) => (
              <RuleRow key={rule.id} rule={rule} onSave={handleUpdateRule} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMATIC ACHIEVEMENTS */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#202744]">
                Logros e Insignias Automáticas
              </h2>
              <p className="text-xs text-[#858BA1]">
                Se desbloquean automáticamente cuando el usuario cumple la condición clínica o de constancia.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setEditingAchievement({
                  name: '',
                  description: '',
                  icon: 'Award',
                  condition_type: 'questions_answered',
                  condition_value: 25,
                  badge_shape: 'flame_3',
                  badge_color: 'blue',
                  is_active: true,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Nuevo Logro
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex items-start gap-3.5"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#13182B] flex items-center justify-center shrink-0">
                  <AchievementBadgeIcon
                    shape={ach.badge_shape}
                    color={ach.badge_color}
                    unlocked={true}
                    size="sm"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-meta font-bold px-2 py-0.5 rounded-full ${
                        ach.is_active
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {ach.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingAchievement(ach)}
                      className="p-1 text-slate-400 hover:text-[#5149B8] cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#202744] mt-1">{ach.name}</h3>
                  <p className="text-xs text-[#858BA1] mt-0.5">{ach.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-meta font-semibold text-[#5149B8]">
                    <span>Meta: {ach.condition_value}</span>
                    <span>•</span>
                    <span>Tipo: {ach.condition_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: USERS XP & AUDIT */}
      {activeTab === 'users_xp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#202744]">Usuarios y Nivel Actual</h2>
            <p className="text-xs text-[#858BA1]">
              Selecciona un usuario para consultar su historial de experiencia o realizar un ajuste justificado.
            </p>
            <div className="space-y-2.5">
              {users.map((u) => {
                const prog = uroRepository.getUserProgression(u.id);
                const isSelected = selectedUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setSelectedUserId(u.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#5149B8]/10 border-[#5149B8] shadow-sm'
                        : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100/70'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-[#202744]">{u.display_name}</p>
                      <p className="text-xs text-[#858BA1]">{u.specialty_label || u.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#5149B8]/15 text-[#5149B8] text-xs font-extrabold">
                        Nivel {prog.currentLevel.roman_numeral} — {prog.currentLevel.name}
                      </span>
                      <p className="text-xs font-extrabold text-[#202744] mt-1">
                        {prog.totalXp.toLocaleString()} XP
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {selectedUser ? (
              <>
                {/* Audited XP Adjustment Form */}
                <form
                  onSubmit={handleAdjustUserXp}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-2 text-amber-800 bg-amber-50 border border-amber-200/80 px-3.5 py-2.5 rounded-2xl text-xs font-semibold">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>
                      Ajuste administrativo con auditoría: La experiencia (XP) solo puede acreditarse positivamente y cada cambio queda registrado en{' '}
                      <code>experience_ledger</code> y en <code>audit_logs</code>.
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#202744]">
                    Acreditar Experiencia (XP) a {selectedUser.display_name}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#202744] mb-1">
                        Cantidad de XP (+)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={xpDelta}
                        onChange={(e) => setXpDelta(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#202744] mb-1">
                        Justificación obligatoria de auditoría
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Participación destacada en simposio urológico"
                        value={xpReason}
                        onChange={(e) => setXpReason(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Aplicar Ajuste Auditado
                    </button>
                  </div>
                </form>

                {/* User XP Ledger */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-[#202744] flex items-center gap-2">
                      <History className="w-4 h-4 text-[#5149B8]" />
                      Libro Mayor de Experiencia (XP Ledger)
                    </h3>
                    <span className="text-xs font-bold text-[#858BA1]">
                      {selectedUserLedger.length} movimientos
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
                    {selectedUserLedger.map((entry) => (
                      <div key={entry.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#202744]">{entry.description}</p>
                          <p className="text-meta text-[#858BA1]">
                            {format(new Date(entry.created_at), "d 'de' MMM yyyy, HH:mm", {
                              locale: es,
                            })}{' '}
                            • Tipo: <code>{entry.activity_type}</code>
                          </p>
                        </div>
                        <span className="text-xs font-extrabold px-2.5 py-1 rounded-full shrink-0 bg-[#5149B8]/10 text-[#5149B8]">
                          +{entry.amount} XP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE LEVEL */}
      {editingLevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveLevel}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#202744]">
                {editingLevel.id ? 'Editar Nivel RPG' : 'Crear Nuevo Nivel RPG'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingLevel(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">
                  Número de Nivel
                </label>
                <input
                  type="number"
                  value={editingLevel.level_number || 1}
                  onChange={(e) =>
                    setEditingLevel({ ...editingLevel, level_number: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">
                  Numeral Romano
                </label>
                <input
                  type="text"
                  value={editingLevel.roman_numeral || ''}
                  onChange={(e) =>
                    setEditingLevel({ ...editingLevel, roman_numeral: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  placeholder="I, II, III, IV, V..."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">
                Nombre del Nivel
              </label>
              <input
                type="text"
                value={editingLevel.name || ''}
                onChange={(e) => setEditingLevel({ ...editingLevel, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                placeholder="Ej: Maestro Urológico"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">XP Mínima</label>
                <input
                  type="number"
                  value={editingLevel.min_xp ?? 0}
                  onChange={(e) =>
                    setEditingLevel({ ...editingLevel, min_xp: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">
                  XP Máxima (vacío = sin límite)
                </label>
                <input
                  type="number"
                  value={editingLevel.max_xp ?? ''}
                  onChange={(e) =>
                    setEditingLevel({
                      ...editingLevel,
                      max_xp: e.target.value === '' ? null : Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  placeholder="Sin límite superior"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Descripción</label>
              <textarea
                rows={2}
                value={editingLevel.description || ''}
                onChange={(e) =>
                  setEditingLevel({ ...editingLevel, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">
                  Forma de Insignia
                </label>
                <select
                  value={editingLevel.badge_shape || 'flame_2'}
                  onChange={(e) =>
                    setEditingLevel({
                      ...editingLevel,
                      badge_shape: e.target.value as BadgeShape,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="sprout">Brote (Sprout)</option>
                  <option value="flame_2">Llama 2 Estrellas</option>
                  <option value="flame_3">Llama 3 Estrellas</option>
                  <option value="flame_4">Llama 4 Estrellas</option>
                  <option value="flame_5">Llama 5 Estrellas</option>
                  <option value="trophy">Trofeo Verificado</option>
                  <option value="laurel">Corona de Laurel</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">
                  Color de Insignia
                </label>
                <select
                  value={editingLevel.badge_color || 'gold'}
                  onChange={(e) =>
                    setEditingLevel({
                      ...editingLevel,
                      badge_color: e.target.value as BadgeColorTheme,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="green">Esmeralda (Green)</option>
                  <option value="blue">Zafiro (Blue)</option>
                  <option value="gold">Dorado (Gold)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingLevel(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#5149B8] text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Guardar Nivel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: EDIT / CREATE ACHIEVEMENT */}
      {editingAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveAchievement}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#202744]">
                {editingAchievement.id ? 'Editar Logro Automático' : 'Nuevo Logro Automático'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingAchievement(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">
                Nombre del Logro
              </label>
              <input
                type="text"
                value={editingAchievement.name || ''}
                onChange={(e) =>
                  setEditingAchievement({ ...editingAchievement, name: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Descripción</label>
              <input
                type="text"
                value={editingAchievement.description || ''}
                onChange={(e) =>
                  setEditingAchievement({ ...editingAchievement, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">
                  Tipo de Condición
                </label>
                <select
                  value={editingAchievement.condition_type || 'questions_answered'}
                  onChange={(e) =>
                    setEditingAchievement({
                      ...editingAchievement,
                      condition_type: e.target.value as AchievementConditionType,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="questions_answered">Preguntas respondidas</option>
                  <option value="correct_answers">Respuestas correctas</option>
                  <option value="quizzes_completed">Tests completados</option>
                  <option value="streak_days">Días de racha</option>
                  <option value="active_days">Días activos</option>
                  <option value="accuracy_pct_min_10_q">% Acierto (mín. 10 preg.)</option>
                  <option value="pomodoro_cycles">Ciclos Pomodoro</option>
                  <option value="rewards_redeemed">Premios canjeados</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">
                  Meta / Umbral
                </label>
                <input
                  type="number"
                  min={1}
                  value={editingAchievement.condition_value ?? 1}
                  onChange={(e) =>
                    setEditingAchievement({
                      ...editingAchievement,
                      condition_value: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="achActive"
                checked={editingAchievement.is_active ?? true}
                onChange={(e) =>
                  setEditingAchievement({ ...editingAchievement, is_active: e.target.checked })
                }
              />
              <label htmlFor="achActive" className="text-xs font-bold text-[#202744]">
                Logro activo para desbloqueo automático
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingAchievement(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#5149B8] text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Guardar Logro
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const RuleRow: React.FC<{
  rule: ExperienceRule;
  onSave: (id: string, xp: number, active: boolean) => void;
}> = ({ rule, onSave }) => {
  const [xp, setXp] = useState(rule.xp_amount);
  const [active, setActive] = useState(rule.is_active);
  const changed = xp !== rule.xp_amount || active !== rule.is_active;

  return (
    <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-[#202744]">{rule.description}</p>
          <span className="text-meta font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
            {rule.action_key}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="rounded text-[#5149B8]"
          />
          Activa
        </label>

        <div className="flex items-center gap-1.5">
          <input
            type="number"
            min={0}
            value={xp}
            onChange={(e) => setXp(Number(e.target.value))}
            className="w-20 px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-extrabold text-[#5149B8] text-right"
          />
          <span className="text-xs font-bold text-slate-500">XP</span>
        </div>

        {changed && (
          <button
            type="button"
            onClick={() => onSave(rule.id, xp, active)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            Guardar
          </button>
        )}
      </div>
    </div>
  );
};
