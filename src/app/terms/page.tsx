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

export default function TermsPage() {
  const [pageContent, setPageContent] = useState<PageContent>({
    title: 'Terms of Service',
    subtitle: 'Please read these terms carefully before using our services'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPageContent()
  }, [])

  const fetchPageContent = async () => {
    try {
      const response = await fetch('/api/page-content/TERMS')
      if (response.ok) {
        const data = await response.json()
        setPageContent({
          title: data.heroTitle || data.title || 'Terms of Service',
          subtitle: data.heroSubtitle || data.subtitle || 'Please read these terms carefully before using our services',
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

  const defaultSections: Array<{type?: string; title: string; subtitle?: string; content: string; order?: number}> = [
    {
      type: 'section',
      title: 'Acceptance of Terms',
      content: 'By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.'
    },
    {
      type: 'section',
      title: 'Use License',
      content: 'Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained on our platform; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.'
    },
    {
      type: 'section',
      title: 'User Accounts',
      content: 'When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding the password and for all activities that occur under your account.'
    },
    {
      type: 'section',
      title: 'Intellectual Property',
      content: 'The service and its original content, features, and functionality are and will remain the exclusive property of Tomsher Technologies and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks may not be used in connection with any product or service without our prior written consent.'
    },
    {
      type: 'section',
      title: 'User Content',
      content: 'Our service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post on or through the service, including its legality, reliability, and appropriateness.'
    },
    {
      type: 'section',
      title: 'Prohibited Uses',
      content: 'You may not use our services: for any unlawful purpose or to solicit others to perform unlawful acts; to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; to infringe upon or violate our intellectual property rights or the intellectual property rights of others; to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; to submit false or misleading information; to upload or transmit viruses or any other type of malicious code; to collect or track the personal information of others; to spam, phish, pharm, pretext, spider, crawl, or scrape; for any obscene or immoral purpose; or to interfere with or circumvent the security features of the service.'
    },
    {
      type: 'section',
      title: 'Limitation of Liability',
      content: 'In no event shall Tomsher Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.'
    },
    {
      type: 'section',
      title: 'Disclaimer',
      content: 'Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.'
    },
    {
      type: 'section',
      title: 'Governing Law',
      content: 'These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.'
    },
    {
      type: 'section',
      title: 'Changes to Terms',
      content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.'
    },
    {
      type: 'section',
      title: 'Contact Information',
      content: 'If you have any questions about these Terms, please contact us at legal@tomsher.com or through our contact page.'
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
                          {index + 1}. {section.title}
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
                Questions About Our Terms?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                If you have any questions or concerns about our terms of service, please don't hesitate to reach out.
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
