import React, { useState } from 'react'
import style from '../bulletinboard.module.scss'
import BulletinboardCard from '@/components/parts/Card/Bulletinboard'
import SendInput from '@/components/parts/Input'
import apiClient from '@/libs/apiClient'

const Timeline = (props: any) => {
  const { sideMessagrBar, setSideMessagrBar } = props
  const [input, setInput] = useState<string>('')

  const handleSend = async () => {
    await apiClient.post('/api/v1/timeline', { content: input })
  }

  return (
    <div className={style.timeline}>
      <div className={style.timeline_main}>
        <BulletinboardCard sideMessagrBar={sideMessagrBar} setSideMessagrBar={setSideMessagrBar}>
          <p>ssss</p>
        </BulletinboardCard>
      </div>
      <div className={style.input_area}>
        <SendInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  )
}

export default Timeline
