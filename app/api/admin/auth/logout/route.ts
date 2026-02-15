import { NextRequest, NextResponse } from 'next/server'
import { clearAdminSessionCookie } from '@/lib/adminAuth'
import { logAdminAction } from '@/lib/adminAudit'

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  clearAdminSessionCookie(response)
  await logAdminAction(request, 'logout', 'admin_session')
  return response
}
