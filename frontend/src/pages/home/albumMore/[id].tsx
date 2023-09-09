import React from 'react'
import AlbumMore from 'components/template/home/AlbumMore'
import apiClient from 'libs/apiClient'
import { marked } from 'marked'

const AlbumDetails = ({ articles }: any): JSX.Element => {
  const markdownToHtml = marked(articles.content)
  return (
    <div>
      <AlbumMore markdownToHtml={markdownToHtml} />
    </div>
  )
}

export default AlbumDetails

export const getServerSideProps = async (context: { params: { id: any } }) => {
  try {
    const res = await apiClient.get(`/post/album/${context.params.id}`)
    const articles = await res.data.post
    return {
      props: {
        articles,
      },
    }
  } catch {
    return {
      props: {
        articles: null,
      },
    }
  }
}
