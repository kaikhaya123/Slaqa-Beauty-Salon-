-- ============================================================================
-- ADMIN AUDIT LOGS TABLE
-- ============================================================================
-- Records admin actions for security and traceability.
-- Run this in Supabase SQL Editor.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  adminuser TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entityid TEXT,
  metadata JSONB,
  ip TEXT,
  useragent TEXT
);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read audit logs" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.admin_audit_logs;

CREATE POLICY "Admins can read audit logs" ON public.admin_audit_logs
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Admins can insert audit logs" ON public.admin_audit_logs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
