import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String,
  },
  skills: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  joinedDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

export default TeamMember;
