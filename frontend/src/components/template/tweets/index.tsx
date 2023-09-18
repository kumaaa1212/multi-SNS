import { useState } from 'react'
import Layout from 'components/layout'
import { TweetsType } from 'types/global'
import Meta from 'components/layout/Head'
import LabelArea from 'components/widgets/Label/articles'
import PostTemPlate from 'components/widgets/Post'
import style from './Tweets.module.scss'
import TweetLike from './_container/tweetsDataLike'
import TweetNew from './_container/tweetsDataNew'

interface Props {
  tweetsLike: TweetsType[]
  tweetsNew: TweetsType[]
}

export default function Tweets(props: Props): JSX.Element {
  const { tweetsLike, tweetsNew } = props
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
          <div>
            {click ? (
              <TweetNew albumserch={albumserch} tweetsNew={tweetsNew} />
            ) : (
              <TweetLike albumserch={albumserch} tweetsLike={tweetsLike} />
            )}
          </div>
          <LabelArea />
        </PostTemPlate>
      </div>
    </Layout>
  )
}
