import Article from '@/components/template/article'
import apiClient from '@/libs/apiClient'
import React from 'react'

const ArticlePage = ({ articles }: any) => {
  return <Article articles={articles} />
}

export default ArticlePage

export const getServerSideProps = async () => {
  const res = await apiClient.get('/post/all/album')
  const articles = res.data

  return {
    props: {
      articles,
    },
  }
}
