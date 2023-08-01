import Article from '@/components/template/article'
import React from 'react'

const ArticlePage = ({articles}:any) => {
  return (
   <Article articles={articles} />
  )
}

export default ArticlePage

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:4000/api/post/all/album')
  const articles = await res.json()
  return {
    props: {
      articles,
    },
  }
}

