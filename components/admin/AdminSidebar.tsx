'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string
  href: string
  icon: string
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: '/Icons/dashboards (1).png' },
  { name: 'Bookings', href: '/admin/bookings', icon: '/Icons/online-booking (1).png' },
  { name: 'Calendar', href: '/admin/calendar', icon: '/Icons/calendar (1).png' },
  { name: 'Customers', href: '/admin/customers', icon: '/Icons/leader.png' },
]

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [adminUser, setAdminUser] = useState('Admin')
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Only access localStorage after component mounts on client
    setMounted(true)
    const user = localStorage.getItem('adminUser')
    if (user) {
      setAdminUser(user)
    }
    
    // Close menu when route changes
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    // Close menu on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Don't render sidebar on login page
  if (pathname === '/admin/login') {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin/login'
  }

  return (
    <>
      {/* Mobile Header - Always visible on mobile */}
      {mounted && (
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b-2 border-white shadow-md flex items-center justify-between px-3 gap-2">
          {/* Logo/Greeting Section */}
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo/Pro_barbershop_logo.png"
                alt="Pro Barbershop"
                fill
                className="object-contain"
              />
            </div>
            <div className="min-w-0 flex-1 flex flex-col justify-center leading-tight">
              <h2 className="text-xs sm:text-sm font-black text-dark-900 truncate leading-tight">{getGreeting()}, Barber Fuze</h2>
              <p className="text-xs text-dark-600 font-bold truncate leading-tight">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Refresh Button Placeholder - pages will position their refresh button here */}
          <div className="h-10 w-10 flex items-center justify-center flex-shrink-0" id="refresh-button-slot"></div>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-dark-900 text-cream-50 rounded-xl shadow-lg flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </header>
      )}

      {/* Full Screen Overlay for mobile menu */}
      {mounted && isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-dark-900/50 z-40"
          style={{ top: '64px' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar/Menu */}
      <aside
        className={`
          lg:relative lg:translate-x-0 flex-shrink-0 h-full w-64
          bg-white border-r-2 border-white shadow-xl lg:shadow-none
          transition-all duration-300 ease-in-out
          ${
            mounted && isOpen
              ? 'fixed top-16 left-0 z-50 translate-x-0 h-[calc(100vh-4rem)]'
              : mounted
                ? 'hidden lg:flex flex-col'
                : 'flex flex-col'
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section - Only show on desktop */}
          <div className="hidden lg:block p-3 border-b-2 border-white bg-white">
            <div className="flex items-center space-x-2.5">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo/Pro_barbershop_logo.png"
                  alt="Pro Barbershop"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center leading-tight">
                <h2 className="text-lg font-black text-dark-900 leading-tight">{getGreeting()}, Barber Fuze</h2>
                <p className="text-xs text-dark-600 font-bold leading-tight">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="lg:flex-1 overflow-y-auto p-3 space-y-1.5 lg:flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center space-x-2.5 px-3 py-2.5 rounded-lg
                    font-bold text-sm transition-all
                    ${
                      isActive
                        ? 'bg-dark-900 text-white shadow-lg scale-105'
                        : 'bg-white text-dark-900 hover:bg-white hover:scale-105'
                    }
                  `}
                >
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className={`object-contain ${isActive ? 'brightness-0 invert' : ''}`}
                    />
                  </div>
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Section - Fixed at bottom on mobile and desktop */}
          <div className="flex-shrink-0 p-4 lg:p-3 border-t-2 border-white bg-white">
            <div className="space-y-2.5 lg:space-y-2">
              <div className="flex items-center space-x-2.5 px-3 py-2.5 lg:py-2 bg-white rounded-lg border-2 border-white">
                <div className="relative w-9 h-9 bg-dark-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-cream-50 font-black text-xs">
                    {adminUser.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-dark-900 truncate">
                    {adminUser}
                  </p>
                  <p className="text-xs text-dark-600 font-semibold">Administrator</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-3 py-3 lg:py-2 bg-white hover:bg-cream-100 active:bg-cream-200 text-dark-900 font-bold rounded-lg transition-all border-2 border-cream-300 text-sm min-h-12 lg:min-h-auto"
              >
                <Image
                  src="/Icons/logout (1).png"
                  alt="Logout"
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span>Logout</span>
              </button>

              <Link
                href="/"
                className="w-full flex items-center justify-center space-x-2 px-3 py-3 lg:py-2 bg-white hover:bg-cream-100 active:bg-cream-200 text-dark-900 font-bold rounded-lg transition-all border-2 border-cream-300 text-sm min-h-12 lg:min-h-auto"
              >
                <Image
                  src="/Icons/website.png"
                  alt="Back to website"
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span>Back to Website</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}