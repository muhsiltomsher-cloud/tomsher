import mongoose, { Schema, Document, Model } from 'mongoose';

export enum ContactStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  SPAM = 'SPAM',
}

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    company: {
      type: String,
    },
    service: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ContactStatus),
      default: ContactStatus.NEW,
    },
  },
  {
    timestamps: true,
  }
);

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
