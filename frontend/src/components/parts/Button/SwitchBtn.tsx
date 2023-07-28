import * as React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

interface Props {
  keepPost: boolean
  setKeepPost: React.Dispatch<React.SetStateAction<boolean>>
  relese: boolean
}
export default function SwitchBtn(props: Props) {
  const { keepPost, setKeepPost, relese } = props

  const [checked, setChecked] = React.useState(false)

  const handleChange = () => {
    setChecked(!checked)
    setKeepPost(!keepPost)
  }

  return (
    <FormGroup>
      <div className={`switch_btn ${!checked && 'keepoff'}`}>
        {relese ? (
          <FormControlLabel
            control={<Switch checked={true} onChange={handleChange} />}
            label='次へ進む'
          />
        ) : (
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label='次へ進む'
          />
        )}
      </div>
    </FormGroup>
  )
}
