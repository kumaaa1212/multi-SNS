import React, {useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import { supabase } from '@/utils/supabaseClient'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/features/userSlice'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if(supabase.auth){
      supabase.auth.onAuthStateChange((event, session: any) => {
        if(session?.user?.user_metadata){
          console.log(session.user.user_metadata)
          dispatch(loginUser(session.user))
        }
      })
    }
  }, [])

  return (
    <div className='layout'>
      <Header />
      <div className='main_area'>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
