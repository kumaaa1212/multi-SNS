import React from 'react'
import 'github-markdown-css'
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
    <div className={style.content}>
      <div
        id='mdrender'
        className='markdown-body'
        dangerouslySetInnerHTML={{ __html: absoluteMarkdown }}
      ></div>
    </div>
  )
}

export default AlbumMore
