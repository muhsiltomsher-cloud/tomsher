'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Target, Award, TrendingUp } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface PageContent {
  title: string
  subtitle?: string
  heroImage?: string
  heroTitle?: string
  heroSubtitle?: string
  sections?: Array<{
    type: string
    title?: string
    subtitle?: string
    content?: string
    image?: string
    items?: Array<{
      title?: string
      description?: string
      icon?: string
      value?: string
    }>
  }>
}

export default function AboutPage() {
  const [pageContent, setPageContent] = useState<PageContent>({
    title: 'About Us',
    subtitle: 'Learn more about our mission, vision, and the team behind our success'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPageContent()
  }, [])

  const fetchPageContent = async () => {
    try {
      const response = await fetch('/api/page-content/ABOUT')
      if (response.ok) {
        const data = await response.json()
        setPageContent({
          title: data.heroTitle || data.title || 'About Us',
          subtitle: data.heroSubtitle || data.subtitle || 'Learn more about our mission, vision, and the team behind our success',
          heroImage: data.heroImage,
          sections: data.sections || []
        })
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
    } finally {
      setLoading(false)
    }
  }

  const defaultStats = [
    { icon: <Users className="h-8 w-8" />, value: '500+', label: 'Happy Clients' },
    { icon: <Target className="h-8 w-8" />, value: '1000+', label: 'Projects Completed' },
    { icon: <Award className="h-8 w-8" />, value: '50+', label: 'Awards Won' },
    { icon: <TrendingUp className="h-8 w-8" />, value: '98%', label: 'Client Satisfaction' },
  ]

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
                {pageContent.title}
              </h1>
              {pageContent.subtitle && (
                <p className={`text-xl mb-8 ${pageContent.heroImage ? 'text-gray-200' : 'text-gray-600'}`}>
                  {pageContent.subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Dynamic Sections */}
        {!loading && pageContent.sections && pageContent.sections.length > 0 ? (
          pageContent.sections.map((section, index) => {
            if (section.type === 'TEXT') {
              return (
                <section key={index} className="py-16 lg:py-24 bg-white">
                  <div className="container mx-auto px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="max-w-4xl mx-auto"
                    >
                      {section.title && (
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-xl text-gray-600 mb-8 text-center">
                          {section.subtitle}
                        </p>
                      )}
                      {section.content && (
                        <div className="prose prose-lg max-w-none text-gray-700">
                          {section.content}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </section>
              )
            }

            if (section.type === 'STATS' && section.items) {
              return (
                <section key={index} className="py-16 lg:py-24 bg-gray-50">
                  <div className="container mx-auto px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-center mb-12"
                    >
                      {section.title && (
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-xl text-gray-600">
                          {section.subtitle}
                        </p>
                      )}
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {section.items.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="text-center"
                        >
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">{stat.icon || '📊'}</span>
                          </div>
                          <div className="text-4xl font-bold text-primary mb-2">
                            {stat.value}
                          </div>
                          <div className="text-gray-600">
                            {stat.title || stat.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )
            }

            if (section.type === 'IMAGE_TEXT') {
              return (
                <section key={index} className="py-16 lg:py-24 bg-white">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {section.image && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
                        >
                          <Image
                            src={section.image}
                            alt={section.title || 'About'}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        {section.title && (
                          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            {section.title}
                          </h2>
                        )}
                        {section.subtitle && (
                          <p className="text-xl text-gray-600 mb-6">
                            {section.subtitle}
                          </p>
                        )}
                        {section.content && (
                          <div className="text-gray-700 leading-relaxed">
                            {section.content}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </section>
              )
            }

            return null
          })
        ) : (
          <>
            {/* Default Story Section */}
            <section className="py-16 lg:py-24 bg-white">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl mx-auto text-center"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Our Story
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Founded with a vision to transform businesses through innovative digital solutions, 
                    we've grown into a trusted partner for companies worldwide. Our journey is driven by 
                    passion, creativity, and a commitment to excellence.
                  </p>
                  <p className="text-lg text-gray-700">
                    We believe in the power of technology to solve real-world problems and create 
                    meaningful experiences. Every project we undertake is an opportunity to push 
                    boundaries and deliver exceptional results.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Default Stats Section */}
            <section className="py-16 lg:py-24 bg-gray-50">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Our Achievements
                  </h2>
                  <p className="text-xl text-gray-600">
                    Numbers that speak for themselves
                  </p>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {defaultStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        {stat.icon}
                      </div>
                      <div className="text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-600">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

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
                Let's Work Together
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Ready to take your business to the next level? Get in touch with us today.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
