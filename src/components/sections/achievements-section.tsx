'use client'

import { useEffect, useState } from 'react'

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

export const AchievementsSection = () => {
  const [data, setData] = useState<AchievementsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/settings')
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
  }, [])

  if (loading || !data) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{achievement.icon}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {achievement.value}
              </div>
              <div className="text-gray-300 text-lg">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
