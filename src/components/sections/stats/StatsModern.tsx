import React from 'react'
import { StatsVariantProps } from './types'

export default function StatsModern({ title, subtitle, stats }: Omit<StatsVariantProps, 'backgroundColor'>) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              color: 'white',
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
