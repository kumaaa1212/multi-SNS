import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import Loading from 'components/layout/Loading'
import ActiveLink from 'components/parts/Button/ActiveLink'
import Button from 'components/parts/Button/Base'
import PostBtn from 'components/parts/Button/Post/addbtn'
import Noavater from '/public/noavater.jpg'
import style from './Prolife.module.scss'
import EditModal from 'components/widgets/Modal/Edit'
import TweetModal from 'components/widgets/Modal/Tweet/Tweets'
import TwitterIcon from '/public/svg/mypage_twitter.svg'
import TeamIcon from '/public/svg/mypage_team.svg'

export default function Profile(): JSX.Element {
  const { username, icon, bio, follow, follower, userId, twitterURL, teamURL, userLikeCount } =
    useSelector((state: RootState) => state.user)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openTweet, setOpenTweet] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const likeData = async (): Promise<void> => {
      setLoading(true)
      await apiClient.get(`/post/album/likes/${userId}`).then((res) => {
        if (res.status !== HttpStatusCode.Ok) return
        setLikeCount(res.data.likes.length)
        setLoading(false)
      })
    }
    likeData()
  }, [userId])

  return (
    <div className='pt_30'>
      <div className={style.profile_area}>
        <Image
          src={icon ? icon : Noavater}
          alt='プロフィール画像'
          width={200}
          height={200}
          className={style.profile_img}
          priority={true}
        />
        <div className={style.profile_details}>
          <div className={style.profile_header}>
            <h1 className={style.username}>{username}</h1>
            <Button
              content='編集'
              onClick={(): void => setOpenEdit(true)}
              size='md'
              weight='weight_600'
              blue
            />
          </div>
          <div className={style.profile_bio}>{bio}</div>
          <div className={style.profile_info}>
            <button>
              <span>{likeCount ? likeCount : userLikeCount}Likes</span>
            </button>
            <button>
              <span>{follow?.length}Follow</span>
            </button>
            <button>
              <span>{follower?.length}Follower</span>
            </button>
          </div>
          <div className={style.other_icon}>
            <ActiveLink href={twitterURL} black>
              <TwitterIcon />
            </ActiveLink>
            <ActiveLink href={teamURL} className='ml_10'>
              <TeamIcon />
            </ActiveLink>
          </div>
        </div>
      </div>
      {openEdit && (
        <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} setLoading={setLoading} />
      )}
      {openTweet && <TweetModal open={openTweet} setOpen={setOpenTweet} setLoading={setLoading} />}
      {loading && <Loading />}
      <PostBtn setOpen={setOpenTweet} />
    </div>
  )
}
