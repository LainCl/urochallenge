import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './providers';
import { AppShell } from '../components/layout/AppShell';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { LoginPage, RegisterPage, OnboardingPage } from '../features/auth/AuthPages';
import { HomePage } from '../features/home/HomePage';
import { DailyQuestionPage } from '../features/daily-question/DailyQuestionPage';
import {
  QuizIntroPage,
  QuizSessionPage,
  QuizResultPage,
} from '../features/quiz/QuizPages';
import {
  RewardsCatalogPage,
  RewardDetailPage,
} from '../features/rewards/RewardsPages';
import {
  ActivityPage,
  ProfilePage,
} from '../features/profile/ProfileAndActivityPages';
import { TrajectoryPage } from '../features/profile/TrajectoryPage';
import { StudyPomodoroPage } from '../features/study/StudyPomodoroPage';
import {
  AdminDashboardPage,
  AdminQuestionsListPage,
  AdminQuestionFormPage,
} from '../features/admin/AdminQuestionsPages';
import {
  AdminCategoriesPage,
  AdminRewardsPage,
  AdminRedemptionsPage,
  AdminUsersPage,
  AdminSettingsPage,
  AdminAuditPage,
} from '../features/admin/AdminManagementPages';
import { AdminGamificationPage } from '../features/admin/AdminGamificationPage';

const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public & Onboarding Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Main User App Routes */}
      <Route
        path="/app"
        element={
          <ProtectedUserRoute>
            <AppShell />
          </ProtectedUserRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="trajectory" element={<TrajectoryPage />} />
        <Route path="daily-question" element={<DailyQuestionPage />} />
        <Route path="quiz" element={<QuizIntroPage />} />
        <Route path="quiz/:sessionId" element={<QuizSessionPage />} />
        <Route path="quiz/:sessionId/result" element={<QuizResultPage />} />
        <Route path="study" element={<StudyPomodoroPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="rewards" element={<RewardsCatalogPage />} />
        <Route path="rewards/:rewardId" element={<RewardDetailPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedUserRoute>
            <AdminSidebar />
          </ProtectedUserRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="gamification" element={<AdminGamificationPage />} />
        <Route path="questions" element={<AdminQuestionsListPage />} />
        <Route path="questions/new" element={<AdminQuestionFormPage />} />
        <Route path="questions/:id" element={<AdminQuestionFormPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="rewards" element={<AdminRewardsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="redemptions" element={<AdminRedemptionsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="audit" element={<AdminAuditPage />} />
      </Route>

      {/* Default Fallback */}
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
};
