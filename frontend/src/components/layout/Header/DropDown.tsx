import { useDispatch, useSelector } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AppDispatch, RootState } from 'store/store'

const DropDown = (): JSX.Element => {
  const router = useRouter()
  const { userId } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  const Logout = async (): Promise<void> => {
    localStorage.removeItem('auth_token')
    router.reload
  }

  return (
    <div className='header_dropdown'>
      {userId ? (
        <div>
          <Link href={'/account'} className='link_style dropdown_list'>
            <PersonIcon />
            <p>account</p>
          </Link>
          <Link href={'/'} className='link_style dropdown_list' onClick={Logout}>
            <LogoutIcon />
            <p>logout</p>
          </Link>
        </div>
      ) : (
        <div>
          <Link href={'/signup'} className='link_style dropdown_list'>
            <PersonAddIcon />
            <p>sighup</p>
          </Link>
          <Link href={'/login'} className='link_style dropdown_list'>
            {/* <LoginIcon /> */}
            <p>login</p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default DropDown
