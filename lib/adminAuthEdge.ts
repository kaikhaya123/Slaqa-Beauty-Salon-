const ADMIN_SESSION_COOKIE = 'admin_session'

function base64UrlDecode(input: string) {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/')
  const padding = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  return atob(padded + padding)
}

async function verifySignature(data: string, signature: string, secret: string) {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signed = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  const bytes = new Uint8Array(signed)
  let base64 = ''
  for (const byte of bytes) {
    base64 += String.fromCharCode(byte)
  }
  const signatureBase64 = btoa(base64)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return signatureBase64 === signature
}

export async function verifyAdminTokenEdge(token: string, secret: string) {
  try {
    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) return null

    const data = `${header}.${payload}`
    const valid = await verifySignature(data, signature, secret)
    if (!valid) return null

    const decoded = JSON.parse(base64UrlDecode(payload))
    if (!decoded?.exp || decoded.exp < Math.floor(Date.now() / 1000)) return null
    if (decoded.role !== 'admin') return null

    return decoded as { sub: string; role: 'admin'; exp: number }
  } catch {
    return null
  }
}

export function getAdminTokenFromRequest(request: Request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${ADMIN_SESSION_COOKIE}=([^;]+)`))
  return match ? match[1] : null
}
