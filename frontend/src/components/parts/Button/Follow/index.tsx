import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HttpStatusCode } from 'axios'
import { updataFrends } from 'features/userSlice'
import apiClient from 'libs/apiClient'
import { AppDispatch, RootState } from 'store/store'
import { ArticlesType } from 'types/internal/album'
import { TweetsType } from 'types/internal/tweet'
import style from './FollowBtn.module.scss'
interface Props {
  posts: ArticlesType | TweetsType
  content: string
}

export default function FollowButton(props: Props): JSX.Element {
  const { posts, content } = props

  const dispatch: AppDispatch = useDispatch()
  const { follow, userId, iconPath, icon, bio, team, twitterURL, teamURL, username } = useSelector(
    (state: RootState) => state.user,
  )
  const [followBtn, setFollowBtn] = useState<boolean>()

  const followUser = async (
    authorId: string,
    userId: string,
    username: string,
    iconPath: string,
    bio: string,
    team: string,
    twitterURL: string | undefined,
    teamURL: string | undefined,
  ): Promise<void> => {
    await apiClient
      .post('/auth/follow', {
        authorId,
        userId,
        name: username,
        icon: iconPath ? iconPath : icon,
        bio,
        team,
        twitterURL,
        teamURL,
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) {
          throw new Error('Failed to follow user')
        }
        // dispatch(updataFrends(res.data.updateUser))
      })
  }

  const unFollowUser = async (_authorId: string, userId: string): Promise<void> => {
    await apiClient
      .delete('/auth/unfollow', {
        params: {
          authorId: _authorId,
          userId,
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) throw Error
        // dispatch(updataFrends(res.data.updateUser))
      })
  }

  useEffect(() => {
    const ckeckFollow = async (): Promise<void> => {
      await apiClient
        .get(`/auth/follow/check`, {
          params: {
            authorId: posts.authorId,
            userId: userId,
          },
        })
        .then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setFollowBtn(res.data.isFollowing)
        })
    }
    ckeckFollow()
  }, [posts.authorId, follow, userId])

  const handleFrends = (): void => {
    if (followBtn) {
      unFollowUser(posts.authorId, userId)
    } else {
      followUser(posts.authorId, userId, username, iconPath, bio, team, twitterURL, teamURL)
    }
    setFollowBtn(!followBtn)
  }

  return (
    <button className={followBtn ? style.followed_btn : style.follow_btn} onClick={handleFrends}>
      {content}
    </button>
  )
}
