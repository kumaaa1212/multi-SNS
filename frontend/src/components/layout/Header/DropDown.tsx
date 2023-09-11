import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { RootState } from 'store/store'

const DropDown = (): JSX.Element => {
  const router = useRouter()
  const { userId } = useSelector((state: RootState) => state.user)

  const Logout = async (): Promise<void> => {
    localStorage.removeItem('auth_token')
    router.reload
  }

  return (
    <div className='header_dropdown'>
      {userId ? (
        <>
          <Link href='/account' className='link_style dropdown_list'>
            <PersonIcon />
            <p>Account</p>
          </Link>
          <Link href='/' className='link_style dropdown_list' onClick={Logout}>
            <LogoutIcon />
            <p>Logout</p>
          </Link>
        </>
      ) : (
        <>
          <Link href='/signup' className='link_style dropdown_list'>
            <PersonAddIcon />
            <p>Sighup</p>
          </Link>
          <Link href='/login' className='link_style dropdown_list'>
            <LoginIcon />
            <p>Login</p>
          </Link>
        </>
      )}
    </div>
  )
}

export default DropDown
