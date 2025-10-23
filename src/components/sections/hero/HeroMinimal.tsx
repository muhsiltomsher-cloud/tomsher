'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HeroVariantProps } from './types'

export default function HeroMinimal({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  titleTheme = 'dark',
  subtitleTheme = 'dark',
  descriptionTheme = 'dark',
  primaryButtonTheme = 'dark',
  secondaryButtonTheme = 'light'
}: HeroVariantProps) {
  const titleClass = titleTheme === 'light' ? 'text-white' : 'text-gray-900'
  const subtitleClass = subtitleTheme === 'light' ? 'text-white/90' : 'text-primary'
  const descriptionClass = descriptionTheme === 'light' ? 'text-white/80' : 'text-gray-600'
  const primaryButtonClass = primaryButtonTheme === 'dark' 
    ? 'bg-gray-900 text-white hover:bg-gray-800' 
    : 'bg-primary text-white hover:bg-primary/90'
  const secondaryButtonClass = secondaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'text-primary hover:bg-primary/5'

  return (
    <section className="relative py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className={`${subtitleClass} font-semibold mb-4 text-lg`}>
            {subtitle}
          </p>
          <h1 className={`${titleClass} text-5xl lg:text-6xl font-bold mb-6 leading-tight`}>
            {title}
          </h1>
          <div 
            className={`${descriptionClass} text-xl mb-8`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={ctaLink}
              className={`${primaryButtonClass} px-8 py-4 rounded-full font-semibold transition-colors duration-300`}
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className={`${secondaryButtonClass} px-8 py-4 rounded-full font-semibold transition-colors duration-300`}
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
