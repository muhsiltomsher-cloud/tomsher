'use client'

import { FeaturesSectionData } from './features/types'
import FeaturesGrid from './features/FeaturesGrid'
import FeaturesCards from './features/FeaturesCards'
import FeaturesList from './features/FeaturesList'
import FeaturesHighlight from './features/FeaturesHighlight'

interface FeaturesSectionProps {
  data: FeaturesSectionData
}

export default function FeaturesSection({ data }: FeaturesSectionProps) {
  const {
    title = 'Why Choose Us',
    subtitle = 'Our Features',
    features = [
      { icon: 'check', title: 'Quality Assurance', description: 'We ensure the highest quality in every project' },
      { icon: 'zap', title: 'Fast Delivery', description: 'Quick turnaround without compromising quality' },
      { icon: 'shield', title: 'Secure & Reliable', description: 'Your data security is our top priority' },
      { icon: 'users', title: 'Expert Team', description: 'Experienced professionals dedicated to your success' },
      { icon: 'trending', title: 'Scalable Solutions', description: 'Built to grow with your business' },
      { icon: 'award', title: 'Award Winning', description: 'Recognized for excellence in our industry' }
    ],
    variant = 'grid'
  } = data

  const props = {
    title,
    subtitle,
    features
  }

  const variants = {
    grid: <FeaturesGrid {...props} />,
    cards: <FeaturesCards {...props} />,
    list: <FeaturesList {...props} />,
    highlight: <FeaturesHighlight {...props} />
  }

  return variants[variant] || variants.grid
}
