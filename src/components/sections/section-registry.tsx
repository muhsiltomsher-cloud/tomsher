import HeroSection from './hero-section'
import { AboutSection } from './about-section'
import { ServicesSection } from './services-section'
import { StatsSection } from './stats-section'
import { PortfolioSection } from './portfolio-section'
import { TestimonialsSection } from './testimonials-section'
import { CTASection as OldCTASection } from './cta-section'
import { ContactSection } from './contact-section'
import HeroSectionNew from './HeroSection'
import ServicesSectionNew from './ServicesSection'
import CTASectionNew from './CTASection'
import FeaturesSection from './FeaturesSection'
import TestimonialsShowcase from './TestimonialsShowcase'
import PortfolioShowcase from './PortfolioShowcase'
import ContactFormSection from './ContactFormSection'
import ClientsSection from './ClientsSection'
import FAQSectionNew from './FAQSectionNew'
import OurProcessSection from './OurProcessSection'
import PortfolioSectionNew from './PortfolioSectionNew'

export const sectionRegistry: Record<string, any> = {
  'hero-section': HeroSection,
  'about-section': AboutSection,
  'services-section': ServicesSection,
  'stats-section': StatsSection,
  'portfolio-section': PortfolioSection,
  'testimonials-section': TestimonialsSection,
  'cta-section': OldCTASection,
  'contact-section': ContactSection,
  
  'HeroSection': HeroSection,
  'AboutSection': AboutSection,
  'ServicesSection': ServicesSection,
  'StatsSection': StatsSection,
  'PortfolioSection': PortfolioSection,
  'TestimonialsSection': TestimonialsSection,
  'CTASection': OldCTASection,
  'ContactSection': ContactSection,
  'ClientsSection': ClientsSection,
  'FAQSectionNew': FAQSectionNew,
  'OurProcessSection': OurProcessSection,
  'PortfolioSectionNew': PortfolioSectionNew,
  'FeaturesSection': FeaturesSection,
  'TestimonialsShowcase': TestimonialsShowcase,
  'PortfolioShowcase': PortfolioShowcase,
  'ContactFormSection': ContactFormSection,
  
  'Hero': HeroSection,
  'About': AboutSection,
  'Services': ServicesSection,
  'Stats': StatsSection,
  'Portfolio': PortfolioSection,
  'Testimonials': TestimonialsSection,
  'CTA': OldCTASection,
  'Contact': ContactSection,
  'Clients': ClientsSection,
  'FAQ': FAQSectionNew,
  'OurProcess': OurProcessSection,
  'Features': FeaturesSection,
}

export function getSectionComponent(componentName: string) {
  return sectionRegistry[componentName] || null
}
