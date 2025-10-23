import { PortfolioSectionData } from './portfolio/types'
import PortfolioGrid from './portfolio/PortfolioGrid'
import PortfolioMasonry from './portfolio/PortfolioMasonry'
import PortfolioFeatured from './portfolio/PortfolioFeatured'
import PortfolioSlider from './portfolio/PortfolioSlider'

interface PortfolioShowcaseProps {
  data: PortfolioSectionData
}

export default function PortfolioShowcase({ data }: PortfolioShowcaseProps) {
  const {
    title = 'Our Work',
    subtitle = 'Portfolio',
    projects = [
      {
        title: 'E-Commerce Platform',
        description: 'Modern online shopping experience with seamless checkout',
        category: 'Web Development',
        image: '/images/portfolio/project1.jpg',
        technologies: ['Next.js', 'React', 'Stripe']
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure and intuitive banking solution',
        category: 'Mobile App',
        image: '/images/portfolio/project2.jpg',
        technologies: ['React Native', 'Node.js']
      },
      {
        title: 'Healthcare Dashboard',
        description: 'Patient management and analytics platform',
        category: 'Dashboard',
        image: '/images/portfolio/project3.jpg',
        technologies: ['Vue.js', 'Python', 'PostgreSQL']
      }
    ],
    variant = 'grid'
  } = data

  const props = {
    title,
    subtitle,
    projects
  }

  const variants = {
    grid: <PortfolioGrid {...props} />,
    masonry: <PortfolioMasonry {...props} />,
    featured: <PortfolioFeatured {...props} />,
    slider: <PortfolioSlider {...props} />
  }

  return variants[variant] || variants.grid
}
