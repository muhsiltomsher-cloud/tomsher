'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface CTASectionProps {
  data: {
    title?: string
    description?: string
    ctaText?: string
    ctaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    backgroundImage?: string
    variant?: 'default' | 'gradient' | 'split' | 'minimal'
  }
}

export default function CTASection({ data }: CTASectionProps) {
  const {
    title = 'Ready to Get Started?',
    description = 'Let\'s work together to bring your vision to life',
    ctaText = 'Contact Us',
    ctaLink = '/contact',
    secondaryCtaText,
    secondaryCtaLink,
    backgroundImage,
    variant = 'default'
  } = data

  const variants = {
    default: (
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <Image src={backgroundImage} alt="CTA background" fill className="object-cover opacity-20" />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
            <p className="text-xl mb-8 text-white/90">{description}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={ctaLink}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl"
              >
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    ),
    gradient: (
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
    ),
    split: (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 lg:p-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
              <p className="text-xl text-gray-600 mb-8">{description}</p>
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
                    className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg border-2 border-primary"
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
    ),
    minimal: (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-8">{description}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={ctaLink}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300"
              >
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary/5 transition-colors duration-300"
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

  return variants[variant] || variants.default
}
