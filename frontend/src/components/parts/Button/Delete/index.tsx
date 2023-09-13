import React, { useState } from 'react'
import DeleteIcon from '/public/svg/card_delete.svg'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import style from './Delete.module.scss'

interface Posioton {
  album?: boolean
  board?: boolean
}

interface Props extends Posioton {
  content: string
  onClick?: () => void
}

const DeleteButton = (props: Props): JSX.Element => {
  const { album, board, onClick } = props
  const { content } = props

  const [moreOver, setMoreOver] = useState<boolean>(false)

  const positonCheck = (name: string, isPositon?: boolean): string => {
    return isPositon ? ' ' + style[name] : ''
  }

  return (
    <div>
      <MoreHorizRoundedIcon
        onClick={(): void => setMoreOver((prev) => !prev)}
        className={style.more_icon}
      />
      {moreOver && (
        <div
          onClick={onClick}
          className={
            style.moreover_area + positonCheck('article', album) + positonCheck('board', board)
          }
        >
          <p className={style.content}>{content}</p>
          <DeleteIcon />
        </div>
      )}
    </div>
  )
}

export default DeleteButton
