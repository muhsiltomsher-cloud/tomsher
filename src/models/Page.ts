import mongoose, { Schema, Document, Model } from 'mongoose';

export enum PageStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum PageType {
  HOME = 'HOME',
  SERVICE = 'SERVICE',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  PORTFOLIO = 'PORTFOLIO',
  BLOG = 'BLOG',
  CUSTOM = 'CUSTOM',
}

export interface IPage extends Document {
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: PageStatus;
  type: PageType;
  authorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const PageSchema = new Schema<IPage>(
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
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(PageStatus),
      default: PageStatus.DRAFT,
    },
    type: {
      type: String,
      enum: Object.values(PageType),
      default: PageType.SERVICE,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);

export default Page;
