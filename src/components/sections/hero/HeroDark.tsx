'use client'

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
        <div className="absolute inset-0 z-0 transition-opacity duration-700">
          <Image src={backgroundImage} alt="Hero background" fill className="object-cover opacity-10" />
        </div>
      )}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl">
          <div className="animate-slide-in">
            <p className={`${subtitleClass} font-semibold mb-4 text-lg transition-colors duration-300`}>
              {subtitle}
            </p>
            <h1 className={`${titleClass} text-5xl lg:text-7xl font-bold mb-6 leading-tight transition-colors duration-300`}>
              {title}
            </h1>
            <div 
              className={`${descriptionClass} text-xl mb-8 max-w-2xl transition-colors duration-300`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaLink}
                className={`${primaryButtonClass} px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl smooth-transition hover:-translate-y-1 active:translate-y-0 inline-block`}
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
      </div>
    </section>
  )
}
