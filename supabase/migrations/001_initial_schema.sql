-- =============================================================================
-- UROCHALLENGE — ESQUEMA POSTGRESQL / SUPABASE + ROW LEVEL SECURITY + RPCs
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'editor', 'admin')),
  specialty_label TEXT DEFAULT 'Estudiante / Residente',
  timezone TEXT NOT NULL DEFAULT 'America/Santiago',
  reminders_enabled BOOLEAN NOT NULL DEFAULT true,
  reminder_time TIME DEFAULT '08:30',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'Activity',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. QUESTIONS
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  question_text TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'basic' CHECK (difficulty IN ('basic', 'intermediate', 'advanced')),
  explanation TEXT NOT NULL,
  reference_text TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_category_status ON public.questions(category_id, status);

-- 4. QUESTION OPTIONS (Protected: is_correct not exposed directly to unprivileged queries)
CREATE TABLE IF NOT EXISTS public.question_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_question_options_question ON public.question_options(question_id);

-- Public safe view without is_correct for client consumption prior to answering
CREATE OR REPLACE VIEW public.public_question_options AS
SELECT id, question_id, option_text, sort_order
FROM public.question_options;

-- 5. QUESTION SCHEDULES
CREATE TABLE IF NOT EXISTS public.question_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  interval_value INT NOT NULL DEFAULT 1 CHECK (interval_value > 0),
  interval_unit TEXT NOT NULL DEFAULT 'days' CHECK (interval_unit IN ('hours', 'days')),
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  allow_retries BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. DAILY ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.daily_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  period_key TEXT NOT NULL,
  available_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'answered', 'expired')),
  answered_at TIMESTAMPTZ,
  UNIQUE (user_id, period_key)
);

-- 7. QUIZ SESSIONS
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  total_questions INT NOT NULL DEFAULT 10,
  correct_answers INT DEFAULT 0,
  points_awarded INT NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- 8. QUIZ SESSION QUESTIONS
CREATE TABLE IF NOT EXISTS public.quiz_session_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_session_id UUID NOT NULL REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
  position INT NOT NULL,
  selected_option_id UUID REFERENCES public.question_options(id),
  is_correct BOOLEAN,
  answered_at TIMESTAMPTZ,
  UNIQUE (quiz_session_id, position)
);

-- 9. ANSWER ATTEMPTS
CREATE TABLE IF NOT EXISTS public.answer_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_option_id UUID NOT NULL REFERENCES public.question_options(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('daily', 'quiz')),
  quiz_session_id UUID REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
  points_awarded INT NOT NULL DEFAULT 0,
  idempotency_key TEXT NOT NULL UNIQUE,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. POINT RULES
CREATE TABLE IF NOT EXISTS public.point_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action_key TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  points INT NOT NULL CHECK (points >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. POINTS LEDGER (Immutable double-check ledger with idempotency_key)
CREATE TABLE IF NOT EXISTS public.points_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  entry_type TEXT NOT NULL CHECK (entry_type IN ('earn', 'redeem', 'refund', 'adjustment', 'bonus')),
  reason TEXT NOT NULL,
  reference_id UUID,
  idempotency_key TEXT NOT NULL UNIQUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_points_ledger_user ON public.points_ledger(user_id, created_at DESC);

-- 12. REWARDS
CREATE TABLE IF NOT EXISTS public.rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  points_cost INT NOT NULL CHECK (points_cost > 0),
  stock INT CHECK (stock IS NULL OR stock >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. REDEMPTIONS
CREATE TABLE IF NOT EXISTS public.redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES public.rewards(id) ON DELETE RESTRICT,
  points_spent INT NOT NULL CHECK (points_spent > 0),
  redemption_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'delivered', 'rejected', 'cancelled')),
  admin_note TEXT,
  processed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. USER STREAKS
CREATE TABLE IF NOT EXISTS public.user_streaks (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_streak INT NOT NULL DEFAULT 0,
  best_streak INT NOT NULL DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 15. APP SETTINGS
CREATE TABLE IF NOT EXISTS public.app_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. ADMIN AUDIT LOG
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID NOT NULL REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  before_data JSONB,
  after_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- RPG LEVELS, EXPERIENCE (XP) & AUTOMATIC ACHIEVEMENTS TABLES
-- =============================================================================

-- 17. LEVELS
CREATE TABLE IF NOT EXISTS public.levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level_number INT NOT NULL UNIQUE CHECK (level_number > 0),
  roman_numeral TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  min_xp INT NOT NULL CHECK (min_xp >= 0),
  max_xp INT CHECK (max_xp IS NULL OR max_xp > min_xp),
  icon TEXT NOT NULL DEFAULT 'Award',
  badge_shape TEXT NOT NULL DEFAULT 'flame_2',
  badge_color TEXT NOT NULL DEFAULT 'gold',
  color TEXT NOT NULL DEFAULT '#5149B8',
  benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 18. EXPERIENCE RULES
CREATE TABLE IF NOT EXISTS public.experience_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action_key TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  xp_amount INT NOT NULL CHECK (xp_amount >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 19. USER EXPERIENCE
CREATE TABLE IF NOT EXISTS public.user_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_xp INT NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
  current_level_id UUID NOT NULL REFERENCES public.levels(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 20. EXPERIENCE LEDGER
CREATE TABLE IF NOT EXISTS public.experience_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INT NOT NULL CHECK (amount > 0),
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  reference_id TEXT,
  idempotency_key TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_experience_ledger_user ON public.experience_ledger(user_id, created_at DESC);

-- 21. USER LEVEL HISTORY
CREATE TABLE IF NOT EXISTS public.user_level_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  level_id UUID NOT NULL REFERENCES public.levels(id),
  level_number INT NOT NULL,
  level_name TEXT NOT NULL,
  roman_numeral TEXT NOT NULL,
  reached_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notified BOOLEAN NOT NULL DEFAULT false,
  UNIQUE (user_id, level_id)
);

-- 22. ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Trophy',
  badge_shape TEXT NOT NULL DEFAULT 'trophy',
  badge_color TEXT NOT NULL DEFAULT 'gold',
  condition_type TEXT NOT NULL,
  condition_value INT NOT NULL CHECK (condition_value > 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 23. USER ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, achievement_id)
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_session_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_level_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Helper function to verify admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Profiles: users read/update own profile; admins read/manage all
CREATE POLICY "Users view own profile or admin views all"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users update own basic profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Categories & Rewards & Point Rules: everyone authenticated can read active; admins manage
CREATE POLICY "Authenticated read categories"
  ON public.categories FOR SELECT
  USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

CREATE POLICY "Authenticated read published questions"
  ON public.questions FOR SELECT
  USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin manage questions"
  ON public.questions FOR ALL
  USING (public.is_admin());

CREATE POLICY "Authenticated read rewards"
  ON public.rewards FOR SELECT
  USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin manage rewards"
  ON public.rewards FOR ALL
  USING (public.is_admin());

-- User-specific tables: user reads own records; mutations occur through secure RPC functions
CREATE POLICY "Users read own ledger"
  ON public.points_ledger FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users read own redemptions"
  ON public.redemptions FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users read own quiz sessions"
  ON public.quiz_sessions FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users read own streaks"
  ON public.user_streaks FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

-- RPG Levels & Experience RLS Policies
CREATE POLICY "Authenticated read active levels"
  ON public.levels FOR SELECT
  USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin manage levels"
  ON public.levels FOR ALL
  USING (public.is_admin());

CREATE POLICY "Authenticated read experience rules"
  ON public.experience_rules FOR SELECT
  USING (true);

CREATE POLICY "Admin manage experience rules"
  ON public.experience_rules FOR ALL
  USING (public.is_admin());

CREATE POLICY "Users read own experience"
  ON public.user_experience FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users read own experience ledger"
  ON public.experience_ledger FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users read own level history"
  ON public.user_level_history FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Authenticated read achievements"
  ON public.achievements FOR SELECT
  USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin manage achievements"
  ON public.achievements FOR ALL
  USING (public.is_admin());

CREATE POLICY "Users read own unlocked achievements"
  ON public.user_achievements FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

-- =============================================================================
-- ATOMIC SERVER-SIDE RPC FOR REWARD REDEMPTION
-- =============================================================================
CREATE OR REPLACE FUNCTION public.redeem_reward_secure(
  p_reward_id UUID,
  p_idempotency_key TEXT
)
RETURNS public.redemptions
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_reward public.rewards;
  v_balance INT;
  v_code TEXT;
  v_redemption public.redemptions;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No autenticado';
  END IF;

  -- Lock reward row for stock verification
  SELECT * INTO v_reward
  FROM public.rewards
  WHERE id = p_reward_id AND is_active = true
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Premio no disponible o inactivo';
  END IF;

  IF v_reward.stock IS NOT NULL AND v_reward.stock <= 0 THEN
    RAISE EXCEPTION 'Stock agotado para este premio';
  END IF;

  SELECT COALESCE(SUM(amount), 0) INTO v_balance
  FROM public.points_ledger
  WHERE user_id = v_user_id;

  IF v_balance < v_reward.points_cost THEN
    RAISE EXCEPTION 'Saldo insuficiente de puntos';
  END IF;

  IF v_reward.stock IS NOT NULL THEN
    UPDATE public.rewards
    SET stock = stock - 1, updated_at = now()
    WHERE id = v_reward.id;
  END IF;

  v_code := 'URO-' || EXTRACT(YEAR FROM now())::TEXT || '-' || UPPER(SUBSTR(MD5(random()::TEXT), 1, 5));

  INSERT INTO public.redemptions (user_id, reward_id, points_spent, redemption_code, status)
  VALUES (v_user_id, v_reward.id, v_reward.points_cost, v_code, 'pending')
  RETURNING * INTO v_redemption;

  INSERT INTO public.points_ledger (user_id, amount, entry_type, reason, reference_id, idempotency_key)
  VALUES (
    v_user_id,
    -v_reward.points_cost,
    'redeem',
    'Canje de premio: ' || v_reward.name || ' (' || v_code || ')',
    v_redemption.id,
    p_idempotency_key
  );

  RETURN v_redemption;
END;
$$;
