import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import Loading from 'components/layout/Loading'
import ButtonBase from 'components/parts/Button/Base'

interface Props {
  discardModalClose: React.Dispatch<React.SetStateAction<boolean>>
  setIsSaveBar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SaveBar(props: Props): JSX.Element {
  const { discardModalClose, setIsSaveBar } = props

  const { titleText, contentText } = useSelector((state: RootState) => state.post)
  const { userId } = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleKeep = async (): Promise<void> => {
    setLoading(true)
    await apiClient
      .post('/post/keep-post/save', {
        title: titleText,
        content: contentText,
        authorId: userId,
      })
      .then(() => {
        setLoading(false)
        setIsSaveBar(false)
      })
  }

  return (
    <div className='save_bar'>
      <Image src='/logo.png' alt='save_bar' width={280} height={60} className='img' />
      <h2>保存していない内容があります。</h2>
      <div className='btn_area'>
        <ButtonBase
          content='破棄する'
          size='md'
          black
          weight='weight_600'
          onClick={(): void => discardModalClose(true)}
        />
        <ButtonBase
          content='保存する'
          blue
          size='md'
          weight='weight_600'
          className='mr_10'
          onClick={handleKeep}
        />
      </div>
      {loading && <Loading />}
    </div>
  )
}
