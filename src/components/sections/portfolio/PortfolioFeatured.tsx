'use client'

import { ArrowRight } from 'lucide-react'
import { PortfolioVariantProps } from './types'

export default function PortfolioFeatured({ title, subtitle, projects }: PortfolioVariantProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="text-primary font-semibold mb-4 block transition-colors duration-300">
                  {project.category}
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold mb-6 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xl text-gray-600 mb-6 transition-colors duration-300">
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium smooth-transition hover:bg-primary hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold smooth-transition hover:gap-4"
                  >
                    View Project <ArrowRight className="h-5 w-5 transition-transform duration-300" />
                  </a>
                )}
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl shadow-2xl smooth-transition hover:shadow-3xl hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
