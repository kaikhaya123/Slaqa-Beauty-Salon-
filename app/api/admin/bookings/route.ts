import { NextRequest, NextResponse } from 'next/server'
import { loadBookings } from '@/lib/supabase-bookings'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  try {
    const bookings = await loadBookings()
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
