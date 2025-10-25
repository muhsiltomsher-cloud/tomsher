'use client'

import { Code } from 'lucide-react'
import { ServicesVariantProps } from './types'
import { iconMap } from './iconMap'

export default function ServicesMinimal({ title, subtitle, services }: ServicesVariantProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300">{title}</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code
            return (
              <div
                key={index}
                className="flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-50 smooth-transition animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 smooth-transition hover:scale-110">
                  <Icon className="h-7 w-7 text-primary transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 transition-colors duration-300">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
