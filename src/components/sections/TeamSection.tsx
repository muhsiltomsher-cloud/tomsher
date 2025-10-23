import { TeamSectionData } from './team/types'
import TeamGrid from './team/TeamGrid'
import TeamCards from './team/TeamCards'

interface TeamSectionProps {
  data: TeamSectionData
}

export default function TeamSection({ data }: TeamSectionProps) {
  const {
    title = 'Meet Our Team',
    subtitle = 'Talented individuals driving innovation',
    members = [
      {
        name: 'Sarah Johnson',
        position: 'CEO & Founder',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        bio: '15+ years in tech leadership',
        social: { linkedin: '#', twitter: '#' }
      },
      {
        name: 'Michael Chen',
        position: 'CTO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        bio: 'Expert in scalable architecture',
        social: { linkedin: '#', github: '#' }
      },
      {
        name: 'Emily Rodriguez',
        position: 'Head of Design',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        bio: 'Award-winning UX designer',
        social: { linkedin: '#', twitter: '#' }
      },
      {
        name: 'David Kim',
        position: 'Lead Developer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        bio: 'Full-stack development expert',
        social: { github: '#', linkedin: '#' }
      },
    ],
    variant = 'grid'
  } = data

  const props = {
    title,
    subtitle,
    members
  }

  const variants = {
    grid: <TeamGrid {...props} />,
    cards: <TeamCards {...props} />
  }

  return variants[variant] || variants.grid
}
