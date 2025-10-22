import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMedia extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  caption?: string;
  folder?: string;
  uploadedById: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
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
    folder: {
      type: String,
    },
    uploadedById: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Media: Model<IMedia> = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);

export default Media;
