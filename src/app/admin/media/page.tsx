'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
  Tabs,
  Tab,
} from '@mui/material'
import { Delete, ContentCopy, CloudUpload, Image as ImageIcon, Collections } from '@mui/icons-material'
import { useSession } from 'next-auth/react'

interface MediaFile {
  _id: string
  filename: string
  originalName: string
  url: string
  alt?: string
  caption?: string
  size: number
  mimeType: string
  createdAt: string
}

export default function MediaPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchMedia()
    }
  }, [status, router])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/admin/media')
      if (response.ok) {
        const data = await response.json()
        setMedia(data)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/media/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          await fetchMedia()
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMedia(media.filter(m => m._id !== id))
      }
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('URL copied to clipboard!')
  }

  const handleUpdateMetadata = async () => {
    if (!selectedFile) return

    try {
      const response = await fetch(`/api/admin/media/${selectedFile._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alt: selectedFile.alt,
          caption: selectedFile.caption,
        }),
      })

      if (response.ok) {
        await fetchMedia()
        setOpenDialog(false)
      }
    } catch (error) {
      console.error('Error updating metadata:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  if (status === 'loading' || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Media Library
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab icon={<ImageIcon />} label="All Media" />
          <Tab icon={<Collections />} label="Galleries" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <>
          {media.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <ImageIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No media files yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Upload your first image to get started
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {media.map((file) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={file._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={file.url}
                      alt={file.alt || file.originalName}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="body2" noWrap title={file.originalName}>
                        {file.originalName}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip label={formatFileSize(file.size)} size="small" />
                        <Chip label={file.mimeType.split('/')[1].toUpperCase()} size="small" />
                      </Box>
                      {file.alt && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          Alt: {file.alt}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() => handleCopyUrl(file.url)}
                        title="Copy URL"
                      >
                        <ContentCopy fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedFile(file)
                          setOpenDialog(true)
                        }}
                        title="Edit"
                      >
                        <ImageIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(file._id)}
                        color="error"
                        title="Delete"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {tabValue === 1 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Collections sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Gallery management coming soon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create and manage image galleries for your website
          </Typography>
        </Box>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Image Metadata</DialogTitle>
        <DialogContent>
          {selectedFile && (
            <Box sx={{ mt: 2 }}>
              <Box
                component="img"
                src={selectedFile.url}
                alt={selectedFile.alt || selectedFile.originalName}
                sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 1, mb: 2 }}
              />
              <TextField
                fullWidth
                label="Alt Text"
                value={selectedFile.alt || ''}
                onChange={(e) => setSelectedFile({ ...selectedFile, alt: e.target.value })}
                margin="normal"
                helperText="Describe the image for SEO and accessibility"
              />
              <TextField
                fullWidth
                label="Caption"
                value={selectedFile.caption || ''}
                onChange={(e) => setSelectedFile({ ...selectedFile, caption: e.target.value })}
                margin="normal"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label="URL"
                value={selectedFile.url}
                margin="normal"
                InputProps={{ readOnly: true }}
                helperText="Click to copy"
                onClick={() => handleCopyUrl(selectedFile.url)}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateMetadata} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
