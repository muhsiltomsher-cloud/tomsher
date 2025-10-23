'use client'

import React, { useState } from 'react'
import { NewsletterVariantProps } from './types'

export default function NewsletterGradient({ title, subtitle, placeholder, buttonText }: Omit<NewsletterVariantProps, 'backgroundColor'>) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter-section' }),
      })
      
      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section style={{ 
      padding: '80px 20px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>{subtitle}</p>
        
        {status === 'success' ? (
          <div style={{ 
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)'
          }}>
            🎉 Thank you for subscribing! Check your email for confirmation.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ 
            display: 'flex', 
            gap: '1rem', 
            maxWidth: '500px', 
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              style={{
                flex: '1',
                minWidth: '250px',
                padding: '1rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '1rem 2rem',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? 'Subscribing...' : buttonText}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
