import * as React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import style from './SwitchBtn.module.scss'

interface Props {
  keepPost: boolean
  setKeepPost: React.Dispatch<React.SetStateAction<boolean>>
  relese: boolean
}
export default function SwitchBtn(props: Props): JSX.Element {
  const { keepPost, setKeepPost, relese } = props

  const [checked, setChecked] = React.useState(false)

  const handleChange = (): void => {
    setChecked(!checked)
    setKeepPost(!keepPost)
  }

  return (
    <div className='switch_btn_area'>
      <div className={`switch_btn ${!checked && style.keepoff}`}>
        {relese ? (
          <FormControlLabel control={<Switch checked={true} />} label='次へ進む' />
        ) : (
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label='次へ進む'
          />
        )}
      </div>
    </div>
  )
}
