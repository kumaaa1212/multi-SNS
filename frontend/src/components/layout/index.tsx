import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from 'features/userSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch } from 'store/store'
import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        // トークンがある場合、リクエストヘッダーに設定
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          // ユーザーデータを取得
          const res = await apiClient.get('/auth/me')
          dispatch(loginUser(res.data))
        } catch (error) {
          // console.error('Error fetching data:', error)
        }
      }
    }
    fetchData()
  }, []) // 空の依存リストを渡すことで、マウント時にのみ実行
  return (
    <div className='layout'>
      <Header />
      <div className='main_area'>{children}</div>
    </div>
  )
}

export default Layout
