import { SERVICES } from '@/lib/constants'
import { Service } from '@/lib/types'
import Card from '@/components/ui/Card'
import { Clock, DollarSign } from 'lucide-react'

interface ServiceSelectorProps {
  onSelect: (service: Service) => void
}

export default function ServiceSelector({ onSelect }: ServiceSelectorProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black-900 mb-6">
        Select Your Service
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map((service) => (
          <Card
            key={service.id}
            className="cursor-pointer transition-all hover:border-2 hover:border-gold-600"
            hover
          >
            <button
              onClick={() => onSelect(service)}
              className="w-full text-left pointer-events-auto"
            >
              <h3 className="text-xl font-bold text-black-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {service.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center space-x-1 text-lg font-bold text-gold-600">
                  <span>R{service.price}</span>
                </div>
              </div>
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
