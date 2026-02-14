'use client'

import { Star, Quote } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { useEffect, useState, useRef } from "react";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
};

function StatCounter({ value, suffix = "", label, decimals = 0 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Observe when the stat enters the viewport
  useEffect(() => {
    if (hasAnimated) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Run the counting animation once visible
  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 1200; // ms
    const increment = value / (duration / 16);
    let raf: number;

    function animate() {
      start += increment;
      if (start < value) {
        setCount(Number(start.toFixed(decimals)));
        raf = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    }

    animate();
    return () => cancelAnimationFrame(raf);
  }, [hasAnimated, value, decimals]);

  const display = typeof decimals === 'number' && decimals > 0 ? count.toFixed(decimals) : String(Math.round(count));

  return (
    <div ref={ref}>
      <div className="text-4xl font-bold text-accent-600 mb-2">
        {display}
        {suffix}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Mandla K.',
      rating: 5,
      text: 'Best barbershop in lamontville! Professional service with seamless online booking. The barber delivers perfect fades every time.',
      location: 'Lamontville',
    },
    {
      name: 'Jason M.',
      rating: 5,
      text: 'Finally, a barbershop that values my time. I book my appointment online, arrive on schedule, and receive immediate service. No more waiting.',
      location: 'Berea',
    },
    {
      name: 'Sibusiso N.',
      rating: 5,
      text: 'Consistently professional service with reliable scheduling. I can book my appointment conveniently and always know exactly when to arrive.',
      location: 'Morningside',
    },
    {
      name: 'Khayalami Zondi',
      rating: 5,
      text: 'Exceptional barbershop with outstanding service. The barber delivers immaculate haircuts with meticulous attention to detail. Highly professional.',
      location: 'Mobeni heights',
    },
  ]

  return (
    <Section background="black">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Trusted by Durban
        </h2>
        <p className="text-lg text-white max-w-2xl mx-auto">
          Reviews from our clients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>

            <Quote className="h-8 w-8 text-accent-200 mb-3" />

            <p className="text-black mb-4 italic">
              &quot;{testimonial.text}&quot;
            </p>

            <div className="pt-4 border-t border-gray-200">
              <p className="font-semibold text-black">{testimonial.name}</p>
              <p className="text-sm text-black">{testimonial.location}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="mt-16 bg-black text-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="col-span-full md:col-span-1 mb-6 md:mb-0">
          <StatCounter value={98} suffix="%" label="Client Satisfaction" />
        </div>
        <div>
          <StatCounter value={1000} suffix="+" label="Monthly Clients" />
        </div>
        <div>
          <StatCounter value={4.9} suffix="★" label="Average Rating" decimals={1} />
        </div>
        <div>
          <StatCounter value={5} suffix="+" label="Years Trusted" />
        </div>
        </div>
      </div>
    </Section>
  )
}
