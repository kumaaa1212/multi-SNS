import React from 'react'
import Icongenerate from '@/components/parts/Avater'
import { supabase } from '@/utils/supabaseClient'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextProps {
  username: string
  team: string
  icon: any
  bio: string
}

export const AuthContext = createContext({
  username: '',
  team: '',
  icon: '',
  bio: 'AAAAA',
})

export const AuthInfo = () => useContext(AuthContext)

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setcurrentUser] = useState<AuthContextProps>({
    username: '',
    team: '',
    icon: '',
    bio: '',
  })
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session: any) => {
      console.log(session)
      setcurrentUser({
        username: session?.user.user_metadata.username,
        team: session?.user.user_metadata.team,
        bio: session?.user.user_metadata.bio,
        icon: Icongenerate('xcfbgnhCJNsdvfbgnhgfsdcasxcxvcb'),
      })
    })
  }, [])

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
}
