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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Delete, Visibility, Edit } from '@mui/icons-material'
import { useSession } from 'next-auth/react'

interface FormSubmission {
  _id: string
  formType: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  company?: string
  budget?: string
  service?: string
  status: string
  notes?: string
  createdAt: string
}

export default function FormsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)
  const [notes, setNotes] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchSubmissions()
    }
  }, [status, router])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/forms')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (submission: FormSubmission) => {
    setSelectedSubmission(submission)
    setNotes(submission.notes || '')
    setSubmissionStatus(submission.status)
    setOpenDialog(true)
  }

  const handleUpdate = async () => {
    if (!selectedSubmission) return

    try {
      const response = await fetch(`/api/admin/forms/${selectedSubmission._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: submissionStatus, notes }),
      })

      if (response.ok) {
        const updated = await response.json()
        setSubmissions(submissions.map(s => s._id === updated._id ? updated : s))
        setOpenDialog(false)
      }
    } catch (error) {
      console.error('Error updating submission:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return

    try {
      const response = await fetch(`/api/admin/forms/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSubmissions(submissions.filter(s => s._id !== id))
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'error'
      case 'read': return 'warning'
      case 'replied': return 'success'
      case 'archived': return 'default'
      default: return 'default'
    }
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
          Form Submissions
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No form submissions yet
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission._id} hover>
                  <TableCell>
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip label={submission.formType} size="small" />
                  </TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.subject || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={submission.status}
                      color={getStatusColor(submission.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleView(submission)}
                      title="View Details"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(submission._id)}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Form Submission Details</DialogTitle>
        <DialogContent>
          {selectedSubmission && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Name</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedSubmission.name}</Typography>

              <Typography variant="subtitle2" color="text.secondary">Email</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedSubmission.email}</Typography>

              {selectedSubmission.phone && (
                <>
                  <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{selectedSubmission.phone}</Typography>
                </>
              )}

              {selectedSubmission.company && (
                <>
                  <Typography variant="subtitle2" color="text.secondary">Company</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{selectedSubmission.company}</Typography>
                </>
              )}

              {selectedSubmission.subject && (
                <>
                  <Typography variant="subtitle2" color="text.secondary">Subject</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{selectedSubmission.subject}</Typography>
                </>
              )}

              <Typography variant="subtitle2" color="text.secondary">Message</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedSubmission.message}</Typography>

              {selectedSubmission.service && (
                <>
                  <Typography variant="subtitle2" color="text.secondary">Service</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{selectedSubmission.service}</Typography>
                </>
              )}

              {selectedSubmission.budget && (
                <>
                  <Typography variant="subtitle2" color="text.secondary">Budget</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>{selectedSubmission.budget}</Typography>
                </>
              )}

              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={submissionStatus}
                  onChange={(e) => setSubmissionStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="read">Read</MenuItem>
                  <MenuItem value="replied">Replied</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
