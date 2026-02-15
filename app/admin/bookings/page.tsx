'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { format } from 'date-fns'
import { useAdminAuth } from '@/lib/useAdminAuth'
import { supabaseClient } from '@/lib/supabase-client'
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
  const [mounted, setMounted] = useState(false)
  const [refreshSlot, setRefreshSlot] = useState<HTMLElement | null>(null)
  
  // Archive functionality
  const [archiveDays, setArchiveDays] = useState('30')
  const [archiveStatus, setArchiveStatus] = useState('')
  const [previewCount, setPreviewCount] = useState<number | null>(null)
  const [archiving, setArchiving] = useState(false)
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false)

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true)
      // Add cache-busting parameter to prevent stale data
      const res = await fetch(`/api/admin/bookings?_=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      })
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
  }, [])

  useEffect(() => {
    setMounted(true)

    if (isAuthenticated) {
      fetchBookings()
    }
  }, [isAuthenticated, fetchBookings])

  useEffect(() => {
    if (!isAuthenticated || !supabaseClient) return

    const channel = supabaseClient
      .channel('admin-bookings-list-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => {
          fetchBookings()
        }
      )
      .subscribe()

    return () => {
      supabaseClient.removeChannel(channel)
    }
  }, [isAuthenticated, fetchBookings])

  // Attach refresh button to the mobile header slot when mounted
  useEffect(() => {
    if (mounted) {
      const slot = document.getElementById('refresh-button-slot')
      setRefreshSlot(slot)
    }
  }, [mounted])

  const updateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
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
    await fetchBookings()
  }

  const handlePreviewArchive = async () => {
    try {
      const params = new URLSearchParams()
      params.append('olderThanDays', archiveDays)
      if (archiveStatus) params.append('status', archiveStatus)

      const res = await fetch(`/api/admin/bookings/archive?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to preview archive')

      const data = await res.json()
      setPreviewCount(data.count)
      setError('')
    } catch (e: any) {
      setError(e.message)
      setPreviewCount(null)
    }
  }

  const handleArchive = async () => {
    try {
      setArchiving(true)
      setShowArchiveConfirm(false)

      const body: any = { olderThanDays: archiveDays }
      if (archiveStatus) body.status = archiveStatus

      const res = await fetch('/api/admin/bookings/archive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('Failed to archive bookings')

      const data = await res.json()
      setSuccessMessage(data.message)
      setPreviewCount(null)
      setError('')
      
      // Refresh bookings list
      await handleManualRefresh()
      
      setTimeout(() => setSuccessMessage(''), 4000)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setArchiving(false)
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
    <div className="w-full h-full flex flex-col bg-cream-50 overflow-hidden">
      {/* Refresh Button - Positioned in header slot on mobile */}
      {refreshSlot && createPortal(
        <button
          onClick={handleManualRefresh}
          disabled={loading}
          className="lg:hidden flex items-center justify-center h-10 w-10 bg-cream-200 hover:bg-cream-300 text-dark-900 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          title="Refresh data"
          aria-label="Refresh bookings"
        >
          <Image
            src="/Icons/refresh-buttons.png"
            alt="Refresh"
            width={18}
            height={18}
            className={`object-contain flex-shrink-0 ${loading ? 'animate-spin' : ''}`}
          />
        </button>,
        refreshSlot
      )}

      {/* Page Header (desktop only) */}
      <div className="hidden lg:block sticky top-0 z-30 bg-white border-b-2 border-cream-300 shadow-sm flex-shrink-0">
        <div className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-dark-900 truncate">All Bookings</h1>
              <p className="text-xs text-dark-600 font-semibold mt-0.5">{filteredBookings.length} bookings found</p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="hidden sm:block text-xs text-dark-600 font-medium">
                {lastRefresh.toLocaleTimeString()}
              </div>
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-cream-200 hover:bg-cream-300 text-dark-900 font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm"
                title="Refresh data"
              >
                <Image
                  src="/Icons/refresh-page-option.png"
                  alt="Refresh"
                  width={16}
                  height={16}
                  className={`object-contain flex-shrink-0 ${loading ? 'animate-spin' : ''}`}
                />
                <span className="hidden sm:inline text-xs sm:text-sm">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-2.5 sm:p-3 lg:p-6 pt-14 sm:pt-16 lg:pt-3">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <Image
                  src="/Icons/multiply.png"
                  alt="Error"
                  width={18}
                  height={18}
                  className="object-contain flex-shrink-0"
                />
                <p className="text-xs sm:text-sm lg:text-base font-bold text-red-900">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border-2 border-green-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <Image
                  src="/Icons/check.png"
                  alt="Success"
                  width={18}
                  height={18}
                  className="object-contain flex-shrink-0"
                />
                <p className="text-xs sm:text-sm lg:text-base font-bold text-green-900">✓ Booking {successMessage}</p>
              </div>
            </div>
          )}

          {/* Filters and Search */}
          <div className="bg-white border-2 border-cream-300 rounded-lg sm:rounded-xl shadow-lg p-2.5 sm:p-3 lg:p-4">
            <div className="space-y-3 sm:space-y-4">
              {/* Search Bar */}
              <div>
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border-2 border-cream-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent font-semibold text-dark-900 placeholder:text-dark-400"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-bold transition-all whitespace-nowrap ${
                    filter === 'all'
                      ? 'bg-dark-900 text-cream-50 shadow-lg scale-105'
                      : 'bg-cream-200 text-dark-900 hover:bg-cream-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('today')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-bold transition-all whitespace-nowrap ${
                    filter === 'today'
                      ? 'bg-dark-900 text-cream-50 shadow-lg scale-105'
                      : 'bg-cream-200 text-dark-900 hover:bg-cream-300'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-bold transition-all whitespace-nowrap ${
                    filter === 'upcoming'
                      ? 'bg-dark-900 text-cream-50 shadow-lg scale-105'
                      : 'bg-cream-200 text-dark-900 hover:bg-cream-300'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-bold transition-all whitespace-nowrap ${
                    filter === 'pending'
                      ? 'bg-dark-900 text-cream-50 shadow-lg scale-105'
                      : 'bg-white text-yellow-900 hover:bg-yellow-200 border-2 border-yellow-300'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('confirmed')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-bold transition-all whitespace-nowrap ${
                    filter === 'confirmed'
                      ? 'bg-dark-900 text-cream-50 shadow-lg scale-105'
                      : 'bg-white text-green-900 hover:bg-green-200 border-2 border-green-300'
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-bold transition-all whitespace-nowrap ${
                    filter === 'completed'
                      ? 'bg-dark-900 text-cream-50 shadow-lg scale-105'
                      : 'bg-white text-blue-900 hover:bg-blue-200 border-2 border-blue-300'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter('cancelled')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-bold transition-all whitespace-nowrap ${
                    filter === 'cancelled'
                      ? 'bg-dark-900 text-cream-50 shadow-lg scale-105'
                      : 'bg-white text-red-900 hover:bg-red-200 border-2 border-red-300'
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>

          {/* Archive Old Bookings Section */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">📦</span>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-dark-900">
                Archive Old Bookings
              </h3>
            </div>
            
            <p className="text-xs sm:text-sm text-dark-600 mb-3 sm:mb-4">
              Move old bookings to archive to keep your active bookings list clean. Archived bookings are preserved for reporting.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              {/* Archive Age Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-dark-700 mb-1.5 sm:mb-2">
                  Archive bookings older than:
                </label>
                <select
                  value={archiveDays}
                  onChange={(e) => {
                    setArchiveDays(e.target.value)
                    setPreviewCount(null)
                  }}
                  className="w-full px-3 py-2 text-sm rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none"
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days (2 months)</option>
                  <option value="90">90 days (3 months)</option>
                  <option value="180">180 days (6 months)</option>
                  <option value="365">1 year</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-dark-700 mb-1.5 sm:mb-2">
                  Status filter (optional):
                </label>
                <select
                  value={archiveStatus}
                  onChange={(e) => {
                    setArchiveStatus(e.target.value)
                    setPreviewCount(null)
                  }}
                  className="w-full px-3 py-2 text-sm rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none"
                >
                  <option value="">All statuses</option>
                  <option value="completed">Completed only</option>
                  <option value="cancelled">Cancelled only</option>
                  <option value="pending">Pending only</option>
                  <option value="confirmed">Confirmed only</option>
                </select>
              </div>

              {/* Preview Button */}
              <div className="flex items-end">
                <button
                  onClick={handlePreviewArchive}
                  disabled={archiving}
                  className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  Preview
                </button>
              </div>

              {/* Archive Button */}
              <div className="flex items-end">
                <button
                  onClick={() => setShowArchiveConfirm(true)}
                  disabled={previewCount === null || previewCount === 0 || archiving}
                  className="w-full px-4 py-2 bg-dark-900 hover:bg-dark-800 text-cream-50 text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {archiving ? 'Archiving...' : 'Archive'}
                </button>
              </div>
            </div>

            {/* Preview Results */}
            {previewCount !== null && (
              <div className={`p-3 rounded-lg ${previewCount > 0 ? 'bg-orange-100 border border-orange-300' : 'bg-gray-100 border border-gray-300'}`}>
                <p className="text-sm font-bold text-dark-900">
                  {previewCount === 0 ? (
                    '✓ No bookings found matching these criteria'
                  ) : (
                    <>
                      📦 {previewCount} booking{previewCount !== 1 ? 's' : ''} will be archived
                      {archiveStatus && ` (${archiveStatus} only)`}
                    </>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Archive Confirmation Modal */}
          {showArchiveConfirm && (
            <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
              <div className="bg-black rounded-xl shadow-2xl p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-dark-900 mb-3">Confirm Archive</h3>
                <p className="text-dark-600 mb-4">
                  Are you sure you want to archive <strong>{previewCount}</strong> booking{previewCount !== 1 ? 's' : ''}?
                </p>
                <p className="text-sm text-dark-500 mb-6">
                  Bookings will be moved to the archive table. They can be accessed later for reporting but will not appear in your active bookings.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowArchiveConfirm(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-dark-900 font-bold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleArchive}
                    className="flex-1 px-4 py-2 bg-black hover:bg-black text-white font-bold rounded-lg transition-colors"
                  >
                    Archive Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bookings List */}
          <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">{filteredBookings.length === 0 ? (
              <div className="bg-white border-2 border-cream-300 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center">
                <Image
                  src="/Icons/appointment.png"
                  alt="No bookings"
                  width={40}
                  height={40}
                  className="object-contain mx-auto mb-2 sm:mb-3 lg:mb-4 opacity-50"
                />
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-dark-600">No bookings found</p>
                <p className="text-xs sm:text-sm text-dark-400 mt-1.5">Try adjusting your filters</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white border-2 border-cream-300 rounded-lg sm:rounded-xl shadow-lg p-2.5 sm:p-3 lg:p-4 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                    {/* Booking Info */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base lg:text-lg font-black text-dark-900 break-words">
                          {booking.name || 'Walk-in Customer'}
                        </h3>
                        {booking.queuenumber && (
                          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-black bg-dark-900 text-cream-50 border-2 border-cream-300 whitespace-nowrap">
                            Client no.{booking.queuenumber}
                          </span>
                        )}
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <span className="font-bold text-dark-600 flex-shrink-0">Phone:</span>
                          <span className="text-dark-900 break-all">{booking.phone}</span>
                        </div>
                        {booking.email && (
                          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                            <span className="font-bold text-dark-600 flex-shrink-0">Email:</span>
                            <span className="text-dark-900 truncate">{booking.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <span className="font-bold text-dark-600 flex-shrink-0">Service:</span>
                          <span className="text-dark-900 break-words">{booking.service}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="font-bold text-dark-600 flex-shrink-0">Price:</span>
                          <span className="text-dark-900">R{servicePrices[booking.service] || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time & Barber */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-2 lg:gap-3">
                      <div className="bg-cream-100 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                        <p className="text-xs font-bold text-dark-600 uppercase">Date</p>
                        <p className="text-xs sm:text-sm lg:text-base font-black text-dark-900 break-words">
                          {booking.date ? format(new Date(booking.date), 'MMM dd') : 'Not set'}
                        </p>
                      </div>
                      <div className="bg-cream-100 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl">
                        <p className="text-xs font-bold text-dark-600 uppercase">Time</p>
                        <p className="text-xs sm:text-sm lg:text-base font-black text-dark-900">
                          {booking.time || '-'}
                        </p>
                      </div>
                      <div className="bg-dark-900 text-cream-50 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-center">
                        <p className=" text-xs font-bold uppercase">Barber</p>
                        <p className="text-xs sm:text-sm lg:text-base font-black break-words">{booking.barber || 'Any'}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          disabled={updatingIds.includes(booking.id)}
                          className="flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-2 bg-dark-900 hover:bg-dark-800 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center justify-center gap-1 min-w-max"
                          title="Confirm booking"
                        >
                          {updatingIds.includes(booking.id) ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <Image
                                src="/Icons/verified.png"
                                alt="Confirm"
                                width={14}
                                height={14}
                                className="object-contain brightness-0 invert flex-shrink-0"
                              />
                              <span>Confirm</span>
                            </>
                          )}
                        </button>
                      )}

                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          disabled={updatingIds.includes(booking.id)}
                          className="flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center justify-center gap-1 min-w-max"
                          title="Mark as completed"
                        >
                          {updatingIds.includes(booking.id) ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <Image
                                src="/Icons/check (2).png"
                                alt="Complete"
                                width={14}
                                height={14}
                                className="object-contain brightness-0 invert flex-shrink-0"
                              />
                              <span>Complete</span>
                            </>
                          )}
                        </button>
                      )}

                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          disabled={updatingIds.includes(booking.id)}
                          className="flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center justify-center gap-1 min-w-max"
                          title="Cancel booking"
                        >
                          {updatingIds.includes(booking.id) ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <Image
                                src="/Icons/cancel.png"
                                alt="Cancel"
                                width={14}
                                height={14}
                                className="object-contain brightness-0 invert flex-shrink-0"
                              />
                              <span>Cancel</span>
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
