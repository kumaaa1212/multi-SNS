import React, { useState } from 'react'
import style from './Article.module.scss'
import ArticleCard from '@/components/parts/Card/Articles/some'
import { Chip } from '@mui/material'
import { jLeagueTeams } from '@/TeamData'
import BasicPagination from '@/components/parts/Pagenation'
import LabelArea from '@/components/parts/Label/articles'
const Article = () => {
  const [click, setClicked] = useState<boolean>(true)
  return (
    <div className={style.article}>
      <div className={style.article_contents}>
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
        {click ? (
          <div className={style.article_timeline}>
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        ) : (
          <div className={style.article_timeline}>
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        )}
        <div className={style.pagenation}>
          <BasicPagination />
        </div>
      </div>
      <LabelArea />
    </div>
  )
}

export default Article
