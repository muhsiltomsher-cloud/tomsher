'use client'

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
  const variantClasses = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-in',
    slideLeft: 'animate-slide-in',
    slideRight: 'animate-slide-in',
    scale: 'animate-scale-in',
    none: '',
  }

  const selectedClass = variantClasses[variant]

  return (
    <div
      className={`${selectedClass} ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    >
      {children}
    </div>
  )
}
