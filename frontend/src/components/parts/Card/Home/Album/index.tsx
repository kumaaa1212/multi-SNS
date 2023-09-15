import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import { formatTimestamp } from 'utils/functions/Time'
import { ArticlesType } from 'types/global'
import style from './index.module.scss'

interface Props {
  album: ArticlesType
}

export default function HomeAlbumCard(props: Props): JSX.Element {
  const { album } = props

  const router = useRouter()

  return (
    <div className={style.card}>
      <Paper className={style.team_card}>
        <Image
          src='/images/profile.jpg'
          alt='チームのエンブレム'
          width={100}
          height={70}
          className={style.team_img}
        />
        <span>FC東京</span>
      </Paper>
      <div className='ml_10'>
        <h1>{album?.title}</h1>
        <div className={style.detail_area}>
          <Image src='/images/profile.jpg' alt='me' width={40} height={40} className={style.img} />
          <div className='ml_10 fw_700'>
            <p>{album?.authorName}</p>
            <div className='display_flex'>
              <p>{formatTimestamp(album?.createdAt)}</p>
              <p>{album?.likes?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
