'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Chip,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  DragIndicator,
  Image as ImageIcon,
  Visibility,
} from '@mui/icons-material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';

interface MegaMenuColumn {
  id: string;
  title: string;
  items: MegaMenuItem[];
  image?: string;
  description?: string;
  content?: string;
  button?: {
    text: string;
    url: string;
    style: string;
  };
}

interface MegaMenuItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
}

interface MegaMenuEditorProps {
  menuItemId: string;
  menuItemTitle: string;
  initialColumns?: MegaMenuColumn[];
  onSave: (columns: MegaMenuColumn[]) => void;
  onClose: () => void;
}

function SortableColumnItem({ column, onEdit, onDelete }: {
  column: MegaMenuColumn;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 2,
        '&:hover': { boxShadow: 4 },
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <IconButton size="small" {...attributes} {...listeners}>
            <DragIndicator />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {column.title}
          </Typography>
          <IconButton size="small" onClick={onEdit} color="primary">
            <Edit />
          </IconButton>
          <IconButton size="small" onClick={onDelete} color="error">
            <Delete />
          </IconButton>
        </Box>

        {column.image && (
          <CardMedia
            component="img"
            height="120"
            image={column.image}
            alt={column.title}
            sx={{ borderRadius: 1, mb: 2, objectFit: 'cover' }}
          />
        )}

        {column.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {column.description}
          </Typography>
        )}

        {column.content && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {column.content}
          </Typography>
        )}

        {column.button && (
          <Box sx={{ mb: 2 }}>
            <Chip 
              label={`Button: ${column.button.text}`} 
              color={column.button.style === 'primary' ? 'primary' : 'secondary'}
              size="small"
            />
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Menu Items ({column.items.length})
        </Typography>
        {column.items.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              py: 0.5,
              pl: 2,
              borderLeft: '2px solid',
              borderColor: 'primary.main',
              mb: 0.5,
            }}
          >
            <Typography variant="body2" sx={{ flex: 1 }}>
              {item.title}
            </Typography>
            <Chip label={item.url} size="small" variant="outlined" />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default function MegaMenuEditor({
  menuItemId,
  menuItemTitle,
  initialColumns = [],
  onSave,
  onClose,
}: MegaMenuEditorProps) {
  const [columns, setColumns] = useState<MegaMenuColumn[]>(initialColumns);
  const [openColumnDialog, setOpenColumnDialog] = useState(false);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [editingColumn, setEditingColumn] = useState<MegaMenuColumn | null>(null);
  const [editingColumnIndex, setEditingColumnIndex] = useState<number>(-1);
  const [currentColumnId, setCurrentColumnId] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const [columnForm, setColumnForm] = useState({
    title: '',
    image: '',
    description: '',
    content: '',
    buttonText: '',
    buttonUrl: '',
    buttonStyle: 'primary',
  });

  const [itemForm, setItemForm] = useState({
    title: '',
    url: '',
    description: '',
    icon: '',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success('Column order updated');
    }
  };

  const handleAddColumn = () => {
    setColumnForm({ 
      title: '', 
      image: '', 
      description: '', 
      content: '', 
      buttonText: '', 
      buttonUrl: '', 
      buttonStyle: 'primary' 
    });
    setEditingColumn(null);
    setEditingColumnIndex(-1);
    setOpenColumnDialog(true);
  };

  const handleEditColumn = (column: MegaMenuColumn, index: number) => {
    setColumnForm({
      title: column.title,
      image: column.image || '',
      description: column.description || '',
      content: column.content || '',
      buttonText: column.button?.text || '',
      buttonUrl: column.button?.url || '',
      buttonStyle: column.button?.style || 'primary',
    });
    setEditingColumn(column);
    setEditingColumnIndex(index);
    setOpenColumnDialog(true);
  };

  const handleSaveColumn = () => {
    if (!columnForm.title.trim()) {
      toast.error('Column title is required');
      return;
    }

    const button = columnForm.buttonText && columnForm.buttonUrl ? {
      text: columnForm.buttonText,
      url: columnForm.buttonUrl,
      style: columnForm.buttonStyle,
    } : undefined;

    if (editingColumn) {
      const updatedColumns = [...columns];
      updatedColumns[editingColumnIndex] = {
        ...editingColumn,
        title: columnForm.title,
        image: columnForm.image,
        description: columnForm.description,
        content: columnForm.content,
        button,
      };
      setColumns(updatedColumns);
      toast.success('Column updated');
    } else {
      const newColumn: MegaMenuColumn = {
        id: `col-${Date.now()}`,
        title: columnForm.title,
        image: columnForm.image,
        description: columnForm.description,
        content: columnForm.content,
        button,
        items: [],
      };
      setColumns([...columns, newColumn]);
      toast.success('Column added');
    }

    setOpenColumnDialog(false);
  };

  const handleDeleteColumn = (columnId: string) => {
    if (confirm('Are you sure you want to delete this column?')) {
      setColumns(columns.filter((col) => col.id !== columnId));
      toast.success('Column deleted');
    }
  };

  const handleAddItem = (columnId: string) => {
    setCurrentColumnId(columnId);
    setItemForm({ title: '', url: '', description: '', icon: '' });
    setOpenItemDialog(true);
  };

  const handleSaveItem = () => {
    if (!itemForm.title.trim() || !itemForm.url.trim()) {
      toast.error('Item title and URL are required');
      return;
    }

    const newItem: MegaMenuItem = {
      id: `item-${Date.now()}`,
      title: itemForm.title,
      url: itemForm.url,
      description: itemForm.description,
      icon: itemForm.icon,
    };

    const updatedColumns = columns.map((col) => {
      if (col.id === currentColumnId) {
        return {
          ...col,
          items: [...col.items, newItem],
        };
      }
      return col;
    });

    setColumns(updatedColumns);
    setOpenItemDialog(false);
    toast.success('Menu item added');
  };

  const handleSave = () => {
    onSave(columns);
    toast.success('Mega menu saved successfully');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Mega Menu Editor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Editing mega menu for: <strong>{menuItemTitle}</strong>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Mega Menu
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Editor Panel */}
        <Grid item xs={12} md={showPreview ? 6 : 12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Columns ({columns.length})</Typography>
              <Button variant="contained" startIcon={<Add />} onClick={handleAddColumn}>
                Add Column
              </Button>
            </Box>

            {columns.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  No columns yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Add columns to organize your mega menu content
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleAddColumn}>
                  Add First Column
                </Button>
              </Box>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={columns.map((col) => col.id)} strategy={verticalListSortingStrategy}>
                  {columns.map((column, index) => (
                    <Box key={column.id}>
                      <SortableColumnItem
                        column={column}
                        onEdit={() => handleEditColumn(column, index)}
                        onDelete={() => handleDeleteColumn(column.id)}
                      />
                      <Button
                        size="small"
                        startIcon={<Add />}
                        onClick={() => handleAddItem(column.id)}
                        sx={{ ml: 6, mb: 2 }}
                      >
                        Add Menu Item to {column.title}
                      </Button>
                    </Box>
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </Paper>
        </Grid>

        {/* Live Preview Panel */}
        {showPreview && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Live Preview
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{
                  bgcolor: 'background.default',
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Grid container spacing={2}>
                  {columns.map((column) => (
                    <Grid item xs={12} sm={12 / Math.min(columns.length, 4)} key={column.id}>
                      <Box>
                        {column.image && (
                          <Box
                            component="img"
                            src={column.image}
                            alt={column.title}
                            sx={{
                              width: '100%',
                              height: 100,
                              objectFit: 'cover',
                              borderRadius: 1,
                              mb: 1,
                            }}
                          />
                        )}
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {column.title}
                        </Typography>
                        {column.description && (
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            {column.description}
                          </Typography>
                        )}
                        {column.content && (
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {column.content}
                          </Typography>
                        )}
                        <Box sx={{ mt: 1 }}>
                          {column.items.map((item) => (
                            <Typography
                              key={item.id}
                              variant="body2"
                              sx={{
                                py: 0.5,
                                cursor: 'pointer',
                                '&:hover': { color: 'primary.main' },
                              }}
                            >
                              {item.title}
                            </Typography>
                          ))}
                        </Box>
                        {column.button && (
                          <Button
                            variant={column.button.style === 'outlined' ? 'outlined' : 'contained'}
                            color={column.button.style === 'secondary' ? 'secondary' : 'primary'}
                            size="small"
                            sx={{ mt: 2 }}
                          >
                            {column.button.text}
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Column Dialog */}
      <Dialog open={openColumnDialog} onClose={() => setOpenColumnDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingColumn ? 'Edit Column' : 'Add Column'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Column Title"
              value={columnForm.title}
              onChange={(e) => setColumnForm({ ...columnForm, title: e.target.value })}
              fullWidth
              required
              autoFocus
            />
            <TextField
              label="Image URL"
              value={columnForm.image}
              onChange={(e) => setColumnForm({ ...columnForm, image: e.target.value })}
              fullWidth
              placeholder="https://example.com/image.jpg"
              helperText="Optional: Add an image to this column"
              InputProps={{
                startAdornment: <ImageIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            <TextField
              label="Description"
              value={columnForm.description}
              onChange={(e) => setColumnForm({ ...columnForm, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
              helperText="Optional: Brief description for this column"
            />
            <TextField
              label="Content"
              value={columnForm.content}
              onChange={(e) => setColumnForm({ ...columnForm, content: e.target.value })}
              fullWidth
              multiline
              rows={3}
              helperText="Optional: Additional content text for this column"
            />
            <Divider sx={{ my: 1 }}>
              <Chip label="Button (Optional)" size="small" />
            </Divider>
            <TextField
              label="Button Text"
              value={columnForm.buttonText}
              onChange={(e) => setColumnForm({ ...columnForm, buttonText: e.target.value })}
              fullWidth
              placeholder="Learn More"
              helperText="Optional: Button text"
            />
            <TextField
              label="Button URL"
              value={columnForm.buttonUrl}
              onChange={(e) => setColumnForm({ ...columnForm, buttonUrl: e.target.value })}
              fullWidth
              placeholder="/services"
              helperText="Optional: Button link URL"
            />
            <TextField
              select
              label="Button Style"
              value={columnForm.buttonStyle}
              onChange={(e) => setColumnForm({ ...columnForm, buttonStyle: e.target.value })}
              fullWidth
              helperText="Button appearance style"
            >
              <MuiMenuItem value="primary">Primary (Blue)</MuiMenuItem>
              <MuiMenuItem value="secondary">Secondary (Gray)</MuiMenuItem>
              <MuiMenuItem value="outlined">Outlined</MuiMenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenColumnDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveColumn} variant="contained">
            {editingColumn ? 'Update' : 'Add'} Column
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menu Item Dialog */}
      <Dialog open={openItemDialog} onClose={() => setOpenItemDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Item Title"
              value={itemForm.title}
              onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
              fullWidth
              required
              autoFocus
            />
            <TextField
              label="URL"
              value={itemForm.url}
              onChange={(e) => setItemForm({ ...itemForm, url: e.target.value })}
              fullWidth
              required
              placeholder="/services/web-development"
            />
            <TextField
              label="Description"
              value={itemForm.description}
              onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
              helperText="Optional: Brief description"
            />
            <TextField
              label="Icon"
              value={itemForm.icon}
              onChange={(e) => setItemForm({ ...itemForm, icon: e.target.value })}
              fullWidth
              helperText="Optional: Icon name or class"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenItemDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveItem} variant="contained">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
