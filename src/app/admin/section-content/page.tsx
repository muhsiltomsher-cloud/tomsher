'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
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
  Tabs,
  Tab,
} from '@mui/material';
import { Add, Edit, Delete, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface SectionContent {
  _id: string;
  sectionKey: string;
  pageType: string;
  title: string;
  subtitle?: string;
  content: any;
  isActive: boolean;
  order: number;
}

const PAGE_TYPES = [
  { value: 'HOME', label: 'Home Page' },
  { value: 'ABOUT', label: 'About Page' },
  { value: 'SERVICES', label: 'Services Page' },
  { value: 'PORTFOLIO', label: 'Portfolio Page' },
  { value: 'BLOG', label: 'Blog Page' },
  { value: 'CONTACT', label: 'Contact Page' },
];

const SECTION_KEYS = [
  { value: 'HERO', label: 'Hero Section', description: 'Main landing section with CTA' },
  { value: 'ABOUT', label: 'About Section', description: 'Company introduction' },
  { value: 'SERVICES', label: 'Services Section', description: 'Service offerings grid' },
  { value: 'STATS', label: 'Stats Section', description: 'Achievement statistics' },
  { value: 'PORTFOLIO', label: 'Portfolio Section', description: 'Projects showcase' },
  { value: 'TESTIMONIALS', label: 'Testimonials Section', description: 'Client reviews' },
  { value: 'CTA', label: 'Call-to-Action', description: 'Call-to-action section' },
  { value: 'CONTACT', label: 'Contact Section', description: 'Contact information' },
  { value: 'FEATURES', label: 'Features Section', description: 'Product/service features' },
  { value: 'TEAM', label: 'Team Section', description: 'Team members showcase' },
  { value: 'FAQ', label: 'FAQ Section', description: 'Frequently asked questions' },
  { value: 'CLIENTS', label: 'Clients Section', description: 'Client logos/testimonials' },
  { value: 'PROCESS', label: 'Process Section', description: 'Work process steps' },
];

export default function SectionContentManagement() {
  const [sectionContents, setSectionContents] = useState<SectionContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<SectionContent | null>(null);
  const [selectedPageType, setSelectedPageType] = useState('HOME');
  const [formData, setFormData] = useState({
    sectionKey: 'HERO',
    pageType: 'HOME',
    title: '',
    subtitle: '',
    content: '{}',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchSectionContents();
  }, [selectedPageType]);

  const fetchSectionContents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/section-content?pageType=${selectedPageType}`);
      if (response.ok) {
        const data = await response.json();
        setSectionContents(data);
      }
    } catch (error) {
      console.error('Error fetching section contents:', error);
      toast.error('Failed to load section contents');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      let contentObj;
      try {
        contentObj = JSON.parse(formData.content);
      } catch (e) {
        toast.error('Invalid JSON in content field');
        return;
      }

      const payload = {
        sectionKey: formData.sectionKey,
        pageType: formData.pageType,
        title: formData.title,
        subtitle: formData.subtitle,
        content: contentObj,
        isActive: formData.isActive,
        order: formData.order,
      };

      const response = await fetch('/api/admin/section-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Section content ${editingItem ? 'updated' : 'created'} successfully!`);
        handleCloseDialog();
        fetchSectionContents();
      } else {
        toast.error(`Failed to ${editingItem ? 'update' : 'create'} section content`);
      }
    } catch (error) {
      console.error('Error saving section content:', error);
      toast.error('Failed to save section content');
    }
  };

  const handleEdit = (item: SectionContent) => {
    setEditingItem(item);
    setFormData({
      sectionKey: item.sectionKey,
      pageType: item.pageType,
      title: item.title,
      subtitle: item.subtitle || '',
      content: JSON.stringify(item.content, null, 2),
      isActive: item.isActive,
      order: item.order,
    });
    setOpenDialog(true);
  };

  const handleToggleActive = async (item: SectionContent) => {
    try {
      const response = await fetch('/api/admin/section-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          isActive: !item.isActive,
        }),
      });

      if (response.ok) {
        toast.success(`Section ${!item.isActive ? 'activated' : 'deactivated'}`);
        fetchSectionContents();
      } else {
        toast.error('Failed to update section');
      }
    } catch (error) {
      console.error('Error toggling section:', error);
      toast.error('Failed to update section');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      sectionKey: 'HERO',
      pageType: selectedPageType,
      title: '',
      subtitle: '',
      content: '{}',
      isActive: true,
      order: 0,
    });
  };

  const getSectionLabel = (key: string) => {
    return SECTION_KEYS.find(s => s.value === key)?.label || key;
  };

  const getSectionDescription = (key: string) => {
    return SECTION_KEYS.find(s => s.value === key)?.description || '';
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
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1">
              Dynamic Section Content
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage content for all page sections dynamically
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setFormData({ ...formData, pageType: selectedPageType });
                setOpenDialog(true);
              }}
            >
              Add Section Content
            </Button>
            <Button variant="outlined" component={Link} href="/admin/dashboard">
              Back to Dashboard
            </Button>
          </Box>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={selectedPageType}
            onChange={(e, newValue) => setSelectedPageType(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {PAGE_TYPES.map((type) => (
              <Tab key={type.value} label={type.label} value={type.value} />
            ))}
          </Tabs>
        </Paper>

        <Grid container spacing={3}>
          {sectionContents.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No section content yet for {PAGE_TYPES.find(p => p.value === selectedPageType)?.label}.
                  Click "Add Section Content" to get started.
                </Typography>
              </Paper>
            </Grid>
          ) : (
            sectionContents.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box>
                        <Chip
                          label={getSectionLabel(item.sectionKey)}
                          color="primary"
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="caption" display="block" color="text.secondary">
                          {getSectionDescription(item.sectionKey)}
                        </Typography>
                      </Box>
                      <Chip
                        label={item.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={item.isActive ? 'success' : 'default'}
                      />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    {item.subtitle && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.subtitle}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Order: {item.order}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(item)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color={item.isActive ? 'warning' : 'success'}
                      onClick={() => handleToggleActive(item)}
                    >
                      {item.isActive ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{editingItem ? 'Edit Section Content' : 'Add Section Content'}</DialogTitle>
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

              <TextField
                select
                label="Section Type"
                value={formData.sectionKey}
                onChange={(e) => setFormData({ ...formData, sectionKey: e.target.value })}
                fullWidth
                required
                disabled={!!editingItem}
              >
                {SECTION_KEYS.map((section) => (
                  <MenuItem key={section.value} value={section.value}>
                    {section.label} - {section.description}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Title"
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

              <TextField
                label="Order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                fullWidth
                helperText="Lower numbers appear first"
              />

              <TextField
                label="Content (JSON)"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                fullWidth
                required
                multiline
                rows={15}
                helperText="Enter valid JSON for section content"
              />

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
