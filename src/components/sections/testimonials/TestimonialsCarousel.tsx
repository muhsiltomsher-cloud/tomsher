'use client'

import { Star, Quote } from 'lucide-react'
import { useState } from 'react'
import { TestimonialsVariantProps } from './types'

export default function TestimonialsCarousel({ title, subtitle, testimonials }: TestimonialsVariantProps) {
  const [activeIndex, setActiveIndex] = useState(0)

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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 smooth-transition hover:shadow-3xl animate-fade-in">
            <Quote className="h-16 w-16 text-primary/20 mb-6 transition-colors duration-300" />
            <p className="text-xl lg:text-2xl text-gray-700 mb-8 italic transition-colors duration-300">
              {testimonials[activeIndex].content}
            </p>
            {renderStars(testimonials[activeIndex].rating)}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="font-bold text-xl text-gray-900 transition-colors duration-300">
                {testimonials[activeIndex].name}
              </p>
              <p className="text-gray-600 transition-colors duration-300">
                {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full smooth-transition hover:scale-110 active:scale-95 ${
                  index === activeIndex ? 'w-8 bg-primary' : 'w-3 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
