import { supabase } from '@/utils/supabaseClient'

const userInfo = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') {
      console.log('ログインしました')
    }
    if (event == 'SIGNED_OUT') {
      console.log('ログアウトしました')
    }
  })
}
