import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './Home.module.scss'

interface Props {
  titile: string
  showAll: string
  href: string
  footerShowAll: string
  children: React.ReactNode
  color?: string
}

const HomeTemplate = (props: Props): JSX.Element => {
  const { titile, showAll, href, footerShowAll, children, color = 'white' } = props
  const router = useRouter()

  const colorcheck = (color: string): string => {
    return color ? ' ' + style[color] : ''
  }

  return (
    <div className={`pv_40 ${colorcheck(color)}`}>
      <div className={style.title_area}>
        <h2>{titile}</h2>
        <Link href={href} className={style.show_all}>
          {showAll}
        </Link>
      </div>
      <div className={style.main}>{children}</div>
      <button
        className={style.footer_show_all}
        onClick={(): void => {
          router.push(href)
        }}
      >
        {footerShowAll}
      </button>
    </div>
  )
}

export default HomeTemplate
