import { useState } from 'react'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import Meta from 'components/layout/Head'
import LabelArea from 'components/widgets/Label/articles'
import PostTemPlate from 'components/widgets/Post'
import style from './Tweets.module.scss'

export default function Tweets(): JSX.Element {
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [click, setClicked] = useState<boolean>(true)
  const [albumserch, setAlbumserch] = useState<string>('')

  return (
    <Layout>
      <Meta title='Tweet' />
      <div className={style.article}>
        <PostTemPlate
          newButton='新着Tweet'
          popularButton='人気Tweet'
          inputName='Tweetsを検索'
          click={click}
          setClicked={setClicked}
          albumserch={albumserch}
          setAlbumserch={setAlbumserch}
        >
          <div></div>
        </PostTemPlate>
        <LabelArea />
      </div>
    </Layout>
  )
}
