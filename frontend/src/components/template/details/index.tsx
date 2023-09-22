import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import { jLeagueTeams } from 'utils/TeamData'
import { TeamDataType } from 'types/internal'
import { ArticlesType } from 'types/internal/album'
import Meta from 'components/layout/Head'
import AlbumArea from 'components/widgets/Article/Album'
import LabelArea from 'components/widgets/Label/Select'
import style from './ArticleDetail.module.scss'

interface Props {
  data: ArticlesType[] | undefined
}

export default function Team(props: Props): JSX.Element {
  const { data } = props

  const router = useRouter()
  const teamfilter = jLeagueTeams.filter((team: TeamDataType) => team.label === router.query.label)

  return (
    <Layout>
      <Meta title={`${teamfilter[0].name}に関するまとめ`} />
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
              <AlbumArea>
                <div></div>
              </AlbumArea>
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
    </Layout>
  )
}
