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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import { Save, ExpandMore, Add, Delete, CloudUpload } from '@mui/icons-material';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Settings {
  _id?: string;
  aboutHero?: {
    backgroundImage: string;
    backgroundColor: string;
    title: string;
    subtitle: string;
    description: string;
  };
  aboutMission?: {
    title: string;
    description: string;
    image: string;
  };
  aboutVision?: {
    title: string;
    description: string;
    image: string;
  };
  aboutValues?: {
    title: string;
    subtitle: string;
    values: Array<{ icon: string; title: string; description: string }>;
  };
  aboutTeam?: {
    title: string;
    subtitle: string;
    description: string;
  };
  aboutStats?: {
    title: string;
    subtitle: string;
    stats: Array<{ label: string; value: string; icon?: string }>;
  };
}

export default function AboutSectionsManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    aboutHero: {
      backgroundImage: '/images/about-hero.jpg',
      backgroundColor: '#060044',
      title: 'About Us',
      subtitle: 'Leading Web Development Company in Dubai',
      description: 'Learn more about our mission, vision, and the team behind our success in web development and digital solutions.',
    },
    aboutMission: {
      title: 'Our Mission',
      description: 'To empower businesses with innovative digital solutions that drive growth and success.',
      image: '/images/mission.jpg',
    },
    aboutVision: {
      title: 'Our Vision',
      description: 'To be the leading web development company in the Middle East, known for excellence and innovation.',
      image: '/images/vision.jpg',
    },
    aboutValues: {
      title: 'Our Values',
      subtitle: 'What drives us forward',
      values: [
        { icon: '💡', title: 'Innovation', description: 'We embrace new technologies and creative solutions' },
        { icon: '🤝', title: 'Integrity', description: 'We build trust through transparency and honesty' },
        { icon: '🎯', title: 'Excellence', description: 'We strive for perfection in everything we do' },
        { icon: '🌟', title: 'Customer Focus', description: 'Your success is our priority' }
      ],
    },
    aboutTeam: {
      title: 'Our Team',
      subtitle: 'Meet the experts behind Tomsher',
      description: 'Our team consists of talented developers, designers, and digital marketing experts dedicated to delivering exceptional results.',
    },
    aboutStats: {
      title: 'Our Achievements',
      subtitle: 'Numbers that speak for themselves',
      stats: [
        { label: 'Projects Completed', value: '500+' },
        { label: 'Happy Clients', value: '300+' },
        { label: 'Countries Served', value: '30+' },
        { label: 'Years Experience', value: '14+' }
      ],
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
          setSettings(prev => ({
            ...prev,
            ...data[0],
            _id: data[0]._id,
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, section: string, field: string) => {
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
        setSettings({
          ...settings,
          [section]: { ...(settings as any)[section], [field]: data.url }
        });
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
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
        toast.success('About sections saved successfully!');
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
            About Page Sections
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save All Changes'}
            </Button>
            <Button variant="outlined" component={Link} href="/admin/dashboard">
              Back to Dashboard
            </Button>
          </Box>
        </Box>

        {/* Hero Section */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Hero Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Background Image URL"
                  value={settings.aboutHero?.backgroundImage || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutHero: { ...settings.aboutHero!, backgroundImage: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  disabled={uploading}
                  fullWidth
                  sx={{ height: '56px' }}
                >
                  {uploading ? 'Uploading...' : 'Upload Background Image'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'aboutHero', 'backgroundImage')}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Background Color"
                  value={settings.aboutHero?.backgroundColor || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutHero: { ...settings.aboutHero!, backgroundColor: e.target.value }
                  })}
                  fullWidth
                  helperText="Hex color code (e.g., #060044)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  value={settings.aboutHero?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutHero: { ...settings.aboutHero!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Subtitle"
                  value={settings.aboutHero?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutHero: { ...settings.aboutHero!, subtitle: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={settings.aboutHero?.description || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutHero: { ...settings.aboutHero!, description: e.target.value }
                  })}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Mission Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Mission Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  value={settings.aboutMission?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutMission: { ...settings.aboutMission!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={settings.aboutMission?.description || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutMission: { ...settings.aboutMission!, description: e.target.value }
                  })}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Image URL"
                  value={settings.aboutMission?.image || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutMission: { ...settings.aboutMission!, image: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  disabled={uploading}
                  fullWidth
                  sx={{ height: '56px' }}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'aboutMission', 'image')}
                  />
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Vision Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Vision Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  value={settings.aboutVision?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutVision: { ...settings.aboutVision!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={settings.aboutVision?.description || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutVision: { ...settings.aboutVision!, description: e.target.value }
                  })}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Image URL"
                  value={settings.aboutVision?.image || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutVision: { ...settings.aboutVision!, image: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  disabled={uploading}
                  fullWidth
                  sx={{ height: '56px' }}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'aboutVision', 'image')}
                  />
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Values Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Values Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  value={settings.aboutValues?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutValues: { ...settings.aboutValues!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subtitle"
                  value={settings.aboutValues?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutValues: { ...settings.aboutValues!, subtitle: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Values</Typography>
                {settings.aboutValues?.values?.map((value, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={2}>
                      <TextField
                        label="Icon"
                        value={value.icon}
                        onChange={(e) => {
                          const newValues = [...(settings.aboutValues?.values || [])];
                          newValues[index].icon = e.target.value;
                          setSettings({
                            ...settings,
                            aboutValues: { ...settings.aboutValues!, values: newValues }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Title"
                        value={value.title}
                        onChange={(e) => {
                          const newValues = [...(settings.aboutValues?.values || [])];
                          newValues[index].title = e.target.value;
                          setSettings({
                            ...settings,
                            aboutValues: { ...settings.aboutValues!, values: newValues }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="Description"
                        value={value.description}
                        onChange={(e) => {
                          const newValues = [...(settings.aboutValues?.values || [])];
                          newValues[index].description = e.target.value;
                          setSettings({
                            ...settings,
                            aboutValues: { ...settings.aboutValues!, values: newValues }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => {
                          const newValues = settings.aboutValues?.values?.filter((_, i) => i !== index) || [];
                          setSettings({
                            ...settings,
                            aboutValues: { ...settings.aboutValues!, values: newValues }
                          });
                        }}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={() => {
                    const newValues = [...(settings.aboutValues?.values || []), { icon: '⭐', title: '', description: '' }];
                    setSettings({
                      ...settings,
                      aboutValues: { ...settings.aboutValues!, values: newValues }
                    });
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Value
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Team Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Team Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  value={settings.aboutTeam?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutTeam: { ...settings.aboutTeam!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subtitle"
                  value={settings.aboutTeam?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutTeam: { ...settings.aboutTeam!, subtitle: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={settings.aboutTeam?.description || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutTeam: { ...settings.aboutTeam!, description: e.target.value }
                  })}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Stats Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Stats Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  value={settings.aboutStats?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutStats: { ...settings.aboutStats!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subtitle"
                  value={settings.aboutStats?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    aboutStats: { ...settings.aboutStats!, subtitle: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Stats</Typography>
                {settings.aboutStats?.stats?.map((stat, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={5}>
                      <TextField
                        label="Value"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...(settings.aboutStats?.stats || [])];
                          newStats[index].value = e.target.value;
                          setSettings({
                            ...settings,
                            aboutStats: { ...settings.aboutStats!, stats: newStats }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Label"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...(settings.aboutStats?.stats || [])];
                          newStats[index].label = e.target.value;
                          setSettings({
                            ...settings,
                            aboutStats: { ...settings.aboutStats!, stats: newStats }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => {
                          const newStats = settings.aboutStats?.stats?.filter((_, i) => i !== index) || [];
                          setSettings({
                            ...settings,
                            aboutStats: { ...settings.aboutStats!, stats: newStats }
                          });
                        }}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={() => {
                    const newStats = [...(settings.aboutStats?.stats || []), { label: '', value: '' }];
                    setSettings({
                      ...settings,
                      aboutStats: { ...settings.aboutStats!, stats: newStats }
                    });
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Stat
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
}
