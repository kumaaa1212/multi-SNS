import { Alert } from '@mui/material'

interface Props {
  content: string
  isError?: boolean
  active: boolean
}

export default function ToastBase(props: Props): JSX.Element | null {
  const { content, isError, active } = props

  return active ? (
    <Alert variant='filled' severity={isError ? 'error' : 'success'}>
      {content}
    </Alert>
  ) : null
}
