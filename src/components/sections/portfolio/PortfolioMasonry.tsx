'use client'

import { PortfolioVariantProps } from './types'

export default function PortfolioMasonry({ title, subtitle, projects }: PortfolioVariantProps) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in">
          <p className="text-primary font-semibold mb-4 transition-colors duration-300">{subtitle}</p>
          <h2 className="text-4xl lg:text-5xl font-bold transition-colors duration-300">{title}</h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl smooth-transition bg-white animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`aspect-${index % 2 === 0 ? '[4/3]' : '[3/4]'} bg-gradient-to-br from-primary/20 to-secondary/20 relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-primary bg-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block w-fit smooth-transition hover:scale-110">
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold mb-2 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/90 mb-4 transition-colors duration-300">
                    {project.description}
                  </p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
