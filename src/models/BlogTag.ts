import mongoose from 'mongoose';

const BlogTagSchema = new mongoose.Schema({
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
    default: '#48dbfb',
  },
  postCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const BlogTag = mongoose.models.BlogTag || mongoose.model('BlogTag', BlogTagSchema);

export default BlogTag;
