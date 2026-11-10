import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Gift,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import {
  HeaderGreeting,
  PointsSummaryCard,
  StreakCard,
  DailyQuestionCard,
  CategoryCard,
} from '../../components/dashboard/DashboardWidgets';
import { MyProgressRpgCard } from '../../components/dashboard/RpgProgressWidgets';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const HomePage: React.FC = () => {
  const { user, stats, progression, settings } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPill, setSelectedPill] = useState<'all' | 'basic' | 'urgent'>('all');

  if (!user || !stats) return null;

  const dailyState = uroRepository.getDailyQuestionState(user.id);
  const categories = uroRepository.getCategories();
  const questions = uroRepository.getQuestions().filter((q) => q.status === 'published');
  const rewards = uroRepository.getRewards();
  const recentLedger = uroRepository.getUserLedger(user.id).slice(0, 4);

  // Compute next reward target
  const sortedRewards = [...rewards].sort((a, b) => a.points_cost - b.points_cost);
  const nextReward =
    sortedRewards.find((r) => r.points_cost > stats.currentBalance) ||
    sortedRewards[sortedRewards.length - 1];

  const rewardProgressPct = nextReward
    ? Math.min(100, Math.round((stats.currentBalance / nextReward.points_cost) * 100))
    : 100;

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
      {/* Greeting Header */}
      <HeaderGreeting user={user} />

      {/* Big Headline inspired by "How are you feeling today?" in reference screen 2 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202744] tracking-tight leading-tight mb-3">
          ¿Qué área urológica reforzarás hoy?
        </h1>

        {/* Search & Filter Pills inspired by Screen 2 & Screen 3 */}
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
              Fundamentos
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
      </div>

      {/* Points & Streak Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PointsSummaryCard
          balance={stats.currentBalance}
          totalEarned={stats.totalEarned}
          accuracy={stats.accuracyPercentage}
        />
        <StreakCard currentStreak={stats.currentStreak} bestStreak={stats.bestStreak} />
      </div>

      {/* Featured RPG Level & Experience Progress Card ("Mi progreso") */}
      {progression && <MyProgressRpgCard progression={progression} />}

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

      {/* Next Reward Progress Banner */}
      {nextReward && (
        <section className="bg-white rounded-[28px] p-5 card-soft-shadow border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-[#83D0E5]/25 text-[#5149B8] flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5149B8]">
                  Próximo Premio Objetivo
                </span>
                <span className="text-xs font-bold text-[#858BA1]">
                  ({stats.currentBalance} / {nextReward.points_cost} pts)
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-[#202744] truncate mb-2">
                {nextReward.name}
              </h3>
              <div className="w-full h-2 bg-[#F5F7FC] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#5149B8] to-[#83D0E5] transition-all duration-300"
                  style={{ width: `${rewardProgressPct}%` }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/app/rewards')}
            className="px-4 py-2.5 rounded-full bg-[#F5F7FC] hover:bg-[#5149B8] text-[#5149B8] hover:text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Ver premios</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </section>
      )}

      {/* Categories Grid inspired by "Top doctors for you" / "Doctor for you" 2-column grid in reference */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-[#202744]">
              Módulos de Urología para ti
            </h2>
            <p className="text-xs text-[#858BA1]">
              Selecciona una categoría o inicia un test integral de 10 preguntas
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/app/quiz')}
            className="text-xs font-bold text-[#5149B8] hover:underline cursor-pointer"
          >
            Ver test general
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredCategories.map((cat, idx) => {
            const count = questions.filter((q) => q.category_id === cat.id).length;
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                questionsCount={count}
                featured={idx === 1}
                onSelect={(catId) => navigate(`/app/quiz?category=${catId}`)}
              />
            );
          })}
        </div>
      </section>

      {/* Recent Activities */}
      <section className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-[#202744]">Últimas Actividades</h2>
          <button
            type="button"
            onClick={() => navigate('/app/activity')}
            className="text-xs font-bold text-[#5149B8] hover:underline cursor-pointer"
          >
            Historial completo
          </button>
        </div>

        <div className="space-y-3">
          {recentLedger.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F7FC] border border-slate-100"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    entry.amount >= 0
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {entry.amount >= 0 ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-[#202744] truncate">
                    {entry.reason}
                  </p>
                  <p className="text-[11px] text-[#858BA1]">
                    {format(new Date(entry.created_at), "d 'de' MMM yyyy, HH:mm", { locale: es })}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs sm:text-sm font-extrabold shrink-0 ml-3 ${
                  entry.amount >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {entry.amount >= 0 ? `+${entry.amount}` : entry.amount} pts
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Disclaimer Footer */}
      <footer className="bg-white/70 rounded-2xl p-4 border border-slate-200/70 flex items-start gap-2.5 text-[11px] text-[#858BA1]">
        <BookOpen className="w-4 h-4 text-[#5149B8] shrink-0 mt-0.5" />
        <p>{settings.editorial_disclaimer}</p>
      </footer>
    </div>
  );
};
