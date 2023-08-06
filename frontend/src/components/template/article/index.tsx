import React, { useMemo, useState } from 'react'
import style from './Article.module.scss'
import ArticleCard from '@/components/parts/Card/Articles'
import BasicPagination from '@/components/parts/Pagenation'
import LabelArea from '@/components/parts/Label/articles'
const Article = ({ articles }: any) => {
  const [click, setClicked] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * 6
    const end = start + 6
    return articles.posts.slice(start, end)
  }, [articles.posts, currentPage])

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
          <input type='text' className={style.search_input_area} />
        </div>
        {click ? (
          <div className={style.article_timeline}>
            {paginatedData.map((article: any) => (
              <ArticleCard article={article} />
            ))}
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
