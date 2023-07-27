import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { checkedEmoji, confirmationEmoji, praiseEmoji } from './emoji'
import style from './TimeLine_btn.module.scss'
interface Emoji {
  activeSkinTone: string
  emoji: string
  names: string[]
  originalUnified: string
  unified: string
}
const TimeLineReact = () => {
  const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })
  const [chosenEmoji, setChosenEmoji] = useState<Emoji>({
    activeSkinTone: 'neutral',
    emoji: '🙂',
    names: ['slightly smiling face', 'slightly_smiling_face'],
    originalUnified: '1f642',
    unified: '1f642',
  })
  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject)
  }
  return (
    <div>
      <span className={style.emoji_btn} onClick={(): void => console.log('AA') }>{checkedEmoji.emoji}</span>
      <span className={style.emoji_btn} onClick={(): void => console.log('AA') }>{confirmationEmoji.emoji}</span>
      <span className={style.emoji_btn} onClick={(): void => console.log('AA') }>{praiseEmoji.emoji}</span>
      <Picker onEmojiClick={onEmojiClick} width={200} height={300} />
    </div>
  )
}

export default TimeLineReact
