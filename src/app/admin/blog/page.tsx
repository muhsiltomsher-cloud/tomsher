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
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Image as ImageIcon } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ImagePicker from '@/components/admin/ImagePicker';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  views: number;
  createdAt: string;
}

const postStatuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'DRAFT',
    readTime: 5,
    featuredImage: '',
  });
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      const payload = {
        ...formData,
        tags: tagsArray,
        publishedAt: formData.status === 'PUBLISHED' ? new Date() : null,
      };

      const url = editingPost
        ? `/api/admin/blog/${editingPost._id}`
        : '/api/admin/blog';
      
      const response = await fetch(url, {
        method: editingPost ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Blog post ${editingPost ? 'updated' : 'created'} successfully!`);
        handleCloseDialog();
        fetchPosts();
      } else {
        toast.error(`Failed to ${editingPost ? 'update' : 'create'} blog post`);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Failed to save blog post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: (post as any).content || '',
      excerpt: (post as any).excerpt || '',
      category: post.category,
      tags: (post as any).tags?.join(', ') || '',
      status: post.status,
      readTime: (post as any).readTime || 5,
      featuredImage: (post as any).featuredImage || '',
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Blog post deleted successfully!');
        fetchPosts();
      } else {
        toast.error('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category: '',
      tags: '',
      status: 'DRAFT',
      readTime: 5,
      featuredImage: '',
    });
  };

  const handleImageSelect = (url: string) => {
    setFormData({ ...formData, featuredImage: url });
    setImagePickerOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'success';
      case 'DRAFT':
        return 'warning';
      case 'ARCHIVED':
        return 'default';
      default:
        return 'default';
    }
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
            Blog Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Create Post
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
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    <Chip label={post.category} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={post.status} size="small" color={getStatusColor(post.status)} />
                  </TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(post)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(post._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
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
                label="Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                fullWidth
                multiline
                rows={2}
              />
              <TextField
                label="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                fullWidth
                multiline
                rows={8}
                required
              />
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Featured Image
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    fullWidth
                    placeholder="Image URL"
                  />
                  <Button
                    variant="outlined"
                    startIcon={<ImageIcon />}
                    onClick={() => setImagePickerOpen(true)}
                  >
                    Select
                  </Button>
                </Box>
                {formData.featuredImage && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                    />
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
                label="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                fullWidth
                helperText="e.g., Web Development, React, Next.js"
              />
              <TextField
                label="Read Time (minutes)"
                type="number"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                fullWidth
              />
              <TextField
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                fullWidth
              >
                {postStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingPost ? 'Update' : 'Create'}
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
