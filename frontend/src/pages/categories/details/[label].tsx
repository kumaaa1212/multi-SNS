import React from 'react'
import { GetServerSideProps } from 'next'
import Team from '@/components/template/details'
import apiClient from '@/libs/apiClient'
import { ArticlesType } from '@/types/global'

interface Props {
  post: ArticlesType[]
}

const TeamPage = ({ data }: { data: Props }): JSX.Element => {
  return <Team data={data.post} />
}

export default TeamPage

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
