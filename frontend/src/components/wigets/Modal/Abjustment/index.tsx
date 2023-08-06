import { useState } from 'react'
import { TextField } from '@mui/material'
import { supabase } from '@/utils/supabaseClient'
import style from './AbjustModal.module.scss'
import Image from 'next/image'
import bg_img from 'public/bg_img.jpg'
import profile_img from 'public/profile_img.jpg'
import ModalBase from '@/components/parts/Modal'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AbjustModal(props: Props) {
  const { open, setOpen } = props
  const { userId } = useSelector((state: RootState) => state.user)


  return (
    <ModalBase open={open} setOpen={setOpen}>
      <div className={style.abjust_modal}>
        <button onClick={() => setOpen(!open)} className={style.close_btn}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-x'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#000000'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M18 6l-12 12' />
            <path d='M6 6l12 12' />
          </svg>
        </button>
        <h1 className={style.abjust_title}>TOKOTKO=J~攻略~</h1>
        <div className={style.abjust_content}>
          <section>
            <h2>何を投稿する？</h2>
            <ul>
              <li>旅の記録をつける</li>
              <li>仲間を見つける</li>
            </ul>
          </section>
          <section>
            <h2>何を伝える？</h2>
            <ul>
              <li>自分の魅力を見せる</li>
              <li>旅行の計画を立てる</li>
            </ul>
          </section>
          <section>
            <h2>見本</h2>
          </section>
        </div>
      </div>
    </ModalBase>
  )
}
