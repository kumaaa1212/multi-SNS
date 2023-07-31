import React from 'react'
import style from './Label.module.scss'
import { jLeagueTeams } from '@/TeamData'
import { Chip } from '@mui/material'
const LabelArea = () => {
  return (
    <div className={style.label_areas}>
      <div className={style.label_area}>
        <h3 className={style.label_title}>J1リーグ</h3>
        <div className={style.label_contents}>
          {jLeagueTeams.map((label: any) => (
            <Chip label={`#${label.name}`} className={style.label} />
          ))}
        </div>
      </div>
      <div className={style.label_area}>
        <h3 className={style.label_title}>試合会場</h3>
        <div className={style.label_contents}>
          {jLeagueTeams.map((label: any) => (
            <Chip label={`#${label.name}`} className={style.label} />
          ))}
        </div>
      </div>
      {/* <div className={style.label_area}>
      <h3 className={style.label_title}>結果</h3>
      <div className={style.label_contents}>
        {jLeagueTeams.map((label:any) =>(
           <Chip label={`#${label.name}`} className={style.label}/>
        ))}
      </div>
    </div> */}
    </div>
  )
}

export default LabelArea
