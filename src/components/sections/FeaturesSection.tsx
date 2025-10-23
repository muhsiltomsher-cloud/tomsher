'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Shield, Users, TrendingUp, Award, Target } from 'lucide-react'

interface FeaturesSectionProps {
  data: {
    title?: string
    subtitle?: string
    features?: Array<{
      icon: string
      title: string
      description: string
    }>
    variant?: 'grid' | 'cards' | 'list' | 'highlight'
  }
}

const iconMap: Record<string, any> = {
  check: Check,
  star: Star,
  zap: Zap,
  shield: Shield,
  users: Users,
  trending: TrendingUp,
  award: Award,
  target: Target
}

export default function FeaturesSection({ data }: FeaturesSectionProps) {
  const {
    title = 'Why Choose Us',
    subtitle = 'Our Features',
    features = [
      { icon: 'check', title: 'Quality Assurance', description: 'We ensure the highest quality in every project' },
      { icon: 'zap', title: 'Fast Delivery', description: 'Quick turnaround without compromising quality' },
      { icon: 'shield', title: 'Secure & Reliable', description: 'Your data security is our top priority' },
      { icon: 'users', title: 'Expert Team', description: 'Experienced professionals dedicated to your success' },
      { icon: 'trending', title: 'Scalable Solutions', description: 'Built to grow with your business' },
      { icon: 'award', title: 'Award Winning', description: 'Recognized for excellence in our industry' }
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
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Check
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-6"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    ),
    cards: (
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
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Check
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    ),
    list: (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-semibold mb-4">{subtitle}</p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
              <p className="text-xl text-gray-600">
                Discover what makes us the perfect choice for your next project
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Check
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>
    ),
    highlight: (
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Check
              const isHighlighted = index === 0 || index === 3
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`p-8 rounded-2xl ${
                    isHighlighted
                      ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-2xl'
                      : 'bg-white shadow-lg'
                  } hover:scale-105 transition-transform duration-300`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    isHighlighted ? 'bg-white/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={`h-7 w-7 ${isHighlighted ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className={isHighlighted ? 'text-white/90' : 'text-gray-600'}>
                    {feature.description}
                  </p>
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
