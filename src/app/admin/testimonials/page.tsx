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
  Rating,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Testimonial {
  _id: string;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating: number;
  isActive: boolean;
  isFeatured: boolean;
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    avatar: '',
    isActive: true,
    isFeatured: false,
    order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = editingItem
        ? `/api/admin/testimonials/${editingItem._id}`
        : '/api/admin/testimonials';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Testimonial ${editingItem ? 'updated' : 'created'} successfully!`);
        handleCloseDialog();
        fetchTestimonials();
      } else {
        toast.error(`Failed to ${editingItem ? 'update' : 'create'} testimonial`);
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Failed to save testimonial');
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      position: item.position || '',
      company: item.company || '',
      content: item.content,
      rating: item.rating,
      avatar: (item as any).avatar || '',
      isActive: item.isActive,
      isFeatured: item.isFeatured,
      order: (item as any).order || 0,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Testimonial deleted successfully!');
        fetchTestimonials();
      } else {
        toast.error('Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      name: '',
      position: '',
      company: '',
      content: '',
      rating: 5,
      avatar: '',
      isActive: true,
      isFeatured: false,
      order: 0,
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
          <Typography variant="h4" component="h1">
            Testimonials Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add Testimonial
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
                <TableCell>Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonials.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                      {item.position && <Typography variant="caption">{item.position}</Typography>}
                    </Box>
                  </TableCell>
                  <TableCell>{item.company || '-'}</TableCell>
                  <TableCell>
                    <Rating value={item.rating} readOnly size="small" />
                  </TableCell>
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
          <DialogTitle>{editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                fullWidth
              />
              <TextField
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                fullWidth
              />
              <TextField
                label="Testimonial Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                fullWidth
                multiline
                rows={4}
                required
              />
              <Box>
                <Typography component="legend">Rating</Typography>
                <Rating
                  value={formData.rating}
                  onChange={(e, newValue) => setFormData({ ...formData, rating: newValue || 5 })}
                />
              </Box>
              <TextField
                label="Avatar URL"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                fullWidth
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
      </Container>
    </Box>
  );
}
