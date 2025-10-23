'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Eye, Calendar } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface Portfolio {
  _id: string
  title: string
  slug: string
  description: string
  shortDescription?: string
  image?: string
  category: string
  client?: string
  projectUrl?: string
  technologies: string[]
  gallery: string[]
  isFeatured: boolean
  createdAt: string
}

interface PageContent {
  title: string
  subtitle?: string
  heroImage?: string
  heroTitle?: string
  heroSubtitle?: string
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [pageContent, setPageContent] = useState<PageContent>({
    title: 'Our Portfolio',
    subtitle: 'Explore our collection of successful projects that showcase our expertise in creating innovative digital solutions'
  })

  useEffect(() => {
    fetchPortfolios()
    fetchPageContent()
  }, [])

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/portfolio')
      if (response.ok) {
        const data = await response.json()
        setPortfolios(data)
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPageContent = async () => {
    try {
      const response = await fetch('/api/page-content/PORTFOLIO')
      if (response.ok) {
        const data = await response.json()
        setPageContent({
          title: data.heroTitle || data.title || 'Our Portfolio',
          subtitle: data.heroSubtitle || data.subtitle || 'Explore our collection of successful projects that showcase our expertise in creating innovative digital solutions',
          heroImage: data.heroImage,
        })
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
    }
  }

  const categories = ['All', ...Array.from(new Set(portfolios.map(p => p.category)))]
  
  const filteredPortfolios = selectedCategory === 'All' 
    ? portfolios 
    : portfolios.filter(p => p.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${pageContent.heroImage ? 'text-white' : ''}`}>
                {pageContent.title.includes('Portfolio') ? (
                  <>
                    {pageContent.title.split('Portfolio')[0]}<span className="gradient-text">Portfolio</span>
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
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredPortfolios.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No projects found in this category.</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPortfolios.map((project, index) => (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link href={`/portfolio/${project.slug}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        {/* Project Image */}
                        <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : project.gallery && project.gallery[0] ? (
                            <Image
                              src={project.gallery[0]}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Eye className="h-16 w-16 text-primary/30" />
                            </div>
                          )}
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center justify-between text-white">
                                <span className="text-sm font-medium">View Project</span>
                                <ExternalLink className="h-5 w-5" />
                              </div>
                            </div>
                          </div>

                          {/* Featured Badge */}
                          {project.isFeatured && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Project Info */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {project.category}
                            </span>
                            {project.client && (
                              <span className="text-xs text-gray-500">
                                {project.client}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {project.shortDescription || project.description}
                          </p>

                          {/* Technologies */}
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.slice(0, 3).map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{project.technologies.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Date */}
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Let's work together to bring your vision to life with our expertise and creativity
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Get Started Today
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
