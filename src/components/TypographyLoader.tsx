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
          
          if (settings.typography) {
            const root = document.documentElement;
            
            if (settings.typography.baseFontSize) {
              root.style.setProperty('--font-size-base', settings.typography.baseFontSize);
              console.log('Set base font size:', settings.typography.baseFontSize);
            }
            
            if (settings.typography.bodyFontWeight) {
              root.style.setProperty('--font-weight-body', settings.typography.bodyFontWeight);
            }
            
            if (settings.typography.headingFontWeight) {
              root.style.setProperty('--font-weight-heading', settings.typography.headingFontWeight);
            }
            
            if (settings.typography.h1Size) {
              root.style.setProperty('--font-size-h1', settings.typography.h1Size);
              console.log('Set H1 size:', settings.typography.h1Size);
            }
            
            if (settings.typography.h2Size) {
              root.style.setProperty('--font-size-h2', settings.typography.h2Size);
            }
            
            if (settings.typography.h3Size) {
              root.style.setProperty('--font-size-h3', settings.typography.h3Size);
            }
            
            if (settings.typography.h4Size) {
              root.style.setProperty('--font-size-h4', settings.typography.h4Size);
            }
            
            if (settings.typography.h5Size) {
              root.style.setProperty('--font-size-h5', settings.typography.h5Size);
            }
            
            if (settings.typography.h6Size) {
              root.style.setProperty('--font-size-h6', settings.typography.h6Size);
            }
            
            console.log('Typography CSS variables applied successfully');
          } else {
            console.log('No typography settings found in response');
          }
        }
      } catch (error) {
        console.error('Error loading typography settings:', error);
      }
    };
    
    loadTypography();
  }, []);

  return null;
}
