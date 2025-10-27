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
import FeaturesSection2 from './FeaturesSection'
import TeamSection from './TeamSection'
import PricingSection from './PricingSection'
import NewsletterSection from './NewsletterSection'
import { AchievementsSection } from './achievements-section'
import { ClientsSection as ClientsSectionOld } from './clients-section'
import { DevelopmentProcessSection } from './development-process-section'

export const sectionRegistry: Record<string, any> = {
  'hero-section': HeroSection,
  'about-section': AboutSection,
  'services-section': ServicesSection,
  'stats-section': StatsSection,
  'portfolio-section': PortfolioSection,
  'testimonials-section': TestimonialsSection,
  'cta-section': OldCTASection,
  'contact-section': ContactSection,
  'features-section': FeaturesSection2,
  'team-section': TeamSection,
  
  'HeroSection': HeroSectionNew,
  'AboutSection': AboutSection,
  'ServicesSection': ServicesSectionNew,
  'StatsSection': StatsSection,
  'PortfolioSection': PortfolioSection,
  'TestimonialsSection': TestimonialsSection,
  'CTASection': CTASectionNew,
  'ContactSection': ContactSection,
  'ClientsSection': ClientsSection,
  'FAQSection': FAQSectionNew,
  'FAQSectionNew': FAQSectionNew,
  'OurProcessSection': OurProcessSection,
  'PortfolioSectionNew': PortfolioSectionNew,
  'FeaturesSection': FeaturesSection,
  'TestimonialsShowcase': TestimonialsShowcase,
  'PortfolioShowcase': PortfolioShowcase,
  'ContactFormSection': ContactFormSection,
  'AchievementsSection': AchievementsSection,
  'DevelopmentProcessSection': DevelopmentProcessSection,
  'TeamSection': TeamSection,
  'PricingSection': PricingSection,
  'NewsletterSection': NewsletterSection,
  
  'Hero': HeroSectionNew,
  'About': AboutSection,
  'Services': ServicesSectionNew,
  'Stats': StatsSection,
  'Portfolio': PortfolioSectionNew,
  'Testimonials': TestimonialsSection,
  'CTA': CTASectionNew,
  'Contact': ContactSection,
  'Clients': ClientsSection,
  'FAQ': FAQSectionNew,
  'OurProcess': OurProcessSection,
  'Features': FeaturesSection,
  'Achievements': AchievementsSection,
  'CLIENTS': ClientsSection,
  'PROCESS': OurProcessSection,
  'ACHIEVEMENTS': AchievementsSection,
}

export function getSectionComponent(componentName: string) {
  return sectionRegistry[componentName] || null
}
