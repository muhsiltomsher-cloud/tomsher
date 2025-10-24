import mongoose from 'mongoose';

const SectionContentSchema = new mongoose.Schema({
  sectionKey: {
    type: String,
    required: true,
    unique: true,
    enum: ['HERO', 'ABOUT', 'SERVICES', 'PORTFOLIO', 'TESTIMONIALS', 'CONTACT', 'CTA', 'STATS', 'FEATURES', 'TEAM', 'FAQ', 'BLOG', 'CLIENTS', 'PROCESS'],
  },
  pageType: {
    type: String,
    required: true,
    enum: ['HOME', 'ABOUT', 'SERVICES', 'PORTFOLIO', 'BLOG', 'CONTACT'],
  },
  title: String,
  subtitle: String,
  content: mongoose.Schema.Types.Mixed,
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

SectionContentSchema.index({ sectionKey: 1, pageType: 1 }, { unique: true });

const SectionContent = mongoose.models.SectionContent || mongoose.model('SectionContent', SectionContentSchema);

export default SectionContent;
