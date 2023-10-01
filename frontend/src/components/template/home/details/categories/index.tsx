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

  const labelCounts: { [label: string]: number } = {}

  labels.forEach((item) => {
    const { label } = item
    if (labelCounts[label]) {
      labelCounts[label]++
    } else {
      labelCounts[label] = 1
    }
  })

  const uniqueLabels: Set<string> = new Set()

  const sortedArray: LabelType[] = labels
    .filter((item) => {
      if (uniqueLabels.has(item.label)) {
        return false
      }
      uniqueLabels.add(item.label)
      return true
    })
    .sort((a, b) => labelCounts[b.label] - labelCounts[a.label])

  return (
    <HomeTemplate
      titile='人気のチーム'
      showAll='すべてのチームを見る'
      href='/categories'
      footerShowAll='すべてのチームを見る'
      color='blue'
    >
      <div className={style.home_categories}>
        {sortedArray.map((team: LabelType, index: number) => (
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
