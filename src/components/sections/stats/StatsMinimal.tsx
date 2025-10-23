import React from 'react'
import { StatsVariantProps } from './types'

export default function StatsMinimal({ stats }: Omit<StatsVariantProps, 'title' | 'subtitle' | 'backgroundColor'>) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '3rem' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ textAlign: 'center', minWidth: '150px' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
