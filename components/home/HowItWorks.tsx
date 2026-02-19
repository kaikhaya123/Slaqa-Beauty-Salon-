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
        <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black-900 mb-6 leading-tight tracking-wide font-sans">
          HOW IT WORKS
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-sans">
          Book your cut in 3 simple steps — select your service, pick your barber and time, and confirm instantly. No hassle, all convenience.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          return (
            <div
              key={step.title}
              className="relative text-center"
            >
              {/* Step number */}
              <span className="block text-lg font-black text-gold-600 mb-6 tracking-wide font-sans">
                {step.number}
              </span>

              {/* Icon Image */}
              <div className="flex items-center justify-center w-40 h-40 bg-white mx-auto mb-8">
                <Image
                  src={step.iconImage}
                  alt={`${step.title} icon`}
                  width={120}
                  height={120}
                  className="w-30 h-30 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-black-900 mb-4 tracking-wide font-sans">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-black max-w-xs mx-auto leading-relaxed font-sans">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
