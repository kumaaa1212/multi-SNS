import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './Thumbnail.module.scss'
import AlnumLayout from '../albumLayout/AlbumLayout'
import ThumbnailCard from '@/components/parts/Card/Post/thumbnail'
import Labels from '@/components/parts/Label'
import { addThumbnail } from '@/features/postSlice'
import { AppDispatch, RootState } from '@/store/store'
import { jLeagueTeams } from '@/utils/TeamData'
const Thumbnail = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch()
  const { thumbnailText } = useSelector((state: RootState) => state.post)
  return (
    <div className='thumbnail'>
      <AlnumLayout>
        <div className={style.thumbnail}>
          <ThumbnailCard className='600' />
          <div className={style.thumbnail_delail}>
            <Labels labelName='チームを選択' data={jLeagueTeams} />
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
