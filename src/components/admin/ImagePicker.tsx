'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Search, Close, CloudUpload } from '@mui/icons-material';

interface ImagePickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string, alt?: string) => void;
  title?: string;
}

export default function ImagePicker({ open, onClose, onSelect, title = 'Select Image' }: ImagePickerProps) {
  const [tab, setTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('business');
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  useEffect(() => {
    if (open && tab === 0) {
      searchUnsplash();
    }
    if (open && tab === 1) {
      fetchUploadedImages();
    }
  }, [open, tab]);

  const searchUnsplash = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/unsplash/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Failed to search images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/media');
      const data = await response.json();
      setUploadedImages(data || []);
    } catch (error) {
      console.error('Failed to fetch uploaded images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchUnsplash();
  };

  const handleImageSelect = (image: any) => {
    if (tab === 0) {
      onSelect(image.url, image.alt);
    } else {
      onSelect(image.url, image.altText || image.caption);
    }
    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchUploadedImages();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title}
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Unsplash (Free Stock Photos)" />
          <Tab label="My Uploads" />
        </Tabs>

        {tab === 0 && (
          <Box>
            <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for images (e.g., business, technology, nature)"
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit">
                      <Search />
                    </IconButton>
                  ),
                }}
              />
            </form>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Free high-quality images from Unsplash. Click any image to use it.
            </Typography>
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Upload New Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Button>
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ maxHeight: '500px', overflow: 'auto' }}>
            {(tab === 0 ? images : uploadedImages).map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Card 
                  sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
                  onClick={() => handleImageSelect(image)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={tab === 0 ? image.thumb : image.url}
                    alt={tab === 0 ? image.alt : image.altText}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="caption" noWrap>
                      {tab === 0 ? `By ${image.author}` : image.altText || 'Uploaded image'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
