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
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="sticky top-16 lg:top-0 z-30 bg-white border-b-2 border-white shadow-sm flex-shrink-0">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-dark-900">
                Customers
              </h1>
              <p className="text-xs sm:text-sm text-dark-600 font-semibold mt-0.5">
                Total: {customers.length} customers
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

      {/* Filters */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 bg-cream-50 border-b border-cream-200 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 border-2 border-cream-300 rounded-lg text-sm focus:outline-none focus:border-dark-900 transition-colors"
          />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border-2 border-cream-300 rounded-lg text-sm font-medium focus:outline-none focus:border-dark-900 transition-colors"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Name (A-Z)</option>
            <option value="bookings">Most Bookings</option>
            <option value="spent">Highest Spender</option>
          </select>
        </div>
      </div>

      {/* Content */}
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

        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Image
              src="/Icons/leader.png"
              alt="No customers"
              width={64}
              height={64}
              className="object-contain mb-4 opacity-50"
            />
            <p className="text-dark-600 font-semibold text-lg">No customers found</p>
            <p className="text-dark-500 text-sm">Customers will appear here once they make bookings</p>
          </div>
        ) : (
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.phone}
                className="bg-white border-2 border-cream-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Customer Info */}
                  <div className="sm:col-span-2">
                    <h3 className="text-base font-black text-dark-900">
                      {customer.name || 'Unknown Customer'}
                    </h3>
                    <p className="text-sm text-dark-600 font-semibold mt-1">
                      {customer.phone}
                    </p>
                    {customer.email && (
                      <p className="text-sm text-dark-600 font-semibold">
                        {customer.email}
                      </p>
                    )}
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                          customer.status === 'active'
                            ? 'bg-green-100 text-green-900'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {customer.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <p className="text-xs text-dark-600 font-semibold uppercase tracking-wide">
                      Bookings
                    </p>
                    <p className="text-2xl font-black text-dark-900">
                      {customer.totalBookings}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-dark-600 font-semibold uppercase tracking-wide">
                      Total Spent
                    </p>
                    <p className="text-2xl font-black text-dark-900">
                      R{customer.totalSpent}
                    </p>
                  </div>

                  {/* Last Booking */}
                  <div className="sm:col-span-2 lg:col-span-4">
                    <p className="text-xs text-dark-600 font-semibold uppercase tracking-wide">
                      Last Booking
                    </p>
                    <p className="text-sm text-dark-900 font-semibold">
                      {new Date(customer.lastBooking || '').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
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
