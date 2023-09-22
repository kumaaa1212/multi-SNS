import React from 'react'
import styled from './Article.module.scss'
interface Props {
  children: React.ReactNode
}

export default function AlbumArea(props: Props): JSX.Element {
  const { children } = props

  return <div className={styled.main}>{children}</div>
}
