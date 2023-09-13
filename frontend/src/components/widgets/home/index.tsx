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
}

const HomeTemplate = (props: Props): JSX.Element => {
  const { titile, showAll, href, footerShowAll, children } = props
  const router = useRouter()
  return (
    <div className='mv_40'>
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
