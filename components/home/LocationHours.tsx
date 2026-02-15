'use client'

import { MapPin, Clock, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import { BUSINESS_INFO } from '@/lib/constants'

export default function LocationHours() {
  return (
    <Section background="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Location & Hours */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-heading font-bold text-dark-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Visit Us
          </motion.h2>

          <div className="space-y-6">
            {/* Location */}
            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ x: 10 }}
            >
              <motion.div 
                className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <MapPin className="h-6 w-6 text-accent-600" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-1">Location</h3>
                <p className="text-gray-600">{BUSINESS_INFO.address}</p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ x: 10 }}
            >
              <motion.div 
                className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: -5 }}
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Clock className="h-6 w-6 text-accent-600" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Opening Hours</h3>
                <div className="space-y-1 text-gray-600">
                  <motion.div 
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.32 }}
                  >
                    <span>Monday - Friday:</span>
                    <span className="font-medium">{BUSINESS_INFO.hours.weekdays}</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.38 }}
                  >
                    <span>Saturday:</span>
                    <span className="font-medium">{BUSINESS_INFO.hours.saturday}</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.44 }}
                  >
                    <span>Sunday:</span>
                    <span className="font-medium">{BUSINESS_INFO.hours.sunday}</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ x: 10 }}
            >
              <motion.div 
                className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <Phone className="h-6 w-6 text-accent-600" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-1">Contact</h3>
                <p className="text-gray-600">
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-accent-600">
                    {BUSINESS_INFO.phone}
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.6!2d${BUSINESS_INFO.coordinates.lng}!3d${BUSINESS_INFO.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zKPCfj60g${encodeURIComponent('Pro Barber Shop ZA')}!5e0!3m2!1sen!2sza!4v1234567890&q=${encodeURIComponent(BUSINESS_INFO.address)}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pro Barber Shop ZA Location"
            />
          </motion.div>
          
          {/* View Larger Map Link */}
          <motion.div 
            className="mt-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a
              href="https://www.google.com/maps/place/35+Nyakata+St,+Lamontville,+Chatsworth,+4027,+South+Africa/@-29.9353602,30.9341844,17z/data=!3m1!4b1!4m6!3m5!1s0x1ef7ab79edf9ca5b:0x6532d3deafb8c6a9!8m2!3d-29.9353649!4d30.9367593!16s%2Fg%2F11c2cnwhwn?hl=en-ZA&entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="h-4 w-4 mr-1" />
              View larger map
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
