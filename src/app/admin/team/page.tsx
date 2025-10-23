'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
  Avatar,
} from '@mui/material'
import { Delete, Edit, Add, Visibility, VisibilityOff } from '@mui/icons-material'
import { useSession } from 'next-auth/react'

interface TeamMember {
  _id: string
  name: string
  position: string
  bio?: string
  image?: string
  email?: string
  phone?: string
  socialMedia?: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  skills?: string[]
  order: number
  isVisible: boolean
  joinedDate?: string
}

export default function TeamPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({
    name: '',
    position: '',
    bio: '',
    image: '',
    email: '',
    phone: '',
    socialMedia: {},
    skills: [],
    order: 0,
    isVisible: true,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchMembers()
    }
  }, [status, router])

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/admin/team')
      if (response.ok) {
        const data = await response.json()
        setMembers(data)
      }
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setCurrentMember(member)
      setEditMode(true)
    } else {
      setCurrentMember({
        name: '',
        position: '',
        bio: '',
        image: '',
        email: '',
        phone: '',
        socialMedia: {},
        skills: [],
        order: 0,
        isVisible: true,
      })
      setEditMode(false)
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSave = async () => {
    try {
      const url = editMode ? `/api/admin/team/${currentMember._id}` : '/api/admin/team'
      const method = editMode ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentMember),
      })

      if (response.ok) {
        fetchMembers()
        handleCloseDialog()
      }
    } catch (error) {
      console.error('Error saving team member:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      const response = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchMembers()
      }
    } catch (error) {
      console.error('Error deleting team member:', error)
    }
  }

  const handleToggleVisibility = async (member: TeamMember) => {
    try {
      const response = await fetch(`/api/admin/team/${member._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...member, isVisible: !member.isVisible }),
      })

      if (response.ok) {
        fetchMembers()
      }
    } catch (error) {
      console.error('Error toggling visibility:', error)
    }
  }

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s)
    setCurrentMember({ ...currentMember, skills })
  }

  if (status === 'loading' || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Team Members
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Team Member
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No team members yet. Click "Add Team Member" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member._id} hover>
                  <TableCell>
                    <Avatar src={member.image} alt={member.name}>
                      {member.name.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.email || '-'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {member.skills?.slice(0, 2).map((skill, i) => (
                        <Chip key={i} label={skill} size="small" />
                      ))}
                      {(member.skills?.length || 0) > 2 && (
                        <Chip label={`+${(member.skills?.length || 0) - 2}`} size="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{member.order}</TableCell>
                  <TableCell>
                    <Chip
                      label={member.isVisible ? 'Visible' : 'Hidden'}
                      color={member.isVisible ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleToggleVisibility(member)}
                      title={member.isVisible ? 'Hide' : 'Show'}
                    >
                      {member.isVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(member)}
                      title="Edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(member._id)}
                      color="error"
                      title="Delete"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={currentMember.name || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Position"
                value={currentMember.position || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, position: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                value={currentMember.bio || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, bio: e.target.value })}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={currentMember.email || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={currentMember.phone || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={currentMember.image || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, image: e.target.value })}
                helperText="Upload image in Media Library and paste URL here"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma-separated)"
                value={currentMember.skills?.join(', ') || ''}
                onChange={(e) => handleSkillsChange(e.target.value)}
                helperText="e.g., React, Node.js, TypeScript"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn URL"
                value={currentMember.socialMedia?.linkedin || ''}
                onChange={(e) => setCurrentMember({
                  ...currentMember,
                  socialMedia: { ...currentMember.socialMedia, linkedin: e.target.value }
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Twitter URL"
                value={currentMember.socialMedia?.twitter || ''}
                onChange={(e) => setCurrentMember({
                  ...currentMember,
                  socialMedia: { ...currentMember.socialMedia, twitter: e.target.value }
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GitHub URL"
                value={currentMember.socialMedia?.github || ''}
                onChange={(e) => setCurrentMember({
                  ...currentMember,
                  socialMedia: { ...currentMember.socialMedia, github: e.target.value }
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website URL"
                value={currentMember.socialMedia?.website || ''}
                onChange={(e) => setCurrentMember({
                  ...currentMember,
                  socialMedia: { ...currentMember.socialMedia, website: e.target.value }
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Display Order"
                type="number"
                value={currentMember.order || 0}
                onChange={(e) => setCurrentMember({ ...currentMember, order: parseInt(e.target.value) })}
                helperText="Lower numbers appear first"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
