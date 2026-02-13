export interface Service {
  id: string
  name: string
  description?: string
  price?: number | null
  duration?: number
  category?: string    // added
  image?: string       // added (url/path to image)
}

export interface Barber {
  id: number
  name: string
  title: string
  experience: string
  specialties: string[]
  bio: string
  image: string
}

export interface TimeSlot {
  time: string
  available: boolean
  barberId?: string
}

export interface Booking {
  id: string
  clientName: string
  clientPhone: string
  clientEmail?: string
  serviceId: string
  barberId: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export interface QueueEntry {
  id: string
  clientName: string
  clientPhone: string
  joinedAt: string
  estimatedWait: number // in minutes
  position: number
  status: 'waiting' | 'called' | 'served' | 'left'
  preferredBarberId?: string
}

export interface OperatingHours {
  [key: number]: {
    open: string
    close: string
  }
}
