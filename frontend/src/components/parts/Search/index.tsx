import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

interface Props {
  serchInput: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ChatSearch(props: Props): JSX.Element {
  const { serchInput, onChange } = props

  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', m: '0px 15px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Ssearch person'
        value={serchInput}
        inputProps={{ 'aria-label': 'search person' }}
        onChange={onChange}
      />
    </Paper>
  )
}
