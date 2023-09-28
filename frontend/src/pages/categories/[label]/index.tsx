import React from 'react'
import { GetServerSideProps } from 'next'
import Team from 'components/template/details'
import apiClient from 'libs/apiClient'
import { ArticlesType } from 'types/internal/album'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { label } = context.query
    const res = await apiClient.get(`/post/album/team/${label}`)
    const post = res.data
    return { props: post }
  } catch {
    return {
      props: {
        data: [],
      },
    }
  }
}
interface Props {
  post: ArticlesType[]
}

export default function TeamPage(props: Props): JSX.Element {
  const { post } = props

  return <Team post={post} />
}
