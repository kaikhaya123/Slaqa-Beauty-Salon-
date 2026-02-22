'use client';

import { useState, useEffect } from 'react';
import { MenuIcon, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { DrawerContent, HeaderDrawer } from '@/components/ui/responsive-header';


const galleryItems = [
  {
    id: 1,
    src: '/Video/3787401183569150083.mp4',
    alt: 'Nambita Cafe',
    heading: 'Nambita Cafe',
  },
  {
    id: 2,
    src: '/Video/3807772878972712461.mp4',
    alt: 'The Slaqa Salon',
    heading: 'The Slaqa Salon',
  },
  {
    id: 3,
    src: '/Video/3823637384852700786.mp4',
    alt: 'The Barbershop Show Studios',
    heading: 'The Barbershop Show',
  },
];

const navLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About',         href: '/about' },
  { label: 'Services',      href: '/services' },
  { label: 'Barbers',       href: '/barbers' },
  { label: 'Nambita Café',  href: '/nambita-cafe' },
  { label: 'Contact',       href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const isHomePage   = pathname === '/';
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (isAdminRoute) return null;

  // Always white text inside the black drawer
  const navLinkClass =
    'relative flex items-center gap-2 text-white ' +
    'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full ' +
    'after:origin-bottom-right after:scale-x-0 after:bg-[#FFF44F] ' +
    'after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] ' +
    'hover:after:origin-bottom-left hover:after:scale-x-100 ' +
    'hover:text-[#FFF44F] transition-colors duration-200';

  const isYellow = isScrolled || !isHomePage;

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
        isYellow ? 'bg-[#FFFF00] shadow-lg' : 'bg-transparent shadow-none'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isYellow ? 'py-3' : 'py-4'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/SLAQA_SALON_LOGO.png"
              alt="Slaqa Barbershop Logo"
              width={220}
              height={75}
              className={`w-auto transition-all duration-300 ${
                isYellow
                  ? 'brightness-0 h-12 md:h-14'
                  : 'brightness-0 invert h-14 md:h-16'
              }`}
              priority
            />
          </Link>

          {/* Right-side controls */}
          <div className="flex items-center gap-4">
            {/* Desktop Book Now CTA */}
            <Link
              href="/book"
              className={`hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide border transition-all duration-300 hover:scale-105 ${
                isYellow
                  ? 'border-black-900 text-black-900 hover:bg-black-900 hover:text-black-900'
                  : 'border-white text-white hover:bg-black-900 hover:text-black'
              }`}
            >
              <span>BOOK NOW</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Hamburger */}
            <HeaderDrawer
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              drawerBtn={() => (
                <button
                  aria-label="Open navigation menu"
                  className={`transition-colors duration-200 p-1 ${
                    isYellow
                      ? 'text-black-900 hover:text-black-900'
                      : 'text-white hover:text-amber-400'
                  }`}
                >
                  <MenuIcon className="h-7 w-7" />
                </button>
              )}
            >
              <DrawerContent>
                {/* Mobile drag handle */}
                {!isDesktop && (
                  <div className="flex justify-center w-full pt-3 pb-1">
                    <div className="w-16 h-[0.30rem] shrink-0 rounded-full bg-[#FFF44F]/30" />
                  </div>
                )}

                <div className="container mx-auto p-5 pb-7">
                  {/* Drawer header row */}
                  <div className="flex justify-between items-center border-b border-white/15 pb-4 mb-5">
                    <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3">
                      <Image
                        src="/logo/SLAQA_SALON_LOGO.png"
                        alt="Slaqa Salon"
                        width={40}
                        height={40}
                        className="h-9 w-auto brightness-0 invert"
                      />
                      <span className="text-[#FFF44F] text-xl font-bold tracking-[0.25em] uppercase">
                        SLAQA SALON
                      </span>
                    </Link>
                    {/* Close button — always visible on all screen sizes */}
                    <button
                      className="flex items-center justify-center p-2 rounded-full bg-white/10 text-white hover:bg-[#FFF44F] hover:text-[#2e2e2e] transition-colors duration-200"
                      onClick={() => setSidebarOpen(false)}
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Nav + gallery — stacked on mobile, side-by-side on desktop */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-6 md:gap-0">

                    {/* Navigation links */}
                    <nav className="shrink-0">
                      <ul className="text-xl md:text-2xl xl:text-3xl space-y-3 md:space-y-4 xl:space-y-6 font-semibold uppercase md:pr-10">
                        {navLinks.map(({ label, href }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              onClick={() => setSidebarOpen(false)}
                              className={navLinkClass}
                            >
                              {label}
                            </Link>
                          </li>
                        ))}
                        {/* Book Now CTA */}
                        <li className="pt-2">
                          <Link
                            href="/book"
                            onClick={() => setSidebarOpen(false)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide border border-[#FFF44F] text-[#FFF44F] hover:bg-[#FFF44F] hover:text-[#2e2e2e] transition-all duration-300"
                          >
                            BOOK NOW
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </nav>

                    {/* Gallery ─ horizontal scroll strip on mobile, 3-col grid on desktop */}
                    <div className="w-full md:pl-4 xl:pl-8 xl:pr-10">

                      {/* Mobile: snap-scroll horizontal strip */}
                      <div className="flex md:hidden gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-none">
                        {galleryItems.map((item, idx) => (
                          <Link
                            key={item.id}
                            href={idx === 0 ? '/nambita-cafe' : '#'}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <figure className="relative flex-none w-44 h-32 rounded-xl overflow-hidden snap-start cursor-pointer group">
                              <video
                                src={item.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 flex items-end justify-between">
                                <span className="text-white text-[10px] font-semibold tracking-wide uppercase line-clamp-1">
                                  {item.heading}
                                </span>
                                <ArrowUpRight className="h-3 w-3 text-white shrink-0 ml-1" />
                              </div>
                            </figure>
                          </Link>
                        ))}
                      </div>

                      {/* Desktop: fixed-height grid */}
                      <div className="hidden md:grid grid-cols-3 gap-4 py-4 self-stretch min-h-[220px]">
                        {galleryItems.map((item, idx) => (
                          <Link
                            key={item.id}
                            href={idx === 0 ? '/nambita-cafe' : '#'}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <figure className="relative rounded-xl overflow-hidden w-full h-full min-h-[160px] group cursor-pointer">
                              <video
                                src={item.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 flex items-end justify-between">
                                <span className="text-white text-xs font-semibold leading-tight tracking-wide line-clamp-1 uppercase">
                                  {item.heading}
                                </span>
                                <ArrowUpRight className="h-4 w-4 text-white shrink-0 ml-1" />
                              </div>
                            </figure>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </HeaderDrawer>
          </div>
        </nav>
      </div>
    </header>
  );
}
