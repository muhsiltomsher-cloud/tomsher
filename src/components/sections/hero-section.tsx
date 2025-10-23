'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Star,
  Users,
  Globe,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroContent {
  title: string
  highlight: string
  subtitle: string
  badge: string
  features: string[]
  ctaPrimary: string
  ctaSecondary: string
  stats: Array<{ label: string; value: string }>
}

const defaultContent: HeroContent = {
  title: 'Transform Your Business with',
  highlight: 'Innovative Web Solutions',
  subtitle: 'Leading web development company in Dubai, UAE specializing in custom website development, eCommerce solutions, and digital marketing services.',
  badge: '#1 Web Development Company in Dubai',
  features: [
    'Custom Web Development',
    'E-commerce Solutions', 
    'Digital Marketing',
    'Mobile App Development'
  ],
  stats: [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Happy Clients', value: '300+' },
    { label: 'Countries Served', value: '30+' },
    { label: 'Years Experience', value: '10+' }
  ],
  ctaPrimary: 'Get Started Today',
  ctaSecondary: 'View Our Work'
}

export function HeroSection() {
  const [content, setContent] = useState<HeroContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.homeHero) {
            setContent({
              title: data.homeHero.title || defaultContent.title,
              highlight: data.homeHero.highlight || defaultContent.highlight,
              subtitle: data.homeHero.subtitle || defaultContent.subtitle,
              badge: data.homeHero.badge || defaultContent.badge,
              features: data.homeHero.features || defaultContent.features,
              ctaPrimary: data.homeHero.ctaPrimary || defaultContent.ctaPrimary,
              ctaSecondary: data.homeHero.ctaSecondary || defaultContent.ctaSecondary,
              stats: data.homeHero.stats && data.homeHero.stats.length > 0 
                ? data.homeHero.stats 
                : defaultContent.stats,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching hero content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Award className="h-4 w-4" />
              <span>{content.badge}</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {content.title}{' '}
                <span className="gradient-text">{content.highlight}</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                {content.subtitle}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  {content.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/portfolio">
                  <Play className="mr-2 h-5 w-5" />
                  {content.ctaSecondary}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Web Development</h3>
                <p className="text-gray-600">Creating digital experiences that matter</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
