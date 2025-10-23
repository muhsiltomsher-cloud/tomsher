'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CTAVariantProps } from './types'

export default function CTAGradient({
  title,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink
}: CTAVariantProps) {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-r from-accent via-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">{title}</h2>
          <p className="text-2xl mb-8 text-white/90">{description}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={ctaLink}
              className="bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
