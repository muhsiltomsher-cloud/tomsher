'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Article,
  Business,
  ContactMail,
  Dashboard as DashboardIcon,
  Pages,
  RateReview,
  Settings as SettingsIcon,
  Work,
  ViewModule,
  MenuBook,
  Build,
  Assignment,
  Search,
  PermMedia,
  Help,
} from '@mui/icons-material';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    pages: 0,
    services: 0,
    portfolio: 0,
    testimonials: 0,
    blog: 0,
    contacts: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    { title: 'Pages', icon: <Pages />, href: '/admin/pages', count: stats.pages, color: '#667eea' },
    { title: 'Page Builder', icon: <Build />, href: '/admin/page-builder', count: 0, color: '#ff6b6b' },
    { title: 'Sections', icon: <ViewModule />, href: '/admin/sections', count: 0, color: '#a8edea' },
    { title: 'Menu', icon: <MenuBook />, href: '/admin/menu', count: 0, color: '#fbc2eb' },
    { title: 'Services', icon: <Business />, href: '/admin/services', count: stats.services, color: '#f093fb' },
    { title: 'Portfolio', icon: <Work />, href: '/admin/portfolio', count: stats.portfolio, color: '#4facfe' },
    { title: 'Testimonials', icon: <RateReview />, href: '/admin/testimonials', count: stats.testimonials, color: '#43e97b' },
    { title: 'Blog Posts', icon: <Article />, href: '/admin/blog', count: stats.blog, color: '#fa709a' },
    { title: 'Contacts', icon: <ContactMail />, href: '/admin/contacts', count: stats.contacts, color: '#fee140' },
    { title: 'Form Submissions', icon: <Assignment />, href: '/admin/forms', count: 0, color: '#ff9ff3' },
    { title: 'Media Library', icon: <PermMedia />, href: '/admin/media', count: 0, color: '#48dbfb' },
    { title: 'SEO Settings', icon: <Search />, href: '/admin/seo', count: 0, color: '#54a0ff' },
    { title: 'Settings', icon: <SettingsIcon />, href: '/admin/settings', count: 0, color: '#30cfd0' },
    { title: 'Help & Guide', icon: <Help />, href: '/admin/help', count: 0, color: '#feca57' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {session.user.name || session.user.email}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Link href={item.href} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          bgcolor: item.color,
                          color: 'white',
                          p: 1.5,
                          borderRadius: 2,
                          display: 'flex',
                          mr: 2,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" component="div">
                          {item.title}
                        </Typography>
                        {item.count > 0 && (
                          <Typography variant="h4" color="text.secondary">
                            {item.count}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            <Button variant="contained" component={Link} href="/admin/pages">
              Create New Page
            </Button>
            <Button variant="contained" component={Link} href="/admin/services">
              Add Service
            </Button>
            <Button variant="contained" component={Link} href="/admin/portfolio">
              Add Portfolio Item
            </Button>
            <Button variant="contained" component={Link} href="/admin/blog">
              Write Blog Post
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
