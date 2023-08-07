import MarkDown from '@/components/template/MarkDown'
import apiClient from '@/libs/apiClient'
import React from 'react'

const AlbumDetails = ({ articles }: any) => {
  return (
    <div>
      <h1>{articles.title}</h1>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: articles.content,
          }}
        ></div>
        {/* <MarkDown>{articles.content}</MarkDown> */}
      </div>
    </div>
  )
}

export default AlbumDetails

export const getServerSideProps = async (context: { params: { id: any } }) => {
  const res = await apiClient.get(`http://localhost:4000/api/post/album/${context.params.id}`)
  const articles = await res.data.post
  return {
    props: {
      articles,
    },
  }
}
