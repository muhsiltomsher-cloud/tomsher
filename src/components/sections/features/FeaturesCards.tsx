'use client'

import { Check } from 'lucide-react'
import { FeaturesVariantProps } from './types'
import { iconMap } from './iconMap'

export default function FeaturesCards({ title, subtitle, features }: FeaturesVariantProps) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Check
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl smooth-transition hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-xl flex items-center justify-center mb-6 smooth-transition hover:scale-110">
                  <Icon className="h-8 w-8 text-white transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 transition-colors duration-300">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
