'use client'

import { useEffect, useState } from 'react'
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

interface Customer {
  phone: string
  name: string | null
  email: string | null
  totalBookings: number
  lastBooking: string | null
  totalSpent: number
  status: 'active' | 'inactive'
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

export default function CustomersPage() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'bookings' | 'spent' | 'recent'>('recent')
  const [lastRefresh, setLastRefresh] = useState(new Date())

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/admin/bookings')
        if (!res.ok) throw new Error('Failed to load customers')

        const bookings: Booking[] = await res.json()

        // Extract unique customers from bookings
        const customerMap = new Map<string, Customer>()

        bookings.forEach((booking) => {
          if (!booking.phone) return

          const existing = customerMap.get(booking.phone)
          const bookingDate = new Date(booking.date || booking.createdat)
          const price = servicePrices[booking.service] || 0

          if (existing) {
            customerMap.set(booking.phone, {
              ...existing,
              totalBookings: existing.totalBookings + 1,
              lastBooking: !existing.lastBooking
                ? booking.date || booking.createdat
                : new Date(booking.date || booking.createdat) > new Date(existing.lastBooking)
                  ? booking.date || booking.createdat
                  : existing.lastBooking,
              totalSpent: existing.totalSpent + price,
              status: booking.status === 'completed' ? 'active' : existing.status,
            })
          } else {
            customerMap.set(booking.phone, {
              phone: booking.phone,
              name: booking.name || null,
              email: booking.email || null,
              totalBookings: 1,
              lastBooking: booking.date || booking.createdat,
              totalSpent: price,
              status: booking.status === 'completed' ? 'active' : 'inactive',
            })
          }
        })

        let customersList = Array.from(customerMap.values())

        // Sort customers
        switch (sortBy) {
          case 'name':
            customersList.sort((a, b) =>
              (a.name || 'Unknown').localeCompare(b.name || 'Unknown')
            )
            break
          case 'bookings':
            customersList.sort((a, b) => b.totalBookings - a.totalBookings)
            break
          case 'spent':
            customersList.sort((a, b) => b.totalSpent - a.totalSpent)
            break
          case 'recent':
            customersList.sort((a, b) =>
              new Date(b.lastBooking || 0).getTime() - new Date(a.lastBooking || 0).getTime()
            )
            break
        }

        // Filter by search
        if (searchQuery) {
          customersList = customersList.filter((c) =>
            (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.phone.includes(searchQuery) ||
            (c.email || '').toLowerCase().includes(searchQuery.toLowerCase())
          )
        }

        setCustomers(customersList)
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load customers')
        setCustomers([])
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchCustomers()
    }
  }, [isAuthenticated, sortBy, searchQuery])

  const handleManualRefresh = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings')
      if (!res.ok) throw new Error('Failed to refresh')
      setLastRefresh(new Date())
      // Trigger re-fetch
      setSortBy('recent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh')
    } finally {
      setLoading(false)
    }
  }

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
        <p className="text-dark-600 font-semibold">Please log in to view customers</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="sticky top-16 lg:top-0 z-30 bg-white border-b-2 border-white shadow-sm flex-shrink-0">
        <div className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-dark-900 truncate">
                Customers
              </h1>
              <p className="text-xs text-dark-600 font-semibold mt-0.5">
                Total: {customers.length}
              </p>
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

      {/* Filters */}
      <div className="flex-shrink-0 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 bg-cream-50 border-b border-cream-200 space-y-2 sm:space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-cream-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-dark-900 transition-colors"
          />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-cream-300 rounded-lg text-xs sm:text-sm font-medium focus:outline-none focus:border-dark-900 transition-colors min-w-max"
          >
            <option value="recent">Recent</option>
            <option value="name">Name</option>
            <option value="bookings">Bookings</option>
            <option value="spent">Spent</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-2.5 sm:p-3 lg:p-6 pt-14 sm:pt-16 lg:pt-3 bg-cream-50">
        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-lg mb-3 sm:mb-4">
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

        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12">
            <Image
              src="/Icons/leader.png"
              alt="No customers"
              width={40}
              height={40}
              className="object-contain mb-2 sm:mb-3 lg:mb-4 opacity-50"
            />
            <p className="text-dark-600 font-semibold text-sm sm:text-lg">No customers found</p>
            <p className="text-dark-500 text-xs sm:text-sm mt-1">Customers will appear once they make bookings</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-2.5 lg:space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.phone}
                className="bg-white border-2 border-cream-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 hover:shadow-md transition-shadow"
              >
                {/* Customer Info */}
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-lg font-black text-dark-900 truncate break-words">
                      {customer.name || 'Unknown'}
                    </h3>
                    <p className="text-xs sm:text-sm text-dark-600 font-semibold mt-0.5 break-all">
                      {customer.phone}
                    </p>
                    {customer.email && (
                      <p className="text-xs sm:text-sm text-dark-600 font-semibold truncate">
                        {customer.email}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-900'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {customer.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-cream-50 rounded-lg p-2 sm:p-3 text-center">
                    <p className="text-xs text-dark-600 font-semibold uppercase tracking-wide mb-0.5">
                      Bookings
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-black text-dark-900">
                      {customer.totalBookings}
                    </p>
                  </div>

                  <div className="bg-cream-50 rounded-lg p-2 sm:p-3 text-center">
                    <p className="text-xs text-dark-600 font-semibold uppercase tracking-wide mb-0.5">
                      Spent
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-black text-dark-900">
                      R{customer.totalSpent}
                    </p>
                  </div>

                  <div className="bg-cream-50 rounded-lg p-2 sm:p-3 text-center">
                    <p className="text-xs text-dark-600 font-semibold uppercase tracking-wide mb-0.5">
                      Last
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base font-bold text-dark-900">
                      {new Date(customer.lastBooking || '').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
