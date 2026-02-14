import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-bookings'
import { sendServiceCompletionEmail, sendPostServiceEmail } from '@/lib/gmail'

export async function PUT(request: Request) {
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

    // Update booking status in Supabase
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
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

    // Send thank you email when status is confirmed
    if (status === 'confirmed' && bookingData && bookingData.email) {
      try {
        await sendServiceCompletionEmail({
          name: bookingData.name || 'Valued Customer',
          email: bookingData.email,
          service: bookingData.service || 'Haircut Service',
          barber: bookingData.barber || 'our team',
        })
      } catch (emailError) {
        console.error('Error sending thank you email:', emailError)
        // Don't fail the booking update if email fails
      }
    }

    // Send "see you next time" email when booking is marked as completed
    if (status === 'completed' && bookingData && bookingData.email) {
      try {
        await sendPostServiceEmail({
          name: bookingData.name || 'Valued Customer',
          email: bookingData.email,
          service: bookingData.service || 'Haircut Service',
          barber: bookingData.barber || 'our team',
        })
      } catch (emailError) {
        console.error('Error sending post-service email:', emailError)
        // Don't fail the booking update if email fails
      }
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
