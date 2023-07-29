import Label from '@/components/parts/Label'
import React from 'react'
import style from './Thumbnail.module.scss'
import AlnumLayout from '../albumLayout/AlbumLayout'
import Labels from '@/components/parts/Label'
import ThumbnailCard from '@/components/parts/Card/thumbnail'
import { PostInfo } from '@/context/album'
const Thumbnail = () => {
  const { titleText, contentText, setTitleText, setContentText } = PostInfo();
  const [thumbnailText, SetthumbnailText] = React.useState('')
  const [selectedLabel, setSelectedLabel] = React.useState<any>([])
  console.log(selectedLabel)
  return (
    <div className='thumbnail'>
      <AlnumLayout>
        <div className={style.thumbnail}>
          <ThumbnailCard className='600' thumbnailText={thumbnailText} selectedLabel={selectedLabel} />
          <div className={style.thumbnail_delail}>
            <Labels selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}  />
            <textarea
              placeholder={titleText}
              rows={5}
              cols={10}
              value={thumbnailText}
              className={style.thumbnail_textarea}
              onChange={(e) => SetthumbnailText(e.target.value)}
            />
          </div>
        </div>
      </AlnumLayout>
    </div>
  )
}

export default Thumbnail
