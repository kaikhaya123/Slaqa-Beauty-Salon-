'use client'

import { useState, useEffect } from 'react'
import { Service, Barber } from '@/lib/types'
import Button from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { format, addDays, isToday, isTomorrow, startOfDay } from 'date-fns'
import { TIME_SLOTS, OPERATING_HOURS } from '@/lib/constants'
import { subscribeToSlotUpdates, unsubscribeFromSlotUpdates, SlotUpdate } from '@/lib/supabase-realtime'
import type { RealtimeChannel } from '@supabase/supabase-js'

interface DateTimeSelectorProps {
  service: Service
  barber: Barber
  onSelect: (date: Date, time: string) => void
  onBack: () => void
}

export default function DateTimeSelector({ service, barber, onSelect, onBack }: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [takenSlots, setTakenSlots] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [slotUnavailableError, setSlotUnavailableError] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false)

  // Generate next 7 days
  useEffect(() => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i))
    }
    setAvailableDates(dates)
  }, [])

  // Fetch availability for selected date and barber
  const fetchAvailability = async (date: Date, barberId: number) => {
    try {
      setIsLoadingSlots(true)
      const dateString = format(date, 'yyyy-MM-dd')
      
      console.log('🔍 Fetching availability for:', { date: dateString, barberId, type: typeof barberId })
      
      const response = await fetch(`/api/availability?date=${dateString}&barberId=${barberId}`)
      
      if (!response.ok) {
        console.error('❌ Availability API failed:', response.status)
        return []
      }

      const data = await response.json()
      console.log('📊 API Response:', data)
      console.log('📊 Taken slots:', data.takenSlots)
      return data.takenSlots || []
    } catch (error) {
      console.error('❌ Error fetching availability:', error)
      return []
    } finally {
      setIsLoadingSlots(false)
    }
  }

  // Get available time slots for selected date
  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedDate) return

      const dayOfWeek = selectedDate.getDay()
      const hours = OPERATING_HOURS[dayOfWeek as keyof typeof OPERATING_HOURS]
      
      // Filter slots based on operating hours
      const filtered = TIME_SLOTS.filter(slot => {
        return slot >= hours.open && slot <= hours.close
      })

      // If today, filter out past times
      let availableToday = filtered
      if (isToday(selectedDate)) {
        const currentHour = new Date().getHours()
        const currentMinute = new Date().getMinutes()
        const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
        
        availableToday = filtered.filter(slot => slot > currentTime)
      }

      console.log('📅 Loading slots for date:', format(selectedDate, 'yyyy-MM-dd'), 'barber:', barber.name, 'barber.id:', barber.id)

      // Fetch taken slots from database
      const taken = await fetchAvailability(selectedDate, barber.id)
      console.log('✅ Taken slots set to:', taken)
      setTakenSlots(taken)
      
      // Set available slots (excluding taken ones)
      setAvailableSlots(availableToday)
      setLastUpdated(new Date())

      setSelectedTime(null)
      setSlotUnavailableError(false)
    }

    loadSlots()

    return () => {
      // Cleanup if needed
    }
  }, [selectedDate, barber.id])

  // Subscribe to real-time slot updates via WebSocket
  useEffect(() => {
    if (!selectedDate) return

    const dateString = format(selectedDate, 'yyyy-MM-dd')
    
    const handleSlotUpdate = (update: SlotUpdate) => {
      console.log('📡 Received slot update:', update)
      setLastUpdated(new Date())
      
      // Update taken slots based on status
      if (update.status === 'taken') {
        setTakenSlots(prev => {
          if (!prev.includes(update.time)) {
            return [...prev, update.time]
          }
          return prev
        })
        
        // If user's selected slot was just taken, show error
        if (selectedTime === update.time) {
          setSlotUnavailableError(true)
        }
      } else if (update.status === 'released') {
        setTakenSlots(prev => prev.filter(t => t !== update.time))
      }
    }

    const channel = subscribeToSlotUpdates(dateString, barber.id, handleSlotUpdate)
    
    if (channel) {
      setIsRealtimeConnected(true)
    }

    return () => {
      unsubscribeFromSlotUpdates(channel)
      setIsRealtimeConnected(false)
    }
  }, [selectedDate, barber.id, selectedTime])


  // Pre-submit verification: Check if selected slot is still available
  const verifySlotAvailability = async (): Promise<boolean> => {
    if (!selectedTime || !selectedDate) return false

    try {
      setIsVerifying(true)
      const dateString = format(selectedDate, 'yyyy-MM-dd')
      const response = await fetch(
        `/api/availability?date=${dateString}&barberId=${barber.id}`
      )

      if (!response.ok) return false

      const data = await response.json()
      const currentlyTaken = data.takenSlots || []
      const slotIsTaken = currentlyTaken.includes(selectedTime)

      if (slotIsTaken) {
        setSlotUnavailableError(true)
        setTakenSlots(currentlyTaken)
        return false
      }

      return true
    } catch (error) {
      console.error('Error verifying slot:', error)
      return true // Continue on error
    } finally {
      setIsVerifying(false)
    }
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleContinue = async () => {
    if (!selectedDate || !selectedTime) return

    // Verify slot is still available before proceeding
    const isAvailable = await verifySlotAvailability()
    if (isAvailable) {
      onSelect(selectedDate, selectedTime)
    }
  }

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'EEE')
  }

  return (
    <div>
      <div className="mb-6">
        <button onClick={onBack} className="text-gold-600 hover:text-gold-700 mb-3 pointer-events-auto">
          ← Back to barbers
        </button>
        <h2 className="text-2xl font-bold text-black-900 mb-2">
          Select Date & Time
        </h2>
        <p className="text-gray-600">
          {service.name} with {barber.name}
        </p>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black-900 mb-4">Choose a Date</h3>
        <div className="grid grid-cols-7 gap-2">
          {availableDates.map((date) => {
            const isSelected = startOfDay(date).getTime() === startOfDay(selectedDate).getTime()
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                className={`p-3 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-black hover:bg-black text-white'
                }`}
              >
                <div className="text-xs font-semibold">{getDateLabel(date)}</div>
                <div className="text-lg font-bold mt-1">{format(date, 'd')}</div>
                <div className="text-xs">{format(date, 'MMM')}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black-900">
            Choose a Time
            {isLoadingSlots ? (
              <span className="ml-2 text-sm text-gray-600 font-normal">
                Loading availability...
              </span>
            ) : (
              <span className="ml-2 text-sm text-gray-600 font-normal">
                ({availableSlots.filter(slot => !takenSlots.includes(slot)).length} slots available)
              </span>
            )}
          </h3>
          {/* Real-time connection status */}
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${isRealtimeConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-gray-600">{isRealtimeConnected ? 'Live' : 'Checking...'}</span>
          </div>
        </div>
        
        {isLoadingSlots ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400 animate-spin" />
            <p>Checking availability...</p>
          </div>
        ) : availableSlots.length > 0 ? (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {availableSlots.map((time) => {
                const isSelected = time === selectedTime
                const isTaken = takenSlots.includes(time)
                
                return (
                  <button
                    key={time}
                    onClick={() => !isTaken && handleTimeSelect(time)}
                    disabled={isTaken}
                    className={`p-3 rounded-lg text-center font-semibold transition-all relative ${
                      isTaken
                        ? 'bg-white text-black cursor-not-allowed border border-black'
                        : isSelected
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-black hover:bg-black text-white'
                    }`}
                  >
                    <div className="text-sm">{time}</div>
                    <div
                      className={`text-xs font-normal ${
                        isTaken ? 'text-black' : isSelected ? 'text-black' : 'text-white'
                      }`}
                    >
                      {isTaken ? 'Taken' : 'Available'}
                    </div>
                  </button>
                )
              })}
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-black">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-black rounded border"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border border-black rounded"></div>
                <span>Taken</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>No available slots for this date</p>
            <p className="text-sm mt-1">Please select another date</p>
          </div>
        )}
      </div>

      {/* Error: Slot became unavailable */}
      {slotUnavailableError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 font-semibold">⚠️ This time slot was just booked!</p>
          <p className="text-red-600 text-sm mt-1">
            Sorry, {selectedTime} is no longer available. Please select another time.
          </p>
        </div>
      )}

      {/* Summary & Continue */}
      {selectedTime && !takenSlots.includes(selectedTime) && !slotUnavailableError && (
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your appointment:</p>
              <p className="font-semibold text-primary-900">
                {format(selectedDate, 'EEEE, MMMM d')} at {selectedTime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Duration:</p>
              <p className="font-semibold text-black-900">{service.duration} min</p>
            </div>
          </div>
        </div>
      )}

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleContinue}
        disabled={!selectedTime || takenSlots.includes(selectedTime) || isLoadingSlots || isVerifying}
      >
        {isLoadingSlots ? 'Loading...' : isVerifying ? 'Verifying slot...' : 'Continue to Details'}
      </Button>
    </div>
  )
}
