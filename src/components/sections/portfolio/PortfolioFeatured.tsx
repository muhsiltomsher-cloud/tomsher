'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PortfolioVariantProps } from './types'

export default function PortfolioFeatured({ title, subtitle, projects }: PortfolioVariantProps) {
  return (
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
  )
}
