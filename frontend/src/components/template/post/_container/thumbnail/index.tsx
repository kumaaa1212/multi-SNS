import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from 'components/layout'
import { addLabels, addThumbnail } from 'features/postSlice'
import { AppDispatch, RootState } from 'store/store'
import { jLeagueTeams } from 'utils/TeamData'
import { TeamDataType } from 'types/internal'
import Meta from 'components/layout/Head'
import ThumbnailCard from 'components/parts/Card/Post/thumbnail'
import Labels from 'components/widgets/Label/Input'
import style from './Thumbnail.module.scss'
import AlnumLayout from '../albumLayout'

export default function Thumbnail(): JSX.Element {
  const dispatch: AppDispatch = useDispatch()
  const { thumbnailText } = useSelector((state: RootState) => state.post)
  const [selectedLabels, setSelectedLabels] = useState<TeamDataType[]>([])

  const handleThumbnail = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(addThumbnail(e.target.value))
    dispatch(addLabels(selectedLabels))
  }

  return (
    <Layout bgColor='bg_gray'>
      <Meta title='サムネイル' />
      <div className='thumbnail'>
        <AlnumLayout>
          <div className={style.thumbnail}>
            <ThumbnailCard className='600' />
            <div className={style.thumbnail_delail}>
              <Labels
                labelName='自分の応援しているチーム→関連するチームの順で選択'
                data={jLeagueTeams}
                margin='mb_24'
                width={370}
                setSelectedLabels={setSelectedLabels}
              />
              <textarea
                placeholder='サムネイルタイトルを入力してください(５文字以上)'
                rows={5}
                cols={10}
                value={thumbnailText}
                className={style.thumbnail_textarea}
                onChange={(e): void => handleThumbnail(e)}
              />
            </div>
          </div>
        </AlnumLayout>
      </div>
    </Layout>
  )
}
