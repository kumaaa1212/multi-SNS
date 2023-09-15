import React from 'react'
import Image from 'next/image'
import { SnackbarOrigin } from '@mui/material/Snackbar'
import ButtonBase from 'components/parts/Button/Base'

interface State extends SnackbarOrigin {
  open: boolean
}

export default function SaveBar(props: any): JSX.Element {
  const { content } = props

  return (
    <div className='save_bar'>
      <Image src='/images/save_bar.png' alt='save_bar' width={50} height={50} className='img' />
      <h2>保存していない内容があります。</h2>
      <div className='btn_area'>
        <ButtonBase content='破棄する' size='md' black weight='weight_600' />
        <ButtonBase content='保存する' blue size='md' weight='weight_600' className='mr_10' />
      </div>
    </div>
  )
}
