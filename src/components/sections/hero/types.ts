export interface HeroSectionData {
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

export interface HeroVariantProps {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
}
