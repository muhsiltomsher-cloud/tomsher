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
}, {
  timestamps: true,
});

const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

export default SiteSettings;
