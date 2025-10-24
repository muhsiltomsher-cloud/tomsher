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
    team: 0,
    media: 0,
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [loadingActivity, setLoadingActivity] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchStats()
    fetchRecentActivity()
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

  const fetchRecentActivity = async () => {
    try {
      const [pagesRes, blogRes, servicesRes, portfolioRes] = await Promise.all([
        fetch('/api/admin/pages'),
        fetch('/api/admin/blog'),
        fetch('/api/admin/services'),
        fetch('/api/admin/portfolio'),
      ])

      const activities: Array<{name: string; desc: string; avatar: string; time: string; timestamp: number}> = []

      if (pagesRes.ok) {
        const pages = await pagesRes.json()
        pages.slice(0, 2).forEach((page: any) => {
          activities.push({
            name: 'Page Created',
            desc: page.title,
            avatar: '📄',
            time: getTimeAgo(page.createdAt),
            timestamp: new Date(page.createdAt).getTime(),
          })
        })
      }

      if (blogRes.ok) {
        const blogs = await blogRes.json()
        blogs.slice(0, 2).forEach((blog: any) => {
          activities.push({
            name: 'Blog Post Published',
            desc: blog.title,
            avatar: '📝',
            time: getTimeAgo(blog.createdAt),
            timestamp: new Date(blog.createdAt).getTime(),
          })
        })
      }

      if (servicesRes.ok) {
        const services = await servicesRes.json()
        services.slice(0, 1).forEach((service: any) => {
          activities.push({
            name: 'Service Added',
            desc: service.title,
            avatar: '💼',
            time: getTimeAgo(service.createdAt),
            timestamp: new Date(service.createdAt).getTime(),
          })
        })
      }

      if (portfolioRes.ok) {
        const portfolio = await portfolioRes.json()
        portfolio.slice(0, 1).forEach((item: any) => {
          activities.push({
            name: 'Portfolio Updated',
            desc: item.title,
            avatar: '🎨',
            time: getTimeAgo(item.createdAt),
            timestamp: new Date(item.createdAt).getTime(),
          })
        })
      }

      activities.sort((a, b) => b.timestamp - a.timestamp)
      setRecentActivity(activities.slice(0, 4))
    } catch (error) {
      console.error('Error fetching recent activity:', error)
    } finally {
      setLoadingActivity(false)
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return date.toLocaleDateString()
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
    <Box sx={{ py: 2, px: 2, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Hello {userName}, Good {greeting}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Let's check your website.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Total Pages
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.pages}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Published pages
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Services
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.services}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Active services
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Portfolio
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.portfolio}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Portfolio projects
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 2 }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Content Overview
                </Typography>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
                  {(stats.pages + stats.services + stats.portfolio + stats.blog).toLocaleString()} Items
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Total content across all sections
                  </Typography>
                </Box>

                <Grid container spacing={1.5}>
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
                          p: 1.5,
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
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: item.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="body1">{item.emoji}</Typography>
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

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
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

                {loadingActivity ? (
                  <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Loading...</Typography>
                  </Box>
                ) : recentActivity.length === 0 ? (
                  <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">No recent activity</Typography>
                  </Box>
                ) : recentActivity.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      py: 1.5,
                      borderBottom: index < 3 ? '1px solid #f3f4f6' : 'none',
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#f3f4f6', width: 36, height: 36 }}>
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
            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              {[
                { label: 'Testimonials', emoji: '⭐', value: stats.testimonials, progress: (stats.testimonials / 10) * 100, color: '#3b82f6', bg: '#dbeafe' },
                { label: 'Contacts', emoji: '📧', value: stats.contacts, progress: (stats.contacts / 20) * 100, color: '#f59e0b', bg: '#fef3c7' },
                { label: 'Team Members', emoji: '👥', value: stats.team, progress: (stats.team / 15) * 100, color: '#8b5cf6', bg: '#e0e7ff' },
                { label: 'Media Files', emoji: '📦', value: stats.media, progress: (stats.media / 50) * 100, color: '#14b8a6', bg: '#ccfbf1' },
              ].map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <CardContent sx={{ py: 1.5 }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2,
                          bgcolor: item.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body2">{item.emoji}</Typography>
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
                          mt: 0.5,
                          height: 3,
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

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', mb: 2 }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
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

                <Grid container spacing={0.5}>
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
                          py: 0.5,
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

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
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
                        p: 1.5,
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
