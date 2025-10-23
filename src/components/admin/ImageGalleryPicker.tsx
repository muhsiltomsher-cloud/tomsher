'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Chip,
} from '@mui/material';
import { Close, CloudUpload, Check } from '@mui/icons-material';
import toast from 'react-hot-toast';

interface MediaItem {
  _id: string;
  url: string;
  filename: string;
  altText?: string;
  caption?: string;
  size: number;
  mimeType: string;
}

interface ImageGalleryPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentImage?: string;
  title?: string;
}

export default function ImageGalleryPicker({
  open,
  onClose,
  onSelect,
  currentImage,
  title = 'Select Image',
}: ImageGalleryPickerProps) {
  const [tabValue, setTabValue] = useState(0);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(currentImage || '');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchMediaItems();
      setSelectedImage(currentImage || '');
    }
  }, [open, currentImage]);

  const fetchMediaItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/media');
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data);
      } else {
        toast.error('Failed to load media library');
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newMedia = await response.json();
        toast.success('Image uploaded successfully');
        setMediaItems([newMedia, ...mediaItems]);
        setSelectedImage(newMedia.url);
        setTabValue(0); // Switch to gallery tab
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = () => {
    if (selectedImage) {
      onSelect(selectedImage);
      onClose();
    } else {
      toast.error('Please select an image');
    }
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="Media Library" />
          <Tab label="Upload New" />
        </Tabs>

        {/* Gallery Tab */}
        {tabValue === 0 && (
          <Box>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : mediaItems.length === 0 ? (
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
                  No images in library
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload your first image to get started
                </Typography>
                <Button variant="contained" onClick={() => setTabValue(1)}>
                  Upload Image
                </Button>
              </Box>
            ) : (
              <Grid container spacing={2} sx={{ maxHeight: '500px', overflow: 'auto' }}>
                {mediaItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        position: 'relative',
                        border: selectedImage === item.url ? '3px solid' : '1px solid',
                        borderColor: selectedImage === item.url ? 'primary.main' : 'divider',
                        '&:hover': {
                          boxShadow: 4,
                          borderColor: 'primary.light',
                        },
                      }}
                      onClick={() => handleImageClick(item.url)}
                    >
                      {selectedImage === item.url && (
                        <Chip
                          icon={<Check />}
                          label="Selected"
                          color="primary"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1,
                          }}
                        />
                      )}
                      <CardMedia
                        component="img"
                        height="160"
                        image={item.url}
                        alt={item.altText || item.filename}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.filename}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {(item.size / 1024).toFixed(1)} KB
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Upload Tab */}
        {tabValue === 1 && (
          <Box>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 6,
                textAlign: 'center',
                bgcolor: 'background.default',
              }}
            >
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload-input"
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <label htmlFor="image-upload-input">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <CloudUpload sx={{ fontSize: 64, color: 'text.secondary' }} />
                  <Typography variant="h6" gutterBottom>
                    {uploading ? 'Uploading...' : 'Click to upload image'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supports: JPG, PNG, GIF, WebP (Max 10MB)
                  </Typography>
                  <Button variant="contained" component="span" disabled={uploading}>
                    {uploading ? <CircularProgress size={24} /> : 'Choose File'}
                  </Button>
                </Box>
              </label>
            </Box>

            {selectedImage && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Selected Image:
                </Typography>
                <Card sx={{ maxWidth: 300 }}>
                  <CardMedia component="img" height="200" image={selectedImage} alt="Selected" />
                </Card>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSelect} variant="contained" disabled={!selectedImage}>
          Select Image
        </Button>
      </DialogActions>
    </Dialog>
  );
}
