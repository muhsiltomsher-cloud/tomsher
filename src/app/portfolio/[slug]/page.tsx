'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, User, Tag } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface Portfolio {
  _id: string
  title: string
  slug: string
  description: string
  shortDescription?: string
  image?: string
  gallery: string[]
  category: string
  client?: string
  projectUrl?: string
  technologies: string[]
  isFeatured: boolean
  createdAt: string
}

export default function PortfolioDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    if (slug) {
      fetchPortfolio()
    }
  }, [slug])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/portfolio/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setPortfolio(data)
        setSelectedImage(data.image || data.gallery[0] || '')
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </>
    )
  }

  if (!portfolio) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
            <Link href="/portfolio" className="text-primary hover:underline">
              Back to Portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const allImages = [
    ...(portfolio.image ? [portfolio.image] : []),
    ...portfolio.gallery
  ].filter(Boolean)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link 
              href="/portfolio"
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Portfolio
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Images Section */}
              <div className="animate-slide-in">
                {/* Main Image */}
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      alt={portfolio.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Tag className="h-20 w-20 text-primary/30" />
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === img
                            ? 'border-primary scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${portfolio.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {/* Category & Featured Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                    {portfolio.category}
                  </span>
                  {portfolio.isFeatured && (
                    <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                  {portfolio.title}
                </h1>

                {/* Short Description */}
                {portfolio.shortDescription && (
                  <p className="text-xl text-gray-600 mb-6">
                    {portfolio.shortDescription}
                  </p>
                )}

                {/* Meta Info */}
                <div className="space-y-4 mb-8 pb-8 border-b">
                  {portfolio.client && (
                    <div className="flex items-center text-gray-700">
                      <User className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <span className="text-sm text-gray-500 block">Client</span>
                        <span className="font-medium">{portfolio.client}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <span className="text-sm text-gray-500 block">Date</span>
                      <span className="font-medium">
                        {new Date(portfolio.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {portfolio.projectUrl && (
                    <div className="flex items-center text-gray-700">
                      <ExternalLink className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <span className="text-sm text-gray-500 block">Live Project</span>
                        <a
                          href={portfolio.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {portfolio.technologies && portfolio.technologies.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {portfolio.projectUrl && (
                  <a
                    href={portfolio.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    View Live Project
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-slide-in">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Project Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {portfolio.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section (if multiple images) */}
        {allImages.length > 1 && (
          <section className="py-12 lg:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="animate-slide-in">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`${portfolio.title} - Gallery ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Like What You See?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Let's create something amazing together. Get in touch to discuss your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors duration-300"
                >
                  View More Projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
