# Content Management System Guide

## Overview

This guide explains the unified content management system for the Tomsher Technologies website. The system has been reorganized to eliminate duplicate fields and provide a clean, consistent structure for managing all dynamic content.

## Key Changes

### 1. Unified SEO Management

**Before:** SEO fields were duplicated across multiple models (Page, CustomPage, PageContent, and separate SEO model).

**After:** Single `SEO` model that references any content type:

```typescript
{
  contentId: ObjectId,        // Reference to Page, BlogPost, Portfolio, etc.
  contentType: String,        // 'Page', 'BlogPost', 'Portfolio', 'Service', 'CustomPage'
  metaTitle: String,
  metaDescription: String,
  keywords: [String],
  focusKeyword: String,
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  twitterCard: String,
  // ... other SEO fields
}
```

**Usage:**
```javascript
// Create SEO for a page
await SEO.create({
  contentId: pageId,
  contentType: 'Page',
  metaTitle: 'My Page Title',
  metaDescription: 'My page description',
  keywords: ['web', 'development', 'dubai']
});

// Get SEO for a page
const seo = await SEO.findOne({ contentId: pageId, contentType: 'Page' });
```

### 2. Consolidated Page Management

**Before:** Three separate models (Page, CustomPage, PageContent) with overlapping functionality.

**After:**
- **Page Model:** For dynamic pages built with sections (Home, About, Services, etc.)
- **CustomPage Model:** Simplified for custom static pages
- **PageContent Model:** For legal/static content (Terms, Privacy, Refund, Shipping, Disclaimer)

### 3. Dynamic Section Content

**SectionContent Model:** Manages content for each section on each page type.

```typescript
{
  sectionKey: String,         // 'HERO', 'ABOUT', 'SERVICES', etc.
  pageType: String,           // 'HOME', 'ABOUT', 'SERVICES', etc.
  title: String,
  subtitle: String,
  content: Mixed,             // Flexible JSON content
  isActive: Boolean,
  order: Number
}
```

**Example:**
```javascript
// Get all sections for home page
const homeSections = await SectionContent.find({ pageType: 'HOME' }).sort({ order: 1 });

// Update hero section for home page
await SectionContent.findOneAndUpdate(
  { sectionKey: 'HERO', pageType: 'HOME' },
  {
    title: 'New Hero Title',
    subtitle: 'New Hero Subtitle',
    content: {
      description: 'Hero description',
      features: ['Feature 1', 'Feature 2'],
      primaryButton: { text: 'Get Started', url: '/contact' }
    }
  },
  { upsert: true }
);
```

## Available Section Types

### Home Page Sections
1. **HERO** - Main landing section with CTA
2. **ABOUT** - Company introduction
3. **SERVICES** - Service offerings grid
4. **STATS** - Achievement statistics
5. **PORTFOLIO** - Recent projects showcase
6. **TESTIMONIALS** - Client reviews
7. **CTA** - Call-to-action section
8. **CONTACT** - Contact information

### About Page Sections
1. **HERO** - About page header
2. **ABOUT** - Detailed company story
3. **TEAM** - Team members showcase

### Other Pages
Similar section structure can be applied to:
- Services page
- Portfolio page
- Blog page
- Contact page

## API Endpoints

### Section Content Management

**GET** `/api/admin/section-content?pageType=HOME&sectionKey=HERO`
- Get section content by page type and/or section key
- Requires authentication

**POST** `/api/admin/section-content`
- Create or update section content (upsert)
- Requires authentication
- Body:
```json
{
  "sectionKey": "HERO",
  "pageType": "HOME",
  "title": "Section Title",
  "subtitle": "Section Subtitle",
  "content": { /* flexible JSON */ },
  "isActive": true,
  "order": 1
}
```

### Page Content Management (Terms, Privacy, etc.)

**GET** `/api/admin/page-content?pageType=TERMS`
- Get static page content
- Requires authentication

**POST** `/api/admin/page-content`
- Create or update page content (upsert)
- Requires authentication
- Body:
```json
{
  "pageType": "TERMS",
  "title": "Terms and Conditions",
  "content": "<html content>",
  "isActive": true
}
```

### SEO Management

**GET** `/api/admin/seo`
- Get all SEO settings
- Requires authentication

**POST** `/api/admin/seo`
- Create SEO settings for content
- Requires authentication
- Body:
```json
{
  "contentId": "page_id_here",
  "contentType": "Page",
  "metaTitle": "Page Title",
  "metaDescription": "Page description",
  "keywords": ["keyword1", "keyword2"]
}
```

**GET** `/api/admin/seo/[id]`
- Get specific SEO settings

**PUT** `/api/admin/seo/[id]`
- Update specific SEO settings

**DELETE** `/api/admin/seo/[id]`
- Delete SEO settings

## Database Seeding

To populate the database with initial content:

```bash
npm run db:seed-content
```

This will create:
- All home page sections with sample content
- About page sections
- Terms and Privacy page content

## Content Structure Examples

### Hero Section Content
```json
{
  "description": "Main hero description",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "stats": [
    { "label": "Projects", "value": "500+" },
    { "label": "Clients", "value": "200+" }
  ],
  "primaryButton": { "text": "Get Started", "url": "/contact" },
  "secondaryButton": { "text": "Learn More", "url": "/about" }
}
```

### Services Section Content
```json
{
  "services": [
    {
      "title": "Web Development",
      "description": "Custom websites",
      "icon": "code",
      "features": ["Responsive", "SEO", "Fast"]
    },
    {
      "title": "E-commerce",
      "description": "Online stores",
      "icon": "shopping",
      "features": ["Payment", "Inventory", "Analytics"]
    }
  ]
}
```

### About Section Content
```json
{
  "description": "Company description",
  "image": "/images/about.jpg",
  "features": [
    {
      "title": "Expert Team",
      "description": "Skilled professionals",
      "icon": "team"
    }
  ]
}
```

## Admin Panel Integration

To integrate with your admin panel:

1. **Section Management Page:**
   - List all sections grouped by page type
   - Edit section content with form fields
   - Toggle section visibility
   - Reorder sections with drag-and-drop

2. **SEO Settings Page:**
   - Select content type and content
   - Edit all SEO fields
   - Preview how it will appear in search results
   - SEO score indicators

3. **Page Content Editor:**
   - Rich text editor for Terms, Privacy, etc.
   - Preview before publishing
   - Version history

## Best Practices

1. **Always use upsert operations** when updating section content to avoid duplicates
2. **Maintain consistent content structure** within the same section type across pages
3. **Use the `order` field** to control section display order
4. **Set `isActive: false`** instead of deleting sections to preserve content
5. **Create SEO entries** for all public-facing pages
6. **Use descriptive `sectionKey` values** that match your component names

## Migration from Old Structure

If you have existing data in the old structure:

1. Export existing page content
2. Map old fields to new structure
3. Run seed script to create new structure
4. Import and transform old data
5. Verify all content displays correctly
6. Update components to use new API endpoints

## Troubleshooting

**Issue:** Duplicate sections appearing
- **Solution:** Check for duplicate entries with same `sectionKey` and `pageType`

**Issue:** SEO not showing on page
- **Solution:** Verify `contentId` and `contentType` match exactly

**Issue:** Section order not working
- **Solution:** Ensure all sections have unique `order` values

## Support

For questions or issues with the content management system, contact the development team or refer to the API documentation.
