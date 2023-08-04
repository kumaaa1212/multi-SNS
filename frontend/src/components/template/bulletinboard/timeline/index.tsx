import React from 'react'
import style from '../bulletinboard.module.scss'
import BulletinboardCard from '@/components/parts/Card/Bulletinboard'
import Image from 'next/image'
import ProfileImg from '../../../../../public/profile_img.jpg'
import CustomizedInputBase from '@/components/parts/Search'
const Timeline = (props: any) => {
  const { sideMessagrBar, setSideMessagrBar } = props

  const handleSedm = () => {}

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
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
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
      <div className={style.imput_area}>
        <input type='text' className={style.timeline_search} />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={style.imput_area_icon}
          width='40'
          height='40'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='#ffffff'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
          onClick={handleSedm}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M10 14l11 -11' />
          <path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5' />
        </svg>
      </div>
    </div>
  )
}

export default Timeline
