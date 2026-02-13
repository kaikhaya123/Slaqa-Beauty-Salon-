import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-bookings'

interface UnavailableSlot {
  time: string
  barber: string | null
}

interface BookingData {
  barberid: number | null
  time: string
  barber: string | null
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const barberId = searchParams.get('barberId')
    const date = searchParams.get('date')
    const time = searchParams.get('time')

    // Validate required parameters
    if (!date || !time) {
      return NextResponse.json({ 
        error: 'Date and time are required' 
      }, { status: 400 })
    }

    // Check if specific slot is available
    if (barberId) {
      const { data: existingBooking, error } = await supabase
        .from('bookings')
        .select('id')
        .eq('barberid', barberId)
        .eq('date', date)
        .eq('time', time)
        .in('status', ['pending', 'confirmed'])
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned (available)
        console.error('[Availability Check] Database error:', error)
        return NextResponse.json({ 
          error: 'Failed to check availability' 
        }, { status: 500 })
      }

      return NextResponse.json({
        available: !existingBooking,
        barberId: parseInt(barberId, 10),
        date,
        time,
        message: existingBooking ? 'Time slot already booked' : 'Time slot available'
      })
    }

    // Get all bookings for the date to show unavailable slots
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('barberid, time, barber')
      .eq('date', date)
      .in('status', ['pending', 'confirmed'])

    if (error) {
      console.error('[Availability Check] Database error:', error)
      return NextResponse.json({ 
        error: 'Failed to check availability' 
      }, { status: 500 })
    }

    // Handle case where bookings is null
    if (!bookings) {
      return NextResponse.json({
        date,
        unavailableSlots: {},
        totalBookings: 0
      })
    }

    // Group bookings by barber
    const unavailableSlots: Record<string, UnavailableSlot[]> = bookings.reduce((acc: Record<string, UnavailableSlot[]>, booking: BookingData) => {
      const key = booking.barberid?.toString() || 'any'
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push({
        time: booking.time,
        barber: booking.barber
      })
      return acc
    }, {} as Record<string, UnavailableSlot[]>)

    return NextResponse.json({
      date,
      unavailableSlots,
      totalBookings: bookings.length
    })

  } catch (error: any) {
    console.error('[Availability Check] Unexpected error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}