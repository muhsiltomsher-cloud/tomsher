'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Chip,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material'
import { Delete, Edit, Add } from '@mui/icons-material'
import { useSession } from 'next-auth/react'

interface SEOSettings {
  _id: string
  pageId: string
  pageType: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: string
  canonicalUrl?: string
  robots?: string
  focusKeyword?: string
}

export default function SEOPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentSEO, setCurrentSEO] = useState<Partial<SEOSettings>>({
    pageType: 'Page',
    keywords: [],
    robots: 'index, follow',
    twitterCard: 'summary_large_image'
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchSEOSettings()
    }
  }, [status, router])

  const fetchSEOSettings = async () => {
    try {
      const response = await fetch('/api/admin/seo')
      if (response.ok) {
        const data = await response.json()
        setSeoSettings(data)
      }
    } catch (error) {
      console.error('Error fetching SEO settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (seo?: SEOSettings) => {
    if (seo) {
      setCurrentSEO(seo)
      setEditMode(true)
    } else {
      setCurrentSEO({
        pageType: 'Page',
        keywords: [],
        robots: 'index, follow',
        twitterCard: 'summary_large_image'
      })
      setEditMode(false)
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCurrentSEO({
      pageType: 'Page',
      keywords: [],
      robots: 'index, follow',
      twitterCard: 'summary_large_image'
    })
  }

  const handleSave = async () => {
    try {
      const url = editMode ? `/api/admin/seo/${currentSEO._id}` : '/api/admin/seo'
      const method = editMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSEO),
      })

      if (response.ok) {
        fetchSEOSettings()
        handleCloseDialog()
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SEO setting?')) return

    try {
      const response = await fetch(`/api/admin/seo/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchSEOSettings()
      }
    } catch (error) {
      console.error('Error deleting SEO setting:', error)
    }
  }

  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k)
    setCurrentSEO({ ...currentSEO, keywords })
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
          SEO Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add SEO Setting
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Page Type</TableCell>
              <TableCell>Meta Title</TableCell>
              <TableCell>Focus Keyword</TableCell>
              <TableCell>Keywords</TableCell>
              <TableCell>Robots</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seoSettings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No SEO settings yet. Click "Add SEO Setting" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              seoSettings.map((seo) => (
                <TableRow key={seo._id} hover>
                  <TableCell>
                    <Chip label={seo.pageType} size="small" />
                  </TableCell>
                  <TableCell>{seo.metaTitle}</TableCell>
                  <TableCell>{seo.focusKeyword || '-'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {seo.keywords.slice(0, 3).map((keyword, i) => (
                        <Chip key={i} label={keyword} size="small" />
                      ))}
                      {seo.keywords.length > 3 && (
                        <Chip label={`+${seo.keywords.length - 3}`} size="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{seo.robots}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(seo)}
                      title="Edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(seo._id)}
                      color="error"
                      title="Delete"
                    >
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
        <DialogTitle>{editMode ? 'Edit SEO Setting' : 'Add SEO Setting'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Page Type</InputLabel>
                <Select
                  value={currentSEO.pageType || 'Page'}
                  onChange={(e) => setCurrentSEO({ ...currentSEO, pageType: e.target.value })}
                  label="Page Type"
                >
                  <MenuItem value="Page">Page</MenuItem>
                  <MenuItem value="BlogPost">Blog Post</MenuItem>
                  <MenuItem value="Portfolio">Portfolio</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Focus Keyword"
                value={currentSEO.focusKeyword || ''}
                onChange={(e) => setCurrentSEO({ ...currentSEO, focusKeyword: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Title"
                value={currentSEO.metaTitle || ''}
                onChange={(e) => setCurrentSEO({ ...currentSEO, metaTitle: e.target.value })}
                helperText="Recommended: 50-60 characters"
                inputProps={{ maxLength: 60 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Description"
                value={currentSEO.metaDescription || ''}
                onChange={(e) => setCurrentSEO({ ...currentSEO, metaDescription: e.target.value })}
                multiline
                rows={3}
                helperText="Recommended: 150-160 characters"
                inputProps={{ maxLength: 160 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Keywords (comma-separated)"
                value={currentSEO.keywords?.join(', ') || ''}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                helperText="Enter keywords separated by commas"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="OG Title"
                value={currentSEO.ogTitle || ''}
                onChange={(e) => setCurrentSEO({ ...currentSEO, ogTitle: e.target.value })}
                helperText="For social media sharing"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="OG Image URL"
                value={currentSEO.ogImage || ''}
                onChange={(e) => setCurrentSEO({ ...currentSEO, ogImage: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="OG Description"
                value={currentSEO.ogDescription || ''}
                onChange={(e) => setCurrentSEO({ ...currentSEO, ogDescription: e.target.value })}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Twitter Card</InputLabel>
                <Select
                  value={currentSEO.twitterCard || 'summary_large_image'}
                  onChange={(e) => setCurrentSEO({ ...currentSEO, twitterCard: e.target.value })}
                  label="Twitter Card"
                >
                  <MenuItem value="summary">Summary</MenuItem>
                  <MenuItem value="summary_large_image">Summary Large Image</MenuItem>
                  <MenuItem value="app">App</MenuItem>
                  <MenuItem value="player">Player</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Canonical URL"
                value={currentSEO.canonicalUrl || ''}
                onChange={(e) => setCurrentSEO({ ...currentSEO, canonicalUrl: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Robots"
                value={currentSEO.robots || 'index, follow'}
                onChange={(e) => setCurrentSEO({ ...currentSEO, robots: e.target.value })}
                helperText="e.g., index, follow or noindex, nofollow"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
