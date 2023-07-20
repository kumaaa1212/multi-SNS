import * as React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

interface Props {
  keepPost: boolean
  setKeepPost: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SwitchBtn(props: Props) {
  const { keepPost, setKeepPost } = props
  const [checked, setChecked] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked)
    setKeepPost(!keepPost)
  }
  return (
    <FormGroup>
      <div className={`${!checked && 'keepoff'}`}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label='次へ進む'
        />
      </div>
    </FormGroup>
  )
}
