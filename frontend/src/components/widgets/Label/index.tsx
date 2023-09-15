import { useDispatch } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { addLabels } from 'features/postSlice'
import { AppDispatch } from 'store/store'
import { TeamDataType } from 'types/global'

interface Props {
  labelName: string
  data: TeamDataType[]
  margin?: string
  width?: number
}

export default function Labels(props: Props): JSX.Element {
  const { labelName, data, margin = 'mb_10', width = 600 } = props

  const dispatch: AppDispatch = useDispatch()

  return (
    <div className={margin}>
      <Stack spacing={3} sx={{ width: width }}>
        <Autocomplete
          multiple
          id='tags-standard'
          options={data}
          getOptionLabel={(option: TeamDataType): string => option.name}
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
