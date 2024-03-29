import { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { TeamDataType } from 'types/internal'

interface Props {
  labelName: string
  data: TeamDataType[]
  margin?: string
  width?: number
  setSelectedLabels: React.Dispatch<React.SetStateAction<TeamDataType[]>>
}

export default function Labels(props: Props): JSX.Element {
  const { labelName, data, margin = 'mb_10', width = 600, setSelectedLabels } = props

  const [labelState, setLabelState] = useState<TeamDataType[]>()

  return (
    <div className={margin}>
      <Stack spacing={3} sx={{ width: width }}>
        <Autocomplete
          multiple
          id='tags-standard'
          options={data}
          value={labelState}
          getOptionLabel={(option: TeamDataType): string => option.name}
          onChange={(event, newValue): void => {
            setSelectedLabels(newValue)
            setLabelState(newValue)
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
