'use client'

import { Check } from 'lucide-react'
import { FeaturesVariantProps } from './types'
import { iconMap } from './iconMap'

export default function FeaturesHighlight({ title, subtitle, features }: FeaturesVariantProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Check
            const isHighlighted = index === 0 || index === 3
            return (
              <div
                key={index}
                className={`p-8 rounded-2xl ${
                  isHighlighted
                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-2xl'
                    : 'bg-white shadow-lg'
                } smooth-transition hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 smooth-transition hover:scale-110 ${
                  isHighlighted ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                  <Icon className={`h-7 w-7 transition-transform duration-300 ${isHighlighted ? 'text-white' : 'text-primary'}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 transition-colors duration-300">{feature.title}</h3>
                <p className={`transition-colors duration-300 ${isHighlighted ? 'text-white/90' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
