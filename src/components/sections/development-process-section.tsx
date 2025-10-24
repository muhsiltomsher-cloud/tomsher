'use client'

import { useEffect, useState } from 'react'

interface ProcessStep {
  number: string
  title: string
  description: string
  icon?: string
}

interface DevelopmentProcessData {
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export const DevelopmentProcessSection = () => {
  const [data, setData] = useState<DevelopmentProcessData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/settings')
        if (response.ok) {
          const settings = await response.json()
          if (settings.length > 0 && settings[0].homeDevelopmentProcess) {
            setData(settings[0].homeDevelopmentProcess)
          }
        }
      } catch (error) {
        console.error('Error fetching development process data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading || !data) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.steps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              {step.icon && (
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (except for last item) */}
              {index < data.steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
