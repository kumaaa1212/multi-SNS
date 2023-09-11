import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { addLabels } from 'features/postSlice'
import { AppDispatch, RootState } from 'store/store'
import { TeamDataType } from 'types/global'

interface Props {
  labelName: string
  data: TeamDataType[]
}

export default function Labels(props: Props): JSX.Element {
  const { labelName, data } = props

  const dispatch: AppDispatch = useDispatch()
  const { labels } = useSelector((state: RootState) => state.post)

  return (
    <div className='labels'>
      <Stack spacing={3} sx={{ width: 600 }}>
        <Autocomplete
          multiple
          id='tags-standard'
          options={data}
          getOptionLabel={(option: TeamDataType): string => option.name}
          value={labels}
          onChange={(event, newValue): void => {
            dispatch(addLabels(newValue))
          }}
          renderInput={(params): JSX.Element => (
            <TextField
              {...params}
              variant='standard'
              label={labelName}
              placeholder='ラベルを追加'
            />
          )}
        />
      </Stack>
    </div>
  )
}
