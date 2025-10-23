'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { FeaturesVariantProps } from './types'
import { iconMap } from './iconMap'

export default function FeaturesHighlight({ title, subtitle, features }: FeaturesVariantProps) {
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
