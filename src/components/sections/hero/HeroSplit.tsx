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
  titleColor,
  subtitleColor,
  descriptionColor
}: HeroVariantProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-semibold mb-4 text-lg" style={subtitleColor ? { color: subtitleColor } : undefined}>
              {subtitle}
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={titleColor ? { color: titleColor } : undefined}>
              {title}
            </h1>
            <div 
              className="text-xl text-gray-600 mb-8"
              style={descriptionColor ? { color: descriptionColor } : undefined}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg"
              >
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300"
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
