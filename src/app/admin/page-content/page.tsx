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
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface PageContent {
  _id: string;
  pageType: string;
  title: string;
  content: string;
  isActive: boolean;
}

const PAGE_TYPES = [
  { value: 'ABOUT', label: 'About Us' },
  { value: 'PRIVACY', label: 'Privacy Policy' },
  { value: 'TERMS', label: 'Terms and Conditions' },
  { value: 'REFUND', label: 'Refund Policy' },
  { value: 'SHIPPING', label: 'Shipping Policy' },
  { value: 'DISCLAIMER', label: 'Disclaimer' },
];

export default function PageContentManagement() {
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState({
    pageType: 'ABOUT',
    title: '',
    content: '',
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
        content: formData.content,
        isActive: formData.isActive,
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
      content: item.content,
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
      pageType: 'ABOUT',
      title: '',
      content: '',
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
              Static Page Content
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage About Us, Terms, Privacy Policy, and other static pages
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
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageContents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
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

              <TextField
                label="Page Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                fullWidth
                required
              />

              <TextField
                label="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                fullWidth
                required
                multiline
                rows={15}
                helperText="You can use HTML for formatting"
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
