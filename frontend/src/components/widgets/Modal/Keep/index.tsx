import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { KeepAlbum } from 'types/internal/album'
import Loading from 'components/layout/Loading'
import ModalBase from 'components/parts/Modal'
import style from './KeepModal.module.scss'
import KeepIcon from '/public/svg/post_keep.svg'
import ControlledAccordions from '../../../parts/Accordion'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function KeepModal(props: Props): JSX.Element {
  const { open, setOpen } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [keepPost, setKeepPost] = useState<KeepAlbum[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const datafetch = async (): Promise<void> => {
      setLoading(true)
      await apiClient.get(`/post/keep-post/${userId}`).then((res) => {
        if (res.status !== 200) throw Error
        setKeepPost(res.data.keepPosts)
        setLoading(false)
      })
    }
    datafetch()
  }, [setLoading, userId])

  return (
    <ModalBase open={open} onClose={setOpen}>
      <div className={style.keep_modal}>
        <div className={style.modal_header}>
          <button onClick={(): void => setOpen(!open)} className={style.close_btn}>
            <KeepIcon />
          </button>
          <h1>保存済みAlbum一覧</h1>
        </div>
        <ControlledAccordions
          keepPost={keepPost}
          setKeepPost={setKeepPost}
          setLoading={setLoading}
        />
      </div>
      {loading && <Loading />}
    </ModalBase>
  )
}
