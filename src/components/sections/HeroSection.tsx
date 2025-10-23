'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  data: {
    title?: string
    subtitle?: string
    description?: string
    ctaText?: string
    ctaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    backgroundImage?: string
    variant?: 'default' | 'centered' | 'split' | 'minimal' | 'glassmorphism' | 'dark' | 'animated' | 'video'
  }
}

export default function HeroSection({ data }: HeroSectionProps) {
  const {
    title = 'Welcome to Our Website',
    subtitle = 'Building Digital Excellence',
    description = 'We create innovative solutions that transform businesses',
    ctaText = 'Get Started',
    ctaLink = '/contact',
    secondaryCtaText,
    secondaryCtaLink,
    backgroundImage,
    variant = 'default'
  } = data

  const variants = {
    default: (
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
    ),
    centered: (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white">
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <Image src={backgroundImage} alt="Hero background" fill className="object-cover opacity-30" />
          </div>
        )}
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/90 font-semibold mb-4 text-lg">{subtitle}</p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
              {title}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
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
    split: (
      <section className="relative min-h-screen flex items-center bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-semibold mb-4 text-lg">{subtitle}</p>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {description}
              </p>
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
    ),
    minimal: (
      <section className="relative py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-primary font-semibold mb-4 text-lg">{subtitle}</p>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {description}
            </p>
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
    ),
    glassmorphism: (
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <Image src={backgroundImage} alt="Hero background" fill className="object-cover opacity-20" />
          </div>
        )}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: '4rem',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          >
            <p className="text-white/90 font-semibold mb-4 text-lg">{subtitle}</p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              {title}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 shadow-xl"
              >
                {ctaText}
              </Link>
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    ),
    dark: (
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
              <p className="text-primary font-semibold mb-4 text-lg" style={{ color: '#667eea' }}>{subtitle}</p>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={ctaLink}
                  className="px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  {ctaText}
                </Link>
                {secondaryCtaText && secondaryCtaLink && (
                  <Link
                    href={secondaryCtaLink}
                    className="bg-gray-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 border border-gray-700"
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    ),
    animated: (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              className="absolute w-96 h-96 rounded-full"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', opacity: 0.1 }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute right-0 bottom-0 w-96 h-96 rounded-full"
              style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', opacity: 0.1 }}
              animate={{
                x: [0, -100, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-primary font-semibold mb-4 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {description}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href={ctaLink}
                  className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {ctaText}
                </Link>
                {secondaryCtaText && secondaryCtaLink && (
                  <Link
                    href={secondaryCtaLink}
                    className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg border-2 border-primary hover:scale-105"
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    ),
    video: (
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

  return variants[variant] || variants.default
}
