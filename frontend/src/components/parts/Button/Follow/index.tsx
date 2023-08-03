import React from 'react'
import style from './FollowBtn.module.scss'
import apiClient from '@/libs/apiClient'
import { AuthInfo } from '@/context/auth'
const FollowBtn = (props:any) => {
  const auth = AuthInfo()
  const { children,postId } = props
  console.log(typeof postId)
  const handleFrends = async () => {
    await apiClient.post(`/auth/follow/${postId}`,{
      authorId:auth.userId
    })
  }
  return <button className={style.follow_btn} onClick={handleFrends}>{children}</button>
}

export default FollowBtn
