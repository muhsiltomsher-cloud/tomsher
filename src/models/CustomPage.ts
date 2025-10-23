import mongoose from 'mongoose';

const CustomPageSectionSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
  },
  componentName: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

const CustomPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  sections: [CustomPageSectionSchema],
  isPublished: {
    type: Boolean,
    default: false,
  },
  seoTitle: {
    type: String,
  },
  seoDescription: {
    type: String,
  },
  seoKeywords: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const CustomPage = mongoose.models.CustomPage || mongoose.model('CustomPage', CustomPageSchema);

export default CustomPage;
