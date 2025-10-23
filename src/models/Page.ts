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

export interface IPageSection {
  sectionId: string;
  componentName: string;
  order: number;
  data: any;
  isVisible: boolean;
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
  parentId?: mongoose.Types.ObjectId;
  order?: number;
  sections?: IPageSection[];
  settings?: {
    enableSkeletonLoaders?: boolean;
    enablePageTransitions?: boolean;
    pageTransitionVariant?: string;
    enableScrollAnimations?: boolean;
    scrollAnimationVariant?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const PageSectionSchema = new Schema({
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
    type: Schema.Types.Mixed,
    default: {},
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

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
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Page',
    },
    order: {
      type: Number,
      default: 0,
    },
    sections: {
      type: [PageSectionSchema],
      default: [],
    },
    settings: {
      type: Schema.Types.Mixed,
      default: {},
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
