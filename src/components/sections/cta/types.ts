export interface CTASectionData {
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  titleTheme?: 'dark' | 'light'
  descriptionTheme?: 'dark' | 'light'
  primaryButtonTheme?: 'dark' | 'light'
  secondaryButtonTheme?: 'dark' | 'light'
  variant?: 'default' | 'gradient' | 'split' | 'minimal'
}

export interface CTAVariantProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  titleTheme?: 'dark' | 'light'
  descriptionTheme?: 'dark' | 'light'
  primaryButtonTheme?: 'dark' | 'light'
  secondaryButtonTheme?: 'dark' | 'light'
}
