import RecipeReviewCard from '@/components/parts/Card'
import Label from '@/components/parts/Label'
import React from 'react'
import style from './Thumbnail.module.scss'
import AlnumLayout from '../albumLayout/AlbumLayout'
import Labels from '@/components/parts/Label'
const Thumbnail = () => {
  const [thumbnailText, SetthumbnailText] = React.useState('')
  return (
    <div className='thumbnail'>
      <AlnumLayout>
        <div className={style.thumbnail}>
          <RecipeReviewCard className='600' thumbnailText={thumbnailText} />
          <div className={style.thumbnail_delail}>
            <Labels />
            <textarea
              placeholder='サムネイルの説明文を入力'
              rows={5}
              cols={10}
              value={thumbnailText}
              onChange={(e) => SetthumbnailText(e.target.value)}
            />
          </div>
        </div>
      </AlnumLayout>
    </div>
  )
}

export default Thumbnail
