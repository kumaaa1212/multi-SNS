import { CircularProgress } from '@mui/material'
import style from 'components/layout/Loading/Loading.module.scss'

export default function Loading(): JSX.Element {
  return (
    <div className={style.spinner}>
      <CircularProgress size={100} />
    </div>
  )
}
