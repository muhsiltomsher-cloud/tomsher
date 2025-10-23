'use client';

import { useEffect } from 'react';

export default function TypographyLoader() {
  useEffect(() => {
    const loadTypography = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const settings = await response.json();
          console.log('Typography settings loaded:', settings.typography);
          
          const root = document.documentElement;
          const typography = settings.typography || {};
          
          root.style.setProperty('--font-size-base', typography.baseFontSize || '16px');
          root.style.setProperty('--font-weight-body', typography.bodyFontWeight || '400');
          root.style.setProperty('--font-weight-heading', typography.headingFontWeight || '700');
          root.style.setProperty('--font-size-h1', typography.h1Size || '3rem');
          root.style.setProperty('--font-size-h2', typography.h2Size || '2.25rem');
          root.style.setProperty('--font-size-h3', typography.h3Size || '1.875rem');
          root.style.setProperty('--font-size-h4', typography.h4Size || '1.5rem');
          root.style.setProperty('--font-size-h5', typography.h5Size || '1.25rem');
          root.style.setProperty('--font-size-h6', typography.h6Size || '1rem');
          
          console.log('Typography CSS variables applied:', {
            baseFontSize: typography.baseFontSize || '16px (fallback)',
            h1Size: typography.h1Size || '3rem (fallback)',
            h2Size: typography.h2Size || '2.25rem (fallback)',
            h3Size: typography.h3Size || '1.875rem (fallback)',
            h4Size: typography.h4Size || '1.5rem (fallback)',
            h5Size: typography.h5Size || '1.25rem (fallback)',
            h6Size: typography.h6Size || '1rem (fallback)',
          });
        }
      } catch (error) {
        console.error('Error loading typography settings:', error);
        const root = document.documentElement;
        root.style.setProperty('--font-size-base', '16px');
        root.style.setProperty('--font-weight-body', '400');
        root.style.setProperty('--font-weight-heading', '700');
        root.style.setProperty('--font-size-h1', '3rem');
        root.style.setProperty('--font-size-h2', '2.25rem');
        root.style.setProperty('--font-size-h3', '1.875rem');
        root.style.setProperty('--font-size-h4', '1.5rem');
        root.style.setProperty('--font-size-h5', '1.25rem');
        root.style.setProperty('--font-size-h6', '1rem');
      }
    };
    
    loadTypography();
  }, []);

  return null;
}
