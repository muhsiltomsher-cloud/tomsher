import mongoose, { Schema, Document, Model } from 'mongoose';

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: PostStatus;
  views: number;
  readTime?: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    featuredImage: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.DRAFT,
    },
    views: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
