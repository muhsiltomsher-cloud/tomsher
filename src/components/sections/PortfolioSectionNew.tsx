'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface PortfolioItem {
  id: number
  title: string
  category: string
  industry?: string
  image: string
  description: string
  link: string
}

const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'E-commerce Revolution',
    category: 'Web Development',
    industry: 'Retail',
    image: '/images/portfolio/project1.webp',
    description: 'A cutting-edge e-commerce platform with seamless user experience',
    link: '/'
  },
  {
    id: 2,
    title: 'Healthcare Portal',
    category: 'UI/UX Design',
    industry: 'Healthcare',
    image: '/images/portfolio/project2.webp',
    description: 'Modern healthcare management system with intuitive interface',
    link: '/'
  },
  {
    id: 3,
    title: 'Fintech Dashboard',
    category: 'Web Application',
    industry: 'Finance',
    image: '/images/portfolio/project3.webp',
    description: 'Real-time financial data visualization platform',
    link: '/'
  },
  {
    id: 4,
    title: 'Travel App',
    category: 'Mobile Design',
    industry: 'Travel',
    image: '/images/portfolio/project4.webp',
    description: 'Interactive travel planning application with AI integration',
    link: '/'
  },
  {
    id: 5,
    title: 'Restaurant Website',
    category: 'Web Design',
    industry: 'Food & Beverage',
    image: '/images/portfolio/project5.webp',
    description: 'Immersive dining experience platform with online ordering',
    link: '/'
  }
]

interface PortfolioSectionNewProps {
  data?: {
    title?: string
    subtitle?: string
    description?: string
    items?: PortfolioItem[]
  }
}

const PortfolioSectionNew = ({ data }: PortfolioSectionNewProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const portfolioItems = data?.items || defaultPortfolioItems
  const title = data?.title || 'Portfolio'
  const subtitle = data?.subtitle || 'Crafting Digital Experiences That Leave Lasting Impressions'
  const description = data?.description || 'Explore our diverse portfolio of innovative digital solutions. Each project represents our commitment to excellence in design, functionality, and user experience.'
  const portfolioCount = portfolioItems.length

  return (
    <section className="bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="container mx-auto px-4 py-[100px]">
        <div className="space-y-16">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-block">
                <p className="text-[18px] font-semibold text-secondary leading-tight relative">
                  {title}
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </p>
              </div>
              <h2 className="text-5xl font-light text-white leading-tight">
                {subtitle.split('Experiences').map((part, index) => (
                  index === 0 ? (
                    <span key={index}>{part}</span>
                  ) : (
                    <span key={index}>
                      <span className="text-secondary">Experiences</span>
                      {part}
                    </span>
                  )
                ))}
              </h2>
            </div>
            <div className="lg:pt-10">
              <p className="text-xl leading-relaxed text-gray-300">
                {description}
              </p>
              <p className="text-base text-gray-400 mt-4">
                Showcasing {portfolioCount} innovative projects
              </p>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {/* First Row - Two Equal Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 col-span-1 xl:col-span-2">
              {portfolioItems.slice(0, 2).map((item) => (
                <div key={item.id} className="relative overflow-hidden rounded-xl aspect-[4/3] group">
                  <a
                    href={item.link}
                    className="w-full h-full relative block"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <div
                      className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <div className="flex gap-3 justify-start items-center mb-3">
                        <div className="w-max bg-white/10 rounded-full px-4 py-2 inline-block">
                          <span className="text-white text-sm font-medium whitespace-nowrap">{item.category}</span>
                        </div>
                        <div className="w-max bg-white/10 rounded-full px-4 py-2 inline-block">
                          <span className="text-white text-sm font-medium whitespace-nowrap">{item.industry || 'Industry Not Specified'}</span>
                        </div>
                      </div>
                      <h3 className="text-white text-xl font-medium mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Second Row - Three Equal Items */}
            {portfolioItems.slice(2).map((item) => (
              <div key={item.id} className="relative overflow-hidden rounded-xl aspect-[4/3] group">
                <a
                  href={item.link}
                  className="w-full h-full relative block"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="flex gap-3 justify-start items-center mb-3">
                      <div className="w-max bg-white/10 rounded-full px-4 py-2 inline-block">
                        <span className="text-white text-sm font-medium whitespace-nowrap">{item.category}</span>
                      </div>
                      <div className="w-max bg-white/10 rounded-full px-4 py-2 inline-block">
                        <span className="text-white text-sm font-medium whitespace-nowrap">{item.industry || 'Industry Not Specified'}</span>
                      </div>
                    </div>
                    <h3 className="text-white text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="pt-2 mx-auto text-center">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-lg">
              View All Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSectionNew
