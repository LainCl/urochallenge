import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Profile, UserStatsSummary, AppSettings, UserProgressionSummary } from '../types/domain';
import { uroRepository } from '../services/uroRepository';
import { isSupabaseConfigured } from '../lib/supabase';

interface AppContextValue {
  user: Profile | null;
  stats: UserStatsSummary | null;
  progression: UserProgressionSummary | null;
  settings: AppSettings;
  isDemoMode: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  refreshData: () => void;
  acknowledgeLevelUps: (historyIds?: string[]) => void;
  loginAsDemo: (roleOrUserId: 'user' | 'admin' | string) => Profile;
  loginWithCredentials: (email: string, password?: string) => Profile;
  registerNewUser: (
    displayName: string,
    email: string,
    specialtyLabel?: string,
    password?: string
  ) => Profile;
  logout: () => void;
  updateCurrentUserProfile: (
    updates: Partial<Pick<Profile, 'display_name' | 'specialty_label' | 'timezone' | 'reminders_enabled' | 'reminder_time' | 'onboarding_completed'>>
  ) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(() => uroRepository.getCurrentUser());
  const [stats, setStats] = useState<UserStatsSummary | null>(() => {
    const current = uroRepository.getCurrentUser();
    return current ? uroRepository.getUserStats(current.id) : null;
  });
  const [progression, setProgression] = useState<UserProgressionSummary | null>(() => {
    const current = uroRepository.getCurrentUser();
    return current ? uroRepository.getUserProgression(current.id) : null;
  });
  const [settings, setSettings] = useState<AppSettings>(() => uroRepository.getAppSettings());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('urochallenge_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // ignore storage errors
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('urochallenge_theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const refreshData = useCallback(() => {
    const current = uroRepository.getCurrentUser();
    setUser(current);
    if (current) {
      setStats(uroRepository.getUserStats(current.id));
      setProgression(uroRepository.getUserProgression(current.id));
    } else {
      setStats(null);
      setProgression(null);
    }
    setSettings(uroRepository.getAppSettings());
  }, []);

  const acknowledgeLevelUps = useCallback(
    (historyIds?: string[]) => {
      if (!user) return;
      uroRepository.acknowledgeLevelUpNotifications(user.id, historyIds);
      refreshData();
    },
    [user, refreshData]
  );

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const loginAsDemo = useCallback(
    (roleOrUserId: 'user' | 'admin' | string) => {
      const logged = uroRepository.loginWithDemoRole(roleOrUserId);
      refreshData();
      return logged;
    },
    [refreshData]
  );

  const loginWithCredentials = useCallback(
    (email: string, password?: string) => {
      const logged = uroRepository.authenticateUser(email, password);
      refreshData();
      return logged;
    },
    [refreshData]
  );

  const registerNewUser = useCallback(
    (displayName: string, email: string, specialtyLabel?: string, password?: string) => {
      const created = uroRepository.registerUser(displayName, email, specialtyLabel, password);
      refreshData();
      return created;
    },
    [refreshData]
  );

  const logout = useCallback(() => {
    uroRepository.logout();
    setUser(null);
    setStats(null);
    setProgression(null);
  }, []);

  const updateCurrentUserProfile = useCallback(
    (
      updates: Partial<
        Pick<
          Profile,
          | 'display_name'
          | 'specialty_label'
          | 'timezone'
          | 'reminders_enabled'
          | 'reminder_time'
          | 'onboarding_completed'
        >
      >
    ) => {
      if (!user) return;
      uroRepository.updateProfile(user.id, updates);
      refreshData();
    },
    [user, refreshData]
  );

  const resetDemoData = useCallback(() => {
    uroRepository.resetDemoDatabase();
    uroRepository.loginWithDemoRole('user');
    refreshData();
  }, [refreshData]);

  return (
    <AppContext.Provider
      value={{
        user,
        stats,
        progression,
        settings,
        isDemoMode: !isSupabaseConfigured,
        theme,
        toggleTheme,
        refreshData,
        acknowledgeLevelUps,
        loginAsDemo,
        loginWithCredentials,
        registerNewUser,
        logout,
        updateCurrentUserProfile,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp debe usarse dentro de un AppProvider');
  }
  return ctx;
}
