'use client'

import { useState } from 'react'
import { Service, Barber } from '@/lib/types'
import Button from '@/components/ui/Button'
import { format } from 'date-fns'
import Image from 'next/image'
// Custom icon placeholders: put your SVGs in `/public/Icons/` and reference
// them using an <img> tag as shown below.
// Example: <img src="/Icons/user.svg" alt="User" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 object-contain" />

interface BookingFormProps {
  service: Service
  barber: Barber
  date: Date
  time: string
  onSubmit: (formData: any) => void
  onBack: () => void
}

export default function BookingForm({ service, barber, date, time, onSubmit, onBack }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <button onClick={onBack} className="text-gold-600 hover:text-gold-700 mb-3 pointer-events-auto">
          ← Back to date & time
        </button>
        <h2 className="text-2xl font-bold text-black-900 mb-2">
          Your Details
        </h2>
        <p className="text-gray-600">
          Almost there! Just need a few details to confirm your booking.
        </p>
      </div>

      {/* Booking Summary */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-black-900 mb-4">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-semibold">{service.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Barber:</span>
            <span className="font-semibold">{barber.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-semibold">
              {format(date, 'MMM d, yyyy')} at {time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-semibold">{service.duration} minutes</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-primary-200">
            <span className="text-gray-600">Price:</span>
            <span className="font-bold text-accent-600 text-lg">R{service.price}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <Image
              src="/Icons/user.png"
              alt="User"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 object-contain"
              width={20}
              height={20}
              priority
            />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your full name"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Image
              src="/Icons/phone-call.png"
              alt="Phone"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 object-contain"
              width={20}
              height={20}
              priority
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0XX XXX XXXX"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address (Optional)
          </label>
          <div className="relative">
            <Image
              src="/Icons/mail.png"
              alt="Email"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 object-contain"
              width={20}
              height={20}
              priority
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none resize-none"
            placeholder="Any special requests or preferences..."
          />
        </div>

        <div className="pt-4">
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Book Now 
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500">
          By contacting us, you agree to continue the booking via WhatsApp
        </p>
      </form>
    </div>
  )
}
