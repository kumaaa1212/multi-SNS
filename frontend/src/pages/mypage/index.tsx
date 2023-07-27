import Mapage from '@/components/template/mypage'
import { supabase } from '@/utils/supabaseClient'
import React from 'react'

const index = () => {
  const deta = async () => {
    const { data, error } = await supabase.from('auth.users').select('*')
    console.log(data)
    console.log(error)
  }
  deta()
  return <Mapage />
}

export default index
