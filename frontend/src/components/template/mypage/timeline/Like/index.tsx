import React, { useEffect } from 'react'
import style from '../TimeLine.module.scss'
import ArticleCard from '@/components/parts/Card/Articles'
import { ArticlesType } from '@/types/global'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import TweetCard from '@/components/parts/Card/Tweet'
const MypageLikes = () => {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumData, setAlbumData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    const myAlbum = async () => {
      try {
        const albumdata = await apiClient.get(`/post/album/like/${userId}`)
        const tweetdata = await apiClient.get(`/post/tweet/like/${userId}`)
        console.log()
        setAlbumData([...albumdata.data.likedPosts,...tweetdata.data.likedTweets])
      } catch {
        alert('情報の取得に失敗しました')
      }
    }
    myAlbum()
  }, [userId])

  const ablusData = (data:any) => {
    const arry = data?.map((item: any) => {
      if ('thumbnailImg' in item) {
        return <ArticleCard key={item.id} article={item} />
      } else {
        return <TweetCard key={item.id} tweet={item}  />
      }
    })
    return arry
  }

  return (
    <div className={style.album}>
      {ablusData(albumData)}
    </div>
  )
}

export default MypageLikes
