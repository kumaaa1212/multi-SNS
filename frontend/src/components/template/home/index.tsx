import React from 'react'
import style from './Home.module.scss'
import CategoriesPart from './categories'
import ArticlesPart from './articles'
const Home = () => {
  return (
    <div className={style.home}>
      <div className={style.swiper}>
        酢ワイパー
      </div>
      <CategoriesPart />
      <ArticlesPart />
    </div>
  )
}

export default Home