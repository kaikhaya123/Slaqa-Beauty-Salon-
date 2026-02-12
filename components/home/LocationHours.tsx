import { MapPin, Clock, Phone } from 'lucide-react'
import Section from '@/components/ui/Section'
import { BUSINESS_INFO } from '@/lib/constants'

export default function LocationHours() {
  return (
    <Section background="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Location & Hours */}
        <div>
          <h2 className="text-3xl font-heading font-bold text-dark-900 mb-6">
            Visit Us
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-1">Location</h3>
                <p className="text-gray-600">{BUSINESS_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Opening Hours</h3>
                <div className="space-y-1 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">{BUSINESS_INFO.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">{BUSINESS_INFO.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">{BUSINESS_INFO.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-1">Contact</h3>
                <p className="text-gray-600">
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-accent-600">
                    {BUSINESS_INFO.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div>
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg">
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
          </div>
          
          {/* View Larger Map Link */}
          <div className="mt-4 text-center">
            <a
              href="https://www.google.com/maps/place/35+Nyakata+St,+Lamontville,+Chatsworth,+4027,+South+Africa/@-29.9353602,30.9341844,17z/data=!3m1!4b1!4m6!3m5!1s0x1ef7ab79edf9ca5b:0x6532d3deafb8c6a9!8m2!3d-29.9353649!4d30.9367593!16s%2Fg%2F11c2cnwhwn?hl=en-ZA&entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium"
            >
              <MapPin className="h-4 w-4 mr-1" />
              View larger map
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
