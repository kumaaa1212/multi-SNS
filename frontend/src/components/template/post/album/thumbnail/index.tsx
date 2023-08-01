import Label from '@/components/parts/Label/thumbnail'
import React from 'react'
import style from './Thumbnail.module.scss'
import AlnumLayout from '../albumLayout/AlbumLayout'
import Labels from '@/components/parts/Label/thumbnail'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { addThumbnail } from '@/features/postSlice'
import ThumbnailCard from '@/components/parts/Card/thumbnail'
const Thumbnail = () => {
  const dispatch: AppDispatch = useDispatch();
  const {thumbnailText} = useSelector((state: RootState) => state.post)
  return (
    <div className='thumbnail'>
      <AlnumLayout>
        <div className={style.thumbnail}>
          <ThumbnailCard className='600' />
          <div className={style.thumbnail_delail}>
            <Labels />
            <textarea
              placeholder='説明を入力してください'
              rows={5}
              cols={10}
              value={thumbnailText}
              className={style.thumbnail_textarea}
              onChange={(e) => dispatch(addThumbnail(e.target.value))}
            />
          </div>
        </div>
      </AlnumLayout>
    </div>
  )
}

export default Thumbnail
