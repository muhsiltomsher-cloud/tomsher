import mongoose from 'mongoose';

const FormSubmissionSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: ['contact', 'inquiry', 'quote', 'newsletter', 'custom'],
  },
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
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  budget: {
    type: String,
  },
  service: {
    type: String,
  },
  customFields: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new',
  },
  notes: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  source: {
    type: String,
  },
}, {
  timestamps: true,
});

const FormSubmission = mongoose.models.FormSubmission || mongoose.model('FormSubmission', FormSubmissionSchema);

export default FormSubmission;
