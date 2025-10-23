export interface StatsSectionData {
  title?: string
  subtitle?: string
  stats?: Array<{
    value: string
    label: string
    icon?: string
  }>
  variant?: 'default' | 'gradient' | 'minimal' | 'cards' | 'dark' | 'modern'
  backgroundColor?: string
}

export interface StatsVariantProps {
  title: string
  subtitle: string
  stats: Array<{
    value: string
    label: string
    icon?: string
  }>
  backgroundColor?: string
}
