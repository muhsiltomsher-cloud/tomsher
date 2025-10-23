'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
  TextField,
  Typography,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material'
import {
  Add,
  ArrowUpward,
  ArrowDownward,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
  Save,
  ArrowBack,
  Image as ImageIcon,
} from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { sectionDefinitions } from '@/components/sections'
import ImagePicker from '@/components/admin/ImagePicker'

interface PageSection {
  _id?: string
  sectionId: string
  componentName: string
  order: number
  data: any
  isVisible: boolean
}

interface CustomPage {
  _id: string
  title: string
  slug: string
  description?: string
  sections: PageSection[]
  isPublished: boolean
  seoTitle?: string
  seoDescription?: string
}

export default function PageBuilderEditor() {
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string
  const { data: session, status } = useSession()
  
  const [page, setPage] = useState<CustomPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedSection, setSelectedSection] = useState<any>(null)
  const [editingSection, setEditingSection] = useState<PageSection | null>(null)
  const [sectionData, setSectionData] = useState<any>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imagePickerOpen, setImagePickerOpen] = useState(false)
  const [currentImageField, setCurrentImageField] = useState<string>('')

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/admin/page-builder/${pageId}`)
        if (response.ok) {
          const data = await response.json()
          setPage(data)
        } else {
          setError('Failed to load page')
        }
      } catch (error) {
        console.error('Error fetching page:', error)
        setError('An error occurred while loading the page')
      } finally {
        setLoading(false)
      }
    }

    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchPage()
    }
  }, [status, router, pageId])

  const handleAddSection = () => {
    setSelectedSection(null)
    setSectionData({})
    setOpenAddDialog(true)
  }

  const handleSelectSectionType = (sectionDef: any) => {
    setSelectedSection(sectionDef)
    setSectionData(sectionDef.defaultData || {})
  }

  const handleSaveNewSection = async () => {
    if (!selectedSection || !page) return

    const newSection: PageSection = {
      sectionId: selectedSection.id,
      componentName: selectedSection.component,
      order: page.sections.length,
      data: sectionData,
      isVisible: true,
    }

    const updatedSections = [...page.sections, newSection]
    await savePage({ sections: updatedSections })
    setOpenAddDialog(false)
  }

  const handleEditSection = (section: PageSection) => {
    setEditingSection(section)
    setSectionData(section.data || {})
    setOpenEditDialog(true)
  }

  const handleSaveEditSection = async () => {
    if (!editingSection || !page) return

    const updatedSections = page.sections.map(s =>
      s === editingSection ? { ...s, data: sectionData } : s
    )

    await savePage({ sections: updatedSections })
    setOpenEditDialog(false)
  }

  const handleDeleteSection = async (section: PageSection) => {
    if (!confirm('Are you sure you want to delete this section?')) return
    if (!page) return

    const updatedSections = page.sections
      .filter(s => s !== section)
      .map((s, index) => ({ ...s, order: index }))

    await savePage({ sections: updatedSections })
  }

  const handleToggleVisibility = async (section: PageSection) => {
    if (!page) return

    const updatedSections = page.sections.map(s =>
      s === section ? { ...s, isVisible: !s.isVisible } : s
    )

    await savePage({ sections: updatedSections })
  }

  const handleMoveSection = async (section: PageSection, direction: 'up' | 'down') => {
    if (!page) return

    const currentIndex = page.sections.indexOf(section)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= page.sections.length) return

    const updatedSections = [...page.sections]
    const [movedSection] = updatedSections.splice(currentIndex, 1)
    updatedSections.splice(newIndex, 0, movedSection)

    const reorderedSections = updatedSections.map((s, index) => ({
      ...s,
      order: index,
    }))

    await savePage({ sections: reorderedSections })
  }

  const savePage = async (updates: Partial<CustomPage>) => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`/api/admin/page-builder/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updatedPage = await response.json()
        setPage(updatedPage)
        setSuccess('Changes saved successfully!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to save changes')
      }
    } catch (error) {
      console.error('Error saving page:', error)
      setError('An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  const handleImageSelect = (imageUrl: string, alt?: string) => {
    setSectionData({ ...sectionData, [currentImageField]: imageUrl })
    setImagePickerOpen(false)
  }

  const renderSectionForm = (sectionDef: any, data: any, onChange: (data: any) => void) => {
    if (!sectionDef) return null

    return (
      <Box sx={{ mt: 2 }}>
        {Object.entries(sectionDef.schema).map(([key, field]: [string, any]) => {
          if (field.type === 'text') {
            return (
              <TextField
                key={key}
                fullWidth
                label={field.label}
                value={data[key] || ''}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                margin="normal"
                required={field.required}
              />
            )
          }

          if (field.type === 'textarea') {
            return (
              <TextField
                key={key}
                fullWidth
                label={field.label}
                value={data[key] || ''}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                margin="normal"
                multiline
                rows={3}
                required={field.required}
              />
            )
          }

          if (field.type === 'select') {
            return (
              <FormControl fullWidth margin="normal" key={key}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={data[key] || field.options[0]}
                  onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                  label={field.label}
                >
                  {field.options.map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          }

          if (field.type === 'image') {
            return (
              <Box key={key} sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {field.label}
                </Typography>
                {data[key] && (
                  <Box sx={{ mb: 1 }}>
                    <img 
                      src={data[key]} 
                      alt={field.label}
                      style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </Box>
                )}
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  onClick={() => {
                    setCurrentImageField(key)
                    setImagePickerOpen(true)
                  }}
                >
                  {data[key] ? 'Change Image' : 'Select Image'}
                </Button>
                {data[key] && (
                  <Button
                    size="small"
                    onClick={() => onChange({ ...data, [key]: '' })}
                    sx={{ ml: 1 }}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            )
          }

          return null
        })}
      </Box>
    )
  }

  if (status === 'loading' || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!page) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Page not found</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => router.push('/admin/page-builder')}>
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h4" component="h1">
              {page.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              /{page.slug}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip
            label={page.isPublished ? 'Published' : 'Draft'}
            color={page.isPublished ? 'success' : 'default'}
          />
          <Button
            variant="outlined"
            onClick={() => window.open(`/${page.slug}`, '_blank')}
            disabled={!page.isPublished}
          >
            Preview
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Page Sections</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddSection}
              >
                Add Section
              </Button>
            </Box>

            {page.sections.length === 0 ? (
              <Alert severity="info">
                No sections yet. Click "Add Section" to start building your page.
              </Alert>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {page.sections.map((section, index) => (
                  <Card key={index} sx={{ opacity: section.isVisible ? 1 : 0.5 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6">{section.componentName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Order: {section.order}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleMoveSection(section, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUpward />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleMoveSection(section, 'down')}
                            disabled={index === page.sections.length - 1}
                          >
                            <ArrowDownward />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleToggleVisibility(section)}
                          >
                            {section.isVisible ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEditSection(section)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteSection(section)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Available Sections
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {sectionDefinitions.map((def) => (
                <Card key={def.id} sx={{ cursor: 'pointer' }} onClick={() => handleSelectSectionType(def)}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {def.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {def.description}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {def.variants.map((variant) => (
                        <Chip key={variant} label={variant} size="small" sx={{ mr: 0.5, mt: 0.5 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Section Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedSection ? `Add ${selectedSection.name}` : 'Select Section Type'}
        </DialogTitle>
        <DialogContent>
          {!selectedSection ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              {sectionDefinitions.map((def) => (
                <Card
                  key={def.id}
                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => handleSelectSectionType(def)}
                >
                  <CardContent>
                    <Typography variant="h6">{def.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {def.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            renderSectionForm(selectedSection, sectionData, setSectionData)
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          {selectedSection && (
            <Button onClick={handleSaveNewSection} variant="contained" disabled={saving}>
              Add Section
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Edit Section Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Section</DialogTitle>
        <DialogContent>
          {editingSection && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                {editingSection.componentName}
              </Typography>
              {renderSectionForm(
                sectionDefinitions.find(d => d.component === editingSection.componentName),
                sectionData,
                setSectionData
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEditSection} variant="contained" disabled={saving}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Picker Dialog */}
      <ImagePicker
        open={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={handleImageSelect}
        title="Select Image"
      />
    </Box>
  )
}
