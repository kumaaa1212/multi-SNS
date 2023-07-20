import SwitchBtn from '@/components/parts/Button/SwitchBtn'
import React from 'react'
import styles from './Post.module.scss'
import { Paper, Tooltip } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HorizontalNonLinearStepper from '@/components/parts/Stepper'
const Album = () => {
  const [keepPost, setKeepPost] = React.useState(false)
  const router = useRouter()
  return (
    <div className='album'>
      <div className={styles.album_header}>
        <Link href={'/mypage'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-arrow-left'
            width='50'
            height='50'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='#000000'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12l14 0' />
            <path d='M5 12l6 6' />
            <path d='M5 12l6 -6' />
          </svg>
        </Link>
        <HorizontalNonLinearStepper />
        <div className={styles.header_right}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-chart-candle'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='#000000'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
            // onClick={}
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M4 6m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
            <path d='M6 4l0 2' />
            <path d='M6 11l0 9' />
            <path d='M10 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
            <path d='M12 4l0 10' />
            <path d='M12 19l0 1' />
            <path d='M16 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z' />
            <path d='M18 4l0 1' />
            <path d='M18 11l0 9' />
          </svg>
          <SwitchBtn keepPost={keepPost} setKeepPost={setKeepPost} />
          {keepPost ? (
            <button
              className={styles.keep_btn}
              onClick={() => router.push('/post/album/Thumbnail')}
            >
              次へ進む
            </button>
          ) : (
            <button className={styles.keep_btn}>下書き保存</button>
          )}
        </div>
      </div>
      <div className={styles.album_main}>
        <input type='text' placeholder='title' />
        <div className={styles.content}>
          <Paper elevation={3}>
            <textarea name='' />
          </Paper>
          <div className={styles.content_btn}>
            <Tooltip title='書き方'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-question-mark'
                width='50'
                height='50'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='#ffffff'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4' />
                <path d='M12 19l0 .01' />
              </svg>
            </Tooltip>
            <Tooltip title='写真を追加'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-plus'
                width='50'
                height='50'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='#ffffff'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M12 5l0 14' />
                <path d='M5 12l14 0' />
              </svg>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Album
