import { useState } from 'react'
import { Paper } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import style from './Categories.module.scss'
import { TeamType } from '@/types/global'
import { jLeagueTeams } from '@/utils/TeamData'

const Categories = (): JSX.Element => {
  const [teamData, setTeamData] = useState<TeamType[]>(jLeagueTeams)

  const router = useRouter()

  const handleSearch = (e: any): void => {
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
        onChange={(e): void => handleSearch(e)}
      />
      <div className={style.categories_area}>
        {teamData.map((team: TeamType) => (
          <Paper
            key={team.id}
            className={style.team_card}
            onClick={(): void => {
              router.push(`/categories/details/${team.label}`)
            }}
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
