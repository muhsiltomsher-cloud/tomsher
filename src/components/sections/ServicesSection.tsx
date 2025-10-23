'use client'

import { ServicesSectionData } from './services/types'
import ServicesGrid from './services/ServicesGrid'
import ServicesCards from './services/ServicesCards'
import ServicesMinimal from './services/ServicesMinimal'

interface ServicesSectionProps {
  data: ServicesSectionData
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  const {
    title = 'Our Services',
    subtitle = 'What We Offer',
    services = [
      { icon: 'code', title: 'Web Development', description: 'Custom web applications built with modern technologies' },
      { icon: 'smartphone', title: 'Mobile Apps', description: 'Native and cross-platform mobile solutions' },
      { icon: 'shopping', title: 'E-Commerce', description: 'Scalable online stores with seamless checkout' },
      { icon: 'palette', title: 'UI/UX Design', description: 'Beautiful and intuitive user experiences' },
      { icon: 'trending', title: 'Digital Marketing', description: 'Data-driven strategies to grow your business' },
      { icon: 'cloud', title: 'Cloud Solutions', description: 'Scalable infrastructure and deployment' }
    ],
    variant = 'grid'
  } = data

  const props = {
    title,
    subtitle,
    services
  }

  const variants = {
    grid: <ServicesGrid {...props} />,
    cards: <ServicesCards {...props} />,
    minimal: <ServicesMinimal {...props} />
  }

  return variants[variant] || variants.grid
}
