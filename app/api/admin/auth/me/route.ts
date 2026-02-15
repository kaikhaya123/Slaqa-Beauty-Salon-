import { NextRequest, NextResponse } from 'next/server'
import { getAdminSessionToken, verifyAdminToken } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  const token = getAdminSessionToken(request)
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const payload = verifyAdminToken(token)
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 403 })
  }

  return NextResponse.json({
    authenticated: true,
    user: { username: payload.sub, role: payload.role },
  })
}
