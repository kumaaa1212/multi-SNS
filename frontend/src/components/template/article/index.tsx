import { useEffect, useMemo, useState } from 'react'
import ArticleCard from '@/components/parts/Card/Articles'
import BasicPagination from '@/components/parts/Pagenation'
import LabelArea from '@/components/parts/Label/articles'
import { ArticleProps, ArticlesType } from '@/types/global'
import style from './Article.module.scss'

interface Props {
  articles: ArticleProps
}

const Article = (props: Props) => {
  const { articles } = props

  const [click, setClicked] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [albumserch, setAlbumserch] = useState<string>('')
  const [albumData, setAlbumData] = useState<ArticlesType[]>(articles?.posts)

  useEffect(() => {
    splitPage(albumData)
  }, [])

  const splitPage = (data: ArticlesType[]) => {
    const start: number = (currentPage - 1) * 6
    const end: number = start + 6
    setAlbumData(data?.slice(start, end))
  }

  const handleRemove = (albumserch: string) => {
    const filteredData = albumData.filter((album: ArticlesType): boolean => {
      return (
        album.content.toLowerCase().includes(albumserch.toLowerCase()) ||
        album.thumbnailText.toLowerCase().includes(albumserch.toLowerCase()) ||
        album.title.toLowerCase().includes(albumserch.toLowerCase())
      )
    })
    setAlbumData(filteredData)
  }

  const handlePageChange = (value: string) => {
    setAlbumserch(value)
    handleRemove(value)
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
          <div className={style.article_timeline}>
            {albumData?.map((article: ArticlesType) => (
              <ArticleCard article={article} setAlbumData={setAlbumData} />
            ))}
          </div>
        ) : (
          <div className={style.article_timeline}></div>
        )}
        <div className={style.pagenation}>
          <BasicPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagelenght={articles?.posts.length}
          />
        </div>
      </div>
      <LabelArea />
    </div>
  )
}

export default Article
