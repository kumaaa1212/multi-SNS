import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import { jLeagueTeams } from 'utils/TeamData'
import { TeamDataType } from 'types/global'
import SerchInput from 'components/parts/Input/Serch'
import style from './Categories.module.scss'
import Layout from 'components/layout'

const Categories = (): JSX.Element => {
  const router = useRouter()
  const [teamData, setTeamData] = useState<TeamDataType[]>(jLeagueTeams)
  const [search, setSearch] = useState<string>('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value)
    const data = jLeagueTeams.filter((teams: TeamDataType) =>
      teams.name.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setTeamData(data)
  }

  return (
    <Layout>
      <div className={style.categories_serch_area}>
        <SerchInput value={search} placeholder='キーワードを入力...' onChange={handleSearch} />
      </div>
      <div className={style.categories_area}>
        {teamData.map((team: TeamDataType) => (
          <Paper
            key={team.label}
            className={style.team_card}
            onClick={(): void => {
              router.push(`/categories/${team.label}`)
            }}
          >
            <Image src={team.img} alt={''} width={100} height={70} className={style.team_img} />
            <span>{team.name}</span>
          </Paper>
        ))}
      </div>
    </Layout>
  )
}

export default Categories
