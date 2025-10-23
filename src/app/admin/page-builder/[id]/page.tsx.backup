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
  Preview as PreviewIcon,
  Code as CodeIcon,
} from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { sectionDefinitions, sectionRegistry } from '@/components/sections'
import ImagePicker from '@/components/admin/ImagePicker'
import RichTextEditor from '@/components/editor/RichTextEditor'

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

function DatabaseMultiSelect({ field, fieldKey, value, onChange }: any) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(field.apiEndpoint)
        if (response.ok) {
          const data = await response.json()
          setOptions(data)
        }
      } catch (error) {
        console.error('Error fetching options:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOptions()
  }, [field.apiEndpoint])

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{field.label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={field.label}
        disabled={loading}
      >
        {loading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem key={option[field.valueField]} value={option[field.valueField]}>
              {option[field.displayField]}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
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
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState<any>({})

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
    const defaultData = sectionDef.defaultData || {}
    setSectionData(defaultData)
    setPreviewData(defaultData)
    setShowPreview(true)
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
    const data = section.data || {}
    setSectionData(data)
    setPreviewData(data)
    setShowPreview(true)
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
    if (currentImageField.includes('.')) {
      const parts = currentImageField.split('.')
      const newData = { ...sectionData }
      
      if (parts.length === 3) {
        const [arrayKey, indexStr, fieldKey] = parts
        const index = parseInt(indexStr)
        const array = [...(newData[arrayKey] || [])]
        array[index] = { ...array[index], [fieldKey]: imageUrl }
        newData[arrayKey] = array
      } else {
        newData[currentImageField] = imageUrl
      }
      
      setSectionData(newData)
      setPreviewData(newData)
    } else {
      const newData = { ...sectionData, [currentImageField]: imageUrl }
      setSectionData(newData)
      setPreviewData(newData)
    }
    setImagePickerOpen(false)
  }

  const renderLivePreview = (sectionDef: any, data: any) => {
    if (!sectionDef || !data) {
      return (
        <Alert severity="info">
          No section selected or data is empty.
        </Alert>
      )
    }

    const SectionComponent = sectionRegistry[sectionDef.component]
    if (!SectionComponent) {
      return (
        <Alert severity="error">
          Component "{sectionDef.component}" not found in registry. Available components: {Object.keys(sectionRegistry).join(', ')}
        </Alert>
      )
    }

    try {
      return <SectionComponent data={data} />
    } catch (error) {
      console.error('Preview error:', error)
      return (
        <Alert severity="warning">
          Preview error: {error instanceof Error ? error.message : 'Please fill in required fields'}
        </Alert>
      )
    }
  }

  const renderSectionForm = (sectionDef: any, data: any, onChange: (data: any) => void) => {
    if (!sectionDef) return null

    const handleChange = (newData: any) => {
      onChange(newData)
      setPreviewData(newData)
    }

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
                onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                margin="normal"
                required={field.required}
              />
            )
          }

          if (field.type === 'textarea') {
            return (
              <Box key={key} sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                </Typography>
                <RichTextEditor
                  value={data[key] || ''}
                  onChange={(value) => handleChange({ ...data, [key]: value })}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  height="200px"
                />
              </Box>
            )
          }

          if (field.type === 'select') {
            return (
              <FormControl fullWidth margin="normal" key={key}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={data[key] || field.options[0]}
                  onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
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
                    onClick={() => handleChange({ ...data, [key]: '' })}
                    sx={{ ml: 1 }}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            )
          }

          if (field.type === 'color') {
            return (
              <Box key={key} sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={data[key] || '#000000'}
                    onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                    style={{
                      width: '60px',
                      height: '40px',
                      border: '2px solid #ddd',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  />
                  <TextField
                    value={data[key] || '#000000'}
                    onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                    placeholder="#000000"
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  {data[key] && (
                    <Button
                      size="small"
                      onClick={() => handleChange({ ...data, [key]: '' })}
                    >
                      Reset
                    </Button>
                  )}
                </Box>
              </Box>
            )
          }

          if (field.type === 'number') {
            return (
              <TextField
                key={key}
                fullWidth
                type="number"
                label={field.label}
                value={data[key] || ''}
                onChange={(e) => handleChange({ ...data, [key]: Number(e.target.value) })}
                margin="normal"
                required={field.required}
              />
            )
          }

          if (field.type === 'checkbox') {
            return (
              <Box key={key} sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={data[key] || false}
                  onChange={(e) => handleChange({ ...data, [key]: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                <Typography variant="body2">{field.label}</Typography>
              </Box>
            )
          }

          if (field.type === 'tags') {
            return (
              <Box key={key} sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                </Typography>
                <TextField
                  fullWidth
                  value={Array.isArray(data[key]) ? data[key].join(', ') : ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t)
                    handleChange({ ...data, [key]: tags })
                  }}
                  placeholder="Enter tags separated by commas"
                  helperText="Separate tags with commas"
                />
              </Box>
            )
          }

          if (field.type === 'multiselect-db') {
            return (
              <DatabaseMultiSelect
                key={key}
                field={field}
                fieldKey={key}
                value={data[key] || []}
                onChange={(value) => handleChange({ ...data, [key]: value })}
              />
            )
          }

          if (field.type === 'array') {
            const arrayData = data[key] || []
            return (
              <Box key={key} sx={{ my: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {field.label}
                </Typography>
                {arrayData.map((item: any, index: number) => (
                  <Card key={index} sx={{ mb: 2, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle2">Item {index + 1}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          const newArray = arrayData.filter((_: any, i: number) => i !== index)
                          handleChange({ ...data, [key]: newArray })
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    {Object.entries(field.itemSchema).map(([itemKey, itemField]: [string, any]) => {
                      if (itemField.type === 'text') {
                        return (
                          <TextField
                            key={itemKey}
                            fullWidth
                            label={itemField.label}
                            value={item[itemKey] || ''}
                            onChange={(e) => {
                              const newArray = [...arrayData]
                              newArray[index] = { ...newArray[index], [itemKey]: e.target.value }
                              handleChange({ ...data, [key]: newArray })
                            }}
                            margin="normal"
                            size="small"
                          />
                        )
                      }
                      if (itemField.type === 'textarea') {
                        return (
                          <Box key={itemKey} sx={{ my: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {itemField.label}
                            </Typography>
                            <RichTextEditor
                              value={item[itemKey] || ''}
                              onChange={(value) => {
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: value }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              placeholder={`Enter ${itemField.label.toLowerCase()}...`}
                              height="150px"
                            />
                          </Box>
                        )
                      }
                      if (itemField.type === 'select') {
                        return (
                          <FormControl fullWidth margin="normal" size="small" key={itemKey}>
                            <InputLabel>{itemField.label}</InputLabel>
                            <Select
                              value={item[itemKey] || itemField.options[0]}
                              onChange={(e) => {
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: e.target.value }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              label={itemField.label}
                            >
                              {itemField.options.map((option: string) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )
                      }
                      if (itemField.type === 'image') {
                        return (
                          <Box key={itemKey} sx={{ my: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {itemField.label}
                            </Typography>
                            {item[itemKey] && (
                              <Box sx={{ mb: 1 }}>
                                <img 
                                  src={item[itemKey]} 
                                  alt={itemField.label}
                                  style={{ maxWidth: '150px', maxHeight: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                              </Box>
                            )}
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<ImageIcon />}
                              onClick={() => {
                                setCurrentImageField(`${key}.${index}.${itemKey}`)
                                setImagePickerOpen(true)
                              }}
                            >
                              {item[itemKey] ? 'Change' : 'Select'}
                            </Button>
                          </Box>
                        )
                      }
                      if (itemField.type === 'tags') {
                        return (
                          <Box key={itemKey} sx={{ my: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {itemField.label}
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              value={Array.isArray(item[itemKey]) ? item[itemKey].join(', ') : ''}
                              onChange={(e) => {
                                const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t)
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: tags }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              placeholder="Enter tags separated by commas"
                            />
                          </Box>
                        )
                      }
                      if (itemField.type === 'number') {
                        return (
                          <TextField
                            key={itemKey}
                            fullWidth
                            type="number"
                            label={itemField.label}
                            value={item[itemKey] || ''}
                            onChange={(e) => {
                              const newArray = [...arrayData]
                              newArray[index] = { ...newArray[index], [itemKey]: Number(e.target.value) }
                              handleChange({ ...data, [key]: newArray })
                            }}
                            margin="normal"
                            size="small"
                          />
                        )
                      }
                      if (itemField.type === 'checkbox') {
                        return (
                          <Box key={itemKey} sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
                            <input
                              type="checkbox"
                              checked={item[itemKey] || false}
                              onChange={(e) => {
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: e.target.checked }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              style={{ marginRight: '8px' }}
                            />
                            <Typography variant="caption">{itemField.label}</Typography>
                          </Box>
                        )
                      }
                      return null
                    })}
                  </Card>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => {
                    const newItem = {}
                    handleChange({ ...data, [key]: [...arrayData, newItem] })
                  }}
                  fullWidth
                >
                  Add {field.label}
                </Button>
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
      <Dialog 
        open={openAddDialog} 
        onClose={() => {
          setOpenAddDialog(false)
          setShowPreview(false)
        }} 
        maxWidth="xl" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{selectedSection ? `Add ${selectedSection.name}` : 'Select Section Type'}</span>
            {selectedSection && (
              <Button
                startIcon={showPreview ? <CodeIcon /> : <PreviewIcon />}
                onClick={() => setShowPreview(!showPreview)}
                size="small"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            )}
          </Box>
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={showPreview ? 6 : 12}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50', maxHeight: '70vh', overflow: 'auto' }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon /> Configuration
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {renderSectionForm(selectedSection, sectionData, setSectionData)}
                </Paper>
              </Grid>
              {showPreview && (
                <Grid item xs={12} md={6}>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      maxHeight: '70vh', 
                      overflow: 'auto',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1, 
                      mb: 2,
                      pb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.main'
                    }}>
                      <PreviewIcon color="primary" />
                      <Typography variant="h6" color="primary">
                        Live Preview
                      </Typography>
                      <Chip label="Real-time" size="small" color="success" />
                    </Box>
                    <Box sx={{ 
                      minHeight: 200,
                      '& > *': { width: '100%' }
                    }}>
                      {renderLivePreview(selectedSection, previewData)}
                    </Box>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAddDialog(false)
            setShowPreview(false)
          }}>
            Cancel
          </Button>
          {selectedSection && (
            <Button onClick={handleSaveNewSection} variant="contained" disabled={saving}>
              Add Section
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Edit Section Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => {
          setOpenEditDialog(false)
          setShowPreview(false)
        }} 
        maxWidth="xl" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Edit Section</span>
            <Button
              startIcon={showPreview ? <CodeIcon /> : <PreviewIcon />}
              onClick={() => setShowPreview(!showPreview)}
              size="small"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {editingSection && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={showPreview ? 6 : 12}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50', maxHeight: '70vh', overflow: 'auto' }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon /> Configuration
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {editingSection.componentName}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {renderSectionForm(
                    sectionDefinitions.find(d => d.component === editingSection.componentName),
                    sectionData,
                    setSectionData
                  )}
                </Paper>
              </Grid>
              {showPreview && (
                <Grid item xs={12} md={6}>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      maxHeight: '70vh', 
                      overflow: 'auto',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1, 
                      mb: 2,
                      pb: 2,
                      borderBottom: '2px solid',
                      borderColor: 'primary.main'
                    }}>
                      <PreviewIcon color="primary" />
                      <Typography variant="h6" color="primary">
                        Live Preview
                      </Typography>
                      <Chip label="Real-time" size="small" color="success" />
                    </Box>
                    <Box sx={{ 
                      minHeight: 200,
                      '& > *': { width: '100%' }
                    }}>
                      {renderLivePreview(
                        sectionDefinitions.find(d => d.component === editingSection.componentName),
                        previewData
                      )}
                    </Box>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenEditDialog(false)
            setShowPreview(false)
          }}>
            Cancel
          </Button>
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
