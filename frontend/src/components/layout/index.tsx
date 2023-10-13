import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress'
import { useLoading } from 'components/hooks/useLoading'
import { updateUser } from 'features/userSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch } from 'store/store'
import Loading from 'components/layout/Loading'
import ModalDiscard from 'components/widgets/Modal/Discard '
import Footer from './Footer'
import ResponsiveAppBar from './Header'
import SaveBar from './SaveBar'

interface Props {
  margin?: string
  padding?: string
  bgColor?: string
  loadingAll?: boolean
  children: React.ReactNode
  isSaveBar?: boolean
  setIsSaveBar?: React.Dispatch<React.SetStateAction<boolean>>
  discardModalOpen?: boolean
  discardModalClose?: React.Dispatch<React.SetStateAction<boolean>>
  footerState?: boolean
}

export default function Layout(props: Props): JSX.Element {
  const { margin = 'm_0', padding = 'p_0', bgColor, loadingAll, children } = props
  const { isSaveBar = false, setIsSaveBar = (): void => {} } = props
  const { discardModalOpen = false, discardModalClose = (): void => {}, footerState } = props

  const loading = useLoading()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem('auth_token')
      try {
        if (token) {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
          await apiClient.get('/auth/me').then((res) => {
            if (res.status !== 200) throw Error
            dispatch(updateUser(res.data.user))
          })
        }
      } catch {
        localStorage.removeItem('auth_token')
      }
    }
    fetchData()
  }, [dispatch])

  return (
    <div className='layout'>
      {loading && (
        <LinearProgress value={100} variant='determinate' color='primary' className='loading' />
      )}
      <ResponsiveAppBar />
      <div className={`${margin} ${padding} ${bgColor} min_height`}>{children}</div>
      {isSaveBar && <SaveBar discardModalClose={discardModalClose} setIsSaveBar={setIsSaveBar} />}
      {loadingAll && <Loading />}
      <ModalDiscard
        open={discardModalOpen}
        setOpen={discardModalClose}
        setIsSaveBar={setIsSaveBar}
      />
      {!footerState && <Footer />}
    </div>
  )
}
