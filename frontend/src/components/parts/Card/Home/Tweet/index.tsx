import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import { formatTimestamp } from 'utils/functions/Time'
import { TweetsType } from 'types/global'
import style from './index.module.scss'

interface Props {
  tweet: TweetsType
  setShowTweets: React.Dispatch<React.SetStateAction<TweetsType>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function HomeTweetCard(props: Props): JSX.Element {
  const { tweet, setShowTweets, setOpen } = props

  const router = useRouter()

  const handleShow = (): void => {
    setShowTweets(tweet)
    setOpen(true)
  }

  return (
    <div className={style.card} onClick={handleShow}>
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
        <p className={style.content}>{tweet?.content}</p>
        <div className={style.detail_area}>
          <Image src={tweet.authorAvatar} alt='me' width={40} height={40} className={style.img} />
          <div className='ml_10 fw_700'>
            <p>{tweet?.authorName}</p>
            <div className='display_flex'>
              <p>{formatTimestamp(tweet?.createdAt)}</p>
              <p className='ml_10'>{tweet?.likes?.length}Likes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}