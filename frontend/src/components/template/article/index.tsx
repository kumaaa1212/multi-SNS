import React, { useMemo, useState } from 'react'
import style from './Article.module.scss'
import ArticleCard from '@/components/parts/Card/Articles'
import BasicPagination from '@/components/parts/Pagenation'
import LabelArea from '@/components/parts/Label/articles'
const Article = ({ articles }: any) => {
  const [click, setClicked] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [albumserch, setAlbumserch] = useState<string>('')
  const [albumserchData, setAlbumserchData] = useState<any>([])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * 6
    const end = start + 6
    return articles.posts.slice(start, end)
  }, [articles.posts, currentPage])


  const handleRemove = (albumserch: string) => {
    // フィルターを使って条件に一致しない要素だけを残す
    const filteredData = paginatedData.filter((album: any) => {
      return (
        album.content.toLowerCase().includes(albumserch.toLowerCase()) ||
        album.thumbnailText.toLowerCase().includes(albumserch.toLowerCase()) ||
        album.title.toLowerCase().includes(albumserch.toLowerCase())
      )
    })
    setAlbumserchData(filteredData)
  }

  const handlePageChange = (value: any) => {
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
            {albumserch.length > 0
              ? albumserchData.map((article: any) => <ArticleCard article={article} />)
              : paginatedData.map((article: any) => <ArticleCard article={article} />)}
          </div>
        ) : (
          <div className={style.article_timeline}></div>
        )}
        <div className={style.pagenation}>
          <BasicPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagelenght={articles.posts.length}
          />
        </div>
      </div>
      <LabelArea />
    </div>
  )
}

export default Article
