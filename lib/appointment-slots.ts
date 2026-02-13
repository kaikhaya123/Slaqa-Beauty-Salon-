// Appointment slot management utilities
// Replaces queue system with time-based appointment booking

export interface TimeSlot {
  time: string  // 'HH:MM' format
  available: boolean
  barber?: string
  barberId?: number
}

export interface AvailabilityData {
  date: string
  unavailableSlots: Record<string, TimeSlot[]>
  totalBookings: number
}

/**
 * Generate available time slots for a business day
 * @param startTime - Business start time (e.g., '08:00')
 * @param endTime - Business end time (e.g., '20:00') 
 * @param slotDuration - Duration per slot in minutes (default: 30)
 * @param bookedSlots - Already booked time slots
 */
export function generateTimeSlots(
  startTime: string = '08:00',
  endTime: string = '20:00', 
  slotDuration: number = 30,
  bookedSlots: string[] = []
): TimeSlot[] {
  const slots: TimeSlot[] = []
  
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)
  
  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin
  
  for (let minutes = startMinutes; minutes < endMinutes; minutes += slotDuration) {
    const hour = Math.floor(minutes / 60)
    const min = minutes % 60
    const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
    
    slots.push({
      time: timeString,
      available: !bookedSlots.includes(timeString)
    })
  }
  
  return slots
}

/**
 * Check if a specific time slot is available
 * @param barberId - ID of the barber
 * @param date - Date in YYYY-MM-DD format
 * @param time - Time in HH:MM format  
 */
export async function checkSlotAvailability(
  barberId: number | null,
  date: string,
  time: string
): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      date,
      time,
      ...(barberId && { barberId: barberId.toString() })
    })

    const response = await fetch(`/api/bookings/availability?${params}`)
    
    if (!response.ok) {
      console.error('[Slot Check] API error:', response.status)
      return false
    }
    
    const data = await response.json()
    return data.available ?? false
    
  } catch (error) {
    console.error('[Slot Check] Network error:', error)
    return false
  }
}

/**
 * Get unavailable slots for a specific date
 * @param date - Date in YYYY-MM-DD format
 */
export async function getUnavailableSlots(date: string): Promise<AvailabilityData | null> {
  try {
    const response = await fetch(`/api/bookings/availability?date=${date}`)
    
    if (!response.ok) {
      console.error('[Unavailable Slots] API error:', response.status)
      return null
    }
    
    return await response.json()
    
  } catch (error) {
    console.error('[Unavailable Slots] Network error:', error)
    return null
  }
}

/**
 * Business hours configuration
 */
export const BUSINESS_HOURS = {
  start: '08:00',
  end: '20:00', 
  slotDuration: 30, // minutes
  
  // Days of week (0 = Sunday, 1 = Monday, etc.)
  operatingDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
  
  // Break times (lunch break, etc.)
  breaks: [
    { start: '12:00', end: '13:00' } // Lunch break
  ]
}

/**
 * Check if a date is a business day
 */
export function isBusinessDay(date: Date): boolean {
  const dayOfWeek = date.getDay()
  return BUSINESS_HOURS.operatingDays.includes(dayOfWeek)
}

/**
 * Get next available business day
 */
export function getNextBusinessDay(fromDate: Date = new Date()): Date {
  const nextDay = new Date(fromDate)
  nextDay.setDate(nextDay.getDate() + 1)
  
  while (!isBusinessDay(nextDay)) {
    nextDay.setDate(nextDay.getDate() + 1)
  }
  
  return nextDay
}

/**
 * Format time for display (12-hour format)
 */
export function formatTimeDisplay(time24: string): string {
  const [hour, minute] = time24.split(':').map(Number)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`
}

/**
 * Check if time is within break periods
 */
export function isBreakTime(time: string): boolean {
  return BUSINESS_HOURS.breaks.some(breakPeriod => {
    return time >= breakPeriod.start && time < breakPeriod.end
  })
}