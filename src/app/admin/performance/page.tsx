'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Divider,
  Alert,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Save, Zap, Loader, Eye } from 'lucide-react'

interface PerformanceSettings {
  enableSkeletonLoaders: boolean
  enablePageTransitions: boolean
  pageTransitionVariant: 'fade' | 'slide' | 'scale' | 'none'
  enableScrollAnimations: boolean
  scrollAnimationVariant: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'none'
  enableImageOptimization: boolean
  enableLazyLoading: boolean
  animationDuration: number
  animationDelay: number
}

export default function PerformancePage() {
  const [settings, setSettings] = useState<PerformanceSettings>({
    enableSkeletonLoaders: true,
    enablePageTransitions: true,
    pageTransitionVariant: 'fade',
    enableScrollAnimations: true,
    scrollAnimationVariant: 'slideUp',
    enableImageOptimization: true,
    enableLazyLoading: true,
    animationDuration: 0.6,
    animationDelay: 0,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings/performance')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/admin/settings/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError('Failed to save settings')
      }
    } catch (err) {
      setError('An error occurred while saving')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Performance & Animations
        </Typography>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Loader className="mr-2" />
                <Typography variant="h6">Loading States</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableSkeletonLoaders}
                    onChange={(e) =>
                      setSettings({ ...settings, enableSkeletonLoaders: e.target.checked })
                    }
                  />
                }
                label="Enable Skeleton Loaders"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Show skeleton placeholders while content is loading
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableLazyLoading}
                    onChange={(e) =>
                      setSettings({ ...settings, enableLazyLoading: e.target.checked })
                    }
                  />
                }
                label="Enable Lazy Loading"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                Load images and components only when they enter the viewport
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Eye className="mr-2" />
                <Typography variant="h6">Page Transitions</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enablePageTransitions}
                    onChange={(e) =>
                      setSettings({ ...settings, enablePageTransitions: e.target.checked })
                    }
                  />
                }
                label="Enable Page Transitions"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Smooth animations when navigating between pages
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Transition Style</InputLabel>
                <Select
                  value={settings.pageTransitionVariant}
                  label="Transition Style"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pageTransitionVariant: e.target.value as any,
                    })
                  }
                  disabled={!settings.enablePageTransitions}
                >
                  <MenuItem value="fade">Fade</MenuItem>
                  <MenuItem value="slide">Slide</MenuItem>
                  <MenuItem value="scale">Scale</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Zap className="mr-2" />
                <Typography variant="h6">Scroll Animations</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableScrollAnimations}
                    onChange={(e) =>
                      setSettings({ ...settings, enableScrollAnimations: e.target.checked })
                    }
                  />
                }
                label="Enable Scroll Animations"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Animate elements as they scroll into view
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Animation Style</InputLabel>
                <Select
                  value={settings.scrollAnimationVariant}
                  label="Animation Style"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      scrollAnimationVariant: e.target.value as any,
                    })
                  }
                  disabled={!settings.enableScrollAnimations}
                >
                  <MenuItem value="fadeIn">Fade In</MenuItem>
                  <MenuItem value="slideUp">Slide Up</MenuItem>
                  <MenuItem value="slideLeft">Slide Left</MenuItem>
                  <MenuItem value="slideRight">Slide Right</MenuItem>
                  <MenuItem value="scale">Scale</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Zap className="mr-2" />
                <Typography variant="h6">Performance</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableImageOptimization}
                    onChange={(e) =>
                      setSettings({ ...settings, enableImageOptimization: e.target.checked })
                    }
                  />
                }
                label="Enable Image Optimization"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Automatically optimize images for faster loading
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Animation Duration (seconds)</InputLabel>
                <Select
                  value={settings.animationDuration}
                  label="Animation Duration (seconds)"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      animationDuration: e.target.value as number,
                    })
                  }
                >
                  <MenuItem value={0.3}>0.3s (Fast)</MenuItem>
                  <MenuItem value={0.6}>0.6s (Normal)</MenuItem>
                  <MenuItem value={0.9}>0.9s (Slow)</MenuItem>
                  <MenuItem value={1.2}>1.2s (Very Slow)</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
