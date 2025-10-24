import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getSectionComponent } from '@/components/sections/section-registry'

async function getHomePageData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    const pageContentResponse = await fetch(`${baseUrl}/api/page-content/HOME`, {
      cache: 'no-store',
    })
    
    if (pageContentResponse.ok) {
      const pageContent = await pageContentResponse.json()
      return {
        page: pageContent,
        sections: pageContent.sections || []
      }
    }
    
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
    const page = data.page
    return {
      title: page.seo?.metaTitle || page.metaTitle || page.title || 'Best Web Development Company in Dubai, UAE | Tomsher Technologies',
      description: page.seo?.metaDescription || page.metaDescription || 'Tomsher is a leading web development company in Dubai, specializing in affordable website creation and custom eCommerce website development services in Dubai and UAE.',
      keywords: page.seo?.keywords?.join(', '),
      openGraph: page.seo?.ogImage ? {
        images: [page.seo.ogImage],
      } : undefined,
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
    const HeroSection = (await import('@/components/sections/hero-section')).default
    const { AboutSection } = await import('@/components/sections/about-section')
    const { ServicesSection } = await import('@/components/sections/services-section')
    const { StatsSection } = await import('@/components/sections/stats-section')
    const { PortfolioSection } = await import('@/components/sections/portfolio-section')
    const { TestimonialsSection } = await import('@/components/sections/testimonials-section')
    const { CTASection } = await import('@/components/sections/cta-section')
    const { ContactSection } = await import('@/components/sections/contact-section')
    const ClientsSection = (await import('@/components/sections/ClientsSection')).default
    const FAQSectionNew = (await import('@/components/sections/FAQSectionNew')).default
    const OurProcessSection = (await import('@/components/sections/OurProcessSection')).default
    const PortfolioSectionNew = (await import('@/components/sections/PortfolioSectionNew')).default
    
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ClientsSection />
          <StatsSection />
          <OurProcessSection />
          <PortfolioSectionNew />
          <TestimonialsSection />
          <FAQSectionNew />
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
        {data.sections
          .filter((sectionData: any) => sectionData.isVisible !== false)
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
          .map((sectionData: any) => {
            const componentName = sectionData.componentName || sectionData.section?.componentName || sectionData.section?.name
            if (!componentName) {
              console.warn('Section missing componentName:', sectionData)
              return null
            }
            
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
                key={sectionData._id || sectionData.componentName}
                {...props}
              />
            )
          })}
      </main>
      <Footer />
    </div>
  )
}
