import HeroSection from './HeroSection'
import ServicesSection from './ServicesSection'
import CTASection from './CTASection'

export const sectionComponents: Record<string, any> = {
  HeroSection,
  ServicesSection,
  CTASection
}

export const sectionDefinitions = [
  {
    id: 'hero',
    name: 'Hero Section',
    component: 'HeroSection',
    description: 'Large header section with title, description, and CTA buttons',
    variants: ['default', 'centered', 'split', 'minimal'],
    defaultData: {
      title: 'Welcome to Our Website',
      subtitle: 'Building Digital Excellence',
      description: 'We create innovative solutions that transform businesses',
      ctaText: 'Get Started',
      ctaLink: '/contact',
      variant: 'default'
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      description: { type: 'textarea', label: 'Description' },
      ctaText: { type: 'text', label: 'CTA Button Text' },
      ctaLink: { type: 'text', label: 'CTA Button Link' },
      secondaryCtaText: { type: 'text', label: 'Secondary CTA Text' },
      secondaryCtaLink: { type: 'text', label: 'Secondary CTA Link' },
      backgroundImage: { type: 'image', label: 'Background Image' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'centered', 'split', 'minimal'] }
    }
  },
  {
    id: 'services',
    name: 'Services Section',
    component: 'ServicesSection',
    description: 'Display services in a grid or card layout',
    variants: ['grid', 'cards', 'minimal'],
    defaultData: {
      title: 'Our Services',
      subtitle: 'What We Offer',
      variant: 'grid',
      services: [
        { icon: 'code', title: 'Web Development', description: 'Custom web applications' },
        { icon: 'smartphone', title: 'Mobile Apps', description: 'Native and cross-platform' },
        { icon: 'shopping', title: 'E-Commerce', description: 'Scalable online stores' }
      ]
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      variant: { type: 'select', label: 'Variant', options: ['grid', 'cards', 'minimal'] },
      services: { 
        type: 'array', 
        label: 'Services',
        itemSchema: {
          icon: { type: 'select', label: 'Icon', options: ['code', 'smartphone', 'shopping', 'palette', 'trending', 'cloud'] },
          title: { type: 'text', label: 'Title' },
          description: { type: 'textarea', label: 'Description' }
        }
      }
    }
  },
  {
    id: 'cta',
    name: 'Call to Action',
    component: 'CTASection',
    description: 'Encourage users to take action with prominent CTA',
    variants: ['default', 'gradient', 'split', 'minimal'],
    defaultData: {
      title: 'Ready to Get Started?',
      description: 'Let\'s work together to bring your vision to life',
      ctaText: 'Contact Us',
      ctaLink: '/contact',
      variant: 'default'
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      description: { type: 'textarea', label: 'Description' },
      ctaText: { type: 'text', label: 'CTA Button Text' },
      ctaLink: { type: 'text', label: 'CTA Button Link' },
      secondaryCtaText: { type: 'text', label: 'Secondary CTA Text' },
      secondaryCtaLink: { type: 'text', label: 'Secondary CTA Link' },
      backgroundImage: { type: 'image', label: 'Background Image' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'gradient', 'split', 'minimal'] }
    }
  }
]

export { HeroSection, ServicesSection, CTASection }
