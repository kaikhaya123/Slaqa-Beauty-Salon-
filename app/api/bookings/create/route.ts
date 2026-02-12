import { NextRequest, NextResponse } from 'next/server'
import { saveBooking, updateBookingQueueNumber } from '@/lib/bookings'
import { sendTwilioMessage } from '@/lib/whatsappClient'
import { sanitizePhone } from '@/lib/whatsapp'
import { generateQueueNumber, formatQueueDisplay } from '@/lib/queue'
import { sendBookingConfirmationEmail } from '@/lib/gmail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, service, date, time, barber, barberId, phone, email } = body

    // Validate required fields
    if (!service) {
      return NextResponse.json({ error: 'Service is required' }, { status: 400 })
    }

    // STEP 1: Save booking FIRST (without queue number yet)
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

    // STEP 2: Generate queue number NOW that booking exists in database
    const bookingDate = date || new Date().toISOString().split('T')[0]
    const queueNumber = await generateQueueNumber(bookingDate, barber || 'General')
    const queueDisplay = formatQueueDisplay(queueNumber, barber)

    // STEP 3: Update booking with queue number
    await updateBookingQueueNumber(booking.bookingid, queueDisplay)

    console.log('[Web Booking] Queue assigned:', { bookingId: booking.id, queueNumber: queueDisplay })
    
    let confirmationSent = false
    let confirmationMethod = 'none'

    // PRIMARY: Try EMAIL first if provided
    if (email) {
      try {
        const emailSent = await sendBookingConfirmationEmail({
          name: name || 'Customer',
          email,
          service,
          datetime: date && time ? `${date} ${time}` : 'To be scheduled',
          barber: barber || 'Any available',
          queueNumber: queueDisplay,
          location: '35 Nyakata St, Lamontville, Chatsworth, 4027, South Africa',
        })
        if (emailSent) {
          console.log('[Web Booking] Email confirmation sent to:', email, 'Queue:', queueDisplay)
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

Queue #: ${queueDisplay}

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
        queueNumber: queueDisplay,
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
