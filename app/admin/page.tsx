'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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

interface TodayStats {
  totalCustomers: number
  confirmedCuts: number
  pendingCuts: number
  completedCuts: number
  nextAppointment: Booking | null
  totalRevenue: number
  hourlyBookings: { [hour: string]: number }
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

export default function AdminDashboard() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth()
  const [todayStats, setTodayStats] = useState<TodayStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [mounted, setMounted] = useState(false)
  const [refreshSlot, setRefreshSlot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/admin/bookings')
        if (!res.ok) throw new Error('Failed to load bookings')
        
        const allBookings: Booking[] = await res.json()
        const today = format(new Date(), 'yyyy-MM-dd')
        const todayBookings = allBookings.filter(booking => booking.date === today)
        
        const sortedBookings = todayBookings
          .filter(b => b.status !== 'cancelled' && b.time)
          .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
        
        const now = new Date()
        const currentTime = format(now, 'HH:mm')
        const nextAppointment = sortedBookings.find(booking => 
          booking.time && booking.time > currentTime && booking.status !== 'completed'
        ) || null

        const hourlyBookings: { [hour: string]: number } = {}
        todayBookings.forEach(booking => {
          if (booking.time && booking.status !== 'cancelled') {
            const hour = booking.time.split(':')[0] + ':00'
            hourlyBookings[hour] = (hourlyBookings[hour] || 0) + 1
          }
        })

        const stats: TodayStats = {
          totalCustomers: todayBookings.filter(b => b.status !== 'cancelled').length,
          confirmedCuts: todayBookings.filter(b => b.status === 'confirmed').length,
          pendingCuts: todayBookings.filter(b => b.status === 'pending').length,
          completedCuts: todayBookings.filter(b => b.status === 'completed').length,
          nextAppointment,
          totalRevenue: todayBookings
            .filter(b => b.status !== 'cancelled')
            .reduce((sum, b) => sum + (servicePrices[b.service] || 0), 0),
          hourlyBookings
        }
        
        setTodayStats(stats)
        setLastRefresh(new Date())
        setError('')
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    setMounted(true)

    if (isAuthenticated) {
      fetchTodayData()
      const interval = setInterval(fetchTodayData, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  // Attach refresh button to the mobile header slot when mounted
  useEffect(() => {
    if (mounted) {
      const slot = document.getElementById('refresh-button-slot')
      setRefreshSlot(slot)
    }
  }, [mounted])

  const handleManualRefresh = () => {
    setLoading(true)
    const fetchTodayData = async () => {
      try {
        const res = await fetch('/api/admin/bookings')
        if (!res.ok) throw new Error('Failed to load bookings')
        
        const allBookings: Booking[] = await res.json()
        const today = format(new Date(), 'yyyy-MM-dd')
        const todayBookings = allBookings.filter(booking => booking.date === today)
        
        const sortedBookings = todayBookings
          .filter(b => b.status !== 'cancelled' && b.time)
          .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
        
        const now = new Date()
        const currentTime = format(now, 'HH:mm')
        const nextAppointment = sortedBookings.find(booking => 
          booking.time && booking.time > currentTime && booking.status !== 'completed'
        ) || null

        const hourlyBookings: { [hour: string]: number } = {}
        todayBookings.forEach(booking => {
          if (booking.time && booking.status !== 'cancelled') {
            const hour = booking.time.split(':')[0] + ':00'
            hourlyBookings[hour] = (hourlyBookings[hour] || 0) + 1
          }
        })

        const stats: TodayStats = {
          totalCustomers: todayBookings.filter(b => b.status !== 'cancelled').length,
          confirmedCuts: todayBookings.filter(b => b.status === 'confirmed').length,
          pendingCuts: todayBookings.filter(b => b.status === 'pending').length,
          completedCuts: todayBookings.filter(b => b.status === 'completed').length,
          nextAppointment,
          totalRevenue: todayBookings
            .filter(b => b.status !== 'cancelled')
            .reduce((sum, b) => sum + (servicePrices[b.service] || 0), 0),
          hourlyBookings
        }
        
        setTodayStats(stats)
        setLastRefresh(new Date())
        setError('')
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTodayData()
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-dark-900 border-t-transparent"></div>
          <div className="text-lg sm:text-xl font-bold text-dark-900 text-center">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const getBusyHours = () => {
    if (!todayStats) return []
    return Object.entries(todayStats.hourlyBookings)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([hour, count]) => ({ hour, count }))
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden">
      {/* Refresh Button - Positioned in header slot on mobile */}
      {refreshSlot && createPortal(
        <button
          onClick={handleManualRefresh}
          disabled={loading}
          className="lg:hidden flex items-center justify-center h-10 w-10 bg-cream-200 hover:bg-cream-300 text-dark-900 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          title="Refresh data"
          aria-label="Refresh dashboard"
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
      <div className="hidden lg:block sticky top-0 z-30 bg-white border-b-2 border-white shadow-sm flex-shrink-0">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="hidden sm:block text-xs text-dark-600 font-medium">
                {lastRefresh.toLocaleTimeString()}
              </div>
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-cream-200 hover:bg-cream-300 text-dark-900 font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm"
                title="Refresh data"
              >
                <Image
                  src="/Icons/refresh-buttons.png"
                  alt="Refresh"
                  width={18}
                  height={18}
                  className={`object-contain flex-shrink-0 ${loading ? 'animate-spin' : ''}`}
                />
                <span className="hidden sm:inline text-xs sm:text-sm">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-2.5 sm:p-3 lg:p-6 pt-16 lg:pt-3 bg-cream-50">
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

          {todayStats && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                <div className="bg-dark-900 border-2 border-dark-800 rounded-lg sm:rounded-xl shadow-lg p-2.5 sm:p-3 lg:p-4 transition hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-cream-300 text-xs font-bold uppercase tracking-wide truncate">
                        Today&apos;s Customers
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-4xl font-black text-cream-50 mt-1">
                        {todayStats.totalCustomers}
                      </p>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-cream-200 rounded-full flex items-center justify-center p-1.5 flex-shrink-0">
                      <Image
                        src="/Icons/user.png"
                        alt="Customers"
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-dark-900 border-2 border-dark-800 rounded-lg sm:rounded-xl shadow-lg p-2.5 sm:p-3 lg:p-4 transition hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-cream-300 text-xs font-bold uppercase tracking-wide truncate">
                        Confirmed
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-4xl font-black text-cream-50 mt-1">
                        {todayStats.confirmedCuts}
                      </p>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center p-1.5 flex-shrink-0">
                      <Image
                        src="/Icons/check-mark.png"
                        alt="Confirmed"
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-dark-900 border-2 border-dark-800 rounded-lg sm:rounded-xl shadow-lg p-2.5 sm:p-3 lg:p-4 transition hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-cream-300 text-xs font-bold uppercase tracking-wide truncate">
                        Pending
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-4xl font-black text-cream-50 mt-1">
                        {todayStats.pendingCuts}
                      </p>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-yellow-100 rounded-full flex items-center justify-center p-1.5 flex-shrink-0">
                      <Image
                        src="/Icons/clock.png"
                        alt="Pending"
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-dark-900 border-2 border-dark-800 rounded-lg sm:rounded-xl shadow-lg p-2.5 sm:p-3 lg:p-4 transition hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-cream-300 text-xs font-bold uppercase tracking-wide truncate">
                        Revenue
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-4xl font-black text-cream-50 mt-1">
                        R{todayStats.totalRevenue}
                      </p>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-cream-200 rounded-full flex items-center justify-center p-1.5 flex-shrink-0">
                      <Image
                        src="/Icons/money.png"
                        alt="Revenue"
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Appointment & Busy Hours */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-4">
                {/* Next Appointment */}
                <div className="bg-white border-2 border-cream-300 rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
                  <div className="px-3 sm:px-4 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-cream-100 border-b-2 border-cream-300">
                    <h3 className="text-xs sm:text-sm lg:text-base font-black text-dark-900">Next Appointment</h3>
                  </div>
                  <div className="p-3 sm:p-3 lg:p-4">
                    {todayStats.nextAppointment ? (
                      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-dark-900">
                            {todayStats.nextAppointment.time}
                          </span>
                          <span className="px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-green-100 text-green-800 text-xs font-bold rounded-lg sm:rounded-xl border-2 border-green-300 uppercase">
                            {todayStats.nextAppointment.status}
                          </span>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2 bg-cream-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 border-2 border-cream-200">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-dark-900 text-sm sm:text-base lg:text-lg break-words">
                              {todayStats.nextAppointment.name || 'Walk-in Customer'}
                            </p>
                            {todayStats.nextAppointment.queuenumber && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-dark-900 text-cream-50 whitespace-nowrap">
                                Client no.{todayStats.nextAppointment.queuenumber}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-dark-700 font-semibold break-words">
                            {todayStats.nextAppointment.service}
                          </p>
                          <p className="text-xs sm:text-sm text-dark-600 font-medium break-words">
                            Barber: {todayStats.nextAppointment.barber}
                          </p>
                          <p className="text-xs sm:text-sm text-dark-600 font-medium break-words">
                            {todayStats.nextAppointment.phone}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 sm:py-6 lg:py-8">
                        <Image
                          src="/Icons/appointment.png"
                          alt="No appointments"
                          width={40}
                          height={40}
                          className="object-contain mx-auto mb-2 sm:mb-3 lg:mb-4 opacity-40"
                        />
                        <p className="text-xs sm:text-sm lg:text-base text-dark-600 font-semibold">No appointments remaining</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Busiest Hours */}
                <div className="bg-white border-2 border-cream-300 rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
                  <div className="px-3 sm:px-4 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-cream-100 border-b-2 border-cream-300">
                    <h3 className="text-xs sm:text-sm lg:text-base font-black text-dark-900">Peak Hours Today</h3>
                  </div>
                  <div className="p-3 sm:p-3 lg:p-4">
                    <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                      {getBusyHours().map(({ hour, count }, index) => (
                        <div key={hour} className="flex items-center justify-between bg-cream-50 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border-2 border-cream-200">
                          <div className="flex items-center space-x-2 min-w-0">
                            <span className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full text-white text-xs sm:text-sm font-black flex items-center justify-center flex-shrink-0 ${
                              index === 0 ? 'bg-dark-900' : index === 1 ? 'bg-dark-700' : 'bg-dark-500'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="font-black text-dark-900 text-sm sm:text-base lg:text-lg">{hour}</span>
                          </div>
                          <span className="text-xs sm:text-sm lg:text-base font-bold text-dark-700 whitespace-nowrap flex-shrink-0">
                            {count}
                          </span>
                        </div>
                      ))}
                      {getBusyHours().length === 0 && (
                        <p className="text-xs sm:text-sm lg:text-base text-dark-600 text-center py-3 sm:py-4 lg:py-6 font-semibold">No bookings recorded</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="bg-dark-900 border-2 border-dark-800 rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
                <div className="px-3 sm:px-4 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-cream-100 border-b-2 border-cream-300">
                  <h3 className="text-xs sm:text-sm lg:text-base font-black text-dark-900">Today&apos;s Progress</h3>
                </div>
                <div className="p-3 sm:p-3 lg:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-cream-50 mb-1 sm:mb-2">{todayStats.completedCuts}</div>
                      <div className="text-xs lg:text-sm text-cream-300 font-bold mb-2 lg:mb-3">Completed Cuts</div>
                      <div className="w-full bg-cream-200 rounded-full h-2 sm:h-2.5 lg:h-3 border-2 border-cream-300">
                        <div 
                          className="bg-cream-50 h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${todayStats.totalCustomers > 0 ? (todayStats.completedCuts / todayStats.totalCustomers) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      <div className="text-xs text-cream-400 font-semibold mt-1">
                        {todayStats.totalCustomers > 0 ? Math.round((todayStats.completedCuts / todayStats.totalCustomers) * 100) : 0}%
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-green-300 mb-1 sm:mb-2">{todayStats.confirmedCuts}</div>
                      <div className="text-xs lg:text-sm text-cream-300 font-bold mb-2 lg:mb-3">Ready to Cut</div>
                      <div className="w-full bg-green-100 rounded-full h-2 sm:h-2.5 lg:h-3 border-2 border-green-300">
                        <div 
                          className="bg-green-400 h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${todayStats.totalCustomers > 0 ? (todayStats.confirmedCuts / todayStats.totalCustomers) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      <div className="text-xs text-cream-400 font-semibold mt-1">
                        {todayStats.totalCustomers > 0 ? Math.round((todayStats.confirmedCuts / todayStats.totalCustomers) * 100) : 0}%
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-300 mb-1 sm:mb-2">{todayStats.pendingCuts}</div>
                      <div className="text-xs lg:text-sm text-cream-300 font-bold mb-2 lg:mb-3">Awaiting Confirmation</div>
                      <div className="w-full bg-yellow-100 rounded-full h-2 sm:h-2.5 lg:h-3 border-2 border-yellow-300">
                        <div 
                          className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${todayStats.totalCustomers > 0 ? (todayStats.pendingCuts / todayStats.totalCustomers) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      <div className="text-xs text-cream-400 font-semibold mt-1">
                        {todayStats.totalCustomers > 0 ? Math.round((todayStats.pendingCuts / todayStats.totalCustomers) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
