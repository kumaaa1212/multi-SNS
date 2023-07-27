import React from 'react'
import style from '../bulletinboard.module.scss'
import BulletinboardCard from '@/components/parts/Chat/Bulletinboard'
import Image from 'next/image'
import ProfileImg from '../../../../../public/profile_img.jpg'
import TimeLineReact from '@/components/parts/Button/Timeline'
const Timeline = () => {
  return (
    <div className={style.timeline}>
      <BulletinboardCard>
        <div className={style.timeline}>
        <Image src={ProfileImg} alt={''} width={40} height={40} className={style.profile_img} />
        <div className={style.user_info}>
          <div className={style.user_detail_info}>
          <span>KUMA</span>
          <span>20:00</span>
          </div>
          <span className={style.mention_user}>@Rio</span>
        </div>
        </div>
      </BulletinboardCard>
      <TimeLineReact/>
    </div>
  )
}

export default Timeline