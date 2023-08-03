import { jLeagueTeams } from '@/TeamData'
import Team from '@/components/template/details'
import apiClient from '@/libs/apiClient'
import { GetServerSideProps } from 'next'
import React from 'react'

const TeamPage= ({data}:any) => {
  console.log(data)
  return (
   <Team data={data.post} />
  )
}

export default TeamPage


export const getServerSideProps:GetServerSideProps = async (context) => {
  const { label } = context.query;
  const res = await apiClient(`/post/album/${label}`);
  const data = res.data;
  return { props: { data } };
}
