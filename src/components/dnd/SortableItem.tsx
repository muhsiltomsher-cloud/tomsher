'use client'

import { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, IconButton } from '@mui/material'
import { DragIndicator } from '@mui/icons-material'

interface SortableItemProps {
  id: string
  children: ReactNode
}

export default function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'white',
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.300',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <IconButton {...attributes} {...listeners} size="small" sx={{ cursor: 'grab' }}>
        <DragIndicator />
      </IconButton>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  )
}
