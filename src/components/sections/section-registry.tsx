import { HeroSection } from './hero-section'
import { AboutSection } from './about-section'
import { ServicesSection as OldServicesSection } from './services-section'
import { StatsSection } from './stats-section'
import { PortfolioSection } from './portfolio-section'
import { TestimonialsSection } from './testimonials-section'
import { CTASection as OldCTASection } from './cta-section'
import { ContactSection } from './contact-section'
import HeroSectionNew from './HeroSection'
import ServicesSectionNew from './ServicesSection'
import CTASectionNew from './CTASection'

export const sectionRegistry: Record<string, any> = {
  'hero-section': HeroSection,
  'about-section': AboutSection,
  'services-section': OldServicesSection,
  'stats-section': StatsSection,
  'portfolio-section': PortfolioSection,
  'testimonials-section': TestimonialsSection,
  'cta-section': OldCTASection,
  'contact-section': ContactSection,
  
  'HeroSection': HeroSectionNew,
  'ServicesSection': ServicesSectionNew,
  'CTASection': CTASectionNew,
  
  'Hero': HeroSectionNew,
  'Services': ServicesSectionNew,
  'CTA': CTASectionNew,
  'About': AboutSection,
  'Stats': StatsSection,
  'Portfolio': PortfolioSection,
  'Testimonials': TestimonialsSection,
  'Contact': ContactSection,
}

export function getSectionComponent(componentName: string) {
  return sectionRegistry[componentName] || null
}
