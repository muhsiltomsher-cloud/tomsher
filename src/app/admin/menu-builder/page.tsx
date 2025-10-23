'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Grid,
  Chip,
  Alert,
} from '@mui/material';
import {
  Add,
  Delete,
  ExpandMore,
  DragIndicator,
  Save,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface MenuItem {
  _id?: string;
  title: string;
  url: string;
  order: number;
  isActive: boolean;
  isExternal: boolean;
  openInNewTab: boolean;
  parentId?: string | null;
  children?: MenuItem[];
}

interface Page {
  _id: string;
  title: string;
  slug: string;
  type: string;
}

export default function MenuBuilder() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    title: '',
    url: '',
    isActive: true,
    isExternal: false,
    openInNewTab: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [menuRes, pagesRes] = await Promise.all([
        fetch('/api/admin/menu'),
        fetch('/api/admin/pages'),
      ]);

      if (menuRes.ok) {
        const menuData = await menuRes.json();
        setMenuItems(Array.isArray(menuData) ? menuData : []);
      } else {
        console.error('Failed to fetch menu:', await menuRes.text());
        setMenuItems([]);
      }

      if (pagesRes.ok) {
        const pagesData = await pagesRes.json();
        setPages(Array.isArray(pagesData) ? pagesData : []);
      } else {
        setPages([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load menu data');
      setMenuItems([]);
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = async () => {
    if (!newItem.title || !newItem.url) {
      toast.error('Please fill in title and URL');
      return;
    }

    try {
      const response = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newItem,
          order: menuItems.length,
        }),
      });

      if (response.ok) {
        toast.success('Menu item added!');
        setNewItem({
          title: '',
          url: '',
          isActive: true,
          isExternal: false,
          openInNewTab: false,
        });
        fetchData();
      } else {
        const error = await response.text();
        console.error('Failed to add menu item:', error);
        toast.error('Failed to add menu item');
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast.error('Failed to add menu item');
    }
  };

  const handleUpdateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const item = menuItems.find(m => m._id === id);
      if (!item) return;

      const response = await fetch(`/api/admin/menu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, ...updates }),
      });

      if (response.ok) {
        toast.success('Menu item updated!');
        fetchData();
      } else {
        toast.error('Failed to update menu item');
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
      toast.error('Failed to update menu item');
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Menu item deleted!');
        fetchData();
      } else {
        toast.error('Failed to delete menu item');
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Failed to delete menu item');
    }
  };

  const handleAddPageToMenu = (page: Page) => {
    setNewItem({
      title: page.title,
      url: `/${page.slug}`,
      isActive: true,
      isExternal: false,
      openInNewTab: false,
    });
  };

  const handleSaveOrder = async () => {
    setSaving(true);
    try {
      const updates = menuItems.map((item, index) => ({
        ...item,
        order: index,
      }));

      await Promise.all(
        updates.map(item =>
          fetch(`/api/admin/menu/${item._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          })
        )
      );

      toast.success('Menu order saved!');
      fetchData();
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Failed to save menu order');
    } finally {
      setSaving(false);
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...menuItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setMenuItems(newItems);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1">
              Menu Builder
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              WordPress-style menu management
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveOrder}
              disabled={saving}
            >
              Save Menu
            </Button>
            <Button variant="outlined" component={Link} href="/admin/dashboard">
              Back to Dashboard
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Left Panel - Available Items */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add Menu Items
              </Typography>

              {/* Pages */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Pages ({pages.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {pages.length === 0 ? (
                      <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                        No pages available
                      </Typography>
                    ) : (
                      pages.map((page) => (
                        <ListItem
                          key={page._id}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              size="small"
                              onClick={() => handleAddPageToMenu(page)}
                            >
                              <Add />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={page.title}
                            secondary={`/${page.slug}`}
                          />
                        </ListItem>
                      ))
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Custom Link */}
              <Accordion defaultExpanded sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Custom Link</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Menu Title"
                      value={newItem.title || ''}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="URL"
                      value={newItem.url || ''}
                      onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                      size="small"
                      fullWidth
                      placeholder="/about or https://example.com"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={newItem.isExternal || false}
                          onChange={(e) => setNewItem({ ...newItem, isExternal: e.target.checked })}
                        />
                      }
                      label="External Link"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={newItem.openInNewTab || false}
                          onChange={(e) => setNewItem({ ...newItem, openInNewTab: e.target.checked })}
                        />
                      }
                      label="Open in New Tab"
                    />
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={handleAddMenuItem}
                      fullWidth
                    >
                      Add to Menu
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>

          {/* Right Panel - Menu Structure */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Menu Structure
              </Typography>

              {menuItems.length === 0 ? (
                <Alert severity="info" sx={{ mt: 2 }}>
                  No menu items yet. Add items from the left panel to get started.
                </Alert>
              ) : (
                <List>
                  {menuItems.map((item, index) => (
                    <Paper
                      key={item._id || index}
                      sx={{
                        mb: 2,
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <IconButton
                            size="small"
                            onClick={() => moveItem(index, 'up')}
                            disabled={index === 0}
                          >
                            <ExpandMore sx={{ transform: 'rotate(180deg)' }} />
                          </IconButton>
                          <DragIndicator sx={{ color: 'text.secondary', cursor: 'grab' }} />
                          <IconButton
                            size="small"
                            onClick={() => moveItem(index, 'down')}
                            disabled={index === menuItems.length - 1}
                          >
                            <ExpandMore />
                          </IconButton>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {item.title}
                            </Typography>
                            {item.isExternal && (
                              <Chip label="External" size="small" variant="outlined" />
                            )}
                            {item.openInNewTab && (
                              <Chip label="New Tab" size="small" variant="outlined" />
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            {item.url}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            color={item.isActive ? 'success' : 'default'}
                            onClick={() => handleUpdateMenuItem(item._id!, { isActive: !item.isActive })}
                          >
                            {item.isActive ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteMenuItem(item._id!)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </List>
              )}

              {menuItems.length > 0 && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="body2" color="info.dark">
                    💡 Drag items to reorder them, then click "Save Menu" to apply changes.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
