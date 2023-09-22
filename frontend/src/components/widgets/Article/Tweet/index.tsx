import React from 'react'
import styled from './Tweet.module.scss'
interface Props {
  children: React.ReactNode
}

export default function TweetArea(props: Props): JSX.Element {
  const { children } = props

  return <div className={styled.main}>{children}</div>
}
