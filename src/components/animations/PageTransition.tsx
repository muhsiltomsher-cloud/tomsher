'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  variant?: 'fade' | 'slide' | 'scale' | 'none'
}

export default function PageTransition({ children, variant = 'fade' }: PageTransitionProps) {
  const pathname = usePathname()

  const variantClasses = {
    fade: 'animate-fade-in',
    slide: 'animate-slide-in',
    scale: 'animate-scale-in',
    none: '',
  }

  const selectedClass = variantClasses[variant]

  return (
    <div key={pathname} className={selectedClass}>
      {children}
    </div>
  )
}
