import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { RootState } from 'store/store'
import { jLeagueTeams } from 'utils/TeamData'
import DropDown from './DropDown'

export default function Header(): JSX.Element {
  const router = useRouter()
  const { icon, team } = useSelector((state: RootState) => state.user)
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null)
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null)

  const pages = useMemo(() => ['HOME', 'CHAT', 'MYPAGE', 'BOARD'], [])

  const myTeam = useMemo(() => {
    return jLeagueTeams.find((jLeagueTeam) => jLeagueTeam.name === team)
  }, [team])

  const activeLink = (url: string): string => {
    if (url === 'HOME' && router.asPath.includes('/home')) {
      return 'active'
    } else if (url === 'CHAT' && router.asPath.includes('/chat')) {
      return 'active'
    } else if (url === 'MYPAGE' && router.asPath.includes('/mypage')) {
      return 'active'
    } else if (url === 'BOARD' && myTeam && router.asPath.includes(`/board/${myTeam.label}`)) {
      return 'active'
    }
    return ''
  }

  const handleCloseNavMenu = useCallback(
    (name: string): void => {
      setAnchorElNav(null)
      if (name === 'MYPAGE') {
        router.push('/mypage')
      } else if (name === 'HOME') {
        router.push('/home')
      } else if (name === 'CHAT') {
        router.push('/chat')
      } else if (name === 'BOARD') {
        router.push(`/board/${myTeam?.label}`)
      }
    },
    [myTeam, router],
  )

  return (
    <AppBar position='static' className='m_0 p_0' color='inherit'>
      <Container className='breakpoint'>
        <Toolbar disableGutters className='full_width'>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Image
              src='/logo.png'
              alt='logo'
              width={280}
              height={60}
              className='logo_img'
              priority
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={(event: React.MouseEvent<HTMLElement>): void =>
                setAnchorElNav(event.currentTarget)
              }
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography
                    textAlign='center'
                    className='link'
                    onClick={(): void => handleCloseNavMenu(page)}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                className={activeLink(page)}
                key={page}
                onClick={(): void => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings' className='header_icon'>
              <IconButton
                onClick={(event: React.MouseEvent<HTMLElement>): void =>
                  setAnchorElUser(event.currentTarget)
                }
                sx={{ p: 0 }}
              >
                <Image
                  src={icon || '/noavater.jpg'}
                  alt='icon'
                  width={50}
                  height={50}
                  className='header_img'
                  priority
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={(): void => setAnchorElUser(null)}
            >
              <DropDown />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
