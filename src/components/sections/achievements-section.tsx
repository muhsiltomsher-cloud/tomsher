'use client'

import { useEffect, useState, useRef } from 'react'

interface Achievement {
  icon: string
  value: string
  label: string
}

interface AchievementsData {
  title: string
  subtitle: string
  achievements: Achievement[]
}

interface AchievementsSectionProps {
  data?: AchievementsData
}

function useCountUp(end: number, duration: number = 1200, isInView: boolean = false) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      setCount(end)
      setHasAnimated(true)
      return
    }

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setHasAnimated(true)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isInView, hasAnimated])

  return count
}

function parseValue(value: string): { number: number; suffix: string } {
  const cleaned = value.replace(/,/g, '').trim()
  const match = cleaned.match(/^([\d.]+)(.*)$/)
  
  if (match) {
    return {
      number: parseFloat(match[1]),
      suffix: match[2].trim()
    }
  }
  
  return { number: 0, suffix: value }
}

function AchievementCard({ achievement, index, isInView }: { achievement: Achievement; index: number; isInView: boolean }) {
  const { number, suffix } = parseValue(achievement.value)
  const displayCount = useCountUp(number, 1200, isInView)
  
  const isNumeric = !isNaN(number) && number > 0
  const displayValue = isNumeric 
    ? `${displayCount.toLocaleString()}${suffix}`
    : achievement.value

  return (
    <div
      className="group relative text-center p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
      </div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 mb-6 ring-1 ring-white/10 shadow-[0_0_0_8px_rgba(255,255,255,0.03)] transition-transform duration-300 group-hover:scale-110">
          <span className="text-5xl">{achievement.icon}</span>
        </div>
        
        <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
          {displayValue}
        </div>
        
        <div className="text-gray-300 text-lg font-medium">{achievement.label}</div>
      </div>
    </div>
  )
}

export const AchievementsSection = ({ data: propData }: AchievementsSectionProps = {}) => {
  const [data, setData] = useState<AchievementsData | null>(propData || null)
  const [loading, setLoading] = useState(!propData)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (propData) {
      setData(propData)
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/settings')
        if (response.ok) {
          const settings = await response.json()
          if (settings.length > 0 && settings[0].homeAchievements) {
            setData(settings[0].homeAchievements)
          }
        }
      } catch (error) {
        console.error('Error fetching achievements data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [propData])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isInView])

  if (loading || !data) {
    return null
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes aurora {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: rotate(180deg) scale(1.1);
            opacity: 0.2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(59,130,246,0.15),transparent)] opacity-60" />
        
        <div 
          className="absolute -top-1/3 -left-1/3 w-[80vw] h-[80vw] bg-[conic-gradient(from_0deg,rgba(99,102,241,0.25),transparent_30%,rgba(59,130,246,0.2))] blur-3xl opacity-30"
          style={{
            animation: 'aurora 30s linear infinite',
          }}
        />
        
        <div 
          className="absolute -bottom-1/3 -right-1/3 w-[80vw] h-[80vw] bg-[conic-gradient(from_180deg,rgba(168,85,247,0.25),transparent_30%,rgba(236,72,153,0.2))] blur-3xl opacity-30"
          style={{
            animation: 'aurora 40s linear infinite reverse',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {data.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {data.achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                achievement={achievement}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
