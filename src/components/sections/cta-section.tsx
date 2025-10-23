'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface CTAContent {
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
}

const defaultContent: CTAContent = {
  title: 'Ready to Start Your Project?',
  subtitle: "Let's discuss your requirements and create a solution that drives results for your business.",
  ctaPrimary: 'Get Started Today',
  ctaSecondary: 'View Our Work'
}

export function CTASection() {
  const [content, setContent] = useState<CTAContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.homeCTA) {
            setContent({
              title: data.homeCTA.title || defaultContent.title,
              subtitle: data.homeCTA.subtitle || defaultContent.subtitle,
              ctaPrimary: data.homeCTA.ctaPrimary || defaultContent.ctaPrimary,
              ctaSecondary: data.homeCTA.ctaSecondary || defaultContent.ctaSecondary,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching CTA content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return (
    <section className="section-padding bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          {content.title}
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          {content.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              {content.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">
              {content.ctaSecondary}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
