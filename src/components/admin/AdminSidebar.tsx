'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Switch,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Dashboard,
  Pages,
  Build,
  ViewModule,
  MenuBook,
  Business,
  Work,
  People,
  RateReview,
  Article,
  ContactMail,
  Assignment,
  Email,
  PermMedia,
  Image,
  Search,
  Speed,
  Settings,
  Help,
  ChevronLeft,
  ChevronRight,
  Brightness4,
  Brightness7,
  Logout,
  AccountCircle,
} from '@mui/icons-material'
import Link from 'next/link'

interface AdminSidebarProps {
  open: boolean
  onToggle: () => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function AdminSidebar({
  open,
  onToggle,
  darkMode,
  onToggleDarkMode,
}: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
  }

  const menuItems = [
    { title: 'Dashboard', icon: <Dashboard />, href: '/admin/dashboard' },
    { divider: true },
    { title: 'Content', header: true },
    { title: 'Pages', icon: <Pages />, href: '/admin/pages' },
    { title: 'Page Builder', icon: <Build />, href: '/admin/page-builder' },
    { title: 'Home Sections', icon: <ViewModule />, href: '/admin/home-sections' },
    { title: 'Sections', icon: <ViewModule />, href: '/admin/sections' },
    { title: 'Menu Builder', icon: <MenuBook />, href: '/admin/menu-builder' },
    { divider: true },
    { title: 'Business', header: true },
    { title: 'Services', icon: <Business />, href: '/admin/services' },
    { title: 'Portfolio', icon: <Work />, href: '/admin/portfolio' },
    { title: 'Team Members', icon: <People />, href: '/admin/team' },
    { title: 'Testimonials', icon: <RateReview />, href: '/admin/testimonials' },
    { divider: true },
    { title: 'Blog & Contact', header: true },
    { title: 'Blog Posts', icon: <Article />, href: '/admin/blog' },
    { title: 'Contacts', icon: <ContactMail />, href: '/admin/contacts' },
    { title: 'Form Submissions', icon: <Assignment />, href: '/admin/forms' },
    { title: 'Newsletter', icon: <Email />, href: '/admin/newsletter' },
    { divider: true },
    { title: 'Media & Design', header: true },
    { title: 'Media Library', icon: <PermMedia />, href: '/admin/media' },
    { title: 'Logo Management', icon: <Image />, href: '/admin/logos' },
    { divider: true },
    { title: 'Configuration', header: true },
    { title: 'SEO Settings', icon: <Search />, href: '/admin/seo' },
    { title: 'Performance', icon: <Speed />, href: '/admin/performance' },
    { title: 'Settings', icon: <Settings />, href: '/admin/settings' },
    { title: 'Help & Guide', icon: <Help />, href: '/admin/help' },
  ]

  const drawerWidth = open ? 260 : 70

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 64,
          }}
        >
          {open && (
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
              Admin Panel
            </Typography>
          )}
          <IconButton onClick={onToggle} size="small">
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        <Divider />

        {/* User Profile */}
        {session && (
          <>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
              }}
              onClick={handleProfileClick}
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                {session.user?.name?.[0] || session.user?.email?.[0] || 'A'}
              </Avatar>
              {open && (
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" noWrap fontWeight={600}>
                    {session.user?.name || 'Admin'}
                  </Typography>
                  <Typography variant="caption" noWrap color="text.secondary">
                    {session.user?.email}
                  </Typography>
                </Box>
              )}
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem onClick={handleProfileClose}>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <Divider />
          </>
        )}

        {/* Navigation Menu */}
        <List sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
          {menuItems.map((item, index) => {
            if (item.divider) {
              return <Divider key={`divider-${index}`} sx={{ my: 1 }} />
            }

            if (item.header) {
              return open ? (
                <ListItem key={item.title} sx={{ py: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 2,
                      py: 1,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      fontSize: '0.7rem',
                    }}
                  >
                    {item.title}
                  </Typography>
                </ListItem>
              ) : null
            }

            const isActive = pathname === item.href

            return (
              <ListItem key={item.title} disablePadding sx={{ px: 1 }}>
                <Tooltip title={!open ? item.title : ''} placement="right">
                  <ListItemButton
                    component={Link}
                    href={item.href || '#'}
                    selected={isActive}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 40 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && <ListItemText primary={item.title} />}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            )
          })}
        </List>

        <Divider />

        {/* Dark Mode Toggle */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
          }}
        >
          {open ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
                <Typography variant="body2">
                  {darkMode ? 'Dark' : 'Light'} Mode
                </Typography>
              </Box>
              <Switch checked={darkMode} onChange={onToggleDarkMode} />
            </>
          ) : (
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton onClick={onToggleDarkMode} size="small">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}
