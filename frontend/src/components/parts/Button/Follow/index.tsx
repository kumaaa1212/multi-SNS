import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { FrendInfo } from 'types/internal'
import { ArticlesType } from 'types/internal/album'
import { TweetsType } from 'types/internal/tweet'
import style from './FollowBtn.module.scss'
interface Props {
  posts: ArticlesType | TweetsType
  content: string
}

export default function FollowButton(props: Props): JSX.Element {
  const { posts, content } = props

  const { follow, userId, iconPath, icon, bio, team, twitterURL, teamURL, username } = useSelector(
    (state: RootState) => state.user,
  )
  console.log(iconPath)
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
    try {
      const response = await apiClient.post('/auth/follow', {
        authorId,
        userId,
        name: username,
        icon: iconPath ? iconPath : icon,
        bio,
        team,
        twitterURL,
        teamURL,
      })

      if (response.status !== HttpStatusCode.Ok) {
        throw new Error('Failed to follow user')
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle error
    }
  }

  const unFollowUser = async (_authorId: string, userId: string): Promise<void> => {
    await apiClient.delete(`/auth/unfollow?authorId=${_authorId}&userId=${userId}`).then((res) => {
      if (res.status !== HttpStatusCode.Ok) throw Error
    })
  }

  useEffect(() => {
    const isFollowing = follow?.some((friend: FrendInfo) => friend.userId === posts.authorId)
    setFollowBtn(isFollowing)
  }, [posts?.authorId, follow])

  const handleFrends = (): void => {
    if (!follow?.some((user: FrendInfo) => user.userId === posts.authorId)) {
      followUser(posts.authorId, userId, username, iconPath, bio, team, twitterURL, teamURL)
    } else {
      unFollowUser(posts.authorId, userId)
    }
    setFollowBtn(!followBtn)
  }

  return (
    <button className={followBtn ? style.followed_btn : style.follow_btn} onClick={handleFrends}>
      {content}
    </button>
  )
}
