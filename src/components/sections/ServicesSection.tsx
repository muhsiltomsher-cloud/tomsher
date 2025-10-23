'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, ShoppingCart, Palette, TrendingUp, Cloud } from 'lucide-react'

interface ServicesSectionProps {
  data: {
    title?: string
    subtitle?: string
    services?: Array<{
      icon: string
      title: string
      description: string
    }>
    variant?: 'grid' | 'cards' | 'minimal'
  }
}

const iconMap: Record<string, any> = {
  code: Code,
  smartphone: Smartphone,
  shopping: ShoppingCart,
  palette: Palette,
  trending: TrendingUp,
  cloud: Cloud
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  const {
    title = 'Our Services',
    subtitle = 'What We Offer',
    services = [
      { icon: 'code', title: 'Web Development', description: 'Custom web applications built with modern technologies' },
      { icon: 'smartphone', title: 'Mobile Apps', description: 'Native and cross-platform mobile solutions' },
      { icon: 'shopping', title: 'E-Commerce', description: 'Scalable online stores with seamless checkout' },
      { icon: 'palette', title: 'UI/UX Design', description: 'Beautiful and intuitive user experiences' },
      { icon: 'trending', title: 'Digital Marketing', description: 'Data-driven strategies to grow your business' },
      { icon: 'cloud', title: 'Cloud Solutions', description: 'Scalable infrastructure and deployment' }
    ],
    variant = 'grid'
  } = data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const variants = {
    grid: (
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    ),
    cards: (
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    ),
    minimal: (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <p className="text-primary font-semibold mb-4">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    )
  }

  return variants[variant] || variants.grid
}
