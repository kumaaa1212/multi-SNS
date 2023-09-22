import { useRouter } from 'next/router'
import { Chip } from '@mui/material'
import { jLeagueTeams } from 'utils/TeamData'
import { TeamDataType } from 'types/internal'
import style from './Label.module.scss'

interface Props {
  small?: boolean
}

export default function LabelArea(props: Props): JSX.Element {
  const { small } = props

  const router = useRouter()

  return (
    <div className={small ? style.label_small : style.label}>
      <div className={style.label_areas}>
        <h3 className={style.label_title}>J1リーグ</h3>
        <div className={style.label_contents}>
          {jLeagueTeams.map((team: TeamDataType) => (
            <span
              onClick={(): void => {
                router.push(`/categories/${team.label}`)
              }}
              key={team.label}
            >
              <Chip label={`#${team.name}`} className={style.label} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
