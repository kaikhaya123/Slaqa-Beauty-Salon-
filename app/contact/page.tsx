'use client'

import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS_INFO } from '@/lib/constants'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import ContactFormSection from '@/components/contact/ContactFormSection'

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Do I need an appointment?',
      answer:
        'No. We welcome both appointments and walk-ins. Book online for guaranteed time slots or join our digital queue when you arrive.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept cash, card, and digital payments including SnapScan and Zapper. Payment is taken after your service.',
    },
    {
      question: 'Can I request a specific barber?',
      answer:
        'Yes. When booking online or joining the queue, you can select your preferred barber. This may affect wait times.',
    },
    {
      question: 'Is parking available?',
      answer:
        'Yes. Street parking is available nearby. Please check local parking regulations and time limits.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      {/* Hero */}
      <Section background="black" padding="lg">
        <div className="max-w-6xl mx-auto text-center">
          <Image
            src="/logo/ChatGPT_Image_Mar_8__2026__07_49_05_PM-removebg-preview.png"
            alt="SLaqa Salon"
            width={200}
            height={80}
            className="mx-auto h-16 md:h-20 w-auto mb-8"
          />

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-wide">
            GET IN TOUCH WITH SLAQA
          </h1>

          <p className="text-base md:text-lg text-white max-w-3xl mx-auto mb-12">
            Do you have questions or want to book an appointment?
            <br />
            Please contact us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button className="bg-black hover:bg-black text-black px-8 py-3 text-base rounded-full">
                BOOK APPOINTMENT
              </Button>
            </Link>

            <Link href="/services">
              <Button className="bg-[#FFFF00] text-black-900 px-8 py-3 text-base rounded-full">
                VIEW SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Contact Form Section */}
      <ContactFormSection />

      {/* Opening Hours */}
      <Section background="black" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            OPENING HOURS
          </h2>

          <div className="bg-[#FFFF00] rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-black-900 mb-1">Mon - Fri</h3>
              <p className="text-xl font-bold text-black-900">
                {BUSINESS_INFO.hours.weekdays}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black-900 mb-1">Saturday</h3>
              <p className="text-xl font-bold text-black-900">
                {BUSINESS_INFO.hours.saturday}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black-900 mb-1">Sunday</h3>
              <p className="text-xl font-bold text-black-900">
                {BUSINESS_INFO.hours.sunday}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Accordion */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-black-900 mb-12 text-center">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white bg-black-900 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left"
                  >
                    <span className="text-lg font-semibold text-black">
                      {faq.question}
                    </span>

                    <span className="text-white">
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden px-6 pb-5 text-black">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>
    </>
  )
}
