import React from 'react'
import styled from './Album.module.scss'
interface Props {
  children: React.ReactNode
}

export default function AlbumArea(props: Props): JSX.Element {
  const { children } = props

  return <div className={styled.main}>{children}</div>
}
