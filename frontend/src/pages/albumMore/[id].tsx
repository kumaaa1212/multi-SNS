import React from 'react'
import AlbumMore from 'components/template/AlbumMore'
import apiClient from 'libs/apiClient'
import { marked } from 'marked'
import { ArticlesType } from 'types/internal'

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

interface Props {
  articles: ArticlesType
}

export default function AlbumDetails(props: Props): JSX.Element {
  const { articles } = props

  const markdownToHtml = marked(articles.content)
  return (
    <div>
      <AlbumMore markdownToHtml={markdownToHtml} />
    </div>
  )
}
