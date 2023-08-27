import Header from './Header'
import { supabase } from '@/utils/supabaseClient'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/features/userSlice'
import { useEffect } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch()

  supabase.auth.onAuthStateChange((event, session: any) => {
    if (session?.user?.user_metadata) {
      dispatch(loginUser(session?.user))
    }
  })
  
  return (
    <div className='layout'>
      <Header />
      <div className='main_area'>{children}</div>
    </div>
  )
}

export default Layout
