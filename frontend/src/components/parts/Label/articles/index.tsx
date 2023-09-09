import React from 'react'
import { useRouter } from 'next/router'
import { Chip } from '@mui/material'
import { jLeagueTeams } from 'utils/TeamData'
import { TeamDataType } from 'types/global'
import style from './Label.module.scss'

const LabelArea = (): JSX.Element => {
  const router = useRouter()

  return (
    <div className={style.label_areas}>
      <div className={style.label_area}>
        <h3 className={style.label_title}>J1リーグ</h3>
        <div className={style.label_contents}>
          {jLeagueTeams.map((team: TeamDataType) => (
            <span
              onClick={(): void => {
                router.push(`/categories/details/${team.label}`)
              }}
              key={team.label}
            >
              <Chip label={`#${team.name}`} className={style.label} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LabelArea
