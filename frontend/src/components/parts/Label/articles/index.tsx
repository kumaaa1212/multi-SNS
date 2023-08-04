import React from 'react'
import style from './Label.module.scss'
import { jLeagueTeams } from '@/TeamData'
import { Chip } from '@mui/material'
import { useRouter } from 'next/router'
const LabelArea = () => {
  const router = useRouter()
  return (
    <div className={style.label_areas}>
      <div className={style.label_area}>
        <h3 className={style.label_title}>J1リーグ</h3>
        <div className={style.label_contents}>
          {jLeagueTeams.map((label: any) => (
            <span onClick={() => router.push(`/categories/details/${label.label}`)}>
              <Chip label={`#${label.name}`} className={style.label} />
            </span>
          ))}
        </div>
      </div>
      <div className={style.label_area}>
        <h3 className={style.label_title}>試合会場</h3>
        <div className={style.label_contents}>
          {jLeagueTeams.map((label: any) => (
           <span onClick={() => router.push(`/categories/locate/${label.label}`)}>
              <Chip label={`#${label.name}`} className={style.label} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LabelArea
