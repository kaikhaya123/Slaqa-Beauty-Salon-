import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAdminTokenFromRequest, verifyAdminTokenEdge } from '@/lib/adminAuthEdge'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/admin/auth/login') || pathname.startsWith('/api/admin/auth/logout')) {
    return NextResponse.next()
  }

  const token = getAdminTokenFromRequest(request)
  const secret = process.env.ADMIN_TOKEN_SECRET

  if (!token || !secret) {
    return handleUnauthorized(request)
  }

  const payload = await verifyAdminTokenEdge(token, secret)
  if (!payload) {
    return handleUnauthorized(request)
  }

  return NextResponse.next()
}

function handleUnauthorized(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/admin/login'
  loginUrl.searchParams.set('from', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
