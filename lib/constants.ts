// Business information
export const BUSINESS_INFO = {
  name: 'Slaqa',
  tagline: 'Beauty, Hair & Lifestyle Brand',
  address: '1 Swazi Rd, Umlazi A, Umlazi 4089, South Africa',
  phone: '+27 65 686 6171',
  whatsapp: '27656866171',
  email: 'contact@slaqa.co.za',
  instagram: '@slaqa_salon',
  instagramStats: { posts: 150, followers: 61400 },
  hours: {
    weekdays: '08:00 - 20:00',
    friday: '08:00 - 21:00',
    saturday: '08:00 - 21:00',
    sunday: '11:00 - 18:00',
  },
  coordinates: {
    lat: -30.0195,
    lng: 31.0067,
  },
} 

/**
 * Get the base URL for the application
 * Checks environment variables for deployment URL first, then fallbacks
 */
export function getBaseUrl(): string {
  // Development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  
  // Production - use environment variable if set
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  
  // Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  // Fallback to production domain
  return 'https://realbarbershop.co.za'
}

// Services offered
export const SERVICES = [
  {
    id: 'haircut-fade',
    name: 'Brush Cut ',
    description: 'Professional haircuts with modern fades and clean lines',
    duration: 60,
    price: 170,
    image: '/Images/1771342499612.jpeg',
    category: 'Barbering',
  },
  {
    id: 'Taper Fade',
    name: 'Taper',
    description: 'Expert beard sculpting and professional grooming',
    duration: 45,
    price: 170,
    image: '/Images/slaqa_salon_1771564240227.jpeg',
    category: 'Barbering',
  },
  {
    id: 'Chiskop',
    name: 'Chiskop',
    description: 'Traditional wet shave with hot towel treatment',
    duration: 45,
    price: 50,
    image: '/Images/slaqa_salon_1771565063204.jpeg',
    category: 'Barbering',
  },
  {
    id: 'High Top',
    name: 'High Top',
    description: 'Expert hair styling for events, occasions and everyday looks',
    duration: 60,
    price: 180,
    image: '/Images/slaqa_salon_1771343348133.jpeg',
    category: 'Barbering',
  },
  {
    id: 'Ladies Cut ',
    name: 'Ladies Cut',
    description: 'Complete beauty and grooming services for men and women',
    duration: 45,
    price: 170,
    image: '/Images/slaqa_salon_1771565081482.jpeg',
    category: 'Beauty',
  },
  {
    id: 'Trimming',
    name: 'TRIMMING',
    description: 'Clean, professional head shave with precision finish',
    duration: 40,
    price: 20,
    image: '/Images/william-argueta-1Wxm71sR51s-unsplash.jpg',
    category: 'Barbering',
  },
  {
    id: 'Ladies short-hair-color',
    name: 'Ladies Short Hair & Color',
    description: 'Custom haircut with artistic designs and creative styling',
    duration: 60,
    price: 250,
    image: '/Images/slaqa_salon_1771575680494.jpeg',
    category: 'Design',
  },
]

// Full pricing menu (Standard = base, Black = with black dye, Colour = with colour)
export type PriceEntry = { name: string; standard: number; black?: number; colour?: number }
export type PriceCategory = { label: string; items: PriceEntry[] }

export const PRICE_LIST: PriceCategory[] = [
  {
    label: 'Men',
    items: [
      { name: 'Chiskop',    standard: 50 },
      { name: 'Plain Brush', standard: 50,  black: 140, colour: 250 },
      { name: 'Brush Cut',  standard: 80,  black: 170, colour: 250 },
      { name: 'High Top',   standard: 80,  black: 170, colour: 250 },
      { name: 'Taper',      standard: 80,  black: 170, colour: 250 },
      { name: 'Mohawk',     standard: 80,  black: 170, colour: 250 },
      { name: 'Makhado',    standard: 80,  black: 170, colour: 250 },
      { name: 'Curls',      standard: 80,  black: 170, colour: 250 },
      { name: 'Shaving',    standard: 20 },
      { name: 'Trimming',   standard: 20 },
    ],
  },
  {
    label: 'Women',
    items: [
      { name: 'Short Hair',  standard: 40,  black: 140, colour: 250 },
      { name: 'Hair Wash',   standard: 60 },
      { name: 'Ladies Cut',  standard: 80,  black: 170, colour: 250 },
      { name: 'S-Curl',      standard: 150, black: 250, colour: 250 },
      { name: 'Twizzing',    standard: 20 },
    ],
  },
  {
    label: 'Kids',
    items: [
      { name: 'Chiskop',  standard: 40 },
      { name: 'Brush',    standard: 40, black: 120, colour: 200 },
      { name: 'Fade Cut', standard: 60, black: 150, colour: 200 },
    ],
  },
]

// Barber profiles
export const BARBERS = [
  {
    id: 1,
    name: 'Slaqa Team',
    title: 'Beauty & Barber Professionals',
    experience: '5+ years',
    specialties: ['Barbering', 'Hair Styling', 'Beauty Services', 'Hot Towel Shaves'],
    bio: 'The Slaqa team consists of experienced beauty and barber professionals dedicated to delivering premium services across all three locations. With expertise in modern fades, traditional haircuts, beard sculpting, hair styling for events, and complete grooming services, we ensure every client receives personalized attention and professional excellence.',
    image: '/Images/1767772041818.jpeg',
  },
]

// Booking time slots (in 24-hour format)
export const TIME_SLOTS = [
  '08:00','08:30','09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00','18:30','19:00','19:30','20:00'
]

// Maximum bookings per time slot (25 slots × 40 bookings = 1000 total per day)
export const MAX_BOOKINGS_PER_SLOT = 40

// Operating hours by day
export const OPERATING_HOURS = {
  0: { open: '11:00', close: '18:00' }, // Sunday
  1: { open: '08:00', close: '20:00' }, // Monday
  2: { open: '08:00', close: '20:00' }, // Tuesday
  3: { open: '08:00', close: '20:00' }, // Wednesday
  4: { open: '08:00', close: '20:00' }, // Thursday
  5: { open: '08:00', close: '21:00' }, // Friday
  6: { open: '08:00', close: '21:00' }, // Saturday
}
