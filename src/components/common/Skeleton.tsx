import React from 'react';

/** Base shimmering block */
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`uc-skeleton rounded-2xl ${className}`} aria-hidden="true" />
);

/** Generic card skeleton */
export const CardSkeleton: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => (
  <div
    className={`bg-white rounded-[28px] p-5 card-soft-shadow border border-white space-y-3 ${className}`}
  >
    <div className="flex items-center gap-3">
      <Skeleton className="w-11 h-11 rounded-2xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
    ))}
  </div>
);

/** Full-page skeleton used as Suspense fallback for lazy routes */
export const PageSkeleton: React.FC<{ label?: string }> = ({ label = 'Cargando sección...' }) => (
  <div className="space-y-5" role="status" aria-live="polite" aria-label={label}>
    <div className="flex items-center justify-between">
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="w-10 h-10 rounded-full" />
    </div>
    <div className="rounded-[32px] p-6 bg-[#5149B8]/10 space-y-3">
      <Skeleton className="w-12 h-12 rounded-2xl" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      <CardSkeleton lines={2} />
      <CardSkeleton lines={2} />
      <CardSkeleton lines={2} />
    </div>
    <span className="sr-only">{label}</span>
  </div>
);

/** Compact skeleton for in-modal tab content */
export const PanelSkeleton: React.FC = () => (
  <div className="space-y-4" role="status" aria-label="Cargando">
    <CardSkeleton lines={2} />
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-3xl p-4 card-soft-shadow space-y-2">
          <Skeleton className="w-9 h-9 rounded-xl" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  </div>
);
