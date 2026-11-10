import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Timer, Gift, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const navItems = [
    { to: '/app', label: 'Inicio', icon: Home, end: true },
    { to: '/app/dictionary', label: 'Diccionario', icon: BookOpen, end: false },
    { to: '/app/study', label: 'Estudio', icon: Timer, end: false },
    { to: '/app/rewards', label: 'Premios', icon: Gift, end: false },
    { to: '/app/profile', label: 'Perfil', icon: User, end: false },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden pointer-events-none">
      <nav
        aria-label="Navegación inferior"
        className="max-w-md mx-auto glass-nav rounded-full p-2 flex items-center justify-around border border-white/80 pointer-events-auto"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-3.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#5149B8] text-white shadow-md shadow-[#5149B8]/30 scale-105'
                    : 'text-[#858BA1] hover:text-[#202744]'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold mt-0.5 tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
