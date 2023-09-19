import React from 'react'
import { GetServerSideProps } from 'next'
import Team from 'components/template/details'
import apiClient from 'libs/apiClient'
import { ArticlesType } from 'types/global'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { label } = context.query
    const res = await apiClient.get(`/post/album/team/${label}`)
    const data = res.data
    return { props: { data } }
  } catch {
    return {
      props: {
        data: null,
      },
    }
  }
}
interface Props {
  post: ArticlesType[]
}

export default function TeamPage({ data }: { data: Props }): JSX.Element {
  return <Team data={data.post} />
}
