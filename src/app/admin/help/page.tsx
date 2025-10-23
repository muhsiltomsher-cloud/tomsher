'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material'
import { ExpandMore, Info } from '@mui/icons-material'

export default function HelpPage() {
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const imageSizes = [
    { type: 'Hero Background', size: '1920x1080px', ratio: '16:9', format: 'JPG/WebP', maxSize: '500KB' },
    { type: 'Portfolio Image', size: '1200x900px', ratio: '4:3', format: 'JPG/WebP', maxSize: '300KB' },
    { type: 'Blog Featured Image', size: '1200x630px', ratio: '1.91:1', format: 'JPG/WebP', maxSize: '300KB' },
    { type: 'Service Icon', size: '512x512px', ratio: '1:1', format: 'PNG/SVG', maxSize: '100KB' },
    { type: 'Logo', size: '400x100px', ratio: 'Variable', format: 'PNG/SVG', maxSize: '50KB' },
    { type: 'OG Image (Social)', size: '1200x630px', ratio: '1.91:1', format: 'JPG/PNG', maxSize: '300KB' },
    { type: 'Gallery Image', size: '1200x800px', ratio: '3:2', format: 'JPG/WebP', maxSize: '400KB' },
    { type: 'Testimonial Avatar', size: '200x200px', ratio: '1:1', format: 'JPG/PNG', maxSize: '50KB' },
  ]

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel Help & Instructions
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Complete guide to using the Tomsher admin panel
      </Typography>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Getting Started</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Welcome to the Tomsher admin panel! This dashboard allows you to manage all aspects of your website without touching any code.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            <li>Manage pages, services, portfolio, and blog posts</li>
            <li>Create custom pages with drag-and-drop sections</li>
            <li>Configure SEO settings for better search rankings</li>
            <li>Handle form submissions and contact inquiries</li>
            <li>Upload and manage media files</li>
            <li>Customize site settings and navigation menus</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Image Sizes & Recommendations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Use these recommended image sizes for optimal performance and display quality:
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Image Type</strong></TableCell>
                  <TableCell><strong>Recommended Size</strong></TableCell>
                  <TableCell><strong>Aspect Ratio</strong></TableCell>
                  <TableCell><strong>Format</strong></TableCell>
                  <TableCell><strong>Max File Size</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {imageSizes.map((img, index) => (
                  <TableRow key={index}>
                    <TableCell>{img.type}</TableCell>
                    <TableCell>{img.size}</TableCell>
                    <TableCell>{img.ratio}</TableCell>
                    <TableCell>
                      <Chip label={img.format} size="small" />
                    </TableCell>
                    <TableCell>{img.maxSize}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info fontSize="small" />
              <strong>Pro Tip:</strong> Use WebP format for better compression and faster loading times. Convert your images at{' '}
              <a href="https://squoosh.app" target="_blank" rel="noopener noreferrer">squoosh.app</a>
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Page Builder Guide</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>
            Creating a Custom Page:
          </Typography>
          <ol>
            <li>Go to <strong>Page Builder</strong> from the dashboard</li>
            <li>Click <strong>Create New Page</strong></li>
            <li>Enter page title, slug (URL), and SEO information</li>
            <li>Click <strong>Create & Build</strong></li>
            <li>Add sections from the available library</li>
            <li>Configure each section's content and design variant</li>
            <li>Reorder sections using up/down arrows</li>
            <li>Toggle visibility to show/hide sections</li>
            <li>Set page to <strong>Published</strong> when ready</li>
          </ol>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Available Section Types:
          </Typography>
          <ul>
            <li><strong>Hero Section:</strong> Large header with title, description, and CTA buttons (4 variants)</li>
            <li><strong>Services Section:</strong> Display services in grid or card layout (3 variants)</li>
            <li><strong>Features Section:</strong> Showcase key features and benefits (4 variants)</li>
            <li><strong>Portfolio Showcase:</strong> Display projects and case studies (4 variants)</li>
            <li><strong>Testimonials:</strong> Customer reviews and ratings (4 variants)</li>
            <li><strong>Contact Form:</strong> Customizable inquiry form (3 variants)</li>
            <li><strong>CTA Section:</strong> Call-to-action with prominent buttons (4 variants)</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">SEO Best Practices</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>
            Optimizing Your Pages:
          </Typography>
          <ul>
            <li><strong>Meta Title:</strong> Keep it under 60 characters, include your focus keyword</li>
            <li><strong>Meta Description:</strong> 150-160 characters, compelling summary with keywords</li>
            <li><strong>Focus Keyword:</strong> Choose one primary keyword per page</li>
            <li><strong>Keywords:</strong> Add 3-5 relevant keywords (comma-separated)</li>
            <li><strong>OG Image:</strong> Use 1200x630px image for social media sharing</li>
            <li><strong>Canonical URL:</strong> Set if you have duplicate content</li>
            <li><strong>Robots:</strong> Use "index, follow" for public pages</li>
          </ul>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
            <Typography variant="body2">
              <strong>Important:</strong> Each page should have unique meta titles and descriptions. Avoid duplicate content across pages.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Managing Media & Gallery</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>
            Uploading Images:
          </Typography>
          <ol>
            <li>Go to <strong>Media Library</strong> from the dashboard</li>
            <li>Click <strong>Upload Images</strong></li>
            <li>Select one or multiple images (max 10MB each)</li>
            <li>Add alt text for SEO and accessibility</li>
            <li>Organize images into galleries or categories</li>
            <li>Copy image URL to use in pages and sections</li>
          </ol>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Image Storage:
          </Typography>
          <Typography variant="body2" paragraph>
            All images are stored on Vercel Blob Storage for fast, reliable delivery. Images are automatically optimized and served via CDN for best performance.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Gallery Management:
          </Typography>
          <ul>
            <li>Create multiple galleries for different purposes</li>
            <li>Add captions and descriptions to images</li>
            <li>Reorder images by drag-and-drop</li>
            <li>Set featured images for galleries</li>
            <li>Embed galleries in custom pages</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Form Submissions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>
            Managing Inquiries:
          </Typography>
          <ol>
            <li>Go to <strong>Form Submissions</strong> to view all inquiries</li>
            <li>Click on any submission to view full details</li>
            <li>Update status: New → Read → Replied → Archived</li>
            <li>Add internal notes for team reference</li>
            <li>Export submissions to CSV for reporting</li>
          </ol>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Form Types:
          </Typography>
          <ul>
            <li><strong>Contact:</strong> General inquiries and questions</li>
            <li><strong>Quote:</strong> Project quote requests with budget info</li>
            <li><strong>Inquiry:</strong> Service-specific inquiries</li>
            <li><strong>Newsletter:</strong> Email subscription signups</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Site Settings & Logo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>
            Configuring Site Settings:
          </Typography>
          <ol>
            <li>Go to <strong>Settings</strong> from the dashboard</li>
            <li>Update site name, tagline, and description</li>
            <li>Upload logo (recommended: 400x100px PNG/SVG)</li>
            <li>Set contact information (email, phone, address)</li>
            <li>Add social media links (Facebook, Twitter, Instagram, LinkedIn)</li>
            <li>Configure footer content and copyright text</li>
            <li>Set up analytics tracking codes</li>
          </ol>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Dynamic Logo:
          </Typography>
          <Typography variant="body2" paragraph>
            The logo you upload in Settings will automatically appear across the entire site including header, footer, and admin panel. Supports PNG and SVG formats for crisp display on all devices.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Menu Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" gutterBottom>
            Creating Navigation Menus:
          </Typography>
          <ol>
            <li>Go to <strong>Menu</strong> from the dashboard</li>
            <li>Click <strong>Add Menu Item</strong></li>
            <li>Enter label and link URL</li>
            <li>Set parent item for dropdown menus</li>
            <li>Add icon or image (optional)</li>
            <li>Set display order (lower numbers appear first)</li>
            <li>Toggle visibility to show/hide items</li>
          </ol>
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Mega Menu:
          </Typography>
          <Typography variant="body2">
            Create full-width mega menus by setting a parent item and adding 2-6 child items. Add images and descriptions to child items for rich navigation experience.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.light', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Need More Help?
        </Typography>
        <Typography variant="body1">
          If you have questions or need assistance, contact support at{' '}
          <a href="mailto:support@tomsher.com">support@tomsher.com</a>
        </Typography>
      </Box>
    </Box>
  )
}
