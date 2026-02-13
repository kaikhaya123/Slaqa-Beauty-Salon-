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
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin/login'
  }

  return (
    <>
      {/* Mobile Menu Button */}
      {mounted && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-dark-900 text-cream-50 rounded-xl shadow-lg"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      )}

      {/* Overlay for mobile */}
      {mounted && isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-dark-900/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative top-0 left-0 z-40 h-full w-64
          bg-white border-r-2 border-white shadow-xl lg:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 flex-shrink-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b-2 border-white bg-white">
            <div className="flex items-center space-x-2.5">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo/Pro_barbershop_logo.png"
                  alt="Pro Barbershop"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-black text-dark-900">Pro Barbershop</h2>
                <p className="text-xs text-dark-600 font-bold">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
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

          {/* User Section */}
          <div className="p-3 border-t-2 border-white bg-white">
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5 px-3 py-2 bg-white rounded-lg border-2 border-white">
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
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-white hover:bg-cream-100 text-dark-900 font-bold rounded-lg transition-all border-2 border-cream-300 text-sm"
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
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-white hover:bg-cream-100 text-dark-900 font-bold rounded-lg transition-all border-2 border-cream-300 text-sm"
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