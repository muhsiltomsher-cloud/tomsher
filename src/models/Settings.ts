import mongoose, { Schema, Document, Model } from 'mongoose';

export enum SettingType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  JSON = 'JSON',
  ARRAY = 'ARRAY',
}

export interface ISettings extends Document {
  key: string;
  value: any;
  type: SettingType;
  group?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(SettingType),
      default: SettingType.STRING,
    },
    group: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
