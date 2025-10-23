'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CTAVariantProps } from './types'

export default function CTAMinimal({
  title,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  titleTheme = 'dark',
  descriptionTheme = 'dark',
  primaryButtonTheme = 'dark',
  secondaryButtonTheme = 'light'
}: CTAVariantProps) {
  const titleClass = titleTheme === 'light' ? 'text-white' : 'text-gray-900'
  const descriptionClass = descriptionTheme === 'light' ? 'text-white/90' : 'text-gray-600'
  const primaryButtonClass = primaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'bg-primary text-white hover:bg-primary/90'
  const secondaryButtonClass = secondaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'text-primary hover:bg-primary/5'

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className={`${titleClass} text-3xl lg:text-4xl font-bold mb-4`}>{title}</h2>
          <div className={`${descriptionClass} text-lg mb-8`} dangerouslySetInnerHTML={{ __html: description }} />
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={ctaLink}
              className={`${primaryButtonClass} px-8 py-3 rounded-full font-semibold transition-colors duration-300`}
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className={`${secondaryButtonClass} px-8 py-3 rounded-full font-semibold transition-colors duration-300`}
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
