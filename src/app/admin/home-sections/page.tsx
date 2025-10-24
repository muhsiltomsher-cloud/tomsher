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
  homeHero?: {
    backgroundImage: string;
    backgroundColor: string;
    badges: Array<{ text: string; icon: string }>;
    heading: {
      line1: string;
      line1Highlight: string;
      line2: string;
      line2Highlight: string;
      line3: string;
    };
    description: string;
    worksLink: {
      text: string;
      url: string;
    };
  };
  homeAbout?: {
    yearsText: string;
    yearsLabel: string;
    tagline1: string;
    tagline2: string;
    tagline3: string;
    sectionLabel: string;
    title: string;
    titleHighlight: string;
    description: string;
    button1Text: string;
    button1Link: string;
    button2Text: string;
    button2Link: string;
    videoUrl: string;
  };
  homeStats?: {
    title: string;
    subtitle: string;
    stats: Array<{ label: string; value: string; icon?: string }>;
  };
  homeCTA?: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  homeAchievements?: {
    title: string;
    subtitle: string;
    achievements: Array<{ icon: string; value: string; label: string }>;
  };
  homeDevelopmentProcess?: {
    title: string;
    subtitle: string;
    steps: Array<{ number: string; title: string; description: string; icon?: string }>;
  };
  homeClients?: {
    title: string;
    subtitle: string;
    showOnHomePage: boolean;
    clients: Array<{ name: string; logo: string; website?: string }>;
  };
}

export default function HomeSectionsManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    homeHero: {
      backgroundImage: '/images/bg-hero.png',
      backgroundColor: '#060044',
      badges: [
        { text: 'Trusted by Global Brands', icon: 'globe' },
        { text: 'Web Design & Digital Growth Experts', icon: 'rocket' }
      ],
      heading: {
        line1: 'Build Your',
        line1Highlight: 'Digital World',
        line2: 'with',
        line2Highlight: 'Tomsher',
        line3: 'Powerful, Scalable, Business-Driven Websites'
      },
      description: 'We create award-winning, conversion-focused websites and robust digital solutions for forward-thinking brands. Partner with Tomsher for next-level performance and scalable growth.',
      worksLink: {
        text: 'Our works',
        url: '/works'
      }
    },
    homeAbout: {
      yearsText: '14+',
      yearsLabel: 'years of excellence',
      tagline1: 'Creative Designs.',
      tagline2: 'Meaningful Impact.',
      tagline3: 'Measurable Result.',
      sectionLabel: 'About tomsher',
      title: 'Web Design',
      titleHighlight: 'Company in Dubai',
      description: 'Tomsher is a leading web software solutions provider based in the UAE, specializing in web design and digital marketing. As the best web design company in Dubai, we take pride in our expert in-house web development team, delivering top-notch, high-quality services to meet all your digital needs. We have been working with multinational, semi-government, corporate, SME and start-up companies from Middle East, Africa, Asia, Europe and America. Our majority of clients are from UAE and have clientele across 30+ countries around the globe.',
      button1Text: 'Learn More',
      button1Link: '/about',
      button2Text: 'Contact us today',
      button2Link: '/contact',
      videoUrl: 'https://player.vimeo.com/video/1044576275?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0',
    },
    homeStats: {
      title: 'Our Achievements',
      subtitle: 'Numbers that speak for themselves',
      stats: [
        { label: 'Projects Completed', value: '500+' },
        { label: 'Happy Clients', value: '300+' },
        { label: 'Countries Served', value: '30+' },
        { label: 'Years Experience', value: '10+' }
      ],
    },
    homeCTA: {
      title: 'Ready to Start Your Project?',
      subtitle: "Let's work together to bring your ideas to life",
      ctaPrimary: 'Get Started',
      ctaSecondary: 'Contact Us',
    },
    homeAchievements: {
      title: 'Our Achievements',
      subtitle: 'Numbers that speak for themselves',
      achievements: [
        { icon: '🏆', value: '500+', label: 'Projects Completed' },
        { icon: '😊', value: '300+', label: 'Happy Clients' },
        { icon: '🌍', value: '30+', label: 'Countries Served' },
        { icon: '⭐', value: '10+', label: 'Years Experience' }
      ],
    },
    homeDevelopmentProcess: {
      title: 'Our Development Process',
      subtitle: 'How we bring your ideas to life',
      steps: [
        { number: '01', title: 'Discovery & Planning', description: 'We analyze your requirements and create a detailed project roadmap', icon: '🔍' },
        { number: '02', title: 'Design & Prototyping', description: 'Our designers create stunning visuals and interactive prototypes', icon: '🎨' },
        { number: '03', title: 'Development', description: 'Expert developers bring the design to life with clean, efficient code', icon: '💻' },
        { number: '04', title: 'Testing & Launch', description: 'Rigorous testing ensures a flawless launch and smooth operation', icon: '🚀' }
      ],
    },
    homeClients: {
      title: 'Our Clients',
      subtitle: 'Trusted by leading companies worldwide',
      showOnHomePage: true,
      clients: [],
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: 'backgroundImage') => {
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
          homeHero: { ...settings.homeHero!, [field]: data.url }
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
        toast.success('Home sections saved successfully!');
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
            Home Page Sections
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
                  value={settings.homeHero?.backgroundImage || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { ...settings.homeHero!, backgroundImage: e.target.value }
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
                    onChange={(e) => handleImageUpload(e, 'backgroundImage')}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Background Color"
                  value={settings.homeHero?.backgroundColor || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { ...settings.homeHero!, backgroundColor: e.target.value }
                  })}
                  fullWidth
                  helperText="Hex color code (e.g., #060044)"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Badges</Typography>
                {settings.homeHero?.badges?.map((badge, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={5}>
                      <TextField
                        label="Badge Text"
                        value={badge.text}
                        onChange={(e) => {
                          const newBadges = [...(settings.homeHero?.badges || [])];
                          newBadges[index].text = e.target.value;
                          setSettings({
                            ...settings,
                            homeHero: { ...settings.homeHero!, badges: newBadges }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Icon (globe or rocket)"
                        value={badge.icon}
                        onChange={(e) => {
                          const newBadges = [...(settings.homeHero?.badges || [])];
                          newBadges[index].icon = e.target.value;
                          setSettings({
                            ...settings,
                            homeHero: { ...settings.homeHero!, badges: newBadges }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => {
                          const newBadges = settings.homeHero?.badges?.filter((_, i) => i !== index) || [];
                          setSettings({
                            ...settings,
                            homeHero: { ...settings.homeHero!, badges: newBadges }
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
                    const newBadges = [...(settings.homeHero?.badges || []), { text: '', icon: 'globe' }];
                    setSettings({
                      ...settings,
                      homeHero: { ...settings.homeHero!, badges: newBadges }
                    });
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Badge
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Heading</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Line 1"
                  value={settings.homeHero?.heading?.line1 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { 
                      ...settings.homeHero!, 
                      heading: { ...settings.homeHero?.heading!, line1: e.target.value }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Line 1 Highlight"
                  value={settings.homeHero?.heading?.line1Highlight || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { 
                      ...settings.homeHero!, 
                      heading: { ...settings.homeHero?.heading!, line1Highlight: e.target.value }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Line 2"
                  value={settings.homeHero?.heading?.line2 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { 
                      ...settings.homeHero!, 
                      heading: { ...settings.homeHero?.heading!, line2: e.target.value }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Line 2 Highlight"
                  value={settings.homeHero?.heading?.line2Highlight || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { 
                      ...settings.homeHero!, 
                      heading: { ...settings.homeHero?.heading!, line2Highlight: e.target.value }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Line 3"
                  value={settings.homeHero?.heading?.line3 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { 
                      ...settings.homeHero!, 
                      heading: { ...settings.homeHero?.heading!, line3: e.target.value }
                    }
                  })}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={settings.homeHero?.description || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { ...settings.homeHero!, description: e.target.value }
                  })}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Works Link Text"
                  value={settings.homeHero?.worksLink?.text || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { 
                      ...settings.homeHero!, 
                      worksLink: { ...settings.homeHero?.worksLink!, text: e.target.value }
                    }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Works Link URL"
                  value={settings.homeHero?.worksLink?.url || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeHero: { 
                      ...settings.homeHero!, 
                      worksLink: { ...settings.homeHero?.worksLink!, url: e.target.value }
                    }
                  })}
                  fullWidth
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* About Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">About Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Years Text (e.g., 14+)"
                  value={settings.homeAbout?.yearsText || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, yearsText: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Years Label"
                  value={settings.homeAbout?.yearsLabel || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, yearsLabel: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Tagline 1"
                  value={settings.homeAbout?.tagline1 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, tagline1: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Tagline 2"
                  value={settings.homeAbout?.tagline2 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, tagline2: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Tagline 3"
                  value={settings.homeAbout?.tagline3 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, tagline3: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Divider />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Section Label"
                  value={settings.homeAbout?.sectionLabel || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, sectionLabel: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  value={settings.homeAbout?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Title Highlight"
                  value={settings.homeAbout?.titleHighlight || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, titleHighlight: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={settings.homeAbout?.description || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, description: e.target.value }
                  })}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Button 1 Text"
                  value={settings.homeAbout?.button1Text || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, button1Text: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Button 1 Link"
                  value={settings.homeAbout?.button1Link || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, button1Link: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Button 2 Text"
                  value={settings.homeAbout?.button2Text || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, button2Text: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Button 2 Link"
                  value={settings.homeAbout?.button2Link || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, button2Link: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Video URL (Vimeo embed URL)"
                  value={settings.homeAbout?.videoUrl || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAbout: { ...settings.homeAbout!, videoUrl: e.target.value }
                  })}
                  fullWidth
                  helperText="Enter the full Vimeo player embed URL"
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
                  value={settings.homeStats?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeStats: { ...settings.homeStats!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subtitle"
                  value={settings.homeStats?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeStats: { ...settings.homeStats!, subtitle: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Stats</Typography>
                {settings.homeStats?.stats?.map((stat, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={5}>
                      <TextField
                        label="Value"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...(settings.homeStats?.stats || [])];
                          newStats[index].value = e.target.value;
                          setSettings({
                            ...settings,
                            homeStats: { ...settings.homeStats!, stats: newStats }
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
                          const newStats = [...(settings.homeStats?.stats || [])];
                          newStats[index].label = e.target.value;
                          setSettings({
                            ...settings,
                            homeStats: { ...settings.homeStats!, stats: newStats }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => {
                          const newStats = settings.homeStats?.stats?.filter((_, i) => i !== index) || [];
                          setSettings({
                            ...settings,
                            homeStats: { ...settings.homeStats!, stats: newStats }
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
                    const newStats = [...(settings.homeStats?.stats || []), { value: '', label: '' }];
                    setSettings({
                      ...settings,
                      homeStats: { ...settings.homeStats!, stats: newStats }
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

        {/* CTA Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">CTA Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  value={settings.homeCTA?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeCTA: { ...settings.homeCTA!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Subtitle"
                  value={settings.homeCTA?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeCTA: { ...settings.homeCTA!, subtitle: e.target.value }
                  })}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Primary CTA Text"
                  value={settings.homeCTA?.ctaPrimary || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeCTA: { ...settings.homeCTA!, ctaPrimary: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Secondary CTA Text"
                  value={settings.homeCTA?.ctaSecondary || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeCTA: { ...settings.homeCTA!, ctaSecondary: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Achievements Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Achievements Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  value={settings.homeAchievements?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAchievements: { ...settings.homeAchievements!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subtitle"
                  value={settings.homeAchievements?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeAchievements: { ...settings.homeAchievements!, subtitle: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Achievements</Typography>
                {settings.homeAchievements?.achievements?.map((achievement, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={2}>
                      <TextField
                        label="Icon"
                        value={achievement.icon}
                        onChange={(e) => {
                          const newAchievements = [...(settings.homeAchievements?.achievements || [])];
                          newAchievements[index].icon = e.target.value;
                          setSettings({
                            ...settings,
                            homeAchievements: { ...settings.homeAchievements!, achievements: newAchievements }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Value"
                        value={achievement.value}
                        onChange={(e) => {
                          const newAchievements = [...(settings.homeAchievements?.achievements || [])];
                          newAchievements[index].value = e.target.value;
                          setSettings({
                            ...settings,
                            homeAchievements: { ...settings.homeAchievements!, achievements: newAchievements }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Label"
                        value={achievement.label}
                        onChange={(e) => {
                          const newAchievements = [...(settings.homeAchievements?.achievements || [])];
                          newAchievements[index].label = e.target.value;
                          setSettings({
                            ...settings,
                            homeAchievements: { ...settings.homeAchievements!, achievements: newAchievements }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => {
                          const newAchievements = settings.homeAchievements?.achievements?.filter((_, i) => i !== index) || [];
                          setSettings({
                            ...settings,
                            homeAchievements: { ...settings.homeAchievements!, achievements: newAchievements }
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
                    const newAchievements = [...(settings.homeAchievements?.achievements || []), { icon: '', value: '', label: '' }];
                    setSettings({
                      ...settings,
                      homeAchievements: { ...settings.homeAchievements!, achievements: newAchievements }
                    });
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Achievement
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Development Process Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Development Process Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  value={settings.homeDevelopmentProcess?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeDevelopmentProcess: { ...settings.homeDevelopmentProcess!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subtitle"
                  value={settings.homeDevelopmentProcess?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeDevelopmentProcess: { ...settings.homeDevelopmentProcess!, subtitle: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Process Steps</Typography>
                {settings.homeDevelopmentProcess?.steps?.map((step, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        <TextField
                          label="Number"
                          value={step.number}
                          onChange={(e) => {
                            const newSteps = [...(settings.homeDevelopmentProcess?.steps || [])];
                            newSteps[index].number = e.target.value;
                            setSettings({
                              ...settings,
                              homeDevelopmentProcess: { ...settings.homeDevelopmentProcess!, steps: newSteps }
                            });
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <TextField
                          label="Icon"
                          value={step.icon || ''}
                          onChange={(e) => {
                            const newSteps = [...(settings.homeDevelopmentProcess?.steps || [])];
                            newSteps[index].icon = e.target.value;
                            setSettings({
                              ...settings,
                              homeDevelopmentProcess: { ...settings.homeDevelopmentProcess!, steps: newSteps }
                            });
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <TextField
                          label="Title"
                          value={step.title}
                          onChange={(e) => {
                            const newSteps = [...(settings.homeDevelopmentProcess?.steps || [])];
                            newSteps[index].title = e.target.value;
                            setSettings({
                              ...settings,
                              homeDevelopmentProcess: { ...settings.homeDevelopmentProcess!, steps: newSteps }
                            });
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Description"
                          value={step.description}
                          onChange={(e) => {
                            const newSteps = [...(settings.homeDevelopmentProcess?.steps || [])];
                            newSteps[index].description = e.target.value;
                            setSettings({
                              ...settings,
                              homeDevelopmentProcess: { ...settings.homeDevelopmentProcess!, steps: newSteps }
                            });
                          }}
                          fullWidth
                          multiline
                          rows={2}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <IconButton
                          onClick={() => {
                            const newSteps = settings.homeDevelopmentProcess?.steps?.filter((_, i) => i !== index) || [];
                            setSettings({
                              ...settings,
                              homeDevelopmentProcess: { ...settings.homeDevelopmentProcess!, steps: newSteps }
                            });
                          }}
                          color="error"
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={() => {
                    const newSteps = [...(settings.homeDevelopmentProcess?.steps || []), { number: '', title: '', description: '', icon: '' }];
                    setSettings({
                      ...settings,
                      homeDevelopmentProcess: { ...settings.homeDevelopmentProcess!, steps: newSteps }
                    });
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Step
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Clients Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Clients Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  value={settings.homeClients?.title || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeClients: { ...settings.homeClients!, title: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subtitle"
                  value={settings.homeClients?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    homeClients: { ...settings.homeClients!, subtitle: e.target.value }
                  })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Clients</Typography>
                {settings.homeClients?.clients?.map((client, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={4}>
                      <TextField
                        label="Client Name"
                        value={client.name}
                        onChange={(e) => {
                          const newClients = [...(settings.homeClients?.clients || [])];
                          newClients[index].name = e.target.value;
                          setSettings({
                            ...settings,
                            homeClients: { ...settings.homeClients!, clients: newClients }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        label="Logo URL"
                        value={client.logo}
                        onChange={(e) => {
                          const newClients = [...(settings.homeClients?.clients || [])];
                          newClients[index].logo = e.target.value;
                          setSettings({
                            ...settings,
                            homeClients: { ...settings.homeClients!, clients: newClients }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Website (optional)"
                        value={client.website || ''}
                        onChange={(e) => {
                          const newClients = [...(settings.homeClients?.clients || [])];
                          newClients[index].website = e.target.value;
                          setSettings({
                            ...settings,
                            homeClients: { ...settings.homeClients!, clients: newClients }
                          });
                        }}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => {
                          const newClients = settings.homeClients?.clients?.filter((_, i) => i !== index) || [];
                          setSettings({
                            ...settings,
                            homeClients: { ...settings.homeClients!, clients: newClients }
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
                    const newClients = [...(settings.homeClients?.clients || []), { name: '', logo: '', website: '' }];
                    setSettings({
                      ...settings,
                      homeClients: { ...settings.homeClients!, clients: newClients }
                    });
                  }}
                  variant="outlined"
                  size="small"
                >
                  Add Client
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={saving}
            size="large"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
