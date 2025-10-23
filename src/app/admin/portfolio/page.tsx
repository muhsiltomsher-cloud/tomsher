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
} from '@mui/material';
import { Add, Edit, Delete, Image as ImageIcon } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ImagePicker from '@/components/admin/ImagePicker';

interface Portfolio {
  _id: string;
  title: string;
  slug: string;
  category: string;
  client?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

export default function PortfolioManagement() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: '',
    client: '',
    projectUrl: '',
    technologies: '',
    isActive: true,
    isFeatured: false,
    order: 0,
    image: '',
    gallery: [] as string[],
  });
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [imagePickerMode, setImagePickerMode] = useState<'cover' | 'gallery'>('cover');

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/admin/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data);
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      toast.error('Failed to load portfolio items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const technologiesArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
      const payload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        shortDescription: formData.shortDescription,
        category: formData.category,
        client: formData.client,
        projectUrl: formData.projectUrl,
        technologies: technologiesArray,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        order: formData.order,
        image: formData.image,
        gallery: formData.gallery,
      };

      const url = editingItem
        ? `/api/admin/portfolio/${editingItem._id}`
        : '/api/admin/portfolio';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Portfolio ${editingItem ? 'updated' : 'created'} successfully!`);
        handleCloseDialog();
        fetchPortfolios();
      } else {
        toast.error(`Failed to ${editingItem ? 'update' : 'create'} portfolio`);
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast.error('Failed to save portfolio');
    }
  };

  const handleEdit = (item: Portfolio) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: (item as any).description || '',
      shortDescription: (item as any).shortDescription || '',
      category: item.category,
      client: item.client || '',
      projectUrl: (item as any).projectUrl || '',
      technologies: (item as any).technologies?.join(', ') || '',
      isActive: item.isActive,
      isFeatured: item.isFeatured,
      order: item.order,
      image: (item as any).image || '',
      gallery: (item as any).gallery || [],
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Portfolio deleted successfully!');
        fetchPortfolios();
      } else {
        toast.error('Failed to delete portfolio');
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast.error('Failed to delete portfolio');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      shortDescription: '',
      category: '',
      client: '',
      projectUrl: '',
      technologies: '',
      isActive: true,
      isFeatured: false,
      order: 0,
      image: '',
      gallery: [],
    });
  };

  const handleImageSelect = (url: string) => {
    if (imagePickerMode === 'cover') {
      setFormData({ ...formData, image: url });
    } else {
      setFormData({ ...formData, gallery: [...formData.gallery, url] });
    }
    setImagePickerOpen(false);
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
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
          <Typography variant="h4" component="h1">
            Portfolio Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add Portfolio Item
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
                <TableCell>Order</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolios.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Chip label={item.category} size="small" />
                  </TableCell>
                  <TableCell>{item.client || '-'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Chip
                        label={item.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={item.isActive ? 'success' : 'default'}
                      />
                      {item.isFeatured && (
                        <Chip label="Featured" size="small" color="primary" />
                      )}
                    </Box>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setFormData({ ...formData, title, slug });
                }}
                fullWidth
                required
              />
              <TextField
                label="Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Short Description"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                fullWidth
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                multiline
                rows={4}
                required
              />
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Cover/Thumbnail Image
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  Main image shown in portfolio listing
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    fullWidth
                    placeholder="Image URL"
                  />
                  <Button
                    variant="outlined"
                    startIcon={<ImageIcon />}
                    onClick={() => {
                      setImagePickerMode('cover');
                      setImagePickerOpen(true);
                    }}
                  >
                    Select
                  </Button>
                </Box>
                {formData.image && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img
                      src={formData.image}
                      alt="Cover"
                      style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                    />
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Gallery Images
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  Additional images shown on portfolio detail page
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  onClick={() => {
                    setImagePickerMode('gallery');
                    setImagePickerOpen(true);
                  }}
                  fullWidth
                >
                  Add Gallery Image
                </Button>
                {formData.gallery.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {formData.gallery.map((img, index) => (
                      <Box key={index} sx={{ position: 'relative' }}>
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveGalleryImage(index)}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            bgcolor: 'white',
                            '&:hover': { bgcolor: 'white' }
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              <TextField
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                fullWidth
              />
              <TextField
                label="Project URL"
                value={formData.projectUrl}
                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                fullWidth
              />
              <TextField
                label="Technologies (comma-separated)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                fullWidth
                helperText="e.g., React, Node.js, MongoDB"
              />
              <TextField
                label="Order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                fullWidth
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
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                }
                label="Featured"
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

        <ImagePicker
          open={imagePickerOpen}
          onClose={() => setImagePickerOpen(false)}
          onSelect={handleImageSelect}
        />
      </Container>
    </Box>
  );
}
