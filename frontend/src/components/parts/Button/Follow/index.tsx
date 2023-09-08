import React, { use, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { followUser } from 'utils/functions/follow/follow'
import { unFollowUser } from 'utils/functions/follow/unfollow'
import style from './FollowBtn.module.scss'
const FollowBtn = (props: any) => {
  const { children, article } = props
  const { authorId, authorName, authorAvatar } = article
  const { follow } = useSelector((state: RootState) => state.user)
  const [followBtn, setFollowBtn] = useState<boolean>()

  useEffect(() => {
    if (follow.some((item: any) => item.authorId === article.authorId)) {
      setFollowBtn(true)
    } else {
      setFollowBtn(false)
    }
  }, [follow])

  const handleFrends = () => {
    setFollowBtn(!followBtn)
    if (!follow.some((user: any) => user.authorId === authorId)) {
      followUser(follow, authorId, authorName, authorAvatar)
    } else {
      unFollowUser(follow, authorId)
    }
  }

  return (
    <button className={followBtn ? style.followed_btn : style.follow_btn} onClick={handleFrends}>
      {children}
    </button>
  )
}

export default FollowBtn
