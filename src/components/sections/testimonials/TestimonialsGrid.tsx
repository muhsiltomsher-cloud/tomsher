'use client'

import { Star, Quote } from 'lucide-react'
import { TestimonialsVariantProps } from './types'

export default function TestimonialsGrid({ title, subtitle, testimonials }: TestimonialsVariantProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 transition-colors duration-300 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 smooth-transition hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 smooth-transition hover:scale-110">
                  <Quote className="h-6 w-6 text-primary transition-transform duration-300" />
                </div>
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-6 text-lg transition-colors duration-300">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-full flex items-center justify-center text-white font-bold smooth-transition hover:scale-110">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 transition-colors duration-300">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 transition-colors duration-300">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
