-- Editable site content for the HR console (/console).
-- Applied to Supabase project Alpha Payments (cyahgmgcypvlfifkpmst).

CREATE TABLE IF NOT EXISTS site_content (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE site_content FROM PUBLIC;
REVOKE ALL ON TABLE site_content FROM anon, authenticated;

-- App connects with DATABASE_URL as role alpha_app (server-side only).
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'alpha_app') THEN
    CREATE ROLE alpha_app LOGIN;
  END IF;
END $$;

GRANT USAGE ON SCHEMA public TO alpha_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE site_content TO alpha_app;

DROP POLICY IF EXISTS site_content_app_all ON site_content;
CREATE POLICY site_content_app_all
  ON site_content
  FOR ALL
  TO alpha_app
  USING (true)
  WITH CHECK (true);
