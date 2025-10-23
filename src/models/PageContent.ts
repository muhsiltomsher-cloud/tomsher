import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
    unique: true,
    enum: ['HOME', 'ABOUT', 'SERVICES', 'PORTFOLIO', 'BLOG', 'CONTACT', 'PRIVACY', 'TERMS'],
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  heroImage: {
    type: String,
  },
  heroTitle: {
    type: String,
  },
  heroSubtitle: {
    type: String,
  },
  heroButtonText: {
    type: String,
  },
  heroButtonUrl: {
    type: String,
  },
  sections: [{
    type: {
      type: String,
      enum: ['TEXT', 'IMAGE_TEXT', 'STATS', 'FEATURES', 'CTA', 'FAQ', 'TEAM', 'TESTIMONIALS'],
    },
    title: String,
    subtitle: String,
    content: String,
    image: String,
    imagePosition: {
      type: String,
      enum: ['left', 'right', 'top', 'bottom'],
      default: 'right',
    },
    items: [{
      title: String,
      description: String,
      icon: String,
      image: String,
      value: String,
    }],
    buttonText: String,
    buttonUrl: String,
    order: {
      type: Number,
      default: 0,
    },
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

export default PageContent;
