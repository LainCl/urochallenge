import React from 'react';
import {
  Activity,
  ShieldAlert,
  Gem,
  Layers,
  Microscope,
  Droplets,
  UserCheck,
  Siren,
  HeartPulse,
  Stethoscope,
  Award,
  BookOpen,
  ClipboardList,
  Pill,
  Baby,
  RefreshCw,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  ShieldAlert,
  Gem,
  Layers,
  Microscope,
  Droplets,
  UserCheck,
  Siren,
  HeartPulse,
  Stethoscope,
  Award,
  BookOpen,
  ClipboardList,
  Pill,
  Baby,
  RefreshCw,
};

export const CategoryIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-5 h-5',
}) => {
  const IconComp = iconMap[name] || Stethoscope;
  return <IconComp className={className} />;
};
