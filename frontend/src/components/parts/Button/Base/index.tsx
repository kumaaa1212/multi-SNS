import style from 'components/parts/Button/Base/Base.module.scss'

interface Color {
  blue?: boolean
  black?: boolean
}

interface Props extends Color {
  size?: 'xl' | 'sm' | 'md' | 'lg'
  type?: 'submit' | 'reset' | 'button'
  weight?: 'weight_400' | 'weight_500' | 'weight_600'
  value?: string
  className?: string
  disabled?: boolean
  onClick?(): void
  content: string
}

export default function ButtonBase(props: Props): JSX.Element {
  const { blue, black } = props
  const { size, type = 'button', weight = 'weight_500', value } = props
  const { className, disabled, onClick, content } = props

  const colorCheck = (name: string, isColor?: boolean): string => {
    return isColor ? ' ' + style[name] : ''
  }

  const sizeCheck = (name: string): string => {
    return size === name ? ' ' + style[name] : ''
  }

  const weightCheck = (name: string): string => {
    return weight === name ? ' ' + style[name] : ''
  }

  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className={
        style.button +
        colorCheck('blue', blue) +
        colorCheck('black', black) +
        sizeCheck('xs') +
        sizeCheck('sm') +
        sizeCheck('md') +
        sizeCheck('lg') +
        weightCheck('weight_400') +
        weightCheck('weight_500') +
        weightCheck('weight_600') +
        (className ? ' ' + className : '')
      }
    >
      {content}
    </button>
  )
}
