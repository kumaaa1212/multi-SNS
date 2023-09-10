import { useState } from 'react'
import { ArticlesType } from 'types/global'
import Button from 'components/parts/Button/Base'
import SerchInput from 'components/parts/Input/Serch'
import LabelArea from 'components/parts/Label/articles'
import BasicPagination from 'components/parts/Pagenation'
import style from './Article.module.scss'
import AlbumLike from './_container/albumDataLike'
import AlbumNew from './_container/albumDataNew'
interface Props {
  articlesLike: ArticlesType[]
  articlesNew: ArticlesType[]
}

const Article = (props: Props): JSX.Element => {
  const { articlesLike, articlesNew } = props

  const [click, setClicked] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [albumserch, setAlbumserch] = useState<string>('')

  return (
    <div className={style.article}>
      <div className={style.article_contents}>
        <div className={style.search_area}>
          <div className={style.search_btn_area}>
            <Button
              content='新着アルバム'
              onClick={(): void => setClicked(!click)}
              className='mh_16'
              size='md'
              weight='weight_600'
              black={click ? true : false}
            />
            <Button
              content='人気アルバム'
              onClick={(): void => setClicked(!click)}
              className='mh_16'
              size='md'
              weight='weight_600'
              black={click ? false : true}
            />
          </div>
          <SerchInput
            value={albumserch}
            placeholder='アルバムを検索'
            onChange={(e): void => setAlbumserch(e.target.value)}
          />
        </div>
        {click ? (
          <AlbumLike albumserch={albumserch} articlesLike={articlesLike} />
        ) : (
          <AlbumNew albumserch={albumserch} articlesNew={articlesNew} />
        )}
        <div className={style.pagenation}>
          {/* <BasicPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagelenght={articlesLike?.length}
          /> */}
        </div>
      </div>
      <LabelArea />
    </div>
  )
}

export default Article
