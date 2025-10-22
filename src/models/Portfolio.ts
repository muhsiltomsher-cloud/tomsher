import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image?: string;
  gallery: string[];
  category: string;
  client?: string;
  projectUrl?: string;
  technologies: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
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
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    image: {
      type: String,
    },
    gallery: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    client: {
      type: String,
    },
    projectUrl: {
      type: String,
    },
    technologies: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio: Model<IPortfolio> = mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;
