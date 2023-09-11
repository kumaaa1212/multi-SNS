import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType, FrendInfo } from 'types/global'
import style from './FollowBtn.module.scss'
interface Props {
  article: ArticlesType
  content: string
}

const FollowButton = (props: Props): JSX.Element => {
  const { article, content } = props
  const { authorId } = article

  const { follow, userId, iconPath, bio, team, twitterURL, teamURL, username } = useSelector(
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
    await apiClient.post('/auth/follow', {
      authorId,
      userId,
      name: username,
      iconpath: iconPath,
      bio,
      team,
      twitterURL,
      teamURL,
    })
  }

  const unFollowUser = async (authorId: string, userId: string): Promise<void> => {
    await apiClient.delete(`/auth/unfollow?authorId=${authorId}&userId=${userId}`)
  }

  useEffect(() => {
    const isFollowing = follow?.some((friend: FrendInfo) => friend.userId === article.authorId)
    setFollowBtn(isFollowing)
  }, [article.authorId, follow])

  const handleFrends = (): void => {
    setFollowBtn(!followBtn)
    if (!follow?.some((user: FrendInfo) => user.userId === authorId)) {
      followUser(authorId, userId, username, iconPath, bio, team, twitterURL, teamURL)
    } else {
      unFollowUser(authorId, userId)
    }
  }

  return (
    <button className={followBtn ? style.followed_btn : style.follow_btn} onClick={handleFrends}>
      {content}
    </button>
  )
}

export default FollowButton
