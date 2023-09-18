import React from 'react'
import 'github-markdown-css'
import Layout from 'components/layout'
import Meta from 'components/layout/Head'
import style from './AlbumMore.module.scss'

interface Props {
  markdownToHtml: string
}

const AlbumMore = (props: Props): JSX.Element => {
  const { markdownToHtml } = props
  const absoluteMarkdown = markdownToHtml.replace(/<img src="blob:[^"]*" alt="">/g, (match) => {
    return match.replace('blob:', window.location.origin)
  })

  return (
    <Layout>
      <Meta title='AlbumMore' />
      <div className={style.content}>
        <div
          id='mdrender'
          className='markdown-body'
          dangerouslySetInnerHTML={{ __html: absoluteMarkdown }}
        ></div>
      </div>
    </Layout>
  )
}

export default AlbumMore
