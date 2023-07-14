import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModalWind from '../Modal';

export default function CustomizedInputBase() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
     {open && ( <ModalWind open={open} />)}
    <Paper
      component="form"
      sx={{  m:'10px 0px',p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
        />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => setOpen(!open)}>
        <CalendarMonthIcon/>
      </IconButton>
    </Paper>
        </div>
  );
}