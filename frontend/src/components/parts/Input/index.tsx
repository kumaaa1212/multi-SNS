import { Dispatch, SetStateAction } from 'react'
import style from './Input.module.scss'

interface Props {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  handleSend: () => void
}

const SendInput = (props: Props) => {
  const { input, setInput, handleSend } = props

  return (
    <div className={style.input_area}>
      <input
        type='text'
        className={style.timeline_search}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={style.imput_area_icon}
        width='40'
        height='40'
        viewBox='0 0 24 24'
        stroke-width='1.5'
        stroke='#ffffff'
        fill='none'
        stroke-linecap='round'
        stroke-linejoin='round'
        onClick={handleSend}
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M10 14l11 -11' />
        <path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5' />
      </svg>
    </div>
  )
}

export default SendInput