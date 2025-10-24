'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ClientLogo {
  id: number
  name: string
  logo: string
  industry: string
}

const defaultClientLogos: ClientLogo[] = [
  { id: 1, name: 'UAE Ministry of Defense', logo: '/images/logos/uae-ministry-of-defense.png', industry: 'Government' },
  { id: 2, name: 'Arla', logo: '/images/logos/8.png', industry: 'Dairy' },
  { id: 3, name: 'Masafi', logo: '/images/logos/masafi.png', industry: 'Beverage' },
  { id: 4, name: 'Etihad', logo: '/images/logos/16.png', industry: 'Aviation' },
  { id: 5, name: 'Schlumberger', logo: '/images/logos/2.png', industry: 'Oil & Gas' },
  { id: 6, name: 'Time House', logo: '/images/logos/time-house.png', industry: 'Retail' },
  { id: 7, name: 'De Montfort University', logo: '/images/logos/3.png', industry: 'Education' },
  { id: 8, name: 'Medicliq', logo: '/images/logos/4.png', industry: 'Healthcare' },
  { id: 9, name: 'Toshiba', logo: '/images/logos/24.png', industry: 'Technology' },
  { id: 10, name: 'Malabar Gold', logo: '/images/logos/1.png', industry: 'Jewelry' },
  { id: 11, name: 'Kioxia', logo: '/images/logos/7.png', industry: 'Technology' },
  { id: 12, name: 'Medon', logo: '/images/logos/6.jpg', industry: 'Pharmaceutical' },
  { id: 13, name: 'FIS', logo: '/images/logos/9.png', industry: 'Finance' },
  { id: 14, name: 'Al Wasl Sports Club', logo: '/images/logos/10.png', industry: 'Sports' },
]

interface ClientsSectionProps {
  data?: {
    title?: string
    subtitle?: string
    description?: string
    activeClients?: string
    countriesServed?: string
    showOnHomePage?: boolean
    clients?: ClientLogo[]
  }
}

const ClientsSection = ({ data }: ClientsSectionProps) => {
  const clientLogos = data?.clients || defaultClientLogos
  const title = data?.title || 'Our Clients'
  const subtitle = data?.subtitle || 'Trusted by Industry Leaders Worldwide'
  const description = data?.description || "We've helped companies of all sizes achieve their digital transformation goals."
  const activeClients = data?.activeClients || '250+'
  const countriesServed = data?.countriesServed || '30+'
  const clientCount = clientLogos.length

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="space-y-16">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-8 space-y-6">
              <p className="text-base md:text-lg font-semibold text-primary">
                {title}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-snug">
                {subtitle.split('Industry Leaders').map((part, index) => (
                  index === 0 ? (
                    <span key={index}>{part}</span>
                  ) : (
                    <span key={index}>
                      <span className="text-primary">Industry Leaders</span>
                      {part}
                    </span>
                  )
                ))}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                {description}
              </p>
              <p className="text-base text-gray-500 mt-2">
                Showcasing {clientCount} trusted partners
              </p>
            </div>

            <div className="md:col-span-4 flex items-center">
              <div className="space-y-6 w-full">
                <div className="text-center backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-lg">
                  <span className="block text-4xl md:text-5xl font-light text-primary mb-1">{activeClients}</span>
                  <span className="text-sm md:text-base text-gray-600">Active Clients</span>
                </div>
                <div className="text-center backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-lg">
                  <span className="block text-4xl md:text-5xl font-light text-primary mb-1">{countriesServed}</span>
                  <span className="text-sm md:text-base text-gray-600">Countries Served</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6">
            {clientLogos.map((client) => (
              <div key={client.id} className="relative aspect-square">
                <div className="absolute inset-0 backdrop-blur-md bg-white/90 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Trust Banner */}
          <div className="text-center space-y-4 mt-10 md:mt-16">
            <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider">Industry Recognition</p>
            <div className="flex flex-wrap items-center justify-center gap-2 px-4 text-center">
              <div className="h-1 w-10 sm:w-12 bg-primary/20 rounded-full" />
              <p className="text-base sm:text-lg text-gray-600 font-light">
                Recognized as a trusted partner by leading industry analysts
              </p>
              <div className="h-1 w-10 sm:w-12 bg-primary/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientsSection
