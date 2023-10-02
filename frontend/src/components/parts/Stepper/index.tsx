import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import style from './Stepper.module.scss'

interface Props {
  activeStep: number
}

const steps = ['記事を作成', 'サムネイルを作成', '公開']

export default function HorizontalLinearStepper(props: Props): JSX.Element {
  const { activeStep } = props

  return (
    <Box sx={{ width: '60%' }}>
      <div className='stepper'>
        <Stepper activeStep={activeStep} className={style.main}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: {
              optional?: React.ReactNode
            } = {}
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </div>
    </Box>
  )
}
