import { useEffect, useState } from 'react'
import ArticleCard from '@/components/parts/Card/Articles'
import BasicPagination from '@/components/parts/Pagenation'
import LabelArea from '@/components/parts/Label/articles'
import { ArticlesType, TweetsType } from '@/types/global'
import style from './Article.module.scss'
import TweetCard from '@/components/parts/Card/Tweet'

interface Props {
  articlesLike: ArticlesType[] | TweetsType[]
  articlesNew: ArticlesType[] | TweetsType[]
}

const Article = (props: Props) => {
  const { articlesLike, articlesNew } = props

  const [click, setClicked] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [albumserch, setAlbumserch] = useState<string>('')
  const [albumDataLike, setAlbumDataLike] = useState<ArticlesType[] | TweetsType[]>(articlesLike)
  const [albumDataNew, setAlbumDataNew] = useState<ArticlesType[] | TweetsType[]>(articlesNew)

  const ablusData = (data: ArticlesType[] | TweetsType[]) => {
    const arry = data?.map((item: ArticlesType | TweetsType) => {
      if ('thumbnailImg' in item) {
        return <ArticleCard key={item.id} article={item} />
      } else {
        return <TweetCard key={item.id} tweet={item} />
      }
    })
    return arry
  }

  useEffect(() => {
    const splitPageNew = (data: ArticlesType[] | TweetsType[]) => {
      const start: number = (currentPage - 1) * 6
      const end: number = start + 6
      setAlbumDataNew(data?.slice(start, end))
    }

    const splitPageLike = (data: ArticlesType[] | TweetsType[]) => {
      const start: number = (currentPage - 1) * 6
      const end: number = start + 6
      setAlbumDataLike(data?.slice(start, end))
    }
    splitPageLike(albumDataLike)
    splitPageNew(albumDataNew)
  }, [currentPage])

  // const handleRemove = (albumserch: string) => {
  //   const filteredData = albumDataLike.filter((item: ArticlesType | TweetsType) => {
  //     if ('thumbnailImg' in item) {
  //       const articleItem = item as ArticlesType
  //       return (
  //         articleItem.title.toLowerCase().includes(albumserch.toLowerCase()) ||
  //         articleItem.authorName.toLowerCase().includes(albumserch.toLowerCase())
  //       )
  //     } else {
  //       const tweetsItem = item as TweetsType
  //       return tweetsItem.content.toLowerCase().includes(albumserch.toLowerCase())
  //     }
  //   })
  //   setAlbumData(filteredData)
  // }

  const handlePageChange = (value: string) => {
    setAlbumserch(value)
    // handleRemove(value)
  }

  return (
    <div className={style.article}>
      <div className={style.article_contents}>
        <div className={style.search_area}>
          <div className={style.search_btn_area}>
            <button
              className={click ? style.search_btn_clicked : style.search_btn_click}
              onClick={() => setClicked(!click)}
            >
              新着アルバム
            </button>
            <button
              className={click ? style.search_btn_click : style.search_btn_clicked}
              onClick={() => setClicked(!click)}
            >
              人気アルバム
            </button>
          </div>
          <input
            type='text'
            placeholder='アルバムを検索'
            className={style.search_input_area}
            value={albumserch}
            onChange={(e) => handlePageChange(e.target.value)}
          />
        </div>
        {click ? (
          <div className={style.article_timeline}>{ablusData(albumDataNew)}</div>
        ) : (
          <div className={style.article_timeline}>{ablusData(albumDataLike)}</div>
        )}
        <div className={style.pagenation}>
          <BasicPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagelenght={albumDataLike?.length}
          />
        </div>
      </div>
      <LabelArea />
    </div>
  )
}

export default Article
