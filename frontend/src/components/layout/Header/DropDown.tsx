import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '@/utils/supabaseClient'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { logoutUser } from '@/features/userSlice'

const DropDown = () => {
  const router = useRouter()
  const { userId } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  const Logout = async (e: any) => {
    e.preventDefault()
    try {
      const { error: logoutError } = await supabase.auth.signOut()
      if (logoutError) {
        throw logoutError
      }
      dispatch(logoutUser())
      await router.push('/')
    } catch {
      alert('エラーが発生しました')
    }
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
            <LoginIcon />
            <p>login</p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default DropDown
