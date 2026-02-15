import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-bookings'
import { sendServiceCompletionEmail, sendPostServiceEmail } from '@/lib/gmail'
import { requireAdmin } from '@/lib/adminAuth'
import { logAdminAction } from '@/lib/adminAudit'

export async function PUT(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  try {
    const { bookingId, status } = await request.json()
    console.log('Update request received:', { bookingId, status })

    if (!bookingId || !status) {
      console.log('Missing required fields')
      return NextResponse.json(
        { error: 'Missing bookingId or status' },
        { status: 400 }
      )
    }

    // Check if Supabase client is available
    if (!supabase) {
      console.error('Supabase client not initialized - missing environment variables')
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      )
    }

    console.log('Fetching booking with ID:', bookingId)
    // Fetch booking details before updating
    const { data: bookingData, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (fetchError) {
      console.error('Error fetching booking:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch booking details', details: fetchError.message },
        { status: 500 }
      )
    }

    if (!bookingData) {
      console.error('No booking found with ID:', bookingId)
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    console.log('Found booking:', bookingData.id, 'current status:', bookingData.status)
    console.log('Attempting to update status to:', status)

    // Update booking status in Supabase with updatedat timestamp
    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        status,
        updatedat: new Date().toISOString()
      })
      .eq('id', bookingId)
      .select()

    if (error) {
      console.error('Error updating booking:', error)
      return NextResponse.json(
        { error: 'Failed to update booking', details: error.message },
        { status: 500 }
      )
    }

    console.log('Successfully updated booking:', data)
    console.log('✅ DATABASE UPDATED - New status:', data[0]?.status, 'for booking:', bookingId)

    // Verify the update persisted by fetching again
    const { data: verifyData } = await supabase
      .from('bookings')
      .select('id, status')
      .eq('id', bookingId)
      .single()
    console.log('🔍 VERIFICATION READ - Status in DB:', verifyData?.status)

    await logAdminAction(request, 'update_status', 'booking', bookingId, {
      status,
    })

    // Send thank you email when status is confirmed
    if (status === 'confirmed' && bookingData && bookingData.email) {
      try {
        console.log('[Admin] Sending confirmation email to:', bookingData.email)
        await sendServiceCompletionEmail({
          name: bookingData.name || 'Valued Customer',
          email: bookingData.email,
          service: bookingData.service || 'Haircut Service',
          barber: bookingData.barber || 'our team',
        })
        console.log('[Admin] ✅ Confirmation email sent successfully to:', bookingData.email)
      } catch (emailError) {
        console.error('[Admin] ❌ Error sending confirmation email to', bookingData.email, ':', emailError)
        // Don't fail the booking update if email fails
      }
    } else if (status === 'confirmed') {
      console.log('[Admin] ⚠️ Cannot send confirmation email - missing email address for booking:', bookingId)
    }

    // Send "see you next time" email when booking is marked as completed
    if (status === 'completed' && bookingData && bookingData.email) {
      try {
        console.log('[Admin] Sending completion email to:', bookingData.email)
        await sendPostServiceEmail({
          name: bookingData.name || 'Valued Customer',
          email: bookingData.email,
          service: bookingData.service || 'Haircut Service',
          barber: bookingData.barber || 'our team',
        })
        console.log('[Admin] ✅ Completion email sent successfully to:', bookingData.email)
      } catch (emailError) {
        console.error('[Admin] ❌ Error sending completion email to', bookingData.email, ':', emailError)
        // Don't fail the booking update if email fails
      }
    } else if (status === 'completed') {
      console.log('[Admin] ⚠️ Cannot send completion email - missing email address for booking:', bookingId)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in booking update:', error)
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}
