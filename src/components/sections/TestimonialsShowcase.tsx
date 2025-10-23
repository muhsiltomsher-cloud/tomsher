import { TestimonialsSectionData } from './testimonials/types'
import TestimonialsCards from './testimonials/TestimonialsCards'
import TestimonialsCarousel from './testimonials/TestimonialsCarousel'
import TestimonialsGrid from './testimonials/TestimonialsGrid'
import TestimonialsFeatured from './testimonials/TestimonialsFeatured'

interface TestimonialsShowcaseProps {
  data: TestimonialsSectionData
}

export default function TestimonialsShowcase({ data }: TestimonialsShowcaseProps) {
  const {
    title = 'What Our Clients Say',
    subtitle = 'Testimonials',
    testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'CEO',
        company: 'Tech Innovations',
        content: 'Working with this team has been an absolute pleasure. They delivered beyond our expectations.',
        rating: 5
      },
      {
        name: 'Michael Chen',
        role: 'CTO',
        company: 'Digital Solutions',
        content: 'Professional, efficient, and highly skilled. Our project was completed on time and exceeded quality standards.',
        rating: 5
      },
      {
        name: 'Emily Rodriguez',
        role: 'Marketing Director',
        company: 'Growth Agency',
        content: 'The attention to detail and commitment to excellence is remarkable. Highly recommended!',
        rating: 5
      }
    ],
    variant = 'cards'
  } = data

  const props = {
    title,
    subtitle,
    testimonials
  }

  const variants = {
    cards: <TestimonialsCards {...props} />,
    carousel: <TestimonialsCarousel {...props} />,
    grid: <TestimonialsGrid {...props} />,
    featured: <TestimonialsFeatured {...props} />
  }

  return variants[variant] || variants.cards
}
