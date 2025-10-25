'use client'

import { Star } from 'lucide-react'
import { TestimonialsVariantProps } from './types'

export default function TestimonialsFeatured({ title, subtitle, testimonials }: TestimonialsVariantProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-white/80 font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 smooth-transition hover:bg-white/20 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 transition-colors duration-300 ${
                        i < testimonial.rating ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white/90 mb-6 text-sm italic transition-colors duration-300">{testimonial.content}</p>
                <div>
                  <p className="font-bold text-white transition-colors duration-300">{testimonial.name}</p>
                  <p className="text-sm text-white/70 transition-colors duration-300">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
