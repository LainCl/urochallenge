import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Coins,
  Package,
  ShieldCheck,
  TicketCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../../app/providers';
import { uroRepository } from '../../services/uroRepository';
import { Reward, Redemption } from '../../types/domain';
import {
  RewardCard,
  RewardRedemptionDialog,
  RewardsAlbumSection,
} from '../../components/rewards/RewardComponents';
import { AchievementBadgeIcon } from '../../components/rewards/AchievementBadgeIcon';
import { EmptyState, ErrorState } from '../../components/common/FeedbackStates';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const statusBadgeMap: Record<
  Redemption['status'],
  { label: string; className: string }
> = {
  pending: { label: 'Pendiente', className: 'bg-amber-100 text-amber-800' },
  approved: { label: 'Aprobado', className: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Entregado', className: 'bg-emerald-100 text-emerald-800' },
  rejected: { label: 'Rechazado (Reembolsado)', className: 'bg-rose-100 text-rose-800' },
  cancelled: { label: 'Cancelado (Reembolsado)', className: 'bg-slate-200 text-slate-700' },
};

export const RewardsCatalogPage: React.FC = () => {
  const { user, stats, refreshData } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'album' | 'catalog'>('album');
  const [filterMode, setFilterMode] = useState<'all' | 'redeemable' | 'badges' | 'merch'>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [completedRedemption, setCompletedRedemption] = useState<Redemption | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [requestKey, setRequestKey] = useState<string>(() => `${Date.now()}`);

  if (!user || !stats) return null;

  const allRewards = uroRepository
    .getRewards(false)
    .slice()
    .sort((a, b) => a.points_cost - b.points_cost);
  const myRedemptions = uroRepository.getUserRedemptions(user.id);
  const autoAchievements = uroRepository.getUserAutoAchievements(user.id);

  const redeemedRewardIds = new Set(
    myRedemptions
      .filter((r) => r.status !== 'rejected' && r.status !== 'cancelled')
      .map((r) => r.reward_id)
  );

  const visibleRewards = allRewards.filter((r) => {
    if (filterMode === 'redeemable') {
      return (
        stats.currentBalance >= r.points_cost && (r.stock === null || r.stock > 0)
      );
    }
    if (filterMode === 'badges') {
      return r.category_label !== 'Merchandising';
    }
    if (filterMode === 'merch') {
      return r.category_label === 'Merchandising';
    }
    return true;
  });

  const handleOpenRedeemDialog = (reward: Reward) => {
    setSelectedReward(reward);
    setCompletedRedemption(null);
    setRedeemError(null);
    setRequestKey(`${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  };

  const handleConfirmRedemption = () => {
    if (!selectedReward) return;
    setRedeemError(null);
    try {
      const redemption = uroRepository.redeemReward(
        user.id,
        selectedReward.id,
        requestKey
      );
      setCompletedRedemption(redemption);
      refreshData();
    } catch (err) {
      setRedeemError(
        err instanceof Error ? err.message : 'No se pudo procesar el canje.'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="card-hero-violet rounded-[32px] p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider">
            Insignias, Reconocimientos & Merchandising
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-1">
            Álbum y Catálogo de Premios
          </h1>
          <p className="text-xs sm:text-sm text-white/85 max-w-lg">
            Completa tu álbum coleccionando insignias automáticas por logros y canjeando tus puntos
            por certificaciones, reconocimientos y merchandising oficial UroChallenge.
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-md rounded-3xl p-4 sm:px-6 text-left sm:text-right shrink-0 border border-white/15">
          <span className="text-xs font-semibold text-white/80 block">Tu saldo disponible</span>
          <div className="flex items-baseline sm:justify-end gap-1.5">
            <Coins className="w-5 h-5 text-[#C3F574]" />
            <span className="text-3xl font-black text-white">{stats.currentBalance}</span>
            <span className="text-xs font-bold text-[#C3F574]">pts</span>
          </div>
        </div>
      </div>

      {/* Main View Switcher: Album vs Catalog */}
      <div className="bg-white rounded-full p-1.5 card-soft-shadow border border-white inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('album')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'album'
              ? 'bg-[#5149B8] text-white shadow-md'
              : 'text-[#858BA1] hover:text-[#202744]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Álbum de Recompensas e Insignias</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('catalog')}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-[#5149B8] text-white shadow-md'
              : 'text-[#858BA1] hover:text-[#202744]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Catálogo Detallado ({allRewards.length})</span>
        </button>
      </div>

      {activeTab === 'album' ? (
        <RewardsAlbumSection
          rewards={allRewards}
          redemptions={myRedemptions}
          autoAchievements={autoAchievements}
          userBalance={stats.currentBalance}
          onSelectReward={(reward) => {
            if (
              stats.currentBalance >= reward.points_cost &&
              (reward.stock === null || reward.stock > 0)
            ) {
              handleOpenRedeemDialog(reward);
            } else {
              navigate(`/app/rewards/${reward.id}`);
            }
          }}
        />
      ) : (
        <>
          {/* Filter Pills for Catalog */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-[#5149B8] text-white shadow-sm'
                    : 'bg-white text-[#858BA1] hover:text-[#202744]'
                }`}
              >
                Todos ({allRewards.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('redeemable')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  filterMode === 'redeemable'
                    ? 'bg-[#C3F574] text-[#202744] shadow-sm'
                    : 'bg-white text-[#858BA1] hover:text-[#202744]'
                }`}
              >
                Puedo canjear ahora (
                {
                  allRewards.filter(
                    (r) =>
                      stats.currentBalance >= r.points_cost &&
                      (r.stock === null || r.stock > 0)
                  ).length
                }
                )
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('badges')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  filterMode === 'badges'
                    ? 'bg-[#5149B8] text-white shadow-sm'
                    : 'bg-white text-[#858BA1] hover:text-[#202744]'
                }`}
              >
                Insignias y Certificados (9)
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('merch')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  filterMode === 'merch'
                    ? 'bg-[#5149B8] text-white shadow-sm'
                    : 'bg-white text-[#858BA1] hover:text-[#202744]'
                }`}
              >
                Merchandising UroChallenge (9)
              </button>
            </div>
          </div>

          {/* Rewards Grid */}
          {visibleRewards.length === 0 ? (
            <EmptyState
              title="Aún no alcanzas el saldo para este filtro"
              description="Responde tu pregunta periódica o realiza un test de 10 preguntas para sumar más puntos."
              actionLabel="Ver todos los premios"
              onAction={() => setFilterMode('all')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userBalance={stats.currentBalance}
                  isRedeemed={redeemedRewardIds.has(reward.id)}
                  onSelect={(r) => {
                    if (
                      stats.currentBalance >= r.points_cost &&
                      (r.stock === null || r.stock > 0)
                    ) {
                      handleOpenRedeemDialog(r);
                    } else {
                      navigate(`/app/rewards/${r.id}`);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* User Redemptions History */}
      <section className="bg-white rounded-[32px] p-5 sm:p-6 card-soft-shadow border border-white">
        <div className="flex items-center gap-2.5 mb-4">
          <TicketCheck className="w-5 h-5 text-[#5149B8]" />
          <h2 className="text-base font-extrabold text-[#202744]">
            Mis Comprobantes de Canje ({myRedemptions.length})
          </h2>
        </div>

        {myRedemptions.length === 0 ? (
          <p className="text-xs text-[#858BA1] py-4">
            Aún no has realizado canjes. Con tu saldo inicial de 61 puntos puedes desbloquear ahora
            mismo la <strong>Insignia Digital: Primeros pasos (30 pts)</strong> o el{' '}
            <strong>Pack de stickers médicos (50 pts)</strong> y ver cómo se ilumina tu álbum.
          </p>
        ) : (
          <div className="space-y-3">
            {myRedemptions.map((red) => {
              const badge = statusBadgeMap[red.status];
              return (
                <div
                  key={red.id}
                  className="p-4 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#5149B8] text-white text-xs font-black tracking-wider">
                        {red.redemption_code}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-[#202744]">{red.reward_name}</h4>
                    <p className="text-[11px] text-[#858BA1]">
                      Canjeado el{' '}
                      {format(new Date(red.created_at), "d 'de' MMM yyyy, HH:mm", { locale: es })}
                      {red.admin_note ? ` • Nota: ${red.admin_note}` : ''}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#5149B8] block">
                      -{red.points_spent} pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <RewardRedemptionDialog
        reward={selectedReward}
        userBalance={stats.currentBalance}
        completedRedemption={completedRedemption}
        errorMessage={redeemError}
        onConfirm={handleConfirmRedemption}
        onClose={() => setSelectedReward(null)}
      />
    </div>
  );
};

export const RewardDetailPage: React.FC = () => {
  const { rewardId } = useParams<{ rewardId: string }>();
  const { user, stats, refreshData } = useApp();
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);
  const [completedRedemption, setCompletedRedemption] = useState<Redemption | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [requestKey, setRequestKey] = useState(() => `${Date.now()}`);

  if (!user || !stats || !rewardId) return null;

  const reward = uroRepository.getRewardById(rewardId);
  if (!reward) {
    return (
      <ErrorState
        title="Premio no encontrado"
        message="La recompensa que buscas no existe en el catálogo."
        onRetry={() => navigate('/app/rewards')}
      />
    );
  }

  const myRedemptions = uroRepository.getUserRedemptions(user.id);
  const isUnlockedInAlbum = myRedemptions.some(
    (r) =>
      r.reward_id === reward.id &&
      r.status !== 'rejected' &&
      r.status !== 'cancelled'
  );

  const canAfford = stats.currentBalance >= reward.points_cost;
  const outOfStock = reward.stock !== null && reward.stock <= 0;

  const handleOpenConfirm = () => {
    setCompletedRedemption(null);
    setRedeemError(null);
    setRequestKey(`${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setRedeemError(null);
    try {
      const red = uroRepository.redeemReward(user.id, reward.id, requestKey);
      setCompletedRedemption(red);
      refreshData();
    } catch (err) {
      setRedeemError(err instanceof Error ? err.message : 'Error al procesar canje.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/app/rewards')}
          className="w-10 h-10 rounded-full bg-white card-soft-shadow flex items-center justify-center text-[#202744] hover:text-[#5149B8] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-base font-extrabold text-[#202744]">Detalle de Recompensa e Insignia</h1>
        <div className="px-3 py-1.5 rounded-full bg-white card-soft-shadow text-xs font-extrabold text-[#5149B8]">
          Saldo: {stats.currentBalance} pts
        </div>
      </div>

      <div className="bg-white rounded-[36px] p-6 sm:p-8 card-soft-shadow border border-white">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-[#5149B8] text-white text-xs font-extrabold inline-block mb-3">
              {reward.category_label}
            </span>
            <h2 className="text-2xl font-extrabold text-[#202744] leading-tight">
              {reward.name}
            </h2>
          </div>
          <div className="shrink-0">
            <AchievementBadgeIcon
              shape={reward.badge_shape || 'flame_3'}
              color={reward.badge_color || 'gold'}
              unlocked={isUnlockedInAlbum || canAfford}
              size="md"
            />
          </div>
        </div>

        <p className="text-sm text-[#858BA1] leading-relaxed mb-6">{reward.description}</p>

        {/* Three Info Boxes */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#F5F7FC] rounded-2xl p-4 text-center">
            <Coins className="w-5 h-5 text-[#5149B8] mx-auto mb-1" />
            <span className="block text-base font-extrabold text-[#202744]">
              {reward.points_cost} pts
            </span>
            <span className="block text-[11px] text-[#858BA1]">Costo requerido</span>
          </div>
          <div className="bg-[#F5F7FC] rounded-2xl p-4 text-center">
            <Package className="w-5 h-5 text-[#5149B8] mx-auto mb-1" />
            <span className="block text-base font-extrabold text-[#202744]">
              {reward.stock === null ? 'Ilimitado' : `${reward.stock} unid.`}
            </span>
            <span className="block text-[11px] text-[#858BA1]">Disponibilidad</span>
          </div>
          <div className="bg-[#F5F7FC] rounded-2xl p-4 text-center">
            {isUnlockedInAlbum ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            ) : canAfford && !outOfStock ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            ) : (
              <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            )}
            <span className="block text-base font-extrabold text-[#202744]">
              {isUnlockedInAlbum
                ? 'En tu Álbum'
                : outOfStock
                ? 'Sin stock'
                : canAfford
                ? 'Habilitado'
                : `-${reward.points_cost - stats.currentBalance} pts`}
            </span>
            <span className="block text-[11px] text-[#858BA1]">Estado</span>
          </div>
        </div>

        <div className="bg-[#F5F7FC] rounded-2xl p-4 mb-6 flex items-start gap-3 text-xs text-[#202744]">
          <ShieldCheck className="w-5 h-5 text-[#5149B8] shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5">Condiciones de entrega y álbum:</strong>
            <span className="text-[#858BA1]">{reward.conditions}</span>
          </div>
        </div>

        {!canAfford && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold mb-4 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Necesitas {reward.points_cost - stats.currentBalance} puntos adicionales para canjear
              y desbloquear esta insignia en tu álbum. ¡Completa un test de 10 preguntas!
            </span>
          </div>
        )}

        <button
          type="button"
          disabled={!canAfford || outOfStock || !reward.is_active}
          onClick={handleOpenConfirm}
          className="w-full py-4 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399e] disabled:opacity-40 text-white font-extrabold text-sm shadow-lg shadow-[#5149B8]/25 transition cursor-pointer"
        >
          {outOfStock
            ? 'Stock agotado'
            : canAfford
            ? `Canjear y desbloquear insignia por ${reward.points_cost} puntos`
            : `Saldo insuficiente (${stats.currentBalance} / ${reward.points_cost} pts)`}
        </button>
      </div>

      <RewardRedemptionDialog
        reward={showDialog ? reward : null}
        userBalance={stats.currentBalance}
        completedRedemption={completedRedemption}
        errorMessage={redeemError}
        onConfirm={handleConfirm}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
};
