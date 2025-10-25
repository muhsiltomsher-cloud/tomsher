'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HeroVariantProps } from './types'

export default function HeroGlassmorphism({
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
    : 'bg-white text-primary hover:bg-white/90'
  const secondaryButtonClass = secondaryButtonTheme === 'dark'
    ? 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-900'
    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30'

  return (
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
        <div
          className="max-w-4xl mx-auto animate-slide-in"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: '4rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <p className={`${subtitleClass} font-semibold mb-4 text-lg transition-colors duration-300`}>
            {subtitle}
          </p>
          <h1 className={`${titleClass} text-5xl lg:text-7xl font-bold mb-6 leading-tight transition-colors duration-300`}>
            {title}
          </h1>
          <div 
            className={`${descriptionClass} text-xl mb-8 transition-colors duration-300`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="flex flex-wrap gap-4">
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
