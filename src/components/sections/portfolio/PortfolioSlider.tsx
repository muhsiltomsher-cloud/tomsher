'use client'

import { ExternalLink } from 'lucide-react'
import { PortfolioVariantProps } from './types'

export default function PortfolioSlider({ title, subtitle, projects }: PortfolioVariantProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white smooth-transition hover:shadow-3xl hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="text-white/80 text-sm font-semibold mb-3 transition-colors duration-300">
                      {project.category}
                    </span>
                    <h3 className="text-white text-3xl font-bold mb-3 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/90 mb-4 transition-colors duration-300">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-white font-semibold smooth-transition hover:gap-4"
                      >
                        View Project <ExternalLink className="h-5 w-5 transition-transform duration-300" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
