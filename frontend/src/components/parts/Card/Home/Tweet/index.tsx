import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import { TweetsType } from 'types/global'
import style from './index.module.scss'

interface Props {
  tweet: TweetsType
}

export default function HomeTweetCard(props: Props): JSX.Element {
  const { tweet } = props

  const router = useRouter()

  return (
    <div className={style.card}>
      <Paper
        className={style.team_card}
        onClick={(): void => {
          router.push(`/categories/tokyo`)
        }}
      >
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
        <h1 className={style.content}>{tweet?.content}</h1>
        <div className={style.detail_area}>
          <Image src={tweet.authorAvatar} alt='me' width={40} height={40} className={style.img} />
          <div className='ml_10'>
            <p>{tweet?.authorName}</p>
            <div className='display_flex'>
              <p>{tweet?.createdAt}</p>
              <p>{tweet?.likes?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
