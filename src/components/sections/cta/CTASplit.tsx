'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CTAVariantProps } from './types'

export default function CTASplit({
  title,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
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
    ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900'
    : 'bg-white text-primary hover:bg-gray-50 border-2 border-primary'

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`${titleClass} text-4xl lg:text-5xl font-bold mb-6`}>{title}</h2>
            <div className={`${descriptionClass} text-xl mb-8`} dangerouslySetInnerHTML={{ __html: description }} />
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className={`${primaryButtonClass} px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg`}
              >
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className={`${secondaryButtonClass} px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg`}
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-64 lg:h-96 bg-gradient-to-br from-primary to-secondary rounded-2xl overflow-hidden"
          >
            {backgroundImage && (
              <Image src={backgroundImage} alt="CTA image" fill className="object-cover" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
