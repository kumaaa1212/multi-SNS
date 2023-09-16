import React from 'react'
import Image from 'next/image'
import ButtonBase from 'components/parts/Button/Base'

interface Props {
  discardModalClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SaveBar(props: Props): JSX.Element {
  const { discardModalClose } = props

  return (
    <div className='save_bar'>
      <Image src='/images/save_bar.png' alt='save_bar' width={50} height={50} className='img' />
      <h2>保存していない内容があります。</h2>
      <div className='btn_area'>
        <ButtonBase
          content='破棄する'
          size='md'
          black
          weight='weight_600'
          onClick={(): void => discardModalClose(true)}
        />
        <ButtonBase content='保存する' blue size='md' weight='weight_600' className='mr_10' />
      </div>
    </div>
  )
}
