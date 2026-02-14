'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import StaggeredMenu from '@/components/ui/StaggeredMenu'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  const navigation = [
    { name: 'ABOUT', href: '/about' },
    { name: 'SERVICES', href: '/services' },
    { name: 'BARBERS', href: '/barbers' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'ADMIN', href: '/admin/login' },
  ]

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Barbers', ariaLabel: 'Meet our barbers', link: '/barbers' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
    { label: 'Admin Login', ariaLabel: 'Access admin panel', link: '/admin/login' },
  ]

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com/pro_barber_shop.za' },
    { label: 'WhatsApp', link: 'https://wa.me/27682188679' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Change navbar when scrolled past 50px
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return pathname === href
  }

  const isHomePage = pathname === '/'
  const isAdminRoute = pathname.startsWith('/admin')

  // Hide header on admin routes
  if (isAdminRoute) {
    return null
  }

  return (
     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
       isScrolled || !isHomePage 
         ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100' 
         : 'bg-transparent'
     }`}>
          <div className="mx-auto max-w-7xl">
            <nav className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
              isScrolled || !isHomePage ? 'py-3' : 'py-4'
            }`}>
              {/* Logo/Brand - Fixed Position */}
              <div className="flex items-center flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/logo/Pro_barbershop_logo.png"
                    alt="Pro Barber Shop ZA Logo"
                    width={220}
                    height={75}
                    className={`w-auto transition-all duration-300 ${
                      isScrolled || !isHomePage 
                        ? 'h-12 md:h-14 lg:h-16' 
                        : 'h-16 md:h-18 lg:h-20'
                    }`}
                    priority
                  />
                </Link>
              </div>

          {/* Center Navigation - Better Spacing */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-10 xl:space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 ${
                    isActive(item.href)
                      ? (isScrolled || !isHomePage ? 'text-gray-900' : 'text-white')
                      : (isScrolled || !isHomePage 
                          ? 'text-gray-600 hover:text-gray-900' 
                          : 'text-white/90 hover:text-white')
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - CTA & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Desktop CTA */}
            <Link
              href="/book"
              className={`hidden lg:inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 ${
                isScrolled || !isHomePage
                  ? 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  : 'border border-white text-white hover:bg-white hover:text-gray-900'
              }`}
            >
              <span>BOOK NOW</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>


          </div>
        </nav>
      </div>

      {/* Staggered Menu Navigation */}
      <div className="lg:hidden">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor={isScrolled || pathname !== '/' ? '#000' : '#fff'}
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#B19EEF', '#5227FF', '#ff6b6b']}
          logoUrl="/logo/Pro_barbershop_logo.png"
          accentColor="#ff6b6b"
          isFixed={true}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>
    </header>
  )
}
