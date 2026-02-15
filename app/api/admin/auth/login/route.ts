import { NextRequest, NextResponse } from 'next/server'
import { createAdminToken, setAdminSessionCookie } from '@/lib/adminAuth'
import { logAdminAction } from '@/lib/adminAudit'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    const adminUser = process.env.ADMIN_USERNAME
    const adminPass = process.env.ADMIN_PASSWORD

    if (!adminUser || !adminPass) {
      return NextResponse.json(
        { error: 'Admin credentials not configured' },
        { status: 500 }
      )
    }

    if (username !== adminUser || password !== adminPass) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = createAdminToken(username)
    const response = NextResponse.json({ success: true, user: { username, role: 'admin' } })
    setAdminSessionCookie(response, token)
    await logAdminAction(request, 'login', 'admin_session', null, { success: true }, username)
    return response
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
