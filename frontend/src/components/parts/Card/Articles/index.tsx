import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Chip } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { formatTimestamp } from 'utils/functions/Time'
import { ArticlesType, LabelType } from 'types/global'
import DeleteButton from 'components/parts/Button/Delete'
import FollowButton from 'components/parts/Button/Follow'
import style from './ArticlesCard.module.scss'
import Icongenerate from '../../../../utils/functions/Avater'
import BookMarkBtn from '../../Button/BookMark'
import AlbumLikeBtn from '../../Button/Like/Album'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface Props {
  article: ArticlesType
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function ArticleCard(props: Props): JSX.Element {
  const { article } = props
  const { username } = useSelector((state: RootState) => state.user)

  const [expanded, setExpanded] = useState<boolean>(false)
  const [moreover, setMoreover] = useState<boolean>(false)
  const [countLikes, setCountLikes] = useState<number>(article.likes?.length)
  const [countBookmarks, setCountBookmarks] = useState<number>(article.bookmarks?.length)

  const router = useRouter()

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const handleDelete = async (): Promise<void> => {
    try {
      setMoreover(false)
    } catch {
      alert('削除に失敗しました')
    }
  }

  return (
    <div className='articleCard'>
      <Card className={style.article_card}>
        <CardHeader
          className={style.card_header}
          avatar={
            <Image
              src={article.authorAvatar ? Icongenerate(article.authorAvatar) : '/noavatar.png'}
              alt={''}
              width={30}
              height={30}
              className={style.icon_img}
            />
          }
          action={
            article.authorName === username ? (
              <MoreVertIcon
                onClick={(): void => setMoreover(!moreover)}
                className={style.moreover_btn}
              />
            ) : (
              <FollowButton article={article} content='Follow' />
            )
          }
          title={article.title}
          subheader={formatTimestamp(article.createdAt)}
        />
        <div className={style.moreover_area} onClick={handleDelete}>
          {moreover && (
            <div onClick={handleDelete}>
              <DeleteButton content='削除' article onClick={handleDelete} />
            </div>
          )}
        </div>
        <Image
          src={article.thumbnailImg ? article.thumbnailImg : '/thumbnail.png'}
          alt={''}
          className={style.main_img}
          width={550}
          height={250}
        />
        <CardContent>
          <span className={style.thumbnail_text}>{article.thumbnailText}</span>
          <div className={style.label_area}>
            {article.labels?.map((label: LabelType) => (
              <Chip label={label.name} key={label.label} />
            ))}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <AlbumLikeBtn article={article} setCountLikes={setCountLikes} />
            <span>{countLikes}</span>
          </IconButton>
          <IconButton aria-label='share'>
            <BookMarkBtn article={article} setCountBookmarks={setCountBookmarks} />
            <span>{countBookmarks}</span>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <div>
              <Link href={`/home/albumMore/${article.id}`}>Show more</Link>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
