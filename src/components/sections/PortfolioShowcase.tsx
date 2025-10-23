'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface PortfolioShowcaseProps {
  data: {
    title?: string
    subtitle?: string
    projects?: Array<{
      title: string
      description: string
      category: string
      image: string
      link?: string
      technologies?: string[]
    }>
    variant?: 'grid' | 'masonry' | 'featured' | 'slider'
  }
}

export default function PortfolioShowcase({ data }: PortfolioShowcaseProps) {
  const {
    title = 'Our Work',
    subtitle = 'Portfolio',
    projects = [
      {
        title: 'E-Commerce Platform',
        description: 'Modern online shopping experience with seamless checkout',
        category: 'Web Development',
        image: '/images/portfolio/project1.jpg',
        technologies: ['Next.js', 'React', 'Stripe']
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure and intuitive banking solution',
        category: 'Mobile App',
        image: '/images/portfolio/project2.jpg',
        technologies: ['React Native', 'Node.js']
      },
      {
        title: 'Healthcare Dashboard',
        description: 'Patient management and analytics platform',
        category: 'Dashboard',
        image: '/images/portfolio/project3.jpg',
        technologies: ['Vue.js', 'Python', 'PostgreSQL']
      }
    ],
    variant = 'grid'
  } = data

  const variants = {
    grid: (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white/80 text-sm font-semibold mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),
    masonry: (
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className={`aspect-${index % 2 === 0 ? '[4/3]' : '[3/4]'} bg-gradient-to-br from-primary/20 to-secondary/20 relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-primary bg-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block w-fit">
                      {project.category}
                    </span>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/90 mb-4">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),
    featured: (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          </motion.div>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="text-primary font-semibold mb-4 block">
                    {project.category}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                    {project.title}
                  </h3>
                  <p className="text-xl text-gray-600 mb-6">
                    {project.description}
                  </p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300"
                    >
                      View Project <ArrowRight className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl shadow-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),
    slider: (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.slice(0, 2).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <span className="text-white/80 text-sm font-semibold mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-white text-3xl font-bold mb-3">
                        {project.title}
                      </h3>
                      <p className="text-white/90 mb-4">
                        {project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-300"
                        >
                          View Project <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return variants[variant] || variants.grid
}
