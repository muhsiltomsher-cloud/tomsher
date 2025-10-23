import React, { useState } from 'react';

interface FAQSectionProps {
  variant?: 'accordion' | 'grid' | 'minimal';
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  variant = 'accordion',
  faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer comprehensive web development, mobile app development, UI/UX design, and digital marketing services tailored to your business needs.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications may take 3-6 months. We provide detailed timelines during consultation.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'We offer flexible pricing based on project scope. We provide transparent quotes after understanding your requirements and offer both fixed-price and hourly rate options.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes! We offer maintenance packages including updates, security patches, performance monitoring, and technical support to keep your project running smoothly.'
    },
    {
      question: 'Can you work with existing projects?',
      answer: 'Absolutely! We can take over existing projects, perform audits, implement improvements, and provide ongoing development and maintenance.'
    },
  ],
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const renderAccordion = () => (
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
  );

  const renderGrid = () => (
    <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>{subtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ 
              padding: '2rem',
              background: '#f8f9fa',
              borderRadius: '12px',
              borderLeft: '4px solid #667eea'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 'bold', color: '#333' }}>
                {faq.question}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  switch (variant) {
    case 'grid': return renderGrid();
    default: return renderAccordion();
  }
}
