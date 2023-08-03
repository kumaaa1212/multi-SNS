import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '@/utils/supabaseClient'
import { AuthInfo } from '@/context/auth'
const DropDown = () => {
  const router = useRouter()
  const auth = AuthInfo()
  console.log(auth)
  const Logout = async (e: any) => {
    e.preventDefault()
    console.log('logout')
    try {
      const { error: logoutError } = await supabase.auth.signOut()
      if (logoutError) {
        throw logoutError
      }
      await router.push('/')
    } catch {
      alert('エラーが発生しました')
    }
  }
  return (
    <div className='header_dropdown'>
      {auth.userId ? (
        <div>
          <Link href={'/profile'} className='link_style'>
            <div className='dropdown_list'>
              <PersonIcon />
              account
            </div>
          </Link>
          <Link href={'/'} className='link_style' onClick={Logout}>
            <div className='dropdown_list'>
              <LogoutIcon />
              logout
            </div>
          </Link>
        </div>
      ) : (
        <div>
          <Link href={'/signup'} className='link_style'>
            <div className='dropdown_list'>
              <PersonAddIcon />
              sighup
            </div>
          </Link>
          <Link href={'/login'} className='link_style'>
            <div className='dropdown_list'>
              <LoginIcon />
              login
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default DropDown
