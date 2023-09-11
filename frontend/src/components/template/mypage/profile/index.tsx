import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesLikeType } from 'types/global'
import ActiveLink from 'components/parts/Button/ActiveLink'
import Button from 'components/parts/Button/Base'
import PostBtn from 'components/parts/Button/Post/addbtn'
import Noavater from '/public/noavater.jpg'
import style from './Prolife.module.scss'
import EditModal from 'components/widgets/Modal/Edit'
import TweetModal from 'components/widgets/Modal/Tweet'
import TwitterIcon from '/public/svg/mypage_twitter.svg'
import TeamIcon from '/public/svg/mypage_team.svg'

const Profile = (): JSX.Element => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openTweet, setOpenTweet] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<ArticlesLikeType[]>()
  const { username, icon, bio, follow, follower, userId, twitterURL, teamURL } = useSelector(
    (state: RootState) => state.user,
  )

  useEffect(() => {
    const llikeDeta = async (): Promise<void> => {
      try {
        const likeArry = await apiClient.get(`/post/album/likes/${userId}`)
        setLikeCount(likeArry.data.likes)
      } catch {
        alert('情報の更新に失敗しました。')
      }
    }
    llikeDeta()
  }, [userId])

  return (
    <div>
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
            <h1>{username}</h1>
            <Button
              content='編集'
              onClick={(): void => setOpenEdit(true)}
              className='mr_30'
              size='md'
              weight='weight_600'
              blue
            />
          </div>
          <div className={style.profile_bio}>{bio}</div>
          <div className={style.profile_info}>
            <button>
              <span>{likeCount ? likeCount.length : 0}Likes</span>
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
      {openEdit && <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} />}
      {openTweet && <TweetModal open={openTweet} setOpen={setOpenTweet} />}
      <PostBtn setOpen={setOpenTweet} />
    </div>
  )
}

export default Profile
