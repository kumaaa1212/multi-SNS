import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import Link from 'next/link'
import style from './ArticlesCard.module.scss'
import { Chip } from '@mui/material'
import FollowBtn from '@/components/parts/Button/Follow'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Icongenerate from '../../Avater'
import LikeBtn from '../../Button/Like'
import { ArticlesType, LabelType } from '@/types/global'
import apiClient from '@/libs/apiClient'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}
interface Props {
  article: ArticlesType
  setAlbumData: React.Dispatch<React.SetStateAction<ArticlesType[]>>
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

export default function ArticleCard(props: Props) {
  const { article, setAlbumData } = props

  const [expanded, setExpanded] = useState<boolean>(false)
  const [moreover, setMoreover] = useState<boolean>(false)
  const { username } = useSelector((state: RootState) => state.user)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const handleDelete = async () => {
    const updatedPost = await apiClient.delete(`/post/album/delete/${article.id}`)
    setAlbumData(updatedPost.data.remainingPosts)
    setMoreover(false)
  }

  return (
    <div className='articleCard'>
      <Card className={style.article_card}>
        <CardHeader
          className={style.card_header}
          avatar={
            <Image src={Icongenerate(article.authorAvatar)} alt={''} width={30} height={30} />
          }
          action={
            article.authorName === username ? (
              <MoreVertIcon
                onClick={(): void => setMoreover(!moreover)}
                className={style.moreover_btn}
              />
            ) : (
              <FollowBtn article={article} className={style.follow_icon}>
                Follow
              </FollowBtn>
            )
          }
          title={article.title}
          subheader='September 14, 2016'
        />
        {moreover && (
          <div className={style.moreover_area} onClick={handleDelete}>
            <p>削除</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='black'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z' />
              <path d='M12 10l4 4m0 -4l-4 4' />
            </svg>
          </div>
        )}
        <Image
          src={article.thumbnailImg ? article.thumbnailImg : '/thumbnail.png'}
          alt={''}
          className={style.main_img}
          width={500}
          height={250}
        />
        <CardContent>
          <span className={style.thumbnail_text}>{article.thumbnailText}</span>
          <div className={style.label_area}>
            {article.labels?.map((label: LabelType) => (
              <Chip label={label.name} />
            ))}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <LikeBtn article={article} />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
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
              <Link href={`/home/albumDetails/${article.id}`}>Show more</Link>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
