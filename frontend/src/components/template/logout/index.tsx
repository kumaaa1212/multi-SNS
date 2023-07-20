import { supabase } from '@/utils/supabaseClient'

const Logout = async (e: any) => {
  e.preventDefault()
  try {
    const { error: logoutError } = await supabase.auth.signOut()
    if (logoutError) {
      throw logoutError
    }
  } catch {
    alert('エラーが発生しました')
  }
}
export default Logout
