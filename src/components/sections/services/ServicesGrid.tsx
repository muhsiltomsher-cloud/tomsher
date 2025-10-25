'use client'

import { Code } from 'lucide-react'
import { ServicesVariantProps } from './types'
import { iconMap } from './iconMap'

export default function ServicesGrid({ title, subtitle, services }: ServicesVariantProps) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl smooth-transition hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 smooth-transition hover:scale-110">
                  <Icon className="h-8 w-8 text-primary transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 transition-colors duration-300">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
