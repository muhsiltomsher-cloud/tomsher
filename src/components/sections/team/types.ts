export interface TeamSectionData {
  title?: string
  subtitle?: string
  members?: Array<{
    name: string
    position: string
    image: string
    bio?: string
    social?: {
      linkedin?: string
      twitter?: string
      github?: string
    }
  }>
  variant?: 'grid' | 'cards'
}

export interface TeamVariantProps {
  title: string
  subtitle: string
  members: Array<{
    name: string
    position: string
    image: string
    bio?: string
    social?: {
      linkedin?: string
      twitter?: string
      github?: string
    }
  }>
}
