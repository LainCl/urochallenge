-- =============================================================================
-- UROCHALLENGE — MIGRACIÓN 002: MÓDULO DICCIONARIO UROLÓGICO + RLS
-- =============================================================================

-- 8.1 Tabla: urology_categories
CREATE TABLE IF NOT EXISTS public.urology_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(80) DEFAULT 'Activity',
  color VARCHAR(30) DEFAULT '#5149B8',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8.2 Tabla: urology_terms
CREATE TABLE IF NOT EXISTS public.urology_terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term VARCHAR(200) NOT NULL,
  slug VARCHAR(220) UNIQUE NOT NULL,
  short_definition TEXT NOT NULL,
  full_definition TEXT,
  category_id UUID REFERENCES public.urology_categories(id) ON DELETE RESTRICT,
  image_url TEXT,
  editorial_status VARCHAR(30) NOT NULL DEFAULT 'draft' CHECK (editorial_status IN ('draft', 'review', 'published', 'archived')),
  is_demo_pending_review BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  reviewed_by UUID REFERENCES public.profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_urology_terms_category ON public.urology_terms(category_id);
CREATE INDEX IF NOT EXISTS idx_urology_terms_status ON public.urology_terms(editorial_status);
CREATE INDEX IF NOT EXISTS idx_urology_terms_slug ON public.urology_terms(slug);

-- 8.3 Tabla: urology_term_aliases
CREATE TABLE IF NOT EXISTS public.urology_term_aliases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term_id UUID NOT NULL REFERENCES public.urology_terms(id) ON DELETE CASCADE,
  alias VARCHAR(200) NOT NULL,
  alias_type VARCHAR(40) NOT NULL CHECK (alias_type IN ('synonym', 'abbreviation', 'alternative_name')),
  UNIQUE (term_id, alias, alias_type)
);

CREATE INDEX IF NOT EXISTS idx_urology_term_aliases_term ON public.urology_term_aliases(term_id);

-- 8.4 Tabla: urology_term_tags
CREATE TABLE IF NOT EXISTS public.urology_term_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term_id UUID NOT NULL REFERENCES public.urology_terms(id) ON DELETE CASCADE,
  tag VARCHAR(100) NOT NULL,
  UNIQUE (term_id, tag)
);

CREATE INDEX IF NOT EXISTS idx_urology_term_tags_term ON public.urology_term_tags(term_id);

-- 8.5 Tabla: urology_term_references
CREATE TABLE IF NOT EXISTS public.urology_term_references (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term_id UUID NOT NULL REFERENCES public.urology_terms(id) ON DELETE CASCADE,
  reference_title TEXT NOT NULL,
  authors TEXT,
  publication_year INTEGER,
  source_name TEXT,
  url TEXT,
  accessed_at DATE
);

-- 8.6 Tabla: urology_term_relations
CREATE TABLE IF NOT EXISTS public.urology_term_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term_id UUID NOT NULL REFERENCES public.urology_terms(id) ON DELETE CASCADE,
  related_term_id UUID NOT NULL REFERENCES public.urology_terms(id) ON DELETE CASCADE,
  relation_type VARCHAR(40) NOT NULL DEFAULT 'related',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_no_self_relation CHECK (term_id <> related_term_id),
  UNIQUE (term_id, related_term_id)
);

CREATE INDEX IF NOT EXISTS idx_urology_term_relations_term ON public.urology_term_relations(term_id);

-- 8.7 Tabla: user_favorite_terms
CREATE TABLE IF NOT EXISTS public.user_favorite_terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  term_id UUID NOT NULL REFERENCES public.urology_terms(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, term_id)
);

CREATE INDEX IF NOT EXISTS idx_user_favorite_terms_user ON public.user_favorite_terms(user_id, created_at DESC);

-- 8.8 Tabla: user_term_views
CREATE TABLE IF NOT EXISTS public.user_term_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  term_id UUID NOT NULL REFERENCES public.urology_terms(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_term_views_user_date ON public.user_term_views(user_id, viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_term_views_term ON public.user_term_views(term_id);

-- =============================================================================
-- SEGURIDAD Y PERMISOS: ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE public.urology_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.urology_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.urology_term_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.urology_term_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.urology_term_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.urology_term_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorite_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_term_views ENABLE ROW LEVEL SECURITY;

-- Función auxiliar para verificar si el usuario autenticado es admin o editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$;

-- 1. urology_categories: Usuarios leen categorías activas; admins/editores gestionan todo
CREATE POLICY "Users read active urology categories"
  ON public.urology_categories FOR SELECT
  USING (is_active = true OR public.is_admin_or_editor());

CREATE POLICY "Admin or editor manage urology categories"
  ON public.urology_categories FOR ALL
  USING (public.is_admin_or_editor());

-- 2. urology_terms: Usuarios normales solo leen términos 'published'; admins/editores gestionan todo
CREATE POLICY "Users read published urology terms"
  ON public.urology_terms FOR SELECT
  USING (editorial_status = 'published' OR public.is_admin_or_editor());

CREATE POLICY "Admin or editor manage urology terms"
  ON public.urology_terms FOR ALL
  USING (public.is_admin_or_editor());

-- 3. Alias, Tags, Referencias y Relaciones: lectura pública para términos publicados; escritura admin/editor
CREATE POLICY "Users read aliases of published terms"
  ON public.urology_term_aliases FOR SELECT
  USING (
    public.is_admin_or_editor() OR EXISTS (
      SELECT 1 FROM public.urology_terms t
      WHERE t.id = term_id AND t.editorial_status = 'published'
    )
  );

CREATE POLICY "Admin or editor manage aliases"
  ON public.urology_term_aliases FOR ALL
  USING (public.is_admin_or_editor());

CREATE POLICY "Users read tags of published terms"
  ON public.urology_term_tags FOR SELECT
  USING (
    public.is_admin_or_editor() OR EXISTS (
      SELECT 1 FROM public.urology_terms t
      WHERE t.id = term_id AND t.editorial_status = 'published'
    )
  );

CREATE POLICY "Admin or editor manage tags"
  ON public.urology_term_tags FOR ALL
  USING (public.is_admin_or_editor());

CREATE POLICY "Users read references of published terms"
  ON public.urology_term_references FOR SELECT
  USING (
    public.is_admin_or_editor() OR EXISTS (
      SELECT 1 FROM public.urology_terms t
      WHERE t.id = term_id AND t.editorial_status = 'published'
    )
  );

CREATE POLICY "Admin or editor manage references"
  ON public.urology_term_references FOR ALL
  USING (public.is_admin_or_editor());

CREATE POLICY "Users read relations of published terms"
  ON public.urology_term_relations FOR SELECT
  USING (
    public.is_admin_or_editor() OR EXISTS (
      SELECT 1 FROM public.urology_terms t
      WHERE t.id = term_id AND t.editorial_status = 'published'
    )
  );

CREATE POLICY "Admin or editor manage relations"
  ON public.urology_term_relations FOR ALL
  USING (public.is_admin_or_editor());

-- 4. user_favorite_terms: Estricto aislamiento por usuario (nadie ve ni modifica favoritos ajenos)
CREATE POLICY "Users select own favorite terms"
  ON public.user_favorite_terms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own favorite terms"
  ON public.user_favorite_terms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own favorite terms"
  ON public.user_favorite_terms FOR DELETE
  USING (auth.uid() = user_id);

-- 5. user_term_views: Estricto aislamiento de historial por usuario
CREATE POLICY "Users select own term views"
  ON public.user_term_views FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own term views"
  ON public.user_term_views FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own term views"
  ON public.user_term_views FOR DELETE
  USING (auth.uid() = user_id);
