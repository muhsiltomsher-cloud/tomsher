'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  variant?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'none'
  delay?: number
  duration?: number
  className?: string
}

export default function ScrollAnimation({
  children,
  variant = 'fadeIn',
  delay = 0,
  duration = 0.6,
  className = '',
}: ScrollAnimationProps) {
  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 40 },
      whileInView: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -40 },
      whileInView: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
    },
    none: {
      initial: {},
      whileInView: {},
    },
  }

  const selectedVariant = variants[variant]

  return (
    <motion.div
      initial={selectedVariant.initial}
      whileInView={selectedVariant.whileInView}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
