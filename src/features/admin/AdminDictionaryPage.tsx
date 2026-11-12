import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Edit3,
  Copy,
  Eye,
  Archive,
  X,
  Star,
  TrendingUp,
  Layers,
  Check,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import {
  UrologyTermEnriched,
  UrologyDictionaryCategory,
  TermEditorialStatus,
  TermAliasType,
  UrologyTermReference,
} from '../../types/domain';
import { CategoryIcon } from '../../components/common/CategoryIcon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const AdminDictionaryPage: React.FC = () => {
  const { user, refreshData } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'terms' | 'categories' | 'metrics'>('terms');
  const [tick, setTick] = useState(0);

  // Filters for terms table
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<TermEditorialStatus | 'all'>('all');

  // Term Form Modal State
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [editingTermId, setEditingTermId] = useState<string | undefined>(undefined);
  const [termName, setTermName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [categoryId, setCategoryId] = useState('ucat-01');
  const [shortDef, setShortDef] = useState('');
  const [fullDef, setFullDef] = useState('');
  const [synonymsInput, setSynonymsInput] = useState('');
  const [abbreviationsInput, setAbbreviationsInput] = useState('');
  const [altNamesInput, setAltNamesInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editorialStatus, setEditorialStatus] = useState<TermEditorialStatus>('review');
  const [selectedRelatedIds, setSelectedRelatedIds] = useState<string[]>([]);
  const [references, setReferences] = useState<Array<Omit<UrologyTermReference, 'id' | 'term_id'>>>(
    []
  );
  const [showLivePreviewInForm, setShowLivePreviewInForm] = useState(false);

  // Standalone Preview Modal State
  const [previewTerm, setPreviewTerm] = useState<UrologyTermEnriched | null>(null);

  // Category Form State
  const [editingCat, setEditingCat] = useState<UrologyDictionaryCategory | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catIcon, setCatIcon] = useState('Activity');
  const [catColor, setCatColor] = useState('#5149B8');
  const [catOrder, setCatOrder] = useState(1);
  const [catActive, setCatActive] = useState(true);

  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!user) return null;

  const stats = uroRepository.getDictionaryAdminStats();
  const categories = uroRepository.getDictionaryCategories(true);
  const allProfiles = uroRepository.getAllProfiles();

  const terms = useMemo(
    () =>
      uroRepository.getDictionaryTerms({
        userId: user.id,
        includeUnpublished: true,
        categoryId: categoryFilter === 'all' ? null : categoryFilter,
        statusFilter,
        query: searchQuery,
      }),
    [user.id, categoryFilter, statusFilter, searchQuery, tick]
  );

  const allTermsForRelations = useMemo(
    () =>
      uroRepository.getDictionaryTerms({
        userId: user.id,
        includeUnpublished: true,
      }),
    [user.id, tick]
  );

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setErrorMsg(null);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const openNewTermModal = () => {
    setEditingTermId(undefined);
    setTermName('');
    setSlug('');
    setSlugManuallyEdited(false);
    setCategoryId(categories[0]?.id || 'ucat-01');
    setShortDef('');
    setFullDef('');
    setSynonymsInput('');
    setAbbreviationsInput('');
    setAltNamesInput('');
    setTagsInput('');
    setImageUrl('');
    setEditorialStatus('review');
    setSelectedRelatedIds([]);
    setReferences([]);
    setShowLivePreviewInForm(false);
    setErrorMsg(null);
    setIsTermModalOpen(true);
  };

  const openEditTermModal = (t: UrologyTermEnriched) => {
    setEditingTermId(t.id);
    setTermName(t.term);
    setSlug(t.slug);
    setSlugManuallyEdited(true);
    setCategoryId(t.category_id);
    setShortDef(t.short_definition);
    setFullDef(t.full_definition);
    setSynonymsInput(
      t.aliases
        .filter((a) => a.alias_type === 'synonym')
        .map((a) => a.alias)
        .join(', ')
    );
    setAbbreviationsInput(
      t.aliases
        .filter((a) => a.alias_type === 'abbreviation')
        .map((a) => a.alias)
        .join(', ')
    );
    setAltNamesInput(
      t.aliases
        .filter((a) => a.alias_type === 'alternative_name')
        .map((a) => a.alias)
        .join(', ')
    );
    setTagsInput(t.tags.map((tg) => tg.tag).join(', '));
    setImageUrl(t.image_url || '');
    setEditorialStatus(t.editorial_status);
    setSelectedRelatedIds(t.related_terms.map((r) => r.id));
    setReferences(
      t.references.map((r) => ({
        reference_title: r.reference_title,
        authors: r.authors,
        publication_year: r.publication_year,
        source_name: r.source_name,
        url: r.url,
        accessed_at: r.accessed_at,
      }))
    );
    setShowLivePreviewInForm(false);
    setErrorMsg(null);
    setIsTermModalOpen(true);
  };

  const handleSaveTerm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const aliases: Array<{ alias: string; alias_type: TermAliasType }> = [];
    synonymsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((alias) => aliases.push({ alias, alias_type: 'synonym' }));
    abbreviationsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((alias) => aliases.push({ alias, alias_type: 'abbreviation' }));
    altNamesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((alias) => aliases.push({ alias, alias_type: 'alternative_name' }));

    const tags = tagsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      uroRepository.saveDictionaryTerm(user.id, {
        id: editingTermId,
        term: termName,
        slug: slug || uroRepository.slugifyText(termName),
        short_definition: shortDef,
        full_definition: fullDef,
        category_id: categoryId,
        image_url: imageUrl.trim() || null,
        editorial_status: editorialStatus,
        aliases,
        tags,
        references,
        related_term_ids: selectedRelatedIds,
      });
      setIsTermModalOpen(false);
      setTick((t) => t + 1);
      refreshData();
      showToast(
        editingTermId
          ? 'Término actualizado correctamente.'
          : 'Nuevo término creado en el Diccionario Urológico.'
      );
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al guardar el término.');
    }
  };

  const handleDuplicateTerm = (termId: string) => {
    try {
      const copy = uroRepository.duplicateDictionaryTerm(user.id, termId);
      setTick((t) => t + 1);
      showToast(`Término duplicado como borrador: "${copy.term}".`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al duplicar término.');
    }
  };

  const handleChangeStatus = (termId: string, newStatus: TermEditorialStatus) => {
    try {
      uroRepository.updateDictionaryTermStatus(user.id, termId, newStatus);
      setTick((t) => t + 1);
      showToast(`Estado editorial cambiado a "${newStatus}".`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al cambiar estado.');
    }
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      uroRepository.saveDictionaryCategory(user.id, {
        id: editingCat?.id,
        name: catName,
        slug: catSlug || uroRepository.slugifyText(catName),
        description: catDesc,
        icon: catIcon,
        color: catColor,
        display_order: Number(catOrder || 1),
        is_active: catActive,
      });
      setEditingCat(null);
      setCatName('');
      setCatSlug('');
      setCatDesc('');
      setCatOrder(categories.length + 1);
      setTick((t) => t + 1);
      showToast('Categoría del diccionario guardada correctamente.');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error al guardar categoría.');
    }
  };

  const getAuthorName = (authorId: string) => {
    return allProfiles.find((p) => p.id === authorId)?.display_name || 'Comité Académico';
  };

  const statusBadge = (status: TermEditorialStatus) => {
    switch (status) {
      case 'published':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-meta font-extrabold uppercase">
            Publicado
          </span>
        );
      case 'review':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-meta font-extrabold uppercase">
            En Revisión
          </span>
        );
      case 'draft':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-meta font-extrabold uppercase">
            Borrador
          </span>
        );
      case 'archived':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-meta font-extrabold uppercase">
            Archivado
          </span>
        );
    }
  };

  return (
    <div className="space-y-6" data-tick={tick}>
      {/* Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Administración Editorial
          </div>
          <h1 className="text-2xl font-extrabold text-[#202744]">
            Diccionario Urológico — Gestión de Contenidos
          </h1>
          <p className="text-xs text-[#858BA1] mt-1">
            Administra términos, sinónimos, abreviaturas, referencias, relaciones y las 14 categorías especializadas.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-[#F5F7FC] p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveSubTab('terms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'terms'
                ? 'bg-white text-[#5149B8] shadow-sm'
                : 'text-[#858BA1] hover:text-[#202744]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Términos ({stats.totalTerms})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('categories')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'categories'
                ? 'bg-white text-[#5149B8] shadow-sm'
                : 'text-[#858BA1] hover:text-[#202744]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categorías ({stats.totalCategories})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('metrics')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'metrics'
                ? 'bg-white text-[#5149B8] shadow-sm'
                : 'text-[#858BA1] hover:text-[#202744]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Métricas y Consultas</span>
          </button>
        </div>
      </div>

      {/* Dashboard KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-3xl p-4 border border-slate-200/70 shadow-xs">
          <span className="text-meta font-bold text-[#858BA1] block">Total Términos</span>
          <span className="text-2xl font-black text-[#202744]">{stats.totalTerms}</span>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-slate-200/70 shadow-xs">
          <span className="text-meta font-bold text-emerald-700 block">Publicados</span>
          <span className="text-2xl font-black text-emerald-600">{stats.publishedTerms}</span>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-slate-200/70 shadow-xs">
          <span className="text-meta font-bold text-amber-700 block">En Revisión</span>
          <span className="text-2xl font-black text-amber-600">{stats.reviewTerms}</span>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-slate-200/70 shadow-xs">
          <span className="text-meta font-bold text-slate-600 block">En Borrador</span>
          <span className="text-2xl font-black text-slate-700">{stats.draftTerms}</span>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-slate-200/70 shadow-xs">
          <span className="text-meta font-bold text-[#5149B8] block">Categorías</span>
          <span className="text-2xl font-black text-[#5149B8]">{stats.totalCategories}</span>
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

      {/* SUB-TAB 1: TERMS MANAGEMENT TABLE */}
      {activeSubTab === 'terms' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-1 flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar término, abreviatura o definición..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs text-[#202744]"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filtrar por categoría"
                className="px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
              >
                <option value="all">Todas las categorías ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TermEditorialStatus | 'all')}
                aria-label="Filtrar por estado editorial"
                className="px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-semibold text-[#202744]"
              >
                <option value="all">Todos los estados</option>
                <option value="published">Publicados</option>
                <option value="review">En revisión</option>
                <option value="draft">Borradores</option>
                <option value="archived">Archivados</option>
              </select>
            </div>

            <button
              type="button"
              onClick={openNewTermModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold shadow-sm transition cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Nuevo Término</span>
            </button>
          </div>

          {/* Terms Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-meta font-extrabold uppercase text-[#858BA1]">
                  <th className="py-3 px-3">Término / Slug</th>
                  <th className="py-3 px-3">Categoría</th>
                  <th className="py-3 px-3">Estado Editorial</th>
                  <th className="py-3 px-3">Actualización / Autor</th>
                  <th className="py-3 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {terms.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-3">
                      <div className="font-extrabold text-[#202744] text-sm">{t.term}</div>
                      <div className="text-meta text-[#858BA1] font-mono">/{t.slug}</div>
                      {t.aliases.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {t.aliases.map((al) => (
                            <span
                              key={al.id}
                              className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 text-meta font-bold"
                            >
                              {al.alias}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      {t.category ? (
                        <span
                          className="px-2.5 py-1 rounded-full text-meta font-extrabold text-white inline-block"
                          style={{ backgroundColor: t.category.color || '#5149B8' }}
                        >
                          {t.category.name}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-3.5 px-3">{statusBadge(t.editorial_status)}</td>
                    <td className="py-3.5 px-3 text-meta text-[#858BA1]">
                      <div>
                        Act: {format(new Date(t.updated_at), "d MMM yyyy, HH:mm", { locale: es })}
                      </div>
                      <div>Autor: {getAuthorName(t.created_by)}</div>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="inline-flex flex-wrap items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewTerm(t)}
                          title="Previsualizar ficha"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#5149B8] hover:bg-violet-50 transition cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditTermModal(t)}
                          title="Editar término"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#5149B8] hover:bg-violet-50 transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateTerm(t.id)}
                          title="Duplicar término"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition cursor-pointer"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        {t.editorial_status !== 'published' ? (
                          <button
                            type="button"
                            onClick={() => handleChangeStatus(t.id, 'published')}
                            title="Publicar término"
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-meta font-bold transition cursor-pointer"
                          >
                            Publicar
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleChangeStatus(t.id, 'review')}
                            title="Despublicar (pasar a revisión)"
                            className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 text-meta font-bold transition cursor-pointer"
                          >
                            Despublicar
                          </button>
                        )}
                        {t.editorial_status !== 'archived' && (
                          <button
                            type="button"
                            onClick={() => handleChangeStatus(t.id, 'archived')}
                            title="Archivar término"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CATEGORIES MANAGEMENT */}
      {activeSubTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form
            onSubmit={handleSaveCategory}
            className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 h-fit"
          >
            <h2 className="text-base font-extrabold text-[#202744]">
              {editingCat ? 'Editar Categoría' : 'Nueva Categoría del Diccionario'}
            </h2>

            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Nombre</label>
              <input
                type="text"
                required
                value={catName}
                onChange={(e) => {
                  setCatName(e.target.value);
                  if (!editingCat) {
                    setCatSlug(uroRepository.slugifyText(e.target.value));
                  }
                }}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Slug único</label>
              <input
                type="text"
                required
                value={catSlug}
                onChange={(e) => setCatSlug(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202744] mb-1">Descripción</label>
              <textarea
                rows={2}
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">Icono</label>
                <select
                  value={catIcon}
                  onChange={(e) => setCatIcon(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs"
                >
                  <option value="Activity">Activity</option>
                  <option value="HeartPulse">HeartPulse</option>
                  <option value="Stethoscope">Stethoscope</option>
                  <option value="ShieldAlert">ShieldAlert</option>
                  <option value="Gem">Gem</option>
                  <option value="Microscope">Microscope</option>
                  <option value="Layers">Layers</option>
                  <option value="UserCheck">UserCheck</option>
                  <option value="Droplets">Droplets</option>
                  <option value="Siren">Siren</option>
                  <option value="ClipboardList">ClipboardList</option>
                  <option value="Pill">Pill</option>
                  <option value="Baby">Baby</option>
                  <option value="RefreshCw">RefreshCw</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">Color</label>
                <input
                  type="color"
                  value={catColor}
                  onChange={(e) => setCatColor(e.target.value)}
                  className="w-full h-9 rounded-xl border border-slate-200 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#202744] mb-1">Orden</label>
                <input
                  type="number"
                  value={catOrder}
                  onChange={(e) => setCatOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-[#202744] cursor-pointer">
              <input
                type="checkbox"
                checked={catActive}
                onChange={(e) => setCatActive(e.target.checked)}
              />
              <span>Categoría activa visible para usuarios</span>
            </label>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#5149B8] text-white text-xs font-extrabold cursor-pointer"
              >
                {editingCat ? 'Guardar cambios' : 'Crear categoría'}
              </button>
              {editingCat && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCat(null);
                    setCatName('');
                    setCatSlug('');
                    setCatDesc('');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {categories.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl text-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: c.color || '#5149B8' }}
                  >
                    <CategoryIcon name={c.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400">#{c.display_order}</span>
                      <h3 className="text-sm font-extrabold text-[#202744]">{c.name}</h3>
                    </div>
                    <p className="text-xs text-[#858BA1] mt-0.5">{c.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCat(c);
                    setCatName(c.name);
                    setCatSlug(c.slug);
                    setCatDesc(c.description);
                    setCatIcon(c.icon);
                    setCatColor(c.color);
                    setCatOrder(c.display_order);
                    setCatActive(c.is_active);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#5149B8] cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: METRICS (MOST VIEWED & MOST FAVORITED TERMS) */}
      {activeSubTab === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#202744] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#5149B8]" />
              <span>Términos Más Consultados</span>
            </h2>
            {stats.mostViewedTerms.length === 0 ? (
              <p className="text-xs text-[#858BA1]">Aún no se registran lecturas de términos.</p>
            ) : (
              <div className="space-y-2.5">
                {stats.mostViewedTerms.map((item, idx) => (
                  <div
                    key={item.term_id}
                    className="p-3.5 rounded-2xl bg-[#F5F7FC] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#5149B8] text-white text-xs font-extrabold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-extrabold text-[#202744]">{item.term}</span>
                    </div>
                    <span className="text-xs font-black text-[#5149B8]">
                      {item.views_count} consulta(s)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#202744] flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <span>Términos Más Guardados en Favoritos</span>
            </h2>
            {stats.mostFavoritedTerms.length === 0 ? (
              <p className="text-xs text-[#858BA1]">Aún no hay términos marcados en favoritos.</p>
            ) : (
              <div className="space-y-2.5">
                {stats.mostFavoritedTerms.map((item, idx) => (
                  <div
                    key={item.term_id}
                    className="p-3.5 rounded-2xl bg-[#F5F7FC] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-[#202744] text-xs font-extrabold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-extrabold text-[#202744]">{item.term}</span>
                    </div>
                    <span className="text-xs font-black text-amber-600">
                      {item.favorites_count} favorito(s)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT TERM + LIVE PREVIEW */}
      {isTermModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-[#202744]">
                  {editingTermId ? 'Editar Término Urológico' : 'Nuevo Término Urológico'}
                </h2>
                <p className="text-xs text-[#858BA1]">
                  Completa los campos académicos y previsualiza cómo lo verá el estudiante antes de publicar.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowLivePreviewInForm((p) => !p)}
                  className="px-3.5 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-[#5149B8] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showLivePreviewInForm ? 'Volver al Formulario' : 'Previsualizar'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsTermModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                {errorMsg}
              </div>
            )}

            {showLivePreviewInForm ? (
              <div className="bg-[#F5F7FC] rounded-3xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#5149B8] text-white text-xs font-extrabold">
                    {categories.find((c) => c.id === categoryId)?.name || 'Categoría'}
                  </span>
                  <span className="text-xs font-bold text-[#858BA1]">
                    Vista previa de usuario • Estado: {editorialStatus}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#202744]">
                  {termName || '(Sin nombre de término)'}
                </h3>
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80">
                  <span className="text-meta font-extrabold uppercase text-[#5149B8] block mb-1">
                    Definición breve
                  </span>
                  <p className="text-sm font-bold text-[#202744]">
                    {shortDef || '(Sin definición breve)'}
                  </p>
                </div>
                {fullDef && (
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/80">
                    <span className="text-meta font-extrabold uppercase text-[#858BA1] block mb-1">
                      Explicación ampliada
                    </span>
                    <p className="text-xs text-slate-700 whitespace-pre-line">{fullDef}</p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSaveTerm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      1. Nombre del término *
                    </label>
                    <input
                      type="text"
                      required
                      value={termName}
                      onChange={(e) => {
                        setTermName(e.target.value);
                        if (!slugManuallyEdited) {
                          setSlug(uroRepository.slugifyText(e.target.value));
                        }
                      }}
                      placeholder="Ej. Hiperplasia prostática benigna"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      2. Slug único editable *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => {
                        setSlugManuallyEdited(true);
                        setSlug(e.target.value);
                      }}
                      placeholder="hiperplasia-prostatica-benigna"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs font-mono text-[#202744]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      3. Categoría *
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      13. Estado editorial *
                    </label>
                    <select
                      value={editorialStatus}
                      onChange={(e) => setEditorialStatus(e.target.value as TermEditorialStatus)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-sm font-bold text-[#202744]"
                    >
                      <option value="draft">Borrador (Draft)</option>
                      <option value="review">En Revisión (Review)</option>
                      <option value="published">Publicado (Visible a usuarios)</option>
                      <option value="archived">Archivado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202744] mb-1">
                    4. Definición breve *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={shortDef}
                    onChange={(e) => setShortDef(e.target.value)}
                    placeholder="Resumen claro y directo del concepto en 1 o 2 oraciones..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202744] mb-1">
                    5. Explicación académica ampliada
                  </label>
                  <textarea
                    rows={4}
                    value={fullDef}
                    onChange={(e) => setFullDef(e.target.value)}
                    placeholder="Desarrollo anatómico, fisiopatológico o semiológico comprensible..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FC] border border-slate-200 text-sm text-[#202744]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      6. Sinónimos (separados por coma)
                    </label>
                    <input
                      type="text"
                      value={synonymsInput}
                      onChange={(e) => setSynonymsInput(e.target.value)}
                      placeholder="Ej. Adenoma prostático"
                      className="w-full px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      7. Abreviaturas (separadas por coma)
                    </label>
                    <input
                      type="text"
                      value={abbreviationsInput}
                      onChange={(e) => setAbbreviationsInput(e.target.value)}
                      placeholder="Ej. HPB, HBP"
                      className="w-full px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      8. Nombres alternativos
                    </label>
                    <input
                      type="text"
                      value={altNamesInput}
                      onChange={(e) => setAltNamesInput(e.target.value)}
                      placeholder="Ej. Crecimiento prostático benigno"
                      className="w-full px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      9. Etiquetas (separadas por coma)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="Ej. próstata, obstrucción, McNeal"
                      className="w-full px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202744] mb-1">
                      10. URL de Imagen o Esquema (opcional)
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://ejemplo.edu/esquema.png"
                      className="w-full px-3 py-2 rounded-xl bg-[#F5F7FC] border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                {/* 11. Bibliographic References Builder */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#202744]">
                      11. Referencias Bibliográficas Verificables
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setReferences([
                          ...references,
                          {
                            reference_title: '',
                            authors: '',
                            publication_year: 2024,
                            source_name: '',
                            url: null,
                            accessed_at: null,
                          },
                        ])
                      }
                      className="text-xs font-extrabold text-[#5149B8] hover:underline cursor-pointer"
                    >
                      + Agregar referencia
                    </button>
                  </div>
                  {references.map((ref, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-[#F5F7FC] p-3 rounded-2xl border border-slate-200/70"
                    >
                      <input
                        type="text"
                        placeholder="Título del capítulo o libro *"
                        value={ref.reference_title}
                        onChange={(e) => {
                          const copy = [...references];
                          copy[idx].reference_title = e.target.value;
                          setReferences(copy);
                        }}
                        className="sm:col-span-5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Autores / Editorial"
                        value={ref.authors || ''}
                        onChange={(e) => {
                          const copy = [...references];
                          copy[idx].authors = e.target.value;
                          setReferences(copy);
                        }}
                        className="sm:col-span-4 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Año"
                        value={ref.publication_year || ''}
                        onChange={(e) => {
                          const copy = [...references];
                          copy[idx].publication_year = Number(e.target.value) || null;
                          setReferences(copy);
                        }}
                        className="sm:col-span-2 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setReferences(references.filter((_, i) => i !== idx))}
                        className="sm:col-span-1 flex items-center justify-center text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* 12. Related Terms Multi-Selector */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-[#202744]">
                    12. Términos Relacionados ({selectedRelatedIds.length} seleccionados)
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-3 rounded-2xl bg-[#F5F7FC] border border-slate-200">
                    {allTermsForRelations
                      .filter((t) => t.id !== editingTermId)
                      .map((candidate) => {
                        const isSelected = selectedRelatedIds.includes(candidate.id);
                        return (
                          <button
                            key={candidate.id}
                            type="button"
                            onClick={() =>
                              setSelectedRelatedIds((prev) =>
                                prev.includes(candidate.id)
                                  ? prev.filter((id) => id !== candidate.id)
                                  : [...prev, candidate.id]
                              )
                            }
                            className={`px-2.5 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                              isSelected
                                ? 'bg-[#5149B8] text-white'
                                : 'bg-white text-[#202744] border border-slate-200 hover:border-[#5149B8]'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            <span>{candidate.term}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsTermModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold shadow-sm cursor-pointer"
                  >
                    {editingTermId ? 'Guardar Cambios' : 'Guardar Término'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* STANDALONE PREVIEW MODAL */}
      {previewTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {statusBadge(previewTerm.editorial_status)}
                <span className="text-xs font-bold text-[#858BA1]">
                  Previsualización de Ficha Académica
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTerm(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-2xl font-black text-[#202744]">{previewTerm.term}</h3>
            <div className="p-4 rounded-2xl bg-[#F5F7FC] border border-slate-200/80">
              <span className="text-meta font-extrabold uppercase text-[#5149B8] block mb-1">
                Definición Breve
              </span>
              <p className="text-sm font-bold text-[#202744]">{previewTerm.short_definition}</p>
            </div>
            {previewTerm.full_definition && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {previewTerm.full_definition}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              {previewTerm.editorial_status !== 'published' && (
                <button
                  type="button"
                  onClick={() => {
                    handleChangeStatus(previewTerm.id, 'published');
                    setPreviewTerm(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer"
                >
                  Aprobar y Publicar Ahora
                </button>
              )}
              <button
                type="button"
                onClick={() => setPreviewTerm(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
