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
  titleColor,
  subtitleColor,
  descriptionColor
}: HeroVariantProps) {
  return (
    <section className="relative py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
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
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={ctaLink}
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary/5 transition-colors duration-300"
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
