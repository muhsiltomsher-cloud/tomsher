import React from 'react';

interface PricingSectionProps {
  variant?: 'default' | 'cards' | 'comparison' | 'toggle';
  plans?: Array<{
    name: string;
    price: string;
    period: string;
    features: string[];
    highlighted?: boolean;
    buttonText?: string;
  }>;
  title?: string;
  subtitle?: string;
}

export default function PricingSection({
  variant = 'default',
  plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: ['5 Projects', '10GB Storage', 'Basic Support', 'API Access'],
      buttonText: 'Get Started',
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced API', 'Custom Domain'],
      highlighted: true,
      buttonText: 'Start Free Trial',
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      features: ['Unlimited Everything', '1TB Storage', '24/7 Support', 'Dedicated Manager', 'Custom Integration', 'SLA Guarantee'],
      buttonText: 'Contact Sales',
    },
  ],
  title = 'Simple, Transparent Pricing',
  subtitle = 'Choose the perfect plan for your needs',
}: PricingSectionProps) {
  const renderDefault = () => (
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
  );

  const renderCards = () => (
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
  );

  switch (variant) {
    case 'cards': return renderCards();
    default: return renderDefault();
  }
}
