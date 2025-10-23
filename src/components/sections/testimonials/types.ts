export interface TestimonialsSectionData {
  title?: string
  subtitle?: string
  testimonials?: Array<{
    name: string
    role: string
    company: string
    content: string
    rating: number
    image?: string
  }>
  variant?: 'cards' | 'carousel' | 'grid' | 'featured'
}

export interface TestimonialsVariantProps {
  title: string
  subtitle: string
  testimonials: Array<{
    name: string
    role: string
    company: string
    content: string
    rating: number
    image?: string
  }>
}
