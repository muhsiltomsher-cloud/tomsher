'use client'

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
          <div className="animate-slide-in">
            <p className={`${subtitleClass} font-semibold mb-4 text-lg transition-colors duration-300`}>
              {subtitle}
            </p>
            <h1 className={`${titleClass} text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-colors duration-300`}>
              {title}
            </h1>
            <div 
              className={`${descriptionClass} text-xl mb-8 transition-colors duration-300`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className={`${primaryButtonClass} px-8 py-4 rounded-full font-semibold shadow-lg smooth-transition hover:-translate-y-1 active:translate-y-0 inline-block`}
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
          <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden animate-fade-in smooth-transition hover:scale-[1.02]">
            {backgroundImage && (
              <Image src={backgroundImage} alt="Hero image" fill className="object-cover transition-transform duration-700 hover:scale-105" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
