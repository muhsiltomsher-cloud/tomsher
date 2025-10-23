'use client'

import { HeroSectionData } from './hero/types'
import HeroDefault from './hero/HeroDefault'
import HeroCentered from './hero/HeroCentered'
import HeroSplit from './hero/HeroSplit'
import HeroMinimal from './hero/HeroMinimal'
import HeroGlassmorphism from './hero/HeroGlassmorphism'
import HeroDark from './hero/HeroDark'
import HeroAnimated from './hero/HeroAnimated'
import HeroVideo from './hero/HeroVideo'

interface HeroSectionProps {
  data: HeroSectionData
}

export default function HeroSection({ data }: HeroSectionProps) {
  const {
    title = 'Welcome to Our Website',
    subtitle = 'Building Digital Excellence',
    description = 'We create innovative solutions that transform businesses',
    ctaText = 'Get Started',
    ctaLink = '/contact',
    secondaryCtaText,
    secondaryCtaLink,
    backgroundImage,
    titleTheme,
    subtitleTheme,
    descriptionTheme,
    primaryButtonTheme,
    secondaryButtonTheme,
    variant = 'default'
  } = data

  const props = {
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
    backgroundImage,
    titleTheme,
    subtitleTheme,
    descriptionTheme,
    primaryButtonTheme,
    secondaryButtonTheme
  }

  const variants = {
    default: <HeroDefault {...props} />,
    centered: <HeroCentered {...props} />,
    split: <HeroSplit {...props} />,
    minimal: <HeroMinimal {...props} />,
    glassmorphism: <HeroGlassmorphism {...props} />,
    dark: <HeroDark {...props} />,
    animated: <HeroAnimated {...props} />,
    video: <HeroVideo {...props} />
  }

  return variants[variant] || variants.default
}
