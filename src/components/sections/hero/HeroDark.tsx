'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HeroVariantProps } from './types'

export default function HeroDark({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  titleTheme = 'light',
  subtitleTheme = 'light',
  descriptionTheme = 'light',
  primaryButtonTheme = 'light',
  secondaryButtonTheme = 'dark'
}: HeroVariantProps) {
  const titleClass = titleTheme === 'light' ? 'text-white' : 'text-gray-900'
  const subtitleClass = subtitleTheme === 'light' ? 'text-white/90' : 'text-primary'
  const descriptionClass = descriptionTheme === 'light' ? 'text-gray-300' : 'text-gray-600'
  const primaryButtonClass = primaryButtonTheme === 'dark' 
    ? 'bg-gray-900 text-white hover:bg-gray-800' 
    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
  const secondaryButtonClass = secondaryButtonTheme === 'dark'
    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
    : 'bg-white text-gray-900 hover:bg-gray-100'

  return (
    <section className="relative min-h-screen flex items-center bg-gray-900 text-white">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image src={backgroundImage} alt="Hero background" fill className="object-cover opacity-10" />
        </div>
      )}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className={`${subtitleClass} font-semibold mb-4 text-lg`}>
              {subtitle}
            </p>
            <h1 className={`${titleClass} text-5xl lg:text-7xl font-bold mb-6 leading-tight`}>
              {title}
            </h1>
            <div 
              className={`${descriptionClass} text-xl mb-8 max-w-2xl`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className={`${primaryButtonClass} px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl`}
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
      </div>
    </section>
  )
}
