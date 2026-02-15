import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-bookings'

export const dynamic = 'force-dynamic'

interface BookingSlot {
  time: string
  barber: string | null
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const date = searchParams.get('date')
    const barberId = searchParams.get('barberId')
    
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    // Query existing bookings for the specified date and barber
    let query = supabase
      .from('bookings')
      .select('time, barber')
      .eq('date', date)
      .in('status', ['pending', 'confirmed']) // Only consider active bookings
    
    // Filter by barber if specified
    if (barberId && barberId !== 'any') {
      query = query.eq('barberid', parseInt(barberId))
    }

    const { data: existingBookings, error } = await query

    if (error) {
      console.error('[Availability] Database error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Extract taken time slots
    const takenSlots = existingBookings
      ?.map((booking: BookingSlot) => booking.time)
      .filter(Boolean)
      .map((time: string) => (time && time.length >= 5 ? time.slice(0, 5) : time)) || []

    // Get recent slot changes (last 5 minutes) for real-time updates
    const { data: recentChanges, error: changesError } = await supabase
      .from('slot_updates')
      .select('time, status, createdat')
      .eq('date', date)
      .eq('barberid', barberId ? parseInt(barberId) : null)
      .gt('createdat', new Date(Date.now() - 5 * 60 * 1000).toISOString()) // Last 5 minutes
      .order('createdat', { ascending: false })

    return NextResponse.json({
      date,
      barberId,
      takenSlots,
      totalBookings: existingBookings?.length || 0,
      recentChanges: recentChanges || [], // Recent slot changes with timestamps
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('[Availability] Error checking availability:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}