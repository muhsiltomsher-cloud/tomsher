import mongoose from 'mongoose';

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
  content: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const CustomPage = mongoose.models.CustomPage || mongoose.model('CustomPage', CustomPageSchema);

export default CustomPage;
