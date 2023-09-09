import style from './ActiveLink.module.scss'
interface Color {
  black?: boolean
}

interface Props extends Color {
  children: React.ReactNode
  href: string | undefined
  className?: string
}

export default function ActiveLink(props: Props): JSX.Element {
  const { children, href = '', className } = props
  const { black } = props

  const colorCheck = (name: string, isColor?: boolean): string => {
    return isColor ? ' ' + style[name] : ''
  }

  return (
    <a
      href={href}
      className={style.button + colorCheck('black', black) + (className ? ' ' + className : '')}
    >
      {children}
    </a>
  )
}
