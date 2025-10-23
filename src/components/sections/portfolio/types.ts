export interface PortfolioSectionData {
  title?: string
  subtitle?: string
  projects?: Array<{
    title: string
    description: string
    category: string
    image: string
    link?: string
    technologies?: string[]
  }>
  variant?: 'grid' | 'masonry' | 'featured' | 'slider'
}

export interface PortfolioVariantProps {
  title: string
  subtitle: string
  projects: Array<{
    title: string
    description: string
    category: string
    image: string
    link?: string
    technologies?: string[]
  }>
}
