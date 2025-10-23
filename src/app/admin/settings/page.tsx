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
import { Save, Image as ImageIcon } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ImageGalleryPicker from '@/components/admin/ImageGalleryPicker';

interface Settings {
  _id?: string;
  siteName: string;
  siteDescription: string;
  logo?: string;
  logoNormal?: string;
  logoSticky?: string;
  logoFooter?: string;
  favicon?: string;
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
  typography?: {
    baseFontSize?: string;
    headingFontWeight?: string;
    bodyFontWeight?: string;
    h1Size?: string;
    h2Size?: string;
    h3Size?: string;
    h4Size?: string;
    h5Size?: string;
    h6Size?: string;
  };
}

export default function SettingsManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [currentLogoField, setCurrentLogoField] = useState<'logo' | 'logoNormal' | 'logoSticky' | 'logoFooter' | 'favicon'>('logo');
  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    siteDescription: '',
    logo: '',
    logoNormal: '',
    logoSticky: '',
    logoFooter: '',
    favicon: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialMedia: {},
    seo: {},
    analytics: {},
    typography: {
      baseFontSize: '16px',
      headingFontWeight: '700',
      bodyFontWeight: '400',
      h1Size: '3rem',
      h2Size: '2.25rem',
      h3Size: '1.875rem',
      h4Size: '1.5rem',
      h5Size: '1.25rem',
      h6Size: '1rem',
    },
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

  const handleOpenImagePicker = (field: 'logo' | 'logoNormal' | 'logoSticky' | 'logoFooter' | 'favicon') => {
    setCurrentLogoField(field);
    setOpenImagePicker(true);
  };

  const handleSelectImage = (url: string) => {
    setSettings({ ...settings, [currentLogoField]: url });
    setOpenImagePicker(false);
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
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Logo Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Upload different logos for various sections of your website
              </Typography>
            </Grid>

            {/* Normal Header Logo */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Normal Header Logo
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Recommended: 400x100px PNG or SVG
              </Typography>
              {settings.logoNormal && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, display: 'inline-block' }}>
                  <img src={settings.logoNormal} alt="Normal Header Logo" style={{ maxHeight: 80, maxWidth: 300 }} />
                </Box>
              )}
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  onClick={() => handleOpenImagePicker('logoNormal')}
                >
                  {settings.logoNormal ? 'Change Logo' : 'Select Logo'}
                </Button>
              </Box>
            </Grid>

            {/* Sticky Header Logo */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Sticky Header Logo
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Logo shown when header is sticky/scrolled. Recommended: 300x80px
              </Typography>
              {settings.logoSticky && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, display: 'inline-block' }}>
                  <img src={settings.logoSticky} alt="Sticky Header Logo" style={{ maxHeight: 60, maxWidth: 250 }} />
                </Box>
              )}
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  onClick={() => handleOpenImagePicker('logoSticky')}
                >
                  {settings.logoSticky ? 'Change Logo' : 'Select Logo'}
                </Button>
              </Box>
            </Grid>

            {/* Footer Logo */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Footer Logo
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Logo shown in footer. Recommended: 400x100px
              </Typography>
              {settings.logoFooter && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, display: 'inline-block' }}>
                  <img src={settings.logoFooter} alt="Footer Logo" style={{ maxHeight: 80, maxWidth: 300 }} />
                </Box>
              )}
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  onClick={() => handleOpenImagePicker('logoFooter')}
                >
                  {settings.logoFooter ? 'Change Logo' : 'Select Logo'}
                </Button>
              </Box>
            </Grid>

            {/* Favicon */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Favicon
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Browser tab icon. Recommended: 32x32px or 64x64px PNG/ICO
              </Typography>
              {settings.favicon && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, display: 'inline-block' }}>
                  <img src={settings.favicon} alt="Favicon" style={{ maxHeight: 32, maxWidth: 32 }} />
                </Box>
              )}
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  onClick={() => handleOpenImagePicker('favicon')}
                >
                  {settings.favicon ? 'Change Favicon' : 'Select Favicon'}
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
            Typography Settings
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
            Font: Manrope (fixed). Customize font sizes and weights below.
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Base Font Size"
                value={settings.typography?.baseFontSize || '16px'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, baseFontSize: e.target.value }
                })}
                fullWidth
                placeholder="16px"
                helperText="Default body text size (e.g., 16px, 1rem)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Body Font Weight"
                select
                value={settings.typography?.bodyFontWeight || '400'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, bodyFontWeight: e.target.value }
                })}
                fullWidth
                SelectProps={{ native: true }}
              >
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semibold (600)</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Heading Font Weight"
                select
                value={settings.typography?.headingFontWeight || '700'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, headingFontWeight: e.target.value }
                })}
                fullWidth
                SelectProps={{ native: true }}
              >
                <option value="500">Medium (500)</option>
                <option value="600">Semibold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extrabold (800)</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="H1 Font Size"
                value={settings.typography?.h1Size || '3rem'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, h1Size: e.target.value }
                })}
                fullWidth
                placeholder="3rem"
                helperText="Main heading size"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="H2 Font Size"
                value={settings.typography?.h2Size || '2.25rem'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, h2Size: e.target.value }
                })}
                fullWidth
                placeholder="2.25rem"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="H3 Font Size"
                value={settings.typography?.h3Size || '1.875rem'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, h3Size: e.target.value }
                })}
                fullWidth
                placeholder="1.875rem"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="H4 Font Size"
                value={settings.typography?.h4Size || '1.5rem'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, h4Size: e.target.value }
                })}
                fullWidth
                placeholder="1.5rem"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="H5 Font Size"
                value={settings.typography?.h5Size || '1.25rem'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, h5Size: e.target.value }
                })}
                fullWidth
                placeholder="1.25rem"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="H6 Font Size"
                value={settings.typography?.h6Size || '1rem'}
                onChange={(e) => setSettings({
                  ...settings,
                  typography: { ...settings.typography, h6Size: e.target.value }
                })}
                fullWidth
                placeholder="1rem"
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

        {/* Image Gallery Picker */}
        <ImageGalleryPicker
          open={openImagePicker}
          onClose={() => setOpenImagePicker(false)}
          onSelect={handleSelectImage}
          currentImage={settings[currentLogoField]}
          title={`Select ${currentLogoField === 'logoNormal' ? 'Normal Header Logo' : 
                          currentLogoField === 'logoSticky' ? 'Sticky Header Logo' : 
                          currentLogoField === 'logoFooter' ? 'Footer Logo' : 
                          currentLogoField === 'favicon' ? 'Favicon' : 'Logo'}`}
        />
      </Container>
    </Box>
  );
}
