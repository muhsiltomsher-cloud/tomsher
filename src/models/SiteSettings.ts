import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Tomsher Technologies',
  },
  siteDescription: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  logoNormal: {
    type: String,
    default: '',
  },
  logoSticky: {
    type: String,
    default: '',
  },
  logoFooter: {
    type: String,
    default: '',
  },
  favicon: {
    type: String,
    default: '',
  },
  contactEmail: {
    type: String,
    default: '',
  },
  contactPhone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    pinterest: String,
    tiktok: String,
    snapchat: String,
    whatsapp: String,
    telegram: String,
    github: String,
    dribbble: String,
    behance: String,
    medium: String,
    reddit: String,
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
  },
  analytics: {
    googleAnalyticsId: String,
    facebookPixelId: String,
  },
  typography: {
    baseFontSize: {
      type: String,
      default: '16px',
    },
    headingFontWeight: {
      type: String,
      default: '700',
    },
    bodyFontWeight: {
      type: String,
      default: '400',
    },
    h1Size: {
      type: String,
      default: '3rem',
    },
    h2Size: {
      type: String,
      default: '2.25rem',
    },
    h3Size: {
      type: String,
      default: '1.875rem',
    },
    h4Size: {
      type: String,
      default: '1.5rem',
    },
    h5Size: {
      type: String,
      default: '1.25rem',
    },
    h6Size: {
      type: String,
      default: '1rem',
    },
  },
  homeHero: {
    title: {
      type: String,
      default: 'Transform Your Business with',
    },
    highlight: {
      type: String,
      default: 'Innovative Web Solutions',
    },
    subtitle: {
      type: String,
      default: 'Leading web development company in Dubai, UAE specializing in custom website development, eCommerce solutions, and digital marketing services.',
    },
    badge: {
      type: String,
      default: '#1 Web Development Company in Dubai',
    },
    features: {
      type: [String],
      default: ['Custom Web Development', 'E-commerce Solutions', 'Digital Marketing', 'Mobile App Development'],
    },
    ctaPrimary: {
      type: String,
      default: 'Get Started Today',
    },
    ctaSecondary: {
      type: String,
      default: 'View Our Work',
    },
    stats: [{
      label: String,
      value: String,
    }],
  },
  homeAbout: {
    title: {
      type: String,
      default: 'About',
    },
    highlight: {
      type: String,
      default: 'Tomsher Technologies',
    },
    description: {
      type: String,
      default: 'Tomsher is a leading web development company in Dubai, specializing in affordable website creation and custom eCommerce website development services in Dubai and UAE.',
    },
    features: [{
      title: String,
      description: String,
      icon: String,
    }],
    stats: [{
      number: String,
      label: String,
    }],
  },
  homeStats: {
    title: {
      type: String,
      default: 'Our Achievements',
    },
    subtitle: {
      type: String,
      default: 'Numbers that speak for themselves',
    },
    stats: [{
      label: String,
      value: String,
      icon: String,
    }],
  },
  homeCTA: {
    title: {
      type: String,
      default: 'Ready to Start Your Project?',
    },
    subtitle: {
      type: String,
      default: 'Let\'s work together to bring your ideas to life',
    },
    ctaPrimary: {
      type: String,
      default: 'Get Started',
    },
    ctaSecondary: {
      type: String,
      default: 'Contact Us',
    },
  },
  footer: {
    description: {
      type: String,
      default: 'Leading web development company in Dubai, UAE specializing in custom website development, eCommerce solutions, and digital marketing services.',
    },
    newsletterTitle: {
      type: String,
      default: 'Stay Updated',
    },
    newsletterDescription: {
      type: String,
      default: 'Subscribe to our newsletter for the latest updates on web development trends and digital marketing insights.',
    },
    copyrightText: {
      type: String,
      default: 'All rights reserved by Tomsher Technologies.',
    },
    showNewsletter: {
      type: Boolean,
      default: true,
    },
  },
}, {
  timestamps: true,
});

const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
