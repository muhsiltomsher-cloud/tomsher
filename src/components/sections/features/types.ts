export interface FeaturesSectionData {
  title?: string
  subtitle?: string
  features?: Array<{
    icon: string
    title: string
    description: string
  }>
  variant?: 'grid' | 'cards' | 'list' | 'highlight'
}

export interface FeaturesVariantProps {
  title: string
  subtitle: string
  features: Array<{
    icon: string
    title: string
    description: string
  }>
}
