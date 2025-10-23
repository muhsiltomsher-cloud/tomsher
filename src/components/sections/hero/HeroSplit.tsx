'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HeroVariantProps } from './types'

export default function HeroSplit({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
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
    : 'bg-white text-primary hover:bg-gray-100'
  const secondaryButtonClass = secondaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'

  return (
    <section className="relative min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
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
                  className={`${secondaryButtonClass} px-8 py-4 rounded-full font-semibold transition-colors duration-300`}
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 lg:h-[600px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden"
          >
            {backgroundImage && (
              <Image src={backgroundImage} alt="Hero image" fill className="object-cover" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
