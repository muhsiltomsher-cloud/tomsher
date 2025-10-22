import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageSection extends Document {
  pageId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  order: number;
  content: any;
  variant?: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PageSectionSchema = new Schema<IPageSection>(
  {
    pageId: {
      type: Schema.Types.ObjectId,
      ref: 'Page',
      required: true,
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    variant: {
      type: String,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PageSection: Model<IPageSection> = mongoose.models.PageSection || mongoose.model<IPageSection>('PageSection', PageSectionSchema);

export default PageSection;
