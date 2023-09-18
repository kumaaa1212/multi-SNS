import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

export default function ChatSearch(): JSX.Element {
  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', m: '0px 15px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Google Maps'
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
