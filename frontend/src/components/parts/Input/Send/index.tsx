import { Dispatch, SetStateAction } from 'react'
import SendIcon from '/public/svg/board_send.svg'
import style from './Input.module.scss'

interface Props {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  handleSend: () => void
  placeholder?: string
}

const SendInput = (props: Props): JSX.Element => {
  const { input, setInput, handleSend, placeholder } = props

  return (
    <div className={style.input_area}>
      <input
        type='text'
        className={style.timeline_search}
        value={input}
        onChange={(e): void => {
          setInput(e.target.value)
        }}
        placeholder={placeholder}
      />
      <SendIcon onClick={handleSend} className={style.imput_area_icon} />
    </div>
  )
}

export default SendInput
