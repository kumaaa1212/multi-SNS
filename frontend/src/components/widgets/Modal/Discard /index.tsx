import { useState } from 'react'
import ModalBase from 'components/parts/Modal'
import style from './Discard.module.scss'
import ControlledAccordions from '../../../parts/Accordion'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  discardModalRefresh?: () => void
}

export default function ModalDiscard(props: Props): JSX.Element {
  const { open, setOpen, discardModalRefresh } = props

  const [keepPost, setKeepPost] = useState<[]>([])
  return (
    <ModalBase open={open} onClose={setOpen}>
      <div className={style.keep_modal}>
        <div className={style.modal_header}>
          <button onClick={(): void => setOpen(!open)} className={style.close_btn}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-x'
              width='40'
              height='40'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#000000'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
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
