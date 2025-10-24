export interface ServicesSectionData {
  title?: string
  subtitle?: string
  serviceIds?: string[]
  services?: Array<{
    icon: string
    title: string
    description: string
  }>
  variant?: 'grid' | 'cards' | 'minimal'
}

export interface ServicesVariantProps {
  title: string
  subtitle: string
  services: Array<{
    icon: string
    title: string
    description: string
  }>
}
