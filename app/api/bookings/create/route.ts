import { NextRequest, NextResponse } from 'next/server'
import { saveBooking } from '@/lib/bookings'
import { sendTwilioMessage } from '@/lib/whatsappClient'
import { sanitizePhone } from '@/lib/whatsapp'

import { sendBookingConfirmationEmail } from '@/lib/gmail'
import { supabase } from '@/lib/supabase-bookings'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, service, date, time, barber, barberId, phone, email } = body

    // Validate required fields
    if (!service) {
      return NextResponse.json({ error: 'Service is required' }, { status: 400 })
    }

    // STEP 1: Check slot availability if date and time are provided
    if (date && time && barberId) {
      const { data: existingBooking, error } = await supabase
        .from('bookings')
        .select('id, bookingid')
        .eq('barberid', barberId)
        .eq('date', date)
        .eq('time', time)
        .in('status', ['pending', 'confirmed'])
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found (good)
        console.error('[Booking] Availability check failed:', error)
        return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
      }

      if (existingBooking) {
        console.log('[Booking] Time slot already taken:', { barberId, date, time, existingBooking: existingBooking.bookingid })
        return NextResponse.json({ 
          error: 'This time slot is already booked. Please select a different time.',
          conflictingBooking: existingBooking.bookingid
        }, { status: 409 }) // 409 = Conflict
      }
    }

    // STEP 2: Save booking (availability confirmed)
    const booking = await saveBooking({
      source: 'web',
      from: phone ? sanitizePhone(phone) : '+0000000000',
      service,
      name: name || undefined,
      date: date || new Date().toISOString().split('T')[0],
      time: time || new Date().toTimeString().split(' ')[0],
      barber: barber || undefined,
      barberId: barberId || null,
      raw: JSON.stringify({ name, service, date, time, barber, phone, email }),
      status: 'pending',
    })

    console.log('[Web Booking] Booking saved:', { bookingId: booking.bookingid, service, name, barber })
    
    let confirmationSent = false
    let confirmationMethod = 'none'

    // PRIMARY: Try EMAIL first if provided
    if (email) {
      try {
        const emailSent = await sendBookingConfirmationEmail({
          name: name || 'Customer',
          email,
          service,
          date: date,
          time: time,
          barber: barber || 'Any available',
          location: '35 Nyakata St, Lamontville, Chatsworth, 4027, South Africa',
        })
        if (emailSent) {
          console.log('[Web Booking] Email confirmation sent to:', email)
          confirmationSent = true
          confirmationMethod = 'email'
        }
      } catch (err) {
        console.error('[Web Booking] Email failed:', err)
        // Continue to WhatsApp fallback
      }
    }

    // FALLBACK: Try WhatsApp if email failed or not provided
    if (!confirmationSent && phone) {
      try {
        const cleanPhone = sanitizePhone(phone)
        const dateTimeDisplay = date && time ? `${date} ${time}` : 'To be scheduled'
        const confirmationMsg = `
✓ *Booking Confirmed*

Hi ${name || 'there'}! 👋

Your booking has been saved!

📋 *Details:*
• Service: ${service}
• Date & Time: ${dateTimeDisplay}
• Barber: ${barber || 'Any available'}

📌 *Reference: ${booking.bookingid}*

We'll contact you shortly to confirm. Thanks! 💈
        `.trim()

        await sendTwilioMessage(`whatsapp:+${cleanPhone}`, confirmationMsg)
        console.log('[Web Booking] WhatsApp confirmation sent to:', cleanPhone)
        confirmationSent = true
        confirmationMethod = 'whatsapp'
      } catch (err: any) {
        console.error('[Web Booking] WhatsApp failed:', err?.message)
      }
    }

    if (!confirmationSent) {
      console.warn('[Web Booking] No confirmation method available (no email/phone or all failed)')
    }
    
    return NextResponse.json({ 
      success: true,
      booking: {
        id: booking.bookingid,
        service,
        date,
        time,
        barber,
        name,
        status: 'pending',
        phone: phone ? sanitizePhone(phone) : undefined,
      },
      confirmation: {
        sent: confirmationSent,
        method: confirmationMethod,
      }
    }, { status: 201 })
  } catch (err: any) {
    console.error('[Web Booking] Error:', err)
    return NextResponse.json({ error: err.message || 'Failed to create booking' }, { status: 500 })
  }
}
