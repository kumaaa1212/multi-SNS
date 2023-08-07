import style from '../Home.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import Image from 'next/image'
import { jLeagueTeams } from '@/TeamData'

const CategoriesPart = () => {
  const router = useRouter()
  return (
    <div className='CategoriesPart'>
      <div className={style.categories_title}>
        <h2>人気のチーム</h2>
        <Link href='/categories' className={style.show_all}>
          全てのチームを見る
        </Link>
      </div>
      <div className={style.home_categories}>
        {jLeagueTeams.map((team) => (
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
