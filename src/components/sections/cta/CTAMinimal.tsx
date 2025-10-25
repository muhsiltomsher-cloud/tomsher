'use client'

import Link from 'next/link'
import { CTAVariantProps } from './types'

export default function CTAMinimal({
  title,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  titleTheme = 'dark',
  descriptionTheme = 'dark',
  primaryButtonTheme = 'dark',
  secondaryButtonTheme = 'light'
}: CTAVariantProps) {
  const titleClass = titleTheme === 'light' ? 'text-white' : 'text-gray-900'
  const descriptionClass = descriptionTheme === 'light' ? 'text-white/90' : 'text-gray-600'
  const primaryButtonClass = primaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'bg-primary text-white hover:bg-primary/90'
  const secondaryButtonClass = secondaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'text-primary hover:bg-primary/5'

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto animate-slide-in">
          <h2 className={`${titleClass} text-3xl lg:text-4xl font-bold mb-4 transition-colors duration-300`}>{title}</h2>
          <div className={`${descriptionClass} text-lg mb-8 transition-colors duration-300`} dangerouslySetInnerHTML={{ __html: description }} />
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={ctaLink}
              className={`${primaryButtonClass} px-8 py-3 rounded-full font-semibold smooth-transition hover:-translate-y-1 active:translate-y-0 inline-block`}
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className={`${secondaryButtonClass} px-8 py-3 rounded-full font-semibold smooth-transition hover:-translate-y-1 active:translate-y-0 inline-block`}
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
