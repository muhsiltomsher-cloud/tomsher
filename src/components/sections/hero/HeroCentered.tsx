'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HeroVariantProps } from './types'

export default function HeroCentered({
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
  secondaryButtonTheme = 'light'
}: HeroVariantProps) {
  const titleClass = titleTheme === 'light' ? 'text-white' : 'text-gray-900'
  const subtitleClass = subtitleTheme === 'light' ? 'text-white/90' : 'text-primary'
  const descriptionClass = descriptionTheme === 'light' ? 'text-white/80' : 'text-gray-600'
  const primaryButtonClass = primaryButtonTheme === 'dark' 
    ? 'bg-gray-900 text-white hover:bg-gray-800' 
    : 'bg-white text-primary hover:bg-gray-100'
  const secondaryButtonClass = secondaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900'
    : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary'

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white">
      {backgroundImage && (
        <div className="absolute inset-0 z-0 transition-opacity duration-700">
          <Image src={backgroundImage} alt="Hero background" fill className="object-cover opacity-30" />
        </div>
      )}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="animate-scale-in">
          <p className={`${subtitleClass} font-semibold mb-4 text-lg transition-colors duration-300`}>
            {subtitle}
          </p>
          <h1 className={`${titleClass} text-5xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl mx-auto transition-colors duration-300`}>
            {title}
          </h1>
          <div 
            className={`${descriptionClass} text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300`}
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
