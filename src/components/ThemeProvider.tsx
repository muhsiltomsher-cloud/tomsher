'use client';

import { useEffect, useState } from 'react';

interface TypographySettings {
  baseFontSize?: string;
  headingFontWeight?: string;
  bodyFontWeight?: string;
  h1Size?: string;
  h2Size?: string;
  h3Size?: string;
  h4Size?: string;
  h5Size?: string;
  h6Size?: string;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [typography, setTypography] = useState<TypographySettings>({});

  useEffect(() => {
    const fetchTypography = async () => {
      try {
        const response = await fetch('/api/settings/typography');
        if (response.ok) {
          const data = await response.json();
          setTypography(data);
          applyTypography(data);
        }
      } catch (error) {
        console.error('Error fetching typography settings:', error);
        applyTypography({
          baseFontSize: '16px',
          bodyFontWeight: '400',
          headingFontWeight: '700',
          h1Size: '3rem',
          h2Size: '2.25rem',
          h3Size: '1.875rem',
          h4Size: '1.5rem',
          h5Size: '1.25rem',
          h6Size: '1rem',
        });
      }
    };

    fetchTypography();
  }, []);

  const applyTypography = (settings: TypographySettings) => {
    const root = document.documentElement;
    
    if (settings.baseFontSize) {
      root.style.setProperty('--font-size-base', settings.baseFontSize);
    }
    if (settings.bodyFontWeight) {
      root.style.setProperty('--font-weight-body', settings.bodyFontWeight);
    }
    if (settings.headingFontWeight) {
      root.style.setProperty('--font-weight-heading', settings.headingFontWeight);
    }
    if (settings.h1Size) {
      root.style.setProperty('--font-size-h1', settings.h1Size);
    }
    if (settings.h2Size) {
      root.style.setProperty('--font-size-h2', settings.h2Size);
    }
    if (settings.h3Size) {
      root.style.setProperty('--font-size-h3', settings.h3Size);
    }
    if (settings.h4Size) {
      root.style.setProperty('--font-size-h4', settings.h4Size);
    }
    if (settings.h5Size) {
      root.style.setProperty('--font-size-h5', settings.h5Size);
    }
    if (settings.h6Size) {
      root.style.setProperty('--font-size-h6', settings.h6Size);
    }
  };

  return <>{children}</>;
}
