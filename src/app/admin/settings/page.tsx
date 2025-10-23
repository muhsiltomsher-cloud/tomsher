'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Grid,
  Divider,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Settings {
  _id?: string;
  siteName: string;
  siteDescription: string;
  logo?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
  analytics: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
}

export default function SettingsManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    siteDescription: '',
    logo: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialMedia: {},
    seo: {},
    analytics: {},
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setSettings(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSettings({ ...settings, logo: data.url });
        toast.success('Logo uploaded successfully!');
      } else {
        toast.error('Failed to upload logo');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = settings._id
        ? `/api/admin/settings/${settings._id}`
        : '/api/admin/settings';
      
      const response = await fetch(url, {
        method: settings._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success('Settings saved successfully!');
        fetchSettings();
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Site Settings
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
            <Button variant="outlined" component={Link} href="/admin/dashboard">
              Back to Dashboard
            </Button>
          </Box>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            General Information
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Site Name"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Email"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Phone"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Site Description"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Site Logo
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Recommended: 400x100px PNG or SVG (max 500KB)
              </Typography>
              {settings.logo && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, display: 'inline-block' }}>
                  <img src={settings.logo} alt="Site Logo" style={{ maxHeight: 80, maxWidth: 300 }} />
                </Box>
              )}
              <Box>
                <Button
                  variant="outlined"
                  component="label"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : settings.logo ? 'Change Logo' : 'Upload Logo'}
                  <input
                    type="file"
                    hidden
                    accept="image/png,image/svg+xml,image/jpeg"
                    onChange={handleLogoUpload}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Social Media Links
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Facebook URL"
                value={settings.socialMedia?.facebook || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Twitter URL"
                value={settings.socialMedia?.twitter || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, twitter: e.target.value }
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Instagram URL"
                value={settings.socialMedia?.instagram || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="LinkedIn URL"
                value={settings.socialMedia?.linkedin || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, linkedin: e.target.value }
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="YouTube URL"
                value={settings.socialMedia?.youtube || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, youtube: e.target.value }
                })}
                fullWidth
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            SEO Settings
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <TextField
                label="Meta Title"
                value={settings.seo?.metaTitle || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, metaTitle: e.target.value }
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Meta Description"
                value={settings.seo?.metaDescription || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, metaDescription: e.target.value }
                })}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Meta Keywords (comma-separated)"
                value={settings.seo?.metaKeywords || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, metaKeywords: e.target.value }
                })}
                fullWidth
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Analytics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Google Analytics ID"
                value={settings.analytics?.googleAnalyticsId || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  analytics: { ...settings.analytics, googleAnalyticsId: e.target.value }
                })}
                fullWidth
                placeholder="G-XXXXXXXXXX"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Facebook Pixel ID"
                value={settings.analytics?.facebookPixelId || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  analytics: { ...settings.analytics, facebookPixelId: e.target.value }
                })}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
