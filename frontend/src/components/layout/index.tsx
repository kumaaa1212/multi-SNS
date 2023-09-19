import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress'
import { useLoading } from 'components/hooks/useLoading'
import { updateUser } from 'features/userSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch } from 'store/store'
import ModalDiscard from 'components/widgets/Modal/Discard '
import ResponsiveAppBar from './Header'
import SaveBar from './SaveBar'

interface Props {
  margin?: string
  children: React.ReactNode
  isSaveBar?: boolean
  saveAction?: () => void
  discardModalOpen?: boolean
  discardModalClose?: React.Dispatch<React.SetStateAction<boolean>>
  discardModalRefresh?: () => void
}

export default function Layout(props: Props): JSX.Element {
  const { margin = 'm_0 p_0', children, isSaveBar } = props
  const [progress, setProgress] = useState<number>(0)
  const {
    discardModalOpen = false,
    discardModalClose = (): void => {},
    discardModalRefresh,
  } = props

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
            dispatch(updateUser(res.data))
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
        <LinearProgress
          value={progress}
          variant='determinate'
          color='primary'
          className='loading'
        />
      )}
      <ResponsiveAppBar />
      <div className={margin}>{children}</div>
      {isSaveBar && <SaveBar discardModalClose={discardModalClose} />}
      <ModalDiscard
        open={discardModalOpen}
        setOpen={discardModalClose}
        discardModalRefresh={discardModalRefresh}
      />
    </div>
  )
}
