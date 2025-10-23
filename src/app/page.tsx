import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getSectionComponent } from '@/components/sections/section-registry'

async function getHomePageData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/pages/home`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      console.error('Failed to fetch home page data')
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching home page:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData()
  
  if (data?.page) {
    return {
      title: data.page.metaTitle || data.page.title || 'Best Web Development Company in Dubai, UAE | Tomsher Technologies',
      description: data.page.metaDescription || 'Tomsher is a leading web development company in Dubai, specializing in affordable website creation and custom eCommerce website development services in Dubai and UAE.',
    }
  }
  
  return {
    title: 'Best Web Development Company in Dubai, UAE | Tomsher Technologies',
    description: 'Tomsher is a leading web development company in Dubai, specializing in affordable website creation and custom eCommerce website development services in Dubai and UAE.',
  }
}

export default async function HomePage() {
  const data = await getHomePageData()
  
  if (!data || !data.sections || data.sections.length === 0) {
    const { HeroSection } = await import('@/components/sections/hero-section')
    const { AboutSection } = await import('@/components/sections/about-section')
    const { ServicesSection } = await import('@/components/sections/services-section')
    const { StatsSection } = await import('@/components/sections/stats-section')
    const { PortfolioSection } = await import('@/components/sections/portfolio-section')
    const { TestimonialsSection } = await import('@/components/sections/testimonials-section')
    const { CTASection } = await import('@/components/sections/cta-section')
    const { ContactSection } = await import('@/components/sections/contact-section')
    
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

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {data.sections.map((sectionData: any) => {
          const section = sectionData.section
          if (!section) return null
          
          const componentName = section.componentName || section.name
          const SectionComponent = getSectionComponent(componentName)
          
          if (!SectionComponent) {
            console.warn(`Section component not found: ${componentName}`)
            return null
          }
          
          const props: any = {}
          
          if (sectionData.content) {
            props.data = sectionData.content
          }
          
          if (sectionData.variant) {
            props.variant = sectionData.variant
          }
          
          return (
            <SectionComponent
              key={sectionData._id}
              {...props}
            />
          )
        })}
      </main>
      <Footer />
    </div>
  )
}
