export interface HeroSectionData {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  titleTheme?: 'dark' | 'light'
  subtitleTheme?: 'dark' | 'light'
  descriptionTheme?: 'dark' | 'light'
  primaryButtonTheme?: 'dark' | 'light'
  secondaryButtonTheme?: 'dark' | 'light'
  variant?: 'default' | 'centered' | 'split' | 'minimal' | 'glassmorphism' | 'dark' | 'animated' | 'video'
}

export interface HeroVariantProps {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  titleTheme?: 'dark' | 'light'
  subtitleTheme?: 'dark' | 'light'
  descriptionTheme?: 'dark' | 'light'
  primaryButtonTheme?: 'dark' | 'light'
  secondaryButtonTheme?: 'dark' | 'light'
}
