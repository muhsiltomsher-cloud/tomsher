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
import { alpha } from '@mui/material/styles'

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
    { title: 'Page Content', icon: <Pages />, href: '/admin/page-content' },
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
        '& .MuiDrawer-paper': (theme) => ({
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          position: 'relative',
          borderRight: '1px solid',
          borderColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.18 : 0.12
          ),
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(9, 18, 34, 0.96) 0%, rgba(16, 28, 50, 0.94) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(241, 247, 255, 0.94) 100%)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 28px 60px -32px rgba(0, 0, 0, 0.85)'
            : '0 34px 70px -38px rgba(33, 150, 243, 0.35)',
          backdropFilter: 'blur(18px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 15% 25%, rgba(66, 165, 245, 0.2), transparent 45%), radial-gradient(circle at 85% 5%, rgba(186, 104, 200, 0.18), transparent 42%)'
              : 'radial-gradient(circle at 15% 25%, rgba(66, 165, 245, 0.14), transparent 52%), radial-gradient(circle at 85% 5%, rgba(186, 104, 200, 0.14), transparent 48%)',
            opacity: 0.9,
          },
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            gap: 1.25,
            px: open ? 2.75 : 1.5,
            py: 2.25,
            minHeight: 72,
            mx: open ? 2 : 1.25,
            mt: 2,
            borderRadius: open ? 2.5 : 2,
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.22)
              : alpha(theme.palette.primary.main, 0.14),
            boxShadow: theme.palette.mode === 'dark'
              ? '0 25px 50px -30px rgba(33, 150, 243, 0.6)'
              : '0 28px 56px -32px rgba(33, 150, 243, 0.45)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.18), transparent 55%)',
              opacity: 0.7,
            },
          })}
        >
          {open && (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={(theme) => ({
                fontWeight: 800,
                letterSpacing: 1.1,
                textTransform: 'uppercase',
                color: 'transparent',
                background: `linear-gradient(120deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                position: 'relative',
                zIndex: 1,
              })}
            >
              Admin Panel
            </Typography>
          )}
          <IconButton
            onClick={onToggle}
            size="small"
            sx={(theme) => ({
              position: 'relative',
              zIndex: 1,
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.12)
                : alpha(theme.palette.common.white, 0.75),
              color: theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 18px 32px -18px rgba(0, 0, 0, 0.7)'
                : '0 20px 36px -24px rgba(33, 150, 243, 0.55)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.25),
                transform: 'translateY(-2px)',
              },
            })}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        <Divider
          sx={(theme) => ({
            mx: open ? 2 : 1.25,
            borderColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.2 : 0.12
            ),
            opacity: theme.palette.mode === 'dark' ? 0.5 : 0.7,
          })}
        />

        {session && (
          <>
            <Box
              sx={(theme) => ({
                px: open ? 2.75 : 1.5,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                gap: open ? 1.5 : 1,
                mx: open ? 2 : 1.25,
                my: 2,
                borderRadius: 2,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.25)
                  : alpha(theme.palette.primary.main, 0.18),
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 24px 50px -30px rgba(0, 0, 0, 0.7)'
                  : '0 28px 50px -32px rgba(33, 150, 243, 0.35)',
                transition: 'all 0.3s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.18), transparent 50%)',
                  opacity: 0.6,
                },
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 28px 60px -28px rgba(0, 0, 0, 0.75)'
                    : '0 32px 60px -35px rgba(33, 150, 243, 0.38)',
                },
              })}
              onClick={handleProfileClick}
            >
              <Avatar
                sx={(theme) => ({
                  width: open ? 48 : 44,
                  height: open ? 48 : 44,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  boxShadow: `0 18px 40px -20px ${alpha(theme.palette.primary.main, 0.8)}`,
                  zIndex: 1,
                })}
              >
                {session.user?.name?.[0] || session.user?.email?.[0] || 'A'}
              </Avatar>
              {open && (
                <Box sx={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
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
              PaperProps={{
                elevation: 0,
                sx: (theme) => ({
                  mt: 1.5,
                  minWidth: 180,
                  borderRadius: 2,
                  overflow: 'visible',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(12, 25, 47, 0.96) 0%, rgba(18, 36, 68, 0.94) 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f3f6ff 100%)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 20px 45px -28px rgba(0, 0, 0, 0.85)'
                    : '0 24px 48px -30px rgba(33, 150, 243, 0.3)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                }),
              }}
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
            <Divider
              sx={(theme) => ({
                mx: open ? 2 : 1.25,
                borderColor: alpha(
                  theme.palette.primary.main,
                  theme.palette.mode === 'dark' ? 0.2 : 0.12
                ),
                opacity: theme.palette.mode === 'dark' ? 0.45 : 0.65,
              })}
            />
          </>
        )}

        <List
          sx={(theme) => ({
            flex: 1,
            overflowY: 'auto',
            py: 2,
            px: open ? 1 : 0.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.25,
            '&::-webkit-scrollbar': {
              width: open ? 8 : 6,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.primary.main, 0.25),
              borderRadius: 999,
            },
          })}
        >
          {menuItems.map((item, index) => {
            if (item.divider) {
              return (
                <Divider
                  key={`divider-${index}`}
                  sx={(theme) => ({
                    my: 1.5,
                    mx: open ? 2 : 1.5,
                    borderColor: alpha(
                      theme.palette.primary.main,
                      theme.palette.mode === 'dark' ? 0.16 : 0.1
                    ),
                    opacity: 0.5,
                  })}
                />
              )
            }

            if (item.header) {
              return open ? (
                <ListItem key={item.title} sx={{ py: 0.75, px: 2.75 }}>
                  <Typography
                    variant="caption"
                    sx={(theme) => ({
                      px: 1,
                      py: 0.75,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      color: alpha(theme.palette.text.secondary, 0.9),
                      fontSize: '0.7rem',
                      borderRadius: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    })}
                  >
                    {item.title}
                  </Typography>
                </ListItem>
              ) : null
            }

            const isActive = pathname === item.href

            return (
              <ListItem
                key={item.title}
                disablePadding
                sx={{
                  px: open ? 1.25 : 0.75,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: open ? 'translateX(2px)' : undefined,
                  },
                }}
              >
                <Tooltip title={!open ? item.title : ''} placement="right">
                  <ListItemButton
                    component={Link}
                    href={item.href || '#'}
                    selected={isActive}
                    sx={(theme) => ({
                      position: 'relative',
                      borderRadius: 2,
                      mb: 0.75,
                      px: open ? 2.25 : 1.75,
                      py: 1.25,
                      color: isActive ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                      transition: 'all 0.25s ease',
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'inherit',
                        background: `linear-gradient(120deg, ${alpha(
                          theme.palette.primary.main,
                          0.18
                        )}, ${alpha(theme.palette.primary.light, 0.08)})`,
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        zIndex: -1,
                      },
                      '&:hover': {
                        color: theme.palette.text.primary,
                        transform: 'translateX(4px)',
                        '&::before': {
                          opacity: 0.9,
                        },
                      },
                      '&:hover .MuiListItemIcon-root': {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          theme.palette.mode === 'dark' ? 0.32 : 0.18
                        ),
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.primary.light
                          : theme.palette.primary.main,
                      },
                      '&.Mui-selected': {
                        color: theme.palette.primary.contrastText,
                        boxShadow: `0 22px 45px -28px ${alpha(theme.palette.primary.main, 0.6)}`,
                        '&::before': {
                          opacity: 1,
                          background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        },
                      },
                      '&.Mui-selected:hover': {
                        transform: 'translateX(4px)',
                      },
                      '&.Mui-selected .MuiListItemIcon-root': {
                        backgroundColor: alpha(theme.palette.common.white, 0.22),
                        color: theme.palette.primary.contrastText,
                      },
                    })}
                  >
                    <ListItemIcon
                      sx={(theme) => ({
                        minWidth: open ? 44 : 36,
                        width: open ? 40 : 36,
                        height: open ? 40 : 36,
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: open ? 1.5 : 0,
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          theme.palette.mode === 'dark' ? 0.24 : 0.12
                        ),
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.primary.light
                          : theme.palette.primary.main,
                        transition: 'all 0.3s ease',
                        '& .MuiSvgIcon-root': {
                          fontSize: open ? '1.35rem' : '1.2rem',
                        },
                      })}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontWeight: isActive ? 700 : 600,
                          fontSize: '0.92rem',
                          letterSpacing: 0.2,
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            )
          })}
        </List>

        <Divider
          sx={(theme) => ({
            mx: open ? 2 : 1.25,
            borderColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.18 : 0.1
            ),
            opacity: theme.palette.mode === 'dark' ? 0.5 : 0.65,
          })}
        />

        <Box
          sx={(theme) => ({
            px: open ? 2.75 : 1.5,
            py: open ? 2 : 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            gap: 1.25,
            mx: open ? 2 : 1.25,
            my: 2,
            borderRadius: 2,
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.2)
              : alpha(theme.palette.primary.main, 0.14),
            boxShadow: theme.palette.mode === 'dark'
              ? '0 24px 50px -30px rgba(0, 0, 0, 0.7)'
              : '0 26px 54px -32px rgba(33, 150, 243, 0.35)',
            transition: 'all 0.3s ease',
          })}
        >
          {open ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
                <Typography variant="body2" fontWeight={600}>
                  {darkMode ? 'Dark' : 'Light'} Mode
                </Typography>
              </Box>
              <Switch
                checked={darkMode}
                onChange={onToggleDarkMode}
                sx={(theme) => ({
                  '& .MuiSwitch-thumb': {
                    backgroundImage: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #fff, #90caf9)'
                      : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.6)
                      : alpha(theme.palette.primary.main, 0.3),
                  },
                })}
              />
            </>
          ) : (
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton
                onClick={onToggleDarkMode}
                size="small"
                sx={(theme) => ({
                  bgcolor: alpha(theme.palette.primary.main, 0.18),
                  color: theme.palette.primary.contrastText,
                  boxShadow: `0 16px 38px -24px ${alpha(theme.palette.primary.main, 0.6)}`,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.25),
                  },
                })}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}
