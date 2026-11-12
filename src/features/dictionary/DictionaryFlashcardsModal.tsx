import React, { useState, useMemo } from 'react';
import {
  X,
  RotateCw,
  CheckCircle2,
  RefreshCw,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { UrologyTermEnriched } from '../../types/domain';
import { ConfettiBurst } from '../../components/common/Motion';

interface DictionaryFlashcardsModalProps {
  terms: UrologyTermEnriched[];
  title: string;
  onClose: () => void;
}

export const DictionaryFlashcardsModal: React.FC<DictionaryFlashcardsModalProps> = ({
  terms,
  title,
  onClose,
}) => {
  const initialDeck = useMemo(() => terms.slice(0, 20), [terms]);
  const [deck, setDeck] = useState<UrologyTermEnriched[]>(initialDeck);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const totalCount = initialDeck.length;
  const currentCard = deck[0] || null;
  const isCompleted = deck.length === 0 && totalCount > 0;
  const progressPct = totalCount > 0 ? Math.round((masteredIds.length / totalCount) * 100) : 0;

  const handleKnowIt = () => {
    if (!currentCard) return;
    setMasteredIds((prev) => (prev.includes(currentCard.id) ? prev : [...prev, currentCard.id]));
    setDeck((prev) => prev.slice(1));
    setIsFlipped(false);
  };

  const handleReviewLater = () => {
    if (!currentCard) return;
    setReviewCount((c) => c + 1);
    setDeck((prev) => [...prev.slice(1), currentCard]);
    setIsFlipped(false);
  };

  const handleRestart = () => {
    setDeck(initialDeck);
    setMasteredIds([]);
    setReviewCount(0);
    setIsFlipped(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#13182B]/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Modo Flashcards del Diccionario"
      onClick={onClose}
    >
      <ConfettiBurst active={isCompleted} pieces={90} />

      <div
        className="w-full max-w-2xl bg-[#F5F7FC] rounded-[36px] shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-[#202744] to-[#5149B8] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-[#C3F574]" />
            </div>
            <div className="min-w-0">
              <span className="text-meta font-extrabold uppercase tracking-wider text-[#C3F574] block">
                Modo Flashcards
              </span>
              <h2 className="text-sm sm:text-base font-extrabold truncate">{title}</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar flashcards"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between text-meta font-extrabold text-[#5149B8] mb-1.5">
            <span>
              Dominadas: {masteredIds.length} / {totalCount}
            </span>
            <span>Pendientes en mazo: {deck.length}</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#5149B8] to-[#C3F574] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-center">
          {totalCount === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center">
              <BookOpen className="w-10 h-10 text-[#5149B8] mx-auto mb-3" />
              <p className="text-sm font-extrabold text-[#202744]">
                No hay términos en esta selección para practicar.
              </p>
            </div>
          ) : isCompleted ? (
            <div className="bg-white rounded-[32px] p-8 text-center card-soft-shadow space-y-4">
              <div className="w-14 h-14 rounded-3xl bg-[#C3F574] text-[#202744] flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-[#202744]">¡Mazo completado!</h3>
              <p className="text-sm text-[#858BA1] max-w-md mx-auto">
                Repasaste las <strong>{totalCount} tarjetas</strong> de este mazo ({reviewCount}{' '}
                reintento(s) de refuerzo).
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#5149B8] hover:bg-[#41399e] text-white text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Practicar de nuevo</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#F5F7FC] hover:bg-slate-200 text-[#202744] text-xs font-extrabold transition cursor-pointer"
                >
                  Volver al Diccionario
                </button>
              </div>
            </div>
          ) : currentCard ? (
            <div className="space-y-4">
              {/* Interactive Flashcard */}
              <div
                onClick={() => setIsFlipped((f) => !f)}
                className={`rounded-[32px] p-6 sm:p-8 min-h-[270px] flex flex-col justify-between cursor-pointer transition-all duration-200 border ${
                  isFlipped
                    ? 'bg-white border-[#5149B8]/30 card-soft-shadow'
                    : 'card-hero-violet text-white border-transparent'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-meta font-extrabold ${
                      isFlipped
                        ? 'bg-[#5149B8]/10 text-[#5149B8]'
                        : 'bg-white/20 text-[#C3F574]'
                    }`}
                  >
                    {currentCard.category?.name || 'Urología'}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-meta font-bold ${
                      isFlipped ? 'text-[#858BA1]' : 'text-white/80'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    {isFlipped ? 'Reverso (Definición)' : 'Anverso (Toca para voltear)'}
                  </span>
                </div>

                {!isFlipped ? (
                  <div className="my-6 text-center space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                      {currentCard.term}
                    </h3>
                    {currentCard.aliases.length > 0 && (
                      <p className="text-xs text-white/80">
                        Sinónimos / siglas: {currentCard.aliases.map((a) => a.alias).join(', ')}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="my-4 space-y-3 text-left">
                    <h4 className="text-base font-extrabold text-[#5149B8]">
                      {currentCard.term}
                    </h4>
                    <p className="text-sm font-semibold text-[#202744] leading-relaxed">
                      {currentCard.short_definition}
                    </p>
                    {currentCard.full_definition && (
                      <div className="p-3 rounded-2xl bg-[#F5F7FC] border border-slate-100 text-xs text-[#202744] leading-relaxed line-clamp-4">
                        <strong className="text-[#5149B8] block mb-0.5">
                          Desarrollo académico:
                        </strong>
                        {currentCard.full_definition}
                      </div>
                    )}
                    {currentCard.image_url && (
                      <div className="flex justify-center pt-1">
                        <img
                          src={currentCard.image_url}
                          alt={currentCard.term}
                          className="max-h-36 rounded-xl object-contain border border-slate-200"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`text-center text-meta font-bold ${
                    isFlipped ? 'text-[#858BA1]' : 'text-white/75'
                  }`}
                >
                  {isFlipped
                    ? 'Evalúa tu recuerdo abajo para continuar'
                    : 'Haz clic en la tarjeta para revelar la definición'}
                </div>
              </div>

              {/* Action Controls */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleReviewLater}
                  className="py-3.5 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-600" />
                  <span>Seguir repasando</span>
                </button>
                <button
                  type="button"
                  onClick={handleKnowIt}
                  className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Lo sé!</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
