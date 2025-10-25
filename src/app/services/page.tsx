'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface Service {
  _id: string
  title: string
  slug: string
  description: string
  shortDescription?: string
  icon?: string
  image?: string
  features: string[]
  isActive: boolean
}

interface PageContent {
  title: string
  subtitle?: string
  heroImage?: string
  heroTitle?: string
  heroSubtitle?: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [pageContent, setPageContent] = useState<PageContent>({
    title: 'Our Services',
    subtitle: 'Comprehensive digital solutions tailored to your business needs'
  })

  useEffect(() => {
    fetchServices()
    fetchPageContent()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data.filter((s: Service) => s.isActive))
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPageContent = async () => {
    try {
      const response = await fetch('/api/page-content/SERVICES')
      if (response.ok) {
        const data = await response.json()
        setPageContent({
          title: data.heroTitle || data.title || 'Our Services',
          subtitle: data.heroSubtitle || data.subtitle || 'Comprehensive digital solutions tailored to your business needs',
          heroImage: data.heroImage,
        })
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 lg:py-32"
          style={{
            backgroundImage: pageContent.heroImage ? `url(${pageContent.heroImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {pageContent.heroImage && (
            <div className="absolute inset-0 bg-black/50" />
          )}
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-slide-in">
              <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${pageContent.heroImage ? 'text-white' : ''}`}>
                {pageContent.title.includes('Services') ? (
                  <>
                    {pageContent.title.split('Services')[0]}<span className="gradient-text">Services</span>
                  </>
                ) : (
                  pageContent.title
                )}
              </h1>
              {pageContent.subtitle && (
                <p className={`text-xl mb-8 ${pageContent.heroImage ? 'text-gray-200' : 'text-gray-600'}`}>
                  {pageContent.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No services available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={service._id}
                    className="group animate-slide-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                      {/* Service Image */}
                      {service.image && (
                        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      )}

                      {/* Service Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Icon */}
                        {service.icon && (
                          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <span className="text-3xl">{service.icon}</span>
                          </div>
                        )}

                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>

                        <p className="text-gray-600 mb-6 flex-1">
                          {service.shortDescription || service.description}
                        </p>

                        {/* Features */}
                        {service.features && service.features.length > 0 && (
                          <div className="space-y-2 mb-6">
                            {service.features.slice(0, 4).map((feature, i) => (
                              <div key={i} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                            {service.features.length > 4 && (
                              <p className="text-sm text-gray-500 ml-7">
                                +{service.features.length - 4} more features
                              </p>
                            )}
                          </div>
                        )}

                        {/* Learn More Link */}
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group/link mt-auto"
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Let's discuss how our services can help you achieve your business goals
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
