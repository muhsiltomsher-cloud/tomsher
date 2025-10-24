'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Client {
  name: string
  logo: string
  website?: string
}

interface ClientsData {
  title: string
  subtitle: string
  showOnHomePage: boolean
  clients: Client[]
}

export const ClientsSection = () => {
  const [data, setData] = useState<ClientsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/settings')
        if (response.ok) {
          const settings = await response.json()
          if (settings.length > 0 && settings[0].homeClients) {
            setData(settings[0].homeClients)
          }
        }
      } catch (error) {
        console.error('Error fetching clients data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading || !data || !data.showOnHomePage || data.clients.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {data.clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              {client.website ? (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-20 grayscale group-hover:grayscale-0 transition-all duration-300"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </a>
              ) : (
                <div className="relative w-full h-20 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
