import React from 'react';

interface TeamSectionProps {
  variant?: 'grid' | 'cards' | 'minimal' | 'carousel';
  members?: Array<{
    name: string;
    position: string;
    image: string;
    bio?: string;
    social?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  }>;
  title?: string;
  subtitle?: string;
}

export default function TeamSection({
  variant = 'grid',
  members = [
    {
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: '15+ years in tech leadership',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Michael Chen',
      position: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Expert in scalable architecture',
      social: { linkedin: '#', github: '#' }
    },
    {
      name: 'Emily Rodriguez',
      position: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'Award-winning UX designer',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'David Kim',
      position: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      bio: 'Full-stack development expert',
      social: { github: '#', linkedin: '#' }
    },
  ],
  title = 'Meet Our Team',
  subtitle = 'Talented individuals driving innovation',
}: TeamSectionProps) {
  const renderGrid = () => (
    <section style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {members.map((member, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <img 
                src={member.image} 
                alt={member.name}
                style={{ 
                  width: '200px', 
                  height: '200px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  marginBottom: '1rem',
                  border: '4px solid white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{member.name}</h3>
              <p style={{ color: '#667eea', marginBottom: '0.5rem', fontWeight: '500' }}>{member.position}</p>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{member.bio}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                {member.social?.linkedin && <a href={member.social.linkedin} style={{ color: '#0077b5', fontSize: '1.5rem' }}>in</a>}
                {member.social?.twitter && <a href={member.social.twitter} style={{ color: '#1da1f2', fontSize: '1.5rem' }}>𝕏</a>}
                {member.social?.github && <a href={member.social.github} style={{ color: '#333', fontSize: '1.5rem' }}>⚡</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderCards = () => (
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
  );

  switch (variant) {
    case 'cards': return renderCards();
    default: return renderGrid();
  }
}
