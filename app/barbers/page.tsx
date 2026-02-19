import Hero from "../../components/barbers/Hero";
import BarberCard from "../../components/barbers/BarberCard";
import { BARBERS } from "../../lib/constants";

export default function BarbersPage() {
  return (
    <main>
      <Hero />

      <section id="barbers" className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12">
          <h2 className="col-span-1 text-4xl md:text-5xl font-black tracking-tight text-black-900">OUR TEAM</h2>
          <p className="col-span-2 text-gray-600 text-sm md:text-base leading-relaxed">The Slaqa team consists of experienced beauty and barber professionals dedicated to delivering premium services across all three locations. With expertise in modern fades, traditional haircuts, beard sculpting, hot towel shaves, hair styling, and complete beauty and grooming services, we ensure every client receives personalized attention and professional excellence.</p>
        </div>

        <div className="mt-8 space-y-8">
          {BARBERS.map((b: any) => (
            <BarberCard key={b.id} barber={b} />
          ))}
        </div>
      </section>
    </main>
  );
}
