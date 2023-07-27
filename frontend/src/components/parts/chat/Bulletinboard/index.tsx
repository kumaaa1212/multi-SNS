import React from 'react'
import style from './bulletinboard.module.scss'
const BulletinboardCard = ({children}:any) => {
  return (
    <div className={style.bulletin_board_Card}>
    <div className={style.card_conenys}>
      {children}
    </div>
    <div>
    </div>
    </div>
  )
}

export default BulletinboardCard