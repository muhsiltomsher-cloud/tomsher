'use client';

import { useEffect } from 'react';

export default function MetadataLoader() {
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const settings = await response.json();
          
          if (settings.seo) {
            if (settings.seo.metaTitle) {
              document.title = settings.seo.metaTitle;
            }
            
            if (settings.seo.metaDescription) {
              let metaDesc = document.querySelector('meta[name="description"]');
              if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
              }
              metaDesc.setAttribute('content', settings.seo.metaDescription);
            }
            
            if (settings.seo.metaKeywords) {
              let metaKeywords = document.querySelector('meta[name="keywords"]');
              if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.setAttribute('name', 'keywords');
                document.head.appendChild(metaKeywords);
              }
              metaKeywords.setAttribute('content', settings.seo.metaKeywords);
            }
            
            if (settings.seo.metaTitle) {
              let ogTitle = document.querySelector('meta[property="og:title"]');
              if (!ogTitle) {
                ogTitle = document.createElement('meta');
                ogTitle.setAttribute('property', 'og:title');
                document.head.appendChild(ogTitle);
              }
              ogTitle.setAttribute('content', settings.seo.metaTitle);
            }
            
            if (settings.seo.metaDescription) {
              let ogDesc = document.querySelector('meta[property="og:description"]');
              if (!ogDesc) {
                ogDesc = document.createElement('meta');
                ogDesc.setAttribute('property', 'og:description');
                document.head.appendChild(ogDesc);
              }
              ogDesc.setAttribute('content', settings.seo.metaDescription);
            }
            
            if (settings.siteName) {
              let ogSiteName = document.querySelector('meta[property="og:site_name"]');
              if (!ogSiteName) {
                ogSiteName = document.createElement('meta');
                ogSiteName.setAttribute('property', 'og:site_name');
                document.head.appendChild(ogSiteName);
              }
              ogSiteName.setAttribute('content', settings.siteName);
            }
            
            console.log('SEO metadata updated successfully');
          }
        }
      } catch (error) {
        console.error('Error loading metadata:', error);
      }
    };
    
    loadMetadata();
  }, []);

  return null;
}
