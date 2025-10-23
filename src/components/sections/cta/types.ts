export interface CTASectionData {
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  titleColor?: string
  descriptionColor?: string
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
  titleColor?: string
  descriptionColor?: string
}
