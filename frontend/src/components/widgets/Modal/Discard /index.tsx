import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import ModalBase from 'components/parts/Modal'
import style from './Discard.module.scss'
import ControlledAccordions from '../../Accordion'

interface Props {
  open: boolean
  setOpen: any
  discardModalRefresh?: () => void
}

const ModalDiscard = (props: Props) => {
  const { open, setOpen, discardModalRefresh } = props
  const { username, userId, iconPath } = useSelector((state: RootState) => state.user)

  const [keepPost, setKeepPost] = useState<any[]>([])
  return (
    <ModalBase open={open} setOpen={setOpen}>
      <div className={style.keep_modal}>
        <div className={style.modal_header}>
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
          <h1>保存済みAlbum一覧</h1>
        </div>
        <ControlledAccordions keepPost={keepPost} />
      </div>
    </ModalBase>
  )
}

export default ModalDiscard