import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getSectionComponent } from '@/components/sections/section-registry'

async function getAboutPageData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    const sectionContentResponse = await fetch(`${baseUrl}/api/admin/section-content?pageType=ABOUT`, {
      cache: 'no-store',
    })
    
    if (sectionContentResponse.ok) {
      const sectionContents = await sectionContentResponse.json()
      if (sectionContents && sectionContents.length > 0) {
        return {
          page: { title: 'About Us' },
          sections: sectionContents
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching about page:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us | Tomsher Technologies',
    description: 'Learn more about Tomsher Technologies, our mission, vision, and the team behind our success in web development and digital solutions.',
  }
}

export default async function AboutPage() {
  const data = await getAboutPageData()
  
  if (!data || !data.sections || data.sections.length === 0) {
    const { AboutSection } = await import('@/components/sections/about-section')
    const { StatsSection } = await import('@/components/sections/stats-section')
    const { CTASection } = await import('@/components/sections/cta-section')
    
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 lg:py-32">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  About Us
                </h1>
                <p className="text-xl mb-8 text-gray-600">
                  Learn more about our mission, vision, and the team behind our success
                </p>
              </div>
            </div>
          </section>
          <AboutSection />
          <StatsSection />
          <CTASection />
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
          .filter((sectionData: any) => sectionData.isActive !== false)
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
          .map((sectionData: any) => {
            const sectionKeyToComponent: Record<string, string> = {
              'HERO': 'hero-section',
              'ABOUT': 'about-section',
              'SERVICES': 'services-section',
              'STATS': 'stats-section',
              'PORTFOLIO': 'PortfolioSectionNew',
              'TESTIMONIALS': 'testimonials-section',
              'CTA': 'cta-section',
              'CONTACT': 'contact-section',
              'FEATURES': 'features-section',
              'TEAM': 'team-section',
              'FAQ': 'FAQSectionNew',
              'CLIENTS': 'ClientsSection',
              'PROCESS': 'OurProcessSection',
            }
            
            const componentName = sectionData.sectionKey 
              ? sectionKeyToComponent[sectionData.sectionKey]
              : (sectionData.componentName || sectionData.section?.componentName || sectionData.section?.name)
            
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
                key={sectionData._id || sectionData.sectionKey || sectionData.componentName}
                {...props}
              />
            )
          })}
      </main>
      <Footer />
    </div>
  )
}
