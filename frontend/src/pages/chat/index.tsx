import Chat from '@/components/template/chat'
import apiClient from '@/libs/apiClient'
import { GetServerSideProps } from 'next'
import React from 'react'

const ChatPage = ({rooms}:any) => {
  return <Chat rooms={rooms} />
}

export default ChatPage

export const getServerSideProps:GetServerSideProps = async () => {
  try {
    const res = await apiClient.get('/chat/room/allroom');
    const rooms = res.data;
    return {
      props: {
        rooms,
      },
    };
  } catch (error) {
    console.error('Error while fetching data:', error);
    return {
      props: {
        rooms: [],
      },
    };
  }
};