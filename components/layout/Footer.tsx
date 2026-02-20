'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  // Hide footer on admin routes
  if (isAdminRoute) {
    return null
  }

  return (
    <footer className="bg-[#FFFF00] text-black-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo/Slaqa_log.png"
                alt="Slaqa Logo"
                width={400}
                height={160}
                className="h-40 w-auto"
              />
            </div>
            <p className="text-black-900 mb-4">
              Slaqa is a multi-location beauty, hair and barbering brand operating across Durban. 
              Experience professional services at our locations in KwaMashu, Waterloo, and Umlazi.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-6">
              <a href={`https://instagram.com/${BUSINESS_INFO.instagram.replace(/^@/, '')}`} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <Image 
                  src="/Icons/instagram (1).png" 
                  alt="Instagram" 
                  width={24} 
                  height={24} 
                  className="h-6 w-6"
                />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <Image 
                  src="/Icons/facebook.png" 
                  alt="Facebook" 
                  width={24} 
                  height={24} 
                  className="h-6 w-6"
                />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity" aria-label="TikTok">
                <Image 
                  src="/Icons/tik-tok (2).png" 
                  alt="TikTok" 
                  width={24} 
                  height={24} 
                  className="h-6 w-6"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/book" className="text-black-900 hover:text-black-900 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>

              </li>
              <li>
                <Link href="/barbers" className="text-black-900 hover:text-[#FFF44F] transition-colors">
                  Our Barbers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black-900 hover:text-[#FFF44F] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Image 
                  src="/Icons/location (2).png" 
                  alt="Location" 
                  width={20} 
                  height={20} 
                  className="h-5 w-5 mt-0.5 flex-shrink-0"
                />
                <span className="text-black-900 text-sm">{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Image 
                  src="/Icons/phone-call.png" 
                  alt="Phone" 
                  width={20} 
                  height={20} 
                  className="h-5 w-5 flex-shrink-0"
                />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="text-black-900 hover:text-[#FFF44F] text-sm">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Image 
                  src="/Icons/mail.png" 
                  alt="Email" 
                  width={20} 
                  height={20} 
                  className="h-5 w-5 flex-shrink-0"
                />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-black-900 hover:text-[#FFF44F] text-sm">
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Image 
                  src="/Icons/clock.png" 
                  alt="Hours" 
                  width={20} 
                  height={20} 
                  className="h-5 w-5 mt-0.5 flex-shrink-0"
                />
                <div className="text-black-900 text-sm">
                  <div>Mon-Fri: {BUSINESS_INFO.hours.weekdays}</div>
                  <div>Sat: {BUSINESS_INFO.hours.saturday}</div>
                  <div>Sun: {BUSINESS_INFO.hours.sunday}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-black-900 text-sm">
            © {new Date().getFullYear()} Slaqa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
