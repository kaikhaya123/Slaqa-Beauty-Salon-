'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

interface MenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: 'left' | 'right';
  items?: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  logoUrl?: string;
  accentColor?: string;
  backgroundImageUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  isFixed?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export default function StaggeredMenu({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  logoUrl = '/logo/logo_2.png',
  accentColor = '#ff6b6b',
  backgroundImageUrl = '/Images/pexels-rdne-7697717.jpg',
  menuButtonColor = '#000',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = false,
  colors = [],
  isFixed = false,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  // Hydration fix: Wait for client-side mount before rendering menu
  React.useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!panelRef.current || !mounted) return;

    gsap.set(panelRef.current, {
      xPercent: position === 'left' ? -100 : 100,
    });
  }, [position, mounted]);

  const toggleMenu = useCallback(() => {
    if (!panelRef.current) return;

    const offscreen = position === 'left' ? -100 : 100;

    gsap.to(panelRef.current, {
      xPercent: open ? offscreen : 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    setOpen(prev => {
      const newState = !prev;
      if (newState && onMenuOpen) {
        onMenuOpen();
      } else if (!newState && onMenuClose) {
        onMenuClose();
      }
      return newState;
    });
  }, [open, position, onMenuOpen, onMenuClose]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-5 right-6 z-50 flex items-center justify-center w-12 h-12 font-semibold rounded-lg transition-colors duration-300"
        style={{ 
          color: changeMenuColorOnOpen && open ? openMenuButtonColor : menuButtonColor,
          position: isFixed ? 'fixed' : 'absolute',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 200ms ease-out',
        }}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 transition-transform duration-300"
          style={{
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </>
          )}
        </svg>
      </button>

      {/* Menu Panel */}
      {mounted && (
      <aside
        ref={panelRef}
        className="fixed top-0 right-0 w-full h-screen z-40 overflow-hidden"
        style={{ ['--accent' as any]: accentColor }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImageUrl}
            alt="Barber cutting hair"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col text-white">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link href="/" onClick={toggleMenu}>
              <Image
                src={logoUrl}
                alt="Logo"
                width={120}
                height={28}
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-10">
            <ul className="flex flex-col gap-6">
              {items.map((item, idx) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    onClick={toggleMenu}
                    className="text-3xl font-bold tracking-tight hover:text-[var(--accent)] transition-colors"
                  >
                    {item.label}
                    {displayItemNumbering && (
                      <span className="ml-3 text-sm text-[var(--accent)]">
                        0{idx + 1}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          {displaySocials && socialItems.length > 0 && (
            <div className="px-6 pb-8 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
                Follow us
              </p>
              <ul className="flex flex-col gap-3">
                {socialItems.map(s => (
                  <li key={s.label}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {s.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      </aside>
    </>
  );
}
