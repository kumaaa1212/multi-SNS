import React from 'react'
import style from './TimeLineHeader.module.scss'
import CustomizedInputBase from '@/components/parts/Search/PostSearch'
const TimeLineHeader = () => {
  return (
    <div className={style.header}>
      <div className={style.header_content}>
        <button  className={style.header_btn}>
          Post
        </button>
        <button  className={style.header_btn}>
          Like
        </button>
        <button  className={style.header_btn}>
          BoomMark
        </button>
      </div>
      <CustomizedInputBase />
    </div>
  )
}

export default TimeLineHeader
