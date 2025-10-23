'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Users, Award, Globe, Target } from 'lucide-react'

interface AboutContent {
  title: string
  highlight: string
  description: string
  features: Array<{ title: string; description: string; icon: string }>
  stats: Array<{ number: string; label: string }>
}

const iconMap: Record<string, any> = {
  Users,
  Award,
  Globe,
  Target,
  CheckCircle,
}

const defaultContent: AboutContent = {
  title: 'About',
  highlight: 'Tomsher Technologies',
  description: 'Tomsher is a leading web development company in Dubai, specializing in affordable website creation and custom eCommerce website development services in Dubai and UAE. We have been working with multinational, semi-government, corporate, SME and start-up companies from Middle East, Africa, Asia, Europe and America.',
  features: [
    {
      icon: 'Users',
      title: '0% Outsourcing Policy',
      description: 'We are a fully in-house team with experienced professionals'
    },
    {
      icon: 'Award',
      title: 'World-class Services',
      description: 'Advanced technologies and proven methodologies'
    },
    {
      icon: 'Globe',
      title: 'Global Reach',
      description: 'Serving clients across 30+ countries worldwide'
    },
    {
      icon: 'Target',
      title: 'Results Driven',
      description: 'Focused on delivering measurable business outcomes'
    }
  ],
  stats: [
    { number: '500+', label: 'Projects Completed' },
    { number: '300+', label: 'Happy Clients' },
    { number: '30+', label: 'Countries Served' },
    { number: '10+', label: 'Years Experience' }
  ]
}

export function AboutSection() {
  const [content, setContent] = useState<AboutContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.homeAbout) {
            setContent({
              title: data.homeAbout.title || defaultContent.title,
              highlight: data.homeAbout.highlight || defaultContent.highlight,
              description: data.homeAbout.description || defaultContent.description,
              features: data.homeAbout.features && data.homeAbout.features.length > 0 
                ? data.homeAbout.features 
                : defaultContent.features,
              stats: data.homeAbout.stats && data.homeAbout.stats.length > 0 
                ? data.homeAbout.stats 
                : defaultContent.stats,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                {content.title} <span className="gradient-text">{content.highlight}</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {content.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {content.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Users
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200"
            >
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl p-8 min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Team</h3>
                  <p className="text-gray-600 max-w-sm">
                    Our passionate & experienced web development and digital marketing team 
                    provide world-class services with advanced technologies.
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quality Assured</div>
                    <div className="text-sm text-gray-600">100% Satisfaction</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Award Winning</div>
                    <div className="text-sm text-gray-600">Industry Recognition</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
