import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SESSION_COOKIE = 'admin_session'
const TOKEN_TTL_SECONDS = 60 * 60 * 12 // 12 hours

function base64UrlEncode(input: Buffer | string) {
  const buffer = typeof input === 'string' ? Buffer.from(input) : input
  return buffer
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function base64UrlDecode(input: string) {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/')
  const padding = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  return Buffer.from(padded + padding, 'base64').toString('utf-8')
}

function getSecret() {
  const secret = process.env.ADMIN_TOKEN_SECRET
  if (!secret) {
    throw new Error('ADMIN_TOKEN_SECRET is not configured')
  }
  return secret
}

export function createAdminToken(username: string) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: username,
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    })
  )
  const data = `${header}.${payload}`
  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(data)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `${data}.${signature}`
}

export function verifyAdminToken(token: string) {
  try {
    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) return null

    const data = `${header}.${payload}`
    const expected = crypto
      .createHmac('sha256', getSecret())
      .update(data)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')

    if (expected !== signature) return null

    const decoded = JSON.parse(base64UrlDecode(payload))
    if (!decoded?.exp || decoded.exp < Math.floor(Date.now() / 1000)) return null
    if (decoded.role !== 'admin') return null

    return decoded as { sub: string; role: 'admin'; exp: number }
  } catch {
    return null
  }
}

export function setAdminSessionCookie(response: NextResponse, token: string) {
  const isSecure = process.env.NODE_ENV === 'production'
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_TTL_SECONDS,
  })
}

export function clearAdminSessionCookie(response: NextResponse) {
  const isSecure = process.env.NODE_ENV === 'production'
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

export function getAdminSessionToken(request: NextRequest) {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value || null
}

export function requireAdmin(request: NextRequest) {
  const token = getAdminSessionToken(request)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = verifyAdminToken(token)
  if (!payload) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return null
}
