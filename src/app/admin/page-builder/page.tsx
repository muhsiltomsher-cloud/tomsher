'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Card,
  CardContent,
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
  Alert
} from '@mui/material'
import { Add, Edit, Delete, Visibility, VisibilityOff, ContentCopy } from '@mui/icons-material'
import { useSession } from 'next-auth/react'

interface CustomPage {
  _id: string
  title: string
  slug: string
  description?: string
  type: string
  status: string
  sections: any[]
  isPublished?: boolean
  createdAt: string
  updatedAt: string
}

export default function PageBuilderPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [pages, setPages] = useState<CustomPage[]>([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    seoTitle: '',
    seoDescription: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchPages()
    }
  }, [status, router])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/page-builder')
      if (response.ok) {
        const data = await response.json()
        setPages(data)
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      seoTitle: '',
      seoDescription: '',
    })
    setError('')
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setError('')
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/page-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newPage = await response.json()
        setPages([...pages, newPage])
        handleCloseDialog()
        router.push(`/admin/page-builder/${newPage._id}`)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create page')
      }
    } catch (error) {
      setError('An error occurred while creating the page')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      const response = await fetch(`/api/admin/page-builder/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPages(pages.filter(p => p._id !== id))
      }
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }

  const handleTogglePublish = async (page: CustomPage) => {
    try {
      const response = await fetch(`/api/admin/page-builder/${page._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !page.isPublished }),
      })

      if (response.ok) {
        const updatedPage = await response.json()
        setPages(pages.map(p => p._id === page._id ? updatedPage : p))
      }
    } catch (error) {
      console.error('Error toggling publish status:', error)
    }
  }

  const handleDuplicate = async (page: CustomPage) => {
    try {
      const response = await fetch('/api/admin/page-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${page.title} (Copy)`,
          slug: `${page.slug}-copy`,
          description: page.description,
          sections: page.sections,
          isPublished: false,
        }),
      })

      if (response.ok) {
        const newPage = await response.json()
        setPages([...pages, newPage])
      }
    } catch (error) {
      console.error('Error duplicating page:', error)
    }
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
          Page Builder
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Create New Page
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Build custom pages using prebuilt section components. Perfect for service pages, landing pages, and more!
      </Alert>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Sections</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No pages yet. Create your first custom page!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              pages.map((page) => (
                <TableRow key={page._id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      {page.title}
                    </Typography>
                    {page.description && (
                      <Typography variant="caption" color="text.secondary">
                        {page.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <code>/{page.slug}</code>
                  </TableCell>
                  <TableCell>
                    <Chip label={page.type || 'CUSTOM'} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={`${page.sections?.length || 0} sections`} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={page.status === 'PUBLISHED' || page.isPublished ? 'Published' : 'Draft'}
                      color={page.status === 'PUBLISHED' || page.isPublished ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/admin/page-builder/${page._id}`)}
                      title="Edit Page"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleTogglePublish(page)}
                      title={page.isPublished ? 'Unpublish' : 'Publish'}
                    >
                      {page.isPublished ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDuplicate(page)}
                      title="Duplicate Page"
                    >
                      <ContentCopy />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(page._id)}
                      color="error"
                      title="Delete Page"
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

      {/* Create Page Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Page</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Page Title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            margin="normal"
            required
            helperText="URL-friendly version of the title"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="SEO Title"
            value={formData.seoTitle}
            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="SEO Description"
            value={formData.seoDescription}
            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" disabled={!formData.title || !formData.slug}>
            Create & Build
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
