import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
    unique: true,
    enum: ['ABOUT', 'PRIVACY', 'TERMS', 'REFUND', 'SHIPPING', 'DISCLAIMER'],
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  heroTitle: {
    type: String,
  },
  heroSubtitle: {
    type: String,
  },
  heroImage: {
    type: String,
  },
  sections: [{
    type: {
      type: String,
      enum: ['TEXT', 'STATS', 'IMAGE_TEXT', 'FEATURES', 'TEAM'],
    },
    title: String,
    subtitle: String,
    content: String,
    image: String,
    items: [{
      title: String,
      description: String,
      icon: String,
      value: String,
    }],
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

export default PageContent;
