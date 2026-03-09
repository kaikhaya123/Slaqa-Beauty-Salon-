'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS_INFO } from '@/lib/constants'
import { Mail, Phone, Instagram, Facebook } from 'lucide-react'

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Send email via your API endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (err) {
      console.error('Error submitting form:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black-900 via-blue-950 to-black-900 flex items-center py-12 px-4 md:px-0">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#FFFF00] rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {/* LEFT SIDE - Image Section */}
          <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-b from-black-900/80 to-black-900 flex items-end justify-center overflow-hidden group">
            {/* Vertical Text - "1 ONLINE 24/7" */}
            <div className="absolute left-0 top-0 h-full flex flex-col items-center justify-center pl-6 pointer-events-none">
              <div className="text-white/30 text-xs font-bold tracking-widest hidden lg:flex" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                1 ONLINE 24/7
              </div>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full">
              <Image
                src="/Images/1771334233701.jpeg"
                alt="Slaqa Barbershop"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-900 via-transparent to-transparent"></div>
            </div>

            {/* Social Icons - Left Side */}
            <div className="absolute left-6 bottom-6 flex flex-col gap-4 z-10">
              <a
                href="https://instagram.com/slaqa_salon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-yellow-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-yellow-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - Contact Form Section */}
          <div className="p-8 md:p-12 flex flex-col justify-between relative">
            {/* Vertical text on right - "ABOUT SLAQA" */}
            <div className="absolute right-6 top-0 h-full hidden lg:flex flex-col items-center justify-center pointer-events-none">
              <div className="text-white/30 text-xs font-bold tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                ABOUT SLAQA
              </div>
            </div>

            {/* Header */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 font-sans">
                Contact Us
              </h2>
              <p className="text-white text-sm mb-8">
                We'd love to hear from you. Get in touch with us today.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-10 pb-8 border-b border-white/10">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Phone</p>
                    <a
                      href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                      className="text-white text-lg font-semibold hover:text-yellow-400 transition-colors"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Email</p>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-white text-lg font-semibold hover:text-yellow-400 transition-colors break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all duration-300 text-sm uppercase font-semibold tracking-wide"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all duration-300 text-sm uppercase font-semibold tracking-wide"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <textarea
                    name="message"
                    placeholder="MESSAGE"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all duration-300 text-sm uppercase font-semibold tracking-wide resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black-900 hover:bg-yellow-400 disabled:bg-white/50 disabled:cursor-not-allowed font-bold py-3.5 px-6 rounded-full transition-all duration-300 text-sm tracking-widest uppercase font-sans transform hover:scale-105 active:scale-95"
                >
                  {isLoading ? 'Sending...' : submitted ? '✓ Message Sent' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Bottom Social Links & Language */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
              <div className="flex gap-6">
                <Link
                  href="https://instagram.com/slaqa_salon"
                  target="_blank"
                  className="text-white/60 hover:text-yellow-400 text-xs uppercase font-semibold tracking-wider transition-colors"
                >
                  Instagram
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="text-white/60 hover:text-yellow-400 text-xs uppercase font-semibold tracking-wider transition-colors"
                >
                  Facebook
                </Link>
              </div>
              <div className="text-white/40 text-xs font-semibold tracking-wider">EN</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
