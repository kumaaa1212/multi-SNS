import { useState } from 'react'
import Layout from 'components/layout'
import { ArticlesType } from 'types/internal/album'
import Meta from 'components/layout/Head'
import LabelArea from 'components/widgets/Label/Select'
import PostTemPlate from 'components/widgets/Post'
import AlbumLike from './_container/albumDataLike'
import AlbumNew from './_container/albumDataNew'
import style from './index.module.scss'

interface Props {
  articlesLike: ArticlesType[]
  articlesNew: ArticlesType[]
}

export default function Albums(props: Props): JSX.Element {
  const { articlesLike, articlesNew } = props

  const [click, setClicked] = useState<boolean>(false)
  const [albumserch, setAlbumserch] = useState<string>('')

  return (
    <Layout>
      <Meta title='アルバム' />
      <PostTemPlate
        newButton='新着アルバム'
        popularButton='人気アルバム'
        inputName='アルバムを検索'
        click={click}
        setClicked={setClicked}
        albumserch={albumserch}
        setAlbumserch={setAlbumserch}
      >
        <div className={style.large}>
          {click ? (
            <AlbumNew albumserch={albumserch} articlesNew={articlesNew} />
          ) : (
            <AlbumLike albumserch={albumserch} articlesLike={articlesLike} />
          )}
          <LabelArea />
        </div>
        <div className={style.small}>
          <LabelArea small />

          {click ? (
            <AlbumNew albumserch={albumserch} articlesNew={articlesNew} />
          ) : (
            <AlbumLike albumserch={albumserch} articlesLike={articlesLike} />
          )}
        </div>
      </PostTemPlate>
    </Layout>
  )
}
