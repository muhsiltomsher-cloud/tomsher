'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState, useMemo } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Box } from '@mui/material'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#667eea',
          },
          secondary: {
            main: '#f093fb',
          },
        },
      }),
    [darkMode]
  )

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <AdminSidebar
            open={sidebarOpen}
            onToggle={toggleSidebar}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              transition: 'margin-left 0.3s',
              marginLeft: sidebarOpen ? '260px' : '70px',
              bgcolor: 'background.default',
            }}
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </SessionProvider>
  )
}
