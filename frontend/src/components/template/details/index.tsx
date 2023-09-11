import Image from 'next/image'
import { useRouter } from 'next/router'
import { jLeagueTeams } from 'utils/TeamData'
import { ArticlesType, TeamDataType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import LabelArea from 'components/widgets/Label/articles'
import ArticleArea from 'components/widgets/article'
import style from './ArticleDetail.module.scss'

interface Props {
  data: ArticlesType[] | undefined
}

const Team = (props: Props): JSX.Element => {
  const { data } = props

  const router = useRouter()
  const teamfilter = jLeagueTeams.filter((team: TeamDataType) => team.label === router.query.label)

  return (
    <div className={style.articles_details}>
      <div>
        <div className={style.articles_details_header}>
          <Image
            src={teamfilter[0].img}
            alt={''}
            width={100}
            height={100}
            className={style.team_img}
          />
          <h2>{`"${teamfilter[0].name}"に関するまとめ`}</h2>
        </div>
        <div>
          {data?.length ? (
            <ArticleArea>
              <div></div>
            </ArticleArea>
          ) : (
            <div className={style.not_article}>
              <h1 className={style.not_article_title}>Not Found Album</h1>
              <p
                className={style.not_article_sub_title}
              >{`${teamfilter[0].name}に関するアルバムは投稿されていません`}</p>
              <Image
                src='/404.jpg'
                width={600}
                height={500}
                alt='404の画像'
                className={style.not_article_img}
              />
            </div>
          )}
        </div>
      </div>
      <div className={style.labels_area}>
        <LabelArea />
      </div>
    </div>
  )
}

export default Team
