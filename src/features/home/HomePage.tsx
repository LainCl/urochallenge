import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import {
  HeaderGreeting,
  DailyQuestionCard,
  CategoryCard,
} from '../../components/dashboard/DashboardWidgets';
import { EmptyState } from '../../components/common/FeedbackStates';

export const HomePage: React.FC = () => {
  const { user, stats, settings } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPill, setSelectedPill] = useState<'all' | 'basic' | 'urgent'>('all');

  if (!user || !stats) return null;

  const dailyState = uroRepository.getDailyQuestionState(user.id);
  const categories = uroRepository.getCategories();
  const questions = uroRepository.getQuestions().filter((q) => q.status === 'published');
  const categoryMastery = uroRepository.getUserCategoryMastery(user.id);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchesSearch =
        !searchQuery.trim() ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;
      if (selectedPill === 'urgent') {
        return c.id === 'cat-urgencias' || c.id === 'cat-litiasis' || c.id === 'cat-itu';
      }
      if (selectedPill === 'basic') {
        return c.id === 'cat-anatomia' || c.id === 'cat-hpb' || c.id === 'cat-renal';
      }
      return true;
    });
  }, [categories, searchQuery, selectedPill]);

  return (
    <div className="space-y-6">
      {/* Greeting Header with Notification Bell & Sandwich Menu Button (☰) */}
      <HeaderGreeting user={user} />

      {/* Featured Daily Question Hero Card */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-extrabold text-[#202744]">Desafío Periódico</h2>
          <button
            type="button"
            onClick={() => navigate('/app/daily-question')}
            className="text-xs font-bold text-[#5149B8] hover:underline cursor-pointer"
          >
            Ver detalle
          </button>
        </div>
        <DailyQuestionCard
          assignment={dailyState.assignment}
          question={dailyState.question}
          category={dailyState.category}
          schedule={dailyState.schedule}
          nextAvailableAt={dailyState.nextAvailableAt}
          potentialPoints={dailyState.potentialPoints}
        />
      </section>

      {/* Urology Modules Search & Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#202744] tracking-tight">
              ¿Qué área urológica reforzarás hoy?
            </h1>
            <p className="text-xs text-[#858BA1]">
              Selecciona un módulo para iniciar un test clínico de 10 preguntas
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/app/quiz')}
            className="text-xs font-bold text-[#5149B8] hover:underline self-start sm:self-auto cursor-pointer"
          >
            Ver test general
          </button>
        </div>

        {/* Search & Filter Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#858BA1] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por categoría o tema urológico..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white card-soft-shadow border border-white text-xs sm:text-sm text-[#202744] focus:outline-none focus:border-[#5149B8]"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedPill('all')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                selectedPill === 'all'
                  ? 'bg-[#C3F574] text-[#202744] shadow-sm'
                  : 'bg-white text-[#858BA1] hover:text-[#202744]'
              }`}
            >
              Todas las áreas
            </button>
            <button
              type="button"
              onClick={() => setSelectedPill('basic')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                selectedPill === 'basic'
                  ? 'bg-[#C3F574] text-[#202744] shadow-sm'
                  : 'bg-white text-[#858BA1] hover:text-[#202744]'
              }`}
            >
              Fundamentos y Oncología
            </button>
            <button
              type="button"
              onClick={() => setSelectedPill('urgent')}
              className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                selectedPill === 'urgent'
                  ? 'bg-[#C3F574] text-[#202744] shadow-sm'
                  : 'bg-white text-[#858BA1] hover:text-[#202744]'
              }`}
            >
              Clínica y Urgencias
            </button>
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <EmptyState
            title="No encontramos módulos con ese criterio"
            description="Prueba con otro término de búsqueda o restablece el filtro de áreas."
            actionLabel="Mostrar todas las áreas"
            onAction={() => {
              setSearchQuery('');
              setSelectedPill('all');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 uc-stagger">
            {filteredCategories.map((cat, idx) => {
              const count = questions.filter((q) => q.category_id === cat.id).length;
              return (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  questionsCount={count}
                  mastery={categoryMastery[cat.id]}
                  featured={idx === 1}
                  onSelect={(catId) => navigate(`/app/quiz?category=${catId}`)}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Educational Disclaimer Footer */}
      <footer className="bg-white/70 rounded-2xl p-4 border border-slate-200/70 flex items-start gap-2.5 text-meta text-[#858BA1]">
        <BookOpen className="w-4 h-4 text-[#5149B8] shrink-0 mt-0.5" />
        <p>{settings.editorial_disclaimer}</p>
      </footer>
    </div>
  );
};
