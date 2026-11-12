-- Fase 2 / V6: Soporte de imágenes clínicas en el banco de preguntas
ALTER TABLE IF EXISTS public.questions
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS image_caption TEXT;
