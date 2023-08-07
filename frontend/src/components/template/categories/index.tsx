import style from './Categories.module.scss'
import { jLeagueTeams } from '@/TeamData'
import { Paper } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Categories = () => {
  const router = useRouter()

  return (
    <div className={style.categories}>
      <input type='text' className={style.categories_search} placeholder='キーワードを入力...' />
      <div className={style.categories_area}>
        {jLeagueTeams.map((team) => (
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
