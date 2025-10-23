import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  isExternal: {
    type: Boolean,
    default: false,
  },
  openInNewTab: {
    type: Boolean,
    default: false,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    default: null,
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isMegaMenu: {
    type: Boolean,
    default: false,
  },
  megaMenuColumns: {
    type: Number,
    default: 3,
  },
}, {
  timestamps: true,
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);

export default MenuItem;
