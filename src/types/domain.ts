export type UserRole = 'user' | 'editor' | 'admin';

export interface Profile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  role: UserRole;
  specialty_label?: string;
  password?: string;
  timezone: string;
  reminders_enabled: boolean;
  reminder_time: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type QuestionDifficulty = 'basic' | 'intermediate' | 'advanced';
export type QuestionStatus = 'draft' | 'review' | 'published' | 'archived';

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  sort_order: number;
}

export interface Question {
  id: string;
  category_id: string;
  question_text: string;
  difficulty: QuestionDifficulty;
  explanation: string;
  reference_text: string | null;
  tags: string[];
  status: QuestionStatus;
  is_demo_content: boolean;
  created_by: string;
  reviewed_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  options: QuestionOption[];
}

export type ScheduleIntervalUnit = 'hours' | 'days';

export interface QuestionSchedule {
  id: string;
  name: string;
  preset: 'daily' | 'every_2_days' | 'every_3_days' | 'weekly' | 'custom';
  interval_value: number;
  interval_unit: ScheduleIntervalUnit;
  starts_at: string;
  allow_retries: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type AssignmentStatus = 'available' | 'answered' | 'expired';

export interface DailyAssignment {
  id: string;
  user_id: string;
  question_id: string;
  period_key: string; // Prevents duplicate assignment per period
  available_at: string;
  expires_at: string | null;
  status: AssignmentStatus;
  answered_at: string | null;
  selected_option_id?: string | null;
  is_correct?: boolean | null;
  points_awarded?: number;
}

export type AttemptSource = 'daily' | 'quiz';

export interface AnswerAttempt {
  id: string;
  user_id: string;
  question_id: string;
  selected_option_id: string;
  is_correct: boolean;
  source: AttemptSource;
  quiz_session_id: string | null;
  points_awarded: number;
  answered_at: string;
  idempotency_key: string;
}

export type QuizSessionStatus = 'in_progress' | 'completed' | 'abandoned';

export interface QuizSessionQuestion {
  id: string;
  quiz_session_id: string;
  question_id: string;
  position: number;
  selected_option_id: string | null;
  is_correct: boolean | null;
  answered_at: string | null;
}

export interface QuizSession {
  id: string;
  user_id: string;
  category_id?: string | null;
  status: QuizSessionStatus;
  total_questions: number;
  correct_answers: number;
  points_awarded: number;
  started_at: string;
  completed_at: string | null;
  questions: QuizSessionQuestion[];
}

export type PointRuleActionKey =
  | 'daily_participation'
  | 'daily_correct_bonus'
  | 'quiz_completion'
  | 'quiz_correct_answer'
  | 'streak_3_days'
  | 'streak_7_days'
  | 'pomodoro_cycle';

export interface PomodoroSessionLog {
  id: string;
  user_id: string;
  category_id: string | null;
  topic_label: string;
  duration_minutes: number;
  points_awarded: number;
  completed_at: string;
  idempotency_key: string;
}

export interface PointRule {
  id: string;
  action_key: PointRuleActionKey;
  description: string;
  points: number;
  is_active: boolean;
  updated_by: string;
  updated_at: string;
}

export type LedgerEntryType = 'earn' | 'redeem' | 'refund' | 'adjustment' | 'bonus';

export interface PointsLedgerEntry {
  id: string;
  user_id: string;
  amount: number; // positive for credit, negative for debit
  entry_type: LedgerEntryType;
  reason: string;
  reference_id: string | null;
  idempotency_key: string;
  created_by: string | null;
  created_at: string;
}

export type BadgeShape =
  | 'flame_2'
  | 'flame_3'
  | 'flame_4'
  | 'flame_5'
  | 'trophy'
  | 'sprout'
  | 'laurel';

export type BadgeColorTheme = 'gold' | 'blue' | 'green';

export interface Reward {
  id: string;
  name: string;
  description: string;
  category_label: string;
  image_url: string | null;
  points_cost: number;
  stock: number | null; // null = unlimited
  is_active: boolean;
  conditions: string;
  badge_shape?: BadgeShape;
  badge_color?: BadgeColorTheme;
  valid_from: string | null;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface AutoAchievement {
  id: string;
  name: string;
  description: string;
  criteria_label: string;
  badge_shape: BadgeShape;
  badge_color: BadgeColorTheme;
  unlocked: boolean;
  unlocked_at?: string | null;
  progress: number;
  target: number;
}

// ==================== RPG EXPERIENCE (XP), LEVELS & ACHIEVEMENTS ====================
export interface LevelDefinition {
  id: string;
  level_number: number;
  roman_numeral: string;
  name: string;
  description: string;
  min_xp: number;
  max_xp: number | null; // null = infinite (e.g. 2000+ XP)
  icon: string;
  badge_shape: BadgeShape;
  badge_color: BadgeColorTheme;
  color: string;
  benefits: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ExperienceRuleActionKey =
  | 'daily_participation_xp'
  | 'daily_correct_bonus_xp'
  | 'quiz_completion_xp'
  | 'quiz_correct_answer_xp'
  | 'streak_3_days_xp'
  | 'streak_7_days_xp'
  | 'special_challenge_xp';

export interface ExperienceRule {
  id: string;
  action_key: ExperienceRuleActionKey;
  description: string;
  xp_amount: number;
  is_active: boolean;
  updated_at: string;
}

export interface ExperienceLedgerEntry {
  id: string;
  user_id: string;
  amount: number; // Always positive for earned XP (or admin audited adjustment)
  activity_type: ExperienceRuleActionKey | 'admin_adjustment';
  description: string;
  reference_id: string | null;
  idempotency_key: string;
  created_at: string;
}

export interface UserExperience {
  id: string;
  user_id: string;
  total_xp: number;
  current_level_id: string;
  updated_at: string;
}

export interface UserLevelHistoryEntry {
  id: string;
  user_id: string;
  level_id: string;
  level_number: number;
  level_name: string;
  roman_numeral: string;
  reached_at: string;
  notified: boolean;
}

export type AchievementConditionType =
  | 'questions_answered'
  | 'correct_answers'
  | 'quizzes_completed'
  | 'streak_days'
  | 'active_days'
  | 'accuracy_pct_min_10_q'
  | 'pomodoro_cycles'
  | 'rewards_redeemed';

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge_shape: BadgeShape;
  badge_color: BadgeColorTheme;
  condition_type: AchievementConditionType;
  condition_value: number;
  is_active: boolean;
}

export interface UserAchievementUnlock {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export interface UserProgressionSummary {
  totalXp: number;
  currentLevel: LevelDefinition;
  nextLevel: LevelDefinition | null;
  xpIntoCurrentLevel: number;
  xpRequiredForNextLevel: number | null;
  xpMissingForNextLevel: number;
  levelProgressPercentage: number;
  levelHistory: UserLevelHistoryEntry[];
  unnotifiedLevelUps: UserLevelHistoryEntry[];
}

export type RedemptionStatus = 'pending' | 'approved' | 'delivered' | 'rejected' | 'cancelled';

export interface Redemption {
  id: string;
  user_id: string;
  reward_id: string;
  reward_name: string;
  points_spent: number;
  redemption_code: string;
  status: RedemptionStatus;
  admin_note: string | null;
  processed_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserStreak {
  user_id: string;
  current_streak: number;
  best_streak: number;
  last_activity_date: string | null; // YYYY-MM-DD
  active_dates: string[]; // Array of YYYY-MM-DD with recorded educational activity
  updated_at: string;
}

export interface AppSettings {
  target_audience: string;
  default_timezone: string;
  quiz_default_size: number;
  editorial_disclaimer: string;
  allow_demo_reset: boolean;
}

export interface AdminAuditLog {
  id: string;
  admin_user_id: string;
  admin_name: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: string;
  created_at: string;
}

export interface UserStatsSummary {
  currentBalance: number;
  totalEarned: number;
  totalSpent: number;
  questionsAnswered: number;
  correctAnswersCount: number;
  accuracyPercentage: number;
  quizzesCompleted: number;
  currentStreak: number;
  bestStreak: number;
  activeDates: string[];
}

// ==================== UROLOGY DICTIONARY MODULE ====================
export interface UrologyDictionaryCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type TermEditorialStatus = 'draft' | 'review' | 'published' | 'archived';

export type TermAliasType = 'synonym' | 'abbreviation' | 'alternative_name';

export interface UrologyTermAlias {
  id: string;
  term_id: string;
  alias: string;
  alias_type: TermAliasType;
}

export interface UrologyTermTag {
  id: string;
  term_id: string;
  tag: string;
}

export interface UrologyTermReference {
  id: string;
  term_id: string;
  reference_title: string;
  authors: string | null;
  publication_year: number | null;
  source_name: string | null;
  url: string | null;
  accessed_at: string | null;
}

export interface UrologyTermRelation {
  id: string;
  term_id: string;
  related_term_id: string;
  relation_type: string; // default 'related'
  created_at: string;
}

export interface UrologyTerm {
  id: string;
  term: string;
  slug: string;
  short_definition: string;
  full_definition: string;
  category_id: string;
  image_url: string | null;
  gallery_urls?: Array<{ url: string; caption: string }>;
  editorial_status: TermEditorialStatus;
  is_demo_pending_review: boolean;
  created_by: string;
  reviewed_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UrologyTermEnriched extends UrologyTerm {
  category: UrologyDictionaryCategory | null;
  aliases: UrologyTermAlias[];
  tags: UrologyTermTag[];
  references: UrologyTermReference[];
  related_terms: Array<{
    id: string;
    term: string;
    slug: string;
    short_definition: string;
    category_name: string;
  }>;
  is_favorite: boolean;
}

export interface UserFavoriteTerm {
  id: string;
  user_id: string;
  term_id: string;
  created_at: string;
}

export interface UserTermView {
  id: string;
  user_id: string;
  term_id: string;
  viewed_at: string;
}

export interface DictionaryAdminStats {
  totalTerms: number;
  publishedTerms: number;
  reviewTerms: number;
  draftTerms: number;
  archivedTerms: number;
  totalCategories: number;
  mostViewedTerms: Array<{ term_id: string; term: string; slug: string; views_count: number }>;
  mostFavoritedTerms: Array<{ term_id: string; term: string; slug: string; favorites_count: number }>;
}
