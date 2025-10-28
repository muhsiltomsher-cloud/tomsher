import React from 'react'
import { FAQVariantProps } from './types'

export default function FAQGrid({ title, subtitle, faqs }: FAQVariantProps) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
          <p style={{ color: '#666' }}>{subtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ 
              padding: '2rem',
              background: '#f8f9fa',
              borderRadius: '12px',
              borderLeft: '4px solid #667eea'
            }}>
              <h3 style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#333' }}>
                {typeof faq.question === 'string' ? faq.question : ''}
              </h3>
              <div 
                style={{ color: '#666', lineHeight: '1.6' }}
                dangerouslySetInnerHTML={{ 
                  __html: typeof faq.answer === 'string' ? faq.answer : '' 
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
