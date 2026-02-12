 'use client'
import { Service, Barber } from '@/lib/types'
import Button from '@/components/ui/Button'
import { format } from 'date-fns'
// Icon placeholders: put custom SVGs in `/public/Icons/` and reference them via <img>
// Example: <img src="/Icons/calendar.svg" alt="Calendar" className="h-5 w-5" />
import { BUSINESS_INFO } from '@/lib/constants'
import Image from 'next/image'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

interface BookingConfirmationProps {
  bookingId: string
  queueNumber?: string | null
  service: Service
  barber: Barber
  date: Date
  time: string
  whatsappLink?: string | null
  onStartOver: () => void
}

export default function BookingConfirmation({
  bookingId,
  queueNumber,
  service,
  barber,
  date,
  time,
  whatsappLink = null,
  onStartOver,
}: BookingConfirmationProps) {
  const lottieRef = useRef<HTMLDivElement | null>(null)
  const [lottieLoaded, setLottieLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const refCurrent = lottieRef.current;
    if (!refCurrent) return;
    refCurrent.innerHTML = '';

    let mountedEl: HTMLElement | null = null;
    let pollId: number | null = null;

    const mountLottie = () => {
      if (typeof window === 'undefined') return false;
      const ce = (window as any).customElements;
      if (!ce || !ce.get) return false;
      if (!ce.get('lottie-player')) return false;

      mountedEl = document.createElement('lottie-player');
      mountedEl.setAttribute('src', encodeURI('/lottie/Success Tick.lottie'));
      mountedEl.setAttribute('background', 'transparent');
      mountedEl.setAttribute('speed', '1');
      mountedEl.setAttribute('style', 'width:48px;height:48px');
      mountedEl.setAttribute('loop', '');
      mountedEl.setAttribute('autoplay', '');
      // Ensure autoplay isn't blocked by browsers: set muted and call play()
      mountedEl.setAttribute('muted', '');
      refCurrent!.appendChild(mountedEl);
      // Some browsers/register may require an explicit play call
      try {
        ;(mountedEl as any).play?.()
      } catch (e) {
        // ignore play errors; mount will still be present
      }
      // Also try a brief retry after append
      setTimeout(() => {
        try {
          ;(mountedEl as any).play?.()
        } catch (e) {}
      }, 100)
      return true;
    };

    // If script already loaded, try mount immediately
    if (lottieLoaded) {
      if (!mountLottie()) {
        // poll briefly for registration
        pollId = window.setInterval(() => {
          if (mountLottie() && pollId) {
            window.clearInterval(pollId);
            pollId = null;
          }
        }, 100);
      }
    }

    return () => {
      if (mountedEl && refCurrent && refCurrent.contains(mountedEl)) {
        refCurrent.removeChild(mountedEl);
      }
      if (pollId) window.clearInterval(pollId);
    };
  }, [lottieLoaded]);

  return (
    <div className="min-h-screen bg-[#f1efec] p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#7f6446] text-center py-8 px-6 mb-0 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" strategy="afterInteractive" onLoad={() => setLottieLoaded(true)} />
              <div ref={lottieRef} className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 font-serif">
              Your Appointment
            </h1>
            <h2 className="text-4xl font-bold text-white mb-2 font-serif">
              Awaits!
            </h2>
            <p className="text-[#d9d5ce] text-sm max-w-md mx-auto leading-relaxed">
              Your appointment has been confirmed and saved to our system. We&apos;ll contact you shortly via WhatsApp to finalize details.
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border-l-[10px] border-r-[10px] border-[#7f6446] p-6">
          {/* Success Icon & Title */}
          <div className="text-center mb-6">
            <Image 
              src="/Icons/success.png" 
              alt="Success" 
              width={60} 
              height={60} 
              className="h-15 w-15 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-[#7f6446] font-serif">
              Appointment Confirmed
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Reference: <span className="font-mono font-bold text-[#7f6446]">{bookingId}</span>
            </p>
          </div>

          {/* Date & Time Section - Prominent */}
          <div className="grid grid-cols-3 gap-0 mb-6">
            {/* Date Display */}
            <div className="bg-white border-l-[1px] border-[#7f6446] text-center p-4">
              <h3 className="text-3xl font-bold text-[#7f6446] font-serif leading-none">
                {format(date, 'd')}
              </h3>
              <h4 className="text-lg font-bold text-[#7f6446] font-serif">
                {format(date, 'MMM').toUpperCase()}
              </h4>
            </div>
            
            {/* Appointment Details */}
            <div className="col-span-2 p-4 text-left">
              <div className="text-gray-600 text-sm mb-1">
                {format(date, 'EEEE, MMMM d, yyyy')}
              </div>
              <div className="font-semibold text-[#7f6446] text-lg mb-2">{time}</div>
              <div className="text-sm text-gray-600">
                Please arrive 5 minutes early for your appointment.
              </div>
            </div>
          </div>

          {/* Queue Number - PROMINENT */}
          {queueNumber && (
            <div className="bg-[#ffd16f] border-2 border-[#7f6446] rounded-lg p-6 mb-6 text-center">
              <p className="text-sm text-[#7f6446] mb-2 font-semibold">YOUR QUEUE NUMBER</p>
              <p className="text-5xl font-bold text-[#7f6446] font-mono">{queueNumber}</p>
              <p className="text-xs text-[#7f6446] mt-3">
                This is your position in the queue. Arrive on time and mention this number!
              </p>
            </div>
          )}

          {/* Service Details Section */}
          <div className="bg-[#7f6446] text-white p-6 mb-6 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              {/* Service Image */}
              <div className="text-center">
                <Image 
                  src="/Icons/hairdresser.png" 
                  alt="Barber Service" 
                  width={80} 
                  height={80}
                  className="w-20 h-20 mx-auto mb-2 filter brightness-0 invert"
                />
              </div>
              
              {/* Service Details */}
              <div className="col-span-2">
                <h3 className="text-xl font-bold mb-2 text-white">
                  {service.name}
                </h3>
                <p className="text-[#d9d5ce] text-sm mb-2">
                  {service.duration} minutes • R{service.price}
                </p>
                <p className="text-[#d9d5ce] text-sm leading-relaxed">
                  Professional hair styling service with experienced barber.
                </p>
              </div>
            </div>
          </div>

          {/* Barber Details Section */}
          <div className="bg-[#7f6446] text-white p-6 mb-6 rounded-lg border-t border-white/20">
            <div className="grid grid-cols-3 gap-4">
              {/* Barber Image */}
              <div className="text-center">
                <Image 
                  src="/Icons/barber.png" 
                  alt="Your Barber" 
                  width={80} 
                  height={80}
                  className="w-20 h-20 mx-auto mb-2 filter brightness-0 invert"
                />
              </div>
              
              {/* Barber Details */}
              <div className="col-span-2">
                <h3 className="text-xl font-bold mb-2 text-white">
                  {barber.name}
                </h3>
                <p className="text-[#d9d5ce] text-sm mb-2">
                  {barber.title}
                </p>
                <p className="text-[#d9d5ce] text-sm leading-relaxed">
                  Your professional barber will provide excellent service and styling.
                </p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-4">
              <Image 
                src="/Icons/location.png" 
                alt="Location" 
                width={24} 
                height={24} 
                className="h-6 w-6 mt-1 flex-shrink-0"
              />
              <div>
                <h4 className="font-bold text-[#7f6446] mb-2">Visit Us At</h4>
                <p className="text-gray-700 font-medium">{BUSINESS_INFO.address}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Located conveniently in Durban for all your grooming needs.
                </p>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-[#7f6446] mb-4 flex items-center gap-3">
              <Image 
                src="/Icons/chatting.png" 
                alt="Next Steps" 
                width={24} 
                height={24} 
                className="h-6 w-6"
              />
              What Happens Next?
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#ffd16f] rounded-full mt-2 flex-shrink-0"></div>
                <span>Your booking has been saved to our system</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#ffd16f] rounded-full mt-2 flex-shrink-0"></div>
                <span>Our staff will contact you via WhatsApp to confirm details</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#ffd16f] rounded-full mt-2 flex-shrink-0"></div>
                <span>You&apos;ll receive a reminder 24 hours before your appointment</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#ffd16f] rounded-full mt-2 flex-shrink-0"></div>
                <span>Please arrive 5 minutes early on your appointment day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-[#7f6446] p-6 space-y-4">
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            className="bg-[#ffd16f] text-[#7f6446] hover:bg-[#ffd16f]/90 border-0 font-semibold"
            onClick={() => {
              const link = whatsappLink || (window as any).__WHATSAPP_LINK || ("https://wa.me/" + (BUSINESS_INFO.whatsapp || ''))
              try { trackEvent('whatsapp_cta_click', { location: 'booking_confirmation', path: pathname || '/' }) } catch (e) {}
              window.open(link, '_blank')
            }}
          >
            Open WhatsApp Chat
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="md"
              fullWidth
              className="border-white text-white hover:bg-white hover:text-[#7f6446]"
              onClick={onStartOver}
            >
              Book Another
            </Button>

            <Button
              asLink
              href="/"
              variant="outline"
              size="md"
              fullWidth
              className="border-white text-white hover:bg-white hover:text-[#7f6446]"
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Bottom Contact */}
        <div className="bg-[#f1efec] text-center py-6">
          <p className="text-sm text-gray-600 mb-3">Need Immediate Help?</p>
          <div className="flex justify-center space-x-6">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center space-x-2 text-[#7f6446] hover:text-[#7f6446]/80"
            >
              <Image src="/Icons/phone-call(1).png" alt="Call" width={18} height={18} className="h-4 w-4" />
              <span className="text-sm font-medium">Call Us</span>
            </a>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
              className="flex items-center space-x-2 text-[#7f6446] hover:text-[#7f6446]/80"
            >
              <Image src="/Icons/whatsapp.png" alt="WhatsApp" width={18} height={18} className="h-4 w-4" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
