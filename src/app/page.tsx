import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { AboutSection } from '@/components/sections/about-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ContactSection } from '@/components/sections/contact-section'
import { StatsSection } from '@/components/sections/stats-section'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Best Web Development Company in Dubai, UAE | Tomsher Technologies',
  description: 'Tomsher is a leading web development company in Dubai, specializing in affordable website creation and custom eCommerce website development services in Dubai and UAE.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}