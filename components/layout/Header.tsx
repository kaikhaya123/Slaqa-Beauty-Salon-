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
    type: 'video' as const,
  },
  {
    id: 2,
    src: '/Video/3807772878972712461.mp4',
    alt: 'The Slaqa Salon',
    heading: 'The Slaqa Salon',
    type: 'video' as const,
  },
  {
    id: 3,
    src: '/Video/3823637384852700786.mp4',
    alt: 'The Barbershop Show Studios',
    heading: 'The Barbershop Show',
    type: 'video' as const,
  },
];

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Barbers',  href: '/barbers' },
  { label: 'Contact',  href: '/contact' },
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

  const navLinkClass =
    'relative flex items-center gap-2 ' +
    'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full ' +
    'after:origin-bottom-right after:scale-x-0 after:bg-amber-400 ' +
    'after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] ' +
    'hover:after:origin-bottom-left hover:after:scale-x-100 ' +
    'hover:text-amber-400 transition-colors duration-200';

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-[#FFD400] shadow-lg'
          : 'bg-transparent shadow-none'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled || !isHomePage ? 'py-3' : 'py-4'
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
                isScrolled || !isHomePage
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
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide border border-black text-black hover:bg-black hover:text-black transition-all duration-300 hover:scale-105"
            >
              <span>BOOK NOW</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Hamburger drawer */}
            <HeaderDrawer
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              drawerBtn={() => (
                <button
                  aria-label="Open navigation menu"
                  className="text-black hover:text-black transition-colors duration-200 p-1"
                >
                  <MenuIcon className="h-7 w-7" />
                </button>
              )}
            >
              <DrawerContent>
                {/* Mobile drag handle */}
                {!isDesktop && (
                  <div className="flex justify-center w-full pt-3 pb-1">
                    <div className="w-16 h-[0.30rem] shrink-0 rounded-full bg-gray-600" />
                  </div>
                )}

                <div className="flex flex-col h-full min-h-screen container mx-auto gap-4 p-6">
                  {/* Drawer header row */}
                  <div className="flex justify-between items-center border-b border-black pb-4 mb-4">
                    <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3">
                      <Image
                        src="/logo/SLAQA_SALON_LOGO.png"
                        alt="Slaqa Salon"
                        width={40}
                        height={40}
                        className="h-9 w-auto brightness-0"
                      />
                      <span className="text-dark text-2xl font-bold tracking-[0.25em] uppercase">
                        SLAQA SALON
                      </span>
                    </Link>
                    {isDesktop && (
                      <button
                        className="flex items-center justify-center p-2 rounded-md bg-[#FFD400] text-black hover:bg-amber-400 transition-colors duration-200"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close menu"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  {/* Nav + gallery */}
                  <div className="flex justify-between items-stretch xl:px-0 px-2 py-2 flex-1">
                    {/* Navigation links */}
                    <nav className="flex gap-8">
                      <ul className="xl:text-3xl text-2xl space-y-4 xl:space-y-6 font-semibold uppercase pr-8">
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
                        {/* Book Now CTA in drawer */}
                        <li className="pt-2">
                          <Link
                            href="/book"
                            onClick={() => setSidebarOpen(false)}
                            className="inline-flex items-center text-black gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide border border-dark-50 text-black hover:bg-black hover:text-black transition-all duration-300"
                          >
                            BOOK NOW
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </nav>

                    {/* Desktop gallery thumbnails */}
                    {isDesktop && (
                      <div className="grid grid-cols-3 gap-4 py-4 pr-10 w-full self-stretch min-h-[300px]">
                        {galleryItems.map((item) => (
                          <figure
                            key={item.id}
                            className="relative rounded-md overflow-hidden w-full h-full min-h-40 group"
                          >
                            {item.type === 'video' ? (
                              <video
                                src={item.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(min-width: 1280px) 200px, 150px"
                              />
                            )}
                            {/* Bottom-right heading overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 flex items-end justify-between">
                              <span className="text-white text-xs font-semibold leading-tight tracking-wide line-clamp-1 uppercase">
                                {item.heading}
                              </span>
                              <ArrowUpRight className="h-4 w-4 text-white shrink-0 ml-1" />
                            </div>
                          </figure>
                        ))}
                      </div>
                    )}
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
