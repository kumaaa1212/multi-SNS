import { useDispatch } from 'react-redux'
import { Divider } from '@mui/material'
import { stateReset } from 'features/postSlice'
import { AppDispatch } from 'store/store'
import ModalBase from 'components/parts/Modal'
import style from './Discard.module.scss'
import CloseIcon from '/public/svg/modal_close.svg'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setIsSaveBar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalDiscard(props: Props): JSX.Element {
  const { open, setOpen, setIsSaveBar } = props
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (): Promise<void> => {
    dispatch(stateReset())
    setOpen(!open)
    setIsSaveBar(false)
  }

  const handleContinue = (): void => {
    setOpen(!open)
    setIsSaveBar(false)
  }

  return (
    <ModalBase open={open} onClose={setOpen}>
      <div className={style.contents}>
        <div className={style.handle_close}>
          <CloseIcon className={style.close_btn} onClick={(): void => setOpen(!open)} />
        </div>
        <div className={style.main}>
          <h2 className='mb_10'>保存されていないすべての変更を破棄</h2>
          <Divider />
          <p className='mv_20'>変更を破棄すると、最後に保存した後に編集した内容が削除されます。</p>
          <Divider />
        </div>
        <div className={style.use_btn}>
          <button className={style.delete_btn} onClick={handleDelete}>
            破棄
          </button>
          <button className={style.btn} onClick={handleContinue}>
            編集
          </button>
        </div>
      </div>
    </ModalBase>
  )
}
