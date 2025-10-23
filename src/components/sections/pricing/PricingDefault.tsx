import React from 'react'
import { PricingVariantProps } from './types'

export default function PricingDefault({ title, subtitle, plans }: PricingVariantProps) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {plans.map((plan, index) => (
            <div key={index} style={{ 
              padding: '2.5rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: plan.highlighted ? '0 8px 30px rgba(102, 126, 234, 0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
              border: plan.highlighted ? '2px solid #667eea' : 'none',
              transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
              position: 'relative' as const,
            }}>
              {plan.highlighted && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#667eea',
                  color: 'white',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                }}>
                  MOST POPULAR
                </div>
              )}
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{plan.name}</h3>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea' }}>{plan.price}</span>
                <span style={{ fontSize: '1rem', color: '#666' }}>{plan.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', textAlign: 'left' }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#667eea', marginRight: '0.5rem', fontSize: '1.2rem' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%',
                padding: '1rem',
                background: plan.highlighted ? '#667eea' : 'white',
                color: plan.highlighted ? 'white' : '#667eea',
                border: `2px solid #667eea`,
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
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
