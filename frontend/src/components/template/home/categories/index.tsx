import style from '../Home.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import Image from 'next/image'
import { jLeagueTeams } from '@/utils/TeamData'
import { useEffect, useState } from 'react'
import apiClient from '@/libs/apiClient'
import { TeamType } from '@/types/global'

const CategoriesPart = () => {
  const router = useRouter()
  const [teamData, setTeamData] = useState<TeamType[]>(jLeagueTeams.slice(0, 10))

  useEffect(() => {
    const datafetch = async () => {
      try {
        const res = await apiClient.get('/post/post-labels')
        const data = res.data
        const fliterdata = data.map((item: any) => item.name)
        console.log(fliterdata)

        const nameCountMap: Record<string, number> = {}

        jLeagueTeams.forEach((team) => {
          const { name } = team
          if (fliterdata.includes(name)) {
            if (nameCountMap[name]) {
              nameCountMap[name]++
            } else {
              nameCountMap[name] = 1
            }
          }
        })

        const sortedNames = fliterdata.sort(
          (a: any, b: any) => (nameCountMap[b] || 0) - (nameCountMap[a] || 0),
        )

        let filteredTeams = jLeagueTeams.filter((team) => sortedNames.includes(team.name))

        const remainingCount = 10 - filteredTeams.length
        if (remainingCount > 0) {
          const randomTeams = jLeagueTeams.filter(
            (team) => !filteredTeams.some((t) => t.name === team.name),
          )
          for (let i = 0; i < remainingCount; i++) {
            const randomIndex = Math.floor(Math.random() * randomTeams.length)
            filteredTeams.push(randomTeams[randomIndex])
            randomTeams.splice(randomIndex, 1)
          }
        }

        setTeamData(filteredTeams)
      } catch (error) {
        alert('エラーが発生しました。')
      }
    }
    datafetch()
  }, [])

  return (
    <div className='CategoriesPart'>
      <div className={style.categories_title}>
        <h2>人気のチーム</h2>
        <Link href='/categories' className={style.show_all}>
          全てのチームを見る
        </Link>
      </div>
      <div className={style.home_categories}>
        {teamData.map((team) => (
          <Paper
            className={style.team_card}
            onClick={() => router.push(`/categories/details/${team.label}`)}
          >
            <Image src={team.img} alt={''} width={100} height={70} className={style.team_img} />
            <span>{team.name}</span>
          </Paper>
        ))}
      </div>
      <button className={style.all_jleagu_team} onClick={() => router.push('/categories')}>
        全てのチームを見る
      </button>
    </div>
  )
}

export default CategoriesPart
