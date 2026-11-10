import React from 'react';
import {
  Gift,
  Coins,
  CheckCircle2,
  Lock,
  Sparkles,
  X,
  ShieldCheck,
  ArrowUpRight,
  Package,
  Award,
} from 'lucide-react';
import { Reward, Redemption, AutoAchievement } from '../../types/domain';
import { AchievementBadgeIcon } from './AchievementBadgeIcon';

export const RewardCard: React.FC<{
  reward: Reward;
  userBalance: number;
  isRedeemed?: boolean;
  onSelect: (reward: Reward) => void;
}> = ({ reward, userBalance, isRedeemed = false, onSelect }) => {
  const canAfford = userBalance >= reward.points_cost;
  const outOfStock = reward.stock !== null && reward.stock <= 0;
  const isAvailable = reward.is_active && !outOfStock;

  return (
    <div
      onClick={() => onSelect(reward)}
      className="bg-white rounded-[28px] p-5 card-soft-shadow border border-slate-100 hover:border-[#5149B8]/35 transition flex flex-col justify-between cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#83D0E5]/25 text-[#202744]">
            {reward.category_label}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
              isRedeemed
                ? 'bg-emerald-100 text-emerald-800'
                : canAfford && isAvailable
                ? 'bg-[#C3F574] text-[#202744]'
                : 'bg-[#F5F7FC] text-[#5149B8]'
            }`}
          >
            {isRedeemed ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> En tu Álbum ({reward.points_cost} pts)
              </>
            ) : (
              <>
                <Coins className="w-3.5 h-3.5" />
                {reward.points_cost} pts
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3.5 mb-3.5">
          {reward.badge_shape ? (
            <div className="shrink-0 group-hover:scale-105 transition">
              <AchievementBadgeIcon
                shape={reward.badge_shape}
                color={reward.badge_color || 'gold'}
                unlocked={true}
                size="sm"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5149B8] to-[#7778ED] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition shrink-0">
              <Gift className="w-6 h-6" />
            </div>
          )}

          <h3 className="text-base font-extrabold text-[#202744] leading-snug">
            {reward.name}
          </h3>
        </div>

        <p className="text-xs text-[#858BA1] line-clamp-2 leading-relaxed mb-4">
          {reward.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#858BA1]">
          <Package className="w-3.5 h-3.5 text-[#5149B8]" />
          <span>
            {outOfStock
              ? 'Agotado'
              : reward.stock === null
              ? 'Stock ilimitado'
              : `${reward.stock} disponibles`}
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1.5 rounded-full transition ${
            canAfford && isAvailable
              ? 'bg-[#5149B8] text-white group-hover:bg-[#40389a]'
              : 'bg-slate-100 text-[#858BA1]'
          }`}
        >
          {outOfStock ? (
            'Sin stock'
          ) : canAfford ? (
            <>
              {isRedeemed ? 'Canjear otra vez' : 'Canjear'}{' '}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <Lock className="w-3 h-3" /> Faltan {reward.points_cost - userBalance} pts
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export const RewardsAlbumSection: React.FC<{
  rewards: Reward[];
  redemptions: Redemption[];
  autoAchievements: AutoAchievement[];
  userBalance: number;
  onSelectReward: (reward: Reward) => void;
}> = ({
  rewards,
  redemptions,
  autoAchievements,
  userBalance,
  onSelectReward,
}) => {
  const activeRedemptionIds = new Set(
    redemptions
      .filter((r) => r.status !== 'rejected' && r.status !== 'cancelled')
      .map((r) => r.reward_id)
  );

  const unlockedRewardsCount = rewards.filter((r) => activeRedemptionIds.has(r.id)).length;
  const unlockedAutoCount = autoAchievements.filter((a) => a.unlocked).length;
  const totalAlbumSlots = rewards.length + autoAchievements.length;
  const totalUnlocked = unlockedRewardsCount + unlockedAutoCount;
  const completionPct = Math.round((totalUnlocked / Math.max(1, totalAlbumSlots)) * 100);

  return (
    <div className="space-y-6">
      {/* Album Progress Header */}
      <div className="bg-[#181C32] text-white rounded-[32px] p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#5149B8] flex items-center justify-center text-[#C3F574]">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#83D0E5] block">
                Colección Oficial UroChallenge
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Álbum de Insignias y Recompensas
              </h2>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl px-4 py-2.5 text-left sm:text-right">
            <span className="text-xs text-white/75 block">Progreso del Álbum</span>
            <span className="text-lg font-black text-[#C3F574]">
              {totalUnlocked} / {totalAlbumSlots} desbloqueadas ({completionPct}%)
            </span>
          </div>
        </div>

        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7778ED] via-[#83D0E5] to-[#C3F574] transition-all duration-500"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <p className="text-xs text-white/70">
          Las insignias en gris están pendientes de desbloqueo. Al canjear una recompensa o cumplir
          un hito académico, su insignia se ilumina a todo color en tu álbum.
        </p>
      </div>

      {/* Part 1: Automatic Milestone Badges */}
      <section className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5149B8]">
              Sección 1 • Desbloqueo Automático por Mérito
            </span>
            <h3 className="text-lg font-extrabold text-[#202744]">
              Insignias por Logros Académicos ({unlockedAutoCount}/{autoAchievements.length})
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {autoAchievements.map((ach) => (
            <div
              key={ach.id}
              className={`rounded-3xl p-4 text-center border transition-all flex flex-col items-center justify-between ${
                ach.unlocked
                  ? 'bg-gradient-to-b from-[#202744] to-[#161B30] text-white border-[#5149B8]/40 shadow-md'
                  : 'bg-[#F5F7FC] text-[#858BA1] border-slate-200/70'
              }`}
            >
              <div className="my-2">
                <AchievementBadgeIcon
                  shape={ach.badge_shape}
                  color={ach.badge_color}
                  unlocked={ach.unlocked}
                  size="md"
                />
              </div>

              <div className="w-full">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase mb-1.5 ${
                    ach.unlocked
                      ? 'bg-[#C3F574] text-[#202744]'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {ach.unlocked ? '¡Logro Desbloqueado!' : `Progreso: ${ach.progress}/${ach.target}`}
                </span>
                <h4
                  className={`text-xs sm:text-sm font-extrabold leading-snug mb-1 ${
                    ach.unlocked ? 'text-white' : 'text-[#202744]'
                  }`}
                >
                  {ach.name}
                </h4>
                <p
                  className={`text-[11px] leading-relaxed ${
                    ach.unlocked ? 'text-white/75' : 'text-[#858BA1]'
                  }`}
                >
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 2: Redeemable Catalog Badges Album */}
      <section className="bg-white rounded-[32px] p-6 card-soft-shadow border border-white">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5149B8]">
              Sección 2 • Colección Canjeable con Puntos
            </span>
            <h3 className="text-lg font-extrabold text-[#202744]">
              Álbum de Recompensas e Insignias ({unlockedRewardsCount}/{rewards.length})
            </h3>
          </div>
          <span className="text-xs font-bold text-[#858BA1]">
            Haz clic en cualquier insignia gris para canjearla y rellenar tu álbum
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {rewards.map((reward) => {
            const isUnlocked = activeRedemptionIds.has(reward.id);
            const canAfford = userBalance >= reward.points_cost;

            return (
              <button
                key={reward.id}
                type="button"
                onClick={() => onSelectReward(reward)}
                className={`rounded-3xl p-4 text-center border transition-all flex flex-col items-center justify-between cursor-pointer group ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-[#202744] to-[#14182B] text-white border-[#7778ED]/50 shadow-lg scale-[1.01]'
                    : 'bg-[#F5F7FC] hover:bg-white text-[#858BA1] border-slate-200/80 hover:border-[#5149B8]/40'
                }`}
              >
                <div className="w-full flex items-center justify-between text-[10px] font-extrabold mb-1">
                  <span
                    className={`px-2 py-0.5 rounded-full truncate ${
                      isUnlocked
                        ? 'bg-white/15 text-[#83D0E5]'
                        : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {reward.category_label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full shrink-0 ${
                      isUnlocked
                        ? 'bg-[#C3F574] text-[#202744]'
                        : canAfford
                        ? 'bg-[#5149B8] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? 'Completado' : `${reward.points_cost} pts`}
                  </span>
                </div>

                <div className="my-2 group-hover:scale-105 transition-transform">
                  <AchievementBadgeIcon
                    shape={reward.badge_shape || 'flame_3'}
                    color={reward.badge_color || 'gold'}
                    unlocked={isUnlocked}
                    size="md"
                  />
                </div>

                <div className="w-full mt-1">
                  <h4
                    className={`text-xs sm:text-sm font-extrabold leading-snug mb-1 ${
                      isUnlocked ? 'text-white' : 'text-[#202744]'
                    }`}
                  >
                    {reward.name}
                  </h4>
                  <span
                    className={`text-[11px] font-bold block ${
                      isUnlocked
                        ? 'text-[#C3F574]'
                        : canAfford
                        ? 'text-[#5149B8] group-hover:underline'
                        : 'text-[#858BA1]'
                    }`}
                  >
                    {isUnlocked
                      ? '✓ Insignia en tu álbum'
                      : canAfford
                      ? '¡Disponible para canjear!'
                      : `Faltan ${reward.points_cost - userBalance} pts`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export const RewardRedemptionDialog: React.FC<{
  reward: Reward | null;
  userBalance: number;
  completedRedemption: Redemption | null;
  errorMessage: string | null;
  onConfirm: () => void;
  onClose: () => void;
}> = ({
  reward,
  userBalance,
  completedRedemption,
  errorMessage,
  onConfirm,
  onClose,
}) => {
  if (!reward) return null;

  const remainingBalance = userBalance - reward.points_cost;

  return (
    <div className="fixed inset-0 z-50 bg-[#202744]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-7 card-soft-shadow border border-white relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#202744] absolute top-5 right-5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {completedRedemption ? (
          <div className="text-center py-2">
            <div className="flex justify-center mb-3">
              <AchievementBadgeIcon
                shape={reward.badge_shape || 'trophy'}
                color={reward.badge_color || 'gold'}
                unlocked={true}
                size="lg"
              />
            </div>
            <span className="px-3 py-1 rounded-full bg-[#C3F574] text-[#202744] text-xs font-extrabold uppercase tracking-wider">
              ¡Insignia Desbloqueada en tu Álbum!
            </span>
            <h3 className="text-xl font-extrabold text-[#202744] mt-3 mb-1">
              {completedRedemption.reward_name}
            </h3>
            <p className="text-xs text-[#858BA1] mb-5">
              Se descontaron {completedRedemption.points_spent} puntos de tu cuenta y la insignia ya
              brilla a todo color en tu Álbum de Recompensas.
            </p>

            <div className="bg-[#F5F7FC] rounded-2xl p-4 border-2 border-dashed border-[#5149B8]/30 mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#858BA1] block mb-1">
                Código Único de Comprobante
              </span>
              <span className="text-xl font-black tracking-widest text-[#5149B8]">
                {completedRedemption.redemption_code}
              </span>
              <span className="block text-[11px] text-[#858BA1] mt-1">
                Estado inicial: Pendiente de entrega / validación
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-full bg-[#5149B8] hover:bg-[#41399c] text-white font-extrabold text-sm transition cursor-pointer"
            >
              Ver mi Álbum actualizado
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <AchievementBadgeIcon
                shape={reward.badge_shape || 'flame_3'}
                color={reward.badge_color || 'gold'}
                unlocked={true}
                size="sm"
              />
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5149B8] block">
                  {reward.category_label}
                </span>
                <h3 className="text-lg font-extrabold text-[#202744]">
                  Confirmar Canje y Desbloqueo
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#858BA1] mb-4 leading-relaxed">
              Al confirmar el canje obtendrás tu código único y rellenarás esta insignia a todo
              color en tu Álbum de Recompensas.
            </p>

            <div className="bg-[#F5F7FC] rounded-2xl p-4 mb-4 space-y-2.5 border border-slate-200/60">
              <div className="font-extrabold text-sm text-[#202744]">{reward.name}</div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/70">
                <span className="text-[#858BA1]">Tu saldo actual:</span>
                <span className="font-bold text-[#202744]">{userBalance} pts</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#858BA1]">Costo del premio:</span>
                <span className="font-extrabold text-rose-600">-{reward.points_cost} pts</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/70">
                <span className="font-bold text-[#202744]">Saldo posterior al canje:</span>
                <span className="font-extrabold text-[#5149B8]">{remainingBalance} pts</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#858BA1] bg-slate-50 p-3 rounded-xl mb-4">
              <ShieldCheck className="w-4 h-4 text-[#5149B8] shrink-0 mt-0.5" />
              <span>Condiciones: {reward.conditions}</span>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 mb-4">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-[#202744] font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={remainingBalance < 0}
                onClick={onConfirm}
                className="flex-1 py-3 px-4 rounded-full bg-[#5149B8] hover:bg-[#41399c] disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#5149B8]/25 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C3F574]" />
                <span>Confirmar Canje</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
