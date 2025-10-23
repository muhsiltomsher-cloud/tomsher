import React from 'react';

interface StatsSectionProps {
  variant?: 'default' | 'gradient' | 'minimal' | 'cards';
  stats?: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}

export default function StatsSection({
  variant = 'default',
  stats = [
    { value: '500+', label: 'Projects Completed', icon: '🚀' },
    { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { value: '50+', label: 'Team Members', icon: '👥' },
    { value: '10+', label: 'Years Experience', icon: '📅' },
  ],
  title = 'Our Impact in Numbers',
  subtitle = 'Trusted by leading companies worldwide',
  backgroundColor = '#f8f9fa',
}: StatsSectionProps) {
  const renderDefault = () => (
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
  );

  const renderGradient = () => (
    <section style={{ 
      padding: '80px 20px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderMinimal = () => (
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
  );

  const renderCards = () => (
    <section style={{ padding: '80px 20px', backgroundColor }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              padding: '2.5rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1.1rem', color: '#666' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  switch (variant) {
    case 'gradient': return renderGradient();
    case 'minimal': return renderMinimal();
    case 'cards': return renderCards();
    default: return renderDefault();
  }
}
