import { StatsSectionData } from './stats/types'
import StatsDefault from './stats/StatsDefault'
import StatsGradient from './stats/StatsGradient'
import StatsMinimal from './stats/StatsMinimal'
import StatsCards from './stats/StatsCards'
import StatsDark from './stats/StatsDark'
import StatsModern from './stats/StatsModern'

interface StatsSectionProps {
  data: StatsSectionData
}

export default function StatsSection({ data }: StatsSectionProps) {
  const {
    title = 'Our Impact in Numbers',
    subtitle = 'Trusted by leading companies worldwide',
    stats = [
      { value: '500+', label: 'Projects Completed', icon: '🚀' },
      { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
      { value: '50+', label: 'Team Members', icon: '👥' },
      { value: '10+', label: 'Years Experience', icon: '📅' },
    ],
    variant = 'default',
    backgroundColor = '#f8f9fa'
  } = data

  const props = {
    title,
    subtitle,
    stats,
    backgroundColor
  }

  const variants = {
    default: <StatsDefault {...props} />,
    gradient: <StatsGradient title={title} subtitle={subtitle} stats={stats} />,
    minimal: <StatsMinimal stats={stats} />,
    cards: <StatsCards {...props} />,
    dark: <StatsDark title={title} subtitle={subtitle} stats={stats} />,
    modern: <StatsModern title={title} subtitle={subtitle} stats={stats} />
  }

  return variants[variant] || variants.default
}
