import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { MenuItem, Typography } from '@mui/material'
import { logoutUser } from 'features/userSlice'
import { AppDispatch, RootState } from 'store/store'

export default function DropDown(): JSX.Element {
  const router = useRouter()
  const { userId } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  const Logout = useCallback(async (): Promise<void> => {
    localStorage.removeItem('auth_token')
    dispatch(logoutUser())
    router.reload
  }, [dispatch, router])

  return (
    <div>
      {userId.length === 0 ? (
        <>
          <MenuItem
            onClick={(): void => {
              router.push('/login')
            }}
          >
            <div className='drop_menu'>
              <LoginIcon />
              <p>ログイン</p>
            </div>
          </MenuItem>
          <MenuItem
            onClick={(): void => {
              router.push('/signup')
            }}
          >
            <div className='drop_menu'>
              <PersonAddIcon />
              <p>サインアップ</p>
            </div>
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
              <span onClick={Logout}>ログアウト</span>
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={(): void => {
              router.push('/mypage')
            }}
          >
            <Typography textAlign='center' className='drop_menu'>
              <PersonIcon />
              <span>アカウント</span>
            </Typography>
          </MenuItem>
        </>
      )}
    </div>
  )
}
