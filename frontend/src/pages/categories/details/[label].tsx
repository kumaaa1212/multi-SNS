import Team from '@/components/template/details'
import apiClient from '@/libs/apiClient'
import { ArticlesType, TeamType } from '@/types/global'
import { GetServerSideProps } from 'next'
import React from 'react'

interface Props {
  post: ArticlesType[]
}

const TeamPage = ({ data }: { data: Props }) => {
  console.log(data)
  return <Team data={data.post} />
}

export default TeamPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { label } = context.query
  const res = await apiClient.get(`/post/album/${label}`)
  const data = res.data
  return { props: { data } }
}
