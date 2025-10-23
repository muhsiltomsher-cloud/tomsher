import React from 'react'
import { TeamVariantProps } from './types'

export default function TeamCards({ title, subtitle, members }: TeamVariantProps) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {members.map((member, index) => (
            <div key={index} style={{ 
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src={member.image} 
                alt={member.name}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{member.name}</h3>
                <p style={{ color: '#667eea', marginBottom: '0.5rem', fontWeight: '500' }}>{member.position}</p>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{member.bio}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  {member.social?.linkedin && <a href={member.social.linkedin} style={{ color: '#0077b5', fontSize: '1.5rem' }}>in</a>}
                  {member.social?.twitter && <a href={member.social.twitter} style={{ color: '#1da1f2', fontSize: '1.5rem' }}>𝕏</a>}
                  {member.social?.github && <a href={member.social.github} style={{ color: '#333', fontSize: '1.5rem' }}>⚡</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
