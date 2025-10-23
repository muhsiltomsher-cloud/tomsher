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
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { Add, Edit, Delete, ArrowUpward, ArrowDownward, SubdirectoryArrowRight } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface MenuItem {
  _id: string;
  title: string;
  url: string;
  order: number;
  image?: string;
  description?: string;
  icon?: string;
  isExternal: boolean;
  openInNewTab: boolean;
  parentId?: string;
  isActive: boolean;
  isMegaMenu: boolean;
  megaMenuColumns: number;
  children?: MenuItem[];
}

interface PageSuggestion {
  _id: string;
  title: string;
  slug: string;
  type: string;
}

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [pageSuggestions, setPageSuggestions] = useState<PageSuggestion[]>([]);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [showUrlSuggestions, setShowUrlSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    order: 0,
    image: '',
    description: '',
    icon: '',
    isExternal: false,
    openInNewTab: false,
    parentId: '',
    isActive: true,
    isMegaMenu: false,
    megaMenuColumns: 3,
  });

  useEffect(() => {
    fetchMenuItems();
    fetchPageSuggestions();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/admin/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchPageSuggestions = async () => {
    try {
      const response = await fetch('/api/admin/pages');
      if (response.ok) {
        const data = await response.json();
        setPageSuggestions(data);
      }
    } catch (error) {
      console.error('Error fetching page suggestions:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = editingItem
        ? `/api/admin/menu/${editingItem._id}`
        : '/api/admin/menu';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Menu item ${editingItem ? 'updated' : 'created'} successfully!`);
        handleCloseDialog();
        fetchMenuItems();
      } else {
        toast.error(`Failed to ${editingItem ? 'update' : 'create'} menu item`);
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast.error('Failed to save menu item');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      url: item.url,
      order: item.order,
      image: item.image || '',
      description: item.description || '',
      icon: item.icon || '',
      isExternal: item.isExternal,
      openInNewTab: item.openInNewTab,
      parentId: item.parentId || '',
      isActive: item.isActive,
      isMegaMenu: item.isMegaMenu,
      megaMenuColumns: item.megaMenuColumns,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Menu item deleted successfully!');
        fetchMenuItems();
      } else {
        toast.error('Failed to delete menu item');
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Failed to delete menu item');
    }
  };

  const handleMoveUp = async (item: MenuItem, index: number) => {
    if (index === 0) return;
    
    const prevItem = menuItems[index - 1];
    await updateOrder(item._id, prevItem.order);
    await updateOrder(prevItem._id, item.order);
    fetchMenuItems();
  };

  const handleMoveDown = async (item: MenuItem, index: number) => {
    if (index === menuItems.length - 1) return;
    
    const nextItem = menuItems[index + 1];
    await updateOrder(item._id, nextItem.order);
    await updateOrder(nextItem._id, item.order);
    fetchMenuItems();
  };

  const updateOrder = async (id: string, newOrder: number) => {
    const item = menuItems.find(m => m._id === id);
    if (!item) return;

    await fetch(`/api/admin/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...item,
        order: newOrder,
      }),
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      title: '',
      url: '',
      order: menuItems?.length || 0,
      image: '',
      description: '',
      icon: '',
      isExternal: false,
      openInNewTab: false,
      parentId: '',
      isActive: true,
      isMegaMenu: false,
      megaMenuColumns: 3,
    });
  };

  const getTopLevelItems = () => {
    return menuItems.filter(item => !item.parentId);
  };

  const getChildItems = (parentId: string) => {
    return menuItems.filter(item => item.parentId === parentId);
  };

  const renderMenuItem = (item: MenuItem, level: number = 0): JSX.Element => {
    const children = getChildItems(item._id);
    
    return (
      <>
        <TableRow key={item._id}>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {level > 0 && (
                <SubdirectoryArrowRight sx={{ ml: level * 2, color: 'text.secondary' }} />
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => handleMoveUp(item, menuItems.indexOf(item))}
                  disabled={menuItems.indexOf(item) === 0}
                >
                  <ArrowUpward fontSize="small" />
                </IconButton>
                <Typography variant="body2" align="center">{item.order}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleMoveDown(item, menuItems.indexOf(item))}
                  disabled={menuItems.indexOf(item) === menuItems.length - 1}
                >
                  <ArrowDownward fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Typography variant="body2" fontWeight="bold">
              {item.title}
            </Typography>
            {item.description && (
              <Typography variant="caption" color="text.secondary">
                {item.description}
              </Typography>
            )}
          </TableCell>
          <TableCell>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {item.url}
            </Typography>
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              <Chip
                label={item.isActive ? 'Active' : 'Inactive'}
                size="small"
                color={item.isActive ? 'success' : 'default'}
              />
              {item.isMegaMenu && (
                <Chip label="Mega Menu" size="small" color="primary" />
              )}
              {item.isExternal && (
                <Chip label="External" size="small" variant="outlined" />
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
        {children.map(child => renderMenuItem(child, level + 1))}
      </>
    );
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
              Menu Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Create and manage navigation menu with mega menu support
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setFormData({ ...formData, order: menuItems?.length || 0 });
                setOpenDialog(true);
              }}
            >
              Add Menu Item
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
                <TableCell width="100">Order</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getTopLevelItems().length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                      No menu items yet. Click "Add Menu Item" to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                getTopLevelItems().map(item => renderMenuItem(item))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  onFocus={() => setShowTitleSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 200)}
                  fullWidth
                  required
                  helperText="Start typing or select from available pages below"
                />
                {showTitleSuggestions && pageSuggestions.length > 0 && (
                  <Paper
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: 1000,
                      maxHeight: '200px',
                      overflow: 'auto',
                      mt: 0.5,
                    }}
                  >
                    {pageSuggestions
                      .filter(page => 
                        page.title.toLowerCase().includes(formData.title.toLowerCase())
                      )
                      .slice(0, 10)
                      .map((page) => (
                        <Box
                          key={page._id}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'action.hover' },
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                          }}
                          onClick={() => {
                            setFormData({ 
                              ...formData, 
                              title: page.title,
                              url: `/${page.slug}`
                            });
                            setShowTitleSuggestions(false);
                          }}
                        >
                          <Typography variant="body2" fontWeight="bold">
                            {page.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            /{page.slug} • {page.type}
                          </Typography>
                        </Box>
                      ))}
                  </Paper>
                )}
              </Box>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  label="URL"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  onFocus={() => setShowUrlSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowUrlSuggestions(false), 200)}
                  fullWidth
                  required
                  helperText="e.g., /services, /about, https://external.com"
                />
                {showUrlSuggestions && pageSuggestions.length > 0 && (
                  <Paper
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: 1000,
                      maxHeight: '200px',
                      overflow: 'auto',
                      mt: 0.5,
                    }}
                  >
                    {pageSuggestions
                      .filter(page => 
                        `/${page.slug}`.toLowerCase().includes(formData.url.toLowerCase())
                      )
                      .slice(0, 10)
                      .map((page) => (
                        <Box
                          key={page._id}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'action.hover' },
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                          }}
                          onClick={() => {
                            setFormData({ 
                              ...formData, 
                              url: `/${page.slug}`,
                              title: formData.title || page.title
                            });
                            setShowUrlSuggestions(false);
                          }}
                        >
                          <Typography variant="body2" fontWeight="bold" sx={{ fontFamily: 'monospace' }}>
                            /{page.slug}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {page.title} • {page.type}
                          </Typography>
                        </Box>
                      ))}
                  </Paper>
                )}
              </Box>
              <TextField
                select
                label="Parent Menu Item"
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                fullWidth
                helperText="Leave empty for top-level menu item"
              >
                <MuiMenuItem value="">None (Top Level)</MuiMenuItem>
                {getTopLevelItems().map((item) => (
                  <MuiMenuItem key={item._id} value={item._id}>
                    {item.title}
                  </MuiMenuItem>
                ))}
              </TextField>
              <TextField
                label="Order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                fullWidth
                helperText="Lower numbers appear first"
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                multiline
                rows={2}
                helperText="Optional description for mega menu"
              />
              <TextField
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                fullWidth
                helperText="Optional image for mega menu"
              />
              <TextField
                label="Icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                fullWidth
                helperText="Icon name or class"
              />
              <TextField
                label="Mega Menu Columns"
                type="number"
                value={formData.megaMenuColumns}
                onChange={(e) => setFormData({ ...formData, megaMenuColumns: parseInt(e.target.value) })}
                fullWidth
                inputProps={{ min: 2, max: 6 }}
                helperText="Number of columns in mega menu (2-6)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isMegaMenu}
                    onChange={(e) => setFormData({ ...formData, isMegaMenu: e.target.checked })}
                  />
                }
                label="Enable Mega Menu"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isExternal}
                    onChange={(e) => setFormData({ ...formData, isExternal: e.target.checked })}
                  />
                }
                label="External Link"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.openInNewTab}
                    onChange={(e) => setFormData({ ...formData, openInNewTab: e.target.checked })}
                  />
                }
                label="Open in New Tab"
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
