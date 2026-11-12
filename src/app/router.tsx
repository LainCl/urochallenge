import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './providers';
import { AppShell } from '../components/layout/AppShell';
import { LoginPage, RegisterPage, OnboardingPage } from '../features/auth/AuthPages';
import { HomePage } from '../features/home/HomePage';
import { PageSkeleton } from '../components/common/Skeleton';

// ================= Code-splitting (V8) =================
// Each feature is loaded on demand so the initial bundle only contains
// the shell, auth and home screen.
const named = <T extends Record<string, unknown>, K extends keyof T>(
  loader: () => Promise<T>,
  key: K
) =>
  lazy(async () => {
    const mod = await loader();
    return { default: mod[key] as unknown as React.ComponentType };
  });

const loadQuiz = () => import('../features/quiz/QuizPages');
const loadRewards = () => import('../features/rewards/RewardsPages');
const loadProfile = () => import('../features/profile/ProfileAndActivityPages');
const loadDictionary = () => import('../features/dictionary/DictionaryPages');
const loadAdminQuestions = () => import('../features/admin/AdminQuestionsPages');
const loadAdminManagement = () => import('../features/admin/AdminManagementPages');

const DailyQuestionPage = named(
  () => import('../features/daily-question/DailyQuestionPage'),
  'DailyQuestionPage'
);
const QuizIntroPage = named(loadQuiz, 'QuizIntroPage');
const QuizSessionPage = named(loadQuiz, 'QuizSessionPage');
const QuizResultPage = named(loadQuiz, 'QuizResultPage');
const RewardsCatalogPage = named(loadRewards, 'RewardsCatalogPage');
const RewardDetailPage = named(loadRewards, 'RewardDetailPage');
const ActivityPage = named(loadProfile, 'ActivityPage');
const ProfilePage = named(loadProfile, 'ProfilePage');
const TrajectoryPage = named(() => import('../features/profile/TrajectoryPage'), 'TrajectoryPage');
const StudyPomodoroPage = named(
  () => import('../features/study/StudyPomodoroPage'),
  'StudyPomodoroPage'
);
const DictionaryMainPage = named(loadDictionary, 'DictionaryMainPage');
const DictionaryTermDetailPage = named(loadDictionary, 'DictionaryTermDetailPage');
const ClinicalCasesPage = named(
  () => import('../features/cases/ClinicalCasesPage'),
  'ClinicalCasesPage'
);

const AdminSidebar = named(() => import('../components/layout/AdminSidebar'), 'AdminSidebar');
const AdminDashboardPage = named(loadAdminQuestions, 'AdminDashboardPage');
const AdminQuestionsListPage = named(loadAdminQuestions, 'AdminQuestionsListPage');
const AdminQuestionFormPage = named(loadAdminQuestions, 'AdminQuestionFormPage');
const AdminCategoriesPage = named(loadAdminManagement, 'AdminCategoriesPage');
const AdminRewardsPage = named(loadAdminManagement, 'AdminRewardsPage');
const AdminRedemptionsPage = named(loadAdminManagement, 'AdminRedemptionsPage');
const AdminUsersPage = named(loadAdminManagement, 'AdminUsersPage');
const AdminSettingsPage = named(loadAdminManagement, 'AdminSettingsPage');
const AdminAuditPage = named(loadAdminManagement, 'AdminAuditPage');
const AdminGamificationPage = named(
  () => import('../features/admin/AdminGamificationPage'),
  'AdminGamificationPage'
);
const AdminDictionaryPage = named(
  () => import('../features/admin/AdminDictionaryPage'),
  'AdminDictionaryPage'
);

const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
          <PageSkeleton />
        </div>
      }
    >
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
          <Route path="dictionary" element={<DictionaryMainPage />} />
          <Route path="dictionary/:slug" element={<DictionaryTermDetailPage />} />
          <Route path="trajectory" element={<TrajectoryPage />} />
          <Route path="daily-question" element={<DailyQuestionPage />} />
          <Route path="quiz" element={<QuizIntroPage />} />
          <Route path="quiz/:sessionId" element={<QuizSessionPage />} />
          <Route path="quiz/:sessionId/result" element={<QuizResultPage />} />
          <Route path="cases" element={<ClinicalCasesPage />} />
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
          <Route path="dictionary" element={<AdminDictionaryPage />} />
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
    </Suspense>
  );
};
