import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import { formatTimestamp } from 'utils/functions/Time'
import { ArticlesType } from 'types/internal/album'
import style from './index.module.scss'

interface Props {
  album: ArticlesType
}

export default function HomeAlbumCard(props: Props): JSX.Element {
  const { album } = props

  const router = useRouter()

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
        <span>{album?.labels[0].name}</span>
      </Paper>
      <div className='ml_10'>
        <h3>{album?.title}</h3>
        <div className={style.detail_area}>
          <Image
            src={album?.authorAvatar}
            alt='me'
            width={40}
            height={40}
            className={style.img}
            priority
          />
          <div className={style.info}>
            <p>{album?.authorName}</p>
            <p>{formatTimestamp(album?.createdAt)}</p>
            <p>{album?.likes?.length}Likes</p>
          </div>
        </div>
      </div>
    </div>
  )
}
