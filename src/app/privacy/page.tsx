'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
    order?: number
  }>
}

export default function PrivacyPage() {
  const [pageContent, setPageContent] = useState<PageContent>({
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your information'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPageContent()
  }, [])

  const fetchPageContent = async () => {
    try {
      const response = await fetch('/api/page-content/PRIVACY')
      if (response.ok) {
        const data = await response.json()
        setPageContent({
          title: data.heroTitle || data.title || 'Privacy Policy',
          subtitle: data.heroSubtitle || data.subtitle || 'How we collect, use, and protect your information',
          heroImage: data.heroImage,
          sections: data.sections?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || []
        })
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
    } finally {
      setLoading(false)
    }
  }

  const defaultSections = [
    {
      title: 'Information We Collect',
      content: 'We collect information that you provide directly to us, including when you create an account, make a purchase, subscribe to our newsletter, or contact us for support. This may include your name, email address, phone number, and payment information.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and communicate with you about products, services, and events.'
    },
    {
      title: 'Information Sharing',
      content: 'We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf, when required by law, or with your consent.'
    },
    {
      title: 'Data Security',
      content: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us by following the instructions in those messages.'
    },
    {
      title: 'Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to collect information about your browsing activities and to personalize your experience. You can control cookies through your browser settings.'
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about this privacy policy, please contact us at privacy@tomsher.com or through our contact page.'
    }
  ]

  const sectionsToDisplay = pageContent.sections && pageContent.sections.length > 0 
    ? pageContent.sections 
    : defaultSections

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
              <p className={`text-sm ${pageContent.heroImage ? 'text-gray-300' : 'text-gray-500'}`}>
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-12">
                  {sectionsToDisplay.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-2xl p-8"
                    >
                      {section.title && (
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <p className="text-lg text-gray-600 mb-4">
                          {section.subtitle}
                        </p>
                      )}
                      {section.content && (
                        <div className="text-gray-700 leading-relaxed">
                          {section.content}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Have Questions?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                If you have any questions or concerns about our privacy policy, we're here to help.
              </p>
              <a
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
