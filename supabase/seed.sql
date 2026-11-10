-- =============================================================================
-- UROCHALLENGE — DATOS SEMILLA PARA SUPABASE (REGLAS, CATEGORÍAS Y PREMIOS)
-- =============================================================================

INSERT INTO public.point_rules (action_key, description, points, is_active)
VALUES
  ('daily_participation', 'Responder pregunta periódica', 5, true),
  ('daily_correct_bonus', 'Responder correctamente pregunta periódica (adicional)', 5, true),
  ('quiz_completion', 'Completar test de 10 preguntas', 10, true),
  ('quiz_correct_answer', 'Cada respuesta correcta del test', 2, true),
  ('streak_3_days', 'Bonificación por completar 3 días consecutivos de actividad', 5, true),
  ('streak_7_days', 'Bonificación por completar 7 días consecutivos de actividad', 15, true)
ON CONFLICT (action_key) DO NOTHING;

INSERT INTO public.categories (name, description, icon, is_active)
VALUES
  ('Anatomía y fisiología urológica', 'Estructura macroscópica, relaciones anatómicas e inervación del tracto genitourinario.', 'Activity', true),
  ('Infecciones urinarias', 'Conceptos generales de bacteriuria, cistitis no complicada, pielonefritis y prostatitis.', 'ShieldAlert', true),
  ('Litiasis urinaria', 'Fisiopatología de cálculos renales, composición química, clínica del cólico nefrítico e imagenología.', 'Gem', true),
  ('Hiperplasia prostática benigna', 'Zonas prostáticas, síntomas del tracto urinario inferior (STUI) de llenado y vaciamiento.', 'Layers', true),
  ('Cáncer urológico (conceptos generales)', 'Presentación clínica inicial y factores de riesgo en tumores urológicos.', 'Microscope', true),
  ('Incontinencia urinaria', 'Clasificación semiológica: esfuerzo, urgencia, mixta y por rebosamiento.', 'Droplets', true),
  ('Salud masculina', 'Fisiología reproductiva masculina, varicocele, disfunción eréctil y evaluación básica.', 'UserCheck', true),
  ('Urgencias urológicas (conceptos básicos)', 'Reconocimiento temprano de torsión testicular, retención urinaria aguda y parafimosis.', 'Siren', true),
  ('Función renal y vías urinarias', 'Filtración glomerular, hidronefrosis, reflujo vesicoureteral y dinámica miccional.', 'HeartPulse', true);

INSERT INTO public.rewards (name, description, points_cost, stock, is_active)
VALUES
  ('Guía de Bolsillo: Algoritmos en Urgencias Urológicas (Edición Digital)', 'Manual interactivo descargable con diagramas de flujo para escroto agudo, cólico nefrítico y hematuria.', 40, NULL, true),
  ('Credencial Digital e Insignia "Destacado en Semiología Urológica"', 'Certificado digital verificable para tu portafolio académico.', 65, NULL, true),
  ('Voucher Café & Estudio en Cafetería Clínica Universitaria', 'Cupón canjeable por un café de especialidad + snack saludable.', 90, 15, true),
  ('Acceso a Masterclass: Interpretación de Urodinamia y PieloTAC', 'Cupo para seminario online con especialistas docentes.', 140, 8, true),
  ('Beca de Inscripción: Simposio Anual de Residentes de Urología', 'Exención del 100% del arancel de inscripción.', 250, 3, true);

-- =============================================================================
-- NIVELES RPG, REGLAS DE EXPERIENCIA (XP) Y LOGROS AUTOMÁTICOS
-- =============================================================================

INSERT INTO public.levels (level_number, roman_numeral, name, description, min_xp, max_xp, icon, badge_shape, badge_color, color, benefits, is_active)
VALUES
  (1, 'I', 'Aprendiz', 'Inicias tu camino formativo en semiología, anatomía y fundamentos urológicos.', 0, 199, 'Sprout', 'sprout', 'green', '#249E57', '["Acceso a desafíos periódicos", "Insignia de Aprendiz Urológico"]'::jsonb, true),
  (2, 'II', 'Explorador', 'Dominas los conceptos esenciales y avanzas con constancia en evaluaciones clínicas.', 200, 499, 'Compass', 'flame_2', 'blue', '#1B76DF', '["Insignia de Explorador", "Reconocimiento en historial de trayectoria"]'::jsonb, true),
  (3, 'III', 'Especialista', 'Resuelves escenarios de litiasis, infecciones e hiperplasia prostática con alta precisión.', 500, 999, 'Award', 'flame_3', 'blue', '#5149B8', '["Insignia de Especialista", "Destacado académico de nivel intermedio"]'::jsonb, true),
  (4, 'IV', 'Experto', 'Referente académico en patología urológica compleja, urgencias y razonamiento diagnóstico.', 1000, 1999, 'ShieldCheck', 'trophy', 'gold', '#E59A24', '["Insignia Dorada de Experto", "Prioridad en distinciones académicas"]'::jsonb, true),
  (5, 'V', 'Maestro Urológico', 'Nivel máximo de excelencia, constancia y dominio integral en UroChallenge.', 2000, NULL, 'Crown', 'laurel', 'gold', '#D97706', '["Corona de Laurel Dorada", "Rango honorífico de Maestro Urológico"]'::jsonb, true)
ON CONFLICT (level_number) DO NOTHING;

INSERT INTO public.experience_rules (action_key, description, xp_amount, is_active)
VALUES
  ('daily_participation_xp', 'Responder pregunta periódica', 10, true),
  ('daily_correct_bonus_xp', 'Responder correctamente pregunta periódica (bono adicional)', 10, true),
  ('quiz_completion_xp', 'Completar test de 10 preguntas', 25, true),
  ('quiz_correct_answer_xp', 'Cada respuesta correcta del test', 5, true),
  ('streak_3_days_xp', 'Completar 3 días consecutivos de actividad', 20, true),
  ('streak_7_days_xp', 'Completar 7 días consecutivos de actividad', 50, true),
  ('special_challenge_xp', 'Completar un desafío especial o ciclo de estudio Pomodoro', 40, true)
ON CONFLICT (action_key) DO NOTHING;

INSERT INTO public.achievements (name, description, icon, badge_shape, badge_color, condition_type, condition_value, is_active)
VALUES
  ('Primera pregunta respondida', 'Respondiste tu primera pregunta formativa en UroChallenge.', 'Sparkles', 'sprout', 'green', 'questions_answered', 1, true),
  ('Primer test completado', 'Completaste tu primera evaluación integral de 10 preguntas.', 'BookOpenCheck', 'flame_2', 'green', 'quizzes_completed', 1, true),
  ('10 respuestas correctas', 'Acumulaste 10 respuestas acertadas en actividades urológicas.', 'CheckCircle2', 'flame_3', 'blue', 'correct_answers', 10, true),
  ('50 respuestas correctas', 'Alcanzaste 50 respuestas clínicas correctas.', 'Target', 'flame_4', 'blue', 'correct_answers', 50, true),
  ('100 preguntas respondidas', 'Superaste el centenar de preguntas urológicas respondidas.', 'Award', 'flame_5', 'gold', 'questions_answered', 100, true),
  ('Primera semana activa', 'Registraste al menos 7 días de actividad educativa en la plataforma.', 'Calendar', 'trophy', 'blue', 'active_days', 7, true),
  ('Racha de 7 días', 'Mantuviste una racha ininterrumpida de 7 días consecutivos.', 'Flame', 'laurel', 'gold', 'streak_days', 7, true),
  ('10 tests completados', 'Completaste 10 evaluaciones de 10 preguntas.', 'Trophy', 'trophy', 'gold', 'quizzes_completed', 10, true),
  ('90% de aciertos en un test', 'Lograste una precisión global igual o superior al 90% con al menos 10 preguntas.', 'Crown', 'laurel', 'gold', 'accuracy_pct_min_10_q', 90, true);

-- =============================================================================
-- CATEGORÍAS INICIALES DEL DICCIONARIO UROLÓGICO (14 CATEGORÍAS)
-- =============================================================================

INSERT INTO public.urology_categories (name, slug, description, icon, display_order, is_active)
VALUES
  ('Anatomía urológica', 'anatomia-urologica', 'Estructuras anatómicas del aparato urinario y reproductor masculino.', 'Activity', 1, true),
  ('Fisiología urinaria', 'fisiologia-urinaria', 'Funcionamiento renal, producción de orina y mecanismos urinarios.', 'HeartPulse', 2, true),
  ('Semiología urológica', 'semiologia-urologica', 'Síntomas, signos y evaluación clínica urológica.', 'Stethoscope', 3, true),
  ('Infecciones urinarias', 'infecciones-urinarias', 'Infecciones del tracto urinario y conceptos relacionados.', 'ShieldAlert', 4, true),
  ('Litiasis urinaria', 'litiasis-urinaria', 'Cálculos urinarios y conceptos relacionados.', 'Gem', 5, true),
  ('Urología oncológica', 'urologia-oncologica', 'Tumores y neoplasias del sistema genitourinario.', 'Microscope', 6, true),
  ('Próstata', 'prostata', 'Anatomía, patologías y conceptos prostáticos.', 'Layers', 7, true),
  ('Andrología y salud masculina', 'andrologia-y-salud-masculina', 'Función sexual y salud reproductiva masculina.', 'UserCheck', 8, true),
  ('Uroginecología e incontinencia', 'uroginecologia-e-incontinencia', 'Incontinencia, suelo pélvico y trastornos urinarios femeninos.', 'Droplets', 9, true),
  ('Urgencias urológicas', 'urgencias-urologicas', 'Conceptos asociados a situaciones urológicas urgentes.', 'Siren', 10, true),
  ('Estudios y procedimientos', 'estudios-y-procedimientos', 'Exámenes, procedimientos diagnósticos y técnicas urológicas.', 'ClipboardList', 11, true),
  ('Farmacología urológica', 'farmacologia-urologica', 'Fármacos de uso frecuente en urología.', 'Pill', 12, true),
  ('Urología pediátrica', 'urologia-pediatrica', 'Conceptos urológicos en infancia y adolescencia.', 'Baby', 13, true),
  ('Trasplante y función renal', 'trasplante-y-funcion-renal', 'Conceptos generales sobre función renal y trasplante.', 'RefreshCw', 14, true)
ON CONFLICT (slug) DO NOTHING;
