import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import { useState, useEffect, useRef } from 'react'
import Stack from '@mui/material/Stack'
import DropDown from '@/components/layout/Header/DropDown'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export default function BadgeAvatars() {
  const [open, setOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.parentNode?.contains(e.target as Node) &&
        e.target !== dropdownRef.current
      ) {
        setOpen(false)
      }
    }
    return document.addEventListener('mousedown', handleClickOutside)
  }, [dropdownRef])

  return (
    <Stack direction='row' spacing={2} className='account'>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'
        onClick={() => setOpen(!open)}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </StyledBadge>
      <div ref={dropdownRef}>{open && <DropDown />}</div>
    </Stack>
  )
}
