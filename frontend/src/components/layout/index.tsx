import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useToast } from 'components/hooks/useToast'
import { updateUser } from 'features/userSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch } from 'store/store'
import ToastBase from 'components/parts/Toast'
import Header from './Header'

interface Props {
  children: React.ReactNode
}

const Layout = (props: Props): JSX.Element => {
  const { children } = props

  const dispatch: AppDispatch = useDispatch()
  const { toastContent, isError, isToast, toastFunc } = useToast()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          const res = await apiClient.get('/auth/me')
          dispatch(updateUser(res.data))
        } catch (error) {
          toastFunc('ログインしてください', true)
        }
      }
    }
    fetchData()
  }, [dispatch, toastFunc])

  return (
    <div className='layout'>
      <Header />
      <div className='main_area'>{children}</div>
      <ToastBase content={toastContent} isError={isError} active={isToast} />
    </div>
  )
}

export default Layout
