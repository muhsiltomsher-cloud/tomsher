'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Switch,
  FormControlLabel,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Add, Edit, Delete, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface PageContent {
  _id: string;
  pageType: string;
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonUrl?: string;
  sections: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
  isActive: boolean;
}

const PAGE_TYPES = [
  { value: 'HOME', label: 'Home Page' },
  { value: 'ABOUT', label: 'About Page' },
  { value: 'SERVICES', label: 'Services Listing' },
  { value: 'PORTFOLIO', label: 'Portfolio Listing' },
  { value: 'BLOG', label: 'Blog Listing' },
  { value: 'CONTACT', label: 'Contact Page' },
  { value: 'PRIVACY', label: 'Privacy Policy' },
  { value: 'TERMS', label: 'Terms of Service' },
];

export default function PageContentManagement() {
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState({
    pageType: 'HOME',
    title: '',
    subtitle: '',
    heroImage: '',
    heroTitle: '',
    heroSubtitle: '',
    heroButtonText: '',
    heroButtonUrl: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogImage: '',
    isActive: true,
  });

  useEffect(() => {
    fetchPageContents();
  }, []);

  const fetchPageContents = async () => {
    try {
      const response = await fetch('/api/admin/page-content');
      if (response.ok) {
        const data = await response.json();
        setPageContents(data);
      }
    } catch (error) {
      console.error('Error fetching page contents:', error);
      toast.error('Failed to load page contents');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = editingItem
        ? `/api/admin/page-content/${editingItem._id}`
        : '/api/admin/page-content';
      
      const payload = {
        pageType: formData.pageType,
        title: formData.title,
        subtitle: formData.subtitle,
        heroImage: formData.heroImage,
        heroTitle: formData.heroTitle,
        heroSubtitle: formData.heroSubtitle,
        heroButtonText: formData.heroButtonText,
        heroButtonUrl: formData.heroButtonUrl,
        seo: {
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
          ogImage: formData.ogImage,
        },
        isActive: formData.isActive,
        sections: editingItem?.sections || [],
      };

      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Page content ${editingItem ? 'updated' : 'created'} successfully!`);
        handleCloseDialog();
        fetchPageContents();
      } else {
        toast.error(`Failed to ${editingItem ? 'update' : 'create'} page content`);
      }
    } catch (error) {
      console.error('Error saving page content:', error);
      toast.error('Failed to save page content');
    }
  };

  const handleEdit = (item: PageContent) => {
    setEditingItem(item);
    setFormData({
      pageType: item.pageType,
      title: item.title,
      subtitle: item.subtitle || '',
      heroImage: item.heroImage || '',
      heroTitle: item.heroTitle || '',
      heroSubtitle: item.heroSubtitle || '',
      heroButtonText: item.heroButtonText || '',
      heroButtonUrl: item.heroButtonUrl || '',
      metaTitle: item.seo?.metaTitle || '',
      metaDescription: item.seo?.metaDescription || '',
      keywords: item.seo?.keywords?.join(', ') || '',
      ogImage: item.seo?.ogImage || '',
      isActive: item.isActive,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page content?')) return;

    try {
      const response = await fetch(`/api/admin/page-content/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Page content deleted successfully!');
        fetchPageContents();
      } else {
        toast.error('Failed to delete page content');
      }
    } catch (error) {
      console.error('Error deleting page content:', error);
      toast.error('Failed to delete page content');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      pageType: 'HOME',
      title: '',
      subtitle: '',
      heroImage: '',
      heroTitle: '',
      heroSubtitle: '',
      heroButtonText: '',
      heroButtonUrl: '',
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      ogImage: '',
      isActive: true,
    });
  };

  const getPageTypeLabel = (type: string) => {
    return PAGE_TYPES.find(pt => pt.value === type)?.label || type;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1">
              Page Content Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage dynamic content for all pages
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add Page Content
            </Button>
            <Button variant="outlined" component={Link} href="/admin/dashboard">
              Back to Dashboard
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Page Type</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Hero Section</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageContents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                      No page content yet. Click "Add Page Content" to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                pageContents.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Chip label={getPageTypeLabel(item.pageType)} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {item.title}
                      </Typography>
                      {item.subtitle && (
                        <Typography variant="caption" color="text.secondary">
                          {item.subtitle}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.heroTitle ? (
                        <Typography variant="caption">
                          {item.heroTitle}
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          No hero section
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={item.isActive ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleEdit(item)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(item._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{editingItem ? 'Edit Page Content' : 'Add Page Content'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                select
                label="Page Type"
                value={formData.pageType}
                onChange={(e) => setFormData({ ...formData, pageType: e.target.value })}
                fullWidth
                required
                disabled={!!editingItem}
              >
                {PAGE_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" fontWeight="bold">Basic Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Page Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      fullWidth
                      multiline
                      rows={2}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" fontWeight="bold">Hero Section</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Hero Image URL"
                      value={formData.heroImage}
                      onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Hero Title"
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Hero Subtitle"
                      value={formData.heroSubtitle}
                      onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                      fullWidth
                      multiline
                      rows={2}
                    />
                    <TextField
                      label="Hero Button Text"
                      value={formData.heroButtonText}
                      onChange={(e) => setFormData({ ...formData, heroButtonText: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Hero Button URL"
                      value={formData.heroButtonUrl}
                      onChange={(e) => setFormData({ ...formData, heroButtonUrl: e.target.value })}
                      fullWidth
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" fontWeight="bold">SEO Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Meta Title"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Meta Description"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      fullWidth
                      multiline
                      rows={3}
                    />
                    <TextField
                      label="Keywords (comma-separated)"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="OG Image URL"
                      value={formData.ogImage}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      fullWidth
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
