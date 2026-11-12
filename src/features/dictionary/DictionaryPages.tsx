import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  X,
  Star,
  Clock,
  ArrowLeft,
  ArrowUpRight,
  Copy,
  Share2,
  Check,
  Trash2,
  Tag,
  BookMarked,
  Layers,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import { UrologyTermEnriched } from '../../types/domain';
import { CategoryIcon } from '../../components/common/CategoryIcon';
import { DictionaryFlashcardsModal } from './DictionaryFlashcardsModal';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Resalta coincidencias ignorando mayúsculas y tildes/acentos
 */
export const HighlightedText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  const cleanQuery = uroRepository.normalizeSearchText(query);
  if (!cleanQuery || !text) return <>{text}</>;

  const normText = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let matchIdx = normText.indexOf(cleanQuery, lastIndex);

  while (matchIdx !== -1) {
    if (matchIdx > lastIndex) {
      parts.push(text.slice(lastIndex, matchIdx));
    }
    const matchedOriginal = text.slice(matchIdx, matchIdx + cleanQuery.length);
    parts.push(
      <mark
        key={`${matchIdx}-${lastIndex}`}
        className="bg-[#C3F574] text-[#202744] font-extrabold px-0.5 rounded"
      >
        {matchedOriginal}
      </mark>
    );
    lastIndex = matchIdx + cleanQuery.length;
    matchIdx = normText.indexOf(cleanQuery, lastIndex);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
};

export const DictionaryMainPage: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialTab =
    (searchParams.get('tab') as 'all' | 'categories' | 'favorites' | 'history') || 'all';
  const initialCat = searchParams.get('category') || null;

  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'categories' | 'favorites' | 'history'>(
    initialTab
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(initialCat);
  const [tick, setTick] = useState(0);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);

  // Debounce search input (200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [inputQuery]);

  if (!user) return null;

  const categories = uroRepository.getDictionaryCategories(false);

  const allPublishedTerms = useMemo(
    () =>
      uroRepository.getDictionaryTerms({
        userId: user.id,
        includeUnpublished: false,
      }),
    [user.id, tick]
  );

  const filteredTerms = useMemo(
    () =>
      uroRepository.getDictionaryTerms({
        userId: user.id,
        includeUnpublished: false,
        categoryId: selectedCategoryId,
        query: debouncedQuery,
        onlyFavorites: activeTab === 'favorites',
      }),
    [user.id, selectedCategoryId, debouncedQuery, activeTab, tick]
  );

  const favoritesCount = useMemo(
    () => allPublishedTerms.filter((t) => t.is_favorite).length,
    [allPublishedTerms]
  );

  const historyEntries = useMemo(
    () => uroRepository.getUserTermHistory(user.id),
    [user.id, tick]
  );

  const handleToggleFavorite = (e: React.MouseEvent, termId: string) => {
    e.stopPropagation();
    uroRepository.toggleFavoriteTerm(user.id, termId);
    setTick((t) => t + 1);
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, viewId: string) => {
    e.stopPropagation();
    uroRepository.deleteTermHistoryEntry(user.id, viewId);
    setTick((t) => t + 1);
  };

  const handleClearHistory = () => {
    uroRepository.clearUserTermHistory(user.id);
    setTick((t) => t + 1);
  };

  const handleSelectCategory = (catId: string | null) => {
    setSelectedCategoryId(catId);
    if (activeTab === 'categories') {
      setActiveTab('all');
    }
    const nextParams = new URLSearchParams(searchParams);
    if (catId) nextParams.set('category', catId);
    else nextParams.delete('category');
    setSearchParams(nextParams, { replace: true });
  };

  const quickSearchSuggestions = [
    'CCR',
    'Bosniak',
    'Stauffer',
    'Neves-Zincke',
    'HPB',
    'PSA',
    'PI-RADS',
    'Litiasis',
  ];

  return (
    <div className="space-y-6" data-tick={tick}>
      {/* Hero Header */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 card-soft-shadow border border-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl card-hero-violet text-white flex items-center justify-center shadow-md shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#5149B8]/10 text-[#5149B8] text-meta font-extrabold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                Biblioteca Académica de Consulta
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202744] tracking-tight">
                Diccionario Urológico
              </h1>
              <p className="text-xs sm:text-sm text-[#858BA1] mt-0.5">
                Explora y aprende los conceptos fundamentales de la urología
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-[#F5F7FC] border border-slate-100 text-center">
              <span className="text-base font-black text-[#5149B8] block leading-none">
                {allPublishedTerms.length}
              </span>
              <span className="text-meta font-bold text-[#858BA1] uppercase">Términos</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-[#F5F7FC] border border-slate-100 text-center">
              <span className="text-base font-black text-[#202744] block leading-none">
                {categories.length}
              </span>
              <span className="text-meta font-bold text-[#858BA1] uppercase">Categorías</span>
            </div>
          </div>
        </div>

        {/* Highlighted Smart Search Bar */}
        <div className="mt-6">
          <label htmlFor="dictionary-search-input" className="sr-only">
            Buscar término, abreviatura o concepto urológico
          </label>
          <div className="relative">
            <Search className="w-5 h-5 text-[#5149B8] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="dictionary-search-input"
              type="search"
              value={inputQuery}
              onChange={(e) => {
                setInputQuery(e.target.value);
                if (activeTab === 'categories' || activeTab === 'history') {
                  setActiveTab('all');
                }
              }}
              placeholder="Buscar término, abreviatura o concepto..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#F5F7FC] border-2 border-[#5149B8]/15 focus:border-[#5149B8] focus:bg-white text-sm font-semibold text-[#202744] focus:outline-none transition shadow-xs"
            />
            {inputQuery && (
              <button
                type="button"
                onClick={() => setInputQuery('')}
                aria-label="Limpiar búsqueda"
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-[#202744] flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="text-meta font-bold text-[#858BA1] mr-1">Búsquedas rápidas:</span>
            {quickSearchSuggestions.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => {
                  setInputQuery(sug);
                  setActiveTab('all');
                }}
                className={`px-2.5 py-1 rounded-full text-meta font-bold transition cursor-pointer ${
                  inputQuery.toLowerCase() === sug.toLowerCase()
                    ? 'bg-[#5149B8] text-white'
                    : 'bg-[#F5F7FC] hover:bg-[#5149B8]/10 text-[#5149B8]'
                }`}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl card-soft-shadow border border-white"
          role="tablist"
          aria-label="Secciones del Diccionario Urológico"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#5149B8] text-white shadow-sm'
                : 'text-[#202744]/80 hover:bg-[#F5F7FC]'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Todos los términos ({allPublishedTerms.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'categories'}
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-[#5149B8] text-white shadow-sm'
                : 'text-[#202744]/80 hover:bg-[#F5F7FC]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categorías ({categories.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'favorites'}
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-[#5149B8] text-white shadow-sm'
                : 'text-[#202744]/80 hover:bg-[#F5F7FC]'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Mis favoritos ({favoritesCount})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#5149B8] text-white shadow-sm'
                : 'text-[#202744]/80 hover:bg-[#F5F7FC]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Historial reciente ({historyEntries.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFlashcardsOpen(true)}
            disabled={filteredTerms.length === 0 && allPublishedTerms.length === 0}
            className="px-4 py-2.5 rounded-full bg-[#C3F574] hover:bg-[#b5eb60] text-[#202744] text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#5149B8]" />
            <span>Modo Flashcards</span>
          </button>

          {selectedCategoryId && (
            <button
              type="button"
              onClick={() => handleSelectCategory(null)}
              className="px-3.5 py-2 rounded-full bg-[#C3F574] text-[#202744] text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>
                Categoría:{' '}
                {categories.find((c) => c.id === selectedCategoryId)?.name || 'Seleccionada'}
              </span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* TAB: 14 CATEGORIES GRID */}
      {activeTab === 'categories' && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#202744]">
              Explorar por Categorías Urológicas ({categories.length})
            </h2>
            <p className="text-xs text-[#858BA1]">
              Selecciona una especialidad o eje temático para filtrar los términos correspondientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = allPublishedTerms.filter((t) => t.category_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className="bg-white rounded-[28px] p-5 card-soft-shadow border border-white hover:border-[#5149B8]/30 text-left transition flex flex-col justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0"
                      style={{ backgroundColor: cat.color || '#5149B8' }}
                    >
                      <CategoryIcon name={cat.icon} className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#F5F7FC] text-[#5149B8] text-xs font-extrabold">
                      {count} término{count === 1 ? '' : 's'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#202744] group-hover:text-[#5149B8] transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#858BA1] mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-[#5149B8]">
                    <span>Explorar categoría</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB: ALL TERMS OR FAVORITES */}
      {(activeTab === 'all' || activeTab === 'favorites') && (
        <section className="space-y-4">
          {/* Horizontal Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => handleSelectCategory(null)}
              className={`px-3.5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                selectedCategoryId === null
                  ? 'bg-[#202744] text-white shadow-xs'
                  : 'bg-white text-[#858BA1] hover:text-[#202744]'
              }`}
            >
              Todas las categorías ({categories.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? 'bg-[#5149B8] text-white shadow-xs'
                    : 'bg-white text-[#202744]/80 hover:bg-[#5149B8]/10'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Results Count Header */}
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-[#858BA1]">
              Mostrando <strong className="text-[#202744]">{filteredTerms.length}</strong>{' '}
              {filteredTerms.length === 1 ? 'término' : 'términos'}
              {debouncedQuery ? ` para "${debouncedQuery}"` : ''}
            </p>
          </div>

          {/* Terms List or Friendly Empty State */}
          {filteredTerms.length === 0 ? (
            <div className="bg-white rounded-[32px] p-10 text-center card-soft-shadow border border-white max-w-lg mx-auto my-4">
              <div className="w-14 h-14 rounded-2xl bg-[#5149B8]/10 text-[#5149B8] flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-[#202744] mb-1">
                {activeTab === 'favorites' && !debouncedQuery && !selectedCategoryId
                  ? 'Aún no tienes términos favoritos guardados'
                  : 'No encontramos términos para tu búsqueda'}
              </h3>
              <p className="text-xs text-[#858BA1] mb-5 leading-relaxed">
                {activeTab === 'favorites' && !debouncedQuery && !selectedCategoryId
                  ? 'Marca cualquier término con el icono de estrella para guardarlo en tu biblioteca personal de estudio.'
                  : `No hubo coincidencias para "${debouncedQuery}". Intenta buscar por una abreviatura (ej. HPB, PSA, STUI) o limpia los filtros activos.`}
              </p>
              <div className="flex items-center justify-center gap-2">
                {(inputQuery || selectedCategoryId) && (
                  <button
                    type="button"
                    onClick={() => {
                      setInputQuery('');
                      handleSelectCategory(null);
                    }}
                    className="px-4 py-2.5 rounded-full bg-[#5149B8] text-white text-xs font-extrabold cursor-pointer"
                  >
                    Limpiar búsqueda y filtros
                  </button>
                )}
                {activeTab === 'favorites' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('all')}
                    className="px-4 py-2.5 rounded-full bg-[#F5F7FC] text-[#202744] text-xs font-extrabold cursor-pointer"
                  >
                    Explorar todos los términos
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map((term) => (
                <TermListCard
                  key={term.id}
                  term={term}
                  query={debouncedQuery}
                  onSelect={() => navigate(`/app/dictionary/${term.slug}`)}
                  onToggleFavorite={(e) => handleToggleFavorite(e, term.id)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB: RECENT VIEW HISTORY */}
      {activeTab === 'history' && (
        <section className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-extrabold text-[#202744]">
                Historial Reciente de Consultas ({historyEntries.length})
              </h2>
              <p className="text-xs text-[#858BA1]">
                Registro cronológico de los términos que has estudiado recientemente en tu cuenta.
              </p>
            </div>
            {historyEntries.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-extrabold transition cursor-pointer self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpiar historial completo</span>
              </button>
            )}
          </div>

          {historyEntries.length === 0 ? (
            <div className="py-10 text-center">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#202744]">Tu historial está vacío</p>
              <p className="text-xs text-[#858BA1] mt-1">
                Cada vez que abras la ficha de un término urológico, aparecerá registrado aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {historyEntries.map(({ view, term }) => (
                <div
                  key={view.id}
                  onClick={() => navigate(`/app/dictionary/${term.slug}`)}
                  className="p-4 rounded-2xl bg-[#F5F7FC] hover:bg-[#5149B8]/6 border border-slate-100 flex items-center justify-between gap-4 transition cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-extrabold text-[#202744]">{term.term}</h3>
                      {term.category && (
                        <span
                          className="px-2.5 py-0.5 rounded-full text-meta font-extrabold text-white"
                          style={{ backgroundColor: term.category.color || '#5149B8' }}
                        >
                          {term.category.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#858BA1] line-clamp-1">{term.short_definition}</p>
                    <span className="text-meta font-semibold text-slate-400 block mt-1">
                      Consultado el{' '}
                      {format(new Date(view.viewed_at), "d 'de' MMM yyyy, HH:mm", { locale: es })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleDeleteHistoryItem(e, view.id)}
                      title="Eliminar del historial"
                      aria-label={`Eliminar ${term.term} del historial`}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ArrowUpRight className="w-4 h-4 text-[#5149B8]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {isFlashcardsOpen && (
        <DictionaryFlashcardsModal
          terms={
            filteredTerms.length > 0 && (activeTab === 'all' || activeTab === 'favorites')
              ? filteredTerms
              : allPublishedTerms
          }
          title={
            activeTab === 'favorites'
              ? 'Mis Favoritos'
              : selectedCategoryId
                ? categories.find((c) => c.id === selectedCategoryId)?.name || 'Diccionario'
                : 'Diccionario Urológico (20 tarjetas)'
          }
          onClose={() => setIsFlashcardsOpen(false)}
        />
      )}
    </div>
  );
};

const TermListCard: React.FC<{
  term: UrologyTermEnriched;
  query: string;
  onSelect: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}> = ({ term, query, onSelect, onToggleFavorite }) => {
  const abbreviations = term.aliases.filter((a) => a.alias_type === 'abbreviation');
  const synonyms = term.aliases.filter((a) => a.alias_type !== 'abbreviation');

  return (
    <article
      onClick={onSelect}
      className="bg-white rounded-[28px] p-5 card-soft-shadow border border-white hover:border-[#5149B8]/35 transition flex flex-col justify-between gap-4 cursor-pointer group"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {term.category && (
              <span
                className="px-2.5 py-0.5 rounded-full text-meta font-extrabold text-white"
                style={{ backgroundColor: term.category.color || '#5149B8' }}
              >
                {term.category.name}
              </span>
            )}
            {abbreviations.map((ab) => (
              <span
                key={ab.id}
                className="px-2 py-0.5 rounded-md bg-[#83D0E5]/25 text-[#202744] text-meta font-black"
              >
                <HighlightedText text={ab.alias} query={query} />
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label={term.is_favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            title={term.is_favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            className={`p-2 rounded-full transition cursor-pointer shrink-0 ${
              term.is_favorite
                ? 'bg-amber-100 text-amber-500'
                : 'bg-[#F5F7FC] text-slate-400 hover:text-amber-500'
            }`}
          >
            <Star className={`w-4 h-4 ${term.is_favorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        <h3 className="text-lg font-extrabold text-[#202744] group-hover:text-[#5149B8] transition">
          <HighlightedText text={term.term} query={query} />
        </h3>

        {synonyms.length > 0 && (
          <p className="text-meta font-semibold text-[#5149B8] mt-0.5">
            Sinónimos:{' '}
            {synonyms.map((s, idx) => (
              <React.Fragment key={s.id}>
                {idx > 0 && ', '}
                <HighlightedText text={s.alias} query={query} />
              </React.Fragment>
            ))}
          </p>
        )}

        <p className="text-xs sm:text-sm text-[#858BA1] mt-2 line-clamp-3 leading-relaxed">
          <HighlightedText text={term.short_definition} query={query} />
        </p>

        {term.image_url && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50/80 flex items-center gap-3 p-2">
            <img
              src={term.image_url}
              alt={`Ilustración de ${term.term}`}
              loading="lazy"
              className="w-16 h-12 object-contain rounded-xl bg-white border border-slate-200/70 shrink-0"
            />
            <span className="text-meta font-bold text-[#5149B8] leading-snug">
              Incluye fotografía / esquema clínico de la literatura
              {term.gallery_urls && term.gallery_urls.length > 1
                ? ` (${term.gallery_urls.length} figuras)`
                : ''}
            </span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-meta text-slate-400 font-semibold">
          {term.related_terms.length > 0 && (
            <span>{term.related_terms.length} término(s) relacionado(s)</span>
          )}
        </div>
        <span className="text-xs font-extrabold text-[#5149B8] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition">
          <span>Consultar ficha</span>
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </article>
  );
};

// ==================== TERM DETAIL PAGE (/app/dictionary/:slug) ====================
export const DictionaryTermDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useApp();
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [copiedFeedback, setCopiedFeedback] = useState<'def' | 'link' | null>(null);

  const allowPreviewUnpublished = user?.role === 'admin' || user?.role === 'editor';

  const term = useMemo(() => {
    if (!slug || !user) return null;
    return uroRepository.getDictionaryTermBySlug(slug, user.id, allowPreviewUnpublished);
  }, [slug, user, allowPreviewUnpublished, tick]);

  // Automatically record consultation in user's history (without awarding points or XP)
  useEffect(() => {
    if (user && term && term.editorial_status === 'published') {
      uroRepository.recordTermView(user.id, term.id);
    }
  }, [user, term?.id, term?.editorial_status]);

  if (!user) return null;

  if (!term) {
    return (
      <div className="bg-white rounded-[32px] p-10 text-center card-soft-shadow border border-white max-w-lg mx-auto my-8">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-xl font-extrabold text-[#202744] mb-2">
          Término no encontrado o no disponible
        </h2>
        <p className="text-xs text-[#858BA1] mb-6">
          El concepto solicitado no existe o se encuentra pendiente de publicación editorial.
        </p>
        <button
          type="button"
          onClick={() => navigate('/app/dictionary')}
          className="px-5 py-3 rounded-full bg-[#5149B8] text-white text-xs font-extrabold cursor-pointer"
        >
          Volver al Diccionario Urológico
        </button>
      </div>
    );
  }

  const abbreviations = term.aliases.filter((a) => a.alias_type === 'abbreviation');
  const synonyms = term.aliases.filter((a) => a.alias_type === 'synonym');
  const altNames = term.aliases.filter((a) => a.alias_type === 'alternative_name');

  const handleToggleFavorite = () => {
    uroRepository.toggleFavoriteTerm(user.id, term.id);
    setTick((t) => t + 1);
  };

  const handleCopyDefinition = async () => {
    const textToCopy = `${term.term}: ${term.short_definition}\n\n${term.full_definition}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedFeedback('def');
      setTimeout(() => setCopiedFeedback(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShareLink = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${term.term} — Diccionario Urológico UroChallenge`,
          text: term.short_definition,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedFeedback('link');
      setTimeout(() => setCopiedFeedback(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/app/dictionary')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-[#202744] text-xs font-extrabold card-soft-shadow transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#5149B8]" />
          <span>Volver al Diccionario</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
              term.is_favorite
                ? 'bg-amber-400 text-[#202744] shadow-xs'
                : 'bg-white hover:bg-amber-50 text-[#202744] card-soft-shadow'
            }`}
          >
            <Star className={`w-4 h-4 ${term.is_favorite ? 'fill-[#202744]' : 'text-amber-500'}`} />
            <span>{term.is_favorite ? 'En tus favoritos' : 'Agregar a favoritos'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyDefinition}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-[#202744] text-xs font-extrabold flex items-center gap-1.5 card-soft-shadow transition cursor-pointer"
          >
            {copiedFeedback === 'def' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">¡Definición copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#5149B8]" />
                <span>Copiar definición</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleShareLink}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-[#202744] text-xs font-extrabold flex items-center gap-1.5 card-soft-shadow transition cursor-pointer"
          >
            {copiedFeedback === 'link' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">¡Enlace copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#5149B8]" />
                <span>Compartir enlace</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Term Card */}
      <article className="bg-white rounded-[36px] p-6 sm:p-8 card-soft-shadow border border-white space-y-6">
        {/* Category & Status Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {term.category && (
              <Link
                to={`/app/dictionary?category=${term.category.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold text-white shadow-xs"
                style={{ backgroundColor: term.category.color || '#5149B8' }}
              >
                <CategoryIcon name={term.category.icon} className="w-3.5 h-3.5" />
                <span>{term.category.name}</span>
              </Link>
            )}
            {abbreviations.map((ab) => (
              <span
                key={ab.id}
                className="px-3 py-1 rounded-full bg-[#83D0E5]/30 text-[#202744] text-xs font-black"
              >
                Abrev: {ab.alias}
              </span>
            ))}
          </div>

          {term.editorial_status !== 'published' && (
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase">
              Vista previa ({term.editorial_status})
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#202744] tracking-tight">
            {term.term}
          </h1>
          {(synonyms.length > 0 || altNames.length > 0) && (
            <p className="text-xs sm:text-sm text-[#858BA1] mt-1.5">
              También conocido como:{' '}
              <strong className="text-[#202744]">
                {[...synonyms, ...altNames].map((a) => a.alias).join(' • ')}
              </strong>
            </p>
          )}
        </div>

        {/* Short Definition Highlight Box */}
        <div className="rounded-3xl bg-gradient-to-br from-[#5149B8]/8 to-[#83D0E5]/15 p-5 sm:p-6 border border-[#5149B8]/15">
          <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block mb-1.5">
            Definición Breve
          </span>
          <p className="text-sm sm:text-base font-bold text-[#202744] leading-relaxed">
            {term.short_definition}
          </p>
        </div>

        {/* Expanded Academic Explanation */}
        {term.full_definition && (
          <div className="space-y-2">
            <h2 className="text-base font-extrabold text-[#202744] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#5149B8]" />
              <span>Explicación Académica Ampliada</span>
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-[#F5F7FC] p-5 rounded-3xl border border-slate-100">
              {term.full_definition}
            </div>
          </div>
        )}

        {/* Optional Schematic / Image & Literature Gallery */}
        {(term.image_url || (term.gallery_urls && term.gallery_urls.length > 0)) && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#5149B8] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fotografías, Esquemas y Tablas de la Literatura</span>
            </h3>
            {term.gallery_urls && term.gallery_urls.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {term.gallery_urls.map((img, idx) => (
                  <figure
                    key={`${img.url}-${idx}`}
                    className="rounded-3xl border border-slate-200 bg-[#F5F7FC] p-3.5 flex flex-col justify-between gap-2.5"
                  >
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Abrir imagen en tamaño completo"
                      className="block bg-white rounded-2xl p-2 border border-slate-100 hover:border-[#5149B8]/40 transition"
                    >
                      <img
                        src={img.url}
                        alt={img.caption || `Ilustración clínica de ${term.term}`}
                        loading="lazy"
                        className="w-full max-h-80 object-contain mx-auto rounded-xl"
                      />
                    </a>
                    <figcaption className="flex items-start justify-between gap-2 px-1">
                      <span className="text-xs font-bold text-[#202744] leading-snug">
                        {img.caption}
                      </span>
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-meta font-extrabold text-[#5149B8] hover:underline inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Ampliar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              term.image_url && (
                <figure className="rounded-3xl border border-slate-200 bg-[#F5F7FC] p-4 space-y-2">
                  <a
                    href={term.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Abrir imagen en tamaño completo"
                    className="block bg-white rounded-2xl p-2 border border-slate-100"
                  >
                    <img
                      src={term.image_url}
                      alt={`Esquema anatómico o clínico de ${term.term}`}
                      loading="lazy"
                      className="rounded-xl max-h-96 w-full object-contain mx-auto"
                    />
                  </a>
                </figure>
              )
            )}
          </div>
        )}

        {/* Complementary Metadata: Synonyms, Abbreviations & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#F5F7FC] rounded-2xl p-4 border border-slate-100">
            <span className="text-meta font-extrabold uppercase tracking-wider text-[#858BA1] block mb-2">
              Abreviaturas
            </span>
            {abbreviations.length === 0 ? (
              <span className="text-xs text-slate-400">Sin abreviaturas registradas</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {abbreviations.map((ab) => (
                  <span
                    key={ab.id}
                    className="px-2.5 py-1 rounded-lg bg-white text-[#5149B8] text-xs font-extrabold border border-slate-200/80"
                  >
                    {ab.alias}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#F5F7FC] rounded-2xl p-4 border border-slate-100">
            <span className="text-meta font-extrabold uppercase tracking-wider text-[#858BA1] block mb-2">
              Sinónimos y Nombres Alternativos
            </span>
            {synonyms.length === 0 && altNames.length === 0 ? (
              <span className="text-xs text-slate-400">Sin sinónimos adicionales</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {[...synonyms, ...altNames].map((syn) => (
                  <span
                    key={syn.id}
                    className="px-2.5 py-1 rounded-lg bg-white text-[#202744] text-xs font-bold border border-slate-200/80"
                  >
                    {syn.alias}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#F5F7FC] rounded-2xl p-4 border border-slate-100">
            <span className="text-meta font-extrabold uppercase tracking-wider text-[#858BA1] block mb-2">
              Etiquetas Clínicas
            </span>
            {term.tags.length === 0 ? (
              <span className="text-xs text-slate-400">Sin etiquetas</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {term.tags.map((tg) => (
                  <Link
                    key={tg.id}
                    to={`/app/dictionary?q=${encodeURIComponent(tg.tag)}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-[#5149B8] text-[#5149B8] hover:text-white text-xs font-bold border border-slate-200/80 transition"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tg.tag}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bibliographic References */}
        {term.references.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <h2 className="text-sm font-extrabold text-[#202744]">
              Referencias Bibliográficas y Fuentes de Consulta
            </h2>
            <div className="space-y-2">
              {term.references.map((ref) => (
                <div
                  key={ref.id}
                  className="p-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-100 text-xs text-[#202744] flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="font-extrabold">{ref.reference_title}</p>
                    <p className="text-[#858BA1] mt-0.5">
                      {[ref.authors, ref.source_name, ref.publication_year]
                        .filter(Boolean)
                        .join(' • ')}
                    </p>
                  </div>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5149B8] hover:underline font-bold inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Fuente</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editorial & Educational Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold block">
              Nota Editorial y Educativa{' '}
              {term.is_demo_pending_review ? '(Contenido de demostración pendiente de revisión profesional)' : ''}
            </span>
            <p className="text-amber-800/90 mt-0.5 leading-relaxed">
              Las definiciones del Diccionario Urológico tienen fines exclusivamente formativos y académicos para estudiantes y residentes. No constituyen recomendaciones clínicas ni sustituyen el juicio médico profesional.
            </p>
          </div>
        </div>
      </article>

      {/* Related Terms Section */}
      {term.related_terms.length > 0 && (
        <section className="bg-white rounded-[32px] p-6 sm:p-7 card-soft-shadow border border-white space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#202744]">
              Términos Relacionados ({term.related_terms.length})
            </h2>
            <p className="text-xs text-[#858BA1]">
              Selecciona cualquiera de los conceptos vinculados para profundizar tu estudio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {term.related_terms.map((rel) => (
              <Link
                key={rel.id}
                to={`/app/dictionary/${rel.slug}`}
                className="p-4 rounded-2xl bg-[#F5F7FC] hover:bg-[#5149B8] text-[#202744] hover:text-white border border-slate-100 transition group flex flex-col justify-between gap-2"
              >
                <div>
                  <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] group-hover:text-[#C3F574] block">
                    {rel.category_name}
                  </span>
                  <h3 className="text-sm font-extrabold mt-0.5">{rel.term}</h3>
                  <p className="text-xs text-[#858BA1] group-hover:text-white/80 line-clamp-2 mt-1">
                    {rel.short_definition}
                  </p>
                </div>
                <div className="flex items-center justify-end text-xs font-extrabold text-[#5149B8] group-hover:text-[#C3F574]">
                  <span>Abrir ficha</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Quiz Questions (F6) */}
      {(() => {
        const relatedQs = uroRepository.getQuestionsRelatedToDictionaryTerm(
          term.term,
          term.aliases.map((a) => a.alias),
          term.tags.map((tg) => tg.tag),
          3
        );
        if (relatedQs.length === 0) return null;
        return (
          <section className="bg-white rounded-[32px] p-6 sm:p-7 card-soft-shadow border border-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-extrabold text-[#202744]">
                  Pon a prueba este concepto ({relatedQs.length} preguntas relacionadas)
                </h2>
                <p className="text-xs text-[#858BA1]">
                  Preguntas del banco clínico que evalúan o mencionan este tema.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/app/quiz')}
                className="px-4 py-2 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold flex items-center gap-1.5 transition shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Ir a Test de 10 preguntas</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2.5">
              {relatedQs.map((rq) => (
                <div
                  key={rq.id}
                  onClick={() => navigate(`/app/quiz?category=${rq.category_id}`)}
                  className="p-4 rounded-2xl bg-[#F5F7FC] hover:bg-[#5149B8]/8 border border-slate-100 hover:border-[#5149B8]/30 transition cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-meta font-extrabold uppercase tracking-wider text-[#5149B8] block mb-0.5">
                      Nivel{' '}
                      {rq.difficulty === 'basic'
                        ? 'Básico'
                        : rq.difficulty === 'intermediate'
                          ? 'Intermedio'
                          : 'Avanzado'}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#202744] line-clamp-2">
                      {rq.question_text}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#5149B8] shrink-0" />
                </div>
              ))}
            </div>
          </section>
        );
      })()}
    </div>
  );
};
