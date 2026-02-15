// Business information
export const BUSINESS_INFO = {
  name: 'Pro Barber Shop ZA',
  tagline: 'Sharp Cuts. Fresh Looks. Professional Service.',
  address: '35 Nyakata St, Lamontville, Chatsworth, 4027, South Africa',
  phone: '+27 68 218 8679',
  whatsapp: '27682188679',
  email: 'goodhopengcobo5@gmail.com',
  instagram: '@pro_barber_shop.za',
  instagramStats: { posts: 42, followers: 217 },
  hours: {
    weekdays: '08:00 - 18:00',
    saturday: '08:00 - 20:00',
    sunday: 'Closed or by special arrangement',
  },
  coordinates: {
    lat: -29.9353649,
    lng: 30.9367593,
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
    id: 'drop-fade-dye',
    name: 'DROP FADE & DYE',
    description: 'Traditional haircut with modern finishing touches',
    duration: 45,
    price: 150,
    image: '/Images/1767772041818.jpeg',
    category: 'Adults',
  },
  {
    id: 'taper-fade-dye',
    name: 'TAPER FADE & DYE',
    description: 'Precision fade with personalized styling',
    duration: 60,
    price: 150,
    image: '/Images/download (3).jpg',
    category: 'Adults',
  },
  {
    id: 'fade-dye',
    name: 'FADE & DYE',
    description: 'Precision fade with personalized styling',
    duration: 60,
    price: 150,
    image: '/Images/Dye cut .jpeg',
    category: 'Adults',
  },
  {
    id: 'kiddies-cut-style',
    name: 'KIDDIES CUT & STYLE',
    description: 'Professional and friendly haircuts for kids',
    duration: 30,
    price: 150,
    image: '/Images/1767771103496.jpeg',
    category: 'Kids',
  },
  {
    id: 'kiddies-fade-dye',
    name: 'KIDDIES FADE & DYE',
    description: 'Modern fade cuts with styling for kids',
    duration: 45,
    price: 150,
    image: '/Images/10 Trendy Men’s Haircuts to Try This Year.jpg',
    category: 'Kids',
  },
  {
    id: 'plain-fade',
    name: 'PLAIN FADE',
    description: 'Classic fade cut with clean finishing',
    duration: 45,
    price: 60,
    image: '/Images/Cut By @501jpressure.jpg',
    category: 'Adults',
  },
  {
    id: 'fade-dye-designs',
    name: 'FADE DYE WITH DESIGNS',
    description: 'Fade with custom designs and artistic touch',
    duration: 45,
    price: 200,
    image: '/Images/download (4) (1).jpg',
    category: 'Design',
  },
]

// Barber profiles
export const BARBERS = [
  {
    id: 1,
    name: 'Fuze Ngcobo',
    title: 'Professional Barber',
    experience: '7+ years',
    specialties: ['Professional Haircuts', 'Modern Fades'],
    bio: 'Fuze is the professional barber at Pro Barber Shop ZA, dedicated to delivering sharp, clean cuts with professional precision. With over 7 years of experience, he specializes in modern fades, traditional cuts, and expert beard sculpting. Every client receives personalized attention and consistent quality service.',
    image: '/Images/Fuze Ngcobo.jpeg',
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
  0: { open: '00:00', close: '00:00' }, // Sunday - closed / by arrangement
  1: { open: '08:00', close: '18:00' }, // Monday
  2: { open: '08:00', close: '18:00' }, // Tuesday
  3: { open: '08:00', close: '18:00' }, // Wednesday
  4: { open: '08:00', close: '18:00' }, // Thursday
  5: { open: '08:00', close: '18:00' }, // Friday
  6: { open: '08:00', close: '20:00' }, // Saturday
}
