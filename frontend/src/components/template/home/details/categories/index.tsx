import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Paper } from '@mui/material'
import { LabelType } from 'types/internal/album'
import HomeTemplate from 'components/widgets/home'
import style from './Categories.module.scss'

interface Props {
  labels: LabelType[]
}

export default function CategoriesPart(props: Props): JSX.Element {
  const { labels } = props

  const router = useRouter()
  const [teamData, setTeamData] = useState<LabelType[]>(labels)

  return (
    <HomeTemplate
      titile='人気のチーム'
      showAll='すべてのチームを見る'
      href='/categories'
      footerShowAll='すべてのチームを見る'
      color='blue'
    >
      <div className={style.home_categories}>
        {teamData.map((team: LabelType, index: number) => (
          <Paper
            key={index}
            className={style.team_card}
            onClick={(): void => {
              router.push(`/categories/${team.label}`)
            }}
          >
            <Image
              src={team.img}
              alt='チームのエンブレム'
              width={100}
              height={70}
              className={style.team_img}
              priority
            />
            <span>{team.name}</span>
          </Paper>
        ))}
      </div>
    </HomeTemplate>
  )
}
