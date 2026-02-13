'use client';

import { useState } from 'react';
import BookingConfirmation from './BookingConfirmation';
import { buildWhatsAppLink, buildBookingMessage } from '@/lib/whatsapp';
import { BUSINESS_INFO } from '@/lib/constants';

interface ConfirmationData {
  bookingId: string;
  queueNumber: string;
  service: string;
  name: string;
}

export default function BookingForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    email: '',
    requests: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSuccess = (data: ConfirmationData) => {
    setConfirmationData(data);
    setShowConfirmation(true);

    // Redirect after 7 seconds to home page
    setTimeout(() => {
      window.location.href = '/';
    }, 7000);
  };

  const handleWhatsAppContact = () => {
    console.log('WhatsApp button clicked');
    
    // Show the loading animation
    const bookingData: ConfirmationData = {
      bookingId: `BK${Date.now() % 10000}`,
      queueNumber: 'Pending',
      service: formData.service || 'Barbershop Service',
      name: formData.name || 'Guest',
    };
    
    handleBookingSuccess(bookingData);
    
    // Open WhatsApp after a short delay to show animation
    setTimeout(() => {
      const whatsappUrl = buildWhatsAppLink(
        BUSINESS_INFO.whatsapp,
        buildBookingMessage({
          serviceName: formData.service || 'Barbershop Service',
          name: formData.name || 'Customer',
          dateTime: formData.date && formData.time ? `${formData.date} ${formData.time}` : '',
        })
      );
      window.open(whatsappUrl, '_blank');
    }, 500);
  };

  return (
    <>
      {showConfirmation && confirmationData && (
        <BookingConfirmation
          bookingId={confirmationData.bookingId}
          queueNumber={confirmationData.queueNumber}
          serviceName={confirmationData.service}
          customerName={confirmationData.name}
        />
      )}

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Book Your Appointment</h1>

        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="27..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Service Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select a service</option>
              <option value="Haircut">Haircut</option>
              <option value="Beard Trim">Beard Trim</option>
              <option value="Full Grooming">Full Grooming</option>
              <option value="Kids Cut">Kids Cut</option>
            </select>
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Time Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Special Requests Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              name="requests"
              value={formData.requests}
              onChange={handleInputChange}
              placeholder="Any special requests or preferences..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
              rows={4}
            />
          </div>

          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsAppContact}
            className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Contact via WhatsApp
          </button>

          {/* Terms */}
          <p className="text-sm text-gray-500 text-center">
            By contacting us, you agree to continue the booking via WhatsApp
          </p>
        </form>
      </div>
    </>
  );
}
