import { loadBookings } from './bookings'
import { OPERATING_HOURS, TIME_SLOTS } from './constants'

/**
 * Booking object from database
 */
interface DbBooking {
  id: string
  phone: string
  service: string
  date: string
  time: string
  barber: string
  barberid: number
  name: string
  raw: string
  status: string
  source: string
  createdat: string
  updatedat?: string
}

/**
 * Generate a queue number for a booking based on:
 * - Booking date
 * - Barber assigned
 * - Sequential count of bookings for that date/barber
 * 
 * Example: 001, 002, 003, etc.
 */
export async function generateQueueNumber(
  bookingDate: string,
  barberName: string,
  barberId?: number | null,
  time?: string | null
): Promise<string> {
  try {
    const bookings = await loadBookings() as DbBooking[]
    
    console.log('[Queue] Total bookings loaded:', bookings.length)
    
    // Normalize barber name for comparison
    const normalizeBarber = (str: string | undefined | null): string => {
      if (!str) return ''
      return str.trim().toLowerCase()
    }
    
    const normalizedSelectedBarber = normalizeBarber(barberName)
    const selectedBarberId = typeof barberId === 'number' ? barberId : null

    const dateObj = new Date(`${bookingDate}T00:00:00`)
    const dayOfWeek = dateObj.getDay() as keyof typeof OPERATING_HOURS
    const hours = OPERATING_HOURS[dayOfWeek]

    // Get bookings for the same date (ANY barber) - per-day sequential counting
    const sameDayBookings = bookings.filter((b: DbBooking) => {
      if (!b.date) return false
      
      const isSameDate = b.date === bookingDate
      
      // Only count pending or confirmed bookings
      const isRelevantStatus = b.status === 'pending' || b.status === 'confirmed' || !b.status
      
      // IMPORTANT: Only count recent bookings (created within last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const createdDate = new Date(b.createdat)
      const isRecentBooking = createdDate >= thirtyDaysAgo
      
      return isSameDate && isRelevantStatus && isRecentBooking
    })
    
    // Queue number is per-day sequential: first booking of day = 001, second = 002, etc.
    const queueNumber = sameDayBookings.length + 1
    const queueNumberStr = String(queueNumber).padStart(3, '0')
    
    console.log('[Queue] Generated new queue number:', {
      bookingDate,
      barberName: normalizedSelectedBarber || '(any barber)',
      existingBookingsForDay: sameDayBookings.length,
      assignedQueueNumber: queueNumberStr,
      matchedBookings: sameDayBookings.map(b => ({
        id: b.id,
        barber: b.barber,
        date: b.date,
        time: b.time,
        status: b.status
      }))
    })
    
    return queueNumberStr
  } catch (err) {
    console.error('[Queue] Error generating queue number:', err)
    // Fallback to timestamp-based number
    return String(Date.now() % 1000).padStart(3, '0')
  }
}

/**
 * Format a queue number with barber initials
 * Example: "KF-001" for "Khaya" barber
 */
export function formatQueueDisplay(queueNumber: string, barberName?: string): string {
  if (!barberName) return queueNumber
  
  const initials = barberName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
  
  return `${initials}-${queueNumber}`
}
