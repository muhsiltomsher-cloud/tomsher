'use client'

import React, { useState } from 'react'
import { FAQVariantProps } from './types'

export default function FAQAccordion({ title, subtitle, faqs }: FAQVariantProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>{subtitle}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ 
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                }}
              >
                {faq.question}
                <span style={{ 
                  fontSize: '1.5rem',
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div style={{ 
                  padding: '0 1.5rem 1.5rem',
                  color: '#666',
                  lineHeight: '1.6',
                  animation: 'fadeIn 0.3s ease'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
