'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete, Edit, Email } from '@mui/icons-material';

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced';
  source: string;
  tags: string[];
  subscribedAt: string;
  unsubscribedAt?: string;
  createdAt: string;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    status: 'subscribed',
    tags: '',
  });

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter');
      if (!response.ok) throw new Error('Failed to fetch subscribers');
      const data = await response.json();
      setSubscribers(data);
    } catch (err) {
      setError('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setFormData({
      email: subscriber.email,
      name: subscriber.name || '',
      status: subscriber.status,
      tags: subscriber.tags.join(', '),
    });
    setEditDialog(true);
  };

  const handleDelete = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setDeleteDialog(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/admin/newsletter/${selectedSubscriber?._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) throw new Error('Failed to update subscriber');

      setSuccess('Subscriber updated successfully');
      setEditDialog(false);
      fetchSubscribers();
    } catch (err) {
      setError('Failed to update subscriber');
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/admin/newsletter/${selectedSubscriber?._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete subscriber');

      setSuccess('Subscriber deleted successfully');
      setDeleteDialog(false);
      fetchSubscribers();
    } catch (err) {
      setError('Failed to delete subscriber');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'subscribed': return 'success';
      case 'unsubscribed': return 'default';
      case 'bounced': return 'error';
      default: return 'default';
    }
  };

  const stats = {
    total: subscribers.length,
    subscribed: subscribers.filter(s => s.status === 'subscribed').length,
    unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length,
    bounced: subscribers.filter(s => s.status === 'bounced').length,
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Email /> Newsletter Subscribers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your newsletter subscribers and track engagement
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>Total Subscribers</Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>Active</Typography>
            <Typography variant="h4" color="success.main">{stats.subscribed}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>Unsubscribed</Typography>
            <Typography variant="h4" color="text.secondary">{stats.unsubscribed}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>Bounced</Typography>
            <Typography variant="h4" color="error.main">{stats.bounced}</Typography>
          </CardContent>
        </Card>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Subscribed Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber._id}>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.name || '-'}</TableCell>
                <TableCell>
                  <Chip label={subscriber.status} color={getStatusColor(subscriber.status)} size="small" />
                </TableCell>
                <TableCell>{subscriber.source}</TableCell>
                <TableCell>
                  {subscriber.tags.map((tag, i) => (
                    <Chip key={i} label={tag} size="small" sx={{ mr: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell>{new Date(subscriber.subscribedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(subscriber)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(subscriber)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Subscriber</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="subscribed">Subscribed</MenuItem>
              <MenuItem value="unsubscribed">Unsubscribed</MenuItem>
              <MenuItem value="bounced">Bounced</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Tags (comma-separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            margin="normal"
            helperText="e.g., newsletter, promotions, updates"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Subscriber</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {selectedSubscriber?.email}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
