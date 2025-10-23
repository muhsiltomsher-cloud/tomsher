'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  IconButton,
} from '@mui/material'
import {
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material'
import Link from 'next/link'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    pages: 0,
    services: 0,
    portfolio: 0,
    testimonials: 0,
    blog: 0,
    contacts: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!session) {
    return null
  }

  const userName = session.user?.name?.split(' ')[0] || 'Admin'
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Morning' : currentHour < 18 ? 'Afternoon' : 'Evening'

  return (
    <Box sx={{ py: 4, px: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Hello {userName}, Good {greeting}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Let's check your website.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Total Pages
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.pages}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
                      <Typography variant="caption" sx={{ color: '#10b981' }}>
                        15.54% grow this month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Services
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.services}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
                      <Typography variant="caption" sx={{ color: '#10b981' }}>
                        156 this month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Portfolio
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.portfolio}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TrendingUp sx={{ fontSize: 16, color: '#f59e0b' }} />
                      <Typography variant="caption" sx={{ color: '#f59e0b' }}>
                        49 this week
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Content Overview
                </Typography>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
                  ${(stats.pages * 100 + stats.services * 50 + stats.portfolio * 75).toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3 }}>
                  <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
                  <Typography variant="caption" sx={{ color: '#10b981' }}>
                    +25.2%
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {[
                    { label: 'Manage Pages', emoji: '📄', count: stats.pages, bg: '#fef3c7', color: '#fbbf24', href: '/admin/pages' },
                    { label: 'Blog Posts', emoji: '📝', count: stats.blog, bg: '#dbeafe', color: '#3b82f6', href: '/admin/blog' },
                    { label: 'Services', emoji: '💼', count: stats.services, bg: '#e0e7ff', color: '#8b5cf6', href: '/admin/services' },
                    { label: 'Portfolio', emoji: '🎨', count: stats.portfolio, bg: '#ccfbf1', color: '#14b8a6', href: '/admin/portfolio' },
                  ].map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <Box
                        component={Link}
                        href={item.href}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: item.bg,
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          textDecoration: 'none',
                          display: 'block',
                          '&:hover': { transform: 'translateY(-4px)' },
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: item.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1,
                          }}
                        >
                          <Typography variant="h6">{item.emoji}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {item.count} Items
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {item.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Activity
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#667eea', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  >
                    View All
                  </Typography>
                </Box>

                {[
                  { name: 'New Page Created', time: '2hrs ago', desc: 'About Us page published', avatar: '📄' },
                  { name: 'Blog Post Updated', time: 'Just now', desc: 'Latest news article', avatar: '📝' },
                  { name: 'Service Added', time: '4hrs ago', desc: 'Web Development service', avatar: '💼' },
                  { name: 'Portfolio Updated', time: '5hrs ago', desc: 'New project showcase', avatar: '🎨' },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 2,
                      borderBottom: index < 3 ? '1px solid #f3f4f6' : 'none',
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#f3f4f6', width: 40, height: 40 }}>
                      {activity.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {activity.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.desc}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { label: 'Users', emoji: '👥', value: '19K', progress: 75, color: '#3b82f6', bg: '#dbeafe' },
                { label: 'Clicks', emoji: '👆', value: '2.5M', progress: 85, color: '#f59e0b', bg: '#fef3c7' },
                { label: 'Sales', emoji: '💰', value: '41$', progress: 60, color: '#8b5cf6', bg: '#e0e7ff' },
                { label: 'Items', emoji: '📦', value: '78', progress: 90, color: '#14b8a6', bg: '#ccfbf1' },
              ].map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: item.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1,
                        }}
                      >
                        <Typography>{item.emoji}</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {item.label}
                      </Typography>
                      <Typography variant="h5" fontWeight={700}>
                        {item.value}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        sx={{
                          mt: 1,
                          height: 4,
                          borderRadius: 2,
                          bgcolor: '#e5e7eb',
                          '& .MuiLinearProgress-bar': { bgcolor: item.color },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Sep 2024
                  </Typography>
                  <Box>
                    <IconButton size="small">
                      <ChevronLeft />
                    </IconButton>
                    <IconButton size="small">
                      <ChevronRight />
                    </IconButton>
                  </Box>
                </Box>

                <Grid container spacing={1}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <Grid item xs={12 / 7} key={day}>
                      <Typography variant="caption" color="text.secondary" align="center" display="block">
                        {day}
                      </Typography>
                    </Grid>
                  ))}
                  {[10, 11, 12, 13, 14, 15, 16].map((date) => (
                    <Grid item xs={12 / 7} key={date}>
                      <Box
                        sx={{
                          py: 1,
                          textAlign: 'center',
                          borderRadius: 1,
                          cursor: 'pointer',
                          bgcolor: date === 13 ? '#667eea' : 'transparent',
                          color: date === 13 ? 'white' : 'text.primary',
                          '&:hover': { bgcolor: date === 13 ? '#667eea' : '#f3f4f6' },
                        }}
                      >
                        <Typography variant="body2">{date}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    { label: 'Create New Page', href: '/admin/pages', color: '#667eea' },
                    { label: 'Add Blog Post', href: '/admin/blog', color: '#f093fb' },
                    { label: 'Upload Media', href: '/admin/media', color: '#48dbfb' },
                    { label: 'Manage Logos', href: '/admin/logos', color: '#9b59b6' },
                  ].map((action, index) => (
                    <Box
                      key={index}
                      component={Link}
                      href={action.href}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: '#f9fafb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: action.color,
                          color: 'white',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Typography variant="body2" fontWeight={500}>
                        {action.label}
                      </Typography>
                      <Typography>→</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
