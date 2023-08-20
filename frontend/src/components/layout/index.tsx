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

  useEffect(() => {
    const userFetch = async () => {
      // const { data: { user } } = await supabase.auth.getUser()

      // console.log('AAA',user)
      const { data: user, error } = await supabase.auth.admin.updateUserById(
        'e91f80e5-f25c-4346-826e-32ba894bde99',
        { user_metadata: { team: 'Fマリノス' } }
      )    
      console.log(error)
      console.log('AAAA',user)

    }
    userFetch()
  }, [])

  return (
    <div className='layout'>
      <Header />
      <div className='main_area'>{children}</div>
    </div>
  )
}

export default Layout
