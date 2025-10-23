'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HeroVariantProps } from './types'

export default function HeroDefault({
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
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image src={backgroundImage} alt="Hero background" fill className="object-cover opacity-20" />
        </div>
      )}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-semibold mb-4 text-lg">{subtitle}</p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg"
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
