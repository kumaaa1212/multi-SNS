import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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

const FollowButton = (props: Props): JSX.Element => {
  const { posts, content } = props

  const { follow, userId, iconPath, bio, team, twitterURL, teamURL, username } = useSelector(
    (state: RootState) => state.user,
  )
  const [followBtn, setFollowBtn] = useState<boolean>()

  const followUser = async (
    _authorId: string,
    userId: string,
    username: string,
    iconPath: string,
    bio: string,
    team: string,
    twitterURL: string | undefined,
    teamURL: string | undefined,
  ): Promise<void> => {
    await apiClient.post('/auth/follow', {
      authorId: _authorId,
      userId,
      name: username,
      iconpath: iconPath,
      bio,
      team,
      twitterURL,
      teamURL,
    })
  }

  const unFollowUser = async (_authorId: string, userId: string): Promise<void> => {
    await apiClient.delete(`/auth/unfollow?authorId=${_authorId}&userId=${userId}`)
  }

  useEffect(() => {
    const isFollowing = follow?.some((friend: FrendInfo) => friend.userId === posts.authorId)
    setFollowBtn(isFollowing)
  }, [posts?.authorId, follow])

  const handleFrends = (): void => {
    setFollowBtn(!followBtn)
    if (!follow?.some((user: FrendInfo) => user.userId === posts.authorId)) {
      followUser(posts.authorId, userId, username, iconPath, bio, team, twitterURL, teamURL)
    } else {
      unFollowUser(posts.authorId, userId)
    }
  }

  return (
    <button className={followBtn ? style.followed_btn : style.follow_btn} onClick={handleFrends}>
      {content}
    </button>
  )
}

export default FollowButton
