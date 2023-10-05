import { useState } from 'react'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import TweetLike from 'components/template/tweets/_container/tweetsDataLike'
import TweetNew from 'components/template/tweets/_container/tweetsDataNew'
import { TweetsType } from 'types/internal/tweet'
import Meta from 'components/layout/Head'
import ToastBase from 'components/parts/Toast'
import LabelArea from 'components/widgets/Label/Select'
import PostTemPlate from 'components/widgets/Post'
import style from './index.module.scss'

interface Props {
  tweetsLike: TweetsType[]
  tweetsNew: TweetsType[]
}

export default function Tweets(props: Props): JSX.Element {
  const { tweetsLike, tweetsNew } = props
  const [click, setClicked] = useState<boolean>(true)
  const [albumserch, setAlbumserch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const { toastContent, isError, isToast, toastFunc } = useToast()

  return (
    <Layout loadingAll={loading}>
      <Meta title='Tweet' />
      <div className='bg_gray'>
        <PostTemPlate
          setCurrentPage={setCurrentPage}
          post={tweetsNew}
          newButton='新着Tweet'
          popularButton='人気Tweet'
          inputName='Tweetsを検索'
          click={click}
          setClicked={setClicked}
          albumserch={albumserch}
          setAlbumserch={setAlbumserch}
        >
          <div className={style.large}>
            {click ? (
              <TweetNew
                albumserch={albumserch}
                tweetsNew={tweetsNew}
                currentPage={currentPage}
                setLoading={setLoading}
                toastFunc={toastFunc}
              />
            ) : (
              <TweetLike
                albumserch={albumserch}
                tweetsLike={tweetsLike}
                currentPage={currentPage}
                setLoading={setLoading}
                toastFunc={toastFunc}
              />
            )}
            <LabelArea />
          </div>
          <div className={style.small}>
            <LabelArea small />

            {click ? (
              <TweetNew
                albumserch={albumserch}
                tweetsNew={tweetsNew}
                currentPage={currentPage}
                setLoading={setLoading}
                toastFunc={toastFunc}
              />
            ) : (
              <TweetLike
                albumserch={albumserch}
                tweetsLike={tweetsLike}
                currentPage={currentPage}
                setLoading={setLoading}
                toastFunc={toastFunc}
              />
            )}
          </div>
        </PostTemPlate>
      </div>
      <ToastBase content={toastContent} isError={isError} active={isToast} />
    </Layout>
  )
}
