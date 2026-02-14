'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
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

const servicePrices: { [key: string]: number } = {
  'DROP FADE & DYE': 150,
  'TAPER FADE & DYE': 150,
  'FADE & DYE': 150,
  'KIDDIES CUT & STYLE': 150,
  'KIDDIES FADE & DYE': 150,
  'PLAIN FADE': 60,
  'FADE DYE WITH DESIGNS': 200,
}

export default function BookingsPage() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [updatingIds, setUpdatingIds] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/admin/bookings')
        if (!res.ok) throw new Error('Failed to load bookings')
        
        const data: Booking[] = await res.json()
        setBookings(data)
        setLastRefresh(new Date())
        setError('')
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchBookings()
      const interval = setInterval(fetchBookings, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const updateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      console.log('Updating booking:', bookingId, 'to status:', newStatus)
      setUpdatingIds((prev: string[]) => (prev.includes(bookingId) ? prev : [...prev, bookingId]))
      
      const res = await fetch('/api/admin/bookings/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus }),
      })

      if (!res.ok) throw new Error('Failed to update booking')

      // Update local state immediately
      setBookings(prev =>
        prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
      )
      console.log('Local state updated for booking:', bookingId, 'new status:', newStatus)

      // Set appropriate success message
      if (newStatus === 'confirmed') {
        setSuccessMessage(`Booking confirmed! Thank you email sent to customer.`)
      } else if (newStatus === 'completed') {
        setSuccessMessage(`Booking completed! "See you next time" email sent to customer.`)
      } else if (newStatus === 'cancelled') {
        setSuccessMessage(`Booking cancelled`)
      } else {
        setSuccessMessage(`Booking ${newStatus}`)
      }
      
      setTimeout(() => setSuccessMessage(''), 4000)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking')
    } finally {
      setUpdatingIds((prev: string[]) => prev.filter(id => id !== bookingId))
    }
  }

  const handleManualRefresh = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings')
      if (!res.ok) throw new Error('Failed to load bookings')
      
      const data: Booking[] = await res.json()
      setBookings(data)
      setLastRefresh(new Date())
      setError('')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredBookings = () => {
    let filtered = bookings

    // Apply status/date filters
    const today = format(new Date(), 'yyyy-MM-dd')
    switch (filter) {
      case 'today':
        filtered = filtered.filter(b => b.date === today && (b.status === 'pending' || b.status === 'confirmed'))
        break
      case 'upcoming':
        filtered = filtered.filter(b => b.date && b.date >= today && (b.status === 'pending' || b.status === 'confirmed'))
        break
      case 'pending':
        filtered = filtered.filter(b => b.status === 'pending')
        break
      case 'confirmed':
        filtered = filtered.filter(b => b.status === 'confirmed')
        break
      case 'completed':
        filtered = filtered.filter(b => b.status === 'completed')
        break
      case 'cancelled':
        filtered = filtered.filter(b => b.status === 'cancelled')
        break
      case 'all':
        // Only show active bookings in 'all' view
        filtered = filtered.filter(b => b.status === 'pending' || b.status === 'confirmed')
        break
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(b =>
        b.name?.toLowerCase().includes(query) ||
        b.phone.includes(query) ||
        b.email?.toLowerCase().includes(query) ||
        b.bookingid.toLowerCase().includes(query) ||
        b.service.toLowerCase().includes(query)
      )
    }

    // Sort by date and time (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(`${a.date || '2000-01-01'}T${a.time || '00:00'}`)
      const dateB = new Date(`${b.date || '2000-01-01'}T${b.time || '00:00'}`)
      return dateB.getTime() - dateA.getTime()
    })
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-900 border-yellow-300',
      confirmed: 'bg-green-100 text-green-900 border-green-300',
      completed: 'bg-blue-100 text-blue-900 border-blue-300',
      cancelled: 'bg-red-100 text-red-900 border-red-300',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border-2 ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    )
  }

  if (authLoading || loading && bookings.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-dark-900 border-t-transparent"></div>
          <div className="text-lg sm:text-xl font-bold text-dark-900 text-center">Loading bookings...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const filteredBookings = getFilteredBookings()

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Page Header */}
      <div className="sticky top-0 z-30 bg-white border-b-2 border-cream-300 shadow-sm">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-dark-900">All Bookings</h1>
              <p className="text-xs sm:text-sm text-dark-600 font-semibold mt-0.5">{filteredBookings.length} bookings found</p>
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
                  className={`object-contain ${loading ? 'animate-spin' : ''}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-3 sm:p-4 lg:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Image
                  src="/Icons/multiply.png"
                  alt="Error"
                  width={20}
                  height={20}
                  className="object-contain flex-shrink-0 sm:w-6 sm:h-6"
                />
                <p className="text-sm sm:text-base font-bold text-red-900">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Image
                  src="/Icons/check.png"
                  alt="Success"
                  width={20}
                  height={20}
                  className="object-contain flex-shrink-0 sm:w-6 sm:h-6"
                />
                <p className="text-sm sm:text-base font-bold text-green-900">✓ Booking {successMessage}</p>
              </div>
            </div>
          )}

          {/* Filters and Search */}
          <div className="bg-white border-2 border-cream-300 rounded-xl shadow-lg p-3 sm:p-4">
            <div className="space-y-4">
              {/* Search Bar */}
              <div>
                <input
                  type="text"
                  placeholder="Search by name, phone, email, or booking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent font-semibold text-dark-900 placeholder:text-dark-400"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-xl font-bold transition-all ${
                    filter === 'all'
                      ? 'bg-dark-900 text-cream-50 shadow-lg transform scale-105'
                      : 'bg-cream-200 text-dark-900 hover:bg-cream-300'
                  }`}
                >
                  All ({bookings.filter(b => b.status !== 'cancelled').length})
                </button>
                <button
                  onClick={() => setFilter('today')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-xl font-bold transition-all ${
                    filter === 'today'
                      ? 'bg-dark-900 text-cream-50 shadow-lg transform scale-105'
                      : 'bg-cream-200 text-dark-900 hover:bg-cream-300'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-xl font-bold transition-all ${
                    filter === 'upcoming'
                      ? 'bg-dark-900 text-cream-50 shadow-lg transform scale-105'
                      : 'bg-cream-200 text-dark-900 hover:bg-cream-300'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-xl font-bold transition-all ${
                    filter === 'pending'
                      ? 'bg-dark-900 text-cream-50 shadow-lg transform scale-105'
                      : 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200 border-2 border-yellow-300'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('confirmed')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-xl font-bold transition-all ${
                    filter === 'confirmed'
                      ? 'bg-dark-900 text-cream-50 shadow-lg transform scale-105'
                      : 'bg-green-100 text-green-900 hover:bg-green-200 border-2 border-green-300'
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-xl font-bold transition-all ${
                    filter === 'completed'
                      ? 'bg-dark-900 text-cream-50 shadow-lg transform scale-105'
                      : 'bg-blue-100 text-blue-900 hover:bg-blue-200 border-2 border-blue-300'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter('cancelled')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-xl font-bold transition-all ${
                    filter === 'cancelled'
                      ? 'bg-dark-900 text-cream-50 shadow-lg transform scale-105'
                      : 'bg-red-100 text-red-900 hover:bg-red-200 border-2 border-red-300'
                  }`}
                >
                  Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
                </button>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-2.5 sm:space-y-3">
            {filteredBookings.length === 0 ? (
              <div className="bg-white border-2 border-cream-300 rounded-xl shadow-lg p-6 sm:p-8 text-center">
                <Image
                  src="/Icons/appointment.png"
                  alt="No bookings"
                  width={48}
                  height={48}
                  className="object-contain mx-auto mb-3 sm:mb-4 opacity-50 sm:w-16 sm:h-16"
                />
                <p className="text-lg sm:text-xl font-bold text-dark-600">No bookings found</p>
                <p className="text-xs sm:text-sm text-dark-400 mt-2">Try adjusting your filters or search query</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white border-2 border-cream-300 rounded-xl shadow-lg p-3 sm:p-4 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                    {/* Booking Info */}
                    <div className="flex-1 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-black text-dark-900">
                          {booking.name || 'Walk-in Customer'}
                        </h3>
                        {booking.queuenumber && (
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-dark-900 text-cream-50 border-2 border-cream-300">
                            Client no.{booking.queuenumber}
                          </span>
                        )}
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-dark-600">Phone:</span>
                          <span className="text-dark-900">{booking.phone}</span>
                        </div>
                        {booking.email && (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-dark-600">Email:</span>
                            <span className="text-dark-900 truncate">{booking.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-dark-600">Service:</span>
                          <span className="text-dark-900">{booking.service}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-dark-600">Price:</span>
                          <span className="text-dark-900">R{servicePrices[booking.service] || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-row sm:flex-row lg:flex-col gap-2 sm:gap-3 lg:gap-2">
                      <div className="bg-cream-100 px-3 sm:px-4 py-2 rounded-xl flex-1 sm:flex-initial">
                        <p className="text-xs font-bold text-dark-600 uppercase">Date</p>
                        <p className="text-sm sm:text-base font-black text-dark-900">
                          {booking.date ? format(new Date(booking.date), 'MMM dd, yyyy') : 'Not set'}
                        </p>
                      </div>
                      <div className="bg-cream-100 px-3 sm:px-4 py-2 rounded-xl flex-1 sm:flex-initial">
                        <p className="text-xs font-bold text-dark-600 uppercase">Time</p>
                        <p className="text-sm sm:text-base font-black text-dark-900">
                          {booking.time || 'Not set'}
                        </p>
                      </div>
                    </div>

                    {/* Barber Info */}
                    <div className="lg:w-44">
                      <div className="bg-dark-900 text-cream-50 px-3 py-2 rounded-xl text-center">
                        <p className="text-xs font-bold uppercase mb-1">Barber</p>
                        <p className="text-base sm:text-lg font-black">{booking.barber || 'Any Available'}</p>
                      </div>
                      <p className="text-xs text-dark-400 text-center mt-2 font-semibold">
                        ID: {booking.bookingid.substring(0, 8)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          disabled={updatingIds.includes(booking.id)}
                          className="px-4 py-2 bg-black hover:bg-black text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap flex items-center justify-center gap-2"
                          title="Confirm this booking"
                        >
                          {updatingIds.includes(booking.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <Image
                                src="/Icons/verified.png"
                                alt="Confirm"
                                width={16}
                                height={16}
                                className="object-contain brightness-0 invert"
                              />
                              <span className="hidden sm:inline">Confirm</span>
                            </>
                          )}
                        </button>
                      )}

                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          disabled={updatingIds.includes(booking.id)}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap flex items-center justify-center gap-2"
                          title="Mark as completed"
                        >
                          {updatingIds.includes(booking.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <Image
                                src="/Icons/check (2).png"
                                alt="Complete"
                                width={16}
                                height={16}
                                className="object-contain brightness-0 invert"
                              />
                              <span className="hidden sm:inline">Complete</span>
                            </>
                          )}
                        </button>
                      )}

                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          disabled={updatingIds.includes(booking.id)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap flex items-center justify-center gap-2"
                          title="Cancel this booking"
                        >
                          {updatingIds.includes(booking.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <Image
                                src="/Icons/cancel.png"
                                alt="Cancel"
                                width={16}
                                height={16}
                                className="object-contain brightness-0 invert"
                              />
                              <span className="hidden sm:inline">Cancel</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
