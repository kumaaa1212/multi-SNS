import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { MenuItem, Typography } from '@mui/material'
import { RootState } from 'store/store'

export default function DropDown(): JSX.Element {
  const router = useRouter()
  const { userId } = useSelector((state: RootState) => state.user)

  const Logout = useCallback(async (): Promise<void> => {
    localStorage.removeItem('auth_token')
    router.reload
  }, [router])

  return (
    <div>
      {userId.length === 0 ? (
        <>
          <MenuItem
            onClick={(): void => {
              router.push('/login')
            }}
          >
            <Typography textAlign='center' className='drop_menu'>
              <LoginIcon />
              <div>ログイン</div>
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={(): void => {
              router.push('/')
            }}
          >
            <Typography textAlign='center' className='drop_menu'>
              <PersonAddIcon />
              <div>サインアップ</div>
            </Typography>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem
            onClick={(): void => {
              router.push('/')
            }}
          >
            <Typography textAlign='center' className='drop_menu'>
              <LogoutIcon />
              <div onClick={Logout}>ログアウト</div>
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={(): void => {
              router.push('/mypage')
            }}
          >
            <Typography textAlign='center' className='drop_menu'>
              <PersonIcon />
              <div>アカウント</div>
            </Typography>
          </MenuItem>
        </>
      )}
    </div>
  )
}
