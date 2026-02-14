'use client'

import { useEffect, useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { useAdminAuth } from '@/lib/useAdminAuth'
import Image from 'next/image'

interface Booking {
  id: string
  bookingid: string
  phone: string
  service: string
  name: string | null
  email: string | null
  date: string | null
  time: string | null
  barber: string | null
  queuenumber: string | null
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  source: string
  createdat: string
}

export default function CalendarPage() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/admin/bookings')
        if (!res.ok) throw new Error('Failed to load bookings')
        const data: Booking[] = await res.json()
        setBookings(data)
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bookings')
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchBookings()
    }
  }, [isAuthenticated])

  const handleManualRefresh = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings')
      if (!res.ok) throw new Error('Failed to refresh')
      const data: Booking[] = await res.json()
      setBookings(data)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh')
    } finally {
      setLoading(false)
    }
  }

  const getBookingsForDate = (date: Date) => {
    return bookings.filter((booking) => {
      if (!booking.date) return false
      return isSameDay(new Date(booking.date), date)
    })
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Pad the start of the calendar with days from the previous month
  const firstDayOfWeek = monthStart.getDay()
  const previousMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => {
    const date = new Date(monthStart)
    date.setDate(date.getDate() - (firstDayOfWeek - i))
    return date
  })

  // Pad the end of the calendar with days from the next month
  const totalDays = previousMonthDays.length + daysInMonth.length
  const nextMonthDays = Array.from({ length: 42 - totalDays }, (_, i) => {
    const date = new Date(monthEnd)
    date.setDate(date.getDate() + i + 1)
    return date
  })

  const allDays = [...previousMonthDays, ...daysInMonth, ...nextMonthDays]

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : []

  if (authLoading || loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <p className="text-dark-600 font-semibold">Please log in to view calendar</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="sticky top-16 lg:top-0 z-30 bg-white border-b-2 border-white shadow-sm flex-shrink-0">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-dark-900">
                Calendar
              </h1>
              <p className="text-xs sm:text-sm text-dark-600 font-semibold mt-0.5">
                {format(currentMonth, 'MMMM yyyy')}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block text-xs text-dark-600 font-medium">
                {lastRefresh.toLocaleTimeString()}
              </div>
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="px-3 py-2 bg-cream-200 hover:bg-cream-300 text-dark-900 font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                title="Refresh data"
              >
                <Image
                  src="/Icons/refresh-page-option.png"
                  alt="Refresh"
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 sm:p-4 shadow-lg mb-4">
            <div className="flex items-center gap-3">
              <Image
                src="/Icons/multiply.png"
                alt="Error"
                width={20}
                height={20}
                className="object-contain flex-shrink-0"
              />
              <p className="text-sm sm:text-base font-bold text-red-900">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border-2 border-cream-200">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="px-4 py-2 bg-dark-900 text-white font-bold rounded-lg hover:bg-dark-800 transition-all"
            >
              ← Previous
            </button>

            <h2 className="text-xl font-black text-dark-900">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>

            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="px-4 py-2 bg-dark-900 text-white font-bold rounded-lg hover:bg-dark-800 transition-all"
            >
              Next →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border-2 border-cream-200 overflow-hidden">
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 bg-dark-900 text-white">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-3 text-center font-bold text-sm">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {allDays.map((date, index) => {
                    const dateBookings = getBookingsForDate(date)
                    const isCurrentMonth = isSameMonth(date, currentMonth)
                    const isSelected = selectedDate && isSameDay(date, selectedDate)

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`aspect-square p-2 border-2 text-center transition-all flex flex-col items-center justify-center text-sm font-bold ${
                          isSelected
                            ? 'bg-dark-900 text-white border-dark-900'
                            : isCurrentMonth
                              ? 'bg-white text-dark-900 border-cream-200 hover:bg-cream-50'
                              : 'bg-cream-50 text-dark-500 border-cream-100'
                        }`}
                      >
                        <span>{format(date, 'd')}</span>
                        {dateBookings.length > 0 && (
                          <span className={`text-xs mt-1 px-1.5 py-0.5 rounded-full font-bold ${
                            isSelected
                              ? 'bg-white text-dark-900'
                              : 'bg-dark-900 text-white'
                          }`}>
                            {dateBookings.length}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-dark-600 font-semibold">Legend:</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-dark-900 rounded"></div>
                  <span className="text-dark-600">Selected date / Has bookings</span>
                </div>
              </div>
            </div>

            {/* Sidebar - Selected Date Bookings */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border-2 border-cream-200 p-4 sticky top-32 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-black text-dark-900 mb-4">
                  {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select a date'}
                </h3>

                {selectedDate ? (
                  selectedDateBookings.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="border-l-4 border-dark-900 pl-3 py-2"
                        >
                          <p className="font-bold text-sm text-dark-900">
                            {booking.time || 'Time TBA'}
                          </p>
                          <p className="text-xs text-dark-600">
                            {booking.name || 'Unknown'}
                          </p>
                          <p className="text-xs text-dark-600">
                            {booking.service}
                          </p>
                          <span
                            className={`inline-block mt-1 px-2 py-1 rounded text-xs font-bold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-900'
                                : booking.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-900'
                                  : booking.status === 'completed'
                                    ? 'bg-blue-100 text-blue-900'
                                    : 'bg-red-100 text-red-900'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-dark-600 text-sm">No bookings on this date</p>
                  )
                ) : (
                  <p className="text-dark-600 text-sm">Click on a date to view bookings</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
