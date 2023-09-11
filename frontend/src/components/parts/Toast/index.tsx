import { Alert } from '@mui/material'
import style from './Toast.module.scss'
interface Props {
  content: string
  isError?: boolean
  active: boolean
}

export default function ToastBase(props: Props): JSX.Element | null {
  const { content, isError, active } = props

  return active ? (
    <div className={style.toast}>
      <Alert variant='filled' severity={isError ? 'error' : 'success'}>
        {content}
      </Alert>
    </div>
  ) : null
}
