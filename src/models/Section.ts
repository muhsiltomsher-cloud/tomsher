import mongoose, { Schema, Document, Model } from 'mongoose';

export enum SectionType {
  HERO = 'HERO',
  ABOUT = 'ABOUT',
  SERVICES = 'SERVICES',
  PORTFOLIO = 'PORTFOLIO',
  TESTIMONIALS = 'TESTIMONIALS',
  CONTACT = 'CONTACT',
  CTA = 'CTA',
  FEATURES = 'FEATURES',
  STATS = 'STATS',
  TEAM = 'TEAM',
  FAQ = 'FAQ',
  BLOG = 'BLOG',
  CUSTOM = 'CUSTOM',
}

export interface ISection extends Document {
  name: string;
  type: SectionType;
  component: string;
  contentSchema: any;
  variants: any[];
  isActive: boolean;
  createdById: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<ISection>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(SectionType),
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
    contentSchema: {
      type: Schema.Types.Mixed,
      required: true,
    },
    variants: [Schema.Types.Mixed],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdById: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Section: Model<ISection> = mongoose.models.Section || mongoose.model<ISection>('Section', SectionSchema);

export default Section;
