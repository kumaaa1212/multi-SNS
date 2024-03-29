import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import { useState, useEffect, useRef } from 'react'
import Stack from '@mui/material/Stack'
import DropDown from 'components/layout/Header/DropDown'
import Image from 'next/image'
import { RootState } from 'store/store'
import { useSelector } from 'react-redux'
import style from './Avatars.module.scss'
import Noavater from '/public/noavater.jpg'

const StyledBadgeLogin = styled(Badge)(({ theme }) => ({
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

const StyledBadgeLogout = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#ff0000',
    color: '#ff0000',
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

export default function BadgeAvatars(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { icon, userId } = useSelector((state: RootState) => state.user)

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
      {userId ? (
        <StyledBadgeLogin
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
          onClick={(): void => setOpen(!open)}
        >
          <Image
            src={icon ? icon : Noavater}
            alt={''}
            width={40}
            height={40}
            className={style.header_icon}
          />
        </StyledBadgeLogin>
      ) : (
        <StyledBadgeLogout
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
          onClick={(): void => setOpen(!open)}
        >
          <Image
            src={icon ? icon : Noavater}
            alt={''}
            width={40}
            height={40}
            className={style.header_icon}
          />
        </StyledBadgeLogout>
      )}
      <div ref={dropdownRef}>{open && <DropDown />}</div>
    </Stack>
  )
}
