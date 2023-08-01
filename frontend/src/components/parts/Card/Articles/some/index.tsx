import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import bg_img from 'public/bg_img.jpg'
import Link from 'next/link'
import style from '../ArticlesCard.module.scss'
import apiClient from '@/libs/apiClient'
import { Chip } from '@mui/material'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}
interface Props {
  thumbnailText: string
  className: string
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

export default function ArticleCard(props: any) {
  const { className, article } = props
  const [expanded, setExpanded] = useState(false)
  const [labels, setLabels] = useState<any>([])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  useEffect(() => {
    const getLabels = async () => {
      const labels = await apiClient.get(`/post/match/label/${article.id}`)
      setLabels(labels.data)
    }
    getLabels()
  }, [])
  console.log(labels)

  return (
    <div className='articleCard'>
      <Card sx={{ width: Number(className) }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={article.title}
          subheader='September 14, 2016'
        />
        <Image
          src={article.thumbnailImg ? article.thumbnailImg : '/thumbnail.png'}
          alt={''}
          className={style.main_img}
          width={400}
          height={200}
        />
        <CardContent>
          <span>{article.thumbnailText}</span>
          <div>
            <span>
              {labels.map((label: any) => (
                <Chip label={label.name} />
              ))}
            </span>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
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
              <Link href={'/'}>Show more</Link>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
