import { createClient } from '@supabase/supabase-js'
import { getAdminSessionToken, verifyAdminToken } from '@/lib/adminAuth'
import type { NextRequest } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
}

function getRequestIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function logAdminAction(
  request: NextRequest,
  action: string,
  entity: string,
  entityId?: string | null,
  metadata?: Record<string, unknown>,
  adminUserOverride?: string
) {
  try {
    const supabase = getSupabase()
    if (!supabase) return

    const token = getAdminSessionToken(request)
    const payload = token ? verifyAdminToken(token) : null
    const adminUser = adminUserOverride || payload?.sub || 'unknown'

    await supabase.from('admin_audit_logs').insert({
      adminuser: adminUser,
      action,
      entity,
      entityid: entityId || null,
      metadata: metadata || null,
      ip: getRequestIp(request),
      useragent: request.headers.get('user-agent') || 'unknown',
    })
  } catch {
    // Keep admin flows working even if logging fails.
  }
}
