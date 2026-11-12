import { describe, it, expect, beforeEach } from 'vitest';
import { uroRepository } from '../src/services/uroRepository';

describe('UroChallenge Domain & Repository Engine', () => {
  beforeEach(() => {
    localStorage.clear();
    uroRepository.resetDemoDatabase();
  });

  it('1. Inicializa correctamente las 9 categorías, 332 preguntas (los 9 módulos completos) y 18 recompensas con insignias del álbum', () => {
    const categories = uroRepository.getCategories();
    const questions = uroRepository.getQuestions();
    const rewards = uroRepository.getRewards();

    expect(categories.length).toBe(9);
    expect(questions.length).toBe(332);
    const prostateQuestions = questions.filter((q) => q.id.startsWith('q-cap-'));
    expect(prostateQuestions.length).toBe(60);
    expect(prostateQuestions.filter((q) => q.difficulty === 'basic').length).toBe(30);
    expect(prostateQuestions.filter((q) => q.difficulty === 'intermediate').length).toBe(30);
    expect(rewards.length).toBe(18);
  });

  it('2. Responde la pregunta periódica, acredita puntos exactos y evita duplicados por reintento', () => {
    const userId = 'user-demo-01';
    const initialBalance = uroRepository.getUserBalance(userId);
    const daily = uroRepository.getDailyQuestionState(userId);

    expect(daily.assignment).not.toBeNull();
    expect(daily.question).not.toBeNull();

    const correctOpt = daily.question!.options.find((o) => o.is_correct)!;
    const res1 = uroRepository.submitDailyQuestionAnswer(
      userId,
      daily.assignment!.id,
      correctOpt.id
    );

    expect(res1.isCorrect).toBe(true);
    expect(res1.pointsAwarded).toBe(10); // 5 participación + 5 acierto
    expect(res1.streakBonusAwarded).toBe(5); // Completó 3 días consecutivos de actividad (+5 bono racha)
    const expectedBalance = initialBalance + res1.pointsAwarded + res1.streakBonusAwarded;
    expect(uroRepository.getUserBalance(userId)).toBe(expectedBalance);

    // Repeating the submission for the same period must not duplicate points
    const res2 = uroRepository.submitDailyQuestionAnswer(
      userId,
      daily.assignment!.id,
      correctOpt.id
    );
    expect(uroRepository.getUserBalance(userId)).toBe(expectedBalance);
    expect(res2.assignment.status).toBe('answered');
  });

  it('3. Inicia y completa un test de 10 preguntas sin repeticiones y calcula aciertos y puntos', () => {
    const userId = 'user-demo-01';
    const initialBalance = uroRepository.getUserBalance(userId);

    const session = uroRepository.startQuizSession(userId, null);
    expect(session.total_questions).toBe(10);
    expect(session.questions.length).toBe(10);

    // Verify all 10 selected questions are unique
    const uniqueIds = new Set(session.questions.map((q) => q.question_id));
    expect(uniqueIds.size).toBe(10);

    const sessionData = uroRepository.getQuizSession(session.id)!;

    // Answer all 10 questions correctly
    for (const qItem of session.questions) {
      const q = sessionData.questionsMap[qItem.question_id];
      const correctOpt = q.options.find((o) => o.is_correct)!;
      uroRepository.answerQuizQuestion(userId, session.id, qItem.position, correctOpt.id);
    }

    const updated = uroRepository.getQuizSession(session.id)!.session;
    expect(updated.status).toBe('completed');
    expect(updated.correct_answers).toBe(10);
    // 10 base + (10 * 2 per correct) = 30 pts
    expect(updated.points_awarded).toBe(30);
    expect(uroRepository.getUserBalance(userId)).toBeGreaterThanOrEqual(initialBalance + 30);
  });

  it('4. Valida saldo al canjear premios, descuenta puntos y reembolsa si el admin rechaza el canje', () => {
    const userId = 'user-demo-01';
    const adminId = 'admin-demo-01';
    const initialBalance = uroRepository.getUserBalance(userId); // 61 pts in seed

    // Reward rew-badge-01 ("Insignia Digital: Primeros pasos") costs 30 pts
    const redemption = uroRepository.redeemReward(userId, 'rew-badge-01', 'req-key-001');
    expect(redemption.points_spent).toBe(30);
    expect(uroRepository.getUserBalance(userId)).toBe(initialBalance - 30);

    // Duplicate call with same idempotency key should not deduct twice
    uroRepository.redeemReward(userId, 'rew-badge-01', 'req-key-001');
    expect(uroRepository.getUserBalance(userId)).toBe(initialBalance - 30);

    // Attempting to redeem expensive reward (600 pts) with insufficient balance throws error
    expect(() =>
      uroRepository.redeemReward(userId, 'rew-badge-09', 'req-key-expensive')
    ).toThrow(/Saldo insuficiente/i);

    // Admin rejects redemption -> compensatory refund restores user balance
    uroRepository.updateRedemptionStatus(
      adminId,
      redemption.id,
      'rejected',
      'Prueba de reembolso compensatorio'
    );
    expect(uroRepository.getUserBalance(userId)).toBe(initialBalance);
  });

  it('5. Acredita +2 puntos al completar cada ciclo de estudio Pomodoro sin duplicar por reintento', () => {
    const userId = 'user-demo-01';
    const initialBalance = uroRepository.getUserBalance(userId);

    const res = uroRepository.completePomodoroCycle(
      userId,
      'cat-litiasis',
      25,
      'pomodoro-cycle-test-1'
    );

    expect(res.pointsAwarded).toBe(2);
    const expectedAfterFirst = initialBalance + res.pointsAwarded + res.streakBonusAwarded;
    expect(uroRepository.getUserBalance(userId)).toBe(expectedAfterFirst);

    // Repeating with the same cycle key must not duplicate points
    uroRepository.completePomodoroCycle(
      userId,
      'cat-litiasis',
      25,
      'pomodoro-cycle-test-1'
    );
    expect(uroRepository.getUserBalance(userId)).toBe(expectedAfterFirst);
  });

  it('6. Sistema RPG de Niveles y Experiencia (XP): sube de nivel automáticamente y es 100% independiente del gasto de puntos', () => {
    const userId = 'user-demo-01';

    // Demo user starts at 165 XP (Nivel I — Aprendiz, needs 35 XP to reach 200 XP for Nivel II — Explorador)
    const initialProg = uroRepository.getUserProgression(userId);
    expect(initialProg.totalXp).toBe(165);
    expect(initialProg.currentLevel.level_number).toBe(1);
    expect(initialProg.currentLevel.name).toBe('Aprendiz');
    expect(initialProg.xpMissingForNextLevel).toBe(35);

    // Completing a Pomodoro cycle awards +40 XP (special_challenge_xp) + 20 XP (3-day streak milestone) = +60 XP -> 225 XP total
    const pomoRes = uroRepository.completePomodoroCycle(
      userId,
      'cat-itu',
      25,
      'pomo-levelup-test'
    );
    expect(pomoRes.xpAwarded).toBe(40);

    const afterProg = uroRepository.getUserProgression(userId);
    expect(afterProg.totalXp).toBeGreaterThanOrEqual(205);
    expect(afterProg.currentLevel.level_number).toBe(2);
    expect(afterProg.currentLevel.name).toBe('Explorador');
    expect(afterProg.unnotifiedLevelUps.some((h) => h.level_number === 2)).toBe(true);

    // Acknowledge level-up modal notification
    uroRepository.acknowledgeLevelUpNotifications(userId);
    expect(uroRepository.getUserProgression(userId).unnotifiedLevelUps.length).toBe(0);

    // Spend points on a reward: points decrease, but XP and Level NEVER decrease
    const xpBeforeRedeem = afterProg.totalXp;
    const levelBeforeRedeem = afterProg.currentLevel.level_number;
    uroRepository.redeemReward(userId, 'rew-badge-01', 'redeem-keep-xp-key');

    const progAfterRedeem = uroRepository.getUserProgression(userId);
    expect(progAfterRedeem.totalXp).toBe(xpBeforeRedeem);
    expect(progAfterRedeem.currentLevel.level_number).toBe(levelBeforeRedeem);
  });

  it('7. Procesa saltos múltiples de nivel y desbloquea logros automáticos', () => {
    const userId = 'user-demo-01';
    const adminId = 'admin-demo-01';

    // Audited XP adjustment of +2000 XP jumps user from Nivel I (165 XP) directly to Nivel V — Maestro Urológico (2165 XP)
    uroRepository.adjustUserExperience(
      adminId,
      userId,
      2000,
      'Reconocimiento extraordinario en congreso nacional de urología'
    );

    const prog = uroRepository.getUserProgression(userId);
    expect(prog.totalXp).toBe(2165);
    expect(prog.currentLevel.level_number).toBe(5);
    expect(prog.currentLevel.name).toBe('Maestro Urológico');
    // All intermediate levels (I, II, III, IV, V) must be recorded in levelHistory
    expect(prog.levelHistory.length).toBe(5);

    const autoAchievements = uroRepository.getUserAutoAchievements(userId);
    expect(autoAchievements.length).toBeGreaterThanOrEqual(9);
    expect(autoAchievements.some((a) => a.unlocked)).toBe(true);
  });

  it('8. Permite crear una nueva cuenta, cerrar sesión e iniciar sesión con correo y contraseña', () => {
    const created = uroRepository.registerUser(
      'Dr. Javier Soto',
      'javier.soto@hospital.cl',
      'Residente de Urología • R1',
      'uro2026'
    );

    expect(created.display_name).toBe('Dr. Javier Soto');
    expect(uroRepository.getCurrentUser()?.id).toBe(created.id);
    expect(uroRepository.getUserProgression(created.id).currentLevel.level_number).toBe(1);

    // Duplicate email registration must fail
    expect(() =>
      uroRepository.registerUser('Otro', 'javier.soto@hospital.cl', 'Interno', '1234')
    ).toThrow(/Ya existe una cuenta registrada/i);

    // Logout clears active session
    uroRepository.logout();
    expect(uroRepository.getCurrentUser()).toBeNull();

    // Wrong password must fail
    expect(() =>
      uroRepository.authenticateUser('javier.soto@hospital.cl', 'wrongpass')
    ).toThrow(/contraseña ingresada es incorrecta/i);

    // Correct password logs the user back in
    const loggedIn = uroRepository.authenticateUser('javier.soto@hospital.cl', 'uro2026');
    expect(loggedIn.id).toBe(created.id);
    expect(uroRepository.getCurrentUser()?.id).toBe(created.id);
  });

  it('9. Diccionario Urológico: carga 14 categorías, 74 términos publicados (incluyendo los 23 de cáncer de próstata y 24 de tumores renales con fotografías) y ejecuta búsqueda inteligente por abreviaturas y sinónimos', () => {
    const userId = 'user-demo-01';
    const categories = uroRepository.getDictionaryCategories(false);
    expect(categories.length).toBe(14);

    // Regular users only see published terms (74 published out of 76 total)
    const publishedTerms = uroRepository.getDictionaryTerms({ userId, includeUnpublished: false });
    expect(publishedTerms.length).toBe(74);
    expect(publishedTerms.every((t) => t.editorial_status === 'published')).toBe(true);

    // Search by exact abbreviation "HPB" returns Hiperplasia prostática benigna first
    const hpbSearch = uroRepository.getDictionaryTerms({
      userId,
      query: 'HPB',
      includeUnpublished: false,
    });
    expect(hpbSearch.length).toBeGreaterThanOrEqual(1);
    expect(hpbSearch[0].term).toBe('Hiperplasia prostática benigna');

    // Accent-insensitive search "prostata"
    const accentSearch = uroRepository.getDictionaryTerms({
      userId,
      query: 'prostata',
      includeUnpublished: false,
    });
    expect(accentSearch.some((t) => t.term === 'Próstata')).toBe(true);
    expect(accentSearch.some((t) => t.term === 'Hiperplasia prostática benigna')).toBe(true);

    // Detail view for Hiperplasia prostática benigna includes its 6 related terms
    const hpbDetail = uroRepository.getDictionaryTermBySlug(
      'hiperplasia-prostatica-benigna',
      userId,
      false
    );
    expect(hpbDetail).not.toBeNull();
    const relatedNames = hpbDetail!.related_terms.map((r) => r.term);
    expect(relatedNames).toContain('Próstata');
    expect(relatedNames).toContain('Antígeno prostático específico');
    expect(relatedNames).toContain('Síntomas del tracto urinario inferior');
    expect(relatedNames).toContain('Retención urinaria');
    expect(relatedNames).toContain('Flujometría');
    expect(relatedNames).toContain('Tamsulosina');
  });

  it('10. Diccionario Urológico: gestiona favoritos, historial sin duplicados consecutivos y flujo editorial sin otorgar puntos ni XP por consultar', () => {
    const userId = 'user-demo-01';
    const adminId = 'admin-demo-01';

    const initialBalance = uroRepository.getUserBalance(userId);
    const initialXp = uroRepository.getUserProgression(userId).totalXp;

    // Toggle favorite on "Disuria" (uterm-01)
    const beforeFavs = uroRepository.getDictionaryTerms({
      userId,
      onlyFavorites: true,
      includeUnpublished: false,
    });
    const isFavNow = uroRepository.toggleFavoriteTerm(userId, 'uterm-01');
    expect(isFavNow).toBe(true);

    const favList = uroRepository.getDictionaryTerms({
      userId,
      onlyFavorites: true,
      includeUnpublished: false,
    });
    expect(favList.length).toBe(beforeFavs.length + 1);
    expect(favList.some((t) => t.id === 'uterm-01')).toBe(true);

    // Record consultation views: consecutive views of the same term do not create consecutive duplicates
    uroRepository.clearUserTermHistory(userId);
    uroRepository.recordTermView(userId, 'uterm-01');
    uroRepository.recordTermView(userId, 'uterm-01');
    uroRepository.recordTermView(userId, 'uterm-07');

    const history = uroRepository.getUserTermHistory(userId);
    expect(history.length).toBe(2);
    expect(history[0].view.term_id).toBe('uterm-07'); // Most recent first
    expect(history[1].view.term_id).toBe('uterm-01');

    // Viewing dictionary terms must NEVER award points or XP automatically
    expect(uroRepository.getUserBalance(userId)).toBe(initialBalance);
    expect(uroRepository.getUserProgression(userId).totalXp).toBe(initialXp);

    // Delete individual history entry and clear history
    uroRepository.deleteTermHistoryEntry(userId, history[0].view.id);
    expect(uroRepository.getUserTermHistory(userId).length).toBe(1);
    uroRepository.clearUserTermHistory(userId);
    expect(uroRepository.getUserTermHistory(userId).length).toBe(0);

    // Admin publishes a term that was in "review" (uterm-28: Reflujo vesicoureteral)
    uroRepository.updateDictionaryTermStatus(adminId, 'uterm-28', 'published');
    const afterPublish = uroRepository.getDictionaryTerms({ userId, includeUnpublished: false });
    expect(afterPublish.length).toBe(75);
  });
});
