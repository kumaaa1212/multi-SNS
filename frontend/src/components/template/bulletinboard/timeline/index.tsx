import React from 'react'
import style from '../bulletinboard.module.scss'
import BulletinboardCard from '@/components/parts/Chat/Bulletinboard'
import Image from 'next/image'
import ProfileImg from '../../../../../public/profile_img.jpg'
import CustomizedInputBase from '@/components/parts/Search'
const Timeline = (props: any) => {
  const { sideMessagrBar, setSideMessagrBar } = props
  return (
    <div className={style.timeline}>
      <div className={style.timeline_main}>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
      </div>
      <input type="text"className={style.timeline_search} />
    </div>
  )
}

export default Timeline
