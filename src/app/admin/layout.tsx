'use client'

import { useEffect, useMemo, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
  Box,
  Container,
  useMediaQuery,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { NotificationProvider } from '@/contexts/NotificationContext'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'
  const prefersWideLayout = useMediaQuery('(min-width: 1200px)', {
    defaultMatches: true,
  })
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(prefersWideLayout)

  useEffect(() => {
    setSidebarOpen(prefersWideLayout)
  }, [prefersWideLayout])

  const baseTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#667eea',
            light: '#9aa5ff',
            dark: '#4953b8',
          },
          secondary: {
            main: '#f093fb',
            light: '#f4b7fc',
            dark: '#d16cda',
          },
          background: {
            default: darkMode ? '#070d1a' : '#f5f7ff',
            paper: darkMode ? '#0c1629' : '#ffffff',
          },
        },
        shape: {
          borderRadius: 18,
        },
        typography: {
          fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
          fontWeightRegular: 500,
          fontWeightMedium: 600,
          fontWeightBold: 700,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              body: {
                backgroundImage: `radial-gradient(circle at 10% 10%, ${alpha(
                  themeParam.palette.primary.light,
                  themeParam.palette.mode === 'dark' ? 0.08 : 0.22
                )} 0, transparent 55%), radial-gradient(circle at 90% 0%, ${alpha(
                  themeParam.palette.secondary.main,
                  themeParam.palette.mode === 'dark' ? 0.06 : 0.18
                )} 0, transparent 50%)`,
              },
              '*, *::before, *::after': {
                boxSizing: 'border-box',
              },
            }),
          },
          MuiPaper: {
            defaultProps: {
              elevation: 0,
            },
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [darkMode]
  )

  const theme = useMemo(() => responsiveFontSizes(baseTheme), [baseTheme])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const sidebarWidth = sidebarOpen ? 272 : 78

  return (
    <SessionProvider>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isLoginPage ? (
            children
          ) : (
            <Box
              sx={{
                display: 'flex',
                minHeight: '100vh',
                bgcolor: 'transparent',
              }}
            >
              <AdminSidebar
                open={sidebarOpen}
                onToggle={toggleSidebar}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
              <Box
                component="main"
                sx={(theme) => ({
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                  px: { xs: 2.5, sm: 3, md: 4 },
                  py: { xs: 3, md: 4 },
                  gap: 3,
                  position: 'relative',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(185deg, rgba(10, 18, 36, 0.96) 0%, rgba(16, 30, 54, 0.94) 55%, rgba(5, 10, 20, 0.94) 100%)'
                    : 'linear-gradient(185deg, rgba(255, 255, 255, 0.97) 0%, rgba(244, 249, 255, 0.94) 60%, rgba(234, 244, 255, 0.92) 100%)',
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
                })}
              >
                <Container
                  disableGutters
                  maxWidth="xl"
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    pb: 4,
                  }}
                >
                  {children}
                </Container>
              </Box>
            </Box>
          )}
        </ThemeProvider>
      </NotificationProvider>
    </SessionProvider>
  )
}
