import React from 'react'
import { StatsVariantProps } from './types'

export default function StatsDefault({ title, subtitle, stats, backgroundColor = '#f8f9fa' }: StatsVariantProps) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1.1rem', color: '#666' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
