import React from 'react'
import { PricingVariantProps } from './types'

export default function PricingCards({ title, subtitle, plans }: PricingVariantProps) {
  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold', color: 'white' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {plans.map((plan, index) => (
            <div key={index} style={{ 
              padding: '2.5rem',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{plan.name}</h3>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea' }}>{plan.price}</span>
                <span style={{ fontSize: '1rem', color: '#666' }}>{plan.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left' }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ padding: '0.75rem 0', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#667eea', marginRight: '0.5rem', fontSize: '1.2rem' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%',
                padding: '1rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
