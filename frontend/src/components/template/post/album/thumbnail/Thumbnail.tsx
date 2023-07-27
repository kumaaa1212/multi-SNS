import RecipeReviewCard from '@/components/parts/Card'
import Label from '@/components/parts/Label'
import React from 'react'
import style from './Thumbnail.module.scss'
import AlnumLayout from '../albumLayout/AlbumLayout'
const Thumbnail = () => {
  return (
    <div className='thumbnail'>
      <AlnumLayout>
      <div className={style.thumbnail}>
        <RecipeReviewCard className='600' />
        <div className={style.thumbnail_delail}>
          <Label />
          <textarea placeholder='サムネイルの説明文を入力' />
        </div>
      </div>
      </AlnumLayout>
    </div>
  )
}

export default Thumbnail
