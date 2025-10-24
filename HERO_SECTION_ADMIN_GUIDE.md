# Hero Section Admin Guide

This guide explains how to manage the hero section content through the admin panel.

## Overview

The hero section is now fully dynamic and can be managed through the database without touching code. All content is stored in the `SiteSettings` collection under the `homeHero` field.

## Database Structure

The hero section data is stored in MongoDB with the following structure:

```javascript
{
  homeHero: {
    backgroundImage: String,      // Path to background image
    backgroundColor: String,       // Hex color code (e.g., '#060044')
    badges: [
      {
        text: String,              // Badge text
        icon: String               // Icon name ('globe' or 'rocket')
      }
    ],
    heading: {
      line1: String,               // First line of heading
      line1Highlight: String,      // Highlighted text in first line
      line2: String,               // Second line of heading
      line2Highlight: String,      // Highlighted text in second line
      line3: String                // Third line of heading
    },
    description: String,           // Description paragraph
    worksLink: {
      text: String,                // Link text (e.g., 'Our works')
      url: String                  // Link URL (e.g., '/works')
    }
  }
}
```

## Seeding Initial Data

To populate the hero section with default data, run:

```bash
npm run db:seed-hero
```

This will create or update the `SiteSettings` document with the default hero section content.

## Managing Content

### Option 1: Using MongoDB Compass or Atlas

1. Connect to your MongoDB database
2. Navigate to the `sitesettings` collection
3. Find the document (there should only be one)
4. Edit the `homeHero` field with your desired content
5. Save the changes

### Option 2: Using the API (Future Admin Panel)

The hero section content can be updated through the admin API:

**Endpoint:** `POST /api/admin/settings`

**Request Body:**
```json
{
  "homeHero": {
    "backgroundImage": "/images/bg-hero.png",
    "backgroundColor": "#060044",
    "badges": [
      {
        "text": "Trusted by Global Brands",
        "icon": "globe"
      },
      {
        "text": "Web Design & Digital Growth Experts",
        "icon": "rocket"
      }
    ],
    "heading": {
      "line1": "Build Your",
      "line1Highlight": "Digital World",
      "line2": "with",
      "line2Highlight": "Tomsher",
      "line3": "Powerful, Scalable, Business-Driven Websites"
    },
    "description": "We create award-winning, conversion-focused websites and robust digital solutions for forward-thinking brands. Partner with Tomsher for next-level performance and scalable growth.",
    "worksLink": {
      "text": "Our works",
      "url": "/works"
    }
  }
}
```

## Customization Options

### Background

- **backgroundImage**: Upload an image to `/public/images/` and reference it here
- **backgroundColor**: Use any hex color code for the background

### Badges

You can add multiple badges. Each badge has:
- **text**: The badge label
- **icon**: Currently supports 'globe' and 'rocket' (more icons can be added in the code)

### Heading

The heading is split into three lines for better control:
- **line1** and **line1Highlight**: First line with optional highlight
- **line2** and **line2Highlight**: Second line with optional highlight
- **line3**: Third line (full width)

Example:
```
Build Your [Digital World]  ← line1 + line1Highlight
with [Tomsher]              ← line2 + line2Highlight
Powerful, Scalable...       ← line3
```

### Description

A paragraph of text that appears below the heading. Keep it concise (2-3 sentences).

### Works Link

The call-to-action link that appears in the bottom right:
- **text**: Link label
- **url**: Destination URL (can be internal like '/works' or external)

## Adding More Icons

To add more badge icons:

1. Open `/src/components/sections/hero-section.tsx`
2. Add a new icon component (similar to `GlobeIcon` and `RocketIcon`)
3. Update the `renderIcon` function to include your new icon
4. Use the icon name in the database

Example:
```typescript
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props}>
    {/* SVG path data */}
  </svg>
);

// In renderIcon function:
case 'star':
  return <StarIcon />;
```

## Testing Changes

After updating the hero section content:

1. Restart the development server if running locally
2. Navigate to the home page
3. The changes should appear immediately
4. Check responsiveness on mobile and desktop

## Troubleshooting

### Changes not appearing

1. Clear browser cache
2. Check MongoDB connection in `.env.local`
3. Verify the `homeHero` field exists in the database
4. Check browser console for API errors

### Database connection issues

Make sure your MongoDB URI in `.env.local` has special characters URL-encoded:
- `@` → `%40`
- `!` → `%21`
- `#` → `%23`

### API not returning data

Check that:
1. MongoDB is running and accessible
2. The `SiteSettings` collection exists
3. The API route `/api/settings` is working
4. Network tab shows successful API call

## Future Enhancements

Planned features for the admin panel:
- Visual editor for hero section
- Image upload interface
- Icon picker
- Live preview
- Multiple hero section variants
- A/B testing support

---

**Need Help?** Contact the development team or check the main README.md for general setup instructions.
