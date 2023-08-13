import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { addLabels } from '@/features/postSlice'
import { jLeagueTeams } from '@/TeamData'
import { useState } from 'react'

interface Props {
  labelName: string
  data:any
}

export default function Labels(props:Props) {
  const { labelName, data } = props
  const dispatch: AppDispatch = useDispatch()
  const { labels } = useSelector((state: RootState) => state.post)
  const [value, setValue] = useState(labels)
  console.log(labels)
  return (
    <div className='labels'>
      <Stack spacing={3} sx={{ width: 600 }}>
        <Autocomplete
          multiple
          id='tags-standard'
          options={data}
          getOptionLabel={(option) => option.name}
          value={value}
          onChange={(event, newValue) => {
            dispatch(addLabels(newValue))
            setValue(newValue)
          }}
          renderInput={(params) => (
            <TextField {...params} variant='standard' label={labelName} placeholder='ラベルを追加' />
          )}
        />
      </Stack>
    </div>
  )
}
