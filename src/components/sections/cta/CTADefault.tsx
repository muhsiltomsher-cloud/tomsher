'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CTAVariantProps } from './types'

export default function CTADefault({
  title,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  titleTheme = 'light',
  descriptionTheme = 'light',
  primaryButtonTheme = 'light',
  secondaryButtonTheme = 'light'
}: CTAVariantProps) {
  const titleClass = titleTheme === 'light' ? 'text-white' : 'text-gray-900'
  const descriptionClass = descriptionTheme === 'light' ? 'text-white/90' : 'text-gray-600'
  const primaryButtonClass = primaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'bg-white text-primary hover:bg-gray-100'
  const secondaryButtonClass = secondaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900'
    : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary'

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 z-0 transition-opacity duration-700">
          <Image src={backgroundImage} alt="CTA background" fill className="object-cover opacity-20" />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto animate-slide-in">
          <h2 className={`${titleClass} text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300`}>
            {title}
          </h2>
          <div 
            className={`${descriptionClass} text-xl mb-8 transition-colors duration-300`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={ctaLink}
              className={`${primaryButtonClass} px-8 py-4 rounded-full font-semibold shadow-xl smooth-transition hover:-translate-y-1 active:translate-y-0 inline-block`}
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className={`${secondaryButtonClass} px-8 py-4 rounded-full font-semibold smooth-transition hover:-translate-y-1 active:translate-y-0 inline-block`}
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
