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
  Pages,
  RateReview,
  Work,
  TrendingUp,
  People,
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

  const statsCards = [
    { title: 'Total Pages', icon: <Pages />, count: stats.pages, color: '#667eea', href: '/admin/pages' },
    { title: 'Services', icon: <Business />, count: stats.services, color: '#f093fb', href: '/admin/services' },
    { title: 'Portfolio Items', icon: <Work />, count: stats.portfolio, color: '#4facfe', href: '/admin/portfolio' },
    { title: 'Testimonials', icon: <RateReview />, count: stats.testimonials, color: '#43e97b', href: '/admin/testimonials' },
    { title: 'Blog Posts', icon: <Article />, count: stats.blog, color: '#fa709a', href: '/admin/blog' },
    { title: 'Contact Inquiries', icon: <ContactMail />, count: stats.contacts, color: '#fee140', href: '/admin/contacts' },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {session.user?.name || session.user?.email}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {statsCards.map((item) => (
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="h3" component="div" fontWeight={700}>
                          {item.count}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          bgcolor: item.color,
                          color: 'white',
                          p: 2,
                          borderRadius: 2,
                          display: 'flex',
                        }}
                      >
                        {item.icon}
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
