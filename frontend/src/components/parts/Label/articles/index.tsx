import React from 'react'
import { jLeagueTeams } from '@/TeamData'
import { Chip } from '@mui/material'
import { useRouter } from 'next/router'
import { TeamType } from '@/types/global'
import style from './Label.module.scss'

const LabelArea = () => {
  const router = useRouter()

  return (
    <div className={style.label_areas}>
      <div className={style.label_area}>
        <h3 className={style.label_title}>J1リーグ</h3>
        <div className={style.label_contents}>
          {jLeagueTeams.map((team: TeamType) => (
            <span onClick={() => router.push(`/categories/details/${team.label}`)}>
              <Chip label={`#${team.name}`} className={style.label} />
            </span>
          ))}
        </div>
      </div>
      <div className={style.label_area}>
        <h3 className={style.label_title}>試合会場</h3>
        <div className={style.label_contents}>
          {jLeagueTeams.map((team: TeamType) => (
           <span onClick={() => router.push(`/categories/locate/${team.label}`)}>
              <Chip label={`#${team.stadium}`} className={style.label} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LabelArea
