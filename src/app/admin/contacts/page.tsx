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
import { Visibility, Delete } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: string;
  createdAt: string;
}

const contactStatuses = ['NEW', 'IN_PROGRESS', 'RESOLVED', 'SPAM'];

export default function ContactsManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setNewStatus(contact.status);
    setOpenDialog(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedContact) return;

    try {
      const response = await fetch(`/api/admin/contacts/${selectedContact._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success('Contact status updated successfully!');
        setOpenDialog(false);
        fetchContacts();
      } else {
        toast.error('Failed to update contact status');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Contact deleted successfully!');
        fetchContacts();
      } else {
        toast.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'info';
      case 'IN_PROGRESS':
        return 'warning';
      case 'RESOLVED':
        return 'success';
      case 'SPAM':
        return 'error';
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
            Contact Inquiries
          </Typography>
          <Button variant="outlined" component={Link} href="/admin/dashboard">
            Back to Dashboard
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company || '-'}</TableCell>
                  <TableCell>{contact.service || '-'}</TableCell>
                  <TableCell>
                    <Chip label={contact.status} size="small" color={getStatusColor(contact.status)} />
                  </TableCell>
                  <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary" onClick={() => handleView(contact)}>
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(contact._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Contact Details</DialogTitle>
          <DialogContent>
            {selectedContact && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                  label="Name"
                  value={selectedContact.name}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Email"
                  value={selectedContact.email}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
                {selectedContact.phone && (
                  <TextField
                    label="Phone"
                    value={selectedContact.phone}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                )}
                {selectedContact.company && (
                  <TextField
                    label="Company"
                    value={selectedContact.company}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                )}
                {selectedContact.service && (
                  <TextField
                    label="Service Interested In"
                    value={selectedContact.service}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                )}
                <TextField
                  label="Message"
                  value={selectedContact.message}
                  fullWidth
                  multiline
                  rows={4}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  select
                  label="Status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  fullWidth
                >
                  {contactStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Received"
                  value={new Date(selectedContact.createdAt).toLocaleString()}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
            <Button onClick={handleUpdateStatus} variant="contained">
              Update Status
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
