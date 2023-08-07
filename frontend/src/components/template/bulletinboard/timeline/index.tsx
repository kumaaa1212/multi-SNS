import React from 'react'
import style from '../bulletinboard.module.scss'
import BulletinboardCard from '@/components/parts/Card/Bulletinboard'
import Image from 'next/image'
import ProfileImg from '../../../../../public/profile_img.jpg'
import CustomizedInputBase from '@/components/parts/Search'
import SendInput from '@/components/parts/Input'
const Timeline = (props: any) => {
  const { sideMessagrBar, setSideMessagrBar } = props
  const [input, setInput] = React.useState('')

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
      <div className={style.input_area}>
      <SendInput input={input} setInput={setInput} />
      </div>
    </div>
  )
}

export default Timeline
