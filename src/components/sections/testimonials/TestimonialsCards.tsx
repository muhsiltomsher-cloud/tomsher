'use client'

import { Star, Quote } from 'lucide-react'
import { TestimonialsVariantProps } from './types'

export default function TestimonialsCards({ title, subtitle, testimonials }: TestimonialsVariantProps) {
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
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl smooth-transition hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="h-10 w-10 text-primary/20 mb-4 transition-colors duration-300" />
              <p className="text-gray-700 mb-6 italic transition-colors duration-300">{testimonial.content}</p>
              {renderStars(testimonial.rating)}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="font-bold text-gray-900 transition-colors duration-300">{testimonial.name}</p>
                <p className="text-sm text-gray-600 transition-colors duration-300">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
