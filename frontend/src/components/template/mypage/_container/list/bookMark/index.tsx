import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/internal'
import ArticleCard from 'components/parts/Card/Album'
import style from '../index.module.scss'

export default function MypageBooKMark(): JSX.Element {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumsData, setAlbumsData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    const BookMarkFerch = async (): Promise<void> => {
      await apiClient.get(`/post/album/bookmarked/${userId}`).then((res) => {
        if (res.status !== 200) throw Error
        setAlbumsData(res.data.bookmarkedPosts)
      })
    }
    BookMarkFerch()
  }, [userId])

  return (
    <div className={style.album}>
      {albumsData?.map((album, index) => <ArticleCard key={index} album={album} />)}
    </div>
  )
}
