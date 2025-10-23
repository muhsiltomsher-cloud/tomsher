import React, { useState } from 'react';

interface NewsletterSectionProps {
  variant?: 'default' | 'minimal' | 'gradient' | 'split';
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  backgroundColor?: string;
}

export default function NewsletterSection({
  variant = 'default',
  title = 'Stay Updated',
  subtitle = 'Subscribe to our newsletter for the latest updates and insights',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  backgroundColor = '#f8f9fa',
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter-section' }),
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const renderDefault = () => (
    <section style={{ padding: '80px 20px', backgroundColor }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>{subtitle}</p>
        
        {status === 'success' ? (
          <div style={{ 
            padding: '2rem',
            background: '#d4edda',
            color: '#155724',
            borderRadius: '12px',
            fontSize: '1.1rem'
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
                border: '2px solid #e9ecef',
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
                background: '#667eea',
                color: 'white',
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
        
        {status === 'error' && (
          <p style={{ color: '#dc3545', marginTop: '1rem' }}>
            Something went wrong. Please try again.
          </p>
        )}
        
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
          No spam, unsubscribe at any time.
        </p>
      </div>
    </section>
  );

  const renderGradient = () => (
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
  );

  switch (variant) {
    case 'gradient': return renderGradient();
    default: return renderDefault();
  }
}
