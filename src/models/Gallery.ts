import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
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
  images: [{
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
    caption: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  }],
  featuredImage: {
    type: String,
  },
  category: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

export default Gallery;
