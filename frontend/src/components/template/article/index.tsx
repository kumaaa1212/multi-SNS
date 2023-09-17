import { useState } from 'react'
import Layout from 'components/layout'
import { ArticlesType } from 'types/global'
import Meta from 'components/layout/Head'
import LabelArea from 'components/widgets/Label/articles'
import PostTemPlate from 'components/widgets/Post'
import style from './Article.module.scss'
import AlbumLike from './_container/albumDataLike'
import AlbumNew from './_container/albumDataNew'

interface Props {
  articlesLike: ArticlesType[]
  articlesNew: ArticlesType[]
}

export default function Albums(props: Props): JSX.Element {
  const { articlesLike, articlesNew } = props

  const [click, setClicked] = useState<boolean>(true)
  const [albumserch, setAlbumserch] = useState<string>('')

  return (
    <Layout>
      <Meta title='アルバム' />
      <div className={style.article}>
        <PostTemPlate
          newButton='新着アルバム'
          popularButton='人気アルバム'
          inputName='アルバムを検索'
          click={click}
          setClicked={setClicked}
          albumserch={albumserch}
          setAlbumserch={setAlbumserch}
        >
          {click ? (
            <AlbumNew albumserch={albumserch} articlesNew={articlesNew} />
          ) : (
            <AlbumLike albumserch={albumserch} articlesLike={articlesLike} />
          )}
        </PostTemPlate>
        <LabelArea />
      </div>
    </Layout>
  )
}
