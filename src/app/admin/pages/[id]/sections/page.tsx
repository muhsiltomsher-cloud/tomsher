'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Add, Edit, Delete, ArrowUpward, ArrowDownward, Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface PageSection {
  _id: string;
  sectionId: {
    _id: string;
    name: string;
    type: string;
    component: string;
  };
  order: number;
  content: any;
  variant: string;
  isVisible: boolean;
}

interface Section {
  _id: string;
  name: string;
  type: string;
  component: string;
  schema: any;
  variants: string[];
}

interface Page {
  _id: string;
  title: string;
  slug: string;
}

export default function PageSectionsEditor() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;
  
  const [page, setPage] = useState<Page | null>(null);
  const [pageSections, setPageSections] = useState<PageSection[]>([]);
  const [availableSections, setAvailableSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPageSection, setEditingPageSection] = useState<PageSection | null>(null);
  const [formData, setFormData] = useState({
    sectionId: '',
    order: 0,
    content: '{}',
    variant: 'default',
    isVisible: true,
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  const fetchData = async () => {
    try {
      const pageResponse = await fetch(`/api/admin/pages/${pageId}`);
      if (pageResponse.ok) {
        const pageData = await pageResponse.json();
        setPage(pageData);
      }

      const sectionsResponse = await fetch(`/api/admin/pages/${pageId}/sections`);
      if (sectionsResponse.ok) {
        const sectionsData = await sectionsResponse.json();
        setPageSections(sectionsData);
      }

      const availableResponse = await fetch('/api/admin/sections');
      if (availableResponse.ok) {
        const availableData = await availableResponse.json();
        setAvailableSections(availableData.filter((s: Section) => s.isActive));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      try {
        JSON.parse(formData.content);
      } catch (e) {
        toast.error('Invalid JSON in content');
        return;
      }

      const payload = {
        pageId,
        sectionId: formData.sectionId,
        order: formData.order,
        content: JSON.parse(formData.content),
        variant: formData.variant,
        isVisible: formData.isVisible,
      };

      const url = editingPageSection
        ? `/api/admin/page-sections/${editingPageSection._id}`
        : '/api/admin/page-sections';
      
      const response = await fetch(url, {
        method: editingPageSection ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Section ${editingPageSection ? 'updated' : 'added'} successfully!`);
        handleCloseDialog();
        fetchData();
      } else {
        toast.error(`Failed to ${editingPageSection ? 'update' : 'add'} section`);
      }
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    }
  };

  const handleEdit = (pageSection: PageSection) => {
    setEditingPageSection(pageSection);
    setFormData({
      sectionId: pageSection.sectionId._id,
      order: pageSection.order,
      content: JSON.stringify(pageSection.content || {}, null, 2),
      variant: pageSection.variant || 'default',
      isVisible: pageSection.isVisible,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this section from the page?')) return;

    try {
      const response = await fetch(`/api/admin/page-sections/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Section removed successfully!');
        fetchData();
      } else {
        toast.error('Failed to remove section');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Failed to remove section');
    }
  };

  const handleToggleVisibility = async (pageSection: PageSection) => {
    try {
      const response = await fetch(`/api/admin/page-sections/${pageSection._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...pageSection,
          sectionId: pageSection.sectionId._id,
          isVisible: !pageSection.isVisible,
        }),
      });

      if (response.ok) {
        toast.success('Visibility updated!');
        fetchData();
      }
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast.error('Failed to update visibility');
    }
  };

  const handleMoveUp = async (pageSection: PageSection, index: number) => {
    if (index === 0) return;
    
    const prevSection = pageSections[index - 1];
    await updateOrder(pageSection._id, prevSection.order);
    await updateOrder(prevSection._id, pageSection.order);
    fetchData();
  };

  const handleMoveDown = async (pageSection: PageSection, index: number) => {
    if (index === pageSections.length - 1) return;
    
    const nextSection = pageSections[index + 1];
    await updateOrder(pageSection._id, nextSection.order);
    await updateOrder(nextSection._id, pageSection.order);
    fetchData();
  };

  const updateOrder = async (id: string, newOrder: number) => {
    const section = pageSections.find(s => s._id === id);
    if (!section) return;

    await fetch(`/api/admin/page-sections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...section,
        sectionId: section.sectionId._id,
        order: newOrder,
      }),
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPageSection(null);
    setFormData({
      sectionId: '',
      order: pageSections.length,
      content: '{}',
      variant: 'default',
      isVisible: true,
    });
  };

  const getSelectedSection = () => {
    return availableSections.find(s => s._id === formData.sectionId);
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
              Page Sections: {page?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Add, remove, and reorder sections on this page
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setFormData({ ...formData, order: pageSections.length });
                setOpenDialog(true);
              }}
            >
              Add Section
            </Button>
            <Button variant="outlined" component={Link} href="/admin/pages">
              Back to Pages
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="60">Order</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Variant</TableCell>
                <TableCell>Visibility</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageSections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                      No sections added yet. Click "Add Section" to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                pageSections.map((pageSection, index) => (
                  <TableRow key={pageSection._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveUp(pageSection, index)}
                          disabled={index === 0}
                        >
                          <ArrowUpward fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" align="center">{pageSection.order}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveDown(pageSection, index)}
                          disabled={index === pageSections.length - 1}
                        >
                          <ArrowDownward fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {pageSection.sectionId.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={pageSection.sectionId.type} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={pageSection.variant} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleVisibility(pageSection)}
                        color={pageSection.isVisible ? 'success' : 'default'}
                      >
                        {pageSection.isVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleEdit(pageSection)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(pageSection._id)}>
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
          <DialogTitle>{editingPageSection ? 'Edit Section' : 'Add Section to Page'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                select
                label="Section"
                value={formData.sectionId}
                onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                fullWidth
                required
                disabled={!!editingPageSection}
              >
                {availableSections.map((section) => (
                  <MenuItem key={section._id} value={section._id}>
                    {section.name} ({section.type})
                  </MenuItem>
                ))}
              </TextField>

              {getSelectedSection() && getSelectedSection()!.variants.length > 0 && (
                <TextField
                  select
                  label="Variant"
                  value={formData.variant}
                  onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                  fullWidth
                >
                  {getSelectedSection()!.variants.map((variant) => (
                    <MenuItem key={variant} value={variant}>
                      {variant}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              <TextField
                label="Order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                fullWidth
                helperText="Lower numbers appear first"
              />

              <TextField
                label="Content (JSON)"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                fullWidth
                multiline
                rows={10}
                helperText="Section-specific content based on schema"
                sx={{ fontFamily: 'monospace' }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  />
                }
                label="Visible"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingPageSection ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
