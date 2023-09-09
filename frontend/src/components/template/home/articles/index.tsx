import { ArticlesType, TweetsType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import TweetCard from 'components/parts/Card/Tweet'
import HomeTemplate from 'components/widgets/home'

interface Props {
  articles: ArticlesType[] | TweetsType[]
}

const ArticlesPart = (props: Props): JSX.Element => {
  const { articles } = props

  const fliterCard = articles?.map((item: ArticlesType | TweetsType) => {
    if ('thumbnailImg' in item && " 'thumbnailText" in item) {
      return <ArticleCard key={item.id} article={item} />
    } else {
      return <TweetCard key={item.id} tweet={item} />
    }
  })

  return (
    <div>
      <HomeTemplate
        titile='評価の高い記事'
        showAll='全ての記事を見る'
        href='articles'
        footerShowAll='全ての記事を見る'
      >
        {/* {articles && fliterCard} */}
      </HomeTemplate>
    </div>
  )
}

export default ArticlesPart
