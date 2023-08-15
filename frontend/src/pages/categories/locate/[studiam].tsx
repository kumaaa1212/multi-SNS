import Team from '@/components/template/details'
import apiClient from '@/libs/apiClient'
import { GetServerSideProps } from 'next'
import React from 'react'

const TeamPage= ({data}:any) => {
  return (
   <Team data={data.post} />
  )
}

export default TeamPage

export const getServerSideProps:GetServerSideProps = async (context) => {
  try{
    const { label } = context.query;
    const res = await apiClient.get(`/post/album/${label}`);
    const data = res.data;
    return { props: { data } };
  }
  catch{
    return {
      props: {
        data: null,
      },
    }
  }
}
