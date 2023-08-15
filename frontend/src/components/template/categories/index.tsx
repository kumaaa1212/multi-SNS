import { Paper } from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { jLeagueTeams } from '@/TeamData'
import { TeamType } from '@/types/global'
import style from './Categories.module.scss'
import { useState } from 'react'

const Categories = () => {
  const [team, setTeam] = useState<string>('')
  const [teamData, setTeamData] = useState<TeamType[]>(jLeagueTeams)

  const router = useRouter()

  const handleSearch = (e: any) => {
    const data = jLeagueTeams.filter((teams: TeamType) =>
      teams.name.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setTeamData(data)
  }

  return (
    <div className={style.categories}>
      <input
        type='text'
        className={style.categories_search}
        placeholder='キーワードを入力...'
        onChange={(e) => handleSearch(e)}
      />
      <div className={style.categories_area}>
        {teamData.map((team: TeamType) => (
          <Paper
            className={style.team_card}
            onClick={() => router.push(`/categories/deails/${team.label}`)}
          >
            <Image src={team.img} alt={''} width={100} height={70} className={style.team_img} />
            <span>{team.name}</span>
          </Paper>
        ))}
      </div>
    </div>
  )
}

export default Categories
