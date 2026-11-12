import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * AnimatedNumber: smoothly counts from the previous value to the new value.
 * Respects prefers-reduced-motion.
 */
export const AnimatedNumber: React.FC<{
  value: number;
  durationMs?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}> = ({ value, durationMs = 700, className, suffix = '', prefix = '' }) => {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const from = fromRef.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = value;
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

const CONFETTI_COLORS = ['#5149B8', '#7778ED', '#83D0E5', '#C3F574', '#F59E0B', '#F43F5E'];

/**
 * ConfettiBurst: lightweight CSS confetti (no external dependency).
 * Renders a fixed overlay that auto-removes after the animation finishes.
 */
export const ConfettiBurst: React.FC<{ active: boolean; pieces?: number; durationMs?: number }> = ({
  active,
  pieces = 90,
  durationMs = 3200,
}) => {
  const [visible, setVisible] = useState(active);

  useEffect(() => {
    if (!active) return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), durationMs);
    return () => clearTimeout(t);
  }, [active, durationMs]);

  const confetti = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2 + Math.random() * 1.4,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 220,
        size: 6 + Math.random() * 7,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        round: Math.random() > 0.6,
      })),
    // regenerate on each activation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, pieces]
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[70] overflow-hidden" aria-hidden="true">
      {confetti.map((c) => (
        <span
          key={c.id}
          className="uc-confetti-piece"
          style={
            {
              left: `${c.left}%`,
              width: `${c.size}px`,
              height: `${c.round ? c.size : c.size * 0.45}px`,
              backgroundColor: c.color,
              borderRadius: c.round ? '9999px' : '2px',
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              '--uc-drift': `${c.drift}px`,
              '--uc-rotate': `${c.rotate + 540}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

/**
 * FloatingPoints: "+N pts" badge that pops and floats up once.
 */
export const FloatingPoints: React.FC<{ amount: number; className?: string }> = ({
  amount,
  className = '',
}) => {
  if (amount <= 0) return null;
  return (
    <span
      className={`uc-float-up inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#C3F574] text-[#202744] text-meta font-black shadow-sm ${className}`}
    >
      +{amount} pts
    </span>
  );
};
