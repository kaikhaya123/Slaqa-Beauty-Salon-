import { NextResponse } from 'next/server'
import { loadBookings } from '@/lib/supabase-bookings'

export async function GET() {
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
