import React from 'react';
import { BadgeShape, BadgeColorTheme } from '../../types/domain';

interface AchievementBadgeIconProps {
  shape?: BadgeShape;
  color?: BadgeColorTheme;
  unlocked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PALETTES: Record<
  BadgeColorTheme | 'locked',
  {
    borderOuter: string;
    borderInner: string;
    bgDark: string;
    mainFill: string;
    accentFill: string;
    starFill: string;
    glow: string;
  }
> = {
  gold: {
    borderOuter: '#E5A93B',
    borderInner: '#FBE086',
    bgDark: '#3A2607',
    mainFill: '#E59A24',
    accentFill: '#FFD86B',
    starFill: '#F7C948',
    glow: 'drop-shadow(0 6px 14px rgba(229, 169, 59, 0.35))',
  },
  blue: {
    borderOuter: '#93A8C1',
    borderInner: '#D1E2F5',
    bgDark: '#0D2444',
    mainFill: '#1B76DF',
    accentFill: '#64B5F6',
    starFill: '#4299E1',
    glow: 'drop-shadow(0 6px 14px rgba(27, 118, 223, 0.35))',
  },
  green: {
    borderOuter: '#9A8C56',
    borderInner: '#D1C592',
    bgDark: '#0D331E',
    mainFill: '#249E57',
    accentFill: '#6EE799',
    starFill: '#48BB78',
    glow: 'drop-shadow(0 6px 14px rgba(36, 158, 87, 0.35))',
  },
  locked: {
    borderOuter: '#787E87',
    borderInner: '#9FA5AE',
    bgDark: '#8C929B',
    mainFill: '#7D838C',
    accentFill: '#969CA6',
    starFill: '#838992',
    glow: 'none',
  },
};

const StarPolygon: React.FC<{ cx: number; cy: number; r?: number; fill: string; stroke: string }> = ({
  cx,
  cy,
  r = 5.5,
  fill,
  stroke,
}) => {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.45;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <polygon
      points={points.join(' ')}
      fill={fill}
      stroke={stroke}
      strokeWidth="1"
      strokeLinejoin="round"
    />
  );
};

export const AchievementBadgeIcon: React.FC<AchievementBadgeIconProps> = ({
  shape = 'flame_3',
  color = 'gold',
  unlocked = true,
  size = 'md',
}) => {
  const palette = unlocked ? PALETTES[color] : PALETTES.locked;
  const dims =
    size === 'sm' ? 'w-14 h-14' : size === 'lg' ? 'w-28 h-28' : 'w-20 h-20';

  const renderStars = (count: number) => {
    if (count === 2) {
      return (
        <>
          <StarPolygon cx={38} cy={27} fill={palette.starFill} stroke={palette.borderInner} />
          <StarPolygon cx={62} cy={27} fill={palette.starFill} stroke={palette.borderInner} />
        </>
      );
    }
    if (count === 3) {
      return (
        <>
          <StarPolygon cx={33} cy={31} fill={palette.starFill} stroke={palette.borderInner} />
          <StarPolygon cx={50} cy={23} fill={palette.starFill} stroke={palette.borderInner} />
          <StarPolygon cx={67} cy={31} fill={palette.starFill} stroke={palette.borderInner} />
        </>
      );
    }
    if (count === 4) {
      return (
        <>
          <StarPolygon cx={28} cy={36} r={5} fill={palette.starFill} stroke={palette.borderInner} />
          <StarPolygon cx={42} cy={25} r={5} fill={palette.starFill} stroke={palette.borderInner} />
          <StarPolygon cx={58} cy={25} r={5} fill={palette.starFill} stroke={palette.borderInner} />
          <StarPolygon cx={72} cy={36} r={5} fill={palette.starFill} stroke={palette.borderInner} />
        </>
      );
    }
    return (
      <>
        <StarPolygon cx={25} cy={39} r={4.6} fill={palette.starFill} stroke={palette.borderInner} />
        <StarPolygon cx={36} cy={28} r={4.6} fill={palette.starFill} stroke={palette.borderInner} />
        <StarPolygon cx={50} cy={22} r={4.8} fill={palette.starFill} stroke={palette.borderInner} />
        <StarPolygon cx={64} cy={28} r={4.6} fill={palette.starFill} stroke={palette.borderInner} />
        <StarPolygon cx={75} cy={39} r={4.6} fill={palette.starFill} stroke={palette.borderInner} />
      </>
    );
  };

  // Achievements 8, 9, 10, 11: Hexagonal shield with flame + 2/3/4/5 stars
  if (
    shape === 'flame_2' ||
    shape === 'flame_3' ||
    shape === 'flame_4' ||
    shape === 'flame_5'
  ) {
    const starCount =
      shape === 'flame_2' ? 2 : shape === 'flame_3' ? 3 : shape === 'flame_4' ? 4 : 5;

    return (
      <svg
        viewBox="0 0 100 100"
        className={`${dims} select-none transition-transform duration-200`}
        style={{ filter: palette.glow }}
      >
        {/* Hex-shield base */}
        <path
          d="M50 6 L86 25 L86 60 C86 78 69 92 50 95 C31 92 14 78 14 60 L14 25 Z"
          fill={palette.bgDark}
          stroke={palette.borderOuter}
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <path
          d="M50 10 L82 27.5 L82 59 C82 74.5 67 87.5 50 90.5 C33 87.5 18 74.5 18 59 L18 27.5 Z"
          fill="none"
          stroke={palette.borderInner}
          strokeWidth="1.4"
          opacity="0.75"
        />

        {renderStars(starCount)}

        {/* Outer Flame */}
        <path
          d="M50 35 C56 45 69 51 69 66 C69 78 60 86 50 86 C40 86 31 78 31 66 C31 54 41 47 50 35 Z"
          fill={palette.mainFill}
          stroke={palette.borderInner}
          strokeWidth="2"
        />
        {/* Inner Flame Core */}
        <path
          d="M51 51 C55 58 61 62 61 70 C61 77 56 82 50 82 C44 82 40 77 40 70 C40 64 45 59 51 51 Z"
          fill={palette.accentFill}
          opacity="0.9"
        />
      </svg>
    );
  }

  // Achievement 12: Circular Trophy Cup with Checkmark
  if (shape === 'trophy') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${dims} select-none transition-transform duration-200`}
        style={{ filter: palette.glow }}
      >
        <circle
          cx="50"
          cy="52"
          r="40"
          fill={palette.bgDark}
          stroke={palette.borderOuter}
          strokeWidth="4.5"
        />
        <circle
          cx="50"
          cy="52"
          r="35"
          fill="none"
          stroke={palette.borderInner}
          strokeWidth="1.5"
          strokeDasharray="6 3"
          opacity="0.75"
        />
        {/* Top Checkmark Badge */}
        <circle
          cx="50"
          cy="24"
          r="12"
          fill={palette.mainFill}
          stroke={palette.borderInner}
          strokeWidth="2"
        />
        <path
          d="M44 24 L48 28 L56 20"
          fill="none"
          stroke={palette.borderInner}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trophy Handles */}
        <path
          d="M31 40 H23 C23 51 28 56 35 56"
          fill="none"
          stroke={palette.borderInner}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M69 40 H77 C77 51 72 56 65 56"
          fill="none"
          stroke={palette.borderInner}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Trophy Cup Body */}
        <path
          d="M31 36 H69 V50 C69 62 60 69 50 69 C40 69 31 62 31 50 Z"
          fill={palette.mainFill}
          stroke={palette.borderInner}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Play Triangle inside Trophy */}
        <polygon points="46,45 46,57 57,51" fill={palette.bgDark} />
        {/* Stem & Base */}
        <rect x="46" y="69" width="8" height="10" fill={palette.mainFill} />
        <rect
          x="36"
          y="79"
          width="28"
          height="6"
          rx="2"
          fill={palette.accentFill}
          stroke={palette.borderInner}
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // Achievement 13: Tall Elongated Hexagon with Sprout & Roots
  if (shape === 'sprout') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${dims} select-none transition-transform duration-200`}
        style={{ filter: palette.glow }}
      >
        <polygon
          points="50,5 79,23 79,77 50,95 21,77 21,23"
          fill={palette.bgDark}
          stroke={palette.borderOuter}
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <polygon
          points="50,10 74,25 74,75 50,90 26,75 26,25"
          fill="none"
          stroke={palette.borderInner}
          strokeWidth="1.3"
          opacity="0.7"
        />
        {/* Top rays */}
        <line x1="50" y1="16" x2="50" y2="23" stroke={palette.borderInner} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="41" y1="19" x2="44" y2="25" stroke={palette.borderInner} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="59" y1="19" x2="56" y2="25" stroke={palette.borderInner} strokeWidth="2.2" strokeLinecap="round" />

        {/* Sprout Leaves */}
        <path
          d="M50 48 C50 36 37 31 29 36 C29 46 39 50 50 48 Z"
          fill={palette.mainFill}
          stroke={palette.borderInner}
          strokeWidth="1.8"
        />
        <path
          d="M50 48 C50 36 63 31 71 36 C71 46 61 50 50 48 Z"
          fill={palette.accentFill}
          stroke={palette.borderInner}
          strokeWidth="1.8"
        />
        {/* Ground & Roots */}
        <path
          d="M25 60 Q50 55 75 60 L75 75 L50 90 L25 75 Z"
          fill={palette.mainFill}
          opacity="0.45"
        />
        <line x1="50" y1="47" x2="50" y2="86" stroke={palette.borderInner} strokeWidth="2.5" />
        <path d="M50 64 L36 76" stroke={palette.borderInner} strokeWidth="2" strokeLinecap="round" />
        <path d="M50 64 L64 76" stroke={palette.borderInner} strokeWidth="2" strokeLinecap="round" />
        <path d="M50 72 L40 82" stroke={palette.borderInner} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M50 72 L60 82" stroke={palette.borderInner} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Achievement 14: Laurel Wreath + Central Flame + Stars
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${dims} select-none transition-transform duration-200`}
      style={{ filter: palette.glow }}
    >
      {/* Outer Medallion Base */}
      <circle
        cx="50"
        cy="54"
        r="37"
        fill={palette.bgDark}
        stroke={palette.borderOuter}
        strokeWidth="4"
      />
      {/* Laurel Wreath Left & Right */}
      <path
        d="M42 85 C23 80 15 62 20 42 C24 55 30 68 42 77"
        fill="none"
        stroke={palette.borderInner}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="5 3"
      />
      <path
        d="M58 85 C77 80 85 62 80 42 C76 55 70 68 58 77"
        fill="none"
        stroke={palette.borderInner}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="5 3"
      />
      {/* Central Large Flame */}
      <path
        d="M50 14 C60 28 73 39 73 57 C73 71 63 80 50 80 C37 80 27 71 27 57 C27 41 40 29 50 14 Z"
        fill={palette.mainFill}
        stroke={palette.borderInner}
        strokeWidth="2.5"
      />
      <path
        d="M50 33 C56 43 63 49 63 59 C63 67 57 73 50 73 C43 73 37 67 37 59 C37 49 44 43 50 33 Z"
        fill={palette.accentFill}
        opacity="0.9"
      />
      <StarPolygon cx={50} cy={61} r={6.5} fill={palette.bgDark} stroke={palette.borderInner} />
      <StarPolygon cx={50} cy={86} r={6} fill={palette.starFill} stroke={palette.borderInner} />
    </svg>
  );
};
