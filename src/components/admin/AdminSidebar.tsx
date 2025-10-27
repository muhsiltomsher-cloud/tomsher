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
  Stack,
  Chip,
  LinearProgress,
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

  const drawerWidth = open ? 272 : 78

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': (theme) => ({
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.35s ease',
          overflowX: 'hidden',
          position: 'relative',
          borderRight: '1px solid',
          borderColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.18 : 0.12
          ),
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(185deg, rgba(10, 18, 36, 0.96) 0%, rgba(16, 30, 54, 0.94) 55%, rgba(5, 10, 20, 0.94) 100%)'
            : 'linear-gradient(185deg, rgba(255, 255, 255, 0.97) 0%, rgba(244, 249, 255, 0.94) 60%, rgba(234, 244, 255, 0.92) 100%)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 30px 60px -36px rgba(0, 0, 0, 0.85)'
            : '0 40px 80px -40px rgba(33, 150, 243, 0.32)',
          backdropFilter: 'blur(20px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 12% 25%, rgba(66, 165, 245, 0.18), transparent 48%), radial-gradient(circle at 90% 8%, rgba(186, 104, 200, 0.18), transparent 52%)'
              : 'radial-gradient(circle at 12% 25%, rgba(66, 165, 245, 0.16), transparent 52%), radial-gradient(circle at 90% 8%, rgba(186, 104, 200, 0.14), transparent 52%)',
            opacity: 0.92,
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
            gap: 1.5,
            px: open ? 2.75 : 1.75,
            py: 2.25,
            minHeight: 78,
            mx: open ? 2 : 1.5,
            mt: 2,
            borderRadius: open ? 2.75 : 2,
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.24)
              : alpha(theme.palette.primary.main, 0.16),
            boxShadow: theme.palette.mode === 'dark'
              ? '0 26px 58px -34px rgba(33, 150, 243, 0.6)'
              : '0 30px 60px -36px rgba(33, 150, 243, 0.42)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.35s ease',
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
            <Stack
              spacing={0.75}
              sx={{ position: 'relative', zIndex: 1 }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={(theme) => ({
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: 'transparent',
                  background: `linear-gradient(120deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  WebkitBackgroundClip: 'text',
                })}
              >
                Admin Dashboard
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Chip
                  size="small"
                  label="Creative mode"
                  sx={(theme) => ({
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    bgcolor: alpha(theme.palette.common.white, 0.28),
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                    backdropFilter: 'blur(6px)',
                  })}
                />
                <Typography variant="caption" color="text.secondary">
                  Curate your workspace
                </Typography>
              </Stack>
            </Stack>
          )}
          <IconButton
            onClick={onToggle}
            size="small"
            sx={(theme) => ({
              position: 'relative',
              zIndex: 1,
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.common.white, 0.12)
                : alpha(theme.palette.common.white, 0.78),
              color: theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 20px 34px -24px rgba(0, 0, 0, 0.7)'
                : '0 22px 38px -28px rgba(33, 150, 243, 0.5)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.28),
                transform: 'translateY(-2px) rotate(-4deg)',
              },
            })}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        <Divider
          sx={(theme) => ({
            mx: open ? 2 : 1.5,
            borderColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.2 : 0.12
            ),
            opacity: theme.palette.mode === 'dark' ? 0.5 : 0.7,
          })}
        />

        {open ? (
          <Box
            sx={(theme) => ({
              mx: 2,
              mt: 2,
              borderRadius: 2.5,
              px: 2.5,
              py: 2,
              background: theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary.main, 0.22)
                : alpha(theme.palette.primary.main, 0.14),
              boxShadow: theme.palette.mode === 'dark'
                ? '0 24px 54px -32px rgba(33, 150, 243, 0.55)'
                : '0 30px 60px -38px rgba(33, 150, 243, 0.38)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16), transparent 60%)',
                opacity: 0.65,
              },
            })}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                  Today’s dashboard glance
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Keep projects aligned and shipping on time
                </Typography>
              </Box>
              <Chip
                size="small"
                label="68% setup"
                sx={(theme) => ({
                  fontWeight: 600,
                  letterSpacing: 0.4,
                  bgcolor: alpha(theme.palette.common.white, 0.2),
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
                  backdropFilter: 'blur(4px)',
                })}
              />
            </Stack>
            <LinearProgress
              variant="determinate"
              value={68}
              sx={(theme) => ({
                height: 6,
                borderRadius: 999,
                overflow: 'hidden',
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(120deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                },
              })}
            />
            <Stack direction="row" spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
              <Stack spacing={0.25}>
                <Typography variant="caption" color="text.secondary">
                  Active projects
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  12
                </Typography>
              </Stack>
              <Stack spacing={0.25}>
                <Typography variant="caption" color="text.secondary">
                  Pending reviews
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  04
                </Typography>
              </Stack>
              <Stack spacing={0.25}>
                <Typography variant="caption" color="text.secondary">
                  New messages
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  18
                </Typography>
              </Stack>
            </Stack>
          </Box>
        ) : (
          <Tooltip title="Dashboard glance">
            <Box sx={{ px: 1.75, py: 2.25 }}>
              <LinearProgress
                variant="determinate"
                value={68}
                sx={(theme) => ({
                  height: 6,
                  borderRadius: 999,
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  '& .MuiLinearProgress-bar': {
                    background: theme.palette.primary.main,
                  },
                })}
              />
            </Box>
          </Tooltip>
        )}

        {session && (
          <>
            <Box
              sx={(theme) => ({
                px: open ? 2.75 : 1.75,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                gap: open ? 1.75 : 1.25,
                mx: open ? 2 : 1.5,
                my: open ? 2.25 : 1.75,
                borderRadius: 2.25,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.26)
                  : alpha(theme.palette.primary.main, 0.18),
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 26px 54px -33px rgba(0, 0, 0, 0.75)'
                  : '0 30px 58px -35px rgba(33, 150, 243, 0.35)',
                transition: 'all 0.3s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.18), transparent 52%)',
                  opacity: 0.65,
                },
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              })}
              onClick={handleProfileClick}
            >
              <Avatar
                sx={(theme) => ({
                  width: open ? 52 : 46,
                  height: open ? 52 : 46,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  boxShadow: `0 24px 44px -26px ${alpha(theme.palette.primary.main, 0.8)}`,
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
                  minWidth: 190,
                  borderRadius: 2.25,
                  overflow: 'visible',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(12, 25, 47, 0.96) 0%, rgba(18, 36, 68, 0.94) 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f3f6ff 100%)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 22px 46px -30px rgba(0, 0, 0, 0.85)'
                    : '0 26px 52px -32px rgba(33, 150, 243, 0.3)',
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
                mx: open ? 2 : 1.5,
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
            py: 2.5,
            px: open ? 1.25 : 0.75,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.35,
            '&::-webkit-scrollbar': {
              width: open ? 9 : 6,
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
                    my: 1.75,
                    mx: open ? 2 : 1.75,
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
                      py: 0.6,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      color: alpha(theme.palette.text.secondary, 0.9),
                      fontSize: '0.68rem',
                      borderRadius: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.09),
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
                  px: open ? 1.35 : 0.85,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: open ? 'translateX(3px)' : undefined,
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
                      borderRadius: 2.25,
                      mb: 0.85,
                      px: open ? 2.4 : 1.8,
                      py: open ? 1.15 : 1,
                      color: isActive ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                      transition: 'all 0.28s ease',
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'inherit',
                        background: `linear-gradient(120deg, ${alpha(
                          theme.palette.primary.main,
                          0.22
                        )}, ${alpha(theme.palette.primary.light, 0.12)})`,
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        zIndex: -1,
                      },
                      '&:hover': {
                        color: theme.palette.text.primary,
                        transform: 'translateX(6px)',
                        '&::before': {
                          opacity: 0.9,
                        },
                      },
                      '&:hover .MuiListItemIcon-root': {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          theme.palette.mode === 'dark' ? 0.34 : 0.18
                        ),
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.primary.light
                          : theme.palette.primary.main,
                      },
                      '&.Mui-selected': {
                        color: theme.palette.primary.contrastText,
                        boxShadow: `0 26px 52px -32px ${alpha(theme.palette.primary.main, 0.6)}`,
                        '&::before': {
                          opacity: 1,
                          background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        },
                      },
                      '&.Mui-selected:hover': {
                        transform: 'translateX(6px)',
                      },
                      '&.Mui-selected .MuiListItemIcon-root': {
                        backgroundColor: alpha(theme.palette.common.white, 0.24),
                        color: theme.palette.primary.contrastText,
                      },
                    })}
                  >
                    <ListItemIcon
                      sx={(theme) => ({
                        minWidth: open ? 46 : 38,
                        width: open ? 42 : 36,
                        height: open ? 42 : 36,
                        borderRadius: open ? 2 : 1.75,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: open ? 1.65 : 0,
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          theme.palette.mode === 'dark' ? 0.26 : 0.12
                        ),
                        color: theme.palette.mode === 'dark'
                          ? theme.palette.primary.light
                          : theme.palette.primary.main,
                        transition: 'all 0.3s ease',
                        '& .MuiSvgIcon-root': {
                          fontSize: open ? '1.32rem' : '1.18rem',
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
            mx: open ? 2 : 1.5,
            borderColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === 'dark' ? 0.18 : 0.1
            ),
            opacity: theme.palette.mode === 'dark' ? 0.5 : 0.65,
          })}
        />

        <Box
          sx={(theme) => ({
            px: open ? 2.75 : 1.75,
            py: open ? 2.1 : 1.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            gap: 1.35,
            mx: open ? 2 : 1.5,
            my: 2.25,
            borderRadius: 2.25,
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
              <Stack direction="row" alignItems="center" spacing={1}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {darkMode ? 'Dark' : 'Light'} mode
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Toggle the vibe instantly
                  </Typography>
                </Box>
              </Stack>
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
            <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton
                onClick={onToggleDarkMode}
                size="small"
                sx={(theme) => ({
                  bgcolor: alpha(theme.palette.primary.main, 0.18),
                  color: theme.palette.primary.contrastText,
                  boxShadow: `0 18px 42px -26px ${alpha(theme.palette.primary.main, 0.6)}`,
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
