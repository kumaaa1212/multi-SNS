import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

export default function ChatSearch() {
  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px',m: '0px 15px', display: 'flex', alignItems: 'center', width: 400 }}
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
