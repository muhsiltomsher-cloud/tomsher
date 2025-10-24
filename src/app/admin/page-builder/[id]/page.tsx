'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { sectionDefinitions, sectionRegistry } from '@/components/sections'
import ImagePicker from '@/components/admin/ImagePicker'
import RichTextEditor from '@/components/editor/RichTextEditor'
import { useNotification } from '@/contexts/NotificationContext'
import {
  ArrowLeft,
  Plus,
  ChevronUp,
  ChevronDown,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  ExternalLink,
  Image as ImageIcon,
  X,
  Layers,
  Settings,
  Monitor,
  Code,
} from 'lucide-react'

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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
      </label>
      <select
        multiple
        value={value}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, option => option.value)
          onChange(selected)
        }}
        disabled={loading}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ minHeight: '120px' }}
      >
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          options.map((option) => (
            <option key={option[field.valueField]} value={option[field.valueField]}>
              {option[field.displayField]}
            </option>
          ))
        )}
      </select>
      <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
    </div>
  )
}

export default function PageBuilderEditor() {
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string
  const { data: session, status } = useSession()
  const notification = useNotification()
  
  const [page, setPage] = useState<CustomPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedSection, setSelectedSection] = useState<any>(null)
  const [editingSection, setEditingSection] = useState<PageSection | null>(null)
  const [sectionData, setSectionData] = useState<any>({})
  const [imagePickerOpen, setImagePickerOpen] = useState(false)
  const [currentImageField, setCurrentImageField] = useState<string>('')
  const [showPreview, setShowPreview] = useState(true)
  const [previewData, setPreviewData] = useState<any>({})

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/admin/page-builder/${pageId}`)
        if (response.ok) {
          const data = await response.json()
          setPage(data)
        } else {
          notification.error('Failed to load page')
        }
      } catch (error) {
        console.error('Error fetching page:', error)
        notification.error('An error occurred while loading the page')
      } finally {
        setLoading(false)
      }
    }

    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchPage()
    }
  }, [status, router, pageId, notification])

  useEffect(() => {
    setPreviewData(sectionData)
  }, [sectionData])

  const handleAddSection = () => {
    setSelectedSection(null)
    setSectionData({})
    setShowAddModal(true)
  }

  const handleSelectSectionType = (sectionDef: any) => {
    setSelectedSection(sectionDef)
    const defaultData = sectionDef.defaultData || {}
    setSectionData(defaultData)
    setPreviewData(defaultData)
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
    setShowAddModal(false)
    notification.success(`${selectedSection.name} added successfully!`)
  }

  const handleEditSection = (section: PageSection) => {
    setEditingSection(section)
    const data = section.data || {}
    setSectionData(data)
    setPreviewData(data)
    setShowEditModal(true)
  }

  const handleSaveEditSection = async () => {
    if (!editingSection || !page) return

    const updatedSections = page.sections.map(s =>
      s === editingSection ? { ...s, data: sectionData } : s
    )

    await savePage({ sections: updatedSections })
    setShowEditModal(false)
    notification.success('Section updated successfully!')
  }

  const handleDeleteSection = async (section: PageSection) => {
    if (!confirm('Are you sure you want to delete this section?')) return
    if (!page) return

    const updatedSections = page.sections
      .filter(s => s !== section)
      .map((s, index) => ({ ...s, order: index }))

    await savePage({ sections: updatedSections })
    notification.success('Section deleted successfully!')
  }

  const handleToggleVisibility = async (section: PageSection) => {
    if (!page) return

    const updatedSections = page.sections.map(s =>
      s === section ? { ...s, isVisible: !s.isVisible } : s
    )

    await savePage({ sections: updatedSections })
    notification.info(`Section ${section.isVisible ? 'hidden' : 'shown'}`)
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
    notification.success('Section reordered')
  }

  const savePage = async (updates: Partial<CustomPage>) => {
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/page-builder/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updatedPage = await response.json()
        setPage(updatedPage)
      } else {
        notification.error('Failed to save changes')
      }
    } catch (error) {
      console.error('Error saving page:', error)
      notification.error('An error occurred while saving')
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
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
          No section selected or data is empty.
        </div>
      )
    }

    const SectionComponent = sectionRegistry[sectionDef.component]
    if (!SectionComponent) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Component "{sectionDef.component}" not found in registry.
        </div>
      )
    }

    try {
      return <SectionComponent data={data} />
    } catch (error) {
      console.error('Preview error:', error)
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
          Preview error: {error instanceof Error ? error.message : 'Please fill in required fields'}
        </div>
      )
    }
  }

  const renderSectionForm = (sectionDef: any, data: any, onChange: (data: any) => void) => {
    if (!sectionDef) return null

    const handleChange = (newData: any) => {
      onChange(newData)
    }

    return (
      <div className="space-y-4">
        {Object.entries(sectionDef.schema).map(([key, field]: [string, any]) => {
          if (field.type === 'text') {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={data[key] || ''}
                  onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={field.required}
                />
              </div>
            )
          }

          if (field.type === 'textarea') {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <RichTextEditor
                  value={data[key] || ''}
                  onChange={(value) => handleChange({ ...data, [key]: value })}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  height="200px"
                />
              </div>
            )
          }

          if (field.type === 'select') {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <select
                  value={data[key] || field.options[0]}
                  onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {field.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )
          }

          if (field.type === 'image') {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {data[key] && (
                  <div className="mb-2">
                    <img 
                      src={data[key]} 
                      alt={field.label}
                      className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentImageField(key)
                      setImagePickerOpen(true)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <ImageIcon className="h-4 w-4" />
                    {data[key] ? 'Change Image' : 'Select Image'}
                  </button>
                  {data[key] && (
                    <button
                      type="button"
                      onClick={() => handleChange({ ...data, [key]: '' })}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )
          }

          if (field.type === 'color') {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={data[key] || '#000000'}
                    onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                    className="w-16 h-10 border-2 border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={data[key] || '#000000'}
                    onChange={(e) => handleChange({ ...data, [key]: e.target.value })}
                    placeholder="#000000"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {data[key] && (
                    <button
                      type="button"
                      onClick={() => handleChange({ ...data, [key]: '' })}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )
          }

          if (field.type === 'number') {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  value={data[key] || ''}
                  onChange={(e) => handleChange({ ...data, [key]: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={field.required}
                />
              </div>
            )
          }

          if (field.type === 'checkbox') {
            return (
              <div key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data[key] || false}
                  onChange={(e) => handleChange({ ...data, [key]: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">{field.label}</label>
              </div>
            )
          }

          if (field.type === 'tags') {
            return (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={Array.isArray(data[key]) ? data[key].join(', ') : ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t)
                    handleChange({ ...data, [key]: tags })
                  }}
                  placeholder="Enter tags separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
              </div>
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
              <div key={key} className="border-2 border-gray-200 rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">{field.label}</h3>
                {arrayData.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Item {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newArray = arrayData.filter((_: any, i: number) => i !== index)
                          handleChange({ ...data, [key]: newArray })
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {Object.entries(field.itemSchema).map(([itemKey, itemField]: [string, any]) => {
                      if (itemField.type === 'text') {
                        return (
                          <div key={itemKey}>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              {itemField.label}
                            </label>
                            <input
                              type="text"
                              value={item[itemKey] || ''}
                              onChange={(e) => {
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: e.target.value }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )
                      }
                      if (itemField.type === 'textarea') {
                        return (
                          <div key={itemKey}>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              {itemField.label}
                            </label>
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
                          </div>
                        )
                      }
                      if (itemField.type === 'select') {
                        return (
                          <div key={itemKey}>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              {itemField.label}
                            </label>
                            <select
                              value={item[itemKey] || itemField.options[0]}
                              onChange={(e) => {
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: e.target.value }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {itemField.options.map((option: string) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        )
                      }
                      if (itemField.type === 'image') {
                        return (
                          <div key={itemKey}>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              {itemField.label}
                            </label>
                            {item[itemKey] && (
                              <div className="mb-2">
                                <img 
                                  src={item[itemKey]} 
                                  alt={itemField.label}
                                  className="w-32 h-20 object-cover rounded border border-gray-200"
                                />
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentImageField(`${key}.${index}.${itemKey}`)
                                setImagePickerOpen(true)
                              }}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                            >
                              <ImageIcon className="h-3 w-3" />
                              {item[itemKey] ? 'Change' : 'Select'}
                            </button>
                          </div>
                        )
                      }
                      if (itemField.type === 'tags') {
                        return (
                          <div key={itemKey}>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              {itemField.label}
                            </label>
                            <input
                              type="text"
                              value={Array.isArray(item[itemKey]) ? item[itemKey].join(', ') : ''}
                              onChange={(e) => {
                                const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t)
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: tags }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              placeholder="Enter tags separated by commas"
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )
                      }
                      if (itemField.type === 'number') {
                        return (
                          <div key={itemKey}>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              {itemField.label}
                            </label>
                            <input
                              type="number"
                              value={item[itemKey] || ''}
                              onChange={(e) => {
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: Number(e.target.value) }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )
                      }
                      if (itemField.type === 'checkbox') {
                        return (
                          <div key={itemKey} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item[itemKey] || false}
                              onChange={(e) => {
                                const newArray = [...arrayData]
                                newArray[index] = { ...newArray[index], [itemKey]: e.target.checked }
                                handleChange({ ...data, [key]: newArray })
                              }}
                              className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-xs font-medium text-gray-600">{itemField.label}</label>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newItem = {}
                    handleChange({ ...data, [key]: [...arrayData, newItem] })
                  }}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add {field.label}
                </button>
              </div>
            )
          }

          return null
        })}
      </div>
    )
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page builder...</p>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Page not found
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/page-builder')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
                <p className="text-sm text-gray-500">/{page.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                page.isPublished 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {page.isPublished ? 'Published' : 'Draft'}
              </span>
              <button
                onClick={() => window.open(`/${page.slug}`, '_blank')}
                disabled={!page.isPublished}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Page Sections</h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {page.sections.length}
                </span>
              </div>
              <button
                onClick={handleAddSection}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Section
              </button>
            </div>

            {page.sections.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Layers className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No sections yet. Start building your page!</p>
                <button
                  onClick={handleAddSection}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {page.sections.map((section, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-lg p-4 transition-all ${
                      section.isVisible 
                        ? 'border-gray-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleMoveSection(section, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronUp className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleMoveSection(section, 'down')}
                            disabled={index === page.sections.length - 1}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronDown className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{section.componentName}</h3>
                          <p className="text-sm text-gray-500">Position: {section.order + 1}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleVisibility(section)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title={section.isVisible ? 'Hide section' : 'Show section'}
                        >
                          {section.isVisible ? (
                            <Eye className="h-4 w-4 text-gray-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditSection(section)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit section"
                        >
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteSection(section)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete section"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Available Sections</h3>
              </div>
            </div>
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {sectionDefinitions.map((def) => (
                <button
                  key={def.id}
                  onClick={() => {
                    handleSelectSectionType(def)
                    setShowAddModal(true)
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                    {def.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{def.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {def.variants.slice(0, 3).map((variant) => (
                      <span key={variant} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {variant}
                      </span>
                    ))}
                    {def.variants.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        +{def.variants.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedSection ? `Add ${selectedSection.name}` : 'Select Section Type'}
                </h2>
                {selectedSection && (
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 text-sm"
                  >
                    {showPreview ? <Code className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setShowPreview(true)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!selectedSection ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectionDefinitions.map((def) => (
                    <button
                      key={def.id}
                      onClick={() => handleSelectSectionType(def)}
                      className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{def.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{def.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {def.variants.map((variant) => (
                          <span key={variant} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {variant}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className={showPreview ? '' : 'lg:col-span-2'}>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Settings className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Configuration</h3>
                      </div>
                      {renderSectionForm(selectedSection, sectionData, setSectionData)}
                    </div>
                  </div>
                  {showPreview && (
                    <div>
                      <div className="bg-white rounded-lg p-4 border-2 border-blue-500">
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-500">
                          <Monitor className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-blue-600">Live Preview</h3>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Real-time
                          </span>
                        </div>
                        <div className="min-h-[200px]">
                          {renderLivePreview(selectedSection, previewData)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setShowPreview(true)
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              {selectedSection && (
                <button
                  onClick={handleSaveNewSection}
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Adding...' : 'Add Section'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Section Modal */}
      {showEditModal && editingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">Edit Section</h2>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
                  {editingSection.componentName}
                </span>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2 text-sm"
                >
                  {showPreview ? <Code className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setShowPreview(true)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={showPreview ? '' : 'lg:col-span-2'}>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">Configuration</h3>
                    </div>
                    {renderSectionForm(
                      sectionDefinitions.find(d => d.component === editingSection.componentName),
                      sectionData,
                      setSectionData
                    )}
                  </div>
                </div>
                {showPreview && (
                  <div>
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-500">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-500">
                        <Monitor className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-600">Live Preview</h3>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Real-time
                        </span>
                      </div>
                      <div className="min-h-[200px]">
                        {renderLivePreview(
                          sectionDefinitions.find(d => d.component === editingSection.componentName),
                          previewData
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setShowPreview(true)
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditSection}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Picker Dialog */}
      <ImagePicker
        open={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={handleImageSelect}
        title="Select Image"
      />
    </div>
  )
}
