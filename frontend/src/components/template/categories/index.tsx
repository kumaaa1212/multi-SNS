import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import { jLeagueTeams } from 'utils/TeamData'
import { TeamDataType } from 'types/global'
import style from './Categories.module.scss'

const Categories = (): JSX.Element => {
  const [teamData, setTeamData] = useState<TeamDataType[]>(jLeagueTeams)

  const router = useRouter()

  const handleSearch = (e: any): void => {
    const data = jLeagueTeams.filter((teams: TeamDataType) =>
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
        onChange={handleSearch}
      />
      <div className={style.categories_area}>
        {teamData.map((team: TeamDataType) => (
          <Paper
            key={team.label}
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
