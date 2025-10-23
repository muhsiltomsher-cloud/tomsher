'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Portfolio {
  _id: string
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  featured: boolean
  slug: string
}

export function PortfolioSection() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/admin/portfolio')
        if (response.ok) {
          const data = await response.json()
          setPortfolio(data.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [])

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Loading portfolio...</p>
          </div>
        </div>
      </section>
    )
  }

  if (portfolio.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-600">
            Explore our recent projects and see how we've helped businesses succeed online.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item) => (
            <Link 
              key={item._id} 
              href={`/portfolio/${item.slug}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden card-hover block"
            >
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20"></div>
              )}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.category}</p>
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            href="/portfolio" 
            className="btn-primary"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
