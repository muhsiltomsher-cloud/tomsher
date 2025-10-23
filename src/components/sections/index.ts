import HeroSection from './HeroSection'
import ServicesSection from './ServicesSection'
import CTASection from './CTASection'
import FeaturesSection from './FeaturesSection'
import TestimonialsShowcase from './TestimonialsShowcase'
import PortfolioShowcase from './PortfolioShowcase'
import ContactFormSection from './ContactFormSection'
import StatsSection from './StatsSection'
import PricingSection from './PricingSection'
import TeamSection from './TeamSection'
import FAQSection from './FAQSection'
import NewsletterSection from './NewsletterSection'

export const sectionComponents: Record<string, any> = {
  HeroSection,
  ServicesSection,
  CTASection,
  FeaturesSection,
  TestimonialsShowcase,
  PortfolioShowcase,
  ContactFormSection,
  StatsSection,
  PricingSection,
  TeamSection,
  FAQSection,
  NewsletterSection
}

export const sectionRegistry = sectionComponents

export const sectionDefinitions = [
  {
    id: 'hero',
    name: 'Hero Section',
    component: 'HeroSection',
    description: 'Large header section with title, description, and CTA buttons',
    variants: ['default', 'centered', 'split', 'minimal', 'glassmorphism', 'dark', 'animated', 'video'],
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
      titleColor: { type: 'color', label: 'Title Color' },
      subtitleColor: { type: 'color', label: 'Subtitle Color' },
      descriptionColor: { type: 'color', label: 'Description Color' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'centered', 'split', 'minimal', 'glassmorphism', 'dark', 'animated', 'video'] }
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
      titleColor: { type: 'color', label: 'Title Color' },
      descriptionColor: { type: 'color', label: 'Description Color' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'gradient', 'split', 'minimal'] }
    }
  },
  {
    id: 'features',
    name: 'Features Section',
    component: 'FeaturesSection',
    description: 'Showcase key features and benefits',
    variants: ['grid', 'cards', 'list', 'highlight'],
    defaultData: {
      title: 'Why Choose Us',
      subtitle: 'Our Features',
      variant: 'grid',
      features: [
        { icon: 'check', title: 'Quality Assurance', description: 'We ensure the highest quality in every project' },
        { icon: 'zap', title: 'Fast Delivery', description: 'Quick turnaround without compromising quality' },
        { icon: 'shield', title: 'Secure & Reliable', description: 'Your data security is our top priority' }
      ]
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      variant: { type: 'select', label: 'Variant', options: ['grid', 'cards', 'list', 'highlight'] },
      features: {
        type: 'array',
        label: 'Features',
        itemSchema: {
          icon: { type: 'select', label: 'Icon', options: ['check', 'star', 'zap', 'shield', 'users', 'trending', 'award', 'target'] },
          title: { type: 'text', label: 'Title' },
          description: { type: 'textarea', label: 'Description' }
        }
      }
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials Showcase',
    component: 'TestimonialsShowcase',
    description: 'Display customer testimonials and reviews',
    variants: ['cards', 'carousel', 'grid', 'featured'],
    defaultData: {
      title: 'What Our Clients Say',
      subtitle: 'Testimonials',
      variant: 'cards',
      testimonials: [
        { name: 'Sarah Johnson', role: 'CEO', company: 'Tech Innovations', content: 'Working with this team has been an absolute pleasure.', rating: 5 },
        { name: 'Michael Chen', role: 'CTO', company: 'Digital Solutions', content: 'Professional, efficient, and highly skilled.', rating: 5 }
      ]
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      variant: { type: 'select', label: 'Variant', options: ['cards', 'carousel', 'grid', 'featured'] },
      testimonials: {
        type: 'array',
        label: 'Testimonials',
        itemSchema: {
          name: { type: 'text', label: 'Name' },
          role: { type: 'text', label: 'Role' },
          company: { type: 'text', label: 'Company' },
          content: { type: 'textarea', label: 'Content' },
          rating: { type: 'number', label: 'Rating (1-5)' }
        }
      }
    }
  },
  {
    id: 'portfolio',
    name: 'Portfolio Showcase',
    component: 'PortfolioShowcase',
    description: 'Display portfolio projects and case studies',
    variants: ['grid', 'masonry', 'featured', 'slider'],
    defaultData: {
      title: 'Our Work',
      subtitle: 'Portfolio',
      variant: 'grid',
      projects: [
        { title: 'E-Commerce Platform', description: 'Modern online shopping experience', category: 'Web Development', image: '/images/portfolio/project1.jpg', technologies: ['Next.js', 'React'] }
      ]
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      variant: { type: 'select', label: 'Variant', options: ['grid', 'masonry', 'featured', 'slider'] },
      projects: {
        type: 'array',
        label: 'Projects',
        itemSchema: {
          title: { type: 'text', label: 'Title' },
          description: { type: 'textarea', label: 'Description' },
          category: { type: 'text', label: 'Category' },
          image: { type: 'image', label: 'Image' },
          link: { type: 'text', label: 'Link' },
          technologies: { type: 'tags', label: 'Technologies' }
        }
      }
    }
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    component: 'ContactFormSection',
    description: 'Contact form with customizable fields',
    variants: ['default', 'split', 'centered'],
    defaultData: {
      title: 'Get In Touch',
      subtitle: 'Contact Us',
      description: 'Have a question or want to work together? We\'d love to hear from you.',
      email: 'info@tomsher.com',
      phone: '+971 50 123 4567',
      address: 'Dubai, UAE',
      formType: 'contact',
      variant: 'default'
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      description: { type: 'textarea', label: 'Description' },
      email: { type: 'text', label: 'Email' },
      phone: { type: 'text', label: 'Phone' },
      address: { type: 'text', label: 'Address' },
      formType: { type: 'select', label: 'Form Type', options: ['contact', 'inquiry', 'quote'] },
      variant: { type: 'select', label: 'Variant', options: ['default', 'split', 'centered'] }
    }
  },
  {
    id: 'stats',
    name: 'Stats Section',
    component: 'StatsSection',
    description: 'Display impressive statistics and numbers',
    variants: ['default', 'gradient', 'minimal', 'cards', 'dark', 'modern'],
    defaultData: {
      title: 'Our Impact in Numbers',
      subtitle: 'Trusted by leading companies worldwide',
      variant: 'default',
      stats: [
        { value: '500+', label: 'Projects Completed', icon: '🚀' },
        { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
        { value: '50+', label: 'Team Members', icon: '👥' },
        { value: '10+', label: 'Years Experience', icon: '📅' }
      ]
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'gradient', 'minimal', 'cards', 'dark', 'modern'] },
      backgroundColor: { type: 'text', label: 'Background Color' },
      stats: {
        type: 'array',
        label: 'Statistics',
        itemSchema: {
          value: { type: 'text', label: 'Value' },
          label: { type: 'text', label: 'Label' },
          icon: { type: 'text', label: 'Icon (emoji)' }
        }
      }
    }
  },
  {
    id: 'pricing',
    name: 'Pricing Section',
    component: 'PricingSection',
    description: 'Display pricing plans and packages',
    variants: ['default', 'cards'],
    defaultData: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the perfect plan for your needs',
      variant: 'default',
      plans: [
        {
          name: 'Starter',
          price: '$29',
          period: '/month',
          features: ['5 Projects', '10GB Storage', 'Basic Support', 'API Access'],
          buttonText: 'Get Started'
        },
        {
          name: 'Professional',
          price: '$79',
          period: '/month',
          features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced API', 'Custom Domain'],
          highlighted: true,
          buttonText: 'Start Free Trial'
        }
      ]
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'cards'] },
      plans: {
        type: 'array',
        label: 'Pricing Plans',
        itemSchema: {
          name: { type: 'text', label: 'Plan Name' },
          price: { type: 'text', label: 'Price' },
          period: { type: 'text', label: 'Period' },
          features: { type: 'tags', label: 'Features' },
          highlighted: { type: 'checkbox', label: 'Highlight This Plan' },
          buttonText: { type: 'text', label: 'Button Text' }
        }
      }
    }
  },
  {
    id: 'team',
    name: 'Team Section',
    component: 'TeamSection',
    description: 'Showcase your team members',
    variants: ['grid', 'cards'],
    defaultData: {
      title: 'Meet Our Team',
      subtitle: 'Talented individuals driving innovation',
      variant: 'grid',
      members: [
        {
          name: 'Sarah Johnson',
          position: 'CEO & Founder',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
          bio: '15+ years in tech leadership',
          social: { linkedin: '#', twitter: '#' }
        }
      ]
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      variant: { type: 'select', label: 'Variant', options: ['grid', 'cards'] },
      members: {
        type: 'array',
        label: 'Team Members',
        itemSchema: {
          name: { type: 'text', label: 'Name' },
          position: { type: 'text', label: 'Position' },
          image: { type: 'image', label: 'Photo' },
          bio: { type: 'textarea', label: 'Bio' }
        }
      }
    }
  },
  {
    id: 'faq',
    name: 'FAQ Section',
    component: 'FAQSection',
    description: 'Frequently asked questions with accordion',
    variants: ['accordion', 'grid'],
    defaultData: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know',
      variant: 'accordion',
      faqs: [
        {
          question: 'What services do you offer?',
          answer: 'We offer comprehensive web development, mobile app development, UI/UX design, and digital marketing services.'
        },
        {
          question: 'How long does a typical project take?',
          answer: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications may take 3-6 months.'
        }
      ]
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      variant: { type: 'select', label: 'Variant', options: ['accordion', 'grid'] },
      faqs: {
        type: 'array',
        label: 'FAQs',
        itemSchema: {
          question: { type: 'text', label: 'Question' },
          answer: { type: 'textarea', label: 'Answer' }
        }
      }
    }
  },
  {
    id: 'newsletter',
    name: 'Newsletter Section',
    component: 'NewsletterSection',
    description: 'Newsletter subscription form',
    variants: ['default', 'gradient'],
    defaultData: {
      title: 'Stay Updated',
      subtitle: 'Subscribe to our newsletter for the latest updates and insights',
      placeholder: 'Enter your email address',
      buttonText: 'Subscribe',
      variant: 'default'
    },
    schema: {
      title: { type: 'text', label: 'Title', required: true },
      subtitle: { type: 'text', label: 'Subtitle' },
      placeholder: { type: 'text', label: 'Input Placeholder' },
      buttonText: { type: 'text', label: 'Button Text' },
      variant: { type: 'select', label: 'Variant', options: ['default', 'gradient'] },
      backgroundColor: { type: 'text', label: 'Background Color' }
    }
  }
]

export { HeroSection, ServicesSection, CTASection, FeaturesSection, TestimonialsShowcase, PortfolioShowcase, ContactFormSection, StatsSection, PricingSection, TeamSection, FAQSection, NewsletterSection }
