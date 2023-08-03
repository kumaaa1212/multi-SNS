import React, { useState } from 'react'
import MessageSidebar from './sidebar'
import style from './bulletinboard.module.scss'
import Timeline from './timeline'
const Bulletinboard = () => {
  const [sideMessagrBar, setSideMessagrBar] = useState<boolean>(false)
  return (
    <div className={style.bulletinboard}>
      <Timeline sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar} />
      {sideMessagrBar ? <MessageSidebar /> : null}
    </div>
  )
}

export default Bulletinboard
