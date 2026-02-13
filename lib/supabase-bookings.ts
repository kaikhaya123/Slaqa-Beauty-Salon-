/**
 * Supabase Database Adapter
 * Handles bookings storage and retrieval from Supabase PostgreSQL
 */
import { createClient } from '@supabase/supabase-js'
import { SERVICES } from './constants'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️  Supabase credentials not found, some features may not work')
}

// Initialize Supabase client - only if credentials are available
let supabaseClient: any = null

function getSupabase() {
  if (!supabaseClient && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  }
  return supabaseClient
}

// Export the supabase client for direct use in API routes
export const supabase = getSupabase()

export async function loadBookings() {
  try {
    const sb = getSupabase()
    if (!sb) return []
    
    const { data, error } = await sb
      .from('bookings')
      .select('*')
      .order('createdat', { ascending: false })

    if (error) {
      console.error('Error loading bookings:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Error loading bookings:', err)
    return []
  }
}

export async function saveBooking(input: Record<string, any>) {
  try {
    // Use text-based booking ID (for reference), let UUID id auto-generate
    const bookingId = `RB-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
    const now = new Date().toISOString()

    // Map input to match Supabase schema exactly (LOWERCASE columns, NO raw column)
    const phone = input.from || input.phone || ''
    const date = input.date || new Date().toISOString().split('T')[0]
    const time = input.time || new Date().toTimeString().split(' ')[0]
    // Convert barberid to integer if it's a valid number, otherwise null
    const barberid = input.barberId ? (typeof input.barberId === 'number' ? input.barberId : parseInt(input.barberId, 10) || null) : null
    
    const booking = {
      bookingid: bookingId,
      phone,
      service: input.service || '',
      name: input.name || null,
      email: input.email || null,
      date,
      time,
      barber: input.barber || null,
      barberid,
      queuenumber: null,
      status: input.status || 'pending',
      paymentstatus: input.paymentStatus || 'pending',
      notes: input.notes || null,
      createdat: now,
      updatedat: null,
    }

    // Insert with exact column names matching Supabase schema (LOWERCASE, NO raw, NO id)
    const sb = getSupabase()
    if (!sb) {
      console.error('Error saving booking: Supabase not configured')
      return booking
    }
    
    const { data, error } = await sb
      .from('bookings')
      .insert([{
        // id: auto-generated UUID by Supabase
        bookingid: booking.bookingid,
        phone: booking.phone,
        service: booking.service,
        serviceid: input.serviceId || null,
        name: booking.name,
        email: booking.email,
        date: booking.date,
        time: booking.time,
        barber: booking.barber,
        barberid: booking.barberid,
        queuenumber: booking.queuenumber,
        status: booking.status,
        paymentstatus: booking.paymentstatus,
        notes: booking.notes,
        // raw: NOT in your schema, removed
        createdat: booking.createdat,
        updatedat: booking.updatedat,
      }])
      .select()

    if (error) {
      console.error('Error saving booking:', error)
      return booking
    }

    return data?.[0] || booking
  } catch (err) {
    console.error('Error saving booking:', err)
    throw err
  }
}

/**
 * Find the most recent pending booking from a customer phone number
 */
export async function findPendingBookingByPhone(phone: string) {
  try {
    const sb = getSupabase()
    if (!sb) return null
    
    const { data, error } = await sb
      .from('bookings')
      .select('*')
      .eq('phone', phone)
      .eq('status', 'pending')
      .order('createdat', { ascending: false })
      .limit(1)
      .single()

    if (error?.code === 'PGRST116') {
      // No rows found
      return null
    }

    if (error) {
      console.error('Error finding booking:', error)
      return null
    }

    return data || null
  } catch (err) {
    console.error('Error finding booking:', err)
    return null
  }
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  bookingId: string,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
) {
  try {
    const now = new Date().toISOString()
    const sb = getSupabase()
    if (!sb) return null

    // Match by bookingid (text), not id (UUID)
    const { data, error } = await sb
      .from('bookings')
      .update({ status, updatedat: now })
      .eq('bookingid', bookingId)
      .select()

    if (error) {
      console.error('Error updating booking:', error)
      return null
    }

    return data?.[0] || null
  } catch (err) {
    console.error('Error updating booking:', err)
    return null
  }
}

/**
 * Check if a barber is available at a given date/time
 */
export async function isBarberAvailable(
  barberId: string | null | undefined,
  dateTime: string,
  serviceDuration: number = 60
) {
  if (!barberId) return true // If no barber preference, always available

  try {
    const sb = getSupabase()
    if (!sb) return true
    
    const { data, error } = await sb
      .from('bookings')
      .select('*')
      .eq('barber', barberId)
      .in('status', ['confirmed', 'completed'])
      .not('datetime', 'is', null)

    if (error) {
      console.error('Error checking availability:', error)
      return true // Assume available on error
    }

    const bookings = data || []
    const duration = serviceDuration || 60 // minutes

    const requestedStart = new Date(`${dateTime}:00`)
    const requestedEnd = new Date(requestedStart.getTime() + duration * 60000)

    const hasConflict = bookings.some((b: any) => {
      const existingStart = new Date(`${b.datetime}:00`)
      const existingService = SERVICES.find((s: any) => s.name === b.service)
      const existingDuration = existingService?.duration || 60
      const existingEnd = new Date(existingStart.getTime() + existingDuration * 60000)

      // Check if there's any overlap
      return requestedStart < existingEnd && requestedEnd > existingStart
    })

    return !hasConflict
  } catch (err) {
    console.error('Error checking availability:', err)
    return true // Assume available on error
  }
}

/**
 * Update booking with queue number
 */
export async function updateBookingQueueNumber(
  bookingId: string,
  queueNumber: string
) {
  try {
    const now = new Date().toISOString()
    const sb = getSupabase()
    if (!sb) return null

    // Match by bookingid (text), not id (UUID)
    const { data, error } = await sb
      .from('bookings')
      .update({ queuenumber: queueNumber, updatedat: now })
      .eq('bookingid', bookingId)
      .select()

    if (error) {
      console.error('[Queue] Error updating queue number:', error)
      return null
    }

    return data?.[0] || null
  } catch (err) {
    console.error('[Queue] Error updating queue number:', err)
    return null
  }
}

export default {
  loadBookings,
  saveBooking,
  findPendingBookingByPhone,
  updateBookingStatus,
  isBarberAvailable,
  updateBookingQueueNumber,
}
