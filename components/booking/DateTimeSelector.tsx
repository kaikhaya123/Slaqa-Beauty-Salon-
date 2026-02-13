'use client'

import { useState, useEffect } from 'react'
import { Service, Barber } from '@/lib/types'
import Button from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { format, addDays, isToday, isTomorrow, startOfDay } from 'date-fns'
import { TIME_SLOTS, OPERATING_HOURS } from '@/lib/constants'

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
      
      // Debug barber ID
      console.log('Fetching availability for barberId:', barberId, 'type:', typeof barberId)
      
      const response = await fetch(`/api/availability?date=${dateString}&barberId=${barberId}`)
      
      if (!response.ok) {
        console.error('Availability API failed:', response.status)
        return [] // Fallback to empty array if API fails
      }

      const data = await response.json()
      return data.takenSlots || []
    } catch (error) {
      console.error('Error fetching availability:', error)
      return [] // Fallback to empty array on error
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

      // Debug barber.id before making API call
      console.log('Debug - barber.id:', barber.id, 'type:', typeof barber.id)

      // Fetch taken slots from database
      const taken = await fetchAvailability(selectedDate, barber.id)
      setTakenSlots(taken)
      
      // Set available slots (excluding taken ones)
      setAvailableSlots(availableToday)

      setSelectedTime(null)
    }

    loadSlots()
  }, [selectedDate, barber.id])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime && !takenSlots.includes(selectedTime)) {
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
        <button onClick={onBack} className="text-accent-600 hover:text-accent-700 mb-3 pointer-events-auto">
          ← Back to barbers
        </button>
        <h2 className="text-2xl font-bold text-primary-900 mb-2">
          Select Date & Time
        </h2>
        <p className="text-gray-600">
          {service.name} with {barber.name}
        </p>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Choose a Date</h3>
        <div className="grid grid-cols-7 gap-2">
          {availableDates.map((date) => {
            const isSelected = startOfDay(date).getTime() === startOfDay(selectedDate).getTime()
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                className={`p-3 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-accent-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
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
                        ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-200'
                        : isSelected
                        ? 'bg-accent-600 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="text-sm">{time}</div>
                    {isTaken && (
                      <div className="text-xs text-red-500 font-normal">Taken</div>
                    )}
                  </button>
                )
              })}
            </div>
            
            {takenSlots.length > 0 && (
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-100 rounded border"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-50 border border-red-200 rounded"></div>
                  <span>Taken</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>No available slots for this date</p>
            <p className="text-sm mt-1">Please select another date</p>
          </div>
        )}
      </div>

      {/* Summary & Continue */}
      {selectedTime && !takenSlots.includes(selectedTime) && (
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your appointment:</p>
              <p className="font-semibold text-primary-900">
                {format(selectedDate, 'EEEE, MMMM d')} at {selectedTime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Duration:</p>
              <p className="font-semibold text-primary-900">{service.duration} min</p>
            </div>
          </div>
        </div>
      )}

      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleContinue}
        disabled={!selectedTime || takenSlots.includes(selectedTime) || isLoadingSlots}
      >
        {isLoadingSlots ? 'Loading...' : 'Continue to Details'}
      </Button>
    </div>
  )
}
