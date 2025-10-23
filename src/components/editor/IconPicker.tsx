'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
} from '@mui/material'
import { Close, Search } from '@mui/icons-material'
import * as MuiIcons from '@mui/icons-material'
import * as ReactIcons from 'react-icons/fa'
import * as ReactIconsMd from 'react-icons/md'
import * as ReactIconsAi from 'react-icons/ai'
import * as ReactIconsBi from 'react-icons/bi'

interface IconPickerProps {
  open: boolean
  onClose: () => void
  onSelect: (icon: { type: 'mui' | 'react' | 'image'; value: string }) => void
  currentIcon?: { type: 'mui' | 'react' | 'image'; value: string }
}

export default function IconPicker({ open, onClose, onSelect, currentIcon }: IconPickerProps) {
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const muiIconNames = Object.keys(MuiIcons).filter(
    (key) => key !== 'default' && !key.includes('Outlined') && !key.includes('Rounded')
  )

  const reactIconNames = [
    ...Object.keys(ReactIcons),
    ...Object.keys(ReactIconsMd),
    ...Object.keys(ReactIconsAi),
    ...Object.keys(ReactIconsBi),
  ].filter((key) => key !== 'default')

  const filteredMuiIcons = muiIconNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredReactIcons = reactIconNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectIcon = (type: 'mui' | 'react' | 'image', value: string) => {
    onSelect({ type, value })
    onClose()
  }

  const renderIcon = (iconName: string, type: 'mui' | 'react') => {
    if (type === 'mui') {
      const IconComponent = (MuiIcons as any)[iconName]
      return IconComponent ? <IconComponent /> : null
    } else {
      const IconComponent =
        (ReactIcons as any)[iconName] ||
        (ReactIconsMd as any)[iconName] ||
        (ReactIconsAi as any)[iconName] ||
        (ReactIconsBi as any)[iconName]
      return IconComponent ? <IconComponent size={24} /> : null
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Choose Icon
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Material UI Icons" />
          <Tab label="React Icons" />
          <Tab label="Custom Image" />
        </Tabs>

        {tab < 2 && (
          <TextField
            fullWidth
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{ mb: 2 }}
          />
        )}

        {tab === 0 && (
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            <Grid container spacing={1}>
              {filteredMuiIcons.slice(0, 100).map((iconName) => (
                <Grid item key={iconName}>
                  <Button
                    variant={
                      currentIcon?.type === 'mui' && currentIcon?.value === iconName
                        ? 'contained'
                        : 'outlined'
                    }
                    onClick={() => handleSelectIcon('mui', iconName)}
                    sx={{
                      minWidth: 60,
                      height: 60,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    {renderIcon(iconName, 'mui')}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            <Grid container spacing={1}>
              {filteredReactIcons.slice(0, 100).map((iconName) => (
                <Grid item key={iconName}>
                  <Button
                    variant={
                      currentIcon?.type === 'react' && currentIcon?.value === iconName
                        ? 'contained'
                        : 'outlined'
                    }
                    onClick={() => handleSelectIcon('react', iconName)}
                    sx={{
                      minWidth: 60,
                      height: 60,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    {renderIcon(iconName, 'react')}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tab === 2 && (
          <Box>
            <TextField
              fullWidth
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/icon.png"
              sx={{ mb: 2 }}
            />
            {imageUrl && (
              <Box sx={{ mb: 2, text-align: 'center' }}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ maxWidth: 100, maxHeight: 100, objectFit: 'contain' }}
                />
              </Box>
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleSelectIcon('image', imageUrl)}
              disabled={!imageUrl}
            >
              Use This Image
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}
