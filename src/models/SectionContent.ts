import mongoose from 'mongoose';

const SectionContentSchema = new mongoose.Schema({
  sectionKey: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  subtitle: String,
  content: mongoose.Schema.Types.Mixed,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const SectionContent = mongoose.models.SectionContent || mongoose.model('SectionContent', SectionContentSchema);

export default SectionContent;
