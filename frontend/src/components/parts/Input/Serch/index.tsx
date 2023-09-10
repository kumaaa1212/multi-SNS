import { TextField } from '@mui/material'

interface Props {
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SerchInput = (props: Props): JSX.Element => {
  const { value, placeholder, onChange } = props

  return (
    <TextField fullWidth label={placeholder} id='fullWidth' value={value} onChange={onChange} />
  )
}

export default SerchInput
