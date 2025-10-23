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
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Add, Edit, Delete, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { sectionDefinitions } from '@/components/sections';

interface Section {
  _id: string;
  name: string;
  type: string;
  component: string;
  description?: string;
  isActive: boolean;
}

const sectionTypes = [
  'HERO',
  'ABOUT',
  'SERVICES',
  'PORTFOLIO',
  'TESTIMONIALS',
  'CONTACT',
  'CTA',
  'FEATURES',
  'STATS',
  'TEAM',
  'FAQ',
  'BLOG',
  'CUSTOM',
];

export default function SectionsManagement() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'CUSTOM',
    component: '',
    description: '',
    schema: '{}',
    variants: '[]',
    isActive: true,
  });

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/admin/sections');
      if (response.ok) {
        const data = await response.json();
        setSections(data);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      try {
        JSON.parse(formData.schema);
        JSON.parse(formData.variants);
      } catch (e) {
        toast.error('Invalid JSON in schema or variants');
        return;
      }

      const payload = {
        ...formData,
        schema: JSON.parse(formData.schema),
        variants: JSON.parse(formData.variants),
      };

      const url = editingSection
        ? `/api/admin/sections/${editingSection._id}`
        : '/api/admin/sections';
      
      const response = await fetch(url, {
        method: editingSection ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Section ${editingSection ? 'updated' : 'created'} successfully!`);
        handleCloseDialog();
        fetchSections();
      } else {
        toast.error(`Failed to ${editingSection ? 'update' : 'create'} section`);
      }
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    }
  };

  const handleEdit = (section: Section) => {
    setEditingSection(section);
    setFormData({
      name: section.name,
      type: section.type,
      component: section.component,
      description: (section as any).description || '',
      schema: JSON.stringify((section as any).schema || {}, null, 2),
      variants: JSON.stringify((section as any).variants || [], null, 2),
      isActive: section.isActive,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section? This will affect all pages using it.')) return;

    try {
      const response = await fetch(`/api/admin/sections/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Section deleted successfully!');
        fetchSections();
      } else {
        toast.error('Failed to delete section');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Failed to delete section');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSection(null);
    setFormData({
      name: '',
      type: 'CUSTOM',
      component: '',
      description: '',
      schema: '{}',
      variants: '[]',
      isActive: true,
    });
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
              Sections Library
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Define reusable sections that can be added to any page
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Create Section
            </Button>
            <Button variant="outlined" component={Link} href="/admin/dashboard">
              Back to Dashboard
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Available Section Types
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            These are the built-in section types available in the page builder. Each section has multiple design variants.
          </Typography>
          <Grid container spacing={2}>
            {sectionDefinitions.map((section) => (
              <Grid item xs={12} md={6} lg={4} key={section.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {section.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {section.description}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Component:
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {section.component}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Variants ({section.variants.length}):
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {section.variants.map((variant: string) => (
                          <Chip key={variant} label={variant} size="small" />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
          Custom Sections
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create custom section definitions for specialized content types.
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Component</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                      No custom sections created yet. Click "Create Section" to add one.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sections.map((section) => (
                  <TableRow key={section._id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">{section.name}</Typography>
                        {section.description && (
                          <Typography variant="caption" color="text.secondary">
                            {section.description}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={section.type} size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        {section.component}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={section.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={section.isActive ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleEdit(section)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(section._id)}>
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
          <DialogTitle>{editingSection ? 'Edit Section' : 'Create New Section'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Section Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
                helperText="e.g., Hero Section, Services Grid, Testimonials Carousel"
              />
              <TextField
                select
                label="Section Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                fullWidth
                required
              >
                {sectionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Component Name"
                value={formData.component}
                onChange={(e) => setFormData({ ...formData, component: e.target.value })}
                fullWidth
                required
                helperText="React component name, e.g., HeroSection, ServicesGrid"
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
              <TextField
                label="Schema (JSON)"
                value={formData.schema}
                onChange={(e) => setFormData({ ...formData, schema: e.target.value })}
                fullWidth
                multiline
                rows={6}
                helperText='Define content structure, e.g., {"title": "string", "subtitle": "string"}'
                sx={{ fontFamily: 'monospace' }}
              />
              <TextField
                label="Variants (JSON Array)"
                value={formData.variants}
                onChange={(e) => setFormData({ ...formData, variants: e.target.value })}
                fullWidth
                multiline
                rows={4}
                helperText='Define design variants, e.g., ["default", "centered", "split"]'
                sx={{ fontFamily: 'monospace' }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingSection ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
