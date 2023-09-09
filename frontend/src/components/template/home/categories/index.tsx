import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import apiClient from 'libs/apiClient'
import { jLeagueTeams } from 'utils/TeamData'
import { TeamDataType } from 'types/global'
import HomeTemplate from 'components/widgets/home'
import style from '../Home.module.scss'

const CategoriesPart = (): JSX.Element => {
  const router = useRouter()
  const [teamData, setTeamData] = useState<TeamDataType[]>(jLeagueTeams.slice(0, 10))

  useEffect(() => {
    const datafetch = async (): Promise<void> => {
      try {
        // const res = await apiClient.get('/post/post-labels')
      } catch (error) {
        alert('エラーが発生しました。')
      }
    }

    datafetch()
  }, [])

  return (
    <HomeTemplate
      titile='人気のチーム'
      showAll='全てのチームを見る'
      href='/categories'
      footerShowAll='全てのチームを見る'
    >
      <div className={style.home_categories}>
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
    </HomeTemplate>
  )
}

export default CategoriesPart
