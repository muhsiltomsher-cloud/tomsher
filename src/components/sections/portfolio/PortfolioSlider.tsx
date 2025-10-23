'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { PortfolioVariantProps } from './types'

export default function PortfolioSlider({ title, subtitle, projects }: PortfolioVariantProps) {
  return (
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
