import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getSectionComponent } from '@/components/sections/section-registry'

interface PageProps {
  params: {
    slug: string
  }
}

async function getPageData(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/pages/${slug}`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageData(params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }
  
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
    keywords: page.seoKeywords?.join(', '),
  }
}

export default async function CustomPage({ params }: PageProps) {
  const page = await getPageData(params.slug)
  
  if (!page) {
    notFound()
  }

  const visibleSections = page.sections
    .filter((section: any) => section.isVisible !== false)
    .sort((a: any, b: any) => a.order - b.order)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {visibleSections.length === 0 ? (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
            {page.description && (
              <p className="text-xl text-gray-600">{page.description}</p>
            )}
          </div>
        ) : (
          visibleSections.map((section: any, index: number) => {
            const SectionComponent = getSectionComponent(section.componentName)
            
            if (!SectionComponent) {
              console.warn(`Section component not found: ${section.componentName}`)
              return null
            }
            
            return (
              <SectionComponent
                key={section._id || index}
                data={section.data}
              />
            )
          })
        )}
      </main>
      <Footer />
    </div>
  )
}
