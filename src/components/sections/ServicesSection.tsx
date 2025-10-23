'use client'

import { useEffect, useState } from 'react'
import { ServicesSectionData } from './services/types'
import ServicesGrid from './services/ServicesGrid'
import ServicesCards from './services/ServicesCards'
import ServicesMinimal from './services/ServicesMinimal'

interface ServicesSectionProps {
  data: ServicesSectionData
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  const {
    title = 'Our Services',
    subtitle = 'What We Offer',
    serviceIds = [],
    variant = 'grid'
  } = data

  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      if (!serviceIds || serviceIds.length === 0) {
        setServices([
          { icon: 'code', title: 'Web Development', description: 'Custom web applications built with modern technologies' },
          { icon: 'smartphone', title: 'Mobile Apps', description: 'Native and cross-platform mobile solutions' },
          { icon: 'shopping', title: 'E-Commerce', description: 'Scalable online stores with seamless checkout' }
        ])
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/admin/services?ids=${serviceIds.join(',')}`)
        if (response.ok) {
          const data = await response.json()
          const mappedServices = data.map((service: any) => ({
            icon: service.icon || 'code',
            title: service.title,
            description: service.description
          }))
          setServices(mappedServices)
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [serviceIds])

  if (loading) {
    return <div>Loading services...</div>
  }

  const props = {
    title,
    subtitle,
    services
  }

  const variants = {
    grid: <ServicesGrid {...props} />,
    cards: <ServicesCards {...props} />,
    minimal: <ServicesMinimal {...props} />
  }

  return variants[variant] || variants.grid
}
