import SwitchBtn from '@/components/parts/Button/SwitchBtn'
import React from 'react'
import style from './Album.module.scss'
import { Paper, Tooltip } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HorizontalNonLinearStepper from '@/components/parts/Stepper'
import AlnumLayout from './albumLayout/AlbumLayout'
const Album = () => {
  return (
    <div className='album'>
      <AlnumLayout>
        <div className={style.album_main}>
          <input type='text' placeholder='title' />
          <div className={style.content}>
            <Paper elevation={3}>
              <textarea name='' />
            </Paper>
            <div className={style.content_btn}>
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
      </AlnumLayout>
    </div>
  )
}

export default Album
