import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import { useFormattedTimestamp } from 'components/hooks/useTime'
import { ArticlesType } from 'types/internal/album'
import style from './index.module.scss'

interface Props {
  album: ArticlesType
}

export default function HomeAlbumCard(props: Props): JSX.Element {
  const { album } = props

  const router = useRouter()
  const formattedTimestamp = useFormattedTimestamp(album?.createdAt)

  const handlePath = (): void => {
    router.push(`/albumMore/${album?.id}`)
  }

  return (
    <div className={style.card} onClick={handlePath}>
      <Paper className={style.team_card}>
        <Image
          src={album?.labels[0].img}
          alt='チームのエンブレム'
          width={100}
          height={70}
          className={style.team_img}
          priority
        />
        <span>FC東京</span>
      </Paper>
      <div className='ml_10'>
        <h1>{album?.title}</h1>
        <div className={style.detail_area}>
          <Image
            src={album?.authorAvatar}
            alt='me'
            width={40}
            height={40}
            className={style.img}
            priority
          />
          <div className='ml_10 fw_700'>
            <p>{album?.authorName}</p>
            <p>{formattedTimestamp}</p>
            <p>{album?.likes?.length}Likes</p>
          </div>
        </div>
      </div>
    </div>
  )
}
