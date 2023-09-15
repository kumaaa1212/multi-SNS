import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress'
import { useLoading } from 'components/hooks/useLoading'
import { useToast } from 'components/hooks/useToast'
import { updateUser } from 'features/userSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch } from 'store/store'
import ToastBase from 'components/parts/Toast'
import ModalDiscard from 'components/widgets/Modal/Discard '
import Meta from './Head'
import ResponsiveAppBar from './Header'
import SaveBar from './SaveBar'

interface Props {
  children: React.ReactNode
  isSaveBar?: boolean
  saveAction?: () => void
  discardModalOpen?: boolean
  discardModalClose?: () => void
  discardModalRefresh?: () => void
}

const Layout = (props: Props): JSX.Element => {
  const { children, isSaveBar } = props
  const { discardModalOpen = false, discardModalClose, discardModalRefresh } = props

  const loading = useLoading()
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const dispatch: AppDispatch = useDispatch()
  const [progress, setProgress] = useState<number>(50)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await apiClient.get('/auth/me').then((res) => {
          if (res.status !== 200) throw Error
          dispatch(updateUser(res.data))
        })
      }
    }
    fetchData()
  }, [dispatch])

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0
  //       }
  //       const diff = Math.random() * 10
  //       return Math.min(oldProgress + diff, 100)
  //     })
  //   }, 500)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      toastFunc('ログインしてください', true)
    }
  }, [toastFunc])

  return (
    <div className='layout'>
      {loading && (
        <LinearProgress
          variant='determinate'
          value={progress}
          color='primary'
          className='loading'
        />
      )}
      <ResponsiveAppBar />
      <div>{children}</div>
      {isSaveBar && <SaveBar />}
      {/* <ModalDiscard
        open={discardModalOpen}
        setOpen={discardModalClose}
        discardModalRefresh={discardModalRefresh}
      /> */}
      <ToastBase content={toastContent} isError={isError} active={isToast} />
    </div>
  )
}

export default Layout
