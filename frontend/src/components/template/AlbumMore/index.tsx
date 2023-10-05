import React, { useState } from 'react'
import 'github-markdown-css'
import Image from 'next/image'
import { Paper } from '@mui/material'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import { formatTimestamp } from 'utils/functions/Time'
import { ArticlesType } from 'types/internal/album'
import Meta from 'components/layout/Head'
import AlbumLikeBtn from 'components/parts/Button/Like/Album'
import ToastBase from 'components/parts/Toast'
import MarkDown from 'components/widgets/MarkDown'
import style from './AlbumMore.module.scss'
import Profile from './_container/Profile'
import TableContent from './_container/tableContents'

interface Props {
  album: ArticlesType
}

export default function AlbumMore(props: Props): JSX.Element {
  const { album } = props

  const [countLikes, setCountLikes] = useState<number>(album?.likes.length)
  const [loading, setLoading] = useState<boolean>(false)
  const { toastContent, isError, isToast, toastFunc } = useToast()

  return (
    <Layout padding='pv_20' bgColor='bg_blue' loadingAll={loading}>
      <Meta title='AlbumMore' />
      <div className={style.content}>
        <div className={style.header}>
          <Image src={album.labels[0].img} alt='チームのエンブレム' width={100} height={100} />
          <h1 className={style.title}>{album.title}</h1>
          <p>{formatTimestamp(album.createdAt)}公開</p>
        </div>
        <div className={style.main}>
          <div className={style.main_left}>
            <div className={style.left_content}>
              <div className={style.like_btn}>
                <AlbumLikeBtn album={album} setCountLikes={setCountLikes} toastFunc={toastFunc} />
              </div>
              <p>{countLikes}</p>
            </div>
          </div>
          <Paper elevation={3} className={style.main_center}>
            <MarkDown content={album.content} detail />
          </Paper>
          <div className={style.main_right}>
            <Profile album={album} setLoading={setLoading} toastFunc={toastFunc} />
            <TableContent />
          </div>
        </div>
      </div>
      <ToastBase isError={isError} active={isToast} content={toastContent} />
    </Layout>
  )
}
