import { TextField } from '@mui/material'
import style from './Serch.module.scss'

interface Props {
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SerchInput = (props: Props): JSX.Element => {
  const { value, placeholder, onChange } = props

  return (
    <div className={style.input_area}>
      <TextField fullWidth label={placeholder} id='fullWidth' value={value} onChange={onChange} />
    </div>
  )
}

export default SerchInput
