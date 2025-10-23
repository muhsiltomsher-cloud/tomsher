'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material'
import { Save, Image as ImageIcon } from '@mui/icons-material'
import Link from 'next/link'

interface LogoSettings {
  mainLogo: string
  footerLogo: string
  stickyLogoLight: string
  stickyLogoDark: string
  favicon: string
}

export default function LogoManagement() {
  const [logos, setLogos] = useState<LogoSettings>({
    mainLogo: '',
    footerLogo: '',
    stickyLogoLight: '',
    stickyLogoDark: '',
    favicon: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchLogos()
  }, [])

  const fetchLogos = async () => {
    try {
      const response = await fetch('/api/admin/logos')
      if (response.ok) {
        const data = await response.json()
        setLogos(data)
      }
    } catch (error) {
      console.error('Error fetching logos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/logos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logos),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Logo settings saved successfully!' })
      } else {
        setMessage({ type: 'error', text: 'Failed to save logo settings' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1">
              Logo Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage all logos and favicon for your website
            </Typography>
          </Box>
          <Button variant="outlined" component={Link} href="/admin/dashboard">
            Back to Dashboard
          </Button>
        </Box>

        {message && (
          <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage(null)}>
            {message.text}
          </Alert>
        )}

        <Paper sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ImageIcon /> Main Logo
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Primary logo displayed in the header (Recommended: 400x100px, PNG/SVG)
                </Typography>
                <TextField
                  fullWidth
                  label="Main Logo URL"
                  value={logos.mainLogo}
                  onChange={(e) => setLogos({ ...logos, mainLogo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  sx={{ mt: 2 }}
                />
                {logos.mainLogo && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2, textAlign: 'center' }}>
                    <img
                      src={logos.mainLogo}
                      alt="Main Logo Preview"
                      style={{ maxWidth: '100%', maxHeight: 100, objectFit: 'contain' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ImageIcon /> Footer Logo
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Logo displayed in the footer (Recommended: 400x100px, PNG/SVG)
                </Typography>
                <TextField
                  fullWidth
                  label="Footer Logo URL"
                  value={logos.footerLogo}
                  onChange={(e) => setLogos({ ...logos, footerLogo: e.target.value })}
                  placeholder="https://example.com/footer-logo.png"
                  sx={{ mt: 2 }}
                />
                {logos.footerLogo && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2, textAlign: 'center' }}>
                    <img
                      src={logos.footerLogo}
                      alt="Footer Logo Preview"
                      style={{ maxWidth: '100%', maxHeight: 100, objectFit: 'contain' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ImageIcon /> Sticky Header Logo (Light)
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Logo for sticky header on light backgrounds (Recommended: 300x80px, PNG/SVG)
                </Typography>
                <TextField
                  fullWidth
                  label="Sticky Logo Light URL"
                  value={logos.stickyLogoLight}
                  onChange={(e) => setLogos({ ...logos, stickyLogoLight: e.target.value })}
                  placeholder="https://example.com/sticky-logo-light.png"
                  sx={{ mt: 2 }}
                />
                {logos.stickyLogoLight && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2, textAlign: 'center' }}>
                    <img
                      src={logos.stickyLogoLight}
                      alt="Sticky Logo Light Preview"
                      style={{ maxWidth: '100%', maxHeight: 80, objectFit: 'contain' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ImageIcon /> Sticky Header Logo (Dark)
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Logo for sticky header on dark backgrounds (Recommended: 300x80px, PNG/SVG)
                </Typography>
                <TextField
                  fullWidth
                  label="Sticky Logo Dark URL"
                  value={logos.stickyLogoDark}
                  onChange={(e) => setLogos({ ...logos, stickyLogoDark: e.target.value })}
                  placeholder="https://example.com/sticky-logo-dark.png"
                  sx={{ mt: 2 }}
                />
                {logos.stickyLogoDark && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.900', borderRadius: 2, textAlign: 'center' }}>
                    <img
                      src={logos.stickyLogoDark}
                      alt="Sticky Logo Dark Preview"
                      style={{ maxWidth: '100%', maxHeight: 80, objectFit: 'contain' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ImageIcon /> Favicon
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Small icon displayed in browser tabs (Recommended: 32x32px or 64x64px, ICO/PNG)
                </Typography>
                <TextField
                  fullWidth
                  label="Favicon URL"
                  value={logos.favicon}
                  onChange={(e) => setLogos({ ...logos, favicon: e.target.value })}
                  placeholder="https://example.com/favicon.ico"
                  sx={{ mt: 2 }}
                />
                {logos.favicon && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                      src={logos.favicon}
                      alt="Favicon Preview"
                      style={{ width: 32, height: 32, objectFit: 'contain' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Favicon Preview (32x32px)
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={20} /> : <Save />}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Logo Settings'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
