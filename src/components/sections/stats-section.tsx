'use client'

import { useState, useEffect } from 'react'

interface StatsContent {
  title: string
  subtitle: string
  stats: Array<{ label: string; value: string; icon?: string }>
}

const defaultContent: StatsContent = {
  title: 'Our Achievements',
  subtitle: 'Numbers that speak for themselves',
  stats: [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Happy Clients', value: '300+' },
    { label: 'Countries Served', value: '30+' },
    { label: 'Years Experience', value: '10+' }
  ]
}

export function StatsSection() {
  const [content, setContent] = useState<StatsContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          if (data.homeStats) {
            setContent({
              title: data.homeStats.title || defaultContent.title,
              subtitle: data.homeStats.subtitle || defaultContent.subtitle,
              stats: data.homeStats.stats && data.homeStats.stats.length > 0 
                ? data.homeStats.stats 
                : defaultContent.stats,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching stats content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  if (loading || content.stats.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container mx-auto px-4">
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.title && (
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">{content.title}</h2>
            )}
            {content.subtitle && (
              <p className="text-lg text-primary-foreground/80">{content.subtitle}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {content.stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
