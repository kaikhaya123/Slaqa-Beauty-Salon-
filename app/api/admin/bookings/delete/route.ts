import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/adminAuth'
import { logAdminAction } from '@/lib/adminAudit'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create Supabase client with service role (bypass RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function DELETE(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  let bookingId: string | undefined
  let date: string | undefined
  let status: string | undefined
  let beforeDate: string | undefined

  try {
    const body = await request.json()
    bookingId = body.bookingId
    date = body.date
    status = body.status
    beforeDate = body.beforeDate

    // Validate that at least one deletion criteria is provided
    if (!bookingId && !date && !status && !beforeDate) {
      return NextResponse.json(
        { error: 'Must provide at least one deletion criteria: bookingId, date, status, or beforeDate' },
        { status: 400 }
      )
    }

    let query = supabase.from('bookings').delete()

    // Delete by specific booking ID
    if (bookingId) {
      query = query.eq('id', bookingId)
    }

    // Delete by specific date
    if (date) {
      query = query.eq('date', date)
    }

    // Delete by status
    if (status) {
      query = query.eq('status', status)
    }

    // Delete all bookings before a certain date
    if (beforeDate) {
      query = query.lt('date', beforeDate)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error deleting bookings:', error)
      return NextResponse.json(
        { error: 'Failed to delete bookings', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Successfully deleted bookings`,
      deletedCount: count || 0,
    })
  } catch (error) {
    console.error('Delete bookings error:', error)
    return NextResponse.json(
      { error: 'Failed to delete bookings', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    await logAdminAction(request, 'delete', 'booking', null, {
      bookingId,
      date,
      status,
      beforeDate,
    })
  }
}

// GET endpoint to preview what would be deleted (safety check)
export async function GET(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const status = searchParams.get('status')
    const beforeDate = searchParams.get('beforeDate')

    let query = supabase.from('bookings').select('id, name, date, time, status, barber')

    if (date) {
      query = query.eq('date', date)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (beforeDate) {
      query = query.lt('date', beforeDate)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      bookings: data,
      count: data?.length || 0,
      message: `Found ${data?.length || 0} bookings matching criteria`,
    })
  } catch (error) {
    console.error('Fetch bookings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
