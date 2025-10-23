import mongoose from 'mongoose';

const BlogCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
    default: '#667eea',
  },
  icon: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  postCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const BlogCategory = mongoose.models.BlogCategory || mongoose.model('BlogCategory', BlogCategorySchema);

export default BlogCategory;
