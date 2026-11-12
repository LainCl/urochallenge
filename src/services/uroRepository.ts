import {
  Profile,
  Category,
  Question,
  QuestionSchedule,
  DailyAssignment,
  AnswerAttempt,
  QuizSession,
  PointRule,
  PointsLedgerEntry,
  Reward,
  Redemption,
  UserStreak,
  AppSettings,
  AdminAuditLog,
  UserStatsSummary,
  RedemptionStatus,
  PointRuleActionKey,
  AutoAchievement,
  PomodoroSessionLog,
  LevelDefinition,
  ExperienceRule,
  ExperienceRuleActionKey,
  ExperienceLedgerEntry,
  UserExperience,
  UserLevelHistoryEntry,
  AchievementDefinition,
  UserAchievementUnlock,
  UserProgressionSummary,
  UrologyDictionaryCategory,
  UrologyTerm,
  UrologyTermAlias,
  UrologyTermTag,
  UrologyTermReference,
  UrologyTermRelation,
  UrologyTermEnriched,
  UserFavoriteTerm,
  UserTermView,
  TermEditorialStatus,
  TermAliasType,
  DictionaryAdminStats,
} from '../types/domain';
import {
  DEMO_USERS,
  INITIAL_CATEGORIES,
  INITIAL_QUESTIONS,
  INITIAL_POINT_RULES,
  INITIAL_REWARDS,
  INITIAL_SCHEDULE,
  INITIAL_APP_SETTINGS,
  INITIAL_DEMO_LEDGER,
  INITIAL_DEMO_STREAKS,
  INITIAL_LEVELS,
  INITIAL_EXPERIENCE_RULES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_DEMO_XP_LEDGER,
  INITIAL_DEMO_LEVEL_HISTORY,
} from '../data/seedData';
import {
  INITIAL_DICTIONARY_CATEGORIES,
  INITIAL_DICTIONARY_TERMS,
  INITIAL_DICTIONARY_ALIASES,
  INITIAL_DICTIONARY_TAGS,
  INITIAL_DICTIONARY_REFERENCES,
  INITIAL_DICTIONARY_RELATIONS,
} from '../data/dictionarySeedData';
import { format, differenceInCalendarDays, addHours, addDays, parseISO } from 'date-fns';

const STORAGE_KEY = 'urochallenge_db_v1';
const SESSION_KEY = 'urochallenge_session_user_id';

export interface LocalDatabaseState {
  profiles: Profile[];
  categories: Category[];
  questions: Question[];
  schedule: QuestionSchedule;
  dailyAssignments: DailyAssignment[];
  answerAttempts: AnswerAttempt[];
  quizSessions: QuizSession[];
  pointRules: PointRule[];
  pointsLedger: PointsLedgerEntry[];
  rewards: Reward[];
  redemptions: Redemption[];
  userStreaks: UserStreak[];
  pomodoroSessions: PomodoroSessionLog[];
  levels: LevelDefinition[];
  experienceRules: ExperienceRule[];
  experienceLedger: ExperienceLedgerEntry[];
  userExperience: UserExperience[];
  userLevelHistory: UserLevelHistoryEntry[];
  achievements: AchievementDefinition[];
  userAchievements: UserAchievementUnlock[];
  dictionaryCategories: UrologyDictionaryCategory[];
  dictionaryTerms: UrologyTerm[];
  dictionaryAliases: UrologyTermAlias[];
  dictionaryTags: UrologyTermTag[];
  dictionaryReferences: UrologyTermReference[];
  dictionaryRelations: UrologyTermRelation[];
  userFavoriteTerms: UserFavoriteTerm[];
  userTermViews: UserTermView[];
  appSettings: AppSettings;
  auditLogs: AdminAuditLog[];
}

function getInitialDatabaseState(): LocalDatabaseState {
  // Seed initial historical attempts for user-demo-01 so stats match INITIAL_DEMO_LEDGER
  const seedAttempts: AnswerAttempt[] = [
    {
      id: 'att-seed-daily-1',
      user_id: 'user-demo-01',
      question_id: 'q-001',
      selected_option_id: 'q-001-b',
      is_correct: true,
      source: 'daily',
      quiz_session_id: null,
      points_awarded: 10,
      answered_at: '2026-11-07T14:20:00Z',
      idempotency_key: 'seed-att-daily-1',
    },
  ];

  // Seed 1 completed 10-question quiz session for user-demo-01 (8/10 correct)
  const seedQuizQuestions = INITIAL_QUESTIONS.slice(0, 10).map((q, idx) => {
    const isCorrect = idx < 8;
    const chosenOpt = q.options.find((o) => o.is_correct === isCorrect) || q.options[0];
    return {
      id: `qsq-seed-${idx + 1}`,
      quiz_session_id: 'quiz-seed-01',
      question_id: q.id,
      position: idx + 1,
      selected_option_id: chosenOpt.id,
      is_correct: isCorrect,
      answered_at: '2026-11-08T18:09:00Z',
    };
  });

  const seedQuizSessions: QuizSession[] = [
    {
      id: 'quiz-seed-01',
      user_id: 'user-demo-01',
      category_id: null,
      status: 'completed',
      total_questions: 10,
      correct_answers: 8,
      points_awarded: 26,
      started_at: '2026-11-08T18:00:00Z',
      completed_at: '2026-11-08T18:10:00Z',
      questions: seedQuizQuestions,
    },
  ];

  return {
    profiles: DEMO_USERS,
    categories: INITIAL_CATEGORIES,
    questions: INITIAL_QUESTIONS,
    schedule: INITIAL_SCHEDULE,
    dailyAssignments: [],
    answerAttempts: seedAttempts,
    quizSessions: seedQuizSessions,
    pointRules: INITIAL_POINT_RULES,
    pointsLedger: INITIAL_DEMO_LEDGER,
    rewards: INITIAL_REWARDS,
    redemptions: [],
    userStreaks: INITIAL_DEMO_STREAKS,
    pomodoroSessions: [
      {
        id: 'pomo-seed-01',
        user_id: 'user-demo-01',
        category_id: 'cat-litiasis',
        topic_label: 'Litiasis urinaria',
        duration_minutes: 25,
        points_awarded: 2,
        completed_at: '2026-11-08T16:30:00Z',
        idempotency_key: 'pomo-seed-01-key',
      },
    ],
    levels: INITIAL_LEVELS,
    experienceRules: INITIAL_EXPERIENCE_RULES,
    experienceLedger: INITIAL_DEMO_XP_LEDGER,
    userExperience: [
      {
        id: 'uxp-user-demo-01',
        user_id: 'user-demo-01',
        total_xp: 165,
        current_level_id: 'lvl-01',
        updated_at: '2026-11-08T19:00:00Z',
      },
      {
        id: 'uxp-admin-demo-01',
        user_id: 'admin-demo-01',
        total_xp: 720,
        current_level_id: 'lvl-03',
        updated_at: '2026-11-01T10:00:00Z',
      },
    ],
    userLevelHistory: INITIAL_DEMO_LEVEL_HISTORY,
    achievements: INITIAL_ACHIEVEMENTS,
    userAchievements: [
      {
        id: 'uach-seed-1',
        user_id: 'user-demo-01',
        achievement_id: 'ach-first-question',
        unlocked_at: '2026-11-07T14:20:00Z',
      },
      {
        id: 'uach-seed-2',
        user_id: 'user-demo-01',
        achievement_id: 'ach-first-quiz',
        unlocked_at: '2026-11-08T18:10:00Z',
      },
    ],
    dictionaryCategories: INITIAL_DICTIONARY_CATEGORIES,
    dictionaryTerms: INITIAL_DICTIONARY_TERMS,
    dictionaryAliases: INITIAL_DICTIONARY_ALIASES,
    dictionaryTags: INITIAL_DICTIONARY_TAGS,
    dictionaryReferences: INITIAL_DICTIONARY_REFERENCES,
    dictionaryRelations: INITIAL_DICTIONARY_RELATIONS,
    userFavoriteTerms: [
      {
        id: 'ufav-seed-1',
        user_id: 'user-demo-01',
        term_id: 'uterm-11',
        created_at: '2026-11-08T19:00:00Z',
      },
      {
        id: 'ufav-seed-2',
        user_id: 'user-demo-01',
        term_id: 'uterm-14',
        created_at: '2026-11-08T19:05:00Z',
      },
    ],
    userTermViews: [
      {
        id: 'uview-seed-1',
        user_id: 'user-demo-01',
        term_id: 'uterm-11',
        viewed_at: '2026-11-09T10:15:00Z',
      },
      {
        id: 'uview-seed-2',
        user_id: 'user-demo-01',
        term_id: 'uterm-04',
        viewed_at: '2026-11-09T10:18:00Z',
      },
    ],
    appSettings: INITIAL_APP_SETTINGS,
    auditLogs: [
      {
        id: 'audit-init-1',
        admin_user_id: 'admin-demo-01',
        admin_name: 'Dr. Carlos Valdivia (Editor Jefe)',
        action: 'SEED_DATABASE',
        entity_type: 'system',
        entity_id: null,
        details: 'Inicialización de banco demostrativo de 22 preguntas urológicas y reglas de puntos.',
        created_at: '2026-10-01T10:00:00Z',
      },
    ],
  };
}

class UroChallengeRepository {
  private loadDb(): LocalDatabaseState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const initial = getInitialDatabaseState();
        this.saveDb(initial);
        return initial;
      }
      const parsed = JSON.parse(raw) as LocalDatabaseState;
      // Sync newly added seed rewards & pomodoro rules/sessions so existing localStorage sessions stay updated
      let migrated = false;
      if (!Array.isArray(parsed.pomodoroSessions)) {
        parsed.pomodoroSessions = [];
        migrated = true;
      }
      if (!Array.isArray(parsed.levels) || parsed.levels.length === 0) {
        parsed.levels = INITIAL_LEVELS;
        migrated = true;
      }
      if (!Array.isArray(parsed.experienceRules) || parsed.experienceRules.length === 0) {
        parsed.experienceRules = INITIAL_EXPERIENCE_RULES;
        migrated = true;
      }
      if (!Array.isArray(parsed.experienceLedger)) {
        parsed.experienceLedger = INITIAL_DEMO_XP_LEDGER;
        migrated = true;
      }
      if (!Array.isArray(parsed.userExperience)) {
        parsed.userExperience = [
          {
            id: 'uxp-user-demo-01',
            user_id: 'user-demo-01',
            total_xp: 165,
            current_level_id: 'lvl-01',
            updated_at: new Date().toISOString(),
          },
          {
            id: 'uxp-admin-demo-01',
            user_id: 'admin-demo-01',
            total_xp: 720,
            current_level_id: 'lvl-03',
            updated_at: new Date().toISOString(),
          },
        ];
        migrated = true;
      }
      if (!Array.isArray(parsed.userLevelHistory)) {
        parsed.userLevelHistory = INITIAL_DEMO_LEVEL_HISTORY;
        migrated = true;
      }
      if (!Array.isArray(parsed.achievements) || parsed.achievements.length === 0) {
        parsed.achievements = INITIAL_ACHIEVEMENTS;
        migrated = true;
      }
      if (!Array.isArray(parsed.userAchievements)) {
        parsed.userAchievements = [];
        migrated = true;
      }
      if (
        !Array.isArray(parsed.dictionaryCategories) ||
        parsed.dictionaryCategories.length === 0
      ) {
        parsed.dictionaryCategories = INITIAL_DICTIONARY_CATEGORIES;
        migrated = true;
      }
      if (!Array.isArray(parsed.dictionaryTerms) || parsed.dictionaryTerms.length === 0) {
        parsed.dictionaryTerms = INITIAL_DICTIONARY_TERMS;
        migrated = true;
      } else {
        for (const seedTerm of INITIAL_DICTIONARY_TERMS) {
          const existingTerm = parsed.dictionaryTerms.find((t) => t.id === seedTerm.id);
          if (!existingTerm) {
            parsed.dictionaryTerms.push(seedTerm);
            migrated = true;
          } else if (
            existingTerm.image_url !== seedTerm.image_url ||
            JSON.stringify(existingTerm.gallery_urls) !== JSON.stringify(seedTerm.gallery_urls)
          ) {
            existingTerm.image_url = seedTerm.image_url;
            existingTerm.gallery_urls = seedTerm.gallery_urls;
            migrated = true;
          }
        }
      }
      if (!Array.isArray(parsed.dictionaryAliases)) {
        parsed.dictionaryAliases = INITIAL_DICTIONARY_ALIASES;
        migrated = true;
      } else {
        for (const seedAlias of INITIAL_DICTIONARY_ALIASES) {
          if (!parsed.dictionaryAliases.some((a) => a.id === seedAlias.id)) {
            parsed.dictionaryAliases.push(seedAlias);
            migrated = true;
          }
        }
      }
      if (!Array.isArray(parsed.dictionaryTags)) {
        parsed.dictionaryTags = INITIAL_DICTIONARY_TAGS;
        migrated = true;
      } else {
        for (const seedTag of INITIAL_DICTIONARY_TAGS) {
          if (!parsed.dictionaryTags.some((tg) => tg.id === seedTag.id)) {
            parsed.dictionaryTags.push(seedTag);
            migrated = true;
          }
        }
      }
      if (!Array.isArray(parsed.dictionaryReferences)) {
        parsed.dictionaryReferences = INITIAL_DICTIONARY_REFERENCES;
        migrated = true;
      } else {
        for (const seedRef of INITIAL_DICTIONARY_REFERENCES) {
          if (!parsed.dictionaryReferences.some((rf) => rf.id === seedRef.id)) {
            parsed.dictionaryReferences.push(seedRef);
            migrated = true;
          }
        }
      }
      if (!Array.isArray(parsed.dictionaryRelations)) {
        parsed.dictionaryRelations = INITIAL_DICTIONARY_RELATIONS;
        migrated = true;
      } else {
        for (const seedRel of INITIAL_DICTIONARY_RELATIONS) {
          if (!parsed.dictionaryRelations.some((rl) => rl.id === seedRel.id)) {
            parsed.dictionaryRelations.push(seedRel);
            migrated = true;
          }
        }
      }
      if (!Array.isArray(parsed.userFavoriteTerms)) {
        parsed.userFavoriteTerms = [];
        migrated = true;
      }
      if (!Array.isArray(parsed.userTermViews)) {
        parsed.userTermViews = [];
        migrated = true;
      }
      for (const seedRule of INITIAL_POINT_RULES) {
        if (!parsed.pointRules.some((r) => r.action_key === seedRule.action_key)) {
          parsed.pointRules.push(seedRule);
          migrated = true;
        }
      }
      if (!Array.isArray(parsed.questions)) {
        parsed.questions = INITIAL_QUESTIONS;
        migrated = true;
      } else {
        for (const seedQuestion of INITIAL_QUESTIONS) {
          if (!parsed.questions.some((q) => q.id === seedQuestion.id)) {
            parsed.questions.push(seedQuestion);
            migrated = true;
          }
        }
      }
      for (const seedReward of INITIAL_REWARDS) {
        const idx = parsed.rewards.findIndex((r) => r.id === seedReward.id);
        if (idx === -1) {
          parsed.rewards.push(seedReward);
          migrated = true;
        } else if (!parsed.rewards[idx].badge_shape && seedReward.badge_shape) {
          parsed.rewards[idx].badge_shape = seedReward.badge_shape;
          parsed.rewards[idx].badge_color = seedReward.badge_color;
          migrated = true;
        }
      }
      // Remove legacy demo rewards rew-001..rew-005 if they haven't been redeemed
      const redeemedIds = new Set(parsed.redemptions.map((r) => r.reward_id));
      const beforeCount = parsed.rewards.length;
      parsed.rewards = parsed.rewards.filter(
        (r) => !r.id.startsWith('rew-00') || redeemedIds.has(r.id)
      );
      if (parsed.rewards.length !== beforeCount) {
        migrated = true;
      }
      if (migrated) {
        this.saveDb(parsed);
      }
      return parsed;
    } catch {
      const initial = getInitialDatabaseState();
      this.saveDb(initial);
      return initial;
    }
  }

  private saveDb(state: LocalDatabaseState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Error guardando estado en almacenamiento local:', err);
    }
  }

  public resetDemoDatabase(): LocalDatabaseState {
    const initial = getInitialDatabaseState();
    this.saveDb(initial);
    return initial;
  }

  // ==================== AUTH & SESSION ====================
  public getCurrentUser(): Profile | null {
    const db = this.loadDb();
    const sessionVal = localStorage.getItem(SESSION_KEY);
    if (sessionVal === 'logged_out') {
      return null;
    }
    const userId = sessionVal || 'user-demo-01';
    return db.profiles.find((p) => p.id === userId) || null;
  }

  public authenticateUser(email: string, password?: string): Profile {
    const db = this.loadDb();
    const cleanEmail = email.trim().toLowerCase();
    const user = db.profiles.find((p) => p.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error(
        'No encontramos una cuenta con ese correo electrónico. Verifica el correo o crea una nueva cuenta.'
      );
    }
    if (user.password && password !== undefined && user.password !== password) {
      throw new Error('La contraseña ingresada es incorrecta.');
    }
    localStorage.setItem(SESSION_KEY, user.id);
    return user;
  }

  public loginWithDemoRole(roleOrUserId: 'user' | 'admin' | string): Profile {
    const db = this.loadDb();
    let user: Profile | undefined;
    if (roleOrUserId === 'admin') {
      user = db.profiles.find((p) => p.role === 'admin');
    } else if (roleOrUserId === 'user') {
      user = db.profiles.find((p) => p.role === 'user');
    } else {
      user = db.profiles.find(
        (p) => p.id === roleOrUserId || p.email.toLowerCase() === roleOrUserId.toLowerCase()
      );
    }
    if (!user) {
      user = db.profiles[0];
    }
    localStorage.setItem(SESSION_KEY, user.id);
    return user;
  }

  public registerUser(
    displayName: string,
    email: string,
    specialtyLabel?: string,
    password?: string
  ): Profile {
    const db = this.loadDb();
    const cleanEmail = email.trim().toLowerCase();
    const existing = db.profiles.find((p) => p.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error(
        'Ya existe una cuenta registrada con este correo electrónico. Por favor inicia sesión.'
      );
    }

    const now = new Date().toISOString();
    const newUser: Profile = {
      id: `user-${Date.now()}`,
      email: email.trim(),
      display_name: displayName.trim(),
      avatar_url: null,
      role: 'user',
      specialty_label: specialtyLabel?.trim() || 'Estudiante / Profesional en Formación',
      password: password || undefined,
      timezone: db.appSettings.default_timezone,
      reminders_enabled: true,
      reminder_time: '08:30',
      onboarding_completed: false,
      created_at: now,
      updated_at: now,
    };

    db.profiles.push(newUser);
    db.userStreaks.push({
      user_id: newUser.id,
      current_streak: 0,
      best_streak: 0,
      last_activity_date: null,
      active_dates: [],
      updated_at: now,
    });
    const firstLevel =
      db.levels.filter((l) => l.is_active).sort((a, b) => a.min_xp - b.min_xp)[0] ||
      INITIAL_LEVELS[0];
    db.userExperience.push({
      id: `uxp-${newUser.id}`,
      user_id: newUser.id,
      total_xp: 0,
      current_level_id: firstLevel.id,
      updated_at: now,
    });
    db.userLevelHistory.push({
      id: `lvlhist-${newUser.id}-1`,
      user_id: newUser.id,
      level_id: firstLevel.id,
      level_number: firstLevel.level_number,
      level_name: firstLevel.name,
      roman_numeral: firstLevel.roman_numeral,
      reached_at: now,
      notified: true,
    });

    this.saveDb(db);
    localStorage.setItem(SESSION_KEY, newUser.id);
    return newUser;
  }

  public logout(): void {
    localStorage.setItem(SESSION_KEY, 'logged_out');
  }

  public updateProfile(
    userId: string,
    updates: Partial<Pick<Profile, 'display_name' | 'specialty_label' | 'timezone' | 'reminders_enabled' | 'reminder_time' | 'onboarding_completed'>>
  ): Profile {
    const db = this.loadDb();
    const idx = db.profiles.findIndex((p) => p.id === userId);
    if (idx === -1) throw new Error('Usuario no encontrado');

    db.profiles[idx] = {
      ...db.profiles[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.saveDb(db);
    return db.profiles[idx];
  }

  public getAllProfiles(): Profile[] {
    return this.loadDb().profiles;
  }

  // ==================== POINTS & STREAKS ENGINE ====================
  public getRulePoints(db: LocalDatabaseState, key: PointRuleActionKey): number {
    const rule = db.pointRules.find((r) => r.action_key === key);
    if (!rule || !rule.is_active) return 0;
    return rule.points;
  }

  public getUserBalance(userId: string): number {
    const db = this.loadDb();
    return db.pointsLedger
      .filter((entry) => entry.user_id === userId)
      .reduce((acc, entry) => acc + entry.amount, 0);
  }

  public getUserLedger(userId: string): PointsLedgerEntry[] {
    const db = this.loadDb();
    return db.pointsLedger
      .filter((entry) => entry.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  private addLedgerEntry(
    db: LocalDatabaseState,
    params: {
      userId: string;
      amount: number;
      entryType: PointsLedgerEntry['entry_type'];
      reason: string;
      referenceId: string | null;
      idempotencyKey: string;
      createdBy?: string | null;
    }
  ): PointsLedgerEntry | null {
    // Idempotency protection: never duplicate ledger transactions with the same key
    const existing = db.pointsLedger.find((e) => e.idempotency_key === params.idempotencyKey);
    if (existing) {
      return null;
    }

    if (params.amount === 0) return null;

    const entry: PointsLedgerEntry = {
      id: `led-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      user_id: params.userId,
      amount: params.amount,
      entry_type: params.entryType,
      reason: params.reason,
      reference_id: params.referenceId,
      idempotency_key: params.idempotencyKey,
      created_by: params.createdBy ?? null,
      created_at: new Date().toISOString(),
    };

    db.pointsLedger.push(entry);
    return entry;
  }

  private recordActivityAndStreak(db: LocalDatabaseState, userId: string): { bonusAwarded: number; newStreak: number } {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    let streakObj = db.userStreaks.find((s) => s.user_id === userId);

    if (!streakObj) {
      streakObj = {
        user_id: userId,
        current_streak: 0,
        best_streak: 0,
        last_activity_date: null,
        active_dates: [],
        updated_at: new Date().toISOString(),
      };
      db.userStreaks.push(streakObj);
    }

    if (!streakObj.active_dates.includes(todayStr)) {
      streakObj.active_dates.push(todayStr);
    }

    if (streakObj.last_activity_date === todayStr) {
      return { bonusAwarded: 0, newStreak: streakObj.current_streak };
    }

    if (!streakObj.last_activity_date) {
      streakObj.current_streak = 1;
    } else {
      const diff = differenceInCalendarDays(parseISO(todayStr), parseISO(streakObj.last_activity_date));
      if (diff === 1) {
        streakObj.current_streak += 1;
      } else if (diff > 1) {
        streakObj.current_streak = 1;
      }
    }

    streakObj.last_activity_date = todayStr;
    if (streakObj.current_streak > streakObj.best_streak) {
      streakObj.best_streak = streakObj.current_streak;
    }
    streakObj.updated_at = new Date().toISOString();

    let bonusAwarded = 0;

    if (streakObj.current_streak === 3) {
      const pts3 = this.getRulePoints(db, 'streak_3_days');
      if (pts3 > 0) {
        const entry = this.addLedgerEntry(db, {
          userId,
          amount: pts3,
          entryType: 'bonus',
          reason: 'Bonificación por alcanzar racha de 3 días consecutivos',
          referenceId: null,
          idempotencyKey: `streak-3-${userId}-${todayStr}`,
        });
        if (entry) bonusAwarded += pts3;
      }

      // Independent XP milestone for 3-day streak (once per milestone)
      const xp3 = this.getRuleXp(db, 'streak_3_days_xp');
      if (xp3 > 0) {
        this.addExperienceEntry(db, {
          userId,
          amount: xp3,
          activityType: 'streak_3_days_xp',
          description: 'Hito de racha: 3 días consecutivos de actividad (+20 XP)',
          referenceId: null,
          idempotencyKey: `xp-streak-3-milestone-${userId}`,
        });
      }
    }

    if (streakObj.current_streak === 7) {
      const pts7 = this.getRulePoints(db, 'streak_7_days');
      if (pts7 > 0) {
        const entry = this.addLedgerEntry(db, {
          userId,
          amount: pts7,
          entryType: 'bonus',
          reason: 'Bonificación por alcanzar racha de 7 días consecutivos',
          referenceId: null,
          idempotencyKey: `streak-7-${userId}-${todayStr}`,
        });
        if (entry) bonusAwarded += pts7;
      }

      // Independent XP milestone for 7-day streak (once per milestone)
      const xp7 = this.getRuleXp(db, 'streak_7_days_xp');
      if (xp7 > 0) {
        this.addExperienceEntry(db, {
          userId,
          amount: xp7,
          activityType: 'streak_7_days_xp',
          description: 'Hito de racha: 7 días consecutivos de actividad (+50 XP)',
          referenceId: null,
          idempotencyKey: `xp-streak-7-milestone-${userId}`,
        });
      }
    }

    return { bonusAwarded, newStreak: streakObj.current_streak };
  }

  // ==================== RPG EXPERIENCE (XP), LEVELS & ACHIEVEMENTS ENGINE ====================
  public getRuleXp(db: LocalDatabaseState, key: ExperienceRuleActionKey): number {
    const rule = (db.experienceRules || []).find((r) => r.action_key === key);
    if (!rule || !rule.is_active) return 0;
    return rule.xp_amount;
  }

  private addExperienceEntry(
    db: LocalDatabaseState,
    params: {
      userId: string;
      amount: number;
      activityType: ExperienceLedgerEntry['activity_type'];
      description: string;
      referenceId: string | null;
      idempotencyKey: string;
    }
  ): {
    entry: ExperienceLedgerEntry | null;
    newLevelsReached: UserLevelHistoryEntry[];
  } {
    if (!Array.isArray(db.experienceLedger)) {
      db.experienceLedger = [];
    }
    const existing = db.experienceLedger.find(
      (e) => e.idempotency_key === params.idempotencyKey
    );
    if (existing || params.amount <= 0) {
      return { entry: null, newLevelsReached: [] };
    }

    const now = new Date().toISOString();
    const entry: ExperienceLedgerEntry = {
      id: `xpled-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      user_id: params.userId,
      amount: params.amount,
      activity_type: params.activityType,
      description: params.description,
      reference_id: params.referenceId,
      idempotency_key: params.idempotencyKey,
      created_at: now,
    };

    db.experienceLedger.push(entry);
    const newLevelsReached = this.recalculateUserLevelAndHistory(db, params.userId);
    return { entry, newLevelsReached };
  }

  private recalculateUserLevelAndHistory(
    db: LocalDatabaseState,
    userId: string
  ): UserLevelHistoryEntry[] {
    const activeLevels = (db.levels || INITIAL_LEVELS)
      .filter((l) => l.is_active)
      .sort((a, b) => a.min_xp - b.min_xp);

    if (activeLevels.length === 0) return [];

    const totalXp = Math.max(
      0,
      (db.experienceLedger || [])
        .filter((e) => e.user_id === userId)
        .reduce((sum, e) => sum + e.amount, 0)
    );

    // Determine all levels whose min_xp <= totalXp
    const qualifiedLevels = activeLevels.filter((l) => totalXp >= l.min_xp);
    const currentLevel =
      qualifiedLevels[qualifiedLevels.length - 1] || activeLevels[0];

    const now = new Date().toISOString();
    if (!Array.isArray(db.userExperience)) {
      db.userExperience = [];
    }

    let userExp = db.userExperience.find((u) => u.user_id === userId);
    if (!userExp) {
      userExp = {
        id: `uxp-${userId}`,
        user_id: userId,
        total_xp: totalXp,
        current_level_id: currentLevel.id,
        updated_at: now,
      };
      db.userExperience.push(userExp);
    } else {
      // Experience and level never decrease when spending points
      userExp.total_xp = totalXp;
      userExp.current_level_id = currentLevel.id;
      userExp.updated_at = now;
    }

    if (!Array.isArray(db.userLevelHistory)) {
      db.userLevelHistory = [];
    }

    const existingHistoryLevelIds = new Set(
      db.userLevelHistory
        .filter((h) => h.user_id === userId)
        .map((h) => h.level_id)
    );

    const newlyUnlocked: UserLevelHistoryEntry[] = [];

    for (const lvl of qualifiedLevels) {
      if (!existingHistoryLevelIds.has(lvl.id)) {
        const histEntry: UserLevelHistoryEntry = {
          id: `lvlhist-${userId}-${lvl.level_number}-${Date.now()}`,
          user_id: userId,
          level_id: lvl.id,
          level_number: lvl.level_number,
          level_name: lvl.name,
          roman_numeral: lvl.roman_numeral,
          reached_at: now,
          notified: lvl.level_number === 1, // Level 1 is initial state; levels >= 2 trigger celebratory modal
        };
        db.userLevelHistory.push(histEntry);
        if (lvl.level_number > 1) {
          newlyUnlocked.push(histEntry);
        }
      }
    }

    return newlyUnlocked;
  }

  private evaluateUserAchievementsInDb(
    db: LocalDatabaseState,
    userId: string
  ): UserAchievementUnlock[] {
    if (!Array.isArray(db.userAchievements)) {
      db.userAchievements = [];
    }
    const unlockedIds = new Set(
      db.userAchievements
        .filter((ua) => ua.user_id === userId)
        .map((ua) => ua.achievement_id)
    );

    const userQuizzes = db.quizSessions.filter(
      (q) => q.user_id === userId && q.status === 'completed'
    );
    const quizQuestionCount = userQuizzes.reduce((sum, q) => sum + q.total_questions, 0);
    const quizCorrectCount = userQuizzes.reduce((sum, q) => sum + q.correct_answers, 0);
    const dailyAttempts = db.answerAttempts.filter(
      (a) => a.user_id === userId && a.source === 'daily'
    );
    const dailyCorrect = dailyAttempts.filter((a) => a.is_correct).length;

    const questionsAnswered = dailyAttempts.length + quizQuestionCount;
    const correctAnswers = dailyCorrect + quizCorrectCount;
    const accuracyPct =
      questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0;

    const streakObj = db.userStreaks.find((s) => s.user_id === userId);
    const bestStreak = streakObj?.best_streak ?? 0;
    const activeDaysCount = streakObj?.active_dates?.length ?? 0;
    const pomodoroCount = (db.pomodoroSessions || []).filter((p) => p.user_id === userId).length;
    const redemptionsCount = db.redemptions.filter(
      (r) => r.user_id === userId && r.status !== 'rejected' && r.status !== 'cancelled'
    ).length;

    const newlyUnlocked: UserAchievementUnlock[] = [];
    const now = new Date().toISOString();

    for (const ach of db.achievements || INITIAL_ACHIEVEMENTS) {
      if (!ach.is_active || unlockedIds.has(ach.id)) continue;

      let met = false;
      switch (ach.condition_type) {
        case 'questions_answered':
          met = questionsAnswered >= ach.condition_value;
          break;
        case 'correct_answers':
          met = correctAnswers >= ach.condition_value;
          break;
        case 'quizzes_completed':
          met = userQuizzes.length >= ach.condition_value;
          break;
        case 'streak_days':
          met = bestStreak >= ach.condition_value;
          break;
        case 'active_days':
          met = activeDaysCount >= ach.condition_value;
          break;
        case 'accuracy_pct_min_10_q':
          met = questionsAnswered >= 10 && accuracyPct >= ach.condition_value;
          break;
        case 'pomodoro_cycles':
          met = pomodoroCount >= ach.condition_value;
          break;
        case 'rewards_redeemed':
          met = redemptionsCount >= ach.condition_value;
          break;
      }

      if (met) {
        const unlockRecord: UserAchievementUnlock = {
          id: `uach-${userId}-${ach.id}-${Date.now()}`,
          user_id: userId,
          achievement_id: ach.id,
          unlocked_at: now,
        };
        db.userAchievements.push(unlockRecord);
        newlyUnlocked.push(unlockRecord);
      }
    }

    return newlyUnlocked;
  }

  public getUserProgression(userId: string): UserProgressionSummary {
    const db = this.loadDb();
    const activeLevels = (db.levels || INITIAL_LEVELS)
      .filter((l) => l.is_active)
      .sort((a, b) => a.min_xp - b.min_xp);

    const totalXp = Math.max(
      0,
      (db.experienceLedger || [])
        .filter((e) => e.user_id === userId)
        .reduce((sum, e) => sum + e.amount, 0)
    );

    const qualifiedLevels = activeLevels.filter((l) => totalXp >= l.min_xp);
    const currentLevel =
      qualifiedLevels[qualifiedLevels.length - 1] || activeLevels[0] || INITIAL_LEVELS[0];

    const currentIdx = activeLevels.findIndex((l) => l.id === currentLevel.id);
    const nextLevel =
      currentIdx >= 0 && currentIdx + 1 < activeLevels.length
        ? activeLevels[currentIdx + 1]
        : null;

    let levelProgressPercentage = 100;
    let xpMissingForNextLevel = 0;
    const xpIntoCurrentLevel = Math.max(0, totalXp - currentLevel.min_xp);
    const xpRequiredForNextLevel = nextLevel ? nextLevel.min_xp : null;

    if (nextLevel) {
      const span = Math.max(1, nextLevel.min_xp - currentLevel.min_xp);
      levelProgressPercentage = Math.min(
        100,
        Math.max(0, Math.round((xpIntoCurrentLevel / span) * 100))
      );
      xpMissingForNextLevel = Math.max(0, nextLevel.min_xp - totalXp);
    }

    const levelHistory = (db.userLevelHistory || [])
      .filter((h) => h.user_id === userId)
      .sort((a, b) => a.level_number - b.level_number);

    const unnotifiedLevelUps = levelHistory.filter((h) => !h.notified && h.level_number > 1);

    return {
      totalXp,
      currentLevel,
      nextLevel,
      xpIntoCurrentLevel,
      xpRequiredForNextLevel,
      xpMissingForNextLevel,
      levelProgressPercentage,
      levelHistory,
      unnotifiedLevelUps,
    };
  }

  public acknowledgeLevelUpNotifications(userId: string, historyIds?: string[]): void {
    const db = this.loadDb();
    for (const h of db.userLevelHistory || []) {
      if (h.user_id === userId && (!historyIds || historyIds.includes(h.id))) {
        h.notified = true;
      }
    }
    this.saveDb(db);
  }

  public getUserExperienceLedger(userId: string): ExperienceLedgerEntry[] {
    const db = this.loadDb();
    return (db.experienceLedger || [])
      .filter((e) => e.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public getLevels(includeInactive = false): LevelDefinition[] {
    const db = this.loadDb();
    return (db.levels || INITIAL_LEVELS)
      .filter((l) => includeInactive || l.is_active)
      .sort((a, b) => a.level_number - b.level_number);
  }

  public getExperienceRules(): ExperienceRule[] {
    const db = this.loadDb();
    return db.experienceRules || INITIAL_EXPERIENCE_RULES;
  }

  public getAchievementsDefinitions(includeInactive = false): AchievementDefinition[] {
    const db = this.loadDb();
    return (db.achievements || INITIAL_ACHIEVEMENTS).filter(
      (a) => includeInactive || a.is_active
    );
  }

  public getUserStats(userId: string): UserStatsSummary {
    const db = this.loadDb();
    const ledger = db.pointsLedger.filter((e) => e.user_id === userId);
    const currentBalance = ledger.reduce((sum, e) => sum + e.amount, 0);
    const totalEarned = ledger.filter((e) => e.amount > 0).reduce((sum, e) => sum + e.amount, 0);
    const totalSpent = ledger.filter((e) => e.amount < 0).reduce((sum, e) => sum + Math.abs(e.amount), 0);

    const userAttempts = db.answerAttempts.filter((a) => a.user_id === userId);
    const userQuizzes = db.quizSessions.filter((q) => q.user_id === userId && q.status === 'completed');

    // Combine daily attempts + quiz session answers for comprehensive accuracy calculation
    const quizQuestionCount = userQuizzes.reduce((sum, q) => sum + q.total_questions, 0);
    const quizCorrectCount = userQuizzes.reduce((sum, q) => sum + q.correct_answers, 0);

    const dailyAttempts = userAttempts.filter((a) => a.source === 'daily');
    const dailyCorrect = dailyAttempts.filter((a) => a.is_correct).length;

    const questionsAnswered = dailyAttempts.length + quizQuestionCount;
    const correctAnswersCount = dailyCorrect + quizCorrectCount;
    const accuracyPercentage =
      questionsAnswered > 0 ? Math.round((correctAnswersCount / questionsAnswered) * 100) : 0;

    const streak = db.userStreaks.find((s) => s.user_id === userId);

    return {
      currentBalance,
      totalEarned,
      totalSpent,
      questionsAnswered,
      correctAnswersCount,
      accuracyPercentage,
      quizzesCompleted: userQuizzes.length,
      currentStreak: streak?.current_streak ?? 0,
      bestStreak: streak?.best_streak ?? 0,
      activeDates: streak?.active_dates ?? [],
    };
  }

  // ==================== DAILY / PERIODIC QUESTION ====================
  private computeCurrentPeriodKey(schedule: QuestionSchedule): {
    periodKey: string;
    availableAt: string;
    nextAvailableAt: string;
  } {
    const now = new Date();
    const start = new Date(schedule.starts_at);
    const intervalHours =
      schedule.interval_unit === 'days' ? schedule.interval_value * 24 : schedule.interval_value;
    const safeHours = Math.max(1, intervalHours);
    const elapsedMs = Math.max(0, now.getTime() - start.getTime());
    const periodMs = safeHours * 3600 * 1000;
    const periodIndex = Math.floor(elapsedMs / periodMs);

    const periodStart = new Date(start.getTime() + periodIndex * periodMs);
    const nextStart =
      schedule.interval_unit === 'days'
        ? addDays(periodStart, schedule.interval_value)
        : addHours(periodStart, schedule.interval_value);

    return {
      periodKey: `period-${schedule.id}-${periodIndex}`,
      availableAt: periodStart.toISOString(),
      nextAvailableAt: nextStart.toISOString(),
    };
  }

  public getDailyQuestionState(userId: string): {
    schedule: QuestionSchedule;
    assignment: DailyAssignment | null;
    question: Question | null;
    category: Category | null;
    nextAvailableAt: string;
    potentialPoints: { participation: number; correctBonus: number };
  } {
    const db = this.loadDb();
    const schedule = db.schedule;
    const { periodKey, availableAt, nextAvailableAt } = this.computeCurrentPeriodKey(schedule);

    const publishedQuestions = db.questions.filter((q) => q.status === 'published');
    if (publishedQuestions.length === 0 || !schedule.is_active) {
      return {
        schedule,
        assignment: null,
        question: null,
        category: null,
        nextAvailableAt,
        potentialPoints: {
          participation: this.getRulePoints(db, 'daily_participation'),
          correctBonus: this.getRulePoints(db, 'daily_correct_bonus'),
        },
      };
    }

    let assignment = db.dailyAssignments.find(
      (a) => a.user_id === userId && a.period_key === periodKey
    );

    if (!assignment) {
      // Pick a published question not recently answered in daily assignments if possible
      const answeredIds = new Set(
        db.dailyAssignments.filter((a) => a.user_id === userId).map((a) => a.question_id)
      );
      const unansweredPool = publishedQuestions.filter((q) => !answeredIds.has(q.id));
      const pool = unansweredPool.length > 0 ? unansweredPool : publishedQuestions;
      const chosen = pool[0];

      assignment = {
        id: `assign-${Date.now()}`,
        user_id: userId,
        question_id: chosen.id,
        period_key: periodKey,
        available_at: availableAt,
        expires_at: nextAvailableAt,
        status: 'available',
        answered_at: null,
      };
      db.dailyAssignments.push(assignment);
      this.saveDb(db);
    }

    const question = db.questions.find((q) => q.id === assignment!.question_id) || publishedQuestions[0];
    const category = db.categories.find((c) => c.id === question.category_id) || null;

    return {
      schedule,
      assignment,
      question,
      category,
      nextAvailableAt,
      potentialPoints: {
        participation: this.getRulePoints(db, 'daily_participation'),
        correctBonus: this.getRulePoints(db, 'daily_correct_bonus'),
      },
    };
  }

  public submitDailyQuestionAnswer(
    userId: string,
    assignmentId: string,
    selectedOptionId: string
  ): {
    assignment: DailyAssignment;
    isCorrect: boolean;
    pointsAwarded: number;
    xpAwarded: number;
    streakBonusAwarded: number;
    newLevelsReached: UserLevelHistoryEntry[];
    correctOptionId: string;
    explanation: string;
    referenceText: string | null;
  } {
    const db = this.loadDb();
    const assignmentIdx = db.dailyAssignments.findIndex(
      (a) => a.id === assignmentId && a.user_id === userId
    );
    if (assignmentIdx === -1) {
      throw new Error('Asignación de pregunta periódica no encontrada.');
    }

    const assignment = db.dailyAssignments[assignmentIdx];
    const question = db.questions.find((q) => q.id === assignment.question_id);
    if (!question) {
      throw new Error('La pregunta asociada no existe.');
    }

    const correctOption = question.options.find((o) => o.is_correct);
    if (!correctOption) {
      throw new Error('Configuración de pregunta inválida.');
    }

    // Prevent duplicate point awards if already answered and retries are disabled
    if (assignment.status === 'answered' && !db.schedule.allow_retries) {
      return {
        assignment,
        isCorrect: Boolean(assignment.is_correct),
        pointsAwarded: assignment.points_awarded ?? 0,
        xpAwarded: 0,
        streakBonusAwarded: 0,
        newLevelsReached: [],
        correctOptionId: correctOption.id,
        explanation: question.explanation,
        referenceText: question.reference_text,
      };
    }

    const isCorrect = selectedOptionId === correctOption.id;
    const participationPts = this.getRulePoints(db, 'daily_participation');
    const bonusPts = isCorrect ? this.getRulePoints(db, 'daily_correct_bonus') : 0;
    const totalPoints = participationPts + bonusPts;
    const now = new Date().toISOString();

    const idempotencyKey = `daily-ans-${userId}-${assignment.period_key}`;
    const ledgerEntry = this.addLedgerEntry(db, {
      userId,
      amount: totalPoints,
      entryType: 'earn',
      reason: isCorrect
        ? `Pregunta periódica respondida con acierto (+${participationPts} participación, +${bonusPts} acierto)`
        : `Participación en pregunta periódica (+${participationPts} pts)`,
      referenceId: question.id,
      idempotencyKey,
    });

    const actualPointsAwarded = ledgerEntry ? totalPoints : 0;

    // Independent XP Calculation for Periodic Question
    const partXp = this.getRuleXp(db, 'daily_participation_xp');
    const bonusXp = isCorrect ? this.getRuleXp(db, 'daily_correct_bonus_xp') : 0;
    const totalXp = partXp + bonusXp;
    const xpRes = this.addExperienceEntry(db, {
      userId,
      amount: totalXp,
      activityType: isCorrect ? 'daily_correct_bonus_xp' : 'daily_participation_xp',
      description: isCorrect
        ? `Pregunta periódica respondida correctamente (+${partXp} XP participación, +${bonusXp} XP acierto)`
        : `Participación en pregunta periódica (+${partXp} XP)`,
      referenceId: question.id,
      idempotencyKey: `xp-${idempotencyKey}`,
    });

    assignment.status = 'answered';
    assignment.answered_at = now;
    assignment.selected_option_id = selectedOptionId;
    assignment.is_correct = isCorrect;
    assignment.points_awarded = actualPointsAwarded;

    db.answerAttempts.push({
      id: `att-${Date.now()}`,
      user_id: userId,
      question_id: question.id,
      selected_option_id: selectedOptionId,
      is_correct: isCorrect,
      source: 'daily',
      quiz_session_id: null,
      points_awarded: actualPointsAwarded,
      answered_at: now,
      idempotency_key: idempotencyKey,
    });

    const { bonusAwarded } = this.recordActivityAndStreak(db, userId);
    const allNewLevels = this.recalculateUserLevelAndHistory(db, userId);
    this.evaluateUserAchievementsInDb(db, userId);

    this.saveDb(db);

    return {
      assignment,
      isCorrect,
      pointsAwarded: actualPointsAwarded,
      xpAwarded: xpRes.entry ? totalXp : 0,
      streakBonusAwarded: bonusAwarded,
      newLevelsReached: [...xpRes.newLevelsReached, ...allNewLevels],
      correctOptionId: correctOption.id,
      explanation: question.explanation,
      referenceText: question.reference_text,
    };
  }

  /**
   * Permite en modo demo o pruebas simular el avance al siguiente período para probar una nueva pregunta periódica
   */
  public unlockNextDailyQuestionForDemo(userId: string): void {
    const db = this.loadDb();
    const publishedQuestions = db.questions.filter((q) => q.status === 'published');
    if (publishedQuestions.length === 0) return;

    const answeredIds = new Set(
      db.dailyAssignments.filter((a) => a.user_id === userId).map((a) => a.question_id)
    );
    const unanswered = publishedQuestions.filter((q) => !answeredIds.has(q.id));
    const pool = unanswered.length > 0 ? unanswered : publishedQuestions;
    const nextQ = pool[Math.floor(Math.random() * pool.length)];

    const { periodKey, availableAt, nextAvailableAt } = this.computeCurrentPeriodKey(db.schedule);
    // Replace current period assignment with a fresh available assignment
    db.dailyAssignments = db.dailyAssignments.filter(
      (a) => !(a.user_id === userId && a.period_key === periodKey)
    );

    db.dailyAssignments.push({
      id: `assign-${Date.now()}`,
      user_id: userId,
      question_id: nextQ.id,
      period_key: periodKey,
      available_at: availableAt,
      expires_at: nextAvailableAt,
      status: 'available',
      answered_at: null,
    });

    this.saveDb(db);
  }

  // ==================== 10-QUESTION QUIZ ENGINE ====================
  public getEligiblePublishedQuestions(categoryId?: string | null): Question[] {
    const db = this.loadDb();
    return db.questions.filter(
      (q) => q.status === 'published' && (!categoryId || q.category_id === categoryId)
    );
  }

  public startQuizSession(userId: string, categoryId?: string | null): QuizSession {
    const db = this.loadDb();
    const quizSize = db.appSettings.quiz_default_size || 10;

    const eligible = db.questions.filter(
      (q) => q.status === 'published' && (!categoryId || q.category_id === categoryId)
    );

    if (eligible.length < quizSize) {
      throw new Error(
        `Se requieren al menos ${quizSize} preguntas publicadas para iniciar el test (actualmente hay ${eligible.length} disponibles en esta selección).`
      );
    }

    // Prioritize questions the user hasn't answered in their most recent quiz session
    const recentSessions = db.quizSessions
      .filter((s) => s.user_id === userId)
      .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());

    const recentQuestionIds = new Set(
      recentSessions[0]?.questions.map((q) => q.question_id) || []
    );

    const freshQuestions = eligible.filter((q) => !recentQuestionIds.has(q.id));
    const recentQuestions = eligible.filter((q) => recentQuestionIds.has(q.id));

    const shuffle = <T,>(arr: T[]): T[] => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const orderedCandidates = [...shuffle(freshQuestions), ...shuffle(recentQuestions)];
    const selectedQuestions = orderedCandidates.slice(0, quizSize);

    const sessionId = `quiz-${Date.now()}`;
    const sessionQuestions = selectedQuestions.map((q, idx) => ({
      id: `qsq-${sessionId}-${idx + 1}`,
      quiz_session_id: sessionId,
      question_id: q.id,
      position: idx + 1,
      selected_option_id: null,
      is_correct: null,
      answered_at: null,
    }));

    const newSession: QuizSession = {
      id: sessionId,
      user_id: userId,
      category_id: categoryId || null,
      status: 'in_progress',
      total_questions: quizSize,
      correct_answers: 0,
      points_awarded: 0,
      started_at: new Date().toISOString(),
      completed_at: null,
      questions: sessionQuestions,
    };

    db.quizSessions.push(newSession);
    this.saveDb(db);
    return newSession;
  }

  public getQuizSession(sessionId: string): {
    session: QuizSession;
    questionsMap: Record<string, Question>;
    categoriesMap: Record<string, Category>;
  } | null {
    const db = this.loadDb();
    const session = db.quizSessions.find((s) => s.id === sessionId);
    if (!session) return null;

    const questionsMap: Record<string, Question> = {};
    for (const q of db.questions) {
      questionsMap[q.id] = q;
    }

    const categoriesMap: Record<string, Category> = {};
    for (const c of db.categories) {
      categoriesMap[c.id] = c;
    }

    return { session, questionsMap, categoriesMap };
  }

  public answerQuizQuestion(
    userId: string,
    sessionId: string,
    position: number,
    selectedOptionId: string
  ): {
    session: QuizSession;
    isCorrect: boolean;
    correctOptionId: string;
    explanation: string;
    isCompleted: boolean;
  } {
    const db = this.loadDb();
    const sessionIdx = db.quizSessions.findIndex(
      (s) => s.id === sessionId && s.user_id === userId
    );
    if (sessionIdx === -1) throw new Error('Sesión de test no encontrada.');

    const session = db.quizSessions[sessionIdx];
    const qItem = session.questions.find((q) => q.position === position);
    if (!qItem) throw new Error('Pregunta no encontrada en la sesión.');

    const question = db.questions.find((q) => q.id === qItem.question_id);
    if (!question) throw new Error('Pregunta no existe en el banco.');

    const correctOption = question.options.find((o) => o.is_correct) || question.options[0];

    // MVP rule: once confirmed, answer cannot be changed
    if (qItem.selected_option_id !== null) {
      return {
        session,
        isCorrect: Boolean(qItem.is_correct),
        correctOptionId: correctOption.id,
        explanation: question.explanation,
        isCompleted: session.status === 'completed',
      };
    }

    const isCorrect = selectedOptionId === correctOption.id;
    const now = new Date().toISOString();

    qItem.selected_option_id = selectedOptionId;
    qItem.is_correct = isCorrect;
    qItem.answered_at = now;

    // Check if all questions in the session have been answered
    const allAnswered = session.questions.every((q) => q.selected_option_id !== null);

    if (allAnswered && session.status !== 'completed') {
      const correctCount = session.questions.filter((q) => q.is_correct).length;
      const baseCompletionPts = this.getRulePoints(db, 'quiz_completion');
      const perCorrectPts = this.getRulePoints(db, 'quiz_correct_answer');
      const totalQuizPoints = baseCompletionPts + correctCount * perCorrectPts;

      session.correct_answers = correctCount;
      session.status = 'completed';
      session.completed_at = now;

      const idempotencyKey = `quiz-complete-${userId}-${session.id}`;
      const ledgerEntry = this.addLedgerEntry(db, {
        userId,
        amount: totalQuizPoints,
        entryType: 'earn',
        reason: `Test de ${session.total_questions} preguntas completado (${correctCount}/${session.total_questions} aciertos: +${baseCompletionPts} base, +${correctCount * perCorrectPts} por aciertos)`,
        referenceId: session.id,
        idempotencyKey,
      });

      session.points_awarded = ledgerEntry ? totalQuizPoints : 0;

      // Independent XP Calculation for Completed 10-Question Quiz
      const baseQuizXp = this.getRuleXp(db, 'quiz_completion_xp');
      const perCorrectXp = this.getRuleXp(db, 'quiz_correct_answer_xp');
      const totalQuizXp = baseQuizXp + correctCount * perCorrectXp;

      this.addExperienceEntry(db, {
        userId,
        amount: totalQuizXp,
        activityType: 'quiz_completion_xp',
        description: `Test de ${session.total_questions} preguntas completado (${correctCount}/${session.total_questions} aciertos: +${baseQuizXp} XP base, +${correctCount * perCorrectXp} XP aciertos)`,
        referenceId: session.id,
        idempotencyKey: `xp-${idempotencyKey}`,
      });

      this.recordActivityAndStreak(db, userId);
      this.recalculateUserLevelAndHistory(db, userId);
      this.evaluateUserAchievementsInDb(db, userId);
    }

    this.saveDb(db);

    return {
      session,
      isCorrect,
      correctOptionId: correctOption.id,
      explanation: question.explanation,
      isCompleted: session.status === 'completed',
    };
  }

  public getUserQuizHistory(userId: string): QuizSession[] {
    const db = this.loadDb();
    return db.quizSessions
      .filter((s) => s.user_id === userId && s.status === 'completed')
      .sort((a, b) => new Date(b.completed_at || b.started_at).getTime() - new Date(a.completed_at || a.started_at).getTime());
  }

  // ==================== POMODORO STUDY ENGINE ====================
  public getUserPomodoroSessions(userId: string): PomodoroSessionLog[] {
    const db = this.loadDb();
    return (db.pomodoroSessions || [])
      .filter((p) => p.user_id === userId)
      .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
  }

  public completePomodoroCycle(
    userId: string,
    categoryId: string | null,
    durationMinutes: number,
    clientCycleKey: string
  ): {
    sessionLog: PomodoroSessionLog;
    pointsAwarded: number;
    xpAwarded: number;
    streakBonusAwarded: number;
  } {
    const db = this.loadDb();
    const idempotencyKey = `pomodoro-${userId}-${clientCycleKey}`;

    const existing = (db.pomodoroSessions || []).find(
      (s) => s.idempotency_key === idempotencyKey
    );
    if (existing) {
      return {
        sessionLog: existing,
        pointsAwarded: existing.points_awarded,
        xpAwarded: 0,
        streakBonusAwarded: 0,
      };
    }

    const cat = categoryId ? db.categories.find((c) => c.id === categoryId) : null;
    const topicLabel = cat ? cat.name : 'Estudio Urológico General';
    const cyclePoints = this.getRulePoints(db, 'pomodoro_cycle') || 2;
    const now = new Date().toISOString();

    const ledgerEntry = this.addLedgerEntry(db, {
      userId,
      amount: cyclePoints,
      entryType: 'earn',
      reason: `Ciclo Pomodoro completado (${durationMinutes} min • ${topicLabel})`,
      referenceId: null,
      idempotencyKey,
    });

    const awarded = ledgerEntry ? cyclePoints : 0;

    // Independent XP award for Special Challenge / Pomodoro Focus Cycle
    const specialXp = this.getRuleXp(db, 'special_challenge_xp');
    const xpRes = this.addExperienceEntry(db, {
      userId,
      amount: specialXp,
      activityType: 'special_challenge_xp',
      description: `Desafío de estudio Pomodoro completado (${durationMinutes} min • ${topicLabel}) (+${specialXp} XP)`,
      referenceId: null,
      idempotencyKey: `xp-${idempotencyKey}`,
    });

    const sessionLog: PomodoroSessionLog = {
      id: `pomo-${Date.now()}`,
      user_id: userId,
      category_id: categoryId,
      topic_label: topicLabel,
      duration_minutes: durationMinutes,
      points_awarded: awarded,
      completed_at: now,
      idempotency_key: idempotencyKey,
    };

    if (!Array.isArray(db.pomodoroSessions)) {
      db.pomodoroSessions = [];
    }
    db.pomodoroSessions.unshift(sessionLog);

    const { bonusAwarded } = this.recordActivityAndStreak(db, userId);
    this.recalculateUserLevelAndHistory(db, userId);
    this.evaluateUserAchievementsInDb(db, userId);

    this.saveDb(db);

    return {
      sessionLog,
      pointsAwarded: awarded,
      xpAwarded: xpRes.entry ? specialXp : 0,
      streakBonusAwarded: bonusAwarded,
    };
  }

  // ==================== REWARDS & REDEMPTIONS ====================
  public getRewards(includeInactive = false): Reward[] {
    const db = this.loadDb();
    return db.rewards.filter((r) => includeInactive || r.is_active);
  }

  public getRewardById(rewardId: string): Reward | null {
    const db = this.loadDb();
    return db.rewards.find((r) => r.id === rewardId) || null;
  }

  public getUserRedemptions(userId: string): Redemption[] {
    const db = this.loadDb();
    return db.redemptions
      .filter((r) => r.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public getUserAutoAchievements(userId: string): AutoAchievement[] {
    const db = this.loadDb();
    // Ensure latest achievements are evaluated against current stats
    const newlyUnlocked = this.evaluateUserAchievementsInDb(db, userId);
    if (newlyUnlocked.length > 0) {
      this.saveDb(db);
    }

    const stats = this.getUserStats(userId);
    const redemptionsCount = db.redemptions.filter(
      (r) => r.user_id === userId && r.status !== 'rejected' && r.status !== 'cancelled'
    ).length;
    const pomodoroCount = (db.pomodoroSessions || []).filter((p) => p.user_id === userId).length;
    const activeDaysCount = stats.activeDates.length;

    const unlockMap = new Map<string, string>();
    for (const ua of db.userAchievements || []) {
      if (ua.user_id === userId) {
        unlockMap.set(ua.achievement_id, ua.unlocked_at);
      }
    }

    const definitions = (db.achievements || INITIAL_ACHIEVEMENTS).filter((a) => a.is_active);

    return definitions.map((ach) => {
      let progress = 0;
      switch (ach.condition_type) {
        case 'questions_answered':
          progress = Math.min(ach.condition_value, stats.questionsAnswered);
          break;
        case 'correct_answers':
          progress = Math.min(ach.condition_value, stats.correctAnswersCount);
          break;
        case 'quizzes_completed':
          progress = Math.min(ach.condition_value, stats.quizzesCompleted);
          break;
        case 'streak_days':
          progress = Math.min(ach.condition_value, stats.bestStreak);
          break;
        case 'active_days':
          progress = Math.min(ach.condition_value, activeDaysCount);
          break;
        case 'accuracy_pct_min_10_q':
          progress =
            stats.questionsAnswered >= 10
              ? Math.min(ach.condition_value, stats.accuracyPercentage)
              : stats.questionsAnswered;
          break;
        case 'pomodoro_cycles':
          progress = Math.min(ach.condition_value, pomodoroCount);
          break;
        case 'rewards_redeemed':
          progress = Math.min(ach.condition_value, redemptionsCount);
          break;
      }

      const unlockedAt = unlockMap.get(ach.id) || null;
      return {
        id: ach.id,
        name: ach.name,
        description: ach.description,
        criteria_label: `${ach.condition_type}: ${ach.condition_value}`,
        badge_shape: ach.badge_shape,
        badge_color: ach.badge_color,
        unlocked: Boolean(unlockedAt),
        unlocked_at: unlockedAt,
        progress,
        target: ach.condition_value,
      };
    });
  }

  public redeemReward(userId: string, rewardId: string, clientRequestKey: string): Redemption {
    const db = this.loadDb();

    // Check idempotency first
    const idempotencyKey = `redeem-${userId}-${rewardId}-${clientRequestKey}`;
    const existingLedger = db.pointsLedger.find((e) => e.idempotency_key === idempotencyKey);
    if (existingLedger && existingLedger.reference_id) {
      const existingRedemption = db.redemptions.find((r) => r.id === existingLedger.reference_id);
      if (existingRedemption) return existingRedemption;
    }

    const rewardIdx = db.rewards.findIndex((r) => r.id === rewardId);
    if (rewardIdx === -1) throw new Error('El premio seleccionado no existe.');

    const reward = db.rewards[rewardIdx];
    if (!reward.is_active) {
      throw new Error('Este premio no se encuentra activo actualmente.');
    }

    if (reward.stock !== null && reward.stock <= 0) {
      throw new Error('Lo sentimos, este premio tiene el stock agotado.');
    }

    const balance = db.pointsLedger
      .filter((e) => e.user_id === userId)
      .reduce((sum, e) => sum + e.amount, 0);

    if (balance < reward.points_cost) {
      throw new Error(
        `Saldo insuficiente. Necesitas ${reward.points_cost} pts y tu saldo actual es de ${balance} pts.`
      );
    }

    // Atomic deduction & stock update
    if (reward.stock !== null) {
      reward.stock -= 1;
      reward.updated_at = new Date().toISOString();
    }

    const now = new Date().toISOString();
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const redemptionId = `red-${Date.now()}`;
    const redemptionCode = `URO-${new Date().getFullYear()}-${randomSuffix}`;

    const redemption: Redemption = {
      id: redemptionId,
      user_id: userId,
      reward_id: reward.id,
      reward_name: reward.name,
      points_spent: reward.points_cost,
      redemption_code: redemptionCode,
      status: 'pending',
      admin_note: 'Solicitud recibida. Presenta tu código único para validación.',
      processed_by: null,
      created_at: now,
      updated_at: now,
    };

    db.redemptions.push(redemption);

    this.addLedgerEntry(db, {
      userId,
      amount: -reward.points_cost,
      entryType: 'redeem',
      reason: `Canje de premio: ${reward.name} (Código ${redemptionCode})`,
      referenceId: redemption.id,
      idempotencyKey,
    });

    this.saveDb(db);
    return redemption;
  }

  // ==================== CATEGORIES & QUESTIONS BANK ====================
  public getCategories(includeInactive = false): Category[] {
    const db = this.loadDb();
    return db.categories.filter((c) => includeInactive || c.is_active);
  }

  public getQuestions(): Question[] {
    return this.loadDb().questions;
  }

  public getQuestionById(id: string): Question | null {
    return this.loadDb().questions.find((q) => q.id === id) || null;
  }

  // ==================== ADMIN OPERATIONS & AUDIT ====================
  private logAdminAction(
    db: LocalDatabaseState,
    adminId: string,
    action: string,
    entityType: string,
    entityId: string | null,
    details: string
  ) {
    const admin = db.profiles.find((p) => p.id === adminId);
    db.auditLogs.unshift({
      id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      admin_user_id: adminId,
      admin_name: admin?.display_name || 'Administrador',
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      created_at: new Date().toISOString(),
    });
  }

  public saveQuestion(
    adminId: string,
    questionData: Omit<Question, 'id' | 'created_at' | 'updated_at' | 'published_at'> & { id?: string }
  ): Question {
    const db = this.loadDb();
    const now = new Date().toISOString();

    if (questionData.options.length < 2 || questionData.options.length > 6) {
      throw new Error('La pregunta debe tener entre 2 y 6 alternativas.');
    }
    const correctCount = questionData.options.filter((o) => o.is_correct).length;
    if (correctCount !== 1) {
      throw new Error('Debe existir exactamente una respuesta correcta.');
    }

    if (questionData.id) {
      const idx = db.questions.findIndex((q) => q.id === questionData.id);
      if (idx === -1) throw new Error('Pregunta no encontrada.');

      const prev = db.questions[idx];
      const updated: Question = {
        ...prev,
        ...questionData,
        id: prev.id,
        published_at:
          questionData.status === 'published' && !prev.published_at ? now : prev.published_at,
        updated_at: now,
      };
      db.questions[idx] = updated;
      this.logAdminAction(
        db,
        adminId,
        'UPDATE_QUESTION',
        'question',
        updated.id,
        `Pregunta actualizada (${updated.status}): "${updated.question_text.slice(0, 50)}..."`
      );
      this.saveDb(db);
      return updated;
    } else {
      const newId = `q-${Date.now()}`;
      const created: Question = {
        ...questionData,
        id: newId,
        options: questionData.options.map((opt, index) => ({
          ...opt,
          id: opt.id || `${newId}-opt-${index + 1}`,
          question_id: newId,
          sort_order: index + 1,
        })),
        published_at: questionData.status === 'published' ? now : null,
        created_at: now,
        updated_at: now,
      };
      db.questions.unshift(created);
      this.logAdminAction(
        db,
        adminId,
        'CREATE_QUESTION',
        'question',
        created.id,
        `Nueva pregunta creada (${created.status}): "${created.question_text.slice(0, 50)}..."`
      );
      this.saveDb(db);
      return created;
    }
  }

  public duplicateQuestion(adminId: string, questionId: string): Question {
    const db = this.loadDb();
    const original = db.questions.find((q) => q.id === questionId);
    if (!original) throw new Error('Pregunta original no encontrada.');

    const now = new Date().toISOString();
    const newId = `q-${Date.now()}`;
    const copy: Question = {
      ...original,
      id: newId,
      question_text: `${original.question_text} (Copia)`,
      status: 'draft',
      published_at: null,
      created_by: adminId,
      created_at: now,
      updated_at: now,
      options: original.options.map((o, idx) => ({
        ...o,
        id: `${newId}-opt-${idx + 1}`,
        question_id: newId,
      })),
    };

    db.questions.unshift(copy);
    this.logAdminAction(
      db,
      adminId,
      'DUPLICATE_QUESTION',
      'question',
      copy.id,
      `Duplicada desde ${original.id} en estado borrador.`
    );
    this.saveDb(db);
    return copy;
  }

  public updateQuestionStatus(
    adminId: string,
    questionId: string,
    status: Question['status']
  ): Question {
    const db = this.loadDb();
    const idx = db.questions.findIndex((q) => q.id === questionId);
    if (idx === -1) throw new Error('Pregunta no encontrada.');

    const now = new Date().toISOString();
    db.questions[idx].status = status;
    db.questions[idx].updated_at = now;
    if (status === 'published') {
      db.questions[idx].published_at = now;
      db.questions[idx].reviewed_by = adminId;
    }

    this.logAdminAction(
      db,
      adminId,
      'CHANGE_QUESTION_STATUS',
      'question',
      questionId,
      `Estado cambiado a "${status}"`
    );
    this.saveDb(db);
    return db.questions[idx];
  }

  public saveCategory(
    adminId: string,
    categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at'> & { id?: string }
  ): Category {
    const db = this.loadDb();
    const now = new Date().toISOString();

    if (categoryData.id) {
      const idx = db.categories.findIndex((c) => c.id === categoryData.id);
      if (idx === -1) throw new Error('Categoría no encontrada.');

      db.categories[idx] = {
        ...db.categories[idx],
        ...categoryData,
        id: categoryData.id,
        updated_at: now,
      };
      this.logAdminAction(
        db,
        adminId,
        'UPDATE_CATEGORY',
        'category',
        categoryData.id,
        `Categoría "${categoryData.name}" actualizada.`
      );
      this.saveDb(db);
      return db.categories[idx];
    } else {
      const created: Category = {
        ...categoryData,
        id: `cat-${Date.now()}`,
        created_at: now,
        updated_at: now,
      };
      db.categories.push(created);
      this.logAdminAction(
        db,
        adminId,
        'CREATE_CATEGORY',
        'category',
        created.id,
        `Categoría "${created.name}" creada.`
      );
      this.saveDb(db);
      return created;
    }
  }

  public saveReward(
    adminId: string,
    rewardData: Omit<Reward, 'id' | 'created_at' | 'updated_at'> & { id?: string }
  ): Reward {
    const db = this.loadDb();
    const now = new Date().toISOString();

    if (rewardData.points_cost <= 0) {
      throw new Error('El costo en puntos debe ser mayor a 0.');
    }

    if (rewardData.id) {
      const idx = db.rewards.findIndex((r) => r.id === rewardData.id);
      if (idx === -1) throw new Error('Premio no encontrado.');

      db.rewards[idx] = {
        ...db.rewards[idx],
        ...rewardData,
        id: rewardData.id,
        updated_at: now,
      };
      this.logAdminAction(
        db,
        adminId,
        'UPDATE_REWARD',
        'reward',
        rewardData.id,
        `Premio "${rewardData.name}" actualizado (${rewardData.points_cost} pts).`
      );
      this.saveDb(db);
      return db.rewards[idx];
    } else {
      const created: Reward = {
        ...rewardData,
        id: `rew-${Date.now()}`,
        created_at: now,
        updated_at: now,
      };
      db.rewards.push(created);
      this.logAdminAction(
        db,
        adminId,
        'CREATE_REWARD',
        'reward',
        created.id,
        `Premio "${created.name}" creado (${created.points_cost} pts).`
      );
      this.saveDb(db);
      return created;
    }
  }

  public getAllRedemptions(): (Redemption & { user_display_name: string; user_email: string })[] {
    const db = this.loadDb();
    return db.redemptions
      .map((r) => {
        const u = db.profiles.find((p) => p.id === r.user_id);
        return {
          ...r,
          user_display_name: u?.display_name || 'Usuario',
          user_email: u?.email || '',
        };
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public updateRedemptionStatus(
    adminId: string,
    redemptionId: string,
    newStatus: RedemptionStatus,
    adminNote: string
  ): Redemption {
    const db = this.loadDb();
    const idx = db.redemptions.findIndex((r) => r.id === redemptionId);
    if (idx === -1) throw new Error('Canje no encontrado.');

    const redemption = db.redemptions[idx];
    const prevStatus = redemption.status;
    if (prevStatus === newStatus) {
      redemption.admin_note = adminNote;
      this.saveDb(db);
      return redemption;
    }

    const wasRefunded = prevStatus === 'rejected' || prevStatus === 'cancelled';
    const shouldRefund = newStatus === 'rejected' || newStatus === 'cancelled';

    // Compensatory ledger refund when a redemption is rejected or cancelled
    if (!wasRefunded && shouldRefund) {
      this.addLedgerEntry(db, {
        userId: redemption.user_id,
        amount: redemption.points_spent,
        entryType: 'refund',
        reason: `Reembolso compensatorio por canje ${newStatus === 'rejected' ? 'rechazado' : 'cancelado'} (${redemption.redemption_code})`,
        referenceId: redemption.id,
        idempotencyKey: `refund-${redemption.id}`,
        createdBy: adminId,
      });

      // Restore stock if applicable
      const reward = db.rewards.find((rw) => rw.id === redemption.reward_id);
      if (reward && reward.stock !== null) {
        reward.stock += 1;
      }
    }

    redemption.status = newStatus;
    redemption.admin_note = adminNote;
    redemption.processed_by = adminId;
    redemption.updated_at = new Date().toISOString();

    this.logAdminAction(
      db,
      adminId,
      'UPDATE_REDEMPTION_STATUS',
      'redemption',
      redemption.id,
      `Canje ${redemption.redemption_code} cambió de "${prevStatus}" a "${newStatus}".`
    );

    this.saveDb(db);
    return redemption;
  }

  public adjustUserPoints(
    adminId: string,
    targetUserId: string,
    deltaAmount: number,
    reason: string
  ): PointsLedgerEntry {
    if (!reason.trim()) {
      throw new Error('Debes indicar un motivo de auditoría para el ajuste de puntos.');
    }
    if (deltaAmount === 0) {
      throw new Error('El monto del ajuste debe ser distinto de cero.');
    }

    const db = this.loadDb();
    const currentBalance = db.pointsLedger
      .filter((e) => e.user_id === targetUserId)
      .reduce((sum, e) => sum + e.amount, 0);

    if (currentBalance + deltaAmount < 0) {
      throw new Error(
        `No se permite dejar saldo negativo (Saldo actual: ${currentBalance} pts, Ajuste: ${deltaAmount} pts).`
      );
    }

    const entry = this.addLedgerEntry(db, {
      userId: targetUserId,
      amount: deltaAmount,
      entryType: 'adjustment',
      reason: `Ajuste administrativo: ${reason.trim()}`,
      referenceId: null,
      idempotencyKey: `adj-${adminId}-${targetUserId}-${Date.now()}`,
      createdBy: adminId,
    });

    if (!entry) throw new Error('No se pudo registrar el ajuste.');

    this.logAdminAction(
      db,
      adminId,
      'ADJUST_USER_POINTS',
      'user',
      targetUserId,
      `Ajuste de ${deltaAmount > 0 ? `+${deltaAmount}` : deltaAmount} pts. Motivo: ${reason.trim()}`
    );

    this.saveDb(db);
    return entry;
  }

  public updateUserRole(adminId: string, targetUserId: string, role: Profile['role']): Profile {
    const db = this.loadDb();
    const idx = db.profiles.findIndex((p) => p.id === targetUserId);
    if (idx === -1) throw new Error('Usuario no encontrado.');

    db.profiles[idx].role = role;
    db.profiles[idx].updated_at = new Date().toISOString();

    this.logAdminAction(
      db,
      adminId,
      'UPDATE_USER_ROLE',
      'user',
      targetUserId,
      `Rol de ${db.profiles[idx].display_name} cambiado a "${role}".`
    );

    this.saveDb(db);
    return db.profiles[idx];
  }

  public getPointRules(): PointRule[] {
    return this.loadDb().pointRules;
  }

  public updatePointRule(
    adminId: string,
    ruleId: string,
    points: number,
    isActive: boolean
  ): PointRule {
    if (points < 0) throw new Error('Los puntos no pueden ser negativos.');
    const db = this.loadDb();
    const idx = db.pointRules.findIndex((r) => r.id === ruleId);
    if (idx === -1) throw new Error('Regla no encontrada.');

    db.pointRules[idx].points = points;
    db.pointRules[idx].is_active = isActive;
    db.pointRules[idx].updated_by = adminId;
    db.pointRules[idx].updated_at = new Date().toISOString();

    this.logAdminAction(
      db,
      adminId,
      'UPDATE_POINT_RULE',
      'point_rule',
      ruleId,
      `Regla "${db.pointRules[idx].action_key}" configurada a ${points} pts (${isActive ? 'activa' : 'inactiva'}).`
    );

    this.saveDb(db);
    return db.pointRules[idx];
  }

  public getSchedule(): QuestionSchedule {
    return this.loadDb().schedule;
  }

  public updateSchedule(
    adminId: string,
    updates: Pick<
      QuestionSchedule,
      'name' | 'preset' | 'interval_value' | 'interval_unit' | 'allow_retries' | 'is_active'
    >
  ): QuestionSchedule {
    const db = this.loadDb();
    db.schedule = {
      ...db.schedule,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    this.logAdminAction(
      db,
      adminId,
      'UPDATE_SCHEDULE',
      'schedule',
      db.schedule.id,
      `Frecuencia actualizada: cada ${updates.interval_value} ${updates.interval_unit === 'days' ? 'día(s)' : 'hora(s)'} (Reintentos: ${updates.allow_retries ? 'Sí' : 'No'}).`
    );

    this.saveDb(db);
    return db.schedule;
  }

  public getAppSettings(): AppSettings {
    return this.loadDb().appSettings;
  }

  public updateAppSettings(adminId: string, updates: Partial<AppSettings>): AppSettings {
    const db = this.loadDb();
    db.appSettings = {
      ...db.appSettings,
      ...updates,
    };

    this.logAdminAction(
      db,
      adminId,
      'UPDATE_APP_SETTINGS',
      'settings',
      null,
      'Configuración general de la plataforma actualizada.'
    );

    this.saveDb(db);
    return db.appSettings;
  }

  public getAuditLogs(): AdminAuditLog[] {
    return this.loadDb().auditLogs;
  }

  public getAdminDashboardSummary(): {
    activeUsersCount: number;
    publishedQuestionsCount: number;
    totalQuestionsCount: number;
    totalAnswersCount: number;
    completedQuizzesCount: number;
    totalPointsIssued: number;
    pendingRedemptionsCount: number;
  } {
    const db = this.loadDb();
    const publishedQuestionsCount = db.questions.filter((q) => q.status === 'published').length;
    const completedQuizzes = db.quizSessions.filter((q) => q.status === 'completed');
    const dailyAttempts = db.answerAttempts.filter((a) => a.source === 'daily');
    const quizAnswers = completedQuizzes.reduce((sum, q) => sum + q.total_questions, 0);
    const totalPointsIssued = db.pointsLedger
      .filter((e) => e.amount > 0)
      .reduce((sum, e) => sum + e.amount, 0);
    const pendingRedemptionsCount = db.redemptions.filter((r) => r.status === 'pending').length;

    return {
      activeUsersCount: db.profiles.length,
      publishedQuestionsCount,
      totalQuestionsCount: db.questions.length,
      totalAnswersCount: dailyAttempts.length + quizAnswers,
      completedQuizzesCount: completedQuizzes.length,
      totalPointsIssued,
      pendingRedemptionsCount,
    };
  }

  // ==================== ADMIN GAMIFICATION (LEVELS, XP RULES, ACHIEVEMENTS, XP AUDIT) ====================
  public saveLevelDefinition(
    adminId: string,
    levelData: Omit<LevelDefinition, 'id' | 'created_at' | 'updated_at'> & { id?: string }
  ): LevelDefinition {
    if (levelData.min_xp < 0) {
      throw new Error('La experiencia mínima no puede ser negativa.');
    }
    if (levelData.max_xp !== null && levelData.max_xp <= levelData.min_xp) {
      throw new Error('La experiencia máxima debe ser mayor a la experiencia mínima.');
    }

    const db = this.loadDb();
    const now = new Date().toISOString();

    if (levelData.id) {
      const idx = db.levels.findIndex((l) => l.id === levelData.id);
      if (idx === -1) throw new Error('Nivel no encontrado.');

      db.levels[idx] = {
        ...db.levels[idx],
        ...levelData,
        id: levelData.id,
        updated_at: now,
      };
      this.logAdminAction(
        db,
        adminId,
        'UPDATE_LEVEL',
        'level',
        levelData.id,
        `Nivel ${levelData.roman_numeral} — ${levelData.name} actualizado (${levelData.min_xp}–${levelData.max_xp ?? '+'} XP).`
      );
      // Recalculate all users' levels against updated thresholds
      for (const p of db.profiles) {
        this.recalculateUserLevelAndHistory(db, p.id);
      }
      this.saveDb(db);
      return db.levels[idx];
    } else {
      const created: LevelDefinition = {
        ...levelData,
        id: `lvl-${Date.now()}`,
        created_at: now,
        updated_at: now,
      };
      db.levels.push(created);
      db.levels.sort((a, b) => a.level_number - b.level_number);
      this.logAdminAction(
        db,
        adminId,
        'CREATE_LEVEL',
        'level',
        created.id,
        `Nivel ${created.roman_numeral} — ${created.name} creado.`
      );
      for (const p of db.profiles) {
        this.recalculateUserLevelAndHistory(db, p.id);
      }
      this.saveDb(db);
      return created;
    }
  }

  public updateExperienceRule(
    adminId: string,
    ruleId: string,
    xpAmount: number,
    isActive: boolean
  ): ExperienceRule {
    if (xpAmount < 0) throw new Error('La experiencia no puede ser negativa.');
    const db = this.loadDb();
    const idx = db.experienceRules.findIndex((r) => r.id === ruleId);
    if (idx === -1) throw new Error('Regla de experiencia no encontrada.');

    db.experienceRules[idx].xp_amount = xpAmount;
    db.experienceRules[idx].is_active = isActive;
    db.experienceRules[idx].updated_at = new Date().toISOString();

    this.logAdminAction(
      db,
      adminId,
      'UPDATE_XP_RULE',
      'experience_rule',
      ruleId,
      `Regla XP "${db.experienceRules[idx].action_key}" configurada a ${xpAmount} XP (${isActive ? 'activa' : 'inactiva'}).`
    );

    this.saveDb(db);
    return db.experienceRules[idx];
  }

  public saveAchievementDefinition(
    adminId: string,
    achData: Omit<AchievementDefinition, 'id'> & { id?: string }
  ): AchievementDefinition {
    if (achData.condition_value <= 0) {
      throw new Error('El valor de la condición debe ser mayor a 0.');
    }
    const db = this.loadDb();

    if (achData.id) {
      const idx = db.achievements.findIndex((a) => a.id === achData.id);
      if (idx === -1) throw new Error('Logro no encontrado.');
      db.achievements[idx] = {
        ...db.achievements[idx],
        ...achData,
        id: achData.id,
      };
      this.logAdminAction(
        db,
        adminId,
        'UPDATE_ACHIEVEMENT',
        'achievement',
        achData.id,
        `Logro "${achData.name}" actualizado.`
      );
      this.saveDb(db);
      return db.achievements[idx];
    } else {
      const created: AchievementDefinition = {
        ...achData,
        id: `ach-${Date.now()}`,
      };
      db.achievements.push(created);
      this.logAdminAction(
        db,
        adminId,
        'CREATE_ACHIEVEMENT',
        'achievement',
        created.id,
        `Logro "${created.name}" creado.`
      );
      this.saveDb(db);
      return created;
    }
  }

  public adjustUserExperience(
    adminId: string,
    targetUserId: string,
    xpAmount: number,
    reason: string
  ): ExperienceLedgerEntry {
    if (!reason.trim()) {
      throw new Error('Debes indicar un motivo justificativo para el ajuste de experiencia.');
    }
    if (xpAmount <= 0) {
      throw new Error('La experiencia acreditada debe ser mayor a 0 (la experiencia nunca disminuye).');
    }

    const db = this.loadDb();
    const res = this.addExperienceEntry(db, {
      userId: targetUserId,
      amount: xpAmount,
      activityType: 'admin_adjustment',
      description: `Ajuste administrativo de XP: ${reason.trim()}`,
      referenceId: null,
      idempotencyKey: `xp-adj-${adminId}-${targetUserId}-${Date.now()}`,
    });

    if (!res.entry) {
      throw new Error('No fue posible registrar el ajuste de experiencia.');
    }

    this.logAdminAction(
      db,
      adminId,
      'ADJUST_USER_XP',
      'user_experience',
      targetUserId,
      `Acreditados +${xpAmount} XP. Motivo: ${reason.trim()}`
    );

    this.saveDb(db);
    return res.entry;
  }

  // ==================== UROLOGY DICTIONARY MODULE ====================
  public normalizeSearchText(text: string): string {
    return (text || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  public slugifyText(text: string): string {
    return this.normalizeSearchText(text)
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  public getDictionaryCategories(includeInactive = false): UrologyDictionaryCategory[] {
    const db = this.loadDb();
    return (db.dictionaryCategories || INITIAL_DICTIONARY_CATEGORIES)
      .filter((c) => includeInactive || c.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  }

  private enrichTerm(
    db: LocalDatabaseState,
    term: UrologyTerm,
    userId?: string,
    includeUnpublishedRelations = false
  ): UrologyTermEnriched {
    const category =
      (db.dictionaryCategories || []).find((c) => c.id === term.category_id) || null;
    const aliases = (db.dictionaryAliases || []).filter((a) => a.term_id === term.id);
    const tags = (db.dictionaryTags || []).filter((t) => t.term_id === term.id);
    const references = (db.dictionaryReferences || []).filter((r) => r.term_id === term.id);

    // Bidirectional relation resolution (term_id -> related_term_id OR related_term_id -> term_id)
    const relIds = new Set<string>();
    for (const rel of db.dictionaryRelations || []) {
      if (rel.term_id === term.id && rel.related_term_id !== term.id) {
        relIds.add(rel.related_term_id);
      } else if (rel.related_term_id === term.id && rel.term_id !== term.id) {
        relIds.add(rel.term_id);
      }
    }

    const related_terms: UrologyTermEnriched['related_terms'] = [];
    for (const rId of relIds) {
      const rTerm = (db.dictionaryTerms || []).find((t) => t.id === rId);
      if (
        rTerm &&
        (includeUnpublishedRelations || rTerm.editorial_status === 'published')
      ) {
        const rCat = (db.dictionaryCategories || []).find((c) => c.id === rTerm.category_id);
        related_terms.push({
          id: rTerm.id,
          term: rTerm.term,
          slug: rTerm.slug,
          short_definition: rTerm.short_definition,
          category_name: rCat?.name || 'Urología',
        });
      }
    }

    const is_favorite = userId
      ? (db.userFavoriteTerms || []).some(
          (f) => f.user_id === userId && f.term_id === term.id
        )
      : false;

    return {
      ...term,
      category,
      aliases,
      tags,
      references,
      related_terms,
      is_favorite,
    };
  }

  public getDictionaryTerms(params?: {
    userId?: string;
    includeUnpublished?: boolean;
    categoryId?: string | null;
    statusFilter?: TermEditorialStatus | 'all';
    query?: string;
    onlyFavorites?: boolean;
  }): UrologyTermEnriched[] {
    const db = this.loadDb();
    const userId = params?.userId;
    const includeUnpublished = Boolean(params?.includeUnpublished);
    const categoryId = params?.categoryId || null;
    const statusFilter = params?.statusFilter || 'all';
    const rawQuery = params?.query || '';
    const normQuery = this.normalizeSearchText(rawQuery);
    const onlyFavorites = Boolean(params?.onlyFavorites);

    const activeCatIds = new Set(
      (db.dictionaryCategories || [])
        .filter((c) => includeUnpublished || c.is_active)
        .map((c) => c.id)
    );

    const favTermIds = new Set(
      userId
        ? (db.userFavoriteTerms || [])
            .filter((f) => f.user_id === userId)
            .map((f) => f.term_id)
        : []
    );

    const candidates = (db.dictionaryTerms || []).filter((t) => {
      if (!includeUnpublished && t.editorial_status !== 'published') return false;
      if (!includeUnpublished && !activeCatIds.has(t.category_id)) return false;
      if (statusFilter !== 'all' && t.editorial_status !== statusFilter) return false;
      if (categoryId && t.category_id !== categoryId) return false;
      if (onlyFavorites && !favTermIds.has(t.id)) return false;
      return true;
    });

    const enriched = candidates.map((t) =>
      this.enrichTerm(db, t, userId, includeUnpublished)
    );

    if (!normQuery) {
      return enriched.sort((a, b) => a.term.localeCompare(b.term, 'es'));
    }

    // Smart relevance scoring (accent-insensitive, case-insensitive, prioritizes exact/abbreviation/prefix matches)
    const scored: Array<{ item: UrologyTermEnriched; score: number }> = [];

    for (const item of enriched) {
      const normTerm = this.normalizeSearchText(item.term);
      const normAliases = item.aliases.map((a) => this.normalizeSearchText(a.alias));
      const normTags = item.tags.map((tg) => this.normalizeSearchText(tg.tag));
      const normShort = this.normalizeSearchText(item.short_definition);
      const normFull = this.normalizeSearchText(item.full_definition);

      let score = 0;

      if (normTerm === normQuery) {
        score += 100;
      } else if (normAliases.some((a) => a === normQuery)) {
        score += 95; // Exact abbreviation or synonym match (e.g. "HPB", "PSA", "STUI")
      } else if (normTerm.startsWith(normQuery)) {
        score += 80;
      } else if (normAliases.some((a) => a.startsWith(normQuery))) {
        score += 75;
      } else if (normTerm.includes(normQuery)) {
        score += 60;
      } else if (normAliases.some((a) => a.includes(normQuery))) {
        score += 55;
      }

      if (normTags.some((tg) => tg.includes(normQuery))) {
        score += 35;
      }
      if (normShort.includes(normQuery)) {
        score += 25;
      }
      if (normFull.includes(normQuery)) {
        score += 15;
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    }

    return scored
      .sort((a, b) =>
        b.score !== a.score ? b.score - a.score : a.item.term.localeCompare(b.item.term, 'es')
      )
      .map((s) => s.item);
  }

  public getDictionaryTermBySlug(
    slug: string,
    userId?: string,
    allowUnpublished = false
  ): UrologyTermEnriched | null {
    const db = this.loadDb();
    const cleanSlug = slug.trim().toLowerCase();
    const found = (db.dictionaryTerms || []).find(
      (t) => t.slug.toLowerCase() === cleanSlug || t.id === slug
    );
    if (!found) return null;
    if (!allowUnpublished && found.editorial_status !== 'published') {
      return null;
    }
    return this.enrichTerm(db, found, userId, allowUnpublished);
  }

  public toggleFavoriteTerm(userId: string, termId: string): boolean {
    const db = this.loadDb();
    if (!Array.isArray(db.userFavoriteTerms)) {
      db.userFavoriteTerms = [];
    }
    const existingIdx = db.userFavoriteTerms.findIndex(
      (f) => f.user_id === userId && f.term_id === termId
    );
    if (existingIdx >= 0) {
      db.userFavoriteTerms.splice(existingIdx, 1);
      this.saveDb(db);
      return false;
    } else {
      db.userFavoriteTerms.push({
        id: `ufav-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        user_id: userId,
        term_id: termId,
        created_at: new Date().toISOString(),
      });
      this.saveDb(db);
      return true;
    }
  }

  public recordTermView(userId: string, termId: string): UserTermView {
    const db = this.loadDb();
    if (!Array.isArray(db.userTermViews)) {
      db.userTermViews = [];
    }
    const now = new Date().toISOString();

    // Sort user views descending to check if the most recent view is already this exact term
    const userViews = db.userTermViews
      .filter((v) => v.user_id === userId)
      .sort((a, b) => new Date(b.viewed_at).getTime() - new Date(a.viewed_at).getTime());

    if (userViews.length > 0 && userViews[0].term_id === termId) {
      // Avoid consecutive duplicate entry: update timestamp of most recent view
      userViews[0].viewed_at = now;
      this.saveDb(db);
      return userViews[0];
    }

    const newView: UserTermView = {
      id: `uview-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      user_id: userId,
      term_id: termId,
      viewed_at: now,
    };
    db.userTermViews.unshift(newView);
    this.saveDb(db);
    return newView;
  }

  public getUserTermHistory(
    userId: string
  ): Array<{ view: UserTermView; term: UrologyTermEnriched }> {
    const db = this.loadDb();
    const views = (db.userTermViews || [])
      .filter((v) => v.user_id === userId)
      .sort((a, b) => new Date(b.viewed_at).getTime() - new Date(a.viewed_at).getTime());

    const result: Array<{ view: UserTermView; term: UrologyTermEnriched }> = [];
    for (const v of views) {
      const t = (db.dictionaryTerms || []).find(
        (item) => item.id === v.term_id && item.editorial_status === 'published'
      );
      if (t) {
        result.push({
          view: v,
          term: this.enrichTerm(db, t, userId, false),
        });
      }
    }
    return result;
  }

  public deleteTermHistoryEntry(userId: string, viewId: string): void {
    const db = this.loadDb();
    db.userTermViews = (db.userTermViews || []).filter(
      (v) => !(v.id === viewId && v.user_id === userId)
    );
    this.saveDb(db);
  }

  public clearUserTermHistory(userId: string): void {
    const db = this.loadDb();
    db.userTermViews = (db.userTermViews || []).filter((v) => v.user_id !== userId);
    this.saveDb(db);
  }

  // ==================== ADMIN DICTIONARY MANAGEMENT ====================
  public getDictionaryAdminStats(): DictionaryAdminStats {
    const db = this.loadDb();
    const terms = db.dictionaryTerms || [];
    const views = db.userTermViews || [];
    const favs = db.userFavoriteTerms || [];

    const viewCounts = new Map<string, number>();
    for (const v of views) {
      viewCounts.set(v.term_id, (viewCounts.get(v.term_id) || 0) + 1);
    }

    const favCounts = new Map<string, number>();
    for (const f of favs) {
      favCounts.set(f.term_id, (favCounts.get(f.term_id) || 0) + 1);
    }

    const mostViewedTerms = terms
      .map((t) => ({
        term_id: t.id,
        term: t.term,
        slug: t.slug,
        views_count: viewCounts.get(t.id) || 0,
      }))
      .filter((x) => x.views_count > 0)
      .sort((a, b) => b.views_count - a.views_count)
      .slice(0, 5);

    const mostFavoritedTerms = terms
      .map((t) => ({
        term_id: t.id,
        term: t.term,
        slug: t.slug,
        favorites_count: favCounts.get(t.id) || 0,
      }))
      .filter((x) => x.favorites_count > 0)
      .sort((a, b) => b.favorites_count - a.favorites_count)
      .slice(0, 5);

    return {
      totalTerms: terms.length,
      publishedTerms: terms.filter((t) => t.editorial_status === 'published').length,
      reviewTerms: terms.filter((t) => t.editorial_status === 'review').length,
      draftTerms: terms.filter((t) => t.editorial_status === 'draft').length,
      archivedTerms: terms.filter((t) => t.editorial_status === 'archived').length,
      totalCategories: (db.dictionaryCategories || []).length,
      mostViewedTerms,
      mostFavoritedTerms,
    };
  }

  public saveDictionaryCategory(
    adminId: string,
    data: Omit<UrologyDictionaryCategory, 'id' | 'created_at' | 'updated_at'> & { id?: string }
  ): UrologyDictionaryCategory {
    if (!data.name.trim()) {
      throw new Error('El nombre de la categoría es obligatorio.');
    }
    const db = this.loadDb();
    const now = new Date().toISOString();
    const slug = data.slug?.trim() ? this.slugifyText(data.slug) : this.slugifyText(data.name);

    const duplicateSlug = db.dictionaryCategories.find(
      (c) => c.slug === slug && c.id !== data.id
    );
    if (duplicateSlug) {
      throw new Error(`Ya existe una categoría en el diccionario con el slug "${slug}".`);
    }

    if (data.id) {
      const idx = db.dictionaryCategories.findIndex((c) => c.id === data.id);
      if (idx === -1) throw new Error('Categoría de diccionario no encontrada.');
      db.dictionaryCategories[idx] = {
        ...db.dictionaryCategories[idx],
        ...data,
        id: data.id,
        slug,
        updated_at: now,
      };
      this.logAdminAction(
        db,
        adminId,
        'UPDATE_DICTIONARY_CATEGORY',
        'urology_category',
        data.id,
        `Categoría de diccionario "${data.name}" actualizada.`
      );
      this.saveDb(db);
      return db.dictionaryCategories[idx];
    } else {
      const created: UrologyDictionaryCategory = {
        ...data,
        id: `ucat-${Date.now()}`,
        slug,
        created_at: now,
        updated_at: now,
      };
      db.dictionaryCategories.push(created);
      this.logAdminAction(
        db,
        adminId,
        'CREATE_DICTIONARY_CATEGORY',
        'urology_category',
        created.id,
        `Categoría de diccionario "${created.name}" creada.`
      );
      this.saveDb(db);
      return created;
    }
  }

  public saveDictionaryTerm(
    adminId: string,
    payload: {
      id?: string;
      term: string;
      slug?: string;
      short_definition: string;
      full_definition: string;
      category_id: string;
      image_url: string | null;
      editorial_status: TermEditorialStatus;
      is_demo_pending_review?: boolean;
      aliases: Array<{ alias: string; alias_type: TermAliasType }>;
      tags: string[];
      references: Array<Omit<UrologyTermReference, 'id' | 'term_id'>>;
      related_term_ids: string[];
    }
  ): UrologyTermEnriched {
    if (!payload.term.trim()) {
      throw new Error('El nombre del término es obligatorio.');
    }
    if (!payload.short_definition.trim()) {
      throw new Error('La definición breve es obligatoria.');
    }
    if (!payload.category_id) {
      throw new Error('La categoría del término es obligatoria.');
    }

    if (payload.image_url && payload.image_url.trim()) {
      try {
        new URL(payload.image_url.trim());
      } catch {
        throw new Error('La URL de la imagen opcional no tiene un formato válido (https://...).');
      }
    }

    for (const ref of payload.references) {
      if (ref.url && ref.url.trim()) {
        try {
          new URL(ref.url.trim());
        } catch {
          throw new Error(`La URL de la referencia "${ref.reference_title}" no es válida.`);
        }
      }
    }

    const db = this.loadDb();
    const now = new Date().toISOString();
    const slug = payload.slug?.trim()
      ? this.slugifyText(payload.slug)
      : this.slugifyText(payload.term);

    if (!slug) {
      throw new Error('El slug generado no es válido.');
    }

    const existingSlug = db.dictionaryTerms.find(
      (t) => t.slug.toLowerCase() === slug.toLowerCase() && t.id !== payload.id
    );
    if (existingSlug) {
      throw new Error(`El slug "${slug}" ya está siendo utilizado por el término "${existingSlug.term}".`);
    }

    let termRecord: UrologyTerm;

    if (payload.id) {
      const idx = db.dictionaryTerms.findIndex((t) => t.id === payload.id);
      if (idx === -1) throw new Error('Término no encontrado.');
      const prev = db.dictionaryTerms[idx];
      termRecord = {
        ...prev,
        term: payload.term.trim(),
        slug,
        short_definition: payload.short_definition.trim(),
        full_definition: payload.full_definition.trim(),
        category_id: payload.category_id,
        image_url: payload.image_url?.trim() || null,
        editorial_status: payload.editorial_status,
        is_demo_pending_review:
          payload.editorial_status === 'published'
            ? false
            : (payload.is_demo_pending_review ?? prev.is_demo_pending_review),
        reviewed_by:
          payload.editorial_status === 'published' ? adminId : prev.reviewed_by,
        published_at:
          payload.editorial_status === 'published' && !prev.published_at
            ? now
            : prev.published_at,
        updated_at: now,
      };
      db.dictionaryTerms[idx] = termRecord;
      this.logAdminAction(
        db,
        adminId,
        'UPDATE_DICTIONARY_TERM',
        'urology_term',
        termRecord.id,
        `Término "${termRecord.term}" actualizado (estado: ${termRecord.editorial_status}).`
      );
    } else {
      const newId = `uterm-${Date.now()}`;
      termRecord = {
        id: newId,
        term: payload.term.trim(),
        slug,
        short_definition: payload.short_definition.trim(),
        full_definition: payload.full_definition.trim(),
        category_id: payload.category_id,
        image_url: payload.image_url?.trim() || null,
        editorial_status: payload.editorial_status,
        is_demo_pending_review: payload.is_demo_pending_review ?? false,
        created_by: adminId,
        reviewed_by: payload.editorial_status === 'published' ? adminId : null,
        published_at: payload.editorial_status === 'published' ? now : null,
        created_at: now,
        updated_at: now,
      };
      db.dictionaryTerms.unshift(termRecord);
      this.logAdminAction(
        db,
        adminId,
        'CREATE_DICTIONARY_TERM',
        'urology_term',
        termRecord.id,
        `Término "${termRecord.term}" creado (estado: ${termRecord.editorial_status}).`
      );
    }

    // Replace aliases (deduplicated)
    db.dictionaryAliases = db.dictionaryAliases.filter((a) => a.term_id !== termRecord.id);
    const seenAliases = new Set<string>();
    for (const al of payload.aliases) {
      const cleanAlias = al.alias.trim();
      const normAl = this.normalizeSearchText(cleanAlias);
      if (cleanAlias && !seenAliases.has(`${al.alias_type}:${normAl}`)) {
        seenAliases.add(`${al.alias_type}:${normAl}`);
        db.dictionaryAliases.push({
          id: `ualias-${termRecord.id}-${seenAliases.size}-${Date.now()}`,
          term_id: termRecord.id,
          alias: cleanAlias,
          alias_type: al.alias_type,
        });
      }
    }

    // Replace tags (deduplicated)
    db.dictionaryTags = db.dictionaryTags.filter((t) => t.term_id !== termRecord.id);
    const seenTags = new Set<string>();
    for (const tg of payload.tags) {
      const cleanTag = tg.trim();
      const normTg = this.normalizeSearchText(cleanTag);
      if (cleanTag && !seenTags.has(normTg)) {
        seenTags.add(normTg);
        db.dictionaryTags.push({
          id: `utag-${termRecord.id}-${seenTags.size}-${Date.now()}`,
          term_id: termRecord.id,
          tag: cleanTag,
        });
      }
    }

    // Replace references
    db.dictionaryReferences = db.dictionaryReferences.filter((r) => r.term_id !== termRecord.id);
    payload.references.forEach((ref, idx) => {
      if (ref.reference_title.trim()) {
        db.dictionaryReferences.push({
          id: `uref-${termRecord.id}-${idx + 1}-${Date.now()}`,
          term_id: termRecord.id,
          reference_title: ref.reference_title.trim(),
          authors: ref.authors?.trim() || null,
          publication_year: ref.publication_year || null,
          source_name: ref.source_name?.trim() || null,
          url: ref.url?.trim() || null,
          accessed_at: ref.accessed_at || null,
        });
      }
    });

    // Replace outgoing relations (prevent self-relation & duplicates)
    db.dictionaryRelations = db.dictionaryRelations.filter(
      (r) => r.term_id !== termRecord.id
    );
    const uniqueRelated = new Set(
      payload.related_term_ids.filter((rid) => rid && rid !== termRecord.id)
    );
    for (const rid of uniqueRelated) {
      db.dictionaryRelations.push({
        id: `urel-${termRecord.id}-${rid}`,
        term_id: termRecord.id,
        related_term_id: rid,
        relation_type: 'related',
        created_at: now,
      });
    }

    this.saveDb(db);
    return this.enrichTerm(db, termRecord, adminId, true);
  }

  public duplicateDictionaryTerm(adminId: string, termId: string): UrologyTermEnriched {
    const db = this.loadDb();
    const orig = db.dictionaryTerms.find((t) => t.id === termId);
    if (!orig) throw new Error('Término original no encontrado.');

    const enrichedOrig = this.enrichTerm(db, orig, adminId, true);
    const copyName = `${orig.term} (Copia)`;
    const copySlug = `${orig.slug}-copia-${Date.now().toString().slice(-4)}`;

    return this.saveDictionaryTerm(adminId, {
      term: copyName,
      slug: copySlug,
      short_definition: orig.short_definition,
      full_definition: orig.full_definition,
      category_id: orig.category_id,
      image_url: orig.image_url,
      editorial_status: 'draft',
      is_demo_pending_review: true,
      aliases: enrichedOrig.aliases.map((a) => ({
        alias: a.alias,
        alias_type: a.alias_type,
      })),
      tags: enrichedOrig.tags.map((t) => t.tag),
      references: enrichedOrig.references.map((r) => ({
        reference_title: r.reference_title,
        authors: r.authors,
        publication_year: r.publication_year,
        source_name: r.source_name,
        url: r.url,
        accessed_at: r.accessed_at,
      })),
      related_term_ids: enrichedOrig.related_terms.map((rt) => rt.id),
    });
  }

  public updateDictionaryTermStatus(
    adminId: string,
    termId: string,
    status: TermEditorialStatus
  ): UrologyTermEnriched {
    const db = this.loadDb();
    const idx = db.dictionaryTerms.findIndex((t) => t.id === termId);
    if (idx === -1) throw new Error('Término no encontrado.');

    const now = new Date().toISOString();
    db.dictionaryTerms[idx].editorial_status = status;
    db.dictionaryTerms[idx].updated_at = now;
    if (status === 'published') {
      db.dictionaryTerms[idx].published_at = now;
      db.dictionaryTerms[idx].reviewed_by = adminId;
      db.dictionaryTerms[idx].is_demo_pending_review = false;
    }

    this.logAdminAction(
      db,
      adminId,
      'CHANGE_DICTIONARY_TERM_STATUS',
      'urology_term',
      termId,
      `Estado editorial de "${db.dictionaryTerms[idx].term}" cambiado a "${status}".`
    );

    this.saveDb(db);
    return this.enrichTerm(db, db.dictionaryTerms[idx], adminId, true);
  }
}

export const uroRepository = new UroChallengeRepository();
