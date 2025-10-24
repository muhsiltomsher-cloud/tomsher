import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
    unique: true,
    enum: ['PRIVACY', 'TERMS', 'REFUND', 'SHIPPING', 'DISCLAIMER'],
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
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
