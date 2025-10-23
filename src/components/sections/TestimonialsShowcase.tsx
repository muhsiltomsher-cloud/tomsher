'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useState } from 'react'

interface TestimonialsShowcaseProps {
  data: {
    title?: string
    subtitle?: string
    testimonials?: Array<{
      name: string
      role: string
      company: string
      content: string
      rating: number
      image?: string
    }>
    variant?: 'cards' | 'carousel' | 'grid' | 'featured'
  }
}

export default function TestimonialsShowcase({ data }: TestimonialsShowcaseProps) {
  const {
    title = 'What Our Clients Say',
    subtitle = 'Testimonials',
    testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'CEO',
        company: 'Tech Innovations',
        content: 'Working with this team has been an absolute pleasure. They delivered beyond our expectations.',
        rating: 5
      },
      {
        name: 'Michael Chen',
        role: 'CTO',
        company: 'Digital Solutions',
        content: 'Professional, efficient, and highly skilled. Our project was completed on time and exceeded quality standards.',
        rating: 5
      },
      {
        name: 'Emily Rodriguez',
        role: 'Marketing Director',
        company: 'Growth Agency',
        content: 'The attention to detail and commitment to excellence is remarkable. Highly recommended!',
        rating: 5
      }
    ],
    variant = 'cards'
  } = data

  const [activeIndex, setActiveIndex] = useState(0)

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const variants = {
    cards: (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                <p className="text-gray-700 mb-6 italic">{testimonial.content}</p>
                {renderStars(testimonial.rating)}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),
    carousel: (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <Quote className="h-16 w-16 text-primary/20 mb-6" />
              <p className="text-xl lg:text-2xl text-gray-700 mb-8 italic">
                {testimonials[activeIndex].content}
              </p>
              {renderStars(testimonials[activeIndex].rating)}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="font-bold text-xl text-gray-900">
                  {testimonials[activeIndex].name}
                </p>
                <p className="text-gray-600">
                  {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-primary' : 'w-3 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
    grid: (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 text-lg">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-primary to-secondary w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),
    featured: (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-white/80 font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-white/90 mb-6 text-sm italic">{testimonial.content}</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return variants[variant] || variants.cards
}
