import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { HttpStatusCode } from 'axios'
import Layout from 'components/layout'
import apiClient from 'libs/apiClient'
import { jLeagueTeams } from 'utils/TeamData'
import { TeamDataType } from 'types/internal'
import { ArticlesType } from 'types/internal/album'
import Meta from 'components/layout/Head'
import ArticleCard from 'components/parts/Card/Album'
import HomeAlbumCard from 'components/parts/Card/Home/Album'
import AlbumArea from 'components/widgets/Article/Album'
import LabelArea from 'components/widgets/Label/Select'
import style from './ArticleDetail.module.scss'

interface Props {
  post: ArticlesType[] | []
}

export default function Team(props: Props): JSX.Element {
  const { post } = props

  const [albumNewData, setAlbumNewData] = useState<ArticlesType[]>(post)
  const router = useRouter()
  const teamfilter = jLeagueTeams.filter((team: TeamDataType) => team.label === router.query.label)

  const handleDelete = async (album: ArticlesType): Promise<void> => {
    await apiClient
      .delete('/post/Newalbum/delete', {
        params: {
          postId: album.id,
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) throw Error
        setAlbumNewData(res.data.remainAlbums)
      })
  }

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
          <div className={style.labels_area_small}>
            <LabelArea small />
          </div>
          <div>
            {post?.length ? (
              <AlbumArea>
                {albumNewData?.map((album) => (
                  <div key={album.id}>
                    <div className={style.large}>
                      <ArticleCard album={album} handleDelete={handleDelete} />
                    </div>
                    <div className={style.small}>
                      <HomeAlbumCard album={album} />
                    </div>
                  </div>
                ))}
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
        <div className={style.labels_area_large}>
          <LabelArea />
        </div>
      </div>
    </Layout>
  )
}
