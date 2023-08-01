import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { addLabels } from '@/features/postSlice';
import { jLeagueTeams } from '@/TeamData';

export default function Labels() {
  const dispatch: AppDispatch = useDispatch();
  const {labels} = useSelector((state: RootState) => state.post)
  console.log(labels)
  return (
    <div className='labels'>
      <Stack spacing={3} sx={{ width: 600 }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={jLeagueTeams}
          getOptionLabel={(option) => option.name}
          value={labels}
          onChange={(newValue) => {
            console.log(newValue)
            dispatch(addLabels(newValue))
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="ラベル"
              placeholder="ラベルを追加"
            />
          )}
        />
      </Stack>
    </div>
  );
}
