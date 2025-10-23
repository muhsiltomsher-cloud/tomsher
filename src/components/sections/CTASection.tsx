'use client'

import { CTASectionData } from './cta/types'
import CTADefault from './cta/CTADefault'
import CTAGradient from './cta/CTAGradient'
import CTASplit from './cta/CTASplit'
import CTAMinimal from './cta/CTAMinimal'

interface CTASectionProps {
  data: CTASectionData
}

export default function CTASection({ data }: CTASectionProps) {
  const {
    title = 'Ready to Get Started?',
    description = 'Let\'s work together to bring your vision to life',
    ctaText = 'Contact Us',
    ctaLink = '/contact',
    secondaryCtaText,
    secondaryCtaLink,
    backgroundImage,
    variant = 'default'
  } = data

  const props = {
    title,
    description,
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
    backgroundImage
  }

  const variants = {
    default: <CTADefault {...props} />,
    gradient: <CTAGradient {...props} />,
    split: <CTASplit {...props} />,
    minimal: <CTAMinimal {...props} />
  }

  return variants[variant] || variants.default
}
