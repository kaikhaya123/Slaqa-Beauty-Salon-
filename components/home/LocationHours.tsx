'use client'

import { MapPin, Clock, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import { BUSINESS_INFO } from '@/lib/constants'

export default function LocationHours() {
  const locations = [
    {
      name: 'Umlazi',
      address: '1 Swazi Rd, Umlazi A, Umlazi 4089',
      phone: '+27 65 686 6171',
      hours: {
        weekdays: '08:00 - 20:00',
        friday: '08:00 - 21:00',
        saturday: '08:00 - 21:00',
        sunday: '11:00 - 18:00',
      },
      coordinates: { lat: -30.0195, lng: 31.0067 },
    },
    {
      name: 'KwaMashu',
      address: 'F 206 Bhejane Road, KwaMashu',
      phone: '066 564 1784',
      hours: {
        weekdays: '08:00 - 20:00',
        friday: '08:00 - 21:00',
        saturday: '08:00 - 21:00',
        sunday: '11:00 - 18:00',
      },
      coordinates: { lat: -29.8476, lng: 30.9147 },
    },
    {
      name: 'Waterloo',
      address: '46 Pricklepear Road, Waterloo',
      phone: '+27 65 686 6171',
      hours: {
        weekdays: '08:00 - 20:00',
        friday: '08:00 - 21:00',
        saturday: '08:00 - 21:00',
        sunday: '11:00 - 18:00',
      },
      coordinates: { lat: -29.9087, lng: 30.8819 },
    },
  ]

  return (
    <Section background="white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <motion.h2 
          className="text-3xl font-heading font-bold text-black-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Visit our Locations
        </motion.h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Slaqa operates three convenient locations across Durban. Visit any of our salons for premium beauty, hair, and barbering services.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
          >
            {/* Location Name */}
            <motion.h3 
              className="text-2xl font-bold text-black-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
            >
              {location.name}
            </motion.h3>

            <div className="space-y-5">
              {/* Address */}
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.15 }}
              >
                <MapPin className="h-5 w-5 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-black-900 mb-1">Address</p>
                  <p className="text-gray-600 text-sm">{location.address}</p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <Phone className="h-5 w-5 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-black-900 mb-1">Phone</p>
                  <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-accent-600 hover:text-accent-700 text-sm">
                    {location.phone}
                  </a>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.25 }}
              >
                <Clock className="h-5 w-5 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-black-900 mb-2">Hours</p>
                  <div className="space-y-1 text-gray-600 text-sm">
                    <div className="flex justify-between">
                      <span>Mon-Thu:</span>
                      <span className="font-medium">{location.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fri:</span>
                      <span className="font-medium">{location.hours.friday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sat:</span>
                      <span className="font-medium">{location.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sun:</span>
                      <span className="font-medium">{location.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Google Maps Link */}
            <motion.a
              href={`https://www.google.com/maps/search/${encodeURIComponent(location.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium text-sm mt-6"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Get directions
            </motion.a>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
