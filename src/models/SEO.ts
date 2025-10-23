import mongoose from 'mongoose';

const SEOSchema = new mongoose.Schema({
  pageId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'pageType',
  },
  pageType: {
    type: String,
    enum: ['Page', 'CustomPage', 'BlogPost', 'Portfolio', 'Service'],
  },
  metaTitle: {
    type: String,
    maxlength: 60,
  },
  metaDescription: {
    type: String,
    maxlength: 160,
  },
  keywords: {
    type: [String],
    default: [],
  },
  ogTitle: {
    type: String,
  },
  ogDescription: {
    type: String,
  },
  ogImage: {
    type: String,
  },
  ogType: {
    type: String,
    default: 'website',
  },
  twitterCard: {
    type: String,
    enum: ['summary', 'summary_large_image', 'app', 'player'],
    default: 'summary_large_image',
  },
  twitterTitle: {
    type: String,
  },
  twitterDescription: {
    type: String,
  },
  twitterImage: {
    type: String,
  },
  canonicalUrl: {
    type: String,
  },
  robots: {
    type: String,
    default: 'index, follow',
  },
  structuredData: {
    type: mongoose.Schema.Types.Mixed,
  },
  focusKeyword: {
    type: String,
  },
  readabilityScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  seoScore: {
    type: Number,
    min: 0,
    max: 100,
  },
}, {
  timestamps: true,
});

const SEO = mongoose.models.SEO || mongoose.model('SEO', SEOSchema);

export default SEO;
