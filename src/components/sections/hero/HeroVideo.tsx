'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HeroVariantProps } from './types'

export default function HeroVideo({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage
}: HeroVariantProps) {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 bg-black">
        {backgroundImage && (
          <Image src={backgroundImage} alt="Hero background" fill className="object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/90 font-semibold mb-4 text-lg">{subtitle}</p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              {title}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl"
              >
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
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
