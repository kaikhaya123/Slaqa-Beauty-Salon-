"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Section from "@/components/ui/Section"

const steps = [
  {
    number: "01",
    iconImage: "/Icons/geometric.png",
    title: "Pick Your Service",
    description: "Browse our services and select the one you need — from classic cuts to premium trims.",
  },
  {
    number: "02",
    iconImage: "/Icons/appointment.png",
    title: "Choose Barber & Time",
    description: "Select your preferred barber and pick an available date and time that works for you.",
  },
  {
    number: "03",
    iconImage: "/Icons/booking-online.png",
    title: "Confirm Booking",
    description: "Enter your details and confirm — your appointment is instantly locked in.",
  },
]

export default function HowItWorks() {
  return (
    <Section background="white">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <motion.h2 
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-dark-900 mb-6 leading-tight tracking-wide font-sans"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          HOW IT WORKS
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-dark-600 leading-relaxed font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Book your cut in 3 simple steps — select your service, pick your barber and time, and confirm instantly. No hassle, all convenience.
        </motion.p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              {/* Step number with animation */}
              <motion.span 
                className="block text-lg font-black text-accent-600 mb-6 tracking-wide font-sans"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
              >
                {step.number}
              </motion.span>

              {/* Icon Image with rotation */}
              <motion.div 
                className="flex items-center justify-center w-40 h-40 bg-white mx-auto mb-8"
                initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.15 + 0.3 }}
                >
                  <Image
                    src={step.iconImage}
                    alt={`${step.title} icon`}
                    width={120}
                    height={120}
                    className="w-30 h-30 object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Title with fade-in */}
              <motion.h3 
                className="text-2xl font-black text-dark-900 mb-4 tracking-wide font-sans"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              >
                {step.title}
              </motion.h3>

              {/* Description with fade-in */}
              <motion.p 
                className="text-black max-w-xs mx-auto leading-relaxed font-sans"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
