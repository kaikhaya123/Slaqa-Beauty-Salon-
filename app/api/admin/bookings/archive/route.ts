import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/adminAuth'
import { logAdminAction } from '@/lib/adminAudit'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is not set')
}

// GET - Preview what will be archived
export async function GET(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Service role key not configured' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { searchParams } = new URL(req.url)
    
    const beforeDate = searchParams.get('beforeDate')
    const status = searchParams.get('status')
    const olderThanDays = searchParams.get('olderThanDays')

    let query = supabase
      .from('bookings')
      .select('*', { count: 'exact', head: false })

    // Apply filters
    if (beforeDate) {
      query = query.lt('date', beforeDate)
    } else if (olderThanDays) {
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(olderThanDays))
      const dateStr = daysAgo.toISOString().split('T')[0]
      query = query.lt('date', dateStr)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, count, error } = await query

    if (error) {
      console.error('Preview error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      count: count || 0,
      bookings: data || [],
      message: `${count || 0} booking(s) will be archived`
    })
  } catch (error: any) {
    console.error('Preview error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to preview archive' },
      { status: 500 }
    )
  }
}

// POST - Archive bookings
export async function POST(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  let archiveCriteria: Record<string, unknown> | null = null

  try {
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Service role key not configured' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const body = await req.json()
    
    const { beforeDate, status, olderThanDays } = body
    archiveCriteria = { beforeDate, status, olderThanDays }

    // Build query to select bookings to archive
    let selectQuery = supabase
      .from('bookings')
      .select('*')

    if (beforeDate) {
      selectQuery = selectQuery.lt('date', beforeDate)
    } else if (olderThanDays) {
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(olderThanDays))
      const dateStr = daysAgo.toISOString().split('T')[0]
      selectQuery = selectQuery.lt('date', dateStr)
    } else {
      return NextResponse.json(
        { error: 'Must provide beforeDate or olderThanDays' },
        { status: 400 }
      )
    }

    if (status) {
      selectQuery = selectQuery.eq('status', status)
    }

    // Get bookings to archive
    const { data: bookingsToArchive, error: selectError } = await selectQuery

    if (selectError) {
      console.error('Select error:', selectError)
      return NextResponse.json({ error: selectError.message }, { status: 500 })
    }

    if (!bookingsToArchive || bookingsToArchive.length === 0) {
      return NextResponse.json({
        success: true,
        archivedCount: 0,
        message: 'No bookings found to archive'
      })
    }

    // Insert into archived_bookings
    const { error: insertError } = await supabase
      .from('archived_bookings')
      .insert(bookingsToArchive)

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Delete from bookings
    const bookingIds = bookingsToArchive.map((b: any) => b.id)
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .in('id', bookingIds)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return NextResponse.json(
        { 
          error: `Archived but failed to delete: ${deleteError.message}. Manual cleanup may be needed.`,
          archivedCount: bookingsToArchive.length 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      archivedCount: bookingsToArchive.length,
      message: `Successfully archived ${bookingsToArchive.length} booking(s)`
    })

  } catch (error: any) {
    console.error('Archive error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to archive bookings' },
      { status: 500 }
    )
  } finally {
    await logAdminAction(req, 'archive', 'booking', null, archiveCriteria || undefined)
  }
}
