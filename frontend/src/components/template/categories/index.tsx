import CustomizedInputBase from '@/components/parts/Search'
import React from 'react'
import style from './Categories.module.scss'
import { jLeagueTeams } from '@/TeamData'
import { Paper } from '@mui/material'
import Image from 'next/image'
import Kawasaki from 'public/yokohama.png'
const Categories = () => {
  return (
    <div className={style.categories}>
      <CustomizedInputBase />
      <div className={style.categories_area}>
        {jLeagueTeams.map((team) =>(
          <Paper  className={style.team_card} >
            <Image src={team.img}  alt={''} width={100} height={70} className={style.team_img} />
            <span>{team.name}</span>
          </Paper>
        ))}
      </div>
    </div>
  )
}

export default Categories